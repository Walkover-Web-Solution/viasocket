#!/usr/bin/env node
// Local dev store for the ops area: `npm run ops:store`.
//
// A tiny HTTP server on 127.0.0.1 that gives edge routes (which cannot touch the filesystem)
// the same HTTP store interface they use in production, plus dev-only access to the repo's
// knowledge files so a knowledge edit writes the real file in this working tree.
//
//   GET  /health
//   GET  /docs/:collection/:id            → { version, data, updatedAt } | 404
//   PUT  /docs/:collection/:id            { expectedVersion, data } → { version } | 409 { current }
//   GET  /docs/:collection?prefix=&limit= → { items }
//   POST /logs/:stream                    { entry } → { ok }
//   GET  /logs/:stream?limit=             → { entries } (newest first)
//   GET  /repo/head                       → { sha, branch }
//   GET  /repo/list                       → { files: [{ path, sha }] }
//   GET  /repo/file?path=                 → { exists, content, sha }
//   PUT  /repo/file                       { path, content, baseSha } → { sha } | 409 { currentSha }
//   GET  /repo/log?path=&limit=           → { commits, uncommitted }
//   GET  /repo/show?path=&rev=            → { content, sha }
//
// Data lives in .ops-data/ (gitignored). Every request needs header x-ops-store-token equal to
// OPS_STORE_TOKEN. Binds to 127.0.0.1 only. Never run this in production.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { gitBlobSha } from '../../src/lib/ops/shared/crypto.mjs';

const ROOT = path.resolve(process.env.OPS_REPO_ROOT || process.cwd());
const DATA = path.join(ROOT, '.ops-data');
const PORT = Number(process.env.OPS_STORE_PORT || 4799);
const TOKEN = process.env.OPS_STORE_TOKEN || '';

if (!TOKEN || TOKEN.length < 16) {
    console.error('OPS_STORE_TOKEN (16+ chars) must be set, e.g. in .env.local. See docs/ops/README.md.');
    process.exit(1);
}
if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod') {
    console.error('Refusing to run the dev store with NEXT_PUBLIC_PRODUCTION_ENVIRONMENT=prod.');
    process.exit(1);
}

const SEG = /^[A-Za-z0-9._:-]{1,160}$/;
const COLL = /^[a-z][a-z0-9_]{1,40}$/;
// Knowledge files the dev server may read and write. Writes stay inside these patterns.
const WRITABLE = [/^AGENTS\.md$/, /^docs\/[A-Za-z0-9_-]+\.md$/, /^docs\/(ops|research|modules)\/[A-Za-z0-9_-]+\.(md|json)$/, /^docs\/ops\/fixtures\/[A-Za-z0-9_-]+\.(json|md|html)$/];
const READABLE = [...WRITABLE, /^\.github\/workflows\/[A-Za-z0-9_-]+\.ya?ml$/];

const okPath = (p, list) => typeof p === 'string' && !p.includes('..') && !p.startsWith('/') && list.some((re) => re.test(p));

fs.mkdirSync(path.join(DATA, 'docs'), { recursive: true });
fs.mkdirSync(path.join(DATA, 'logs'), { recursive: true });

