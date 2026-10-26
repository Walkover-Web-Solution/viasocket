import { requireUser } from '@/lib/ops/page';
import { getStore } from '@/lib/ops/store';
import { Shell, Pill, StoreBanner, fmtDate } from '../_components/ui';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'History' };

export default async function AuditPage() {
    const user = await requireUser('/internal/history');
    const store = getStore();
    const health = await store.health();
    let entries = [];
    let error = null;
    if (store.connected && health.ok) {
        try {
            entries = await store.readLog('audit', { limit: 300 });
        } catch (err) {
            error = err.message;
        }
    }
    return (
        <Shell user={user} active="history" title="History" intro="Every mutation in the ops area: who, when, what and the outcome. Knowledge content history lives in git (each document's History page).">
            <StoreBanner store={store} health={health} />
            {error ? <div className="ops-banner bad">{error}</div> : null}
            <div className="ops-scroll">
                <table className="ops-table">
                    <thead>
                        <tr>
                            <th scope="col">When</th>
                            <th scope="col">Who</th>
                            <th scope="col">Action</th>
                            <th scope="col">Target</th>
                            <th scope="col">Result</th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((e, i) => (
                            <tr key={i}>
                                <td className="ops-small">{fmtDate(e.at)}</td>
                                <td className="ops-small">
                                    {e.actor} <span className="ops-muted">({e.role})</span>
                                </td>
                                <td className="mono ops-small">{e.action}</td>
                                <td className="mono ops-small" style={{ overflowWrap: 'anywhere' }}>
                                    {e.target}
                                </td>
                                <td>
                                    <Pill tone={e.result === 'ok' || e.result === 'running' || e.result === 'pass' ? 'good' : ['failed', 'blocked', 'fail', 'conflict', 'sync-failed'].includes(e.result) ? 'bad' : 'warn'}>{e.result}</Pill>
                                </td>
                                <td className="mono ops-small" style={{ overflowWrap: 'anywhere', maxWidth: 360 }}>
                                    {e.detail ? JSON.stringify(e.detail).slice(0, 400) : ''}
                                </td>
                            </tr>
                        ))}
                        {!entries.length ? (
                            <tr>
                                <td colSpan={6} className="ops-muted">
                                    {store.connected ? 'Nothing recorded yet.' : 'Unavailable: storage not connected.'}
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </Shell>
    );
}
