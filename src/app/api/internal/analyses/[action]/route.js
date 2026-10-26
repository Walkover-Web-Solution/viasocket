import { guard, done, str } from '@/lib/ops/http';
import { getStore, casUpdate } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';
import { analysisByName } from '@/lib/ops/shared/analyses-registry.mjs';

export const runtime = 'edge';

// Session-side analysis controls. Pausing here is read by scripts/analyses/run.mjs through the
// ingest endpoint before each run; the workflow-level switch is the OPS_ANALYSES_PAUSED repo
// variable (docs/DEVELOPMENT.md).
export async function POST(request, { params }) {
    const { action } = await params;
    const g = await guard(request, 'editor', { mutation: true });
    if (g.response) return g.response;
    const { user, form } = g;
    const store = getStore();
    if (!store.connected) return done(request, form, { ok: false, message: 'Storage not connected', back: '/internal/analyses', status: 503 });
    if (action !== 'pause') return done(request, form, { ok: false, message: 'Unknown action', status: 404, back: '/internal/analyses' });
    const name = str(form.analysis, 40);
    const paused = str(form.paused) === 'true';
    if (name !== 'all' && !analysisByName(name)) return done(request, form, { ok: false, message: 'Unknown analysis', back: '/internal/analyses' });
    await casUpdate(store, 'settings', 'main', (cur) => {
        const s = cur || {};
        if (name === 'all') return { ...s, analysesPaused: paused };
        return { ...s, analyses: { ...(s.analyses || {}), [name]: { ...(s.analyses?.[name] || { enabled: true }), paused } } };
    });
    await audit(store, user, paused ? 'analyses.pause' : 'analyses.resume', name);
    return done(request, form, { ok: true, message: `${name === 'all' ? 'All analyses' : name} ${paused ? 'paused' : 'resumed'}`, back: '/internal/analyses' });
}
