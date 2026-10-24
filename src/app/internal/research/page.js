import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { isKnowledgePath, knowledgeSource } from '@/lib/ops/knowledge';
import { researchSummary } from '@/lib/ops/overview';
import { listRuns } from '@/lib/ops/analyses';
import { DEFAULT_CADENCE } from '@/lib/ops/research';
import { Shell, Pill, Csrf, NotConnected, StoreBanner, fmtAgo, fmtDate } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Research' };

export default async function ResearchPage({ searchParams }) {
    const user = await requireUser('/internal/research');
    const sp = await searchParams;
    const store = getStore();
    const health = await store.health();
    const { settings } = await getSettings(store);
    const source = knowledgeSource();
    const w = source.kind === 'none' ? { connected: false } : await researchSummary(source);
    const runs = store.connected && health.ok ? await listRuns(store, 'watch-urls', 5).catch(() => []) : [];
    const last = runs[0];
    const paused = settings.analysesPaused || settings.analyses?.['watch-urls']?.paused;
    const editor = can(user, 'editor');
    const writable = editor && store.connected && health.ok && w.connected && !w.missing && !w.error;
    const cadence = { ...DEFAULT_CADENCE, ...(w.data?.review_cadence_days || {}) };
    const changedByUrl = Object.fromEntries((last?.results?.sources || []).map((s) => [s.url, s]));

    return (
        <Shell user={user} active="research" title="Research" intro="Competitor watchlist, review freshness against cadence, and a deterministic source change check (fetch, strip to text, hash, compare). No AI reading." flash={flashFrom(sp)}>
            <StoreBanner store={store} health={health} />
            {source.kind === 'none' ? <NotConnected what="Knowledge source" detail={source.reason} /> : null}
            {w.fixture ? (
                <div className="ops-banner" role="note">
                    Showing the schema fixture <span className="mono">{w.path}</span>. The real list, <span className="mono">docs/research/watchlist.json</span>, is created by the research workstream on another branch; this page switches to it automatically once it exists. Entries below are placeholders, not research.
                </div>
            ) : null}
            {w.missing ? <div className="ops-banner bad">No watchlist file in the source.</div> : null}
            {w.error ? <div className="ops-banner bad">Watchlist unreadable: {w.error}</div> : null}

            <section className="ops-section" aria-labelledby="check">
                <h2 id="check">Source change check</h2>
                <div className="ops-card ops-stack">
                    <div className="ops-row">
                        <Pill>{paused ? 'paused' : last ? last.status : 'never run'}</Pill>
                        <span>{last ? `Last run ${fmtAgo(last.finishedAt || last.startedAt)} (${fmtDate(last.finishedAt || last.startedAt)}), trigger ${last.trigger}` : 'No run recorded yet.'}</span>
                    </div>
                    {last?.results ? (
                        <p className="ops-small ops-muted">
                            {last.results.fetched}/{last.results.total} sources fetched · {last.results.changed} changed · {last.results.firstSeen} first seen (baseline recorded) ·{' '}
                            <a href={`/internal/analyses/run?id=${encodeURIComponent(last.runId)}`}>run details</a>
                        </p>
                    ) : null}
                    {last?.error ? <p className="ops-small">Error: {last.error}</p> : null}
                    {editor ? (
                        <div className="ops-row">
                            <form method="post" action="/api/internal/research/check">
                                <Csrf user={user} back="/internal/research" />
                                <button className="btn-o" type="submit" disabled={!writable || paused}>
                                    Run now
                                </button>
                            </form>
                            <form method="post" action="/api/internal/research/pause">
                                <Csrf user={user} back="/internal/research" />
                                <input type="hidden" name="paused" value={paused ? 'false' : 'true'} />
                                <button className="btn-o ghost" type="submit" disabled={!store.connected}>
                                    {paused ? 'Resume' : 'Pause'} check
                                </button>
                            </form>
                            <span className="ops-small ops-muted">Budget: {settings.budgets.researchUrls} URLs per run. Scheduled daily by the website-analyses workflow (watch-urls).</span>
                        </div>
                    ) : null}
                </div>
            </section>

            {w.rows ? (
                <section className="ops-section" aria-labelledby="list">
                    <h2 id="list">Watchlist</h2>
                    <p className="ops-small ops-muted" style={{ marginBottom: 8 }}>
                        {w.data.research_scope} · updated {w.data.updated_on} · cadence direct {cadence.direct} d, indirect {cadence.indirect} d, substitute {cadence.substitute} d
                    </p>
                    <div className="ops-scroll">
                        <table className="ops-table">
                            <thead>
                                <tr>
                                    <th scope="col">Competitor</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Relevance</th>
                                    <th scope="col">Last checked</th>
                                    <th scope="col">Freshness</th>
                                    <th scope="col">Report</th>
                                    <th scope="col">Watch URLs (last check)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {w.rows.map((c) => (
                                    <tr key={c.id}>
                                        <td>
                                            <a href={c.url}>{c.name}</a>
                                        </td>
                                        <td>{c.category}</td>
                                        <td>
                                            <Pill>{c.status}</Pill>
                                        </td>
                                        <td>{c.relevance}</td>
                                        <td>{c.last_checked || <span className="ops-muted">never</span>}</td>
                                        <td>{c.status === 'paused' || c.status === 'retired' ? <Pill tone="off">not tracked</Pill> : <Pill tone={c.overdue ? 'warn' : 'good'}>{c.overdue ? 'overdue' : `due in ${c.dueInDays} d`}</Pill>}</td>
                                        <td>{c.report ? isKnowledgePath(c.report) ? <a href={`/internal/knowledge/doc?path=${encodeURIComponent(c.report)}`} className="mono">{c.report}</a> : <span className="mono">{c.report}</span> : <span className="ops-muted">—</span>}</td>
                                        <td className="ops-small">
                                            {(c.watch || []).map((u) => {
                                                const r = changedByUrl[u];
                                                return (
                                                    <div key={u}>
                                                        <a href={u}>{u}</a> {r ? <Pill tone={r.changed ? 'warn' : r.ok ? 'good' : 'bad'}>{r.changed ? 'changed' : r.firstSeen ? 'baseline' : r.ok ? 'unchanged' : 'fetch failed'}</Pill> : null}
                                                    </div>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : null}

            {writable && w.rows ? (
                <section className="ops-section" aria-labelledby="edit">
                    <h2 id="edit">Edit the watchlist</h2>
                    <p className="ops-small ops-muted" style={{ marginBottom: 8 }}>
                        Writes <span className="mono">{w.path}</span> through the knowledge writeback ({source.label}), checked against blob <span className="mono">{w.sha.slice(0, 10)}</span>.
                    </p>
                    <div className="ops-stack">
                        <details>
                            <summary>Review cadence</summary>
                            <div>
                                <form className="ops-form" method="post" action="/api/internal/research/edit-cadence">
                                    <Csrf user={user} back="/internal/research" />
                                    <input type="hidden" name="baseSha" value={w.sha} />
                                    <div className="ops-2col">
                                        {['direct', 'indirect', 'substitute'].map((k) => (
                                            <label key={k}>
                                                {k} (days)
                                                <input type="number" name={k} min="1" max="365" defaultValue={cadence[k]} />
                                            </label>
                                        ))}
                                    </div>
                                    <div>
                                        <button className="btn-o" type="submit">
                                            Save cadence
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </details>
                        {w.rows.map((c) => (
                            <details key={c.id}>
                                <summary>{c.name}</summary>
                                <div>
                                    <form className="ops-form" method="post" action="/api/internal/research/edit-entry">
                                        <Csrf user={user} back="/internal/research" />
                                        <input type="hidden" name="baseSha" value={w.sha} />
                                        <input type="hidden" name="id" value={c.id} />
                                        <div className="ops-2col">
                                            <label>
                                                Status
                                                <select name="status" defaultValue={c.status}>
                                                    {['active', 'watch', 'paused', 'retired'].map((o) => (
                                                        <option key={o}>{o}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label>
                                                Category
                                                <select name="category" defaultValue={c.category}>
                                                    {['direct', 'indirect', 'substitute'].map((o) => (
                                                        <option key={o}>{o}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label>
                                                Relevance
                                                <select name="relevance" defaultValue={c.relevance}>
                                                    {['high', 'medium', 'low'].map((o) => (
                                                        <option key={o}>{o}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label>
                                                Last checked
                                                <input type="date" name="last_checked" defaultValue={c.last_checked || ''} />
                                            </label>
                                        </div>
                                        <label>
                                            Watch URLs <span className="hint">One https URL per line.</span>
                                            <textarea name="watch" rows={3} defaultValue={(c.watch || []).join('\n')} />
                                        </label>
                                        <label>
                                            Notes
                                            <textarea name="notes" rows={3} defaultValue={c.notes || ''} />
                                        </label>
                                        <div>
                                            <button className="btn-o" type="submit">
                                                Save {c.name}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            ) : null}
        </Shell>
    );
}
