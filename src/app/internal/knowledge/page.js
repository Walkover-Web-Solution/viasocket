import { requireUser, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { getSettings } from '@/lib/ops/settings';
import { getDraft, knowledgeSource } from '@/lib/ops/knowledge';
import { knowledgeSummaries } from '@/lib/ops/overview';
import { Shell, Pill, NotConnected, StoreBanner } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Knowledge' };

const show = (v) => (v === null || v === undefined || v === '' ? <span className="ops-muted">—</span> : Array.isArray(v) ? v.join(', ') : String(v));

export default async function KnowledgePage({ searchParams }) {
    const user = await requireUser('/internal/knowledge');
    const sp = await searchParams;
    const store = getStore();
    const { settings } = await getSettings(store);
    const source = knowledgeSource();
    const k = await knowledgeSummaries(source, settings);
    const drafts = store.connected
        ? Object.fromEntries(await Promise.all((k.docs || []).map(async (d) => [d.path, await getDraft(store, d.path).catch(() => null)])))
        : {};

    return (
        <Shell
            user={user}
            active="knowledge"
            title="Knowledge"
            intro="The repo files are the source of truth. Edits become a draft, then a write to the file (dev) or a pull request into test (production). The store keeps only drafts and their state."
            flash={flashFrom(sp)}
        >
            <StoreBanner store={store} />
            {source.kind === 'none' ? <NotConnected what="Knowledge source" detail={source.reason} /> : <p className="ops-small ops-muted" style={{ marginBottom: 12 }}>Source: {source.label}</p>}
            {k.error ? <div className="ops-banner bad">Could not list knowledge files: {k.error}</div> : null}
            {k.docs?.length ? (
                <div className="ops-scroll">
                    <table className="ops-table">
                        <caption className="ops-muted ops-small" style={{ textAlign: 'left', padding: '0 0 6px' }}>
                            Frontmatter fields as written in each file. "—" means the file does not declare it.
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Document</th>
                                <th scope="col">status</th>
                                <th scope="col">owner</th>
                                <th scope="col">verified_on</th>
                                <th scope="col">verified_at</th>
                                <th scope="col">version</th>
                                <th scope="col">sources</th>
                                <th scope="col">Freshness</th>
                                <th scope="col">Edit state</th>
                            </tr>
                        </thead>
                        <tbody>
                            {k.docs.map((d) => (
                                <tr key={d.path}>
                                    <td>
                                        {d.missing ? (
                                            <span className="mono">{d.path}</span>
                                        ) : (
                                            <a href={`/internal/knowledge/doc?path=${encodeURIComponent(d.path)}`}>
                                                <span className="mono">{d.path}</span>
                                            </a>
                                        )}
                                    </td>
                                    {d.missing ? (
                                        <td colSpan={7} className="ops-muted">
                                            Not in the repo yet (owned by another workstream)
                                        </td>
                                    ) : (
                                        <>
                                            <td>{show(d.fields.status)}</td>
                                            <td>{show(d.fields.owner)}</td>
                                            <td>{show(d.fields.verified_on)}</td>
                                            <td className="mono">{show(d.fields.verified_at)}</td>
                                            <td>{show(d.fields.version)}</td>
                                            <td className="ops-small">{show(d.fields.sources)}</td>
                                            <td>
                                                <Pill tone={d.stale ? 'warn' : 'good'}>{d.stale ? (d.ageDays === null ? 'unverified' : `stale · ${d.ageDays} d`) : `fresh · ${d.ageDays} d`}</Pill>
                                            </td>
                                        </>
                                    )}
                                    <td>{drafts[d.path] && drafts[d.path].status !== 'discarded' ? <Pill>{drafts[d.path].status}</Pill> : <span className="ops-muted">—</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
            {k.others?.length ? (
                <section className="ops-section">
                    <h2>Other docs in the repo</h2>
                    <p className="ops-small ops-muted" style={{ marginBottom: 8 }}>
                        Not in the approved knowledge list (Settings → Knowledge sources), shown for reference.
                    </p>
                    <ul className="ops-small" style={{ columns: 3, margin: 0, paddingLeft: 18 }}>
                        {k.others.map((p) => (
                            <li key={p}>
                                <a href={`/internal/knowledge/doc?path=${encodeURIComponent(p)}`} className="mono">
                                    {p}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </Shell>
    );
}
