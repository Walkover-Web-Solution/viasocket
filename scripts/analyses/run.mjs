#!/usr/bin/env node
// Deterministic website analyses: `npm run analyze -- <name|all> [--force] [--base-url URL]`
//
// Env:
//   BASE_URL                 site to analyse (default OPS_SITE_URL or http://localhost:1152)
//   OPS_INGEST_URL           e.g. https://viasocket.com/api/internal/analyses/ingest (optional)
//   OPS_INGEST_TOKEN         bearer token for the ingest endpoint
//   OPS_ANALYSIS_BUDGET      max HTTP requests per run (default 300)
//   OPS_ANALYSIS_TIMEOUT_MS  per-request timeout (default 10000)
//   OPS_ANALYSIS_DEADLINE_S  per-run deadline (default 600)
//
// Each run: run id, idempotency key (analysis + input revision + window), status
// queued → running → succeeded | failed | insufficient-data | not-connected, up to 3 attempts,
// results JSON and findings, written to the ops store through the ingest endpoint. Without
// ingest config the run still executes and prints its result, reported as not recorded.

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANALYSES, MAX_ATTEMPTS, analysisByName, idempotencyKey, windowKey } from '../../src/lib/ops/shared/analyses-registry.mjs';
import { randomId } from '../../src/lib/ops/shared/crypto.mjs';
import { Budget, makeFetch } from './lib.mjs';
import { watchlistInput } from './checks/watch-urls.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => {
    const i = args.indexOf(`--${n}`);
    return i > -1 ? args[i + 1] : undefined;
};
const name = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--base-url') || 'all';
const base = (opt('base-url') || process.env.BASE_URL || process.env.OPS_SITE_URL || 'http://localhost:1152').replace(/\/+$/, '');
const ingestUrl = process.env.OPS_INGEST_URL || '';
const ingestToken = process.env.OPS_INGEST_TOKEN || '';
const budgetMax = Number(process.env.OPS_ANALYSIS_BUDGET) || 300;
const timeoutMs = Number(process.env.OPS_ANALYSIS_TIMEOUT_MS) || 10000;
const deadlineMs = (Number(process.env.OPS_ANALYSIS_DEADLINE_S) || 600) * 1000;

const codeRevision = process.env.GITHUB_SHA || (() => {
    try {
        return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8' }).trim();
    } catch {
        return 'unknown';
    }
})();
const trigger = process.env.GITHUB_ACTIONS ? `github:${process.env.GITHUB_EVENT_NAME || 'run'}` : `local:${process.env.USER || 'cli'}`;

