// Competitor watch-URL change check (same logic as Research → Run now).
import fs from 'node:fs';
import path from 'node:path';
import { checkSources, watchUrlsFrom } from '../../../src/lib/ops/shared/source-check.mjs';
import { gitBlobSha } from '../../../src/lib/ops/shared/crypto.mjs';

export async function watchlistInput(repoRoot) {
    for (const rel of ['docs/research/watchlist.json', 'docs/ops/fixtures/watchlist.json']) {
        const f = path.join(repoRoot, rel);
        if (fs.existsSync(f)) {
            const text = fs.readFileSync(f, 'utf8');
            return { rel, data: JSON.parse(text), sha: await gitBlobSha(text), fixture: rel.includes('fixtures') };
        }
    }
    return null;
}

export default async function watchUrls({ repoRoot, previous, budget }) {
    const w = await watchlistInput(repoRoot);
    if (!w) return { status: 'insufficient-data', results: {}, findings: [], notes: 'No watchlist file.' };
    const urls = watchUrlsFrom(w.data);
    if (!urls.length) return { status: 'insufficient-data', results: { watchlist: w.rel }, findings: [], notes: 'No active competitor has watch URLs.' };
    const prev = Object.fromEntries((previous?.results?.sources || []).filter((s) => s.hash).map((s) => [s.url, { hash: s.hash }]));
    const { results, requests } = await checkSources(urls, prev, { budget: Math.max(1, budget.max - budget.used) });
    budget.used += requests;
    const findings = results
        .filter((r) => r.changed || !r.ok)
        .map((r) =>
            r.changed
                ? { severity: 'medium', title: `Source changed: ${r.url}`, evidence: { competitor: r.competitorId, url: r.url, previousHash: r.previousHash, hash: r.hash } }
                : { severity: 'low', title: `Could not fetch ${r.url}`, evidence: { competitor: r.competitorId, url: r.url, status: r.status, error: r.error } }
        );
    const fetched = results.filter((r) => r.ok).length;
    const sources = results.map((r) => (r.ok ? r : { ...r, hash: prev[r.url]?.hash || null }));
    return {
        status: fetched ? 'succeeded' : 'failed',
        results: { watchlist: w.rel, fixture: w.fixture, sources, requests, changed: results.filter((r) => r.changed).length, firstSeen: results.filter((r) => r.firstSeen).length, fetched, total: urls.length },
        findings,
        error: fetched ? null : 'No watch URL could be fetched',
        notes: w.fixture ? `Read the fixture ${w.rel}; docs/research/watchlist.json is not in this tree.` : null,
    };
}
