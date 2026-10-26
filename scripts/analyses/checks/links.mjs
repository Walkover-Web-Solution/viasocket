// Broken internal links and statuses on the key pages.
import { KEY_PAGES } from '../../../src/lib/ops/shared/analyses-registry.mjs';
import { OTHER_DEPLOYMENTS, BudgetError, hrefs, internalPath, isProdBase } from '../lib.mjs';

export default async function links({ base, get }) {
    const findings = [];
    const pages = [];
    const targets = new Map(); // path → [pages that link to it]
    for (const p of KEY_PAGES) {
        const r = await get(new URL(p, base).href);
        pages.push({ path: p, status: r.status });
        if (r.status >= 400) findings.push({ severity: 'high', title: `Key page ${p} returns ${r.status}`, evidence: { url: r.url, status: r.status } });
        if (r.status !== 200) continue;
        for (const h of hrefs(r.body)) {
            const path = internalPath(h, base);
            if (!path) continue;
            if (!targets.has(path)) targets.set(path, new Set());
            targets.get(path).add(p);
        }
    }
    const prod = isProdBase(base);
    const checked = [];
    let skipped = 0;
    let budgetHit = false;
    for (const [path, from] of targets) {
        const pathname = path.split('?')[0];
        if (!prod && OTHER_DEPLOYMENTS.some((re) => re.test(pathname))) {
            skipped += 1;
            continue;
        }
        try {
            let r = await get(new URL(path, base).href, { method: 'HEAD' });
            if (r.status === 405 || r.status === 501) r = await get(new URL(path, base).href);
            const location = r.headers.get('location');
            checked.push({ path, status: r.status, location, from: [...from] });
            if (r.status >= 400) {
                findings.push({ severity: r.status === 404 || r.status === 410 || r.status >= 500 ? 'high' : 'medium', title: `Broken link ${path} (${r.status})`, evidence: { target: path, status: r.status, linkedFrom: [...from] } });
            } else if (r.status >= 300) {
                findings.push({ severity: 'info', title: `Link ${path} redirects (${r.status})`, evidence: { target: path, status: r.status, location, linkedFrom: [...from] } });
            }
        } catch (err) {
            if (err instanceof BudgetError) {
                budgetHit = true;
                break;
            }
            findings.push({ severity: 'medium', title: `Could not check ${path}`, evidence: { target: path, error: err.message, linkedFrom: [...from] } });
        }
    }
    if (budgetHit) findings.push({ severity: 'info', title: `Stopped at the request budget; ${targets.size - checked.length - skipped} links unchecked`, evidence: {} });
    return {
        status: pages.every((p) => p.status >= 500 || p.status === 0) ? 'failed' : 'succeeded',
        results: { pages, uniqueTargets: targets.size, checked: checked.length, skippedOtherDeployments: skipped, broken: checked.filter((c) => c.status >= 400) },
        findings,
        notes: prod ? null : `Paths served by other deployments (/blog, /help, …) were skipped because BASE_URL is not production.`,
    };
}
