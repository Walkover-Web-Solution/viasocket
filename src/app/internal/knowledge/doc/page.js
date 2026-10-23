import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { getDraft, isKnowledgePath, knowledgeSource, summarize } from '@/lib/ops/knowledge';
import { parseFrontmatter } from '@/lib/ops/shared/frontmatter.mjs';
import { Shell, Pill, NotConnected } from '../../_components/ui';
import { DraftState } from '../../_components/draft-state';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Document' };

export default async function DocPage({ searchParams }) {
    const sp = await searchParams;
    const path = typeof sp?.path === 'string' ? sp.path : '';
    const user = await requireUser(`/internal/knowledge/doc?path=${encodeURIComponent(path)}`);
    const source = knowledgeSource();
    const store = getStore();
    const { settings } = await getSettings(store);
    if (!isKnowledgePath(path)) {
        return (
            <Shell user={user} active="knowledge" title="Not a knowledge file">
                <p>That path is not one the admin reads.</p>
            </Shell>
        );
    }
    if (source.kind === 'none') {
        return (
            <Shell user={user} active="knowledge" title={path}>
                <NotConnected what="Knowledge source" detail={source.reason} />
            </Shell>
        );
    }
    let file;
    let error = null;
    try {
        file = await source.read(path);
    } catch (err) {
        error = err.message;
    }
    const draft = store.connected ? await getDraft(store, path).catch(() => null) : null;
    const s = file?.exists ? summarize(path, file.content, file.sha, settings.thresholds) : null;
    const body = file?.exists ? parseFrontmatter(file.content).body : '';
    const html = file?.exists && path.endsWith('.md') ? micromark(body, { extensions: [gfm()], htmlExtensions: [gfmHtml()] }) : null;

    return (
        <Shell
            user={user}
            active="knowledge"
            title={s?.title || path}
            intro={<span className="mono">{path}</span>}
            flash={flashFrom(sp)}
            actions={
                <>
                    <a className="btn-o ghost" href={`/internal/knowledge/history?path=${encodeURIComponent(path)}`}>
                        History
                    </a>
                    {can(user, 'editor') ? (
                        <a className="btn-o" href={`/internal/knowledge/edit?path=${encodeURIComponent(path)}`}>
                            Edit
                        </a>
                    ) : null}
                </>
            }
        >
            {error ? <div className="ops-banner bad">Could not read the file: {error}</div> : null}
            <DraftState draft={draft} user={user} path={path} />
            {s ? (
                <dl className="ops-kv ops-card" style={{ marginBottom: 16, maxWidth: 860 }}>
                    {Object.entries(s.fields).map(([k, v]) => (
                        <div key={k} style={{ display: 'contents' }}>
                            <dt className="mono">{k}</dt>
                            <dd>{v === null ? <span className="ops-muted">not declared</span> : Array.isArray(v) ? v.join(', ') : String(v)}</dd>
                        </div>
                    ))}
                    <dt>Blob</dt>
                    <dd className="mono">{s.sha}</dd>
                    <dt>Freshness</dt>
                    <dd>
                        <Pill tone={s.stale ? 'warn' : 'good'}>{s.stale ? 'stale' : 'fresh'}</Pill> <span className="ops-muted ops-small">threshold {settings.thresholds.knowledgeStaleDays} days from verified_on</span>
                    </dd>
                </dl>
            ) : null}
            {file && !file.exists ? <p className="ops-muted">This file does not exist in the source yet.</p> : null}
            {html !== null ? <article className="ops-doc" dangerouslySetInnerHTML={{ __html: html }} /> : null}
            {file?.exists && html === null ? (
                <pre className="ops-doc" style={{ whiteSpace: 'pre-wrap' }}>
                    {file.content}
                </pre>
            ) : null}
        </Shell>
    );
}
