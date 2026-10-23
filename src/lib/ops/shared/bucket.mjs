// Deterministic experiment assignment, shared by src/middleware.js (assigns), the event
// endpoint (checks an event's claimed variant) and scripts/ops/synthetic-experiment.mjs.
//
// bucket = first 32 bits of SHA-256("<visitor id>:<experiment id>:<phase>") / 2^32, so the
// same visitor always lands in the same variant for one phase, and a new phase re-draws.

import { sha256Bytes } from './crypto.mjs';

export const VARIANT_KEYS = ['A', 'B', 'C'];
export const EXP_ID_PATTERN = /^[a-z0-9][a-z0-9-]{1,47}$/;
export const VID_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;

export async function bucketOf(visitorId, experimentId, phase) {
    const b = await sha256Bytes(`${visitorId}:${experimentId}:${phase}`);
    const n = ((b[0] << 24) >>> 0) + (b[1] << 16) + (b[2] << 8) + b[3];
    return n / 4294967296;
}

/** variants: [{ key, weight }] with weights > 0. Returns the variant key. */
export function pickByWeight(variants, bucket) {
    const live = (variants || []).filter((v) => Number(v.weight) > 0);
    const total = live.reduce((s, v) => s + Number(v.weight), 0);
    if (!live.length || total <= 0) return null;
    let edge = 0;
    for (const v of live) {
        edge += Number(v.weight) / total;
        if (bucket < edge) return v.key;
    }
    return live[live.length - 1].key;
}

export async function assignVariant(visitorId, experiment) {
    const bucket = await bucketOf(visitorId, experiment.id, experiment.phase || 1);
    return pickByWeight(experiment.variants, bucket);
}

/** Cookie value for vs_x_<exp>: "<variant>.<phase>.<surface>" */
export const encodeAssignment = (variant, phase, surface) => `${variant}.${phase}.${surface}`;

export function decodeAssignment(value) {
    const m = /^([ABC])\.(\d{1,4})\.([a-z0-9-]{1,32})$/.exec(String(value || ''));
    return m ? { variant: m[1], phase: Number(m[2]), surface: m[3] } : null;
}
