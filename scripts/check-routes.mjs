#!/usr/bin/env node
// Route regression check: fetches a curated list of important URLs and compares each one's HTTP
// status, redirect target, <title>, canonical, robots meta and <h1> with the expectations below.
// It exits 1 on any mismatch. No dependencies (Node 18+ fetch).
//
//   npm run check:routes                                   # http://localhost:1151 (npx next dev -p 1151)
//   BASE_URL=https://test.viasocket.com npm run check:routes
//   ONLY=/pricing,/mcp npm run check:routes                # paths starting with any of these
//
// Indexing: on any host other than viasocket.com the root layout adds `noindex, nofollow`, so every
// page is expected to carry noindex there. On viasocket.com only the 404 pages may. Override with
// EXPECT_INDEXABLE=1 or 0.
//
// Expectations were recorded from a local dev run on 2026-10-23 (docs/plans/2026-10-23-refactor-log.md).
// When a route changes on purpose, update its row here in the same commit and say why in the log.
// Titles that come from table-api or the admin are matched loosely (`titleIncludes`) so a copy edit
// in the CMS is not reported as a regression; titles written in this repo are matched exactly.
// Redirect rows reflect the admin-managed redirects (src/data/redirects.json fallback); if the admin
// changes one, this check reports it, which is intended.

const BASE_URL = (process.env.BASE_URL || 'http://localhost:1151').replace(/\/+$/, '');
const HOST = new URL(BASE_URL).hostname;
const EXPECT_INDEXABLE = process.env.EXPECT_INDEXABLE ? process.env.EXPECT_INDEXABLE === '1' : HOST === 'viasocket.com';
const ONLY = (process.env.ONLY || '').split(',').filter(Boolean);
const CONCURRENCY = Number(process.env.CONCURRENCY || 3);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 90000); // a dev server compiles each route on first hit

const SITE = 'https://viasocket.com';
const NOT_FOUND_TITLE = '404 - Page not found';

