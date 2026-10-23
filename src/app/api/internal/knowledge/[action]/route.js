import { guard, done, str } from '@/lib/ops/http';
import { getStore, casUpdate } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';
import { draftId, isKnowledgePath, knowledgeSource, refreshPending, saveDraft, submitEdit } from '@/lib/ops/knowledge';

export const runtime = 'edge';

const editUrl = (path) => `/internal/knowledge/edit?path=${encodeURIComponent(path)}`;

function validContent(path, content) {
    if (content.length > 512 * 1024) return 'File is over 512 KB';
    if (path.endsWith('.json')) {
        try {
            JSON.parse(content);
        } catch (err) {
            return `Not valid JSON: ${err.message}`;
        }
    }
    return null;
}

export async function POST(request, { params }) {
    const { action } = await params;
    const g = await guard(request, 'editor', { mutation: true });
    if (g.response) return g.response;
    const { user, form } = g;
    const path = str(form.path, 300);
    if (!isKnowledgePath(path)) return done(request, form, { ok: false, message: 'That path is not an editable knowledge file', back: '/internal/knowledge' });
    const store = getStore();
    if (!store.connected) return done(request, form, { ok: false, message: 'Storage not connected: drafts and writeback state cannot be saved, so edits are refused', back: editUrl(path), status: 503 });
    const source = knowledgeSource();
    // Normalise line endings so a browser textarea does not rewrite every line.
    const content = str(form.content, 600 * 1024).replace(/\r\n/g, '\n');
    const baseSha = str(form.baseSha, 64) || null;

    try {
        if (action === 'draft') {
            const bad = validContent(path, content);
            if (bad) return done(request, form, { ok: false, message: bad, back: editUrl(path) });
            const r = await saveDraft(store, user, { path, content, baseSha });
            return done(request, form, { ok: r.ok, message: r.ok ? 'Draft saved (not yet in the repo)' : 'Someone else saved this draft at the same moment; reload', back: editUrl(path) });
        }
        if (action === 'submit') {
            const bad = validContent(path, content);
            if (bad) return done(request, form, { ok: false, message: bad, back: editUrl(path) });
            if (source.kind === 'none') return done(request, form, { ok: false, message: `Knowledge source not connected. ${source.reason}`, back: editUrl(path), status: 503 });
            const r = await submitEdit(store, source, user, { path, content, baseSha, message: str(form.message, 200) || undefined });
            const messages = {
                effective: `Saved to ${path} (${r.note || 'effective'})`,
                pending: `Pull request opened: ${r.pr?.url}. It becomes effective when merged.`,
                conflict: `Conflict: ${path} changed since you started editing. Your text is kept as a draft; reload the current file and re-apply.`,
                'sync-failed': `Writeback failed, nothing changed in the repo: ${r.error}`,
            };
            const ok = ['effective', 'pending'].includes(r.state);
            return done(request, form, {
                ok,
                message: messages[r.state],
                data: { state: r.state, newSha: r.newSha, pr: r.pr, currentSha: r.currentSha },
                status: r.state === 'conflict' ? 409 : ok ? 200 : 502,
                back: ok ? `/internal/knowledge/doc?path=${encodeURIComponent(path)}` : editUrl(path),
            });
        }
        if (action === 'restore') {
            const rev = str(form.rev, 40);
            if (!/^[0-9a-f]{7,40}$/.test(rev)) return done(request, form, { ok: false, message: 'Bad revision' });
            const old = await source.show(path, rev);
            const current = await source.read(path);
            const r = await saveDraft(store, user, { path, content: old.content, baseSha: current.sha });
            await audit(store, user, 'knowledge.restore-draft', path, { detail: { rev } });
            return done(request, form, { ok: r.ok, message: `Draft created from ${rev.slice(0, 8)}. Review it and submit to restore.`, back: editUrl(path) });
        }
        if (action === 'refresh') {
            const d = await refreshPending(store, source, user, path);
            return done(request, form, { ok: true, message: `State: ${d?.status || 'no draft'}`, back: `/internal/knowledge/doc?path=${encodeURIComponent(path)}` });
        }
        if (action === 'discard') {
            await casUpdate(store, 'knowledge_drafts', draftId(path), (cur) => (cur ? { ...cur, content: null, status: 'discarded', updatedAt: new Date().toISOString() } : undefined));
            await audit(store, user, 'knowledge.discard', path);
            return done(request, form, { ok: true, message: 'Draft discarded', back: `/internal/knowledge/doc?path=${encodeURIComponent(path)}` });
        }
    } catch (err) {
        return done(request, form, { ok: false, message: `Failed: ${err.message}`, back: editUrl(path), status: 502 });
    }
    return done(request, form, { ok: false, message: 'Unknown action', status: 404 });
}
