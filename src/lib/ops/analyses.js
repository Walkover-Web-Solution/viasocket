// Analysis runs in the ops store.
//   analysis_runs/<runId>      one run: status, window, revision, results, findings
//   analysis_idem/<sha(key)>   idempotency claim: analysis + input revision + window → runId
//   analysis_latest/<name>     pointer to the newest final run, for the list page
// A final run (succeeded/failed/insufficient-data/not-connected) is immutable.

import { casUpdate } from './store';
import { sha256Hex } from './shared/crypto.mjs';
import { ANALYSES, FINAL_STATUSES, MAX_ATTEMPTS, RUN_STATUSES, SEVERITIES, analysisByName } from './shared/analyses-registry.mjs';

const RUN_ID = /^[a-z-]{2,40}\.[0-9]{14}\.[A-Za-z0-9_-]{4,16}$/;
const STALE_CLAIM_MS = 30 * 60 * 1000;

export function validateRun(body) {
    const errors = [];
    if (!analysisByName(body?.analysis)) errors.push('unknown analysis');
    if (!RUN_ID.test(body?.runId || '')) errors.push('runId must look like <analysis>.<yyyymmddHHMMSS>.<random>');
    else if (!body.runId.startsWith(`${body.analysis}.`)) errors.push('runId must start with the analysis name');
    if (!RUN_STATUSES.includes(body?.status)) errors.push(`status must be one of ${RUN_STATUSES.join(', ')}`);
    if (typeof body?.idempotencyKey !== 'string' || body.idempotencyKey.length > 300 || !body.idempotencyKey.startsWith(`${body?.analysis}|`)) errors.push('idempotencyKey must be "<analysis>|<input revision>|<window>"');
    if (body?.findings !== undefined) {
        if (!Array.isArray(body.findings) || body.findings.length > 500) errors.push('findings must be an array (max 500)');
        else if (body.findings.some((f) => !SEVERITIES.includes(f?.severity) || typeof f?.title !== 'string')) errors.push('each finding needs severity (high|medium|low|info) and title');
    }
    const size = JSON.stringify(body || {}).length;
    if (size > 400000) errors.push('run payload over 400 KB');
    return errors;
}

/**
 * Ingest one status update. Returns { ok, run, duplicate?, existingRunId?, exhausted? }.
 */
export async function ingestRun(store, body) {
    const idemId = (await sha256Hex(body.idempotencyKey)).slice(0, 40);
    const now = new Date().toISOString();
    const final = FINAL_STATUSES.includes(body.status);

    if (!final) {
        // Claim the idempotency key for this run, unless another run already owns the window.
        let verdict = null;
        const claim = await casUpdate(store, 'analysis_idem', idemId, (cur) => {
            verdict = null;
            if (cur && cur.runId !== body.runId) {
                if (['succeeded', 'insufficient-data', 'not-connected'].includes(cur.status)) {
                    verdict = { duplicate: true, existingRunId: cur.runId, existingStatus: cur.status };
                    return undefined;
                }
                if (['queued', 'running'].includes(cur.status) && Date.now() - Date.parse(cur.at) < STALE_CLAIM_MS) {
                    verdict = { duplicate: true, existingRunId: cur.runId, existingStatus: cur.status };
                    return undefined;
                }
                if ((cur.attempts || 0) >= MAX_ATTEMPTS) {
                    verdict = { exhausted: true, existingRunId: cur.runId, attempts: cur.attempts };
                    return undefined;
                }
            }
            const attempts = cur && cur.runId === body.runId ? cur.attempts || 1 : (cur?.attempts || 0) + 1;
            return { key: body.idempotencyKey, runId: body.runId, status: body.status, attempts, at: now };
        });
        if (verdict) return { ok: false, ...verdict };
        if (!claim.ok) return { ok: false, error: 'could not claim the run (store contention)' };
    }

    let refused = null;
    const res = await casUpdate(store, 'analysis_runs', body.runId, (cur) => {
        refused = null;
        if (cur && FINAL_STATUSES.includes(cur.status)) {
            refused = `run already ${cur.status}`;
            return undefined;
        }
        return {
            ...(cur || {}),
            runId: body.runId,
            analysis: body.analysis,
            idempotencyKey: body.idempotencyKey,
            status: body.status,
            attempt: body.attempt ?? cur?.attempt ?? 1,
            trigger: body.trigger || cur?.trigger || 'unknown',
            codeRevision: body.codeRevision || cur?.codeRevision || null,
            inputRevision: body.inputRevision || cur?.inputRevision || null,
            baseUrl: body.baseUrl || cur?.baseUrl || null,
            window: body.window || cur?.window || null,
            startedAt: body.startedAt || cur?.startedAt || now,
            finishedAt: final ? body.finishedAt || now : null,
            results: body.results ?? cur?.results ?? null,
            findings: body.findings ?? cur?.findings ?? [],
            error: body.error || null,
            notes: body.notes || cur?.notes || null,
            updatedAt: now,
        };
    });
    if (refused) return { ok: false, error: refused };
    if (!res.ok) return { ok: false, error: 'store contention' };

    if (final) {
        await casUpdate(store, 'analysis_idem', idemId, (cur) => ({ ...(cur || { key: body.idempotencyKey, attempts: 1 }), runId: body.runId, status: body.status, at: now }));
        await casUpdate(store, 'analysis_latest', body.analysis, () => ({
            runId: body.runId,
            status: body.status,
            finishedAt: body.finishedAt || now,
            window: body.window,
            codeRevision: body.codeRevision,
            findingCounts: countFindings(body.findings || []),
        }));
    }
    return { ok: true, run: res.data };
}

export function countFindings(findings) {
    const out = { high: 0, medium: 0, low: 0, info: 0 };
    for (const f of findings) if (f?.severity in out) out[f.severity] += 1;
    return out;
}

export async function getRun(store, runId) {
    const d = await store.get('analysis_runs', runId);
    return d.found ? d.data : null;
}

export async function listRuns(store, name, limit = 20) {
    const items = await store.list('analysis_runs', { prefix: `${name}.` });
    return items
        .map((i) => i.data)
        .filter(Boolean)
        .sort((a, b) => String(b.runId).localeCompare(String(a.runId)))
        .slice(0, limit);
}

/** Overview of every registered analysis with its newest final run and freshness. */
export async function analysesOverview(store, settings) {
    const staleHours = Number(settings?.thresholds?.analysisStaleHours) || 36;
    const latest = store.connected ? await store.list('analysis_latest') : [];
    const byName = Object.fromEntries(latest.map((l) => [l.id, l.data]));
    return Promise.all(
        ANALYSES.map(async (a) => {
            const last = byName[a.name] || null;
            const runs = store.connected ? await listRuns(store, a.name, 1) : [];
            const newest = runs[0] || null;
            const ageH = last?.finishedAt ? (Date.now() - Date.parse(last.finishedAt)) / 3600000 : null;
            const cfg = settings?.analyses?.[a.name] || { enabled: true, paused: false };
            let state = 'never run';
            if (newest && ['queued', 'running'].includes(newest.status)) state = newest.status;
            else if (last) state = ageH > staleHours ? 'stale' : last.status;
            if (cfg.paused || settings?.analysesPaused) state = `paused (${state})`;
            return { ...a, last, newest, ageHours: ageH, state, config: cfg };
        })
    );
}

export async function lastSucceeded(store, name) {
    const runs = await listRuns(store, name, 30);
    return runs.find((r) => r.status === 'succeeded') || null;
}

export const newRunId = (name, rand) => {
    const d = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    return `${name}.${d}.${rand}`;
};
