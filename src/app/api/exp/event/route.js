import { NextResponse } from 'next/server';
import { getStore } from '@/lib/ops/store';
import { recordEvent } from '@/lib/ops/exp-counts';
import { isBotUA, INTERNAL_COOKIE, SYNTHETIC_COOKIE, VID_COOKIE } from '@/lib/ops/edge-experiments';
import { assignVariant, EXP_ID_PATTERN, VID_PATTERN } from '@/lib/ops/shared/bucket.mjs';

export const runtime = 'edge';

// Public endpoint for /exp.js: exposure and outcome events of running experiments.
// Contract: docs/CONTRACTS.md § Experiment events. Answers 202 when counted, 200 with
// counted:false when deliberately dropped (duplicate, wrong bucket), 400 on bad input, 503 when
// storage is not connected. Never cached.

const EVENTS = ['exposure', 'cta_click', 'setup_prompt_copy', 'signup_start'];
const EVENT_ID = /^[A-Za-z0-9_-]{8,80}$/;
const EXP_TTL_MS = 15 * 1000;
const expCache = new Map();

const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
const reply = (body, status) => NextResponse.json(body, { status, headers });

async function experimentFor(store, id) {
    const hit = expCache.get(id);
    if (hit && Date.now() - hit.at < EXP_TTL_MS) return hit.value;
    const d = await store.get('experiments', id);
    const value = d.found ? d.data : null;
    expCache.set(id, { at: Date.now(), value });
    if (expCache.size > 200) expCache.clear();
    return value;
}

export async function POST(request) {
    const store = getStore();
    if (!store.connected) return reply({ ok: false, reason: 'storage not connected' }, 503);

    const raw = await request.text();
    if (raw.length > 2000) return reply({ ok: false, reason: 'payload too large' }, 413);
    let body;
    try {
        body = JSON.parse(raw);
    } catch {
        return reply({ ok: false, reason: 'invalid JSON' }, 400);
    }
    const { exp, variant, vid, event, id } = body || {};
    const phase = Number(body?.phase);
    if (!EXP_ID_PATTERN.test(exp || '') || !['A', 'B', 'C'].includes(variant) || !Number.isInteger(phase) || phase < 1 || !VID_PATTERN.test(vid || '') || !EVENTS.includes(event) || !EVENT_ID.test(id || '')) {
        return reply({ ok: false, reason: 'invalid event' }, 400);
    }

    let experiment;
    try {
        experiment = await experimentFor(store, exp);
    } catch (err) {
        return reply({ ok: false, reason: 'storage error' }, 503);
    }
    if (!experiment || !experiment.variants?.some((v) => v.key === variant)) return reply({ ok: false, reason: 'unknown experiment or variant' }, 400);

    // Traffic class decides the bucket; only "customer" is ever evaluated.
    const cookie = (name) => request.cookies.get(name)?.value;
    let cls = 'customer';
    if (cookie(SYNTHETIC_COOKIE) === '1') cls = 'synthetic';
    else if (isBotUA(request.headers.get('user-agent') || '')) cls = 'bot';
    else if (cookie(INTERNAL_COOKIE) === '1') cls = 'internal';
    let bucket = cls;
    if (cls === 'customer' || cls === 'synthetic') {
        const prefix = cls === 'synthetic' ? 'synthetic_' : '';
        if (experiment.status !== 'running' || phase !== experiment.phase) bucket = `${prefix}late`;
        else if (cookie(VID_COOKIE) && cookie(VID_COOKIE) !== vid) bucket = `${prefix}unassigned`;
        else {
            // Exposure without assignment: the claimed variant must be the deterministic one.
            const expected = await assignVariant(vid, { id: exp, phase, variants: experiment.variants });
            if (expected !== variant) bucket = `${prefix}unassigned`;
        }
    }

    try {
        const r = await recordEvent(store, { exp, phase, variant, event, vid, bucket, eventId: id });
        return reply({ ok: true, counted: r.counted, bucket, reason: r.reason || undefined }, r.counted ? 202 : 200);
    } catch (err) {
        console.error('[exp event] not recorded:', err.message);
        return reply({ ok: false, reason: 'storage error' }, 503);
    }
}
