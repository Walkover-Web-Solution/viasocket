// Experiment counters in the ops store, shared by the middleware (assignments) and
// /api/exp/event (exposures and outcomes).
//   exp_dedupe/<exp>.<eventId>                       one row per event id (dedupe)
//   exp_uniq/<exp>.<phase>.<bucket>.<event>.<vid>     first time this visitor did this event
//   exp_counts/<exp>.<phase>                          { buckets: { <bucket>: { <variant>: { <event>: { events, visitors } } } } }
// Buckets keep traffic classes apart: customer (the only one evaluated), synthetic, internal,
// bot, unassigned (claimed variant ≠ deterministic assignment), late (experiment not running or
// an old phase); synthetic traffic gets synthetic_unassigned / synthetic_late the same way.

import { casUpdate, putIfAbsent } from './store';

export const EVENTS = ['assignment', 'exposure', 'cta_click', 'setup_prompt_copy', 'signup_start'];
export const BUCKETS = ['customer', 'unassigned', 'late', 'synthetic', 'synthetic_unassigned', 'synthetic_late', 'internal', 'bot'];

export async function recordEvent(store, { exp, phase, variant, event, vid, bucket, eventId }) {
    const at = new Date().toISOString();
    if (eventId) {
        const fresh = await putIfAbsent(store, 'exp_dedupe', `${exp}.${eventId}`, { at, event, variant });
        if (!fresh) return { counted: false, reason: 'duplicate event id' };
    }
    const newVisitor = await putIfAbsent(store, 'exp_uniq', `${exp}.${phase}.${bucket}.${event}.${vid}`, { at, variant });
    const res = await casUpdate(
        store,
        'exp_counts',
        `${exp}.${phase}`,
        (cur) => {
            const next = cur ? JSON.parse(JSON.stringify(cur)) : { exp, phase, buckets: {}, firstAt: at };
            const b = (next.buckets[bucket] ||= {});
            const v = (b[variant] ||= {});
            const e = (v[event] ||= { events: 0, visitors: 0 });
            e.events += 1;
            if (newVisitor) e.visitors += 1;
            next.updatedAt = at;
            return next;
        },
        { retries: 12 }
    );
    return { counted: res.ok, newVisitor, reason: res.ok ? null : 'counter contention' };
}

export async function getCounts(store, exp, phase) {
    const d = await store.get('exp_counts', `${exp}.${phase}`);
    return d.found ? d.data : { exp, phase, buckets: {} };
}

/** Per-variant unique-visitor counts for evaluation from one bucket. */
export function variantCounts(counts, bucket, primaryOutcome, keys) {
    const b = counts?.buckets?.[bucket] || {};
    return Object.fromEntries(
        keys.map((k) => [
            k,
            {
                assigned: b[k]?.assignment?.visitors || 0,
                exposed: b[k]?.exposure?.visitors || 0,
                converted: b[k]?.[primaryOutcome]?.visitors || 0,
                exposureEvents: b[k]?.exposure?.events || 0,
            },
        ])
    );
}
