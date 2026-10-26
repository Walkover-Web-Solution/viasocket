// Competitor research: the watchlist lives in the repo (docs/research/watchlist.json, owned by
// the research agent). Until that file exists the admin reads docs/ops/fixtures/watchlist.json
// and says so. Edits go through the same knowledge writeback as docs.

import { checkSources, watchUrlsFrom } from './shared/source-check.mjs';
import { daysSince } from './shared/frontmatter.mjs';
import { ingestRun, lastSucceeded, newRunId } from './analyses';
import { windowKey, idempotencyKey } from './shared/analyses-registry.mjs';
import { randomId } from './shared/crypto.mjs';

export const WATCHLIST_PATH = 'docs/research/watchlist.json';
export const WATCHLIST_FIXTURE = 'docs/ops/fixtures/watchlist.json';
export const DEFAULT_CADENCE = { direct: 14, indirect: 30, substitute: 60 };

export async function loadWatchlist(source) {
    if (source.kind === 'none') return { connected: false };
    for (const [path, fixture] of [
        [WATCHLIST_PATH, false],
        [WATCHLIST_FIXTURE, true],
    ]) {
        const f = await source.read(path);
        if (f.exists) {
            try {
                return { connected: true, path, fixture, sha: f.sha, raw: f.content, data: JSON.parse(f.content) };
            } catch (err) {
                return { connected: true, path, fixture, sha: f.sha, raw: f.content, error: `Invalid JSON: ${err.message}` };
            }
        }
    }
    return { connected: true, missing: true };
}

export function freshness(watchlist, now = Date.now()) {
    const cadence = { ...DEFAULT_CADENCE, ...(watchlist?.review_cadence_days || {}) };
    return (watchlist?.competitors || []).map((c) => {
        const days = cadence[c.category] ?? cadence.indirect;
        const age = daysSince(c.last_checked, now);
        const paused = c.status === 'paused' || c.status === 'retired';
        return {
            ...c,
            cadenceDays: days,
            ageDays: age,
            overdue: !paused && (age === null || age > days),
            dueInDays: age === null ? null : days - age,
        };
    });
}

/** Apply a validated edit to one competitor entry or the cadence; returns new JSON text. */
export function applyWatchlistEdit(data, edit) {
    const next = JSON.parse(JSON.stringify(data));
    if (edit.kind === 'cadence') {
        next.review_cadence_days = { ...(next.review_cadence_days || {}) };
        for (const k of ['direct', 'indirect', 'substitute']) {
            const n = Number(edit[k]);
            if (Number.isInteger(n) && n >= 1 && n <= 365) next.review_cadence_days[k] = n;
        }
    } else if (edit.kind === 'entry') {
        const c = (next.competitors || []).find((x) => x.id === edit.id);
        if (!c) throw new Error(`No competitor ${edit.id}`);
        if (['active', 'watch', 'paused', 'retired'].includes(edit.status)) c.status = edit.status;
        if (['high', 'medium', 'low'].includes(edit.relevance)) c.relevance = edit.relevance;
        if (['direct', 'indirect', 'substitute'].includes(edit.category)) c.category = edit.category;
        if (typeof edit.notes === 'string') c.notes = edit.notes.slice(0, 2000);
        if (typeof edit.last_checked === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(edit.last_checked)) c.last_checked = edit.last_checked;
        if (typeof edit.watch === 'string') {
            c.watch = edit.watch
                .split(/\s+/)
                .map((s) => s.trim())
                .filter((s) => /^https:\/\/[^\s]+$/.test(s))
                .slice(0, 20);
        }
    } else {
        throw new Error('unknown edit');
    }
    next.updated_on = new Date().toISOString().slice(0, 10);
    return `${JSON.stringify(next, null, 2)}\n`;
}

/**
 * The "source change check" run from the admin ("Run now"). Recorded as a watch-urls analysis
 * run so scheduled and manual checks show in one history.
 */
export async function runSourceCheckNow(store, watch, { codeRevision, budget = 40, actor }) {
    const urls = watchUrlsFrom(watch.data);
    const window = `${windowKey('day')}-manual-${Date.now()}`;
    const key = idempotencyKey('watch-urls', `${watch.path}@${(watch.sha || '').slice(0, 12)}`, window);
    const runId = newRunId('watch-urls', randomId(6));
    const base = { runId, analysis: 'watch-urls', idempotencyKey: key, trigger: `admin:${actor}`, codeRevision, inputRevision: `${watch.path}@${watch.sha}`, window, startedAt: new Date().toISOString() };
    const claimed = await ingestRun(store, { ...base, status: 'running' });
    if (!claimed.ok) return { ok: false, error: claimed.error || 'duplicate run' };
    if (!urls.length) {
        await ingestRun(store, { ...base, status: 'insufficient-data', findings: [], results: { urls: 0 }, notes: 'No active competitor has watch URLs.' });
        return { ok: true, runId, status: 'insufficient-data' };
    }
    const prev = await lastSucceeded(store, 'watch-urls');
    const previous = Object.fromEntries((prev?.results?.sources || []).filter((s) => s.hash).map((s) => [s.url, { hash: s.hash }]));
    const { results, requests } = await checkSources(urls, previous, { budget, timeoutMs: 6000 });
    const findings = results
        .filter((r) => r.changed || !r.ok)
        .map((r) =>
            r.changed
                ? { severity: 'medium', title: `Source changed: ${r.url}`, evidence: { competitor: r.competitorId, url: r.url, previousHash: r.previousHash, hash: r.hash } }
                : { severity: 'low', title: `Could not fetch ${r.url}`, evidence: { competitor: r.competitorId, url: r.url, status: r.status, error: r.error } }
        );
    const fetched = results.filter((r) => r.ok).length;
    const status = fetched === 0 ? 'failed' : 'succeeded';
    // Keep the hash of a source that failed this time, so one bad fetch does not reset its baseline.
    const sources = results.map((r) => (r.ok ? r : { ...r, hash: previous[r.url]?.hash || null }));
    await ingestRun(store, {
        ...base,
        status,
        finishedAt: new Date().toISOString(),
        results: { sources, requests, changed: results.filter((r) => r.changed).length, firstSeen: results.filter((r) => r.firstSeen).length, fetched, total: urls.length },
        findings,
        error: status === 'failed' ? 'No watch URL could be fetched' : null,
    });
    return { ok: true, runId, status };
}
