import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/ops/config';
import {
    SESSION_COOKIE,
    checkLogin,
    clientIp,
    createSessionToken,
    loginThrottled,
    noteLoginFailure,
    sameOrigin,
    sessionCookieOptions,
    verifySessionToken,
} from '@/lib/ops/auth';
import { PRIVATE_HEADERS, json, readCookie, safeReturn } from '@/lib/ops/http';
import { getStore } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';

export const runtime = 'edge';

const back = (request, params) => {
    const url = new URL('/internal/login', request.url);
    Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
    return NextResponse.redirect(url, { status: 303, headers: PRIVATE_HEADERS });
};

// GET /api/internal/auth/session → { email, role, csrf } for scripts and tests.
export async function GET(request, { params }) {
    const { action } = await params;
    if (action !== 'session') return json({ ok: false, error: 'Not found' }, 404);
    const cfg = authConfig();
    if (!cfg.ok) return json({ ok: false, error: 'Ops admin not configured', problems: cfg.problems }, 503);
    const user = await verifySessionToken(readCookie(request, SESSION_COOKIE), cfg);
    if (!user) return json({ ok: false, error: 'Sign in required' }, 401);
    return json({ ok: true, email: user.email, role: user.role, csrf: user.csrf, expires: new Date(user.exp * 1000).toISOString() });
}

export async function POST(request, { params }) {
    const { action } = await params;
    const cfg = authConfig();
    if (!cfg.ok) return json({ ok: false, error: 'Ops admin not configured', problems: cfg.problems }, 503);
    if (!sameOrigin(request)) return json({ ok: false, error: 'Cross-site request refused' }, 403);

    if (action === 'logout') {
        const user = await verifySessionToken(readCookie(request, SESSION_COOKIE), cfg);
        const res = back(request, { ok: 'Signed out' });
        res.cookies.set(SESSION_COOKIE, '', sessionCookieOptions(request.url, 0));
        if (user) await audit(getStore(), user, 'auth.logout', user.email);
        return res;
    }

    if (action !== 'login') return json({ ok: false, error: 'Not found' }, 404);
    const form = await request.formData().catch(() => null);
    const email = String(form?.get('email') || '').slice(0, 200);
    const password = String(form?.get('password') || '').slice(0, 500);
    const next = safeReturn(String(form?.get('next') || ''), '/internal');
    const ip = clientIp(request);

    if (loginThrottled(ip)) return back(request, { error: 'Too many attempts. Wait 10 minutes, then try again.', next });
    const user = email && password ? await checkLogin(email, password, cfg) : null;
    if (!user) {
        noteLoginFailure(ip);
        await new Promise((r) => setTimeout(r, 400));
        await audit(getStore(), { email: email.toLowerCase() || 'unknown', role: 'none' }, 'auth.login', email.toLowerCase(), { result: 'failed' });
        return back(request, { error: 'Email or password is incorrect.', next });
    }
    const res = NextResponse.redirect(new URL(next, request.url), { status: 303, headers: PRIVATE_HEADERS });
    res.cookies.set(SESSION_COOKIE, await createSessionToken(user.email, cfg.secret), sessionCookieOptions(request.url));
    await audit(getStore(), user, 'auth.login', user.email);
    return res;
}
