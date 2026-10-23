// Deterministic "has this page changed?" check for competitor watch URLs. The page is fetched,
// reduced to its visible text (scripts, styles, tags, whitespace and digits-only tokens such as
// cache-busters dropped), and hashed. Same text → same hash. No LLM.

import { sha256Hex } from './crypto.mjs';

export function visibleText(html) {
    return String(html || '')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
        .replace(/<!--[\s\S]*?-->/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#?\w+;/g, ' ')
        .replace(/\b\d{6,}\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * urls: [{ competitorId, url }]; previous: { [url]: { hash } }
 * Returns { results: [{competitorId, url, status, ok, hash, changed, firstSeen, bytes, error}], requests }
 */
export async function checkSources(urls, previous = {}, { timeoutMs = 8000, budget = 40, userAgent } = {}) {
    const results = [];
    let requests = 0;
    for (const { competitorId, url } of urls) {
        if (requests >= budget) {
            results.push({ competitorId, url, ok: false, skipped: true, error: `budget of ${budget} requests reached` });
            continue;
        }
        requests += 1;
        try {
            const res = await fetch(url, {
                redirect: 'follow',
                signal: AbortSignal.timeout(timeoutMs),
                headers: { 'user-agent': userAgent || 'viasocket-website-ops/1 (source change check)' },
            });
            const body = await res.text();
            const text = visibleText(body);
            const hash = await sha256Hex(text);
            const prev = previous[url];
            results.push({
                competitorId,
                url,
                status: res.status,
                ok: res.ok,
                hash,
                bytes: text.length,
                firstSeen: !prev?.hash,
                changed: Boolean(prev?.hash) && prev.hash !== hash,
                previousHash: prev?.hash || null,
            });
        } catch (err) {
            results.push({ competitorId, url, ok: false, error: String(err?.message || err) });
        }
    }
    return { results, requests };
}

export function watchUrlsFrom(watchlist, { includePaused = false } = {}) {
    const out = [];
    for (const c of watchlist?.competitors || []) {
        if (!includePaused && (c.status === 'paused' || c.status === 'retired')) continue;
        for (const w of c.watch || []) {
            const url = typeof w === 'string' ? w : w?.url;
            if (typeof url === 'string' && /^https?:\/\//.test(url)) out.push({ competitorId: c.id, url });
        }
    }
    return out;
}
