// Client for the local dev store server (scripts/ops/store-server.mjs). Same interface as the
// table-api adapter, so edge routes behave the same locally and in production.

export function devHttpStore(cfg, OpsStoreError) {
    const headers = { 'content-type': 'application/json', 'x-ops-store-token': cfg.token || '' };

    async function call(method, path, body) {
        let res;
        try {
            res = await fetch(`${cfg.url}${path}`, {
                method,
                headers,
                body: body === undefined ? undefined : JSON.stringify(body),
                cache: 'no-store',
                signal: AbortSignal.timeout(4000),
            });
        } catch (err) {
            throw new OpsStoreError('unreachable', `dev store at ${cfg.url} unreachable: ${err.message} (run npm run ops:store)`);
        }
        const json = await res.json().catch(() => ({}));
        if (res.status === 401) throw new OpsStoreError('unauthorized', 'dev store rejected OPS_STORE_TOKEN');
        return { status: res.status, json };
    }

    const enc = encodeURIComponent;

    return {
        kind: 'dev-http',
        connected: true,
        async get(collection, id) {
            const { status, json } = await call('GET', `/docs/${enc(collection)}/${enc(id)}`);
            if (status === 404) return { found: false, version: 0, data: null };
            if (status !== 200) throw new OpsStoreError('store-error', json.error || `HTTP ${status}`);
            return { found: true, version: json.version, data: json.data, updatedAt: json.updatedAt };
        },
        async put(collection, id, data, { expectedVersion } = {}) {
            if (!Number.isInteger(expectedVersion)) throw new OpsStoreError('bad-call', 'put needs expectedVersion');
            const { status, json } = await call('PUT', `/docs/${enc(collection)}/${enc(id)}`, { expectedVersion, data });
            if (status === 409) return { ok: false, conflict: true, current: json.current };
            if (status !== 200) throw new OpsStoreError('store-error', json.error || `HTTP ${status}`);
            return { ok: true, version: json.version };
        },
        async list(collection, { prefix = '', limit = 500 } = {}) {
            const { status, json } = await call('GET', `/docs/${enc(collection)}?prefix=${enc(prefix)}&limit=${limit}`);
            if (status !== 200) throw new OpsStoreError('store-error', json.error || `HTTP ${status}`);
            return json.items || [];
        },
        async append(stream, entry) {
            const { status, json } = await call('POST', `/logs/${enc(stream)}`, { entry });
            if (status !== 200) throw new OpsStoreError('store-error', json.error || `HTTP ${status}`);
            return { ok: true };
        },
        async readLog(stream, { limit = 200 } = {}) {
            const { status, json } = await call('GET', `/logs/${enc(stream)}?limit=${limit}`);
            if (status !== 200) throw new OpsStoreError('store-error', json.error || `HTTP ${status}`);
            return json.entries || [];
        },
        async health() {
            try {
                const { status } = await call('GET', '/health');
                return { ok: status === 200, detail: `dev store ${cfg.url}` };
            } catch (err) {
                return { ok: false, detail: err.message };
            }
        },
        // Dev-only repo access (knowledge writeback). Not part of the store interface.
        repo: (method, path, body) => call(method, `/repo${path}`, body),
    };
}
