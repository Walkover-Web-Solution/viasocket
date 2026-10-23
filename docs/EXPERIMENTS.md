---
covers: ["src/lib/ops/experiments.js", "src/lib/ops/edge-experiments.js", "src/lib/ops/exp-counts.js", "src/lib/ops/shared/bucket.mjs", "src/lib/ops/shared/stats.mjs", "src/app/api/exp/**", "public/exp.js", "src/app/internal/experiments/**", "scripts/ops/synthetic-experiment.mjs"]
status: approved
owner: website team
verified_at: 1d41fa59
verified_on: 2026-10-23
version: 1
---
# Experiments policy

How A/B/C tests run on viasocket.com public surfaces. The **live registry** (what exists, what is running, every decision) is the Experiments page of the ops admin, `/internal/experiments`, backed by the ops store. This file is policy only; never copy live state into it.

Mechanics and code paths: [ARCHITECTURE § Website ops](ARCHITECTURE.md#website-ops-admin-experiments-and-analyses). Data contracts: [CONTRACTS § Experiments](CONTRACTS.md#experiment-events-and-registry). Operator steps: [ops/README.md](ops/README.md).

## 1. When to run a test

Run one only when a decision depends on it and the surface has enough traffic to reach the minimum sample within the planned duration. Otherwise ship the change behind review, or don't.

A hypothesis is accepted when it names:

- the **evidence** that prompted it (a finding, a research note, a support theme),
- the **change** (one idea; copy and design changes together count as one idea only if the hypothesis says so),
- the **audience** and **surface**,
- the **primary outcome** and the expected direction.

"Try a new hero" is not a hypothesis. "Because the hero names no use case, replacing the rotating noun with a fixed 'for your product or AI agent' line will raise signup_start among homepage visitors" is.

## 2. Assignment and exposure

- **Unit:** the anonymous visitor, identified by the first-party `vs_vid` cookie (random, 1 year, host-only). No personal data.
- **Assignment** happens in `src/middleware.js` only for a surface with a running experiment: bucket = SHA-256(`vid:experiment:phase`) mapped onto the variant weights. The same visitor always sees the same variant within a phase.
- **Excluded from evaluation, always:** bots (user-agent list), internal traffic (`vs_internal=1`, set from the Experiments page), synthetic traffic (`vs_synthetic=1`, scripted tests; counted in separate buckets). Internal traffic gets the baseline. Bots get no cookie and no record, and their variant is drawn like a first-time visitor's, not pinned to the baseline (§9, cloaking). Operators see a chosen variant only through signed preview links, which set no assignment cookie and are never counted.
- **Exposure is separate from assignment.** A visitor counts as exposed when `/exp.js` reports that the variant page rendered (once per page view). Every variant page must load `/exp.js`; launch is blocked until the instrumentation check confirms it.

## 3. Outcomes

| Outcome | Role | Source |
|---|---|---|
| `signup_start` | default primary | click on a Start free / signup link (`/exp.js`) |
| `setup_prompt_copy` | supporting (may be primary when the hypothesis is about the setup prompt) | click on a `[data-copy]` control |
| `cta_click` | supporting | any other link or button click |
| signup completion | **not observable here** | needs the flow app to record `vs_exp`/`vs_vid` ([CONTRACTS](CONTRACTS.md#flow-app-experiment-parameters)) |

One primary outcome per experiment, chosen before launch. Supporting outcomes never decide a test on their own.

## 4. Guardrails

Every experiment states what must not get worse and the threshold that stops it. Always-on guardrails, checked by the `experiment-health` analysis and on the experiment page:

- **Sample-ratio mismatch:** chi-square on assignments vs weights, p < 0.001 invalidates the read. Pause and find the leak.
- **Exposure without assignment:** exposures above assignments, or events claiming a variant the visitor was not assigned (`unassigned` bucket). Pause and fix instrumentation.

## 5. Decision method

Shown on the page as the method label:

- Conversion = unique visitors with the primary outcome / unique exposed visitors, per variant, with **Wilson 95%** intervals.
- Each challenger vs baseline A: **two-sided two-proportion z-test**; with two challengers, **Bonferroni**-adjusted alpha 0.05/2.
- **No verdict** before both the minimum sample per variant and the planned duration are reached. The default verdict is "insufficient evidence"; afterwards it is "inconclusive" unless a comparison is significant.
- No "probability to win", no peeking-based stopping, no custom engine.

## 6. Approval and authority

| Action | Role |
|---|---|
| Create / edit draft, mark ready, run checks, reserve a slot | editor |
| Pause, roll back (with a reason) | editor (stopping only reduces risk) |
| Launch / resume, promote, retire, start a new phase | owner |

Launch is refused unless **all** hold: status ready (or paused), every pre-launch field filled (hypothesis, audience, assignment unit, exposure definition, primary outcome, guardrails, decision method, minimum sample, planned duration, review condition, owner, authority, rollback plan), the instrumentation check passes for every variant, the caller is an owner, no other experiment runs on the surface, and slots are free. On production also `OPS_EXPERIMENTS_LIVE=true` (default off) and the cache-safety check passes (§9).

## 7. Limits, phases and slots

- **Max 3 variants per surface:** baseline A + at most 2 challengers. Slots are reserved with compare-and-swap, so concurrent jobs cannot exceed the limit; extra challengers queue and are promoted when a slot frees.
- One running experiment per surface.
- A **material change** to a running variant (target, content behind it, weights) starts a **new phase**: counts restart from zero and visitors are re-drawn. Never edit a running variant in place.

## 8. Review, end, retirement and recovery

- Review at the stated review condition. End by **promote** (the winning variant becomes the baseline through a normal code change in viasocket-site; the experiment is concluded and its slots released) or **retire** (no change shipped).
- **Rollback** stops serving challengers within the middleware's 30 s cache; everyone gets A. It needs a written reason and is logged.
- After an end, delete the challenger page from the export, keep the registry entry (history), and record the decision in the decisions log.

## 9. Cache and search safety

- **Cache:** the production zone cache rule caches `/` for more than a day and ignores origin `no-store` ([cloudflare.md](current-infrastructure/cloudflare.md)). A cached experimented response would serve one visitor's variant to everyone and strip `Set-Cookie`. Before any production test on `/`, the zone rule must bypass (or respect origin headers for) the surface path; the launch-time cache-safety check fetches the surface and fails on any `cf-cache-status` other than DYNAMIC/BYPASS or a public `cache-control`.
- **Search** ([Google: website testing](https://developers.google.com/search/docs/crawling-indexing/website-testing)):
  - Variants are served by **rewrite on the original URL**. A challenger page therefore keeps `<link rel="canonical">` pointing at the original URL and must **not** carry `noindex` (it would de-index the original while served there). If its own path is ever crawled directly, the canonical consolidates it to the original. It is never in the sitemap. The instrumentation check enforces both.
  - If a test ever redirects to a separate URL, use a **302** (temporary), never a 301.
  - **No cloaking:** never choose content by user agent. Google names "always serving the original content when you see the user-agent Googlebot" as cloaking, so crawlers are excluded from counting but get a variant drawn like any first-time visitor. `OPS_EXPERIMENTS_BOT_POLICY=baseline` pins bots to A; use it only if the team decides to accept that risk (open decision in [ops/README.md](ops/README.md#open-decisions)).
  - Run only as long as needed; end and clean up promptly.
