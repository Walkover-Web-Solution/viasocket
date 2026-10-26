// GitHub writeback for knowledge files (production path). The repo file is the source of truth:
// an edit becomes a branch + commit + pull request into the base branch (`test`), guarded by a
// base-sha check. UNVERIFIED live in this session (no token, and opening PRs was out of scope);
// the calls follow the GitHub REST v3 contents/git/pulls APIs.

import { githubConfig } from './config';

function b64EncodeUtf8(text) {
    const bytes = new TextEncoder().encode(text);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
}

function b64DecodeUtf8(b64) {
    const bin = atob(String(b64).replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

export class GitHubError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export function githubClient(cfg = githubConfig()) {
    async function gh(method, path, body) {
        const res = await fetch(`${cfg.apiUrl}/repos/${cfg.repo}${path}`, {
            method,
            headers: {
                authorization: `Bearer ${cfg.token}`,
                accept: 'application/vnd.github+json',
                'x-github-api-version': '2022-11-28',
                'user-agent': 'viasocket-website-ops',
                ...(body ? { 'content-type': 'application/json' } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store',
            signal: AbortSignal.timeout(10000),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new GitHubError(res.status, `GitHub ${method} ${path.split('?')[0]}: HTTP ${res.status} ${json.message || ''}`.trim());
        return json;
    }

    const enc = (p) => p.split('/').map(encodeURIComponent).join('/');

    return {
        kind: 'github',
        label: `GitHub ${cfg.repo} (${cfg.base})`,
        base: cfg.base,
        async tree() {
            const t = await gh('GET', `/git/trees/${encodeURIComponent(cfg.base)}?recursive=1`);
            return (t.tree || []).filter((e) => e.type === 'blob').map((e) => ({ path: e.path, sha: e.sha }));
        },
        async read(path, ref = cfg.base) {
            try {
                const f = await gh('GET', `/contents/${enc(path)}?ref=${encodeURIComponent(ref)}`);
                return { exists: true, content: b64DecodeUtf8(f.content || ''), sha: f.sha };
            } catch (err) {
                if (err.status === 404) return { exists: false, content: '', sha: null };
                throw err;
            }
        },
        async history(path, limit = 30) {
            const list = await gh('GET', `/commits?path=${encodeURIComponent(path)}&sha=${encodeURIComponent(cfg.base)}&per_page=${limit}`);
            return (list || []).map((c) => ({ sha: c.sha, author: c.commit?.author?.name, date: c.commit?.author?.date, subject: (c.commit?.message || '').split('\n')[0] }));
        },
        async headSha() {
            const ref = await gh('GET', `/git/ref/heads/${encodeURIComponent(cfg.base)}`);
            return ref.object?.sha;
        },
        /** Branch + commit + PR. Throws GitHubError(409) on a stale base sha. */
        async proposeChange({ path, content, baseSha, title, body, branchHint }) {
            const current = await this.read(path);
            if ((current.sha || null) !== (baseSha || null)) throw new GitHubError(409, `conflict: ${path} changed on ${cfg.base} since the edit started`);
            const head = await this.headSha();
            const branch = `ops/knowledge/${branchHint}-${Date.now().toString(36)}`;
            await gh('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha: head });
            let commit;
            try {
                commit = await gh('PUT', `/contents/${enc(path)}`, {
                    message: title,
                    content: b64EncodeUtf8(content),
                    branch,
                    ...(baseSha ? { sha: baseSha } : {}),
                });
            } catch (err) {
                if (err.status === 409 || err.status === 422) throw new GitHubError(409, `conflict: ${err.message}`);
                throw err;
            }
            const pr = await gh('POST', '/pulls', { title, head: branch, base: cfg.base, body });
            return { branch, commitSha: commit.commit?.sha, newSha: commit.content?.sha, pr: { number: pr.number, url: pr.html_url } };
        },
        async prState(number) {
            const pr = await gh('GET', `/pulls/${Number(number)}`);
            return { merged: Boolean(pr.merged), state: pr.state, mergedAt: pr.merged_at, url: pr.html_url };
        },
    };
}
