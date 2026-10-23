// The analyses the ops area knows about. One list, read by scripts/analyses/run.mjs (what to
// run), the admin Analyses page (what to show) and docs/ops/README.md. The schedule here only
// mirrors .github/workflows/website-analyses.yml; changing it means editing the workflow.

export const RUN_STATUSES = ['queued', 'running', 'succeeded', 'failed', 'insufficient-data', 'not-connected'];
export const FINAL_STATUSES = ['succeeded', 'failed', 'insufficient-data', 'not-connected'];
export const SEVERITIES = ['high', 'medium', 'low', 'info'];
export const MAX_ATTEMPTS = 3;

export const KEY_PAGES = ['/', '/integrations', '/integrations/slack', '/features', '/pricing', '/blogs', '/developers', '/use-cases', '/mcp', '/automations'];

export const ANALYSES = [
    {
        name: 'links',
        question: 'Do the key pages link to anything broken?',
        window: 'day',
        schedule: 'daily 03:30 UTC',
        sources: ['site HTML (BASE_URL)'],
        nextAction: 'Fix or redirect each 4xx/5xx target; redirects go in viasocket-admin (Pages → Redirects).',
    },
    {
        name: 'indexability',
        question: 'Are robots, canonicals, noindex and the sitemap consistent?',
        window: 'day',
        schedule: 'daily 03:30 UTC',
        sources: ['robots.txt', 'sitemap.xml', 'key page HTML and headers'],
        nextAction: 'Fix pages that are in the sitemap but noindex, canonicalised elsewhere, or not 200.',
    },
    {
        name: 'claims',
        question: 'Do pages state the same numbers and positioning?',
        window: 'day',
        schedule: 'daily 03:30 UTC',
        sources: ['key page text', 'claim register in docs/POSITIONING.md (when present)'],
        nextAction: 'Align off-register claims with docs/POSITIONING.md; table-api copy changes go through the content tables.',
    },
    {
        name: 'metadata',
        question: 'Are titles and descriptions present, sized and unique?',
        window: 'day',
        schedule: 'daily 03:30 UTC',
        sources: ['key page HTML'],
        nextAction: 'Rewrite titles outside 30–60 characters and descriptions outside 70–160, and de-duplicate titles.',
    },
    {
        name: 'watch-urls',
        question: 'Which competitor sources changed since the last check?',
        window: 'day',
        schedule: 'daily 03:30 UTC (also "Run now" on Research)',
        sources: ['docs/research/watchlist.json watch URLs'],
        nextAction: 'Review each changed source and update the competitor report and last_checked.',
    },
    {
        name: 'experiment-health',
        question: 'Are running experiments assigning and exposing as planned?',
        window: 'hour',
        schedule: 'every 6 hours',
        sources: ['experiment counters in the ops store'],
        nextAction: 'Pause any experiment with a sample-ratio mismatch or exposures without assignment, then find the leak.',
    },
];

// Data sources the analyses would use but that are not wired in. Shown as "not connected",
// never as zero.
export const DATA_SOURCES = [
    {
        id: 'ga4',
        name: 'Google Analytics 4',
        env: ['OPS_GA4_PROPERTY_ID', 'OPS_GA4_CREDENTIALS'],
        next: 'Create a GA4 Data API service account with Viewer on the property, then set OPS_GA4_PROPERTY_ID and OPS_GA4_CREDENTIALS as GitHub Actions secrets. No analysis reads GA4 yet; add one in scripts/analyses.',
    },
    {
        id: 'search-console',
        name: 'Google Search Console',
        env: ['OPS_GSC_SITE', 'OPS_GSC_CREDENTIALS'],
        next: 'Add the service account as a restricted user on the viasocket.com property, then set OPS_GSC_SITE and OPS_GSC_CREDENTIALS. Needed for real indexing status instead of the HTML-only indexability check.',
    },
    {
        id: 'cloudflare-analytics',
        name: 'Cloudflare analytics',
        env: ['OPS_CF_API_TOKEN', 'OPS_CF_ZONE_ID'],
        next: 'Create a read-only Analytics token for the viasocket.com zone and set OPS_CF_API_TOKEN and OPS_CF_ZONE_ID. Also needed to verify the "/" cache rule automatically.',
    },
    {
        id: 'signup',
        name: 'Signup completion (flow.viasocket.com / CRM)',
        env: ['OPS_SIGNUP_EVENTS_URL'],
        next: 'The flow app must record vs_exp and vs_vid from the signup URL and expose completed signups (contract in docs/CONTRACTS.md § Flow-app experiment parameters). Until then "signup completion" is not observable from this site.',
    },
];

export const analysisByName = (name) => ANALYSES.find((a) => a.name === name) || null;

/** Window bucket for idempotency: one run per analysis per input revision per window. */
export function windowKey(windowKind, date = new Date()) {
    const iso = date.toISOString();
    if (windowKind === 'hour') return `${iso.slice(0, 13)}h`;
    return iso.slice(0, 10);
}

export const idempotencyKey = (name, inputRevision, window) => `${name}|${inputRevision}|${window}`;
