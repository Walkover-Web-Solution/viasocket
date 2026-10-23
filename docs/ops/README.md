---
covers: ["src/app/internal/**", "src/app/api/internal/**", "src/app/api/exp/**", "src/lib/ops/**", "scripts/ops/**", "scripts/analyses/**", ".github/workflows/website-analyses.yml", "public/exp.js"]
status: approved
owner: website team
verified_at: 845da954
verified_on: 2026-10-23
version: 1
---
# Website ops: operator guide

`/internal` is the private website-ops area of viasocket.com: what needs attention, the knowledge docs (edited back into the repo), competitor research freshness, scheduled analyses, and A/B/C experiments. It is not `/admin` (that is the old Decap CMS) and it does not replace **viasocket-admin** on Embarko, which keeps redirects and programmatic integration copy.

Code map and diagram: [ARCHITECTURE § Website ops](../ARCHITECTURE.md#website-ops-admin-experiments-and-analyses). Journeys: [FLOWS](../FLOWS.md#website-ops-journeys). Contracts (store tables, events, ingest, GitHub writeback, flow-app parameters): [CONTRACTS](../CONTRACTS.md#website-ops-contracts). Experiment policy: [EXPERIMENTS](../EXPERIMENTS.md). Commands: [DEVELOPMENT § Website ops](../DEVELOPMENT.md#website-ops-local-setup).

## Sections

| Section | What it shows | Who can change what |
|---|---|---|
| Overview | Failed/stale analyses, high findings, overdue research, stale docs (by `verified_on`), running experiments and their health, missing connections | read-only |
| Knowledge | AGENTS.md and docs/*.md with `status`, `owner`, `sources`, `verified_on`, `verified_at`, `version`; render, edit, history, diff, restore | editor: draft → submit |
| Research | `docs/research/watchlist.json` (fixture until it lands), freshness vs cadence, source change check | editor: edit entries/cadence, run or pause the check |
| Analyses | Each question, last run, window, code revision, facts, "AI interpretation: not connected", next action, data sources | editor: pause/resume |
| Experiments | Registry, surfaces and slots, launch checks, preview links, results with method label, change brief, decisions log | editor: drafts, checks, slots, pause, rollback; owner: launch, promote, retire, new phase |
| Settings | Connections, policy and authority, schedules (mirrored from the workflow), knowledge sources, agent guidance, thresholds, budgets, notification preferences | owner |
| History | Audit trail of every mutation | read-only |

States are always honest: "not connected" instead of zeros, "storage not connected" refuses writes, a failed save never shows as effective.

## Local dev login

1. Create `.env.local` (gitignored) with the variables in [DEVELOPMENT § Website ops](../DEVELOPMENT.md#website-ops-local-setup). Generate users with `npm run ops:hash-password -- --email you@ops.test --role owner` (prompts for the password, prints one `OPS_USERS` entry). Put the entries in one JSON array on one line.
2. `npm run ops:store` (terminal 1) and `npx next dev -p 1152` (terminal 2).
3. Open http://localhost:1152/internal and sign in.

The session is an HMAC-signed cookie (`vs_ops`, HttpOnly, SameSite=Strict, 12 h). Roles are re-read from `OPS_USERS` on every request, so removing a user locks them out at once. Without `OPS_SESSION_SECRET` (32+ chars) or a valid `OPS_USERS`, every `/internal` page answers **503 "Ops admin not configured"** and every `/api/internal/*` route 503 JSON.

## Everyday tasks

- **Edit a doc:** Knowledge → document → Edit → Submit. Dev writes the file in the working tree after a base-sha check; production opens a PR into `test` (state "pending" until merged, then "effective"). A conflict keeps your text as a draft. Update `verified_on`/`verified_at` in the frontmatter when you re-verify.
- **Recover a change:** History → "Restore as draft" on any commit → review → Submit. Or `git checkout <sha> -- <file>` locally. A rejected/failed submit never changed the file.
- **Run research now:** Research → Run now (budget: Settings → Budgets). Pause stops both scheduled and manual runs.
- **Run an analysis:** `npm run analyze -- <name>` locally, or Actions → website-analyses → Run workflow. Pause one in Analyses, all with "Pause all", or every scheduled run with the repo variable `OPS_ANALYSES_PAUSED=true`.
- **Run an experiment:** New experiment → fill every field → Run checks → Mark ready → (owner) Launch. Preview each variant with the signed links. Pause or roll back any time; a material change is "Start a new phase". Exclude your own browser with the internal-traffic toggle.
- **Check the machinery:** `npm run ops:synthetic` (local/test only) runs 38 checks with synthetic traffic and retires its own experiment.

## Blockers (production)

| # | Blocker | Exact resolution | Owner |
|---|---|---|---|
| B-1 | **Zone cache rule caches HTML regardless of origin headers** (`/` > 1 day, `/pricing` 3 h, strips `Set-Cookie`). `/internal` pages could be cached and served to others; experiments on `/` would leak variants. | In Cloudflare (viasocket.com zone): add a Cache Rule "Bypass cache" for URI path starts with `/internal` or `/api/internal` or `/api/exp`, and for `/` while any experiment runs (or make the `/` rule respect origin `Cache-Control`). Then set `OPS_ZONE_BYPASS_CONFIRMED=true` in the Pages production env (the admin refuses to serve on production without it). Verify with `curl -sI https://viasocket.com/internal/login` → `cf-cache-status: DYNAMIC` or `BYPASS`, and the experiment page's cache-safety check. | Cloudflare dashboard admin |
| B-2 | **Ops store tables not provisioned.** Production shows "storage not connected" and refuses writes. | Create the two tables in [CONTRACTS § Ops store](../CONTRACTS.md#ops-store), make `key` unique if table-api supports it, issue a key scoped to those tables only, and set `OPS_TABLE_BASE_URL`, `OPS_TABLE_DB_ID`, `OPS_TABLE_KEY`, `OPS_TABLE_DOCS`, `OPS_TABLE_LOG` (server-only, no `NEXT_PUBLIC_`). Then verify the adapter (it is unverified): a CAS race and a read-after-write from the admin. | table-api owner |
| B-3 | **No GitHub token.** Production knowledge editing is "not connected". | Create a fine-grained token on `Walkover-Web-Solution/viasocket` with Contents: read/write and Pull requests: read/write only; set `OPS_GITHUB_TOKEN` (and optionally `OPS_GITHUB_REPO`, `OPS_GITHUB_BASE=test`) in the Pages env. The writeback is unverified live: test with one doc PR, then merge or close it. | repo admin |
| B-4 | **Homepage does not load `/exp.js`.** Launch on `/` is blocked by the instrumentation check (A fails). | Add `<script src="/exp.js" defer></script>` before `</body>` in viasocket-site `variants/simple-bento` (and any challenger), export with `--prod`, purge `/`. | viasocket-site |
| B-5 | **Signup completion not observable.** Experiments can only use signup_start / clicks. | flow.viasocket.com implements the [flow-app parameter contract](../CONTRACTS.md#flow-app-experiment-parameters) and exposes completed signups to `OPS_SIGNUP_EVENTS_URL`. | flow app team |
| B-6 | **GA4 / Search Console / Cloudflare analytics not connected.** | Service accounts and env names in Settings → Connections (also in `src/lib/ops/shared/analyses-registry.mjs`). | marketing ops |
| B-7 | **Ingest not configured for the workflow.** Scheduled runs skip with a notice. | Set `OPS_INGEST_TOKEN` on the Pages deployment and the same value plus `OPS_INGEST_URL` as GitHub Actions secrets. Scheduled runs need the workflow on `main`. | repo admin |
| B-8 | **Root layout scripts on /internal.** The root layout still renders GTM, chat, Reddit and cr-relay tags; the `/internal` CSP blocks them (console errors only). | Move public-site tags into a route group layout so `/internal` has its own root (a `src/app` refactor, outside this module). | site maintainers |

## Open decisions

- **Move into viasocket-admin?** The sections are built here with clean boundaries (`src/lib/ops/**` has no site imports; the store, ingest and GitHub contracts are documented) so they can move into viasocket-admin later. Decide whether `/internal` stays in the site or moves; until then nothing here duplicates viasocket-admin (no redirects, no programmatic copy).
- **Bots in experiments.** Default: crawlers get a variant drawn like a first-time visitor's and are never counted (Google's website-testing guidance treats UA-pinned originals as cloaking). The original brief asked for baseline-for-bots; `OPS_EXPERIMENTS_BOT_POLICY=baseline` does that if the team prefers it.
- **Dev edits are uncommitted.** Local knowledge edits write the working tree only; commit them yourself. Production edits are PRs.
