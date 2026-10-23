// Experiment registry, slot limits, launch gates and lifecycle. Policy: docs/EXPERIMENTS.md.
//   experiments/<id>     the experiment (fields below) + decisions log
//   exp_active/<surface> what the middleware serves: { expId, phase, variants, surface } or { expId: null }
//   exp_slots/<surface>  { slots: [{ expId, variant }], queue: [...] }, max 3 per surface
// Every write is a compare-and-swap, so two operators (or jobs) cannot both take the last slot
// or both launch on one surface.

import { casUpdate } from './store';
import { audit } from './audit';
import { experimentsLive, isProductionSite } from './config';
import { EXP_ID_PATTERN, VARIANT_KEYS } from './shared/bucket.mjs';
import { hmacB64url, safeEqual } from './shared/crypto.mjs';

export const MAX_SLOTS = 3;
export const STATUSES = ['draft', 'ready', 'running', 'paused', 'concluded', 'retired'];
export const OUTCOMES = ['signup_start', 'cta_click', 'setup_prompt_copy'];

// Surfaces the middleware can experiment on, and their baseline target.
export const SURFACES = {
    home: { path: '/', baseline: '/new-home/index.html', label: 'Homepage (/)' },
};
export const SURFACE_BY_PATH = Object.fromEntries(Object.entries(SURFACES).map(([k, v]) => [v.path, k]));

export const PRELAUNCH_FIELDS = [
    ['hypothesis', 'Hypothesis'],
    ['audience', 'Audience'],
    ['assignmentUnit', 'Assignment unit'],
    ['exposureDefinition', 'Exposure definition'],
    ['primaryOutcome', 'Primary outcome'],
    ['guardrails', 'Guardrails'],
    ['decisionMethod', 'Decision method'],
    ['minSamplePerVariant', 'Minimum sample per variant'],
    ['plannedDays', 'Planned duration (days)'],
    ['reviewCondition', 'Review / end condition'],
    ['owner', 'Owner'],
    ['authority', 'Decision authority'],
    ['rollbackPlan', 'Rollback plan'],
];