async function ingest(method, body, query = '') {
    if (!ingestUrl || !ingestToken) return null;
    try {
        const res = await fetch(`${ingestUrl}${query}`, {
            method,
            headers: { authorization: `Bearer ${ingestToken}`, 'content-type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
            signal: AbortSignal.timeout(30000),
        });
        const json = await res.json().catch(() => ({}));
        return { status: res.status, json };
    } catch (err) {
        return { status: 0, json: { error: `ingest unreachable: ${err.message}` } };
    }
}

async function runOne(def) {
    const windowStr = windowKey(def.window);
    let inputRevision = `${base}@${codeRevision.slice(0, 12)}`;
    if (def.name === 'watch-urls') {
        const w = await watchlistInput(repoRoot);
        inputRevision = w ? `${w.rel}@${w.sha.slice(0, 12)}` : 'no-watchlist';
    }
    let key = idempotencyKey(def.name, inputRevision, windowStr);
    if (flag('force')) key += `|force-${Date.now()}`;
    const log = (...m) => console.log(`[${def.name}]`, ...m);

    let previous = null;
    if (ingestUrl && ingestToken) {
        const pre = await ingest('GET', null, `?analysis=${def.name}&key=${encodeURIComponent(key)}`);
        if (!pre || pre.status !== 200) {
            log(`ingest pre-check failed (HTTP ${pre?.status}): ${pre?.json?.error || 'no answer'}; not running`);
            return { name: def.name, outcome: 'ingest-unavailable' };
        }
        if (pre.json.paused) {
            log('paused in the admin (Analyses / Research). Skipping.');
            return { name: def.name, outcome: 'paused' };
        }
        if (!pre.json.enabled) {
            log('disabled in Settings. Skipping.');
            return { name: def.name, outcome: 'disabled' };
        }
        if (pre.json.existing && ['succeeded', 'insufficient-data', 'not-connected'].includes(pre.json.existing.status)) {
            log(`already ran for this window (${pre.json.existing.runId}, ${pre.json.existing.status}). Use --force to run again.`);
            return { name: def.name, outcome: 'duplicate', runId: pre.json.existing.runId };
        }
        previous = pre.json.previous;
    } else {
        log('OPS_INGEST_URL / OPS_INGEST_TOKEN not set: running locally, result will not be recorded.');
    }

    const runId = `${def.name}.${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}.${randomId(6)}`;
    const common = { runId, analysis: def.name, idempotencyKey: key, trigger, codeRevision, inputRevision, baseUrl: base, window: windowStr, startedAt: new Date().toISOString() };
    const claim = await ingest('POST', { ...common, status: 'running', attempt: 1 });
    if (claim && claim.status !== 200) {
        log(`not started: ${claim.json.duplicate ? `duplicate of ${claim.json.existingRunId} (${claim.json.existingStatus})` : claim.json.exhausted ? `retry limit reached (${claim.json.attempts} attempts)` : JSON.stringify(claim.json)}`);
        return { name: def.name, outcome: 'refused' };
    }

    const mod = (await import(`./checks/${def.name}.mjs`)).default;
    const ingestGet = ingestUrl && ingestToken ? async (q) => (await ingest('GET', null, q)).json : null;
    let result = null;
    let attempt = 0;
    let lastErr = null;
    while (attempt < MAX_ATTEMPTS && !result) {
        attempt += 1;
        const budget = new Budget(budgetMax);
        const get = makeFetch(budget, timeoutMs);
        try {
            result = await Promise.race([
                mod({ base, get, budget, repoRoot, previous, ingestGet }),
                new Promise((_, rej) => setTimeout(() => rej(new Error(`deadline of ${deadlineMs / 1000}s reached`)), deadlineMs)),
            ]);
            result.results = { ...(result.results || {}), requestsUsed: budget.used, requestBudget: budget.max };
        } catch (err) {
            lastErr = err;
            log(`attempt ${attempt} failed: ${err.message}`);
            if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, 1500 * attempt));
        }
    }
    const final = result
        ? { ...common, status: result.status, attempt, finishedAt: new Date().toISOString(), results: result.results, findings: result.findings || [], notes: result.notes || null, error: result.error || null }
        : { ...common, status: 'failed', attempt, finishedAt: new Date().toISOString(), results: null, findings: [], error: lastErr?.message || 'unknown error' };
    const counts = { high: 0, medium: 0, low: 0, info: 0 };
    for (const f of final.findings) counts[f.severity] += 1;
    log(`${final.status} in ${attempt} attempt(s): ${counts.high} high, ${counts.medium} medium, ${counts.low} low, ${counts.info} info${final.error ? ` — ${final.error}` : ''}`);
    const posted = await ingest('POST', final);
    if (posted) log(posted.status === 200 ? `recorded as ${runId}` : `ingest refused the result: ${JSON.stringify(posted.json)}`);
    if (!posted && flag('print')) console.log(JSON.stringify(final, null, 2));
    return { name: def.name, outcome: final.status, runId, recorded: posted?.status === 200 };
}

const list = name === 'all' ? ANALYSES : [analysisByName(name)].filter(Boolean);
if (!list.length) {
    console.error(`Unknown analysis "${name}". Known: ${ANALYSES.map((a) => a.name).join(', ')}, all`);
    process.exit(2);
}
console.log(`BASE_URL ${base} · revision ${codeRevision.slice(0, 12)} · budget ${budgetMax} requests/run`);
const outcomes = [];
for (const def of list) outcomes.push(await runOne(def));
console.log(JSON.stringify({ outcomes }));
process.exit(outcomes.some((o) => o.outcome === 'failed') ? 1 : 0);
