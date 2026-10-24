// Experiment assignment for src/middleware.js. Runs only for surface paths (today "/"), only
// when an experiment is running there, and in production only with OPS_EXPERIMENTS_LIVE=true.
// Everything else returns null and the request continues exactly as before.

import { NextResponse } from 'next/server';
import { authConfig, experimentsLive, isProductionSite } from './config';
import { getStore } from './store';
import { recordEvent } from './exp-counts';
import { SURFACE_BY_PATH, verifyPreviewToken } from './experiments';
import { assignVariant, decodeAssignment, encodeAssignment, VID_PATTERN } from './shared/bucket.mjs';
import { randomId } from './shared/crypto.mjs';

const ACTIVE_TTL_MS = 30 * 1000;
const activeCache = new Map(); // surface → { at, value }

// Same list as src/utils/isBot.js (kept local so the middleware bundle stays small).
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|bingpreview|embedly|quora link preview|whatsapp|telegrambot|discordbot|slackbot|linkedinbot|pinterest|redditbot|applebot|petalbot|yandex|baiduspider|duckduckbot|headlesschrome|phantomjs|puppeteer|playwright|selenium|lighthouse|gtmetrix|pingdom|uptimerobot|python-requests|python-urllib|go-http-client|java\/|okhttp|axios\/|node-fetch|got\/|curl\/|wget\/|libwww-perl|httpclient|scrapy|ahrefs|semrush|mj12bot|dotbot|screaming frog|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexitybot|ccbot|bytespider|amazonbot|google-extended/i;

export const isBotUA = (ua) => !ua || BOT_UA.test(ua);

export const VID_COOKIE = 'vs_vid';
export const INTERNAL_COOKIE = 'vs_internal';
export const SYNTHETIC_COOKIE = 'vs_synthetic';
export const assignmentCookie = (expId) => `vs_x_${expId}`;

async function activeFor(store, surface) {
    const hit = activeCache.get(surface);
    if (hit && Date.now() - hit.at < ACTIVE_TTL_MS) return hit.value;
    let value = null;
    try {
        const d = await store.get('exp_active', surface);
        value = d.found && d.data?.expId ? d.data : null;
    } catch (err) {
        console.error('[experiments] active lookup failed, serving baseline:', err.message);
        value = hit?.value ?? null; // keep the last known state for one more TTL
    }
    activeCache.set(surface, { at: Date.now(), value });
    return value;
}

const noStore = (res) => {
    res.headers.set('Cache-Control', 'private, no-store, must-revalidate');
    res.headers.set('CDN-Cache-Control', 'no-store');
    res.headers.set('Vary', 'Cookie');
    return res;
};

function rewriteTo(request, target) {
    const url = new URL(target, request.url);
    request.nextUrl.searchParams.forEach((v, k) => {
        if (!k.startsWith('vs_')) url.searchParams.append(k, v);
    });
    return NextResponse.rewrite(url);
}

const cookieOpts = (request, maxAge) => ({
    path: '/',
    maxAge,
    sameSite: 'lax',
    secure: new URL(request.url).protocol === 'https:',
    httpOnly: false, // /exp.js reads them to report exposure
});

async function preview(request, store, surface) {
    const [expId, variant] = String(request.nextUrl.searchParams.get('vs_preview') || '').split(':');
    const cfg = authConfig();
    if (!cfg.ok || !(await verifyPreviewToken(cfg.secret, expId, variant, request.nextUrl.searchParams.get('vs_pt')))) return null;
    let exp = null;
    try {
        const d = await store.get('experiments', expId);
        exp = d.found ? d.data : null;
    } catch {
        return null;
    }
    const v = exp?.surface === surface ? exp.variants.find((x) => x.key === variant) : null;
    if (!v) return null;
    const res = noStore(rewriteTo(request, v.target));
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('x-vs-exp', `preview:${expId}:${variant}`);
    return res;
}

