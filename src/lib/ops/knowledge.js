// Knowledge docs: list, read, history, and edit → submit → writeback to the repo file, which is
// the only source of truth. The store keeps drafts and writeback state, never a second copy.
//
// Sources:
//   dev    — the local dev store server reads/writes files in this working tree (base-sha check)
//   github — Walkover-Web-Solution/viasocket via the GitHub API: branch + commit + PR into `test`
//   none   — neither configured: knowledge is "not connected"

import { getStore, casUpdate } from './store';
import { githubConfig, isProductionSite, storeConfig } from './config';
import { githubClient, GitHubError } from './github';
import { audit } from './audit';
import { parseFrontmatter, daysSince } from './shared/frontmatter.mjs';

export const WRITABLE = [/^AGENTS\.md$/, /^docs\/[A-Za-z0-9_-]+\.md$/, /^docs\/(ops|research|modules)\/[A-Za-z0-9_-]+\.(md|json)$/, /^docs\/ops\/fixtures\/[A-Za-z0-9_-]+\.(json|md|html)$/];
export const isKnowledgePath = (p) => typeof p === 'string' && !p.includes('..') && WRITABLE.some((re) => re.test(p));

// The knowledge set the admin lists by default (settings can narrow it). Order = reading order.
export const CORE_DOCS = [
    'AGENTS.md',
    'docs/VISION.md',
    'docs/POSITIONING.md',
    'docs/DESIGN.md',
    'docs/SEO.md',
    'docs/MEASUREMENT.md',
    'docs/EXPERIMENTS.md',
    'docs/COMPETITORS.md',
    'docs/DECISIONS.md',
    'docs/OPEN_QUESTIONS.md',
    'docs/ARCHITECTURE.md',
    'docs/FLOWS.md',
    'docs/CONTRACTS.md',
    'docs/DEVELOPMENT.md',
    'docs/ops/README.md',
];

