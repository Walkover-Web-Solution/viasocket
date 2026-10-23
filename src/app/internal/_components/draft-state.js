import { can } from '@/lib/ops/page';
import { Pill, Csrf, fmtDate } from './ui';

export function DraftState({ draft, user, path }) {
    if (!draft || draft.status === 'discarded') return null;
    const text = {
        draft: 'A draft exists. It is not in the repo until submitted.',
        pending: 'A pull request is open. The file changes when it is merged.',
        effective: draft.note || 'The last submitted edit is in the file.',
        'sync-failed': `The last writeback failed; nothing changed in the repo. ${draft.error || ''}`,
        conflict: 'The file changed after this edit started. The edit is kept as a draft; re-apply it on the current file.',
    }[draft.status];
    return (
        <div className={`ops-banner ${['sync-failed', 'conflict'].includes(draft.status) ? 'bad' : ''}`} role="status">
            <div className="ops-row">
                <Pill>{draft.status}</Pill>
                <span>{text}</span>
            </div>
            <p className="ops-small ops-muted" style={{ marginTop: 6 }}>
                Last change {fmtDate(draft.updatedAt)} by {draft.author}
                {draft.pr?.url ? (
                    <>
                        {' '}
                        · <a href={draft.pr.url}>PR #{draft.pr.number}</a>
                    </>
                ) : null}
                {draft.resultSha ? <span className="mono"> · blob {draft.resultSha.slice(0, 10)}</span> : null}
            </p>
            {can(user, 'editor') && draft.status === 'pending' ? (
                <form method="post" action="/api/internal/knowledge/refresh" style={{ marginTop: 8 }}>
                    <Csrf user={user} />
                    <input type="hidden" name="path" value={path} />
                    <button className="btn-o ghost">Check PR status</button>
                </form>
            ) : null}
        </div>
    );
}
