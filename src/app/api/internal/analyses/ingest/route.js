import { ingestToken } from '@/lib/ops/config';
import { json } from '@/lib/ops/http';
import { getStore } from '@/lib/ops/store';
import { ingestRun, lastSucceeded, validateRun } from '@/lib/ops/analyses';
import { getSettings } from '@/lib/ops/settings';
import { getCounts } from '@/lib/ops/exp-counts';
import { listExperiments } from '@/lib/ops/experiments';
import { analysisByName } from '@/lib/ops/shared/analyses-registry.mjs';
import { safeEqual, sha256Hex } from '@/lib/ops/shared/crypto.mjs';

export const runtime = 'edge';

// Machine endpoint for scripts/analyses (GitHub Actions or a laptop).
// Auth: Authorization: Bearer <OPS_INGEST_TOKEN>. No session, no cookies. Contract:
// docs/CONTRACTS.md § Analysis ingest API.

function authorized(request) {
    const token = ingestToken();
    if (!token) return { error: json({ ok: false, error: 'Ingest not configured (OPS_INGEST_TOKEN unset)' }, 503) };
    const got = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
    if (!safeEqual(got, token)) return { error: json({ ok: false, error: 'Bad ingest token' }, 401) };
    return {};
}

// GET ?analysis=<name>&key=<idempotency key>  → pause state, existing run for the key, previous result
// GET ?data=experiments                        → running/paused experiments with their counters
export async function GET(request) {
    const a = authorized(request);
    if (a.error) return a.error;
    const store = getStore();
    if (!store.connected) return json({ ok: false, error: 'Storage not connected' }, 503);
    const url = new URL(request.url);

    if (url.searchParams.get('data') === 'experiments') {
        const exps = (await listExperiments(store)).filter((e) => ['running', 'paused'].includes(e.status));
        const out = await Promise.all(exps.map(async (e) => ({ id: e.id, status: e.status, phase: e.phase, phaseStartedAt: e.phaseStartedAt, variants: e.variants, primaryOutcome: e.primaryOutcome, synthetic: Boolean(e.synthetic), counts: await getCounts(store, e.id, e.phase) })));
        return json({ ok: true, experiments: out });
    }

    const name = url.searchParams.get('analysis');
    if (!analysisByName(name)) return json({ ok: false, error: 'unknown analysis' }, 400);
    const { settings } = await getSettings(store);
    const cfg = settings.analyses?.[name] || {};
    const key = url.searchParams.get('key');
    let existing = null;
    if (key) {
        const d = await store.get('analysis_idem', (await sha256Hex(key)).slice(0, 40));
        existing = d.found ? d.data : null;
    }
    const prev = await lastSucceeded(store, name);
    return json({
        ok: true,
        paused: Boolean(settings.analysesPaused || cfg.paused),
        enabled: cfg.enabled !== false,
        existing,
        previous: prev ? { runId: prev.runId, finishedAt: prev.finishedAt, results: name === 'watch-urls' ? prev.results : undefined } : null,
        budgets: settings.budgets,
    });
}

export async function POST(request) {
    const a = authorized(request);
    if (a.error) return a.error;
    const store = getStore();
    if (!store.connected) return json({ ok: false, error: 'Storage not connected' }, 503);
    const body = await request.json().catch(() => null);
    const errors = validateRun(body);
    if (errors.length) return json({ ok: false, errors }, 400);
    const r = await ingestRun(store, body);
    if (r.duplicate) return json({ ok: false, duplicate: true, existingRunId: r.existingRunId, existingStatus: r.existingStatus }, 409);
    if (r.exhausted) return json({ ok: false, exhausted: true, existingRunId: r.existingRunId, attempts: r.attempts }, 429);
    if (!r.ok) return json({ ok: false, error: r.error }, 409);
    return json({ ok: true, runId: r.run.runId, status: r.run.status });
}
