#!/usr/bin/env node
// Synthetic end-to-end check of the experiment machinery: `npm run ops:synthetic`.
// LOCAL / TEST ONLY. Refuses to run against viasocket.com. Every visitor carries vs_synthetic=1,
// so its traffic lands in the synthetic buckets and never in customer evaluation.
//
// Needs (in .env.local): OPS_SITE_URL, OPS_INGEST_URL, OPS_INGEST_TOKEN, OPS_EXPERIMENTS_FIXTURES=true
// on the dev server, and test users owner@/editor@/viewer@ops.test with passwords in
// OPS_TEST_OWNER_PASSWORD / OPS_TEST_EDITOR_PASSWORD / OPS_TEST_VIEWER_PASSWORD.
//
// Checks: role gates, launch gates (instrumentation), assignment stability (50 requests per
// visitor), split balance, exposure dedupe, outcome attribution, wrong-variant detection, bot and
// internal exclusion, slot limit under concurrency, preview, new phase (fresh counts), pause,
// rollback, retire. Prints one PASS/FAIL line per check and exits non-zero on any FAIL.

const BASE = (process.env.OPS_SITE_URL || 'http://localhost:1152').replace(/\/+$/, '');
if (/^https?:\/\/(www\.)?viasocket\.com/.test(BASE)) {
    console.error('Refusing to send synthetic traffic to production.');
    process.exit(2);
}
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const CACHE_WAIT_MS = 31000; // middleware caches the active experiment for 30 s, the event route for 15 s
const VISITORS = Number(process.env.OPS_SYNTH_VISITORS) || 200;
const results = [];
const check = (name, ok, detail = '') => {
    results.push({ name, ok });
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class Jar {
    constructor(initial = {}) {
        this.c = { ...initial };
    }
    header() {
        return Object.entries(this.c)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ');
    }
    take(res) {
        for (const sc of res.headers.getSetCookie?.() || []) {
            const [pair, ...attrs] = sc.split(';');
            const i = pair.indexOf('=');
            const k = pair.slice(0, i).trim();
            const v = pair.slice(i + 1).trim();
            const expired = attrs.some((a) => /max-age=0\b/i.test(a) || /expires=thu, 01 jan 1970/i.test(a)) || v === '';
            if (expired) delete this.c[k];
            else this.c[k] = v;
        }
    }
}

async function req(path, { jar, method = 'GET', body, headers = {}, json } = {}) {
    const h = { 'user-agent': UA, ...headers };
    if (jar) h.cookie = jar.header();
    if (json !== undefined) {
        h['content-type'] = 'application/json';
        body = JSON.stringify(json);
    }
    const res = await fetch(`${BASE}${path}`, { method, headers: h, body, redirect: 'manual' });
    jar?.take(res);
    const text = await res.text();
    let data = null;
    try {
        data = JSON.parse(text);
    } catch {
        data = null;
    }
    return { status: res.status, headers: res.headers, text, data };
}

async function login(role) {
    const jar = new Jar();
    const pw = process.env[`OPS_TEST_${role.toUpperCase()}_PASSWORD`];
    const form = new URLSearchParams({ email: `${role}@ops.test`, password: pw || '', next: '/internal' });
    const r = await req('/api/internal/auth/login', { jar, method: 'POST', body: form.toString(), headers: { origin: BASE, 'content-type': 'application/x-www-form-urlencoded' } });
    const s = await req('/api/internal/auth/session', { jar });
    if (!s.data?.ok) throw new Error(`login as ${role} failed (HTTP ${r.status})`);
    return { jar, csrf: s.data.csrf, role };
}

const act = (who, action, fields) =>
    req(`/api/internal/experiments/${action}`, { jar: who.jar, method: 'POST', json: { csrf: who.csrf, ...fields }, headers: { origin: BASE, accept: 'application/json' } });

const ingestGet = async () => {
    const r = await fetch(`${process.env.OPS_INGEST_URL}?data=experiments`, { headers: { authorization: `Bearer ${process.env.OPS_INGEST_TOKEN}` } });
    return (await r.json()).experiments || [];
};
const countsFor = async (id) => (await ingestGet()).find((e) => e.id === id);
const bucketSum = (counts, bucket, event, field = 'visitors') => Object.values(counts?.buckets?.[bucket] || {}).reduce((s, v) => s + (v[event]?.[field] || 0), 0);

const FIELDS = {
    audience: 'Synthetic test visitors only',
    assignmentUnit: 'Anonymous visitor (vs_vid first-party cookie)',
    exposureDefinition: '/exp.js reported the variant page rendered (once per page view)',
    primaryOutcome: 'signup_start',
    guardrails: 'Exposure/assignment ratio within 10%; no SRM',
    decisionMethod: 'Two-sided two-proportion z-test vs A, Bonferroni for >1 challenger; SRM p<0.001 invalidates',
    minSamplePerVariant: '1000',
    plannedDays: '14',
    reviewCondition: 'Review at 14 days or 1000 exposed per variant, whichever is later',
    owner: 'owner@ops.test',
    authority: 'owner role',
    rollbackPlan: 'Rollback button; everyone gets A within 30 s',
};

async function main() {
    console.log(`Synthetic experiment check against ${BASE}`);
    const owner = await login('owner');
    const editor = await login('editor');
    const viewer = await login('viewer');

    // ---- the real homepage fixture draft: A = current homepage, B = dev fixture ----------
    const FIX = 'home-fixture-v1';
    let r = await act(editor, 'create', {
        id: FIX,
        title: 'Homepage fixture: current homepage vs fixture B',
        surface: 'home',
        hypothesis: 'Fixture only: a clearer H1 ("Add integrations to your app or AI agent.") increases Start free clicks from the homepage.',
        ...FIELDS,
        audience: 'All non-bot, non-internal visitors to /',
        variant_A_label: 'Current homepage',
        variant_A_target: '/new-home/index.html',
        variant_A_weight: '50',
        variant_B_label: 'Fixture B (dev only)',
        variant_B_target: '/api/exp/fixture/home-b',
        variant_B_weight: '50',
    });
    check('fixture draft exists (created or already there)', r.status === 200 || /already exists/.test(r.data?.message || ''), r.data?.message);
    r = await act(viewer, 'create', { id: 'viewer-should-fail', variant_A_target: '/', variant_A_weight: '50', variant_B_target: '/x', variant_B_weight: '50' });
    check('viewer cannot create an experiment', r.status === 403, `HTTP ${r.status}`);
    await act(editor, 'ready', { id: FIX });
    r = await act(editor, 'launch', { id: FIX });
    check('editor cannot launch', r.status === 403, `HTTP ${r.status} ${r.data?.error || ''}`);
    r = await act(owner, 'launch', { id: FIX });
    const instr = r.data?.checks?.instrumentation?.results || [];
    check('owner launch of the real-homepage fixture is blocked by the instrumentation check', r.status === 409 && instr.find((x) => x.key === 'A')?.pass === false && instr.find((x) => x.key === 'B')?.pass === true, (r.data?.blocked || []).join(' | ').slice(0, 220));

    // ---- synthetic experiment on the same surface ----------------------------------------
    const SYN = `home-synthetic-${Date.now().toString(36)}`;
    r = await act(editor, 'create', {
        id: SYN,
        title: 'Synthetic check (instrumented homepage copy vs fixture B)',
        surface: 'home',
        synthetic: true,
        hypothesis: 'Synthetic: mechanics check only, no product question.',
        ...FIELDS,
        variant_A_label: 'Current homepage + exp.js (dev fixture)',
        variant_A_target: '/api/exp/fixture/home-a',
        variant_A_weight: '50',
        variant_B_label: 'Fixture B',
        variant_B_target: '/api/exp/fixture/home-b',
        variant_B_weight: '50',
    });
    check('synthetic experiment created', r.status === 200, r.data?.message);
    r = await act(owner, 'launch', { id: SYN });
    check('launch refused while still a draft (pre-launch gate)', r.status === 409, (r.data?.blocked || []).join(' | ').slice(0, 160));
    await act(editor, 'ready', { id: SYN });
    r = await act(owner, 'launch', { id: SYN });
    check('owner launch passes every gate', r.status === 200, r.data?.message);
    console.log(`… waiting ${CACHE_WAIT_MS / 1000}s for the middleware's 30 s cache`);
    await sleep(CACHE_WAIT_MS);

    // ---- assignment: split + stability ---------------------------------------------------
    const visitors = [];
    const split = { A: 0, B: 0 };
    for (let i = 0; i < VISITORS; i += 1) {
        const jar = new Jar({ vs_synthetic: '1' });
        const res = await req('/', { jar });
        const tag = res.headers.get('x-vs-exp') || '';
        const variant = tag.split(':')[1];
        if (variant) split[variant] += 1;
        visitors.push({ jar, variant, body: res.text });
    }
    check(`every synthetic visitor was assigned (${VISITORS})`, split.A + split.B === VISITORS, JSON.stringify(split));
    const sd = Math.sqrt(VISITORS * 0.25);
    check('split is balanced (|A − n/2| < 3σ)', Math.abs(split.A - VISITORS / 2) < 3 * sd, `A=${split.A} B=${split.B}, 3σ=${(3 * sd).toFixed(1)}`);
    const sampleB = visitors.find((v) => v.variant === 'B');
    const sampleA = visitors.find((v) => v.variant === 'A');
    check('variant B serves the fixture page, A the instrumented homepage', sampleB?.body.includes('Experiment fixture B') && sampleA && !sampleA.body.includes('Experiment fixture B') && sampleA.body.includes('/exp.js'));
    check('vs_vid and vs_x_<exp> cookies set', visitors.every((v) => v.jar.c.vs_vid && v.jar.c[`vs_x_${SYN}`]));
    let stable = true;
    for (const v of visitors.slice(0, 10)) {
        for (let k = 0; k < 50; k += 1) {
            const res = await req('/', { jar: v.jar });
            if ((res.headers.get('x-vs-exp') || '').split(':')[1] !== v.variant) stable = false;
        }
    }
    check('assignment stable across 50 requests for each of 10 visitors', stable);
    const h = await req('/', { jar: visitors[0].jar });
    check('experimented response is private, no-store, Vary: Cookie', /no-store/.test(h.headers.get('cache-control') || '') && /cookie/i.test(h.headers.get('vary') || ''), `${h.headers.get('cache-control')} / vary ${h.headers.get('vary')}`);

    // ---- exclusions ----------------------------------------------------------------------
    const bot = await fetch(`${BASE}/`, { headers: { 'user-agent': 'curl/8.7.1' }, redirect: 'manual' });
    check('bots are excluded (no cookies, not counted) and not pinned by user agent', (bot.headers.get('x-vs-exp') || '').startsWith('excluded:bot') && !(bot.headers.getSetCookie?.() || []).some((c) => c.startsWith('vs_')), bot.headers.get('x-vs-exp'));
    const internal = await req('/', { jar: new Jar({ vs_internal: '1' }) });
    check('internal traffic gets the baseline, no cookies', (internal.headers.get('x-vs-exp') || '').startsWith('excluded') && !(internal.headers.getSetCookie?.() || []).some((c) => c.startsWith('vs_')));

    // ---- exposure + outcomes -------------------------------------------------------------
    await sleep(2000); // let waitUntil assignment writes settle
    let dupOk = true;
    let converted = { A: 0, B: 0 };
    for (const [i, v] of visitors.entries()) {
        const vid = v.jar.c.vs_vid;
        const pv = `pv${i}x${Date.now().toString(36)}`;
        const ev = (event, id) => req('/api/exp/event', { jar: v.jar, method: 'POST', json: { id, exp: SYN, phase: 1, variant: v.variant, vid, event } });
        const first = await ev('exposure', `${pv}-exposure-x`);
        const again = await ev('exposure', `${pv}-exposure-x`);
        if (!(first.status === 202 && first.data.bucket === 'synthetic' && again.data?.counted === false)) dupOk = false;
        if (i % 3 === 0) {
            await ev('signup_start', `${pv}-signup_start-1`);
            converted[v.variant] += 1;
        }
        if (i % 5 === 0) await ev('cta_click', `${pv}-cta_click-2`);
    }
    check('exposure counted once per page view (duplicate event id dropped)', dupOk);
    const wrong = visitors[0];
    const wr = await req('/api/exp/event', { jar: wrong.jar, method: 'POST', json: { id: `wrong${Date.now()}`, exp: SYN, phase: 1, variant: wrong.variant === 'A' ? 'B' : 'A', vid: wrong.jar.c.vs_vid, event: 'exposure' } });
    check('exposure claiming an unassigned variant is quarantined', wr.data?.bucket === 'synthetic_unassigned', wr.data?.bucket);
    await sleep(1000);
    let c = await countsFor(SYN);
    const assignedSyn = bucketSum(c.counts, 'synthetic', 'assignment');
    const exposedSyn = bucketSum(c.counts, 'synthetic', 'exposure');
    const exposureEvents = bucketSum(c.counts, 'synthetic', 'exposure', 'events');
    const signups = bucketSum(c.counts, 'synthetic', 'signup_start');
    check('assignments recorded once per visitor', assignedSyn === VISITORS, `assigned visitors ${assignedSyn}`);
    check('exposure visitors = visitors, events not double counted', exposedSyn === VISITORS && exposureEvents === VISITORS, `visitors ${exposedSyn}, events ${exposureEvents}`);
    check('outcomes attributed to the assigned variant', ['A', 'B'].every((k) => (c.counts.buckets.synthetic?.[k]?.signup_start?.visitors || 0) === converted[k]), `signup_start A=${c.counts.buckets.synthetic?.A?.signup_start?.visitors} B=${c.counts.buckets.synthetic?.B?.signup_start?.visitors} (sent ${converted.A}/${converted.B}), total ${signups}`);
    check('no synthetic traffic in the customer bucket', !c.counts.buckets.customer, JSON.stringify(Object.keys(c.counts.buckets)));

    // ---- slot limit under concurrency ----------------------------------------------------
    const reqs = await Promise.all([act(editor, 'slot', { id: SYN, variant: 'C' }), act(editor, 'slot', { id: FIX, variant: 'B' }), act(owner, 'slot', { id: FIX, variant: 'C' })]);
    const reserved = reqs.filter((x) => x.data?.reserved).length;
    const queued = reqs.filter((x) => x.data?.queued).length;
    check('3 concurrent challenger reservations for 1 free slot: exactly 1 reserved, 2 queued', reserved === 1 && queued === 2, reqs.map((x) => x.data?.message).join(' | '));

    // ---- preview -------------------------------------------------------------------------
    const page = await req(`/internal/experiments/view?id=${FIX}`, { jar: editor.jar });
    const m = /vs_preview=home-fixture-v1:B&amp;vs_pt=([A-Za-z0-9._-]+)/.exec(page.text);
    if (m) {
        const pj = new Jar({ vs_synthetic: '1' });
        const pr = await req(`/?vs_preview=${FIX}:B&vs_pt=${m[1]}`, { jar: pj });
        check('signed preview forces the variant without assignment cookies', (pr.headers.get('x-vs-exp') || '').startsWith(`preview:${FIX}:B`) && pr.text.includes('Experiment fixture B') && !pj.c[`vs_x_${FIX}`] && !pj.c[`vs_x_${SYN}`]);
        const bad = await req(`/?vs_preview=${FIX}:B&vs_pt=1.forged`, { jar: new Jar({ vs_synthetic: '1' }) });
        check('forged preview token is ignored', !(bad.headers.get('x-vs-exp') || '').startsWith('preview'), bad.headers.get('x-vs-exp'));
    } else check('preview link present on the experiment page', false);

    // ---- new phase: fresh counts ---------------------------------------------------------
    r = await act(editor, 'phase', { id: SYN, note: 'x', variant_B_weight: '50' });
    check('editor cannot start a new phase', r.status === 403);
    r = await act(owner, 'phase', { id: SYN, note: 'Synthetic: material change to B', variant_A_weight: '60', variant_B_weight: '40' });
    check('owner starts phase 2', r.status === 200, r.data?.message);
    c = await countsFor(SYN);
    check('phase 2 starts with zero counts', c.phase === 2 && !Object.keys(c.counts.buckets || {}).length, `phase ${c.phase}`);
    await sleep(CACHE_WAIT_MS);
    const re = await req('/', { jar: visitors[1].jar });
    check('returning visitor is re-assigned under phase 2', (re.headers.get('x-vs-exp') || '').endsWith(':2:synthetic') && (visitors[1].jar.c[`vs_x_${SYN}`] || '').includes('.2.'), re.headers.get('x-vs-exp'));
    const late = await req('/api/exp/event', { jar: visitors[1].jar, method: 'POST', json: { id: `late${Date.now()}`, exp: SYN, phase: 1, variant: visitors[1].variant, vid: visitors[1].jar.c.vs_vid, event: 'exposure' } });
    check('phase-1 events after the bump go to the late bucket', late.data?.bucket === 'synthetic_late', late.data?.bucket);

    // ---- pause / resume / rollback / retire ----------------------------------------------
    r = await act(viewer, 'pause', { id: SYN });
    check('viewer cannot pause', r.status === 403);
    r = await act(editor, 'pause', { id: SYN });
    check('editor pauses', r.status === 200);
    await sleep(CACHE_WAIT_MS);
    const paused = await req('/', { jar: visitors[2].jar });
    check('paused: visitors get the baseline and the assignment cookie is cleared', !paused.headers.get('x-vs-exp') && !visitors[2].jar.c[`vs_x_${SYN}`] && paused.text.includes('Integration Layer'), paused.headers.get('x-vs-exp') || 'no experiment header');
    r = await act(owner, 'launch', { id: SYN });
    check('owner resumes', r.status === 200, r.data?.message);
    r = await act(editor, 'rollback', { id: SYN, note: '' });
    check('rollback needs a reason', r.status === 400);
    r = await act(editor, 'rollback', { id: SYN, note: 'Synthetic rollback drill' });
    check('editor rolls back', r.status === 200);
    await sleep(CACHE_WAIT_MS);
    const rolled = await req('/', { jar: new Jar({ vs_synthetic: '1' }) });
    check('after rollback new visitors get A only, no assignment', !rolled.headers.get('x-vs-exp') && !rolled.text.includes('Experiment fixture B'));
    r = await act(owner, 'retire', { id: SYN, note: 'Synthetic check finished' });
    check('owner retires the synthetic experiment', r.status === 200);
    const exps = await req('/internal/experiments', { jar: viewer.jar });
    check('retire released its slots and promoted the queue', !exps.text.includes(`${SYN}/A`) && exps.text.includes(`${FIX}/`), '');

    const failed = results.filter((x) => !x.ok);
    console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? `; failed: ${failed.map((f) => f.name).join('; ')}` : ''}`);
    process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
    console.error('synthetic check crashed:', err);
    process.exit(1);
});
