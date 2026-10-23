// Server-only UI pieces for the ops area. No client JS: forms post to /api/internal/* and the
// route answers with a 303 back to the page (flash message in ?ok= / ?error=).

const NAV = [
    ['overview', 'Overview', '/internal'],
    ['knowledge', 'Knowledge', '/internal/knowledge'],
    ['research', 'Research', '/internal/research'],
    ['analyses', 'Analyses', '/internal/analyses'],
    ['experiments', 'Experiments', '/internal/experiments'],
    ['settings', 'Settings', '/internal/settings'],
    ['history', 'History', '/internal/history'],
];

export function Shell({ user, active, title, intro, actions, flash, children }) {
    return (
        <div className="ops-shell">
            <a className="ops-skip" href="#main">
                Skip to content
            </a>
            <nav className="ops-side" aria-label="Ops sections">
                <div className="ops-brand">
                    viaSocket website ops
                    <span>Private · not indexed</span>
                </div>
                <ul className="ops-nav">
                    {NAV.map(([key, label, href]) => (
                        <li key={key}>
                            <a href={href} aria-current={key === active ? 'page' : undefined}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="ops-who">
                    <div>
                        {user.email}
                        <br />
                        Role: <strong>{user.role}</strong>
                    </div>
                    <form method="post" action="/api/internal/auth/logout">
                        <Csrf user={user} />
                        <button className="btn-o ghost" type="submit">
                            Sign out
                        </button>
                    </form>
                </div>
            </nav>
            <main className="ops-main" id="main" tabIndex={-1}>
                <header className="ops-head">
                    <div>
                        <h1>{title}</h1>
                        {intro ? <p>{intro}</p> : null}
                    </div>
                    {actions ? <div className="ops-row">{actions}</div> : null}
                </header>
                <Flash flash={flash} />
                {children}
            </main>
        </div>
    );
}

export function Flash({ flash }) {
    if (!flash) return null;
    return (
        <div className={`ops-flash ${flash.kind}`} role={flash.kind === 'error' ? 'alert' : 'status'}>
            {flash.kind === 'error' ? 'Not done: ' : ''}
            {flash.text}
        </div>
    );
}

export const Csrf = ({ user, back }) => (
    <>
        <input type="hidden" name="csrf" value={user.csrf} />
        {back ? <input type="hidden" name="return_to" value={back} /> : null}
    </>
);

const TONE = {
    good: ['succeeded', 'effective', 'running', 'pass', 'connected', 'active', 'fresh', 'reserved', 'ok'],
    warn: ['pending', 'draft', 'ready', 'paused', 'stale', 'queued', 'insufficient-data', 'insufficient evidence', 'inconclusive', 'overdue', 'watch', 'never run', 'conflict'],
    bad: ['failed', 'sync-failed', 'fail', 'blocked', 'error', 'invalid'],
    off: ['not-connected', 'not connected', 'retired', 'concluded', 'discarded', 'off', 'disabled'],
};

export function Pill({ children, tone }) {
    const label = String(children);
    const t = tone || Object.keys(TONE).find((k) => TONE[k].some((w) => label.toLowerCase().startsWith(w))) || 'off';
    return <span className={`ops-pill ${t}`}>{label}</span>;
}

export function NotConnected({ what, detail, next }) {
    return (
        <div className="ops-banner" role="note">
            <strong>{what}: not connected.</strong> {detail} {next ? <span>Next step: {next}</span> : null}
        </div>
    );
}

export function StoreBanner({ store, health }) {
    if (!store.connected) {
        return (
            <div className="ops-banner bad" role="alert">
                <strong>Storage not connected.</strong> Missing {store.missing.join(', ')}. Everything below is read-only and writes are refused. Tables and columns needed: docs/CONTRACTS.md § Ops store.
            </div>
        );
    }
    if (health && !health.ok) {
        return (
            <div className="ops-banner bad" role="alert">
                <strong>Storage unreachable.</strong> {health.detail}
            </div>
        );
    }
    if (store.unverified) {
        return (
            <div className="ops-banner" role="note">
                Storage: table-api adapter. It has not been verified against the live tables yet (docs/ops/README.md).
            </div>
        );
    }
    return null;
}

export const fmtDate = (iso) => (iso ? new Date(iso).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : '—');
export const fmtAgo = (iso) => {
    if (!iso) return 'never';
    const h = (Date.now() - Date.parse(iso)) / 3600000;
    if (h < 1) return `${Math.max(1, Math.round(h * 60))} min ago`;
    if (h < 48) return `${Math.round(h)} h ago`;
    return `${Math.round(h / 24)} days ago`;
};
export const pct = (x) => (x === null || x === undefined ? '—' : `${(x * 100).toFixed(1)}%`);