const TARGET = /^\/[A-Za-z0-9/_.-]{0,200}$/;
const text = (v, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function normalizeInput(input, existing = {}) {
    const errors = [];
    const id = existing.id || text(input.id, 48).toLowerCase();
    if (!EXP_ID_PATTERN.test(id)) errors.push('id: lowercase letters, digits and dashes, 2–48 characters');
    const surface = existing.surface || text(input.surface, 32) || 'home';
    if (!SURFACES[surface]) errors.push(`surface must be one of ${Object.keys(SURFACES).join(', ')}`);

    const variants = [];
    for (const key of VARIANT_KEYS) {
        const target = text(input[`variant_${key}_target`], 200);
        const label = text(input[`variant_${key}_label`], 120);
        const weightRaw = input[`variant_${key}_weight`];
        if (!target && !label) continue;
        const weight = Number(weightRaw);
        if (!TARGET.test(target)) errors.push(`variant ${key}: target must be a site path such as /new-home/index.html`);
        if (target.startsWith('/internal') || target.startsWith('/api/internal')) errors.push(`variant ${key}: target cannot be an internal path`);
        if (!Number.isInteger(weight) || weight < 0 || weight > 100) errors.push(`variant ${key}: weight must be a whole number 0–100`);
        variants.push({ key, label: label || key, target, weight });
    }
    if (!variants.find((v) => v.key === 'A')) errors.push('variant A (the baseline) is required');
    if (variants.length < 2) errors.push('at least one challenger (B) is required');
    if (variants.length > MAX_SLOTS) errors.push(`at most ${MAX_SLOTS} variants (1 baseline + 2 challengers)`);
    const totalWeight = variants.reduce((s, v) => s + v.weight, 0);
    if (variants.length && totalWeight !== 100) errors.push(`weights must add up to 100 (now ${totalWeight})`);

    const minSample = input.minSamplePerVariant === '' || input.minSamplePerVariant === undefined ? null : Number(input.minSamplePerVariant);
    const plannedDays = input.plannedDays === '' || input.plannedDays === undefined ? null : Number(input.plannedDays);
    if (minSample !== null && (!Number.isInteger(minSample) || minSample < 1)) errors.push('minimum sample must be a positive whole number');
    if (plannedDays !== null && (!Number.isInteger(plannedDays) || plannedDays < 1 || plannedDays > 120)) errors.push('planned duration must be 1–120 days');
    const primaryOutcome = text(input.primaryOutcome, 40);
    if (primaryOutcome && !OUTCOMES.includes(primaryOutcome)) errors.push(`primary outcome must be one of ${OUTCOMES.join(', ')}`);

    return {
        errors,
        value: {
            id,
            surface,
            title: text(input.title, 140) || id,
            hypothesis: text(input.hypothesis),
            audience: text(input.audience, 500),
            assignmentUnit: text(input.assignmentUnit, 200) || 'Anonymous visitor (vs_vid first-party cookie)',
            exposureDefinition: text(input.exposureDefinition, 500),
            primaryOutcome,
            supportingOutcomes: OUTCOMES.filter((o) => o !== primaryOutcome),
            guardrails: text(input.guardrails, 1000),
            decisionMethod: text(input.decisionMethod, 1000),
            minSamplePerVariant: minSample,
            plannedDays,
            reviewCondition: text(input.reviewCondition, 1000),
            owner: text(input.owner, 200),
            authority: text(input.authority, 200),
            rollbackPlan: text(input.rollbackPlan, 1000),
            variants,
        },
    };
}

export function prelaunchMissing(exp) {
    const missing = PRELAUNCH_FIELDS.filter(([k]) => exp[k] === null || exp[k] === undefined || exp[k] === '').map(([, label]) => label);
    if ((exp.variants || []).length < 2) missing.push('At least two variants');
    return missing;
}

export async function getExperiment(store, id) {
    if (!EXP_ID_PATTERN.test(id || '')) return null;
    const d = await store.get('experiments', id);
    return d.found ? { ...d.data, _version: d.version } : null;
}

export async function listExperiments(store) {
    return (await store.list('experiments')).map((i) => i.data).filter(Boolean).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}

export async function getActive(store, surface) {
    const d = await store.get('exp_active', surface);
    return d.found ? d.data : { expId: null };
}

export async function getSlots(store, surface) {
    const d = await store.get('exp_slots', surface);
    return d.found ? d.data : { slots: [], queue: [] };
}

const logDecision = (exp, user, action, note, extra = {}) => ({
    ...exp,
    updatedAt: new Date().toISOString(),
    decisions: [...(exp.decisions || []), { at: new Date().toISOString(), actor: user.email, role: user.role, action, note: note || '', phase: exp.phase, ...extra }].slice(-200),
});

export async function createExperiment(store, user, input) {
    const { errors, value } = normalizeInput(input);
    if (errors.length) return { ok: false, errors };
    const now = new Date().toISOString();
    const exp = logDecision({ ...value, status: 'draft', phase: 1, createdAt: now, createdBy: user.email, synthetic: input.synthetic === true }, user, 'created', '');
    const res = await store.put('experiments', value.id, exp, { expectedVersion: 0 });
    if (!res.ok) return { ok: false, errors: [`an experiment with id ${value.id} already exists`] };
    await audit(store, user, 'experiment.create', value.id);
    return { ok: true, exp };
}

export async function updateDraft(store, user, id, input) {
    let errors = [];
    const res = await casUpdate(store, 'experiments', id, (cur) => {
        errors = [];
        if (!cur) {
            errors = ['not found'];
            return undefined;
        }
        if (!['draft', 'ready'].includes(cur.status)) {
            errors = [`a ${cur.status} experiment cannot be edited in place; start a new phase instead`];
            return undefined;
        }
        const n = normalizeInput(input, cur);
        if (n.errors.length) {
            errors = n.errors;
            return undefined;
        }
        return logDecision({ ...cur, ...n.value, status: 'draft' }, user, 'edited', cur.status === 'ready' ? 'back to draft' : '');
    });
    if (errors.length) return { ok: false, errors };
    await audit(store, user, 'experiment.edit', id);
    return { ok: res.ok, exp: res.data };
}

export async function markReady(store, user, id) {
    let errors = [];
    const res = await casUpdate(store, 'experiments', id, (cur) => {
        errors = [];
        if (!cur) return (errors = ['not found']), undefined;
        if (cur.status !== 'draft') return (errors = [`only a draft can be marked ready (this one is ${cur.status})`]), undefined;
        const missing = prelaunchMissing(cur);
        if (missing.length) return (errors = [`missing: ${missing.join(', ')}`]), undefined;
        return logDecision({ ...cur, status: 'ready' }, user, 'ready', '');
    });
    if (errors.length) return { ok: false, errors };
    await audit(store, user, 'experiment.ready', id);
    return { ok: res.ok };
}

/** Atomically reserve one slot; a full surface queues the request instead. */
export async function reserveSlot(store, surface, expId, variant, user) {
    let outcome = null;
    const res = await casUpdate(store, 'exp_slots', surface, (cur) => {
        const s = cur ? JSON.parse(JSON.stringify(cur)) : { slots: [], queue: [] };
        const at = new Date().toISOString();
        if (s.slots.some((x) => x.expId === expId && x.variant === variant)) {
            outcome = { reserved: true, already: true };
            return undefined;
        }
        if (s.slots.length < MAX_SLOTS) {
            s.slots.push({ expId, variant, at, by: user?.email });
            s.queue = s.queue.filter((x) => !(x.expId === expId && x.variant === variant));
            outcome = { reserved: true };
        } else {
            if (!s.queue.some((x) => x.expId === expId && x.variant === variant)) s.queue.push({ expId, variant, at, by: user?.email });
            outcome = { reserved: false, queued: true, position: s.queue.findIndex((x) => x.expId === expId && x.variant === variant) + 1 };
        }
        return s;
    });
    if (!res.ok) return { reserved: false, error: 'slot contention, try again' };
    await audit(store, user, 'experiment.slot', `${surface}/${expId}/${variant}`, { result: outcome.reserved ? 'reserved' : 'queued' });
    return outcome;
}

/** All-or-nothing reservation of an experiment's variants (used at launch). */
async function reserveAll(store, surface, exp) {
    let outcome = null;
    const res = await casUpdate(store, 'exp_slots', surface, (cur) => {
        const s = cur ? JSON.parse(JSON.stringify(cur)) : { slots: [], queue: [] };
        const mine = s.slots.filter((x) => x.expId === exp.id).map((x) => x.variant);
        const others = s.slots.filter((x) => x.expId !== exp.id);
        const need = exp.variants.map((v) => v.key);
        if (others.length + need.length > MAX_SLOTS) {
            outcome = { ok: false, reason: `slot limit: ${others.length} of ${MAX_SLOTS} slots on ${surface} are held by ${[...new Set(others.map((x) => x.expId))].join(', ')}` };
            return undefined;
        }
        const at = new Date().toISOString();
        s.slots = [...others, ...need.map((k) => s.slots.find((x) => x.expId === exp.id && x.variant === k) || { expId: exp.id, variant: k, at })];
        s.queue = s.queue.filter((x) => x.expId !== exp.id);
        outcome = { ok: true, had: mine };
        return s;
    });
    return res.ok ? outcome : { ok: false, reason: 'slot contention, try again' };
}

export async function releaseSlots(store, surface, expId, user) {
    const promoted = [];
    await casUpdate(store, 'exp_slots', surface, (cur) => {
        promoted.length = 0;
        const s = cur ? JSON.parse(JSON.stringify(cur)) : { slots: [], queue: [] };
        s.slots = s.slots.filter((x) => x.expId !== expId);
        s.queue = s.queue.filter((x) => x.expId !== expId);
        while (s.slots.length < MAX_SLOTS && s.queue.length) {
            const next = s.queue.shift();
            s.slots.push({ ...next, at: new Date().toISOString(), fromQueue: true });
            promoted.push(next);
        }
        return s;
    });
    if (promoted.length) await audit(store, user, 'experiment.slot.promoted', surface, { detail: promoted });
    return promoted;
}

// ---- launch gates ----------------------------------------------------------------------

export async function instrumentationCheck(exp, origin) {
    const results = await Promise.all(
        exp.variants.map(async (v) => {
            try {
                const res = await fetch(new URL(v.target, origin), { headers: { 'x-vs-ops-check': '1' }, cache: 'no-store', signal: AbortSignal.timeout(8000) });
                const body = await res.text();
                const hasSnippet = /<script[^>]+src=["'][^"']*\/exp\.js/i.test(body);
                return { key: v.key, target: v.target, status: res.status, pass: res.ok && hasSnippet, detail: !res.ok ? `HTTP ${res.status}` : hasSnippet ? 'loads /exp.js' : 'does not load /exp.js, so exposures and outcomes cannot be measured' };
            } catch (err) {
                return { key: v.key, target: v.target, pass: false, detail: `fetch failed: ${err.message}` };
            }
        })
    );
    return { pass: results.every((r) => r.pass), results };
}

/**
 * The zone cache must not store the experimented surface. A response that Cloudflare cached
 * (cf-cache-status HIT/MISS/EXPIRED/STALE/UPDATING/REVALIDATED) or that says public/s-maxage
 * fails. Without Cloudflare in front (local dev) the check passes with that caveat.
 */
export async function cacheSafetyCheck(origin, path) {
    try {
        const res = await fetch(new URL(path, origin), { headers: { 'x-vs-ops-check': '1', 'user-agent': 'viasocket-ops-cache-check (bot)' }, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(8000) });
        const cf = res.headers.get('cf-cache-status');
        const cc = res.headers.get('cache-control') || '';
        const age = res.headers.get('age');
        const evidence = { url: new URL(path, origin).href, status: res.status, 'cf-cache-status': cf, 'cache-control': cc, age };
        if (!cf) {
            const pass = !isProductionSite();
            return { pass, evidence, detail: pass ? 'No Cloudflare cache in front of this host (local/dev): nothing to leak through.' : 'No cf-cache-status header on production; cannot confirm the zone rule.' };
        }
        const cachedStates = ['HIT', 'MISS', 'EXPIRED', 'STALE', 'UPDATING', 'REVALIDATED'];
        const unsafe = cachedStates.includes(cf.toUpperCase()) || /\bpublic\b|s-maxage/i.test(cc);
        return {
            pass: !unsafe,
            evidence,
            detail: unsafe
                ? `Cloudflare treats ${path} as cacheable (${cf}, "${cc}"). One visitor's variant would be served to others. Make the zone cache rule bypass ${path} (or respect origin no-store) before launching.`
                : `Cloudflare does not cache ${path} (${cf}).`,
        };
    } catch (err) {
        return { pass: false, evidence: {}, detail: `check failed: ${err.message}` };
    }
}

/**
 * Launch (or resume) an experiment. Every gate is evaluated and reported; the experiment only
 * starts when all pass. Owner role is checked by the route before calling.
 */
export async function launch(store, user, id, { origin }) {
    const exp = await getExperiment(store, id);
    if (!exp) return { ok: false, blocked: ['not found'] };
    const surface = SURFACES[exp.surface];
    const blocked = [];
    if (!['ready', 'paused'].includes(exp.status)) blocked.push(`status is ${exp.status}; mark it ready first`);
    const missing = prelaunchMissing(exp);
    if (missing.length) blocked.push(`pre-launch fields missing: ${missing.join(', ')}`);
    if (user.role !== 'owner') blocked.push('only an owner may launch');
    const active = await getActive(store, exp.surface);
    if (active.expId && active.expId !== exp.id) blocked.push(`${active.expId} is already running on ${exp.surface}`);
    const instrumentation = await instrumentationCheck(exp, origin);
    if (!instrumentation.pass) blocked.push(`instrumentation check failed: ${instrumentation.results.filter((r) => !r.pass).map((r) => `${r.key} (${r.target}): ${r.detail}`).join('; ')}`);
    const cache = await cacheSafetyCheck(origin, surface.path);
    if (isProductionSite()) {
        if (!experimentsLive()) blocked.push('OPS_EXPERIMENTS_LIVE is not true on production');
        if (!cache.pass) blocked.push(`cache-safety check failed: ${cache.detail}`);
    }
    const checks = { instrumentation, cache, missing };
    if (blocked.length) {
        await audit(store, user, 'experiment.launch', id, { result: 'blocked', detail: blocked });
        return { ok: false, blocked, checks };
    }
    const slots = await reserveAll(store, exp.surface, exp);
    if (!slots.ok) {
        await audit(store, user, 'experiment.launch', id, { result: 'blocked', detail: [slots.reason] });
        return { ok: false, blocked: [slots.reason], checks };
    }
    let raced = null;
    const activeRes = await casUpdate(store, 'exp_active', exp.surface, (cur) => {
        raced = null;
        if (cur?.expId && cur.expId !== exp.id) {
            raced = `${cur.expId} started on ${exp.surface} a moment ago`;
            return undefined;
        }
        return { expId: exp.id, surface: exp.surface, path: surface.path, phase: exp.phase, variants: exp.variants.map(({ key, target, weight }) => ({ key, target, weight })), synthetic: Boolean(exp.synthetic), since: new Date().toISOString() };
    });
    if (raced || !activeRes.ok) return { ok: false, blocked: [raced || 'could not activate (contention)'], checks };
    const now = new Date().toISOString();
    await casUpdate(store, 'experiments', id, (cur) =>
        logDecision({ ...cur, status: 'running', phaseStartedAt: cur.phaseStartedAt && cur.status === 'paused' ? cur.phaseStartedAt : now, rolledBack: false }, user, cur.status === 'paused' ? 'resumed' : 'launched', '', { checks: { instrumentation: instrumentation.pass, cache: cache.pass } })
    );
    await audit(store, user, 'experiment.launch', id, { result: 'running' });
    return { ok: true, checks };
}

async function deactivate(store, surface, expId) {
    await casUpdate(store, 'exp_active', surface, (cur) => (cur?.expId === expId ? { expId: null, surface, since: new Date().toISOString() } : undefined));
}

export async function transition(store, user, id, action, { note = '', variant } = {}) {
    const exp = await getExperiment(store, id);
    if (!exp) return { ok: false, errors: ['not found'] };
    const allowed = {
        pause: ['running'],
        rollback: ['running', 'paused'],
        promote: ['running', 'paused'],
        retire: ['draft', 'ready', 'running', 'paused', 'concluded'],
    }[action];
    if (!allowed) return { ok: false, errors: ['unknown action'] };
    if (!allowed.includes(exp.status)) return { ok: false, errors: [`cannot ${action} a ${exp.status} experiment`] };
    if (['rollback', 'promote', 'retire'].includes(action) && !note.trim()) return { ok: false, errors: ['a note explaining the decision is required'] };
    if (action === 'promote' && !exp.variants.some((v) => v.key === variant)) return { ok: false, errors: ['choose the variant to promote'] };

    // Stop serving first: the middleware reads exp_active, so this is what takes effect.
    if (['pause', 'rollback', 'promote', 'retire'].includes(action)) await deactivate(store, exp.surface, id);
    const status = { pause: 'paused', rollback: 'paused', promote: 'concluded', retire: 'retired' }[action];
    await casUpdate(store, 'experiments', id, (cur) =>
        logDecision({ ...cur, status, rolledBack: action === 'rollback' ? true : cur.rolledBack, promoted: action === 'promote' ? variant : cur.promoted }, user, action === 'promote' ? `promote ${variant}` : action, note)
    );
    if (['promote', 'retire'].includes(action)) await releaseSlots(store, exp.surface, id, user);
    await audit(store, user, `experiment.${action}`, id, { detail: { note, variant } });
    return { ok: true };
}

/** A material change to a running/paused variant starts a new phase: counts restart. */
export async function newPhase(store, user, id, input, note) {
    let errors = [];
    const res = await casUpdate(store, 'experiments', id, (cur) => {
        errors = [];
        if (!cur) return (errors = ['not found']), undefined;
        if (!['running', 'paused'].includes(cur.status)) return (errors = ['only a running or paused experiment gets new phases; edit the draft instead']), undefined;
        if (!String(note || '').trim()) return (errors = ['describe the material change']), undefined;
        const n = normalizeInput({ ...flatten(cur), ...input }, cur);
        if (n.errors.length) return (errors = n.errors), undefined;
        if (n.value.variants.map((v) => v.key).join() !== cur.variants.map((v) => v.key).join()) return (errors = ['a new phase keeps the same variant keys; reserve a slot to add one']), undefined;
        return logDecision({ ...cur, variants: n.value.variants, phase: cur.phase + 1, phaseStartedAt: new Date().toISOString() }, user, 'new phase', note);
    });
    if (errors.length) return { ok: false, errors };
    const exp = res.data;
    if (exp.status === 'running') {
        await casUpdate(store, 'exp_active', exp.surface, (cur) => (cur?.expId === id ? { ...cur, phase: exp.phase, variants: exp.variants.map(({ key, target, weight }) => ({ key, target, weight })) } : undefined));
    }
    await audit(store, user, 'experiment.phase', id, { detail: { phase: exp.phase, note } });
    return { ok: true, phase: exp.phase };
}

export function flatten(exp) {
    const out = { ...exp };
    for (const v of exp.variants || []) {
        out[`variant_${v.key}_label`] = v.label;
        out[`variant_${v.key}_target`] = v.target;
        out[`variant_${v.key}_weight`] = String(v.weight);
    }
    return out;
}

// ---- preview tokens ----------------------------------------------------------------------

export async function previewToken(secret, expId, variant, ttlSeconds = 24 * 3600) {
    const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
    return `${exp}.${await hmacB64url(secret, `preview:${expId}:${variant}:${exp}`)}`;
}

export async function verifyPreviewToken(secret, expId, variant, token) {
    const [expStr, sig] = String(token || '').split('.');
    const exp = Number(expStr);
    if (!secret || !Number.isInteger(exp) || exp < Date.now() / 1000) return false;
    return safeEqual(sig, await hmacB64url(secret, `preview:${expId}:${variant}:${exp}`));
}

/** The change brief a coding agent (or a person) would implement for a challenger. */
export function changeBrief(exp, variantKey) {
    const v = exp.variants.find((x) => x.key === variantKey) || exp.variants.find((x) => x.key !== 'A');
    const base = exp.variants.find((x) => x.key === 'A');
    if (!v) return '';
    return [
        `Change brief: ${exp.title} — variant ${v.key} ("${v.label}")`,
        '',
        `Surface: ${SURFACES[exp.surface]?.label || exp.surface}. Baseline A is served from ${base?.target}.`,
        `Hypothesis: ${exp.hypothesis || '(missing)'}`,
        `Primary outcome: ${exp.primaryOutcome || '(missing)'}; guardrails: ${exp.guardrails || '(missing)'}.`,
        '',
        'Build:',
        `1. Create the challenger page at ${v.target} as a copy of the baseline with only the change under test. For the homepage, make the change in viasocket-site (variants/simple-bento-b is the local Version B) and export it to a path that is not "/".`,
        '2. Keep copy, claims and links identical to the baseline except for what the hypothesis tests (docs/POSITIONING.md claim register).',
        '3. Load /exp.js on the page (<script src="/exp.js" defer></script>) so exposure and outcomes are measured; keep the Start free links pointing at flow.viasocket.com so vs_exp/vs_vid can be appended.',
        `4. Add <link rel="canonical" href="https://viasocket.com${SURFACES[exp.surface]?.path || '/'}"> and <meta name="robots" content="noindex"> to the challenger so search engines index only the original.`,
        '5. Do not add the page to the sitemap. Run the instrumentation check on the Experiments page; launch stays blocked until it passes.',
        '',
        `Rollback: ${exp.rollbackPlan || '(missing)'}`,
    ].join('\n');
}
