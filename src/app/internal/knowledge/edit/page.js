import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getDraft, isKnowledgePath, knowledgeSource } from '@/lib/ops/knowledge';
import { Shell, Csrf, NotConnected, StoreBanner } from '../../_components/ui';
import { DraftState } from '../../_components/draft-state';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit document' };

export default async function EditPage({ searchParams }) {
    const sp = await searchParams;
    const path = typeof sp?.path === 'string' ? sp.path : '';
    const user = await requireUser(`/internal/knowledge/edit?path=${encodeURIComponent(path)}`);
    const back = `/internal/knowledge/edit?path=${encodeURIComponent(path)}`;
    if (!can(user, 'editor')) {
        return (
            <Shell user={user} active="knowledge" title="Read-only">
                <p>Editing needs the editor role. You are signed in as {user.role}.</p>
            </Shell>
        );
    }
    if (!isKnowledgePath(path)) {
        return (
            <Shell user={user} active="knowledge" title="Not a knowledge file">
                <p>That path is not editable here.</p>
            </Shell>
        );
    }
    const store = getStore();
    const source = knowledgeSource();
    if (source.kind === 'none') {
        return (
            <Shell user={user} active="knowledge" title={`Edit ${path}`}>
                <NotConnected what="Knowledge source" detail={source.reason} />
            </Shell>
        );
    }
    const file = await source.read(path);
    const draft = store.connected ? await getDraft(store, path).catch(() => null) : null;
    const useDraft = draft && draft.content && ['draft', 'conflict', 'sync-failed'].includes(draft.status);
    const content = useDraft ? draft.content : file.content;
    const baseSha = useDraft ? draft.baseSha : file.sha;
    const drifted = useDraft && draft.baseSha !== file.sha;
    const writesOff = !store.connected;

    return (
        <Shell
            user={user}
            active="knowledge"
            title={`Edit ${path}`}
            intro={source.kind === 'dev' ? 'Submit writes this file in the local working tree (uncommitted), after checking nobody changed it since you opened it.' : `Submit opens a pull request into ${source.label}. It becomes effective when merged.`}
            flash={flashFrom(sp)}
        >
            <StoreBanner store={store} />
            <DraftState draft={draft} user={user} path={path} />
            {drifted ? (
                <div className="ops-banner bad" role="alert">
                    The file changed since this draft started (draft base <span className="mono">{String(draft.baseSha).slice(0, 10)}</span>, file now <span className="mono">{String(file.sha).slice(0, 10)}</span>). Submitting will be refused as a conflict. Compare in <a href={`/internal/knowledge/history?path=${encodeURIComponent(path)}`}>History</a>, then discard the draft and re-apply your change on the current file.
                </div>
            ) : null}
            <form className="ops-form" method="post" action="/api/internal/knowledge/submit">
                <Csrf user={user} back={back} />
                <input type="hidden" name="path" value={path} />
                <input type="hidden" name="baseSha" value={baseSha || ''} />
                <label>
                    Content
                    <span className="hint">
                        Started from blob <span className="mono">{baseSha ? baseSha.slice(0, 12) : 'new file'}</span>
                        {useDraft ? ' (your saved draft)' : ' (the current file)'}. Update verified_on / verified_at in the frontmatter if you re-verified the doc.
                    </span>
                    <textarea className="ops-editor" name="content" defaultValue={content} spellCheck="false" />
                </label>
                <label>
                    Change summary <span className="hint">Used as the commit / PR title.</span>
                    <input type="text" name="message" maxLength={200} placeholder={`docs: update ${path}`} />
                </label>
                <div className="ops-row">
                    <button className="btn-o" type="submit" disabled={writesOff}>
                        Submit to {source.kind === 'dev' ? 'working tree' : 'pull request'}
                    </button>
                    <button className="btn-o ghost" type="submit" formAction="/api/internal/knowledge/draft" disabled={writesOff}>
                        Save draft
                    </button>
                    <a href={`/internal/knowledge/doc?path=${encodeURIComponent(path)}`}>Cancel</a>
                </div>
            </form>
            {useDraft ? (
                <form method="post" action="/api/internal/knowledge/discard" style={{ marginTop: 16 }}>
                    <Csrf user={user} back={back} />
                    <input type="hidden" name="path" value={path} />
                    <button className="btn-o danger" type="submit">
                        Discard draft
                    </button>
                </form>
            ) : null}
        </Shell>
    );
}
