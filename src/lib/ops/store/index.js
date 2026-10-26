// The ops store: one interface, adapters chosen by env (see docs/CONTRACTS.md § Ops store).
//
//   get(collection, id)                         → { found, version, data, updatedAt }
//   put(collection, id, data, { expectedVersion }) → { ok: true, version } | { ok: false, conflict: true, current }
//        expectedVersion 0 = create only if absent; n = replace only if the stored version is n
//   list(collection, { prefix, limit })         → [{ id, version, data, updatedAt }]
//   append(stream, entry)                       → { ok: true }
//   readLog(stream, { limit })                  → entries, newest first
//   health()                                    → { ok, detail }
//
// Adapters: dev-http (scripts/ops/store-server.mjs on localhost), table-api (viaSocket Table,
// production), none (not connected: every call throws OpsStoreError 'not-connected').

import { storeConfig } from '../config';
import { devHttpStore } from './dev-http';
import { tableApiStore } from './table-api';

export class OpsStoreError extends Error {
    constructor(code, message) {
        super(message || code);
        this.code = code;
    }
}

export const ID_PATTERN = /^[A-Za-z0-9._:-]{1,160}$/;
export const COLLECTION_PATTERN = /^[a-z][a-z0-9_]{1,40}$/;

export function assertKey(collection, id) {
    if (!COLLECTION_PATTERN.test(collection)) throw new OpsStoreError('bad-key', `bad collection ${collection}`);
    if (id !== undefined && !ID_PATTERN.test(id)) throw new OpsStoreError('bad-key', `bad id ${id}`);
}

const notConnected = (missing) => {
    const fail = async () => {
        throw new OpsStoreError('not-connected', `Storage not connected (missing ${missing.join(', ')})`);
    };
    return {
        kind: 'none',
        connected: false,
        missing,
        get: fail,
        put: fail,
        list: fail,
        append: fail,
        readLog: fail,
        health: async () => ({ ok: false, detail: `not connected: missing ${missing.join(', ')}` }),
    };
};

export function getStore() {
    const cfg = storeConfig();
    if (cfg.kind === 'dev-http') return devHttpStore(cfg, OpsStoreError);
    if (cfg.kind === 'table-api') return tableApiStore(cfg, OpsStoreError);
    return notConnected(cfg.missing);
}

/**
 * Read-modify-write with compare-and-swap and bounded retries.
 * fn(currentData | null, current) returns the new data, or undefined to abort without writing.
 */
export async function casUpdate(store, collection, id, fn, { retries = 8 } = {}) {
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        const cur = await store.get(collection, id);
        const next = await fn(cur.found ? cur.data : null, cur);
        if (next === undefined) return { ok: true, aborted: true, data: cur.data, version: cur.version };
        const res = await store.put(collection, id, next, { expectedVersion: cur.found ? cur.version : 0 });
        if (res.ok) return { ok: true, data: next, version: res.version, attempts: attempt + 1 };
        await new Promise((r) => setTimeout(r, 5 + Math.random() * 20 * (attempt + 1)));
    }
    return { ok: false, conflict: true };
}

/** Insert-if-absent; returns true when this call created it. Used for dedupe keys. */
export async function putIfAbsent(store, collection, id, data) {
    const res = await store.put(collection, id, data, { expectedVersion: 0 });
    return Boolean(res.ok);
}
