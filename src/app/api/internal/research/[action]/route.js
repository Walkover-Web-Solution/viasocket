import { guard, done, str } from '@/lib/ops/http';
import { getStore, casUpdate } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';
import { knowledgeSource, submitEdit } from '@/lib/ops/knowledge';
import { applyWatchlistEdit, loadWatchlist, runSourceCheckNow } from '@/lib/ops/research';
import { getSettings } from '@/lib/ops/settings';

export const runtime = 'edge';

const BACK = '/internal/research';

export async function POST(request, { params }) {
    const { action } = await params;
    const g = await guard(request, 'editor', { mutation: true });
    if (g.response) return g.response;
    const { user, form } = g;
    const store = getStore();
    if (!store.connected) return done(request, form, { ok: false, message: 'Storage not connected: research runs and edits are refused', back: BACK, status: 503 });
    const source = knowledgeSource();
    if (source.kind === 'none') return done(request, form, { ok: false, message: `Knowledge source not connected. ${source.reason}`, back: BACK, status: 503 });

    try {
        if (action === 'pause') {
            const paused = str(form.paused) === 'true';
            await casUpdate(store, 'settings', 'main', (cur) => {
                const s = cur || {};
                return { ...s, analyses: { ...(s.analyses || {}), 'watch-urls': { ...(s.analyses?.['watch-urls'] || { enabled: true }), paused } } };
            });
            await audit(store, user, paused ? 'research.pause' : 'research.resume', 'watch-urls');
            return done(request, form, { ok: true, message: paused ? 'Source change check paused (scheduled and manual runs)' : 'Source change check resumed', back: BACK });
        }

        const watch = await loadWatchlist(source);
        if (!watch.connected || watch.missing) return done(request, form, { ok: false, message: 'No watchlist file found', back: BACK });
        if (watch.error) return done(request, form, { ok: false, message: watch.error, back: BACK });

        if (action === 'check') {
            const { settings } = await getSettings(store);
            if (settings.analysesPaused || settings.analyses?.['watch-urls']?.paused) return done(request, form, { ok: false, message: 'The source change check is paused; resume it first', back: BACK });
            const head = await source.head?.().catch(() => null);
            const r = await runSourceCheckNow(store, watch, {
                actor: user.email,
                budget: Number(settings.budgets?.researchUrls) || 40,
                codeRevision: process.env.CF_PAGES_COMMIT_SHA || head?.sha || 'unknown',
            });
            await audit(store, user, 'research.check', 'watch-urls', { result: r.ok ? r.status : 'refused', detail: { runId: r.runId, error: r.error } });
            return done(request, form, { ok: r.ok, message: r.ok ? `Source change check ${r.status} (run ${r.runId})` : r.error, data: r, back: BACK });
        }

        if (action === 'edit-entry' || action === 'edit-cadence') {
            if (str(form.baseSha, 64) !== watch.sha) {
                return done(request, form, { ok: false, message: `Conflict: ${watch.path} changed since the page loaded. Reload and re-apply.`, status: 409, back: BACK });
            }
            const edit =
                action === 'edit-cadence'
                    ? { kind: 'cadence', direct: str(form.direct), indirect: str(form.indirect), substitute: str(form.substitute) }
                    : { kind: 'entry', id: str(form.id, 80), status: str(form.status), relevance: str(form.relevance), category: str(form.category), notes: str(form.notes, 2000), watch: str(form.watch, 4000), last_checked: str(form.last_checked, 10) };
            const content = applyWatchlistEdit(watch.data, edit);
            const r = await submitEdit(store, source, user, { path: watch.path, content, baseSha: watch.sha, message: `research: update ${edit.id || 'review cadence'} in ${watch.path} (website ops)` });
            const ok = ['effective', 'pending'].includes(r.state);
            return done(request, form, {
                ok,
                message: ok ? (r.state === 'pending' ? `Pull request opened: ${r.pr?.url}` : `Saved to ${watch.path}`) : r.state === 'conflict' ? `Conflict: ${watch.path} changed; reload and re-apply` : `Writeback failed: ${r.error}`,
                status: r.state === 'conflict' ? 409 : ok ? 200 : 502,
                back: BACK,
            });
        }
    } catch (err) {
        return done(request, form, { ok: false, message: `Failed: ${err.message}`, back: BACK, status: 502 });
    }
    return done(request, form, { ok: false, message: 'Unknown action', status: 404, back: BACK });
}
