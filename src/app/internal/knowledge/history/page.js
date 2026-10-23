import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { isKnowledgePath, knowledgeSource } from '@/lib/ops/knowledge';
import { lineDiff, hunks, diffStats } from '@/lib/ops/shared/diff.mjs';
import { Shell, Csrf, NotConnected, fmtDate } from '../../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'History' };

export default async function HistoryPage({ searchParams }) {
    const sp = await searchParams;
    const path = typeof sp?.path === 'string' ? sp.path : '';
    const rev = typeof sp?.rev === 'string' && /^[0-9a-f]{7,40}$/.test(sp.rev) ? sp.rev : null;
    const user = await requireUser(`/internal/knowledge/history?path=${encodeURIComponent(path)}`);
    const source = knowledgeSource();
    if (!isKnowledgePath(path) || source.kind === 'none') {
        return (
            <Shell user={user} active="knowledge" title="History">
                {source.kind === 'none' ? <NotConnected what="Knowledge source" detail={source.reason} /> : <p>Not a knowledge file.</p>}
            </Shell>
        );
    }
    const [{ commits, uncommitted }, current] = await Promise.all([source.history(path), source.read(path)]);
    // Compare the chosen revision (default: newest commit) with the file as it is now.
    const base = rev || commits[0]?.sha || null;
    let ops = null;
    let err = null;
    if (base) {
        try {
            const old = await source.show(path, base);
            ops = lineDiff(old.content, current.content);
        } catch (e) {
            err = e.message;
        }
    }
    const stats = ops ? diffStats(ops) : null;
    const shown = ops ? hunks(ops) : [];

    return (
        <Shell user={user} active="knowledge" title={`History of ${path}`} intro={`From ${source.label}. Restoring creates a draft from an old version; it changes nothing until you submit it.`} flash={flashFrom(sp)}>
            {uncommitted ? (
                <div className="ops-banner" role="note">
                    The working-tree file has uncommitted changes (for example from an admin edit). The diff below compares the selected commit with the file on disk.
                </div>
            ) : null}
            <div className="ops-scroll">
                <table className="ops-table">
                    <thead>
                        <tr>
                            <th scope="col">Commit</th>
                            <th scope="col">When</th>
                            <th scope="col">Author</th>
                            <th scope="col">Message</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commits.map((c) => (
                            <tr key={c.sha} aria-current={c.sha === base ? 'true' : undefined}>
                                <td className="mono">{c.sha.slice(0, 8)}</td>
                                <td>{fmtDate(c.date)}</td>
                                <td>{c.author}</td>
                                <td>{c.subject}</td>
                                <td>
                                    <div className="ops-row">
                                        <a href={`/internal/knowledge/history?path=${encodeURIComponent(path)}&rev=${c.sha}`}>{c.sha === base ? 'Comparing' : 'Compare with now'}</a>
                                        {can(user, 'editor') ? (
                                            <form method="post" action="/api/internal/knowledge/restore">
                                                <Csrf user={user} back={`/internal/knowledge/history?path=${encodeURIComponent(path)}`} />
                                                <input type="hidden" name="path" value={path} />
                                                <input type="hidden" name="rev" value={c.sha} />
                                                <button className="btn-o ghost" type="submit">
                                                    Restore as draft
                                                </button>
                                            </form>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {!commits.length ? (
                            <tr>
                                <td colSpan={5} className="ops-muted">
                                    No commits touch this file yet.
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
            <section className="ops-section">
                <h2>
                    Diff: <span className="mono">{base ? base.slice(0, 8) : '—'}</span> → current file
                </h2>
                {err ? <p className="ops-banner bad">{err}</p> : null}
                {stats ? (
                    <p className="ops-small ops-muted" style={{ marginBottom: 8 }}>
                        +{stats.added} / −{stats.removed} lines {stats.added + stats.removed === 0 ? '(identical)' : ''}
                    </p>
                ) : null}
                {shown.length && stats.added + stats.removed > 0 ? (
                    <div className="ops-diff" role="region" aria-label="Line diff" tabIndex={0}>
                        {shown.map((o, i) => (
                            <div key={i} className={o.op === '+' ? 'add' : o.op === '-' ? 'del' : o.op === '…' ? 'gap' : ''}>
                                {o.op === '…' ? '  …' : `${o.op} ${o.line}`}
                            </div>
                        ))}
                    </div>
                ) : null}
            </section>
        </Shell>
    );
}