// status: expected HTTP status. location: expected redirect target (path or absolute URL).
// title / titleIncludes: exact or substring. canonical: exact URL, or false when the page must not
// have a server-rendered canonical (pages whose canonical is set client-side, OPEN_QUESTIONS U-03).
// h1: true = an <h1> must be present. notFound: page is a 404 and must say so.
const ROUTES = [
    // Homepage (static site in public/new-home) and its aliases
    { path: '/', status: 200, title: 'Integration Layer for Your Product & AI Agents | viaSocket', canonical: `${SITE}/`, h1: true, indexable: true },
    { path: '/home', status: 307, location: '/' },

    // Homepage-design pages (server canonical)
    { path: '/integrations', status: 200, title: 'App Integrations for Your Product | viaSocket', canonical: `${SITE}/integrations`, h1: true },
    { path: '/integrations/slack', status: 200, titleIncludes: 'Slack', canonical: `${SITE}/integrations/slack`, h1: true },
    { path: '/integrations/google-sheets', status: 200, titleIncludes: 'Google Sheets', canonical: `${SITE}/integrations/google-sheets`, h1: true },
    { path: '/integrations/hubspot', status: 200, titleIncludes: 'HubSpot', canonical: `${SITE}/integrations/hubspot`, h1: true },
    { path: '/features', status: 200, title: 'viaSocket Key Features | Integration Layer', canonical: `${SITE}/features`, h1: true },
    { path: '/use-cases', status: 200, titleIncludes: 'Use Cases', canonical: `${SITE}/use-cases`, h1: true },
    { path: '/new-direction', status: 200, title: 'Why we’re changing viaSocket | viaSocket', canonical: `${SITE}/new-direction`, h1: true },
    { path: '/pricing', status: 200, title: 'Pricing · viaSocket', canonical: `${SITE}/pricing`, h1: true },
    { path: '/pass', status: 200, title: 'viaSocket Pass · viaSocket', canonical: `${SITE}/pass`, h1: true },
    { path: '/blogs', status: 200, title: 'Blog · viaSocket', canonical: `${SITE}/blogs`, h1: true },
    {
        path: '/blogs/api-rate-limiting-for-multi-tenant-integrations',
        status: 200,
        titleIncludes: 'API Rate Limiting',
        canonical: `${SITE}/blogs/api-rate-limiting-for-multi-tenant-integrations`,
        h1: true,
    },

    // Integration directory variants
    { path: '/integrations/slack/google-sheets', status: 200, titleIncludes: 'Slack', canonical: false, h1: true },
    { path: '/integrations/category/ai-tools', status: 200, title: 'App Integrations for Your Product | viaSocket', canonical: false, h1: true },
    { path: '/integrations/category/accounting', status: 200, title: 'App Integrations for Your Product | viaSocket', canonical: false, h1: true },
    { path: '/integrations/zz-unknown-app-xyz', status: 307, location: '/integrations' }, // C-06: still a redirect by design

    // MCP
    { path: '/mcp', status: 308, location: 'https://mushrooms.viasocket.com/' },
    { path: '/mcp/aiagent', status: 200, titleIncludes: 'viaSocket MCP', canonical: false, h1: true },
    { path: '/mcp/saas', status: 200, titleIncludes: 'viaSocket MCP', canonical: false, h1: true },
    { path: '/mcp/slack', status: 200, title: 'Slack MCP | viaSocket', canonical: false, h1: true },
    { path: '/mcp/google-sheets', status: 200, title: 'Google Sheets MCP | viaSocket', canonical: false, h1: true },
    { path: '/mcp/category/all', status: 200, titleIncludes: 'viaSocket MCP', canonical: false, h1: true },
    { path: '/mcp/category/ai-tools', status: 200, titleIncludes: 'viaSocket MCP', canonical: false, h1: true },

    // Automations
    { path: '/automations', status: 200, title: 'Workflow Automation Templates', canonical: false, h1: true },
    {
        path: '/automations/autoregister-thrivecart-customers-to-zoom-webinars/578d762e00fad272ebced463877120f381eeda0a6ee95f6a4c958846fd52ed11',
        status: 200,
        titleIncludes: 'ThriveCart',
        canonical: false,
        h1: true,
    },
    { path: '/automations/zz-unknown-template-xyz/abc123', status: 307, location: '/automations' }, // C-06

    // Developers / Embed
    { path: '/developers/auth', status: 200, title: 'Managed auth · viaSocket', canonical: false, h1: true },
    { path: '/developers/docs', status: 200, title: 'Integrations Quickstart · viaSocket', canonical: false, h1: true },
    { path: '/embed/actions-for-ai', status: 200, titleIncludes: 'Actions for AI', canonical: false, h1: true },
    { path: '/embed/actions-via-webhook', status: 200, titleIncludes: 'Actions via Webhook', canonical: false, h1: true },
    { path: '/embed/app-integration', status: 200, titleIncludes: 'Embedded iPaaS', canonical: false, h1: true },

    // Content, campaign and lead pages
    { path: '/features/variables', status: 200, titleIncludes: 'Variables', canonical: false, h1: true },
    { path: '/find-apps/a', status: 200, title: 'Apps starting with A | viaSocket', canonical: false },
    { path: '/departments', status: 200, titleIncludes: 'Departments', canonical: false, h1: true },
    { path: '/departments/sales', status: 200, titleIncludes: 'Sales', canonical: false, h1: true },
    { path: '/experts', status: 200, titleIncludes: 'Hire Automation Experts', canonical: false, h1: true },
    { path: '/experts-are-live', status: 200, titleIncludes: 'Hire Automation Experts', canonical: false, h1: true },
    { path: '/hire-an-expert', status: 200, title: 'Hire an Expert · viaSocket', canonical: false, h1: true },
    { path: '/agency-partner', status: 200, titleIncludes: 'Agency Partner', canonical: false, h1: true },
    { path: '/support', status: 200, titleIncludes: 'Support', canonical: false, h1: true },
    { path: '/signup', status: 200, title: 'Sign Up - viaSocket', canonical: false, h1: true },
    { path: '/migration/zapier', status: 200, titleIncludes: 'Zapier', canonical: false, h1: true },
    { path: '/migration/n8n', status: 200, titleIncludes: 'n8n', canonical: false, h1: true },
    { path: '/migration/relay', status: 200, titleIncludes: 'Relay', canonical: false, h1: true },
    { path: '/lifetime-deal', status: 200, titleIncludes: 'Lifetime Deal', canonical: false, h1: true },
    { path: '/black-friday-sale', status: 200, titleIncludes: 'Black Friday', canonical: false, h1: true },
    { path: '/integrations-script', status: 200, title: 'Integration Script - viaSocket', canonical: false },
    { path: '/workflow-automations', status: 200, titleIncludes: 'Workflow Automation', canonical: false, h1: true },
    { path: '/workflow-automation-ideas', status: 200, titleIncludes: 'Workflow Automation Ideas', canonical: false, h1: true },
    { path: '/webinar', status: 200, titleIncludes: 'Webinars', canonical: false, h1: true },
    { path: '/free-access-programs', status: 200, titleIncludes: 'Free', canonical: false, h1: true },
    { path: '/feedback-satisfied', status: 200, title: 'Thanks · viaSocket', canonical: false, h1: true },
    { path: '/privacy', status: 200, titleIncludes: 'Privacy Policy', canonical: false, h1: true },
    { path: '/terms', status: 200, titleIncludes: 'Terms', canonical: false, h1: true },
    { path: '/data-retention-deletion', status: 200, titleIncludes: 'Data Retention', canonical: false, h1: true },

    // Redirects (admin-managed; fallback copy in src/data/redirects.json)
    { path: '/developers/pricing', status: 301, location: '/pricing' },
    { path: '/help', status: 301, location: '/new-direction' },
    { path: '/about', status: 308, location: '/help/about-us' },
    { path: '/login', status: 307, location: 'https://flow.viasocket.com/' },

    // Real 404s
    { path: '/zz-totally-unknown-path', status: 404, notFound: true },
    { path: '/blogs/zz-unknown-post', status: 404, notFound: true },
    { path: '/departments/zz-unknown-dept', status: 404, notFound: true },
    { path: '/feedback', status: 404, notFound: true },
];

