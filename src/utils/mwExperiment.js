// Browser-side assignment and event recording for middleware A/B experiments.
// This is not the visitor table (trackVisitor.js, POST /api/track-variant). Do not
// connect the two: that write path is switched off, and it uses a different id.
//
// The URL and MW_KEY are the middleware's client contract. The key can only append
// events, so it is committed here on purpose rather than read from an env var.
// Never load a script from that host. The page must not wait on mwSend.
//
// A server render has no localStorage. mwVariant then returns the control (the
// first variant) and mwSend does nothing, and neither stores an id on the shared
// server isolate. Do not render different markup from the result in a server
// component, or the client HTML will not match. The static homepage does not
// import this file. How a page calls it: docs/CONTRACTS.md ("Middleware experiments").

const MW_EVENTS = 'https://cursor-slack-bot.embarko.app/repos/viasocket/events';
const MW_KEY = 'pk_770689b48d18eb38b798201a666cab5a';

let mwId;
let mwOff = false;

function mwVisitor() {
    if (mwId) return mwId;
    try {
        mwId = localStorage.getItem('mw_visitor');
    } catch {
        // Private mode and some embedded browsers throw. Mint an id for this load.
    }
    if (!mwId) {
        const bytes = new Uint8Array(16);
        try {
            crypto.getRandomValues(bytes);
        } catch {
            for (let i = 0; i < 16; i++) bytes[i] = Math.random() * 256;
        }
        mwId = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        try {
            localStorage.setItem('mw_visitor', mwId);
        } catch {
            // The id still identifies this page load.
        }
    }
    return mwId;
}

function mwBucket(experiment, visitorId, variants) {
    let h = 0x811c9dc5;
    const s = `${experiment}:${visitorId}`;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    h = (h ^ (h >>> 16)) >>> 0;
    let n = h % variants.reduce((sum, [, w]) => sum + w, 0);
    for (const [key, w] of variants) if ((n -= w) < 0) return key;
}

// The variant to render, at once and locally. `variants` is the middleware's list
// in order, for example [['control', 50], ['b', 50]]. On any error: the control
// (the first), or undefined if there is none.
export function mwVariant(experiment, variants) {
    try {
        if (typeof window === 'undefined') throw new Error('browser only');
        return mwBucket(experiment, mwVisitor(), variants) ?? variants[0][0];
    } catch {
        return variants?.[0]?.[0];
    }
}

// Fire and forget: returns nothing, never throws, never waits. Do not await it.
export function mwSend(event) {
    if (mwOff || typeof window === 'undefined') return;
    try {
        const body = JSON.stringify({ key: MW_KEY, visitor_id: mwVisitor(), ...event });
        if (navigator.sendBeacon?.(MW_EVENTS, body)) return;
        const signal = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined;
        fetch(MW_EVENTS, { method: 'POST', body, keepalive: true, credentials: 'omit', signal }).catch(() => {
            mwOff = true;
        });
    } catch {
        mwOff = true;
    }
}
