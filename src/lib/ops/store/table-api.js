// viaSocket Table (table-api) adapter for production. UNVERIFIED against a live table: the
// tables in docs/CONTRACTS.md § Ops store are not provisioned yet, and this session was not
// allowed to write to production tables. Shapes follow docs/current-infrastructure/table-api.md:
//   GET   <base>/<db>/<table>?filter=...&limit=&_=<buster>  → { data: { rows: [...] } }
//   POST  <base>/<db>/<table>  { records: [ {...} ] }
//   PATCH <base>/<db>/<table>  { records: [ { where, fields } ] }
// Compare-and-swap = PATCH ... where "key = 'k' AND version = n", then a cache-busted read-back
// that must show our write_id. Create = POST, then read-back; if two rows share a key (no unique
// constraint), the oldest autonumber wins and the loser reports a conflict.

import { randomId } from '../shared/crypto.mjs';

const SAFE = /^[A-Za-z0-9._:-]+$/;

export function tableApiStore(cfg, OpsStoreError) {
    const docsUrl = `${cfg.baseUrl.replace(/\/+$/, '')}/${cfg.dbId}/${cfg.docsTable}`;
    const logUrl = `${cfg.baseUrl.replace(/\/+$/, '')}/${cfg.dbId}/${cfg.logTable}`;
    const headers = { 'auth-key': cfg.key, 'content-type': 'application/json' };

    async function req(method, url, body) {
        let res;
        try {
            res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined, cache: 'no-store', signal: AbortSignal.timeout(6000) });
        } catch (err) {
            throw new OpsStoreError('unreachable', `table-api unreachable: ${err.message}`);
        }
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new OpsStoreError('store-error', `table-api ${method} HTTP ${res.status}`);
        return json;
    }

    const q = (params) => new URLSearchParams({ ...params, _: `${Date.now()}${Math.random()}` }).toString();
    const keyOf = (collection, id) => {
        const k = `${collection}:${id}`;
        if (!SAFE.test(k)) throw new OpsStoreError('bad-key', `unsafe key ${k}`);
        return k;
    };
    const rowsOf = (json) => (Array.isArray(json?.data?.rows) ? json.data.rows : []);
    const parse = (row) => {
        try {
            return JSON.parse(row.data || 'null');
        } catch {
            return null;
        }
    };

    async function readKey(key) {
        const rows = rowsOf(await req('GET', `${docsUrl}?${q({ filter: `key='${key}'`, sort: 'autonumber', limit: '5' })}`));
        rows.sort((a, b) => (a.autonumber || 0) - (b.autonumber || 0));
        return rows[0] || null;
    }

    return {
        kind: 'table-api',
        connected: true,
        unverified: true,
        async get(collection, id) {
            const row = await readKey(keyOf(collection, id));
            if (!row) return { found: false, version: 0, data: null };
            return { found: true, version: Number(row.version) || 0, data: parse(row), updatedAt: row.updated_at };
        },
        async put(collection, id, data, { expectedVersion } = {}) {
            const key = keyOf(collection, id);
            const writeId = randomId(9);
            const now = new Date().toISOString();
            if (expectedVersion === 0) {
                await req('POST', docsUrl, { records: [{ key, collection, doc_id: id, version: 1, data: JSON.stringify(data), write_id: writeId, updated_at: now }] });
            } else {
                await req('PATCH', docsUrl, {
                    records: [{ where: `key = '${key}' AND version = ${Number(expectedVersion)}`, fields: { version: Number(expectedVersion) + 1, data: JSON.stringify(data), write_id: writeId, updated_at: now } }],
                });
            }
            const row = await readKey(key);
            if (row && row.write_id === writeId) return { ok: true, version: Number(row.version) };
            return { ok: false, conflict: true, current: row ? { version: Number(row.version) } : null };
        },
        async list(collection, { prefix = '', limit = 400 } = {}) {
            if (!SAFE.test(collection)) throw new OpsStoreError('bad-key', 'bad collection');
            const filter = prefix ? `key LIKE '${keyOf(collection, prefix)}%'` : `collection='${collection}'`;
            const rows = rowsOf(await req('GET', `${docsUrl}?${q({ filter, sort: 'autonumber', limit: String(Math.min(limit, 400)) })}`));
            const seen = new Set();
            return rows
                .filter((r) => !seen.has(r.key) && seen.add(r.key))
                .map((r) => ({ id: r.doc_id, version: Number(r.version) || 0, data: parse(r), updatedAt: r.updated_at }));
        },
        async append(stream, entry) {
            if (!SAFE.test(stream)) throw new OpsStoreError('bad-key', 'bad stream');
            await req('POST', logUrl, { records: [{ stream, at: entry.at || new Date().toISOString(), data: JSON.stringify(entry) }] });
            return { ok: true };
        },
        async readLog(stream, { limit = 200 } = {}) {
            if (!SAFE.test(stream)) throw new OpsStoreError('bad-key', 'bad stream');
            const rows = rowsOf(await req('GET', `${logUrl}?${q({ filter: `stream='${stream}'`, sort: 'autonumber', limit: '400' })}`));
            return rows
                .map((r) => {
                    try {
                        return JSON.parse(r.data);
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean)
                .reverse()
                .slice(0, limit);
        },
        async health() {
            try {
                await req('GET', `${docsUrl}?${q({ limit: '1' })}`);
                return { ok: true, detail: 'table-api reachable (adapter unverified for writes)' };
            } catch (err) {
                return { ok: false, detail: err.message };
            }
        },
    };
}