/**
 * Returns a NextResponse for an experimented surface request, or null to leave the request
 * alone. `ctx` is the middleware event (for waitUntil).
 */
export async function experimentResponse(request, ctx) {
    const surface = SURFACE_BY_PATH[request.nextUrl.pathname];
    if (!surface) return null;
    const store = getStore();
    if (!store.connected) return null;

    if (request.nextUrl.searchParams.has('vs_preview')) {
        const res = await preview(request, store, surface);
        if (res) return res;
    }
    if (isProductionSite() && !experimentsLive()) return null;

    const active = await activeFor(store, surface);
    const cookies = request.cookies;
    if (!active) {
        // Clear assignment cookies left from a stopped experiment so exp.js stops reporting.
        const stale = cookies.getAll().filter((c) => c.name.startsWith('vs_x_') && decodeAssignment(c.value)?.surface === surface);
        if (!stale.length) return null;
        const res = NextResponse.next();
        stale.forEach((c) => res.cookies.delete(c.name));
        return res;
    }

    const ua = request.headers.get('user-agent') || '';
    const synthetic = cookies.get(SYNTHETIC_COOKIE)?.value === '1';
    // Internal traffic (an operator's own browser, by cookie) gets the baseline, uncached.
    if (!synthetic && cookies.get(INTERNAL_COOKIE)?.value === '1') {
        const base = active.variants.find((v) => v.key === 'A');
        const res = noStore(base ? rewriteTo(request, base.target) : NextResponse.next());
        res.headers.set('x-vs-exp', `excluded:internal:${active.expId}`);
        return res;
    }
    // Crawlers are never assigned or counted, but they are not pinned to the baseline either:
    // choosing content by user agent is the cloaking pattern Google's website-testing guidance
    // names ("always serving the original content when you see Googlebot"). They get a variant
    // drawn like a first-time visitor's, with no cookies and no record. OPS_EXPERIMENTS_BOT_POLICY
    // =baseline restores baseline-for-bots if the team decides otherwise (docs/EXPERIMENTS.md §9).
    if (!synthetic && isBotUA(ua)) {
        const pinBaseline = process.env.OPS_EXPERIMENTS_BOT_POLICY === 'baseline';
        const key = pinBaseline ? 'A' : await assignVariant(randomId(16), { id: active.expId, phase: active.phase, variants: active.variants });
        const v = active.variants.find((x) => x.key === key) || active.variants[0];
        const res = noStore(rewriteTo(request, v.target));
        res.headers.set('x-vs-exp', `excluded:bot:${active.expId}`);
        return res;
    }

    let vid = cookies.get(VID_COOKIE)?.value;
    const newVisitor = !VID_PATTERN.test(vid || '');
    if (newVisitor) vid = randomId(16);
    const variant = await assignVariant(vid, { id: active.expId, phase: active.phase, variants: active.variants });
    const target = active.variants.find((v) => v.key === variant)?.target;
    if (!target) return null;

    const name = assignmentCookie(active.expId);
    const prior = decodeAssignment(cookies.get(name)?.value);
    const fresh = !prior || prior.phase !== active.phase || prior.variant !== variant;

    const res = noStore(rewriteTo(request, target));
    if (newVisitor) res.cookies.set(VID_COOKIE, vid, cookieOpts(request, 365 * 24 * 3600));
    if (fresh) res.cookies.set(name, encodeAssignment(variant, active.phase, surface), cookieOpts(request, 90 * 24 * 3600));
    res.headers.set('x-vs-exp', `${active.expId}:${variant}:${active.phase}${synthetic ? ':synthetic' : ''}`);

    if (fresh) {
        const job = recordEvent(store, { exp: active.expId, phase: active.phase, variant, event: 'assignment', vid, bucket: synthetic ? 'synthetic' : 'customer' }).catch((err) =>
            console.error('[experiments] assignment not recorded:', err.message)
        );
        if (ctx?.waitUntil) ctx.waitUntil(job);
    }
    return res;
}
