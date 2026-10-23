// Middleware gate for /internal pages: 503 when the admin is not configured, a redirect to the
// login page without a valid session, and private/noindex/CSP headers on everything it lets
// through. Pages re-check the session themselves (src/lib/ops/page.js).

import { NextResponse } from 'next/server';
import { authConfig } from './config';
import { SESSION_COOKIE, verifySessionToken } from './auth';

export const isInternalPath = (pathname) => pathname === '/internal' || pathname.startsWith('/internal/');

function csp() {
    const dev = process.env.NODE_ENV === 'development';
    // Third-party tags from the root layout (GTM, chat, Reddit, cr-relay) are blocked here, so
    // no outside script can read internal pages. Next needs inline scripts for its RSC payload.
    return [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        `connect-src 'self'${dev ? ' ws: wss:' : ''}`,
        "frame-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
    ].join('; ');
}

export function privateHeaders(res) {
    res.headers.set('Cache-Control', 'private, no-store, max-age=0');
    res.headers.set('CDN-Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Content-Security-Policy', csp());
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('Referrer-Policy', 'same-origin');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    return res;
}

export async function internalGate(request) {
    const cfg = authConfig();
    if (!cfg.ok) {
        // Never open: say what is missing (names only, no values).
        const body = `Ops admin not configured.\n\n${cfg.problems.map((p) => `- ${p}`).join('\n')}\n\nSee docs/ops/README.md.`;
        return privateHeaders(new NextResponse(body, { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } }));
    }
    const { pathname } = request.nextUrl;
    if (pathname === '/internal/login') return privateHeaders(NextResponse.next());
    const user = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value, cfg);
    if (!user) {
        const url = new URL('/internal/login', request.url);
        url.searchParams.set('next', pathname + request.nextUrl.search);
        return privateHeaders(NextResponse.redirect(url, 303));
    }
    return privateHeaders(NextResponse.next());
}