export const draftId = (path) => path.replace(/\//g, ':');

export function knowledgeSource() {
    const sc = storeConfig();
    if (sc.kind === 'dev-http' && !isProductionSite()) {
        const store = getStore();
        const call = async (method, path, body) => {
            const { status, json } = await store.repo(method, path, body);
            return { status, json };
        };
        return {
            kind: 'dev',
            label: 'Local working tree (dev store server)',
            async list() {
                const { status, json } = await call('GET', '/list');
                if (status !== 200) throw new Error(json.error || `HTTP ${status}`);
                return json.files;
            },
            async read(path) {
                const { status, json } = await call('GET', `/file?path=${encodeURIComponent(path)}`);
                if (status !== 200) throw new Error(json.error || `HTTP ${status}`);
                return json;
            },
            async history(path) {
                const { status, json } = await call('GET', `/log?path=${encodeURIComponent(path)}`);
                if (status !== 200) throw new Error(json.error || `HTTP ${status}`);
                return { commits: json.commits, uncommitted: json.uncommitted };
            },
            async show(path, rev) {
                const { status, json } = await call('GET', `/show?path=${encodeURIComponent(path)}&rev=${encodeURIComponent(rev)}`);
                if (status !== 200) throw new Error(json.error || `HTTP ${status}`);
                return json;
            },
            async head() {
                const { json } = await call('GET', '/head');
                return json;
            },
            async write({ path, content, baseSha }) {
                const { status, json } = await call('PUT', '/file', { path, content, baseSha });
                if (status === 409) return { state: 'conflict', currentSha: json.currentSha };
                if (status !== 200) return { state: 'sync-failed', error: json.error || `HTTP ${status}` };
                return { state: 'effective', newSha: json.sha, note: 'Written to the working tree (uncommitted)' };
            },
        };
    }
    const gc = githubConfig();
    if (gc.connected) {
        const gh = githubClient(gc);
        return {
            kind: 'github',
            label: gh.label,
            async list() {
                return (await gh.tree()).filter((f) => isKnowledgePath(f.path));
            },
            read: (path) => gh.read(path),
            async history(path) {
                return { commits: await gh.history(path), uncommitted: false };
            },
            async show(path, rev) {
                return gh.read(path, rev);
            },
            async head() {
                return { sha: await gh.headSha(), branch: gc.base };
            },
            async write({ path, content, baseSha, actor, message }) {
                try {
                    const r = await gh.proposeChange({
                        path,
                        content,
                        baseSha,
                        branchHint: path.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase().slice(0, 40),
                        title: message || `docs: update ${path} (website ops)`,
                        body: `Edited in the website ops admin by ${actor}.\n\nBase blob: \`${baseSha || 'new file'}\`.\nMerge into \`${gc.base}\` to make it effective; this PR is the only pending copy.`,
                    });
                    return { state: 'pending', pr: r.pr, branch: r.branch, newSha: r.newSha };
                } catch (err) {
                    if (err instanceof GitHubError && err.status === 409) return { state: 'conflict', error: err.message };
                    return { state: 'sync-failed', error: err.message };
                }
            },
            prState: (n) => gh.prState(n),
        };
    }
    return { kind: 'none', label: 'Not connected', reason: 'Set OPS_GITHUB_TOKEN (production) or run npm run ops:store with OPS_STORE_URL (dev).' };
}

export function summarize(path, content, sha, thresholds = {}) {
    const { data, hasFrontmatter } = parseFrontmatter(content);
    const verified = data.verified_on || null;
    const age = daysSince(verified);
    const staleDays = Number(thresholds.knowledgeStaleDays) || 30;
    const title = (/^#\s+(.+)$/m.exec(content) || [])[1] || path;
    return {
        path,
        sha,
        title: title.trim(),
        hasFrontmatter,
        fields: {
            status: data.status ?? null,
            owner: data.owner ?? null,
            sources: data.sources ?? null,
            verified_on: verified,
            verified_at: data.verified_at ?? null,
            version: data.version ?? null,
        },
        ageDays: age,
        stale: age === null ? true : age > staleDays,
    };
}

export async function getDraft(store, path) {
    if (!store.connected) return null;
    const d = await store.get('knowledge_drafts', draftId(path));
    return d.found ? { ...d.data, version: d.version } : null;
}

const pushHistory = (d, entry) => ({ ...d, history: [...(d?.history || []), entry].slice(-30) });

export async function saveDraft(store, user, { path, content, baseSha }) {
    const now = new Date().toISOString();
    const res = await casUpdate(store, 'knowledge_drafts', draftId(path), (cur) =>
        pushHistory({ ...(cur || {}), path, content, baseSha: baseSha || null, status: 'draft', author: user.email, updatedAt: now, error: null }, { at: now, actor: user.email, status: 'draft' })
    );
    await audit(store, user, 'knowledge.draft', path, { result: res.ok ? 'ok' : 'conflict' });
    return res;
}

/**
 * Submit: write back to the authoritative file. Never reports success unless the source did.
 * Returns { state: effective|pending|conflict|sync-failed, ... }.
 */
export async function submitEdit(store, source, user, { path, content, baseSha, message }) {
    if (source.kind === 'none') return { state: 'sync-failed', error: 'Knowledge source not connected' };
    const result = await source.write({ path, content, baseSha, actor: user.email, message });
    const now = new Date().toISOString();
    if (store.connected) {
        await casUpdate(store, 'knowledge_drafts', draftId(path), (cur) => {
            const base = { ...(cur || {}), path, author: user.email, updatedAt: now };
            if (result.state === 'effective') {
                // The repo file now holds the content; the draft is closed (no second copy kept).
                return pushHistory({ ...base, content: null, baseSha: null, status: 'effective', resultSha: result.newSha, error: null, pr: null }, { at: now, actor: user.email, status: 'effective', sha: result.newSha });
            }
            if (result.state === 'pending') {
                return pushHistory({ ...base, content, baseSha, status: 'pending', pr: result.pr, branch: result.branch, resultSha: result.newSha, error: null }, { at: now, actor: user.email, status: 'pending', pr: result.pr?.url });
            }
            return pushHistory({ ...base, content, baseSha, status: result.state, error: result.error || null, currentSha: result.currentSha || null }, { at: now, actor: user.email, status: result.state, error: result.error });
        });
    }
    await audit(store, user, 'knowledge.submit', path, { result: result.state, detail: { baseSha, newSha: result.newSha, pr: result.pr?.url, error: result.error } });
    return result;
}

/** For GitHub drafts: pending → effective once the PR is merged; closed unmerged → sync-failed. */
export async function refreshPending(store, source, user, path) {
    const d = await getDraft(store, path);
    if (!d || d.status !== 'pending' || !d.pr?.number || !source.prState) return d;
    const s = await source.prState(d.pr.number);
    const now = new Date().toISOString();
    let status = 'pending';
    if (s.merged) status = 'effective';
    else if (s.state === 'closed') status = 'sync-failed';
    if (status === 'pending') return d;
    await casUpdate(store, 'knowledge_drafts', draftId(path), (cur) =>
        pushHistory(
            { ...cur, status, content: status === 'effective' ? null : cur.content, error: status === 'sync-failed' ? 'PR closed without merging' : null, updatedAt: now, note: status === 'effective' ? `Merged into ${githubConfig().base} ${s.mergedAt}; Cloudflare deploy status is not observable here` : null },
            { at: now, actor: user?.email || 'system', status }
        )
    );
    return getDraft(store, path);
}
