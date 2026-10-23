// Signed sessions for the ops area (HMAC-SHA256 via Web Crypto; edge-safe).
// Token: base64url(JSON payload) + "." + base64url(HMAC(secret, payload)).
// The role is NOT trusted from the token: each request re-reads OPS_USERS, so removing or
// demoting a user takes effect on their next request.

import { authConfig, roleRank } from './config';
import { b64urlToText, hmacB64url, randomId, safeEqual, textToB64url, verifyPassword } from './shared/crypto.mjs';

export const SESSION_COOKIE = 'vs_ops';
export const SESSION_TTL_S = 12 * 60 * 60;

export async function createSessionToken(email, secret) {
    const now = Math.floor(Date.now() / 1000);
    const payload = textToB64url(JSON.stringify({ v: 1, sub: email, iat: now, exp: now + SESSION_TTL_S, sid: randomId(12) }));
    return `${payload}.${await hmacB64url(secret, `session:${payload}`)}`;
}

/** Returns { email, role, sid, exp, csrf } or null. */
export async function verifySessionToken(token, cfg = authConfig()) {
    if (!cfg.ok || typeof token !== 'string' || !token.includes('.')) return null;
    const [payload, sig] = token.split('.');
    if (!safeEqual(sig, await hmacB64url(cfg.secret, `session:${payload}`))) return null;
    let data;
    try {
        data = JSON.parse(b64urlToText(payload));
    } catch {
        return null;
    }
    if (data?.v !== 1 || typeof data.sub !== 'string' || !(data.exp > Date.now() / 1000)) return null;
    const user = cfg.users.find((u) => u.email === data.sub);
    if (!user) return null;
    return { email: user.email, role: user.role, sid: data.sid, exp: data.exp, csrf: await csrfFor(cfg.secret, data.sid) };
}

export const csrfFor = (secret, sid) => hmacB64url(secret, `csrf:${sid}`);

export async function checkLogin(email, password, cfg = authConfig()) {
    const user = cfg.users.find((u) => u.email === String(email || '').trim().toLowerCase());
    // Hash even for an unknown user so timing does not reveal which emails exist.
    const ok = await verifyPassword(password, user?.password_hash || 'pbkdf2:100000:AAAAAAAAAAAAAAAAAAAAAA:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return ok && user ? user : null;
}

export const hasRole = (user, minRole) => Boolean(user) && roleRank(user.role) >= roleRank(minRole);

export function sessionCookieOptions(requestUrl, maxAge = SESSION_TTL_S) {
    const url = new URL(requestUrl);
    const local = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
    return { httpOnly: true, secure: !local, sameSite: 'strict', path: '/', maxAge };
}

/** Same-origin check for mutations: Origin (or Referer) must be this site. */
export function sameOrigin(request) {
    const own = new URL(request.url).origin;
    const origin = request.headers.get('origin');
    if (origin) return origin === own;
    const referer = request.headers.get('referer');
    if (referer) {
        try {
            return new URL(referer).origin === own;
        } catch {
            return false;
        }
    }
    return false;
}

// Best-effort login throttle, per edge isolate (no shared state): 5 failures per IP per
// 10 minutes. Real rate limiting belongs in a Cloudflare WAF rule on /api/internal/auth/login.
const failures = new Map();
const WINDOW_MS = 10 * 60 * 1000;

export function loginThrottled(ip) {
    const now = Date.now();
    const list = (failures.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    failures.set(ip, list);
    return list.length >= 5;
}

export function noteLoginFailure(ip) {
    const list = failures.get(ip) || [];
    list.push(Date.now());
    failures.set(ip, list.slice(-10));
    if (failures.size > 5000) failures.clear();
}

export const clientIp = (request) =>
    request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
