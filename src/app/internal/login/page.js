import { redirect } from 'next/navigation';
import { currentUser, flashFrom } from '@/lib/ops/page';
import { safeReturn } from '@/lib/ops/http';
import { Flash } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }) {
    const sp = await searchParams;
    const next = safeReturn(sp?.next, '/internal');
    const { cfg, user } = await currentUser();
    if (user) redirect(next);
    return (
        <main className="ops-login" id="main">
            <div className="ops-card ops-stack">
                <div>
                    <h1>Website ops</h1>
                    <p className="ops-muted">Private area for the viaSocket website team.</p>
                </div>
                {!cfg.ok ? (
                    <div className="ops-banner bad" role="alert">
                        Ops admin not configured.
                    </div>
                ) : (
                    <>
                        <Flash flash={flashFrom(sp)} />
                        <form className="ops-form" method="post" action="/api/internal/auth/login">
                            <input type="hidden" name="next" value={next} />
                            <label>
                                Email
                                <input type="email" name="email" autoComplete="username" required />
                            </label>
                            <label>
                                Password
                                <input type="password" name="password" autoComplete="current-password" required />
                            </label>
                            <button className="btn-o" type="submit">
                                Sign in
                            </button>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