// SEO files: checked by content, not by HTML fields.
const SITEMAP_MUST = ['/', '/integrations', '/pricing', '/features', '/blogs'];
const SITEMAP_BANNED = [];
const SEO_FILES = [
    {
        path: '/robots.txt',
        check: (body) =>
            EXPECT_INDEXABLE
                ? body.includes('Sitemap: https://viasocket.com/sitemap.xml') || 'missing Sitemap line'
                : /Disallow:\s*\/\s*$/m.test(body) || 'expected "Disallow: /" outside production',
    },
    {
        path: '/sitemap.xml',
        check: (body) => {
            const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
            const missing = SITEMAP_MUST.filter((p) => !locs.includes(`${SITE}${p}`));
            const banned = SITEMAP_BANNED.filter((p) => locs.includes(`${SITE}${p}`));
            if (locs.length < 30) return `only ${locs.length} <loc> entries`;
            if (missing.length) return `missing: ${missing.join(', ')}`;
            if (banned.length) return `should not list: ${banned.join(', ')}`;
            return true;
        },
    },
];

const decode = (s) =>
    s &&
    s
        .replace(/&amp;/g, '&')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
const pick = (html, re) => decode(html.match(re)?.[1] ?? null);

function parse(html) {
    return {
        title: pick(html, /<title[^>]*>([^<]*)<\/title>/i),
        canonical:
            pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) ||
            pick(html, /<link[^>]+href="([^"]*)"[^>]+rel="canonical"/i),
        robots: pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i),
        hasH1: /<h1[\s>]/i.test(html),
        notFoundBody: /404 - Page not found|404: Return to homepage/i.test(html),
    };
}

