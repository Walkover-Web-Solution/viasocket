// Server-component side of ops auth. Middleware already gates /internal, this re-checks in the
// page itself (defence in depth) and hands the page the user and its CSRF token.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authConfig, roleRank } from './config';
import { SESSION_COOKIE, verifySessionToken } from './auth';

export async function currentUser() {
    const cfg = authConfig();
    if (!cfg.ok) return { cfg, user: null };
    const jar = await cookies();
    return { cfg, user: await verifySessionToken(jar.get(SESSION_COOKIE)?.value, cfg) };
}

/** Returns the user or redirects to the login page. */
export async function requireUser(nextPath = '/internal') {
    const { cfg, user } = await currentUser();
    if (!cfg.ok) redirect('/internal/login');
    if (!user) redirect(`/internal/login?next=${encodeURIComponent(nextPath)}`);
    return user;
}

export const can = (user, role) => Boolean(user) && roleRank(user.role) >= roleRank(role);

/** Flash message from ?ok= / ?error= after a form post. */
export function flashFrom(searchParams) {
    const ok = typeof searchParams?.ok === 'string' ? searchParams.ok : '';
    const error = typeof searchParams?.error === 'string' ? searchParams.error : '';
    return ok ? { kind: 'ok', text: ok } : error ? { kind: 'error', text: error } : null;
}
