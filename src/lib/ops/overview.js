// Data loaders shared by the Overview and section pages. Each returns an honest state object
// ({ connected:false, ... } or { error }) instead of throwing, so one broken source never blanks
// the whole page.

import { summarize } from './knowledge';
import { freshness, loadWatchlist } from './research';
import { analysesOverview } from './analyses';
import { getCounts, variantCounts } from './exp-counts';
import { listExperiments } from './experiments';
import { evaluate } from './shared/stats.mjs';

export async function knowledgeSummaries(source, settings) {
    if (source.kind === 'none') return { connected: false, reason: source.reason, docs: [] };
    try {
        const files = await source.list();
        const byPath = Object.fromEntries(files.map((f) => [f.path, f]));
        const wanted = settings.knowledgeSources || [];
        const docs = await Promise.all(
            wanted.map(async (path) => {
                if (!byPath[path]) return { path, missing: true };
                const f = await source.read(path);
                return summarize(path, f.content, f.sha, settings.thresholds);
            })
        );
        const others = files.filter((f) => !wanted.includes(f.path) && f.path.endsWith('.md')).map((f) => f.path);
        return { connected: true, docs, others };
    } catch (err) {
        return { connected: true, error: err.message, docs: [] };
    }
}

export async function researchSummary(source) {
    try {
        const w = await loadWatchlist(source);
        if (!w.connected || w.missing || w.error) return w;
        return { ...w, rows: freshness(w.data) };
    } catch (err) {
        return { connected: true, error: err.message };
    }
}

export async function analysesSummary(store, settings) {
    try {
        return { rows: await analysesOverview(store, settings) };
    } catch (err) {
        return { error: err.message, rows: [] };
    }
}

export function daysBetween(fromIso, to = Date.now()) {
    const t = Date.parse(fromIso || '');
    return Number.isFinite(t) ? (to - t) / 86400000 : 0;
}

export async function experimentHealth(store, exp) {
    const counts = await getCounts(store, exp.id, exp.phase);
    const keys = exp.variants.map((v) => v.key);
    const weights = Object.fromEntries(exp.variants.map((v) => [v.key, v.weight]));
    const bucket = (name) => variantCounts(counts, name, exp.primaryOutcome || 'signup_start', keys);
    const customer = bucket('customer');
    const evaluation = evaluate(customer, { baseline: 'A', weights, minSamplePerVariant: exp.minSamplePerVariant, plannedDays: exp.plannedDays, daysRunning: daysBetween(exp.phaseStartedAt) });
    const synthetic = bucket('synthetic');
    const syntheticEval = evaluate(synthetic, { baseline: 'A', weights, minSamplePerVariant: exp.minSamplePerVariant, plannedDays: 0, daysRunning: 0 });
    const sumBucket = (name) => Object.values(counts.buckets?.[name] || {}).reduce((s, v) => s + Object.values(v).reduce((a, e) => a + (e.events || 0), 0), 0);
    const unassigned = sumBucket('unassigned');
    const exposuresWithoutAssignment = keys.filter((k) => customer[k].exposed > customer[k].assigned).map((k) => `${k}: ${customer[k].exposed} exposed vs ${customer[k].assigned} assigned`);
    const problems = [];
    if (evaluation.srm.mismatch) problems.push('sample ratio mismatch');
    if (unassigned) problems.push(`${unassigned} events claimed a variant the visitor was not assigned`);
    if (exposuresWithoutAssignment.length) problems.push(`exposures without assignment (${exposuresWithoutAssignment.join('; ')})`);
    return { counts, customer, synthetic, evaluation, syntheticEval, problems, otherBuckets: Object.fromEntries(['unassigned', 'late', 'internal', 'bot', 'synthetic_unassigned', 'synthetic_late'].map((b) => [b, sumBucket(b)])) };
}

export async function experimentsSummary(store) {
    try {
        const list = await listExperiments(store);
        const running = await Promise.all(list.filter((e) => e.status === 'running').map(async (e) => ({ exp: e, health: await experimentHealth(store, e) })));
        return { list, running };
    } catch (err) {
        return { error: err.message, list: [], running: [] };
    }
}
