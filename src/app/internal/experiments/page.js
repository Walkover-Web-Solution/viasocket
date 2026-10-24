import { cookies } from 'next/headers';
import { requireUser, can, flashFrom } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { experimentsLive, isProductionSite } from '@/lib/ops/config';
import { MAX_SLOTS, SURFACES, getActive, getSlots, listExperiments } from '@/lib/ops/experiments';
import { INTERNAL_COOKIE } from '@/lib/ops/edge-experiments';
import { Shell, Pill, Csrf, StoreBanner, fmtDate } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Experiments' };

export default async function ExperimentsPage({ searchParams }) {
    const user = await requireUser('/internal/experiments');
    const sp = await searchParams;
    const store = getStore();
    const health = await store.health();
    const ok = store.connected && health.ok;
    const list = ok ? await listExperiments(store).catch(() => []) : [];
    const surfaces = ok ? await Promise.all(Object.keys(SURFACES).map(async (s) => ({ key: s, active: await getActive(store, s), slots: await getSlots(store, s) }))) : [];
    const internal = (await cookies()).get(INTERNAL_COOKIE)?.value === '1';

    return (
        <Shell
            user={user}
            active="experiments"
            title="Experiments"
            intro="A/B/C tests on public surfaces. Policy: docs/EXPERIMENTS.md. This page is the live registry; docs never copy its state."
            flash={flashFrom(sp)}
            actions={
                can(user, 'editor') && ok ? (
                    <a className="btn-o" href="/internal/experiments/new">
                        New experiment
                    </a>
                ) : null
            }
        >
            <StoreBanner store={store} health={health} />
            {isProductionSite() && !experimentsLive() ? (
                <div className="ops-banner" role="note">
                    Production live switch is off (OPS_EXPERIMENTS_LIVE). Nothing is assigned to visitors on this deployment, and launch is refused.
                </div>
            ) : null}
            <div className="ops-card ops-row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <span>
                    This browser: <Pill tone={internal ? 'good' : 'off'}>{internal ? 'internal traffic (excluded)' : 'customer traffic'}</Pill>
                </span>
                <form method="post" action="/api/internal/experiments/internal-traffic">
                    <Csrf user={user} back="/internal/experiments" />
                    <input type="hidden" name="on" value={internal ? 'false' : 'true'} />
                    <button className="btn-o ghost" type="submit">
                        {internal ? 'Count this browser as a customer' : 'Exclude this browser (vs_internal=1)'}
                    </button>
                </form>
            </div>

            <section aria-labelledby="surfaces">
                <h2 id="surfaces" style={{ marginBottom: 10 }}>
                    Surfaces and slots
                </h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Surface</th>
                                <th scope="col">Serving now</th>
                                <th scope="col">Slots ({MAX_SLOTS} max)</th>
                                <th scope="col">Queue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surfaces.map((s) => (
                                <tr key={s.key}>
                                    <td>
                                        {SURFACES[s.key].label} <span className="mono ops-small">baseline {SURFACES[s.key].baseline}</span>
                                    </td>
                                    <td>{s.active.expId ? <a href={`/internal/experiments/view?id=${s.active.expId}`}>{`${s.active.expId} (phase ${s.active.phase})`}</a> : <span className="ops-muted">baseline only</span>}</td>
                                    <td className="mono ops-small">{s.slots.slots.length ? s.slots.slots.map((x) => `${x.expId}/${x.variant}`).join(', ') : '—'}</td>
                                    <td className="mono ops-small">{s.slots.queue.length ? s.slots.queue.map((x, i) => `${i + 1}. ${x.expId}/${x.variant}`).join(', ') : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="ops-section" aria-labelledby="registry">
                <h2 id="registry">Registry</h2>
                <div className="ops-scroll">
                    <table className="ops-table">
                        <thead>
                            <tr>
                                <th scope="col">Experiment</th>
                                <th scope="col">Surface</th>
                                <th scope="col">Status</th>
                                <th scope="col">Phase</th>
                                <th scope="col">Variants</th>
                                <th scope="col">Owner</th>
                                <th scope="col">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e) => (
                                <tr key={e.id}>
                                    <td>
                                        <a href={`/internal/experiments/view?id=${e.id}`}>{e.title}</a>
                                        <div className="mono ops-small ops-muted">
                                            {e.id}
                                            {e.synthetic ? ' · synthetic test' : ''}
                                        </div>
                                    </td>
                                    <td>{e.surface}</td>
                                    <td>
                                        <Pill>{e.status}</Pill>
                                    </td>
                                    <td className="num">{e.phase}</td>
                                    <td className="ops-small">{e.variants.map((v) => `${v.key} ${v.weight}%`).join(' · ')}</td>
                                    <td>{e.owner || <span className="ops-muted">—</span>}</td>
                                    <td className="ops-small">{fmtDate(e.updatedAt)}</td>
                                </tr>
                            ))}
                            {!list.length ? (
                                <tr>
                                    <td colSpan={7} className="ops-muted">
                                        {ok ? 'No experiments yet.' : 'Registry unavailable: storage not connected.'}
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </section>
        </Shell>
    );
}
