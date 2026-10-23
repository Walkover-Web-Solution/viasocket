import { guard, done, str, PRIVATE_HEADERS } from '@/lib/ops/http';
import { getStore, casUpdate } from '@/lib/ops/store';
import { audit } from '@/lib/ops/audit';
import { siteUrl } from '@/lib/ops/config';
import { INTERNAL_COOKIE } from '@/lib/ops/edge-experiments';
import {
    SURFACES,
    cacheSafetyCheck,
    createExperiment,
    getExperiment,
    instrumentationCheck,
    launch,
    markReady,
    newPhase,
    reserveSlot,
    transition,
    updateDraft,
} from '@/lib/ops/experiments';

export const runtime = 'edge';

// Who may do what (docs/EXPERIMENTS.md § Authority):
const ROLE = {
    create: 'editor',
    update: 'editor',
    ready: 'editor',
    check: 'editor',
    slot: 'editor',
    pause: 'editor', // stopping is always allowed to editors: it can only reduce risk
    rollback: 'editor',
    launch: 'owner',
    promote: 'owner',
    retire: 'owner',
    phase: 'owner',
    'internal-traffic': 'viewer',
};

export async function POST(request, { params }) {
    const { action } = await params;
    const minRole = ROLE[action];
    if (!minRole) return new Response('Not found', { status: 404, headers: PRIVATE_HEADERS });
    const g = await guard(request, minRole, { mutation: true });
    if (g.response) return g.response;
    const { user, form } = g;
    const id = str(form.id, 48);
    const page = id ? `/internal/experiments/view?id=${encodeURIComponent(id)}` : '/internal/experiments';

    if (action === 'internal-traffic') {
        const on = str(form.on) === 'true';
        const res = done(request, form, { ok: true, message: on ? 'This browser is now internal traffic: never assigned, never counted' : 'This browser is customer traffic again', back: '/internal/experiments' });
        res.cookies.set(INTERNAL_COOKIE, on ? '1' : '', { path: '/', maxAge: on ? 365 * 24 * 3600 : 0, sameSite: 'lax', secure: new URL(request.url).protocol === 'https:' });
        await audit(getStore(), user, 'experiment.internal-traffic', on ? 'on' : 'off');
        return res;
    }

    const store = getStore();
    if (!store.connected) return done(request, form, { ok: false, message: 'Storage not connected: the experiment registry is unavailable and writes are refused', back: page, status: 503 });

    try {
        if (action === 'create') {
            const r = await createExperiment(store, user, form);
            return done(request, form, r.ok ? { ok: true, message: 'Draft created', back: `/internal/experiments/view?id=${r.exp.id}` } : { ok: false, message: r.errors.join('; '), back: '/internal/experiments/new', status: 400 });
        }
        if (action === 'update') {
            const r = await updateDraft(store, user, id, form);
            return done(request, form, { ok: r.ok, message: r.ok ? 'Saved' : r.errors.join('; '), back: r.ok ? page : `${page}&edit=1`, status: r.ok ? 200 : 400 });
        }
        if (action === 'ready') {
            const r = await markReady(store, user, id);
            return done(request, form, { ok: r.ok, message: r.ok ? 'Marked ready for launch review' : r.errors.join('; '), back: page, status: r.ok ? 200 : 400 });
        }
        if (action === 'check') {
            const exp = await getExperiment(store, id);
            if (!exp) return done(request, form, { ok: false, message: 'Not found', back: '/internal/experiments', status: 404 });
            const origin = siteUrl(request.url);
            const instrumentation = await instrumentationCheck(exp, origin);
            const cache = await cacheSafetyCheck(origin, SURFACES[exp.surface].path);
            await casUpdate(store, 'experiments', id, (cur) => ({ ...cur, lastChecks: { at: new Date().toISOString(), by: user.email, instrumentation, cache } }));
            await audit(store, user, 'experiment.check', id, { result: instrumentation.pass && cache.pass ? 'pass' : 'fail' });
            return done(request, form, { ok: true, message: `Instrumentation ${instrumentation.pass ? 'passed' : 'failed'}; cache safety ${cache.pass ? 'passed' : 'failed'}`, data: { instrumentation, cache }, back: page });
        }
        if (action === 'launch') {
            const r = await launch(store, user, id, { origin: siteUrl(request.url) });
            return done(request, form, { ok: r.ok, message: r.ok ? 'Running' : `Launch blocked: ${r.blocked.join(' | ')}`, data: { blocked: r.blocked, checks: r.checks }, back: page, status: r.ok ? 200 : 409 });
        }
        if (['pause', 'rollback', 'promote', 'retire'].includes(action)) {
            const r = await transition(store, user, id, action, { note: str(form.note, 1000), variant: str(form.variant, 1) });
            return done(request, form, { ok: r.ok, message: r.ok ? `${action} done` : r.errors.join('; '), back: page, status: r.ok ? 200 : 400 });
        }
        if (action === 'phase') {
            const input = {};
            for (const k of ['A', 'B', 'C']) for (const f of ['label', 'target', 'weight']) if (form[`variant_${k}_${f}`] !== undefined) input[`variant_${k}_${f}`] = str(form[`variant_${k}_${f}`], 200);
            const r = await newPhase(store, user, id, input, str(form.note, 1000));
            return done(request, form, { ok: r.ok, message: r.ok ? `Phase ${r.phase} started; counts restart from zero` : r.errors.join('; '), back: page, status: r.ok ? 200 : 400 });
        }
        if (action === 'slot') {
            const exp = await getExperiment(store, id);
            if (!exp) return done(request, form, { ok: false, message: 'Not found', status: 404 });
            const variant = str(form.variant, 1);
            if (!['A', 'B', 'C'].includes(variant)) return done(request, form, { ok: false, message: 'variant must be A, B or C', status: 400, back: page });
            const r = await reserveSlot(store, exp.surface, id, variant, user);
            return done(request, form, { ok: r.reserved || r.queued, message: r.reserved ? `Slot reserved for ${id}/${variant}` : r.queued ? `Surface full (3 slots): queued at position ${r.position}` : r.error, data: r, back: page });
        }
    } catch (err) {
        return done(request, form, { ok: false, message: `Failed: ${err.message}`, back: page, status: 502 });
    }
    return done(request, form, { ok: false, message: 'Unknown action', status: 404 });
}
