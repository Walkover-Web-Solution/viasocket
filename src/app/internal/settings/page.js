import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { knowledgeSource } from '@/lib/ops/knowledge';
import { connectionStatus, experimentsLive, githubConfig, isProductionSite, storeConfig } from '@/lib/ops/config';
import { ANALYSES, DATA_SOURCES } from '@/lib/ops/shared/analyses-registry.mjs';
import { MAX_SLOTS } from '@/lib/ops/experiments';
import { Shell, Pill, Csrf, StoreBanner } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Settings' };

function scheduleFromWorkflow(text) {
    if (!text) return null;
    const crons = [...text.matchAll(/cron:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
    const paused = /OPS_ANALYSES_PAUSED/.test(text);
    return { crons, paused };
}

export default async function SettingsPage({ searchParams }) {
    const user = await requireUser('/internal/settings');
    const sp = await searchParams;
    const store = getStore();
    const health = await store.health();
    const { settings, connected } = await getSettings(store);
    const conn = connectionStatus();
    const source = knowledgeSource();
    const owner = can(user, 'owner');
    const writable = owner && connected && health.ok;
    let workflow = null;
    if (source.kind !== 'none') {
        const f = await source.read('.github/workflows/website-analyses.yml').catch(() => null);
        workflow = scheduleFromWorkflow(f?.exists ? f.content : null);
    }
    const sc = storeConfig();
    const gh = githubConfig();
    const Save = ({ section, children }) => (
        <form className="ops-form" method="post" action="/api/internal/settings">
            <Csrf user={user} back="/internal/settings" />
            <input type="hidden" name="section" value={section} />
            <fieldset disabled={!writable} style={{ border: 0, padding: 0 }}>
                {children}
                <div>
                    <button className="btn-o" type="submit">
                        Save
                    </button>
                </div>
            </fieldset>
        </form>
    );

    return (
        <Shell user={user} active="settings" title="Settings" intro={owner ? 'Owner-only changes. Every save is in History.' : `Read-only for the ${user.role} role. Owners change settings.`} flash={flashFrom(sp)}>
            <StoreBanner store={store} health={health} />

            <section aria-labelledby="data">
                <h2 id="data" style={{ marginBottom: 10 }}>
                    Connections
                </h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Connection</th>
                                <th scope="col">State</th>
                                <th scope="col">Detail / next step</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ops store</td>
                                <td>
                                    <Pill>{store.connected && health.ok ? 'connected' : 'not connected'}</Pill>
                                </td>
                                <td className="ops-small">{sc.kind === 'none' ? `Set ${sc.missing.join(', ')} (tables in docs/CONTRACTS.md § Ops store).` : health.detail}</td>
                            </tr>
                            <tr>
                                <td>Knowledge writeback</td>
                                <td>
                                    <Pill>{source.kind === 'none' ? 'not connected' : 'connected'}</Pill>
                                </td>
                                <td className="ops-small">{source.kind === 'none' ? source.reason : `${source.label}${source.kind === 'github' ? '' : `; production target would be ${gh.repo} → ${gh.base}`}`}</td>
                            </tr>
                            <tr>
                                <td>Analysis ingest</td>
                                <td>
                                    <Pill>{conn.ingest.connected ? 'connected' : 'not connected'}</Pill>
                                </td>
                                <td className="ops-small">{conn.ingest.detail}</td>
                            </tr>
                            <tr>
                                <td>AI interpretation</td>
                                <td>
                                    <Pill tone="off">not connected</Pill>
                                </td>
                                <td className="ops-small">{conn.ai.detail}</td>
                            </tr>
                            <tr>
                                <td>Coding-agent generation</td>
                                <td>
                                    <Pill tone="off">not connected</Pill>
                                </td>
                                <td className="ops-small">{conn.codingAgent.detail}</td>
                            </tr>
                            <tr>
                                <td>Notification delivery</td>
                                <td>
                                    <Pill tone="off">not connected</Pill>
                                </td>
                                <td className="ops-small">{conn.notifications.detail}</td>
                            </tr>
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

            <section className="ops-section" aria-labelledby="policy">
                <h2 id="policy">Experiment policy and automation authority</h2>
                <div className="ops-card ops-stack ops-small">
                    <p>
                        Policy: <a href="/internal/knowledge/doc?path=docs%2FEXPERIMENTS.md">docs/EXPERIMENTS.md</a>. Metric definitions: <a href="/internal/knowledge/doc?path=docs%2FMEASUREMENT.md">docs/MEASUREMENT.md</a>.
                    </p>
                    <p>
                        Max {MAX_SLOTS} variants per surface (1 baseline + 2 challengers). Production live switch: <strong>{experimentsLive() ? 'on' : 'off'}</strong> (OPS_EXPERIMENTS_LIVE, env only). Build: {isProductionSite() ? 'production' : 'non-production'}.
                    </p>
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Role</th>
                                <th scope="col">May</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>viewer</td>
                                <td>Read everything; mark own browser as internal traffic.</td>
                            </tr>
                            <tr>
                                <td>editor</td>
                                <td>Edit knowledge and the watchlist (draft → submit), run/pause the source check and analyses, create and edit experiment drafts, run checks, reserve slots, pause and roll back experiments.</td>
                            </tr>
                            <tr>
                                <td>owner</td>
                                <td>Everything above, plus launch/resume, promote, retire, new phase, and settings.</td>
                            </tr>
                            <tr>
                                <td>automation</td>
                                <td>Analysis jobs may only write runs through the ingest token. No job can launch, promote or edit knowledge.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="ops-muted">Roles come from OPS_USERS (env). They cannot be changed here.</p>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="sched">
                <h2 id="sched">Analyses and schedules</h2>
                <div className="ops-card ops-stack">
                    <p className="ops-small">
                        Schedules live in <span className="mono">.github/workflows/website-analyses.yml</span>
                        {workflow ? <> (cron: <span className="mono">{workflow.crons.join(', ') || 'none'}</span>)</> : ' (file not readable from this source)'}. Changing a schedule means editing that file; pausing every scheduled run means setting the repo variable <span className="mono">OPS_ANALYSES_PAUSED=true</span>. The switches below are read by each run before it starts.
                    </p>
                    <Save section="analyses">
                        <div className="ops-2col">
                            {ANALYSES.map((a) => (
                                <label key={a.name} className="ops-check">
                                    <input type="checkbox" name={`enabled_${a.name}`} defaultChecked={settings.analyses[a.name]?.enabled !== false} /> {a.name}
                                    <span className="hint">({a.schedule})</span>
                                </label>
                            ))}
                        </div>
                    </Save>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="knowledge">
                <h2 id="knowledge">Approved knowledge sources</h2>
                <Save section="knowledge">
                    <label>
                        Repo paths, one per line
                        <span className="hint">Only AGENTS.md and docs/**.md|json paths are accepted.</span>
                        <textarea name="knowledgeSources" rows={8} defaultValue={settings.knowledgeSources.join('\n')} />
                    </label>
                </Save>
            </section>

            <section className="ops-section" aria-labelledby="guidance">
                <h2 id="guidance">Extra agent guidance</h2>
                <Save section="guidance">
                    <label>
                        Free text
                        <span className="hint">Shown to agents and people as context. It is never parsed for permissions, so it cannot override roles, gates or the live switch.</span>
                        <textarea name="agentGuidance" rows={5} defaultValue={settings.agentGuidance} />
                    </label>
                </Save>
            </section>

            <div className="ops-2col ops-section">
                <section aria-labelledby="thr">
                    <h2 id="thr" style={{ marginBottom: 10 }}>
                        Freshness thresholds
                    </h2>
                    <Save section="thresholds">
                        <label>
                            Knowledge stale after (days since verified_on)
                            <input type="number" name="knowledgeStaleDays" defaultValue={settings.thresholds.knowledgeStaleDays} />
                        </label>
                        <label>
                            Analysis stale after (hours)
                            <input type="number" name="analysisStaleHours" defaultValue={settings.thresholds.analysisStaleHours} />
                        </label>
                        <label>
                            Research grace (days past cadence)
                            <input type="number" name="researchGraceDays" defaultValue={settings.thresholds.researchGraceDays} />
                        </label>
                    </Save>
                </section>
                <section aria-labelledby="bud">
                    <h2 id="bud" style={{ marginBottom: 10 }}>
                        Budgets
                    </h2>
                    <Save section="budgets">
                        <label>
                            Requests per analysis run
                            <input type="number" name="analysisRequests" defaultValue={settings.budgets.analysisRequests} />
                        </label>
                        <label>
                            Minutes per analysis run
                            <input type="number" name="analysisMinutes" defaultValue={settings.budgets.analysisMinutes} />
                        </label>
                        <label>
                            URLs per source change check
                            <input type="number" name="researchUrls" defaultValue={settings.budgets.researchUrls} />
                        </label>
                    </Save>
                </section>
            </div>

            <section className="ops-section" aria-labelledby="notif">
                <h2 id="notif">Notification preferences</h2>
                <div className="ops-banner" role="note">
                    Stored only. Delivery is not connected, so nothing is sent.
                </div>
                <Save section="notifications">
                    <label className="ops-check">
                        <input type="checkbox" name="onFailedAnalysis" defaultChecked={settings.notifications.onFailedAnalysis} /> Failed analysis
                    </label>
                    <label className="ops-check">
                        <input type="checkbox" name="onOverdueResearch" defaultChecked={settings.notifications.onOverdueResearch} /> Overdue research
                    </label>
                    <label className="ops-check">
                        <input type="checkbox" name="onExperimentHealth" defaultChecked={settings.notifications.onExperimentHealth} /> Experiment health problem
                    </label>
                    <label>
                        Recipients
                        <input type="text" name="recipients" defaultValue={settings.notifications.recipients} />
                    </label>
                </Save>
            </section>
        </Shell>
    );
}
