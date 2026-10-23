// Server-side configuration of the ops area. Every value here is a server-only env var
// (never NEXT_PUBLIC_*), read at request time. Import only from middleware, route handlers and
// server components — never from a 'use client' file.

const env = (name) => {
    const v = process.env[name];
    return typeof v === 'string' && v.trim() ? v.trim() : '';
};

export const ROLES = ['viewer', 'editor', 'owner'];
export const roleRank = (role) => ROLES.indexOf(role);

export const isProductionSite = () => env('NEXT_PUBLIC_PRODUCTION_ENVIRONMENT') === 'prod';
export const isDevServer = () => process.env.NODE_ENV === 'development';

export function readUsers() {
    const raw = env('OPS_USERS');
    if (!raw) return { users: [], error: 'OPS_USERS is not set' };
    try {
        const list = JSON.parse(raw);
        if (!Array.isArray(list)) return { users: [], error: 'OPS_USERS must be a JSON array' };
        const users = list
            .filter((u) => u && typeof u.email === 'string' && ROLES.includes(u.role) && typeof u.password_hash === 'string')
            .map((u) => ({ email: u.email.trim().toLowerCase(), role: u.role, password_hash: u.password_hash }));
        if (!users.length) return { users: [], error: 'OPS_USERS has no valid {email, role, password_hash} entries' };
        return { users, error: null };
    } catch {
        return { users: [], error: 'OPS_USERS is not valid JSON' };
    }
}

/**
 * Whether the admin can serve at all. Missing config means 503, never an open admin.
 * Production additionally needs OPS_ZONE_BYPASS_CONFIRMED=true: the viasocket.com zone cache
 * rule caches HTML regardless of origin headers, so /internal must be excluded from it first.
 */
export function authConfig() {
    const problems = [];
    const secret = env('OPS_SESSION_SECRET');
    if (!secret) problems.push('OPS_SESSION_SECRET is not set');
    else if (secret.length < 32) problems.push('OPS_SESSION_SECRET must be at least 32 characters');
    const { users, error } = readUsers();
    if (error) problems.push(error);
    if (isProductionSite() && env('OPS_ZONE_BYPASS_CONFIRMED') !== 'true') {
        problems.push('OPS_ZONE_BYPASS_CONFIRMED is not true: the Cloudflare zone cache rule must bypass /internal* and /api/internal* before the admin can run on production');
    }
    return { ok: problems.length === 0, problems, secret, users };
}

export function storeConfig() {
    if (env('OPS_STORE_URL')) {
        return { kind: 'dev-http', url: env('OPS_STORE_URL').replace(/\/+$/, ''), token: env('OPS_STORE_TOKEN') };
    }
    const table = {
        baseUrl: env('OPS_TABLE_BASE_URL'),
        dbId: env('OPS_TABLE_DB_ID'),
        key: env('OPS_TABLE_KEY'),
        docsTable: env('OPS_TABLE_DOCS'),
        logTable: env('OPS_TABLE_LOG'),
    };
    if (table.baseUrl && table.dbId && table.key && table.docsTable && table.logTable) return { kind: 'table-api', ...table };
    const missing = ['OPS_TABLE_BASE_URL', 'OPS_TABLE_DB_ID', 'OPS_TABLE_KEY', 'OPS_TABLE_DOCS', 'OPS_TABLE_LOG'].filter((n) => !env(n));
    return { kind: 'none', missing };
}

export function githubConfig() {
    const token = env('OPS_GITHUB_TOKEN');
    const repo = env('OPS_GITHUB_REPO') || 'Walkover-Web-Solution/viasocket';
    return {
        connected: Boolean(token),
        token,
        repo,
        base: env('OPS_GITHUB_BASE') || 'test',
        apiUrl: (env('OPS_GITHUB_API_URL') || 'https://api.github.com').replace(/\/+$/, ''),
    };
}

export const ingestToken = () => env('OPS_INGEST_TOKEN');
export const experimentsLive = () => env('OPS_EXPERIMENTS_LIVE') === 'true';
export const fixturesEnabled = () => env('OPS_EXPERIMENTS_FIXTURES') === 'true' && !isProductionSite();
export const siteUrl = (requestUrl) => (env('OPS_SITE_URL') || (requestUrl ? new URL(requestUrl).origin : '')).replace(/\/+$/, '');

export function connectionStatus() {
    const store = storeConfig();
    const gh = githubConfig();
    return {
        store: store.kind === 'none' ? { connected: false, detail: `missing ${store.missing.join(', ')}` } : { connected: true, detail: store.kind },
        github: gh.connected ? { connected: true, detail: `${gh.repo} → base ${gh.base}` } : { connected: false, detail: 'OPS_GITHUB_TOKEN is not set' },
        ingest: ingestToken() ? { connected: true, detail: 'OPS_INGEST_TOKEN set' } : { connected: false, detail: 'OPS_INGEST_TOKEN is not set' },
        ai: { connected: false, detail: 'No AI interpretation service is wired in' },
        codingAgent: { connected: false, detail: 'No coding-agent generation service is wired in' },
        notifications: { connected: false, detail: 'No delivery channel is implemented; preferences are stored only' },
    };
}