const sameTarget = (actual, expected) => {
    if (!actual) return false;
    const a = new URL(actual, BASE_URL);
    const e = new URL(expected, BASE_URL);
    return a.pathname === e.pathname && (expected.startsWith('http') ? a.host === e.host : true);
};

async function checkRoute(r) {
    const problems = [];
    const res = await fetch(BASE_URL + r.path, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
    const body = await res.text();
    if (res.status !== r.status) problems.push(`status ${res.status}, expected ${r.status}`);
    if (r.location && !sameTarget(res.headers.get('location'), r.location))
        problems.push(`location ${res.headers.get('location')}, expected ${r.location}`);
    if (res.status >= 300 && res.status < 400) return problems;

    const p = parse(body);
    if (r.notFound) {
        if (p.title !== NOT_FOUND_TITLE) problems.push(`title "${p.title}", expected "${NOT_FOUND_TITLE}"`);
        if (!/noindex/i.test(p.robots || '')) problems.push('404 page without noindex');
        return problems;
    }
    if (!p.title) problems.push('no <title>');
    if (r.title && p.title !== r.title) problems.push(`title "${p.title}", expected "${r.title}"`);
    if (r.titleIncludes && !(p.title || '').includes(r.titleIncludes))
        problems.push(`title "${p.title}" lacks "${r.titleIncludes}"`);
    if (p.title === NOT_FOUND_TITLE || p.notFoundBody) problems.push('renders a not-found page');
    if (typeof r.canonical === 'string' && p.canonical !== r.canonical)
        problems.push(`canonical ${p.canonical}, expected ${r.canonical}`);
    if (r.canonical === false && p.canonical) problems.push(`unexpected server canonical ${p.canonical}`);
    const noindex = /noindex/i.test(p.robots || '');
    const wantIndexable = r.indexable ?? EXPECT_INDEXABLE;
    if (wantIndexable && noindex) problems.push(`robots "${p.robots}" but page should be indexable`);
    if (!wantIndexable && !noindex) problems.push('missing noindex outside production');
    if (r.h1 && !p.hasH1) problems.push('no <h1>');
    return problems;
}

async function checkFile(f) {
    const res = await fetch(BASE_URL + f.path, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    const body = await res.text();
    if (res.status !== 200) return [`status ${res.status}, expected 200`];
    const ok = f.check(body);
    return ok === true ? [] : [ok];
}

const selected = (path) => !ONLY.length || ONLY.some((p) => path.startsWith(p));
const jobs = [
    ...ROUTES.filter((r) => selected(r.path)).map((r) => ({ path: r.path, run: () => checkRoute(r) })),
    ...SEO_FILES.filter((f) => selected(f.path)).map((f) => ({ path: f.path, run: () => checkFile(f) })),
];

console.log(`check:routes  ${BASE_URL}  (${jobs.length} checks, expect ${EXPECT_INDEXABLE ? 'indexable' : 'noindex'})`);
const started = Date.now();
const failures = [];
let next = 0;
async function worker() {
    while (next < jobs.length) {
        const job = jobs[next++];
        const t0 = Date.now();
        let problems;
        // One retry on a network error or timeout: next dev can stall a request that arrives while
        // another route is compiling the not-found page.
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                problems = await job.run();
                break;
            } catch (error) {
                problems = [`request failed: ${error.message}`];
            }
        }
        const ms = Date.now() - t0;
        if (problems.length) {
            failures.push({ path: job.path, problems });
            console.log(`FAIL ${job.path}  (${ms} ms)\n     - ${problems.join('\n     - ')}`);
        } else {
            console.log(`ok   ${job.path}  (${ms} ms)`);
        }
    }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const secs = ((Date.now() - started) / 1000).toFixed(1);
if (failures.length) {
    console.log(`\n${failures.length} of ${jobs.length} checks failed in ${secs}s`);
    process.exit(1);
}
console.log(`\nall ${jobs.length} checks passed in ${secs}s`);
