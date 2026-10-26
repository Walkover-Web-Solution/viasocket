import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { analysesSummary } from '@/lib/ops/overview';
import { connectionStatus } from '@/lib/ops/config';
import { DATA_SOURCES } from '@/lib/ops/shared/analyses-registry.mjs';
import { Shell, Pill, Csrf, StoreBanner, fmtAgo, fmtDate } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Analyses' };

export default async function AnalysesPage({ searchParams }) {
    const user = await requireUser('/internal/analyses');
    const sp = await searchParams;
    const store = getStore();
    const health = await store.health();
    const { settings } = await getSettings(store);
    const conn = connectionStatus();
    const ok = store.connected && health.ok;
    const { rows, error } = ok ? await analysesSummary(store, settings) : { rows: [] };
    const editor = can(user, 'editor');

    return (
        <Shell
            user={user}
            active="analyses"
            title="Analyses"
            intro="Deterministic checks run by scripts/analyses on a schedule (.github/workflows/website-analyses.yml) or by hand, and written here through the ingest endpoint. Facts only: AI interpretation is not connected."
            flash={flashFrom(sp)}
            actions={
                editor && ok ? (
                    <form method="post" action="/api/internal/analyses/pause">
                        <Csrf user={user} back="/internal/analyses" />
                        <input type="hidden" name="analysis" value="all" />
                        <input type="hidden" name="paused" value={settings.analysesPaused ? 'false' : 'true'} />
                        <button className="btn-o ghost" type="submit">
                            {settings.analysesPaused ? 'Resume all' : 'Pause all'}
                        </button>
                    </form>
                ) : null
            }
        >
            <StoreBanner store={store} health={health} />
            {!conn.ingest.connected ? <div className="ops-banner">Ingest endpoint: not connected ({conn.ingest.detail}). Scheduled runs cannot report here until it is set on this deployment and as a GitHub secret.</div> : null}
            {error ? <div className="ops-banner bad">{error}</div> : null}
            <div className="ops-stack">
                {(ok ? rows : []).map((a) => (
                    <article key={a.name} className="ops-card ops-stack" aria-labelledby={`a-${a.name}`}>
                        <div className="ops-row" style={{ justifyContent: 'space-between' }}>
                            <div>
                                <h2 id={`a-${a.name}`}>{a.question}</h2>
                                <p className="ops-small ops-muted mono">{a.name}</p>
                            </div>
                            <Pill>{a.state}</Pill>
                        </div>
                        <dl className="ops-kv ops-small">
                            <dt>Last final run</dt>
                            <dd>{a.last ? <a href={`/internal/analyses/run?id=${encodeURIComponent(a.last.runId)}`}>{`${a.last.status}, ${fmtAgo(a.last.finishedAt)} (${fmtDate(a.last.finishedAt)})`}</a> : 'never'}</dd>
                            <dt>Data window</dt>
                            <dd className="mono">{a.last?.window || '—'}</dd>
                            <dt>Code revision</dt>
                            <dd className="mono">{a.last?.codeRevision ? a.last.codeRevision.slice(0, 12) : '—'}</dd>
                            <dt>Findings (facts)</dt>
                            <dd>{a.last?.findingCounts ? `${a.last.findingCounts.high} high · ${a.last.findingCounts.medium} medium · ${a.last.findingCounts.low} low · ${a.last.findingCounts.info} info` : '—'}</dd>
                            <dt>AI interpretation</dt>
                            <dd>
                                <Pill tone="off">not connected</Pill>
                            </dd>
                            <dt>Proposed next action</dt>
                            <dd>{a.nextAction}</dd>
                            <dt>Sources</dt>
                            <dd>{a.sources.join(', ')}</dd>
                            <dt>Schedule</dt>
                            <dd>
                                {a.schedule} <span className="ops-muted">(change it in the workflow file)</span>
                            </dd>
                            {a.newest && ['queued', 'running'].includes(a.newest.status) ? (
                                <>
                                    <dt>In progress</dt>
                                    <dd>
                                        {a.newest.runId} since {fmtDate(a.newest.startedAt)}
                                    </dd>
                                </>
                            ) : null}
                        </dl>
                        {editor ? (
                            <form method="post" action="/api/internal/analyses/pause">
                                <Csrf user={user} back="/internal/analyses" />
                                <input type="hidden" name="analysis" value={a.name} />
                                <input type="hidden" name="paused" value={a.config.paused ? 'false' : 'true'} />
                                <button className="btn-o ghost" type="submit">
                                    {a.config.paused ? 'Resume' : 'Pause'} {a.name}
                                </button>
                            </form>
                        ) : null}
                    </article>
                ))}
            </div>

            <section className="ops-section" aria-labelledby="run">
                <h2 id="run">Run one now</h2>
                <div className="ops-card ops-stack">
                    <p>
                        Locally: <code>npm run analyze -- links</code> (BASE_URL defaults to http://localhost:1152). In GitHub: Actions → website-analyses → Run workflow. Re-running inside the same window is skipped by its idempotency key; add <code>--force</code> to override.
                    </p>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="data">
                <h2 id="data">Data sources</h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Source</th>
                                <th scope="col">State</th>
                                <th scope="col">Next step</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DATA_SOURCES.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.name}</td>
                                    <td>
                                        <Pill tone="off">not connected</Pill>
                                    </td>
                                    <td className="ops-small">{d.next}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </Shell>
    );
}