const docFile = (c, id) => path.join(DATA, 'docs', c, `${encodeURIComponent(id)}.json`);
const readJson = (f) => {
    try {
        return JSON.parse(fs.readFileSync(f, 'utf8'));
    } catch {
        return null;
    }
};
const writeAtomic = (f, text) => {
    fs.mkdirSync(path.dirname(f), { recursive: true });
    const tmp = `${f}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(tmp, text);
    fs.renameSync(tmp, f);
};
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });

function send(res, status, body) {
    res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(JSON.stringify(body));
}

async function readBody(req) {
    const chunks = [];
    let size = 0;
    for await (const c of req) {
        size += c.length;
        if (size > 2 * 1024 * 1024) throw new Error('body too large');
        chunks.push(c);
    }
    return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
}

async function handle(req, res) {
    if (req.headers['x-ops-store-token'] !== TOKEN) return send(res, 401, { error: 'bad token' });
    const url = new URL(req.url, 'http://127.0.0.1');
    const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);

    if (url.pathname === '/health') return send(res, 200, { ok: true, root: path.basename(ROOT) });

    if (parts[0] === 'docs' && parts.length === 3) {
        const [, c, id] = parts;
        if (!COLL.test(c) || !SEG.test(id)) return send(res, 400, { error: 'bad key' });
        const f = docFile(c, id);
        if (req.method === 'GET') {
            const doc = readJson(f);
            return doc ? send(res, 200, doc) : send(res, 404, { error: 'not found' });
        }
        if (req.method === 'PUT') {
            const body = await readBody(req);
            // Everything below is synchronous, so read-compare-write is atomic in this process.
            const cur = readJson(f);
            const curVersion = cur ? cur.version : 0;
            if (body.expectedVersion !== curVersion) return send(res, 409, { error: 'version conflict', current: { version: curVersion } });
            const next = { version: curVersion + 1, data: body.data, updatedAt: new Date().toISOString() };
            writeAtomic(f, JSON.stringify(next));
            return send(res, 200, { version: next.version });
        }
    }

    if (parts[0] === 'docs' && parts.length === 2 && req.method === 'GET') {
        const c = parts[1];
        if (!COLL.test(c)) return send(res, 400, { error: 'bad collection' });
        const dir = path.join(DATA, 'docs', c);
        const prefix = url.searchParams.get('prefix') || '';
        const limit = Math.min(Number(url.searchParams.get('limit')) || 500, 5000);
        const items = (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
            .filter((n) => n.endsWith('.json'))
            .map((n) => decodeURIComponent(n.slice(0, -5)))
            .filter((id) => id.startsWith(prefix))
            .slice(0, limit)
            .map((id) => ({ id, ...readJson(docFile(c, id)) }));
        return send(res, 200, { items });
    }

    if (parts[0] === 'logs' && parts.length === 2) {
        const stream = parts[1];
        if (!SEG.test(stream)) return send(res, 400, { error: 'bad stream' });
        const f = path.join(DATA, 'logs', `${stream}.jsonl`);
        if (req.method === 'POST') {
            const body = await readBody(req);
            fs.appendFileSync(f, `${JSON.stringify({ at: new Date().toISOString(), ...body.entry })}\n`);
            return send(res, 200, { ok: true });
        }
        if (req.method === 'GET') {
            const limit = Math.min(Number(url.searchParams.get('limit')) || 200, 5000);
            const lines = fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean) : [];
            const entries = lines.slice(-limit).reverse().map((l) => JSON.parse(l));
            return send(res, 200, { entries });
        }
    }

    if (parts[0] === 'repo') return handleRepo(req, res, url, parts[1]);

    return send(res, 404, { error: 'no such route' });
}

async function handleRepo(req, res, url, action) {
    if (action === 'head' && req.method === 'GET') {
        return send(res, 200, { sha: git('rev-parse', 'HEAD').trim(), branch: git('rev-parse', '--abbrev-ref', 'HEAD').trim() });
    }
    if (action === 'list' && req.method === 'GET') {
        const out = [];
        const walk = (rel, depth) => {
            const abs = path.join(ROOT, rel);
            if (!fs.existsSync(abs)) return;
            for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
                const p = rel ? `${rel}/${e.name}` : e.name;
                if (e.isDirectory() && depth > 0) walk(p, depth - 1);
                else if (e.isFile() && okPath(p, WRITABLE)) out.push(p);
            }
        };
        if (fs.existsSync(path.join(ROOT, 'AGENTS.md'))) out.push('AGENTS.md');
        walk('docs', 2);
        const files = await Promise.all(out.sort().map(async (p) => ({ path: p, sha: await gitBlobSha(fs.readFileSync(path.join(ROOT, p), 'utf8')) })));
        return send(res, 200, { files });
    }
    if (action === 'file' && req.method === 'GET') {
        const p = url.searchParams.get('path');
        if (!okPath(p, READABLE)) return send(res, 400, { error: 'path not allowed' });
        const abs = path.join(ROOT, p);
        if (!fs.existsSync(abs)) return send(res, 200, { exists: false, content: '', sha: null });
        const content = fs.readFileSync(abs, 'utf8');
        return send(res, 200, { exists: true, content, sha: await gitBlobSha(content) });
    }
    if (action === 'file' && req.method === 'PUT') {
        const body = await readBody(req);
        if (!okPath(body.path, WRITABLE)) return send(res, 400, { error: 'path not writable' });
        if (typeof body.content !== 'string' || body.content.length > 1024 * 1024) return send(res, 400, { error: 'bad content' });
        const abs = path.join(ROOT, body.path);
        const exists = fs.existsSync(abs);
        const currentSha = exists ? await gitBlobSha(fs.readFileSync(abs, 'utf8')) : null;
        // Base-sha check: the editor's starting version must still be the file on disk.
        if ((body.baseSha || null) !== currentSha) return send(res, 409, { error: 'conflict', currentSha });
        writeAtomic(abs, body.content);
        return send(res, 200, { sha: await gitBlobSha(body.content) });
    }
    if (action === 'log' && req.method === 'GET') {
        const p = url.searchParams.get('path');
        if (!okPath(p, READABLE)) return send(res, 400, { error: 'path not allowed' });
        const limit = Math.min(Number(url.searchParams.get('limit')) || 30, 200);
        let commits = [];
        try {
            commits = git('log', `-n${limit}`, '--follow', '--format=%H%x1f%an%x1f%aI%x1f%s', '--', p)
                .trim()
                .split('\n')
                .filter(Boolean)
                .map((l) => {
                    const [sha, author, date, subject] = l.split('\x1f');
                    return { sha, author, date, subject };
                });
        } catch {
            commits = [];
        }
        const status = git('status', '--porcelain', '--', p).trim();
        return send(res, 200, { commits, uncommitted: Boolean(status), status });
    }
    if (action === 'show' && req.method === 'GET') {
        const p = url.searchParams.get('path');
        const rev = url.searchParams.get('rev') || '';
        if (!okPath(p, READABLE) || !/^[0-9a-f]{7,40}$/.test(rev)) return send(res, 400, { error: 'bad path or rev' });
        try {
            const content = git('show', `${rev}:${p}`);
            return send(res, 200, { content, sha: await gitBlobSha(content) });
        } catch {
            return send(res, 404, { error: 'not in that revision' });
        }
    }
    return send(res, 404, { error: 'no such repo route' });
}

http
    .createServer((req, res) => {
        handle(req, res).catch((err) => send(res, 500, { error: err.message }));
    })
    .listen(PORT, '127.0.0.1', () => {
        console.log(`ops dev store on http://127.0.0.1:${PORT} (data: ${path.relative(ROOT, DATA)}/, repo: ${ROOT})`);
    });
