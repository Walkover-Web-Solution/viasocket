// Helpers for /api/internal/* route handlers: auth + CSRF guard, form parsing, and responses
// that work for both plain HTML form posts (303 back to the page with a flash message) and
// JSON callers (scripts). Every response is private, no-store and noindex.

import { NextResponse } from 'next/server';
import { authConfig } from './config';
import { SESSION_COOKIE, hasRole, sameOrigin, verifySessionToken } from './auth';
import { safeEqual } from './shared/crypto.mjs';

export const PRIVATE_HEADERS = {
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
};

export function json(body, status = 200, extra = {}) {
    return NextResponse.json(body, { status, headers: { ...PRIVATE_HEADERS, ...extra } });
}

export function readCookie(request, name) {
    const raw = request.headers.get('cookie') || '';
    for (const part of raw.split(';')) {
        const i = part.indexOf('=');
        if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
    }
    return undefined;
}

const wantsJson = (request) => (request.headers.get('accept') || '').includes('application/json') || (request.headers.get('content-type') || '').includes('application/json');

async function readForm(request) {
    const type = request.headers.get('content-type') || '';
    if (type.includes('application/json')) return (await request.json().catch(() => ({}))) || {};
    if (type.includes('form')) {
        const fd = await request.formData();
        const out = {};
        for (const [k, v] of fd.entries()) {
            if (k in out) out[k] = [].concat(out[k], v);
            else out[k] = v;
        }
        return out;
    }
    return {};
}

/** A path inside /internal to send the browser back to; anything else falls back. */
export function safeReturn(value, fallback = '/internal') {
    const v = typeof value === 'string' ? value : '';
    return /^\/internal(\/[A-Za-z0-9/_-]*)?(\?[A-Za-z0-9=&%._:+/-]*)?$/.test(v) ? v : fallback;
}

/**
 * guard(request, minRole, { mutation }) → { user, form, cfg } or { response }.
 * Missing config → 503. No/invalid session → 401. Role too low → 403.
 * Mutations also need a same-origin request and the session's CSRF token (form field
 * `csrf` or header x-ops-csrf).
 */
export async function guard(request, minRole, { mutation = false } = {}) {
    const cfg = authConfig();
    if (!cfg.ok) return { response: json({ ok: false, error: 'Ops admin not configured', problems: cfg.problems }, 503) };
    const user = await verifySessionToken(readCookie(request, SESSION_COOKIE), cfg);
    if (!user) return { response: json({ ok: false, error: 'Sign in required' }, 401) };
    const form = mutation ? await readForm(request) : {};
    if (mutation) {
        if (!sameOrigin(request)) return { response: json({ ok: false, error: 'Cross-site request refused' }, 403) };
        const token = form.csrf || request.headers.get('x-ops-csrf');
        if (!safeEqual(token, user.csrf)) return { response: json({ ok: false, error: 'Form expired, reload the page and try again' }, 403) };
    }
    if (!hasRole(user, minRole)) return { response: json({ ok: false, error: `Needs the ${minRole} role (you are ${user.role})` }, 403) };
    return { user, form, cfg };
}

/** Finish a mutation: JSON for scripts, 303 back to the page (with a flash) for forms. */
export function done(request, form, { ok, message, data, status, back }) {
    if (wantsJson(request)) return json({ ok, message, ...(data || {}) }, status || (ok ? 200 : 400));
    const target = new URL(safeReturn(back || form?.return_to), request.url);
    target.searchParams.set(ok ? 'ok' : 'error', String(message || (ok ? 'Done' : 'Failed')).slice(0, 300));
    return NextResponse.redirect(target, { status: 303, headers: PRIVATE_HEADERS });
}

export const str = (v, max = 5000) => (typeof v === 'string' ? v.slice(0, max) : Array.isArray(v) ? String(v[0] ?? '').slice(0, max) : '');
