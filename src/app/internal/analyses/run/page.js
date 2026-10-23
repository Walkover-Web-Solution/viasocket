import { requireUser } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getRun } from '@/lib/ops/analyses';
import { analysisByName } from '@/lib/ops/shared/analyses-registry.mjs';
import { Shell, Pill, StoreBanner, fmtDate } from '../../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Analysis run' };

export default async function RunPage({ searchParams }) {
    const sp = await searchParams;
    const id = typeof sp?.id === 'string' ? sp.id : '';
    const user = await requireUser(`/internal/analyses/run?id=${encodeURIComponent(id)}`);
    const store = getStore();
    const run = store.connected ? await getRun(store, id).catch(() => null) : null;
    if (!run) {
        return (
            <Shell user={user} active="analyses" title="Run not found">
                <StoreBanner store={store} />
                <p>No run with that id.</p>
            </Shell>
        );
    }
    const def = analysisByName(run.analysis);
    const findings = run.findings || [];
    const order = { high: 0, medium: 1, low: 2, info: 3 };
    return (
        <Shell user={user} active="analyses" title={def?.question || run.analysis} intro={<span className="mono">{run.runId}</span>}>
            <dl className="ops-kv ops-card" style={{ marginBottom: 16 }}>
                <dt>Status</dt>
                <dd>
                    <Pill>{run.status}</Pill>
                </dd>
                <dt>Trigger</dt>
                <dd>{run.trigger}</dd>
                <dt>Started / finished</dt>
                <dd>
                    {fmtDate(run.startedAt)} / {fmtDate(run.finishedAt)}
                </dd>
                <dt>Attempt</dt>
                <dd>{run.attempt}</dd>
                <dt>Data window</dt>
                <dd className="mono">{run.window}</dd>
                <dt>Base URL</dt>
                <dd className="mono">{run.baseUrl || '—'}</dd>
                <dt>Code revision</dt>
                <dd className="mono">{run.codeRevision || '—'}</dd>
                <dt>Input revision</dt>
                <dd className="mono">{run.inputRevision || '—'}</dd>
                <dt>Idempotency key</dt>
                <dd className="mono">{run.idempotencyKey}</dd>
                {run.error ? (
                    <>
                        <dt>Error</dt>
                        <dd>{run.error}</dd>
                    </>
                ) : null}
                {run.notes ? (
                    <>
                        <dt>Notes</dt>
                        <dd>{run.notes}</dd>
                    </>
                ) : null}
                <dt>AI interpretation</dt>
                <dd>
                    <Pill tone="off">not connected</Pill> <span className="ops-small ops-muted">Only the facts below are shown.</span>
                </dd>
            </dl>
            <section className="ops-section">
                <h2>Findings ({findings.length})</h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Severity</th>
                                <th scope="col">Finding</th>
                                <th scope="col">Evidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...findings]
                                .sort((a, b) => order[a.severity] - order[b.severity])
                                .map((f, i) => (
                                    <tr key={i}>
                                        <td>
                                            <Pill tone={f.severity === 'high' ? 'bad' : f.severity === 'medium' ? 'warn' : 'off'}>{f.severity}</Pill>
                                        </td>
                                        <td>{f.title}</td>
                                        <td className="mono ops-small" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                                            {f.evidence ? JSON.stringify(f.evidence, null, 1) : ''}
                                        </td>
                                    </tr>
                                ))}
                            {!findings.length ? (
                                <tr>
                                    <td colSpan={3} className="ops-muted">
                                        No findings.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="ops-section">
                <details>
                    <summary>Raw results JSON</summary>
                    <div>
                        <pre className="mono ops-small" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                            {JSON.stringify(run.results, null, 2)}
                        </pre>
                    </div>
                </details>
            </section>
        </Shell>
    );
}
