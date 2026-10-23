import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { authConfig } from '@/lib/ops/config';
import { PRELAUNCH_FIELDS, SURFACES, changeBrief, getExperiment, prelaunchMissing, previewToken } from '@/lib/ops/experiments';
import { experimentHealth } from '@/lib/ops/overview';
import { variantCounts } from '@/lib/ops/exp-counts';
import { Shell, Pill, Csrf, StoreBanner, fmtDate, pct } from '../../_components/ui';
import { ExperimentForm } from '../../_components/experiment-form';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Experiment' };

const Action = ({ user, id, action, label, children, danger, back }) => (
    <form method="post" action={`/api/internal/experiments/${action}`} className="ops-row">
        <Csrf user={user} back={back} />
        <input type="hidden" name="id" value={id} />
        {children}
        <button className={`btn-o${danger ? ' danger' : ' ghost'}`} type="submit">
            {label}
        </button>
    </form>
);

export default async function ExperimentView({ searchParams }) {
    const sp = await searchParams;
    const id = typeof sp?.id === 'string' ? sp.id : '';
    const back = `/internal/experiments/view?id=${encodeURIComponent(id)}`;
    const user = await requireUser(back);
    const store = getStore();
    const exp = store.connected ? await getExperiment(store, id).catch(() => null) : null;
    if (!exp) {
        return (
            <Shell user={user} active="experiments" title="Experiment not found">
                <StoreBanner store={store} />
            </Shell>
        );
    }
    const editing = sp?.edit === '1' && can(user, 'editor') && ['draft', 'ready'].includes(exp.status);
    const missing = prelaunchMissing(exp);
    const h = await experimentHealth(store, exp);
    const bucket = ['customer', 'synthetic'].includes(sp?.bucket) ? sp.bucket : 'customer';
    const keys = exp.variants.map((v) => v.key);
    const counts = variantCounts(h.counts, bucket, exp.primaryOutcome || 'signup_start', keys);
    const ev = bucket === 'customer' ? h.evaluation : h.syntheticEval;
    const weights = Object.fromEntries(exp.variants.map((v) => [v.key, v.weight]));
    const cfg = authConfig();
    const previews = can(user, 'editor') && cfg.ok ? await Promise.all(exp.variants.map(async (v) => ({ key: v.key, url: `${SURFACES[exp.surface].path}?vs_preview=${exp.id}:${v.key}&vs_pt=${await previewToken(cfg.secret, exp.id, v.key)}` }))) : [];
    const brief = changeBrief(exp, keys.find((k) => k !== 'A'));
    const lc = exp.lastChecks;

    return (
        <Shell user={user} active="experiments" title={exp.title} intro={<span className="mono">{exp.id}{exp.synthetic ? ' · synthetic test experiment' : ''}</span>} flash={flashFrom(sp)}>
            <div className="ops-card ops-row" style={{ marginBottom: 16 }}>
                <Pill>{exp.status}</Pill>
                <span>Phase {exp.phase}</span>
                <span className="ops-muted ops-small">{exp.phaseStartedAt ? `since ${fmtDate(exp.phaseStartedAt)}` : 'never launched'}</span>
                <span className="ops-muted ops-small">Surface {SURFACES[exp.surface]?.label}</span>
                {exp.rolledBack ? <Pill tone="bad">rolled back</Pill> : null}
                {exp.promoted ? <Pill tone="good">{`promoted ${exp.promoted}`}</Pill> : null}
            </div>

            {editing ? (
                <section aria-labelledby="edit">
                    <h2 id="edit" style={{ marginBottom: 10 }}>
                        Edit draft
                    </h2>
                    <ExperimentForm user={user} exp={exp} action="/api/internal/experiments/update" back={`${back}&edit=1`} />
                </section>
            ) : null}

            <section aria-labelledby="checks">
                <h2 id="checks" style={{ marginBottom: 10 }}>
                    Launch checks
                </h2>
                <div className="ops-grid">
                    <div className="ops-card ops-stack">
                        <h3>Pre-launch fields</h3>
                        {missing.length ? <Pill tone="warn">{`${missing.length} missing`}</Pill> : <Pill tone="good">complete</Pill>}
                        <ul className="ops-small" style={{ margin: 0, paddingLeft: 18 }}>
                            {PRELAUNCH_FIELDS.map(([k, label]) => (
                                <li key={k}>
                                    {label}: {exp[k] === null || exp[k] === undefined || exp[k] === '' ? <strong>missing</strong> : 'set'}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="ops-card ops-stack">
                        <h3>Instrumentation</h3>
                        {lc ? <Pill>{lc.instrumentation.pass ? 'pass' : 'fail'}</Pill> : <Pill tone="off">not checked</Pill>}
                        {lc?.instrumentation.results.map((r) => (
                            <p key={r.key} className="ops-small">
                                {r.key} <span className="mono">{r.target}</span>: {r.detail}
                            </p>
                        ))}
                        <p className="ops-small ops-muted">{lc ? `Checked ${fmtDate(lc.at)} by ${lc.by}` : 'Run the checks before launch; launch re-runs them.'}</p>
                    </div>
                    <div className="ops-card ops-stack">
                        <h3>Cache safety ({SURFACES[exp.surface]?.path})</h3>
                        {lc ? <Pill>{lc.cache.pass ? 'pass' : 'fail'}</Pill> : <Pill tone="off">not checked</Pill>}
                        {lc ? <p className="ops-small">{lc.cache.detail}</p> : null}
                        {lc?.cache.evidence ? <p className="mono ops-small">{Object.entries(lc.cache.evidence).map(([k, v]) => `${k}: ${v ?? '—'}`).join(' · ')}</p> : null}
                        <p className="ops-small ops-muted">Required to pass on production, plus OPS_EXPERIMENTS_LIVE=true.</p>
                    </div>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="actions">
                <h2 id="actions">Actions</h2>
                <div className="ops-card ops-stack">
                    <div className="ops-row">
                        {can(user, 'editor') ? <Action user={user} id={exp.id} action="check" label="Run checks" back={back} /> : null}
                        {can(user, 'editor') && ['draft', 'ready'].includes(exp.status) && !editing ? (
                            <a className="btn-o ghost" href={`${back}&edit=1`}>
                                Edit draft
                            </a>
                        ) : null}
                        {can(user, 'editor') && exp.status === 'draft' ? <Action user={user} id={exp.id} action="ready" label="Mark ready" back={back} /> : null}
                        {['ready', 'paused'].includes(exp.status) ? (
                            can(user, 'owner') ? (
                                <Action user={user} id={exp.id} action="launch" label={exp.status === 'paused' ? 'Resume' : 'Launch'} back={back} />
                            ) : (
                                <span className="ops-small ops-muted">Launch needs the owner role.</span>
                            )
                        ) : null}
                        {can(user, 'editor') && exp.status === 'running' ? <Action user={user} id={exp.id} action="pause" label="Pause" back={back} /> : null}
                    </div>
                    {can(user, 'editor') && ['running', 'paused'].includes(exp.status) ? (
                        <Action user={user} id={exp.id} action="rollback" label="Roll back to A" danger back={back}>
                            <label style={{ flex: 1 }}>
                                Reason for rollback
                                <input type="text" name="note" required />
                            </label>
                        </Action>
                    ) : null}
                    {can(user, 'owner') && ['running', 'paused'].includes(exp.status) ? (
                        <Action user={user} id={exp.id} action="promote" label="Promote (conclude)" back={back}>
                            <label>
                                Variant
                                <select name="variant">
                                    {keys.map((k) => (
                                        <option key={k}>{k}</option>
                                    ))}
                                </select>
                            </label>
                            <label style={{ flex: 1 }}>
                                Decision note
                                <input type="text" name="note" required />
                            </label>
                        </Action>
                    ) : null}
                    {can(user, 'owner') && exp.status !== 'retired' ? (
                        <Action user={user} id={exp.id} action="retire" label="Retire" danger back={back}>
                            <label style={{ flex: 1 }}>
                                Why retire
                                <input type="text" name="note" required />
                            </label>
                        </Action>
                    ) : null}
                    {can(user, 'editor') && !['concluded', 'retired'].includes(exp.status) ? (
                        <Action user={user} id={exp.id} action="slot" label="Reserve challenger slot" back={back}>
                            <label>
                                Variant
                                <select name="variant" defaultValue="C">
                                    {['A', 'B', 'C'].map((k) => (
                                        <option key={k}>{k}</option>
                                    ))}
                                </select>
                            </label>
                        </Action>
                    ) : null}
                    {can(user, 'owner') && ['running', 'paused'].includes(exp.status) ? (
                        <details>
                            <summary>Start a new phase (material change: counts restart)</summary>
                            <div>
                                <form className="ops-form" method="post" action="/api/internal/experiments/phase">
                                    <Csrf user={user} back={back} />
                                    <input type="hidden" name="id" value={exp.id} />
                                    {exp.variants.map((v) => (
                                        <div key={v.key} className="ops-2col">
                                            <label>
                                                {v.key} target
                                                <input type="text" name={`variant_${v.key}_target`} defaultValue={v.target} />
                                            </label>
                                            <label>
                                                {v.key} weight
                                                <input type="number" name={`variant_${v.key}_weight`} defaultValue={v.weight} />
                                            </label>
                                        </div>
                                    ))}
                                    <label>
                                        What changed
                                        <input type="text" name="note" required />
                                    </label>
                                    <div>
                                        <button className="btn-o" type="submit">
                                            Start phase {exp.phase + 1}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </details>
                    ) : null}
                </div>
            </section>

            {previews.length ? (
                <section className="ops-section" aria-labelledby="preview">
                    <h2 id="preview">Preview links</h2>
                    <p className="ops-small ops-muted" style={{ marginBottom: 8 }}>
                        Signed for 24 hours. A preview forces the variant without assignment cookies, so it is never counted. Works while the experiment is in any state.
                    </p>
                    <ul className="ops-small" style={{ margin: 0, paddingLeft: 18 }}>
                        {previews.map((p) => (
                            <li key={p.key}>
                                <a href={p.url}>Preview {p.key}</a> <span className="mono ops-muted">{p.url.split('&vs_pt=')[0]}&amp;vs_pt=…</span>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            <section className="ops-section" aria-labelledby="results">
                <div className="ops-row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                    <h2 id="results">Results, phase {exp.phase}</h2>
                    <nav className="ops-row ops-small" aria-label="Traffic bucket">
                        <a href={back} aria-current={bucket === 'customer' ? 'page' : undefined}>
                            Customer traffic
                        </a>
                        <a href={`${back}&bucket=synthetic`} aria-current={bucket === 'synthetic' ? 'page' : undefined}>
                            Synthetic traffic (tests only)
                        </a>
                    </nav>
                </div>
                {bucket === 'synthetic' ? <div className="ops-banner">Synthetic test traffic. Never part of a decision.</div> : null}
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Variant</th>
                                <th scope="col">Weight</th>
                                <th scope="col" className="num">Assigned</th>
                                <th scope="col" className="num">Exposed</th>
                                <th scope="col" className="num">{exp.primaryOutcome || 'primary'}</th>
                                <th scope="col" className="num">Rate</th>
                                <th scope="col">Wilson 95% interval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ev.rows.map((r) => (
                                <tr key={r.key}>
                                    <td>
                                        {r.key} · {exp.variants.find((v) => v.key === r.key)?.label}
                                    </td>
                                    <td className="num">{weights[r.key]}%</td>
                                    <td className="num">{counts[r.key].assigned}</td>
                                    <td className="num">{counts[r.key].exposed}</td>
                                    <td className="num">{counts[r.key].converted}</td>
                                    <td className="num">{pct(r.ci.rate)}</td>
                                    <td className="mono ops-small">{r.ci.rate === null ? '—' : `${pct(r.ci.low)} – ${pct(r.ci.high)}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ops-card ops-stack" style={{ marginTop: 12 }}>
                    <div className="ops-row">
                        <strong>Verdict:</strong> <Pill>{ev.verdict}</Pill>
                    </div>
                    <p className="ops-small">{ev.reason}</p>
                    {ev.comparisons.map((c) => (
                        <p key={c.key} className="ops-small mono">
                            {c.key} vs A: diff {c.diff === null ? '—' : `${(c.diff * 100).toFixed(2)} pts`}, z {c.z === null ? '—' : c.z.toFixed(2)}, p {c.p === null ? '—' : c.p.toFixed(4)} (alpha {c.alpha.toFixed(4)}) {c.significant ? 'significant' : 'not significant'}
                        </p>
                    ))}
                    <p className="ops-small mono">
                        SRM: n={ev.srm.n}, chi-square {ev.srm.stat === null ? '—' : ev.srm.stat.toFixed(2)}, p {ev.srm.p === null ? '—' : ev.srm.p.toFixed(4)} {ev.srm.mismatch ? 'MISMATCH' : ''}
                    </p>
                    <p className="ops-small ops-muted">Method: {ev.method} Minimum sample {exp.minSamplePerVariant ?? '—'} per variant, planned {exp.plannedDays ?? '—'} days.</p>
                    <p className="ops-small ops-muted">
                        Excluded traffic this phase (events): {Object.entries(h.otherBuckets).map(([k, v]) => `${k} ${v}`).join(' · ')}
                    </p>
                    {h.problems.length ? <p className="ops-small"><strong>Health:</strong> {h.problems.join('; ')}</p> : null}
                </div>
            </section>

            <section className="ops-section" aria-labelledby="brief">
                <h2 id="brief">Change brief</h2>
                <div className="ops-banner" role="note">
                    Coding-agent generation: not connected. The brief below is generated from the registry fields; a person or agent implements it in viasocket-site.
                </div>
                <pre className="ops-card mono ops-small" style={{ whiteSpace: 'pre-wrap' }}>
                    {brief}
                </pre>
            </section>

            <section className="ops-section" aria-labelledby="decisions">
                <h2 id="decisions">Decisions log</h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">When</th>
                                <th scope="col">Who</th>
                                <th scope="col">Action</th>
                                <th scope="col">Phase</th>
                                <th scope="col">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...(exp.decisions || [])].reverse().map((d, i) => (
                                <tr key={i}>
                                    <td className="ops-small">{fmtDate(d.at)}</td>
                                    <td className="ops-small">
                                        {d.actor} ({d.role})
                                    </td>
                                    <td>{d.action}</td>
                                    <td className="num">{d.phase}</td>
                                    <td className="ops-small">{d.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="def">
                <h2 id="def">Definition</h2>
                <dl className="ops-kv ops-card ops-small">
                    {[['title', 'Title'], ...PRELAUNCH_FIELDS].map(([k, label]) => (
                        <div key={k} style={{ display: 'contents' }}>
                            <dt>{label}</dt>
                            <dd>{exp[k] === null || exp[k] === undefined || exp[k] === '' ? <span className="ops-muted">missing</span> : String(exp[k])}</dd>
                        </div>
                    ))}
                    <dt>Supporting outcomes</dt>
                    <dd>{(exp.supportingOutcomes || []).join(', ')}</dd>
                    <dt>Variants</dt>
                    <dd>
                        {exp.variants.map((v) => (
                            <div key={v.key} className="mono">
                                {v.key} {v.weight}% → {v.target} ({v.label})
                            </div>
                        ))}
                    </dd>
                </dl>
            </section>
        </Shell>
    );
}
