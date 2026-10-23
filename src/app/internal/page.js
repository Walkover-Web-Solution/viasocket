import { requireUser, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { knowledgeSource } from '@/lib/ops/knowledge';
import { connectionStatus, experimentsLive, isProductionSite } from '@/lib/ops/config';
import { analysesSummary, experimentsSummary, knowledgeSummaries, researchSummary } from '@/lib/ops/overview';
import { DATA_SOURCES } from '@/lib/ops/shared/analyses-registry.mjs';
import { Shell, Pill, StoreBanner, fmtAgo } from './_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Overview' };

export default async function Overview({ searchParams }) {
    const user = await requireUser('/internal');
    const sp = await searchParams;
    const store = getStore();
    const health = await store.health();
    const { settings } = await getSettings(store);
    const source = knowledgeSource();
    const conn = connectionStatus();

    const [knowledge, research, analyses, experiments] = await Promise.all([
        knowledgeSummaries(source, settings),
        researchSummary(source),
        store.connected && health.ok ? analysesSummary(store, settings) : { rows: [], notConnected: true },
        store.connected && health.ok ? experimentsSummary(store) : { list: [], running: [], notConnected: true },
    ]);

    const items = [];
    const add = (kind, text, href, tone = 'warn') => items.push({ kind, text, href, tone });

    if (!store.connected || !health.ok) add('Storage', `Storage not connected (${health.detail}). Drafts, runs, experiments and audit cannot be saved.`, '/internal/settings', 'bad');
    if (source.kind === 'none') add('Knowledge', `Knowledge source not connected. ${source.reason}`, '/internal/settings', 'bad');
    for (const a of analyses.rows || []) {
        if (a.state.includes('failed')) add('Analysis', `${a.name} failed ${fmtAgo(a.last?.finishedAt)}: ${a.question}`, `/internal/analyses/run?id=${a.last?.runId}`, 'bad');
        else if (a.state.includes('stale')) add('Analysis', `${a.name} is stale (last ${fmtAgo(a.last?.finishedAt)}).`, '/internal/analyses');
        else if (a.state.includes('never run')) add('Analysis', `${a.name} has never run.`, '/internal/analyses', 'off');
        if (a.last?.findingCounts?.high) add('Finding', `${a.name}: ${a.last.findingCounts.high} high-severity finding(s).`, `/internal/analyses/run?id=${a.last.runId}`, 'bad');
    }
    if (analyses.notConnected) add('Analyses', 'Analysis history unavailable until storage is connected.', '/internal/analyses', 'off');
    for (const r of research.rows || []) if (r.overdue) add('Research', `${r.name} is overdue (${r.ageDays === null ? 'never checked' : `${r.ageDays} days since check`}, cadence ${r.cadenceDays} d).`, '/internal/research');
    if (research.fixture) add('Research', `Using the fixture watchlist (${research.path}); docs/research/watchlist.json is not in this tree yet.`, '/internal/research', 'off');
    for (const d of knowledge.docs || []) {
        if (d.missing) add('Knowledge', `${d.path} does not exist yet.`, '/internal/knowledge', 'off');
        else if (d.stale) add('Knowledge', `${d.path} is stale (verified ${d.fields.verified_on || 'never'}, threshold ${settings.thresholds.knowledgeStaleDays} d).`, `/internal/knowledge/doc?path=${encodeURIComponent(d.path)}`);
    }
    for (const { exp, health: h } of experiments.running || []) {
        add('Experiment', `${exp.id} running (phase ${exp.phase}): ${h.evaluation.verdict}.${h.problems.length ? ` Health: ${h.problems.join('; ')}.` : ''}`, `/internal/experiments/view?id=${exp.id}`, h.problems.length ? 'bad' : 'good');
    }
    for (const ds of DATA_SOURCES) add('Data', `${ds.name}: not connected.`, '/internal/settings#data', 'off');
    if (conn.ai.connected === false) add('Data', 'AI interpretation: not connected (analyses show facts only).', '/internal/analyses', 'off');

    const order = { bad: 0, warn: 1, good: 2, off: 3 };
    items.sort((a, b) => order[a.tone] - order[b.tone]);

    return (
        <Shell user={user} active="overview" title="What needs attention" intro="Failures and staleness first, then running experiments, then missing connections. No vanity charts." flash={flashFrom(sp)}>
            <StoreBanner store={store} health={health} />
            <ul className="ops-attn" aria-label="Attention items">
                {items.map((it, i) => (
                    <li key={i}>
                        <span>
                            <Pill tone={it.tone}>{it.kind}</Pill>
                        </span>
                        <span>{it.text}</span>
                        <a href={it.href}>Open</a>
                    </li>
                ))}
            </ul>
            <section className="ops-section" aria-labelledby="env">
                <h2 id="env">Environment</h2>
                <div className="ops-grid">
                    <div className="ops-card ops-stack">
                        <h3>Site</h3>
                        <p>{isProductionSite() ? 'Production build' : 'Non-production build'}</p>
                        <p className="ops-small ops-muted">Experiments live switch: {experimentsLive() ? 'on' : 'off (OPS_EXPERIMENTS_LIVE)'}</p>
                    </div>
                    <div className="ops-card ops-stack">
                        <h3>Storage</h3>
                        <Pill>{store.connected && health.ok ? 'connected' : 'not connected'}</Pill>
                        <p className="ops-small ops-muted">{health.detail}</p>
                    </div>
                    <div className="ops-card ops-stack">
                        <h3>Knowledge source</h3>
                        <Pill>{source.kind === 'none' ? 'not connected' : 'connected'}</Pill>
                        <p className="ops-small ops-muted">{source.label}</p>
                    </div>
                </div>
            </section>
        </Shell>
    );
}
