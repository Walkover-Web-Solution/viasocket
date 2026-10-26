// robots.txt / canonical / noindex / sitemap consistency for the key pages.
import { KEY_PAGES } from '../../../src/lib/ops/shared/analyses-registry.mjs';
import { headInfo, isProdBase } from '../lib.mjs';

function robotsRules(text) {
    const rules = [];
    let applies = false;
    for (const raw of text.split(/\r?\n/)) {
        const line = raw.replace(/#.*/, '').trim();
        const m = /^(user-agent|disallow|allow|sitemap)\s*:\s*(.*)$/i.exec(line);
        if (!m) continue;
        const k = m[1].toLowerCase();
        if (k === 'user-agent') applies = m[2].trim() === '*';
        else if (applies && (k === 'disallow' || k === 'allow')) rules.push({ type: k, path: m[2].trim() });
    }
    return rules;
}
const disallowed = (rules, path) => {
    let best = null;
    for (const r of rules) if (r.path && path.startsWith(r.path) && (!best || r.path.length > best.path.length)) best = r;
    return best?.type === 'disallow';
};

export default async function indexability({ base, get, budget }) {
    const findings = [];
    const robots = await get(new URL('/robots.txt', base).href);
    const rules = robots.status === 200 ? robotsRules(robots.body) : [];
    const blockedAll = disallowed(rules, '/');
    const prod = isProdBase(base);
    if (robots.status !== 200) findings.push({ severity: 'high', title: `robots.txt returns ${robots.status}`, evidence: { status: robots.status } });
    if (prod && !disallowed(rules, '/internal/')) findings.push({ severity: 'high', title: 'robots.txt does not disallow /internal/', evidence: { rules } });
    if (prod && blockedAll) findings.push({ severity: 'high', title: 'Production robots.txt disallows everything', evidence: { rules } });

    const sm = await get(new URL('/sitemap.xml', base).href);
    const locs = sm.status === 200 ? [...sm.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]) : [];
    if (sm.status !== 200) findings.push({ severity: 'high', title: `sitemap.xml returns ${sm.status}`, evidence: {} });
    const sitemapPaths = new Set(locs.map((l) => new URL(l).pathname.replace(/\/$/, '') || '/'));

    const pages = [];
    for (const p of KEY_PAGES) {
        const r = await get(new URL(p, base).href);
        const h = r.status === 200 ? headInfo(r.body) : {};
        const xr = r.headers.get('x-robots-tag');
        const noindex = /noindex/i.test(h.robots || '') || /noindex/i.test(xr || '');
        const inSitemap = sitemapPaths.has(p);
        const canonPath = h.canonical ? new URL(h.canonical, base).pathname.replace(/\/$/, '') || '/' : null;
        pages.push({ path: p, status: r.status, noindex, xRobotsTag: xr, metaRobots: h.robots || null, canonical: h.canonical || null, inSitemap, robotsBlocked: disallowed(rules, p) });
        if (r.status !== 200) continue;
        if (!h.canonical) findings.push({ severity: 'low', title: `${p} has no canonical in the server HTML`, evidence: { path: p } });
        else if (canonPath !== p) findings.push({ severity: 'medium', title: `${p} canonicalises to ${h.canonical}`, evidence: { path: p, canonical: h.canonical } });
        if (h.canonical && prod && !h.canonical.startsWith('https://viasocket.com')) findings.push({ severity: 'medium', title: `${p} canonical is not on https://viasocket.com`, evidence: { canonical: h.canonical } });
        if (!blockedAll) {
            if (noindex && inSitemap) findings.push({ severity: 'high', title: `${p} is in the sitemap but noindex`, evidence: { path: p, metaRobots: h.robots, xRobotsTag: xr } });
            if (disallowed(rules, p) && inSitemap) findings.push({ severity: 'high', title: `${p} is in the sitemap but disallowed by robots.txt`, evidence: { path: p } });
        }
    }

    // Sample sitemap URLs (mapped onto BASE_URL) for non-200 answers.
    const sample = locs.slice(0, Math.min(30, Math.max(0, budget.max - budget.used - 5)));
    const sitemapStatus = [];
    for (const l of sample) {
        const path = new URL(l).pathname;
        const r = await get(new URL(path, base).href, { method: 'HEAD' });
        sitemapStatus.push({ path, status: r.status });
        if (r.status !== 200) findings.push({ severity: r.status >= 400 ? 'high' : 'medium', title: `Sitemap URL ${path} answers ${r.status}`, evidence: { path, status: r.status, location: r.headers.get('location') } });
    }
    if (blockedAll && !prod) findings.push({ severity: 'info', title: 'Non-production host: robots.txt disallows everything and pages are noindex by design; noindex/sitemap conflicts are not reported', evidence: { base } });

    return { status: 'succeeded', results: { robotsRules: rules, sitemapUrls: locs.length, sampled: sitemapStatus, pages }, findings };
}
