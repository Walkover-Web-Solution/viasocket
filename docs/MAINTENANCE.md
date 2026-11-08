# Docs maintenance record

The weekly docs refresh starts here: it reviews what changed since **Last reviewed revision**, updates the coverage map below, and replaces the unfinished-work list. Statuses mean: **verified** (checked against code or live behaviour at the stated revision), **partial** (exists but has known drift or gaps), **missing** (nothing actionable exists), **n/a** (does not apply to this repo, with the reason). A doc's own `verified_at` stamp is the finer-grained record; `/ai-docs check` lists docs whose `covers:` files changed after it.

## Last run

| Field | Value |
|---|---|
| Last reviewed revision | `96b44de6` (`origin/test`, merge of PR #1920, 2026-11-05) |
| Run date | 2026-11-08 (first run; no earlier record existed) |
| Scope | Inventory of all docs and their stamps; every code change since each doc's `verified_at`; build route list; live checks of production, test and the admin panel's public API |
| Checks run | `npm install`, `npm run build` (exit 0, 57 routes, only the Sass `@import` deprecation warnings), route map vs build output, env-var reads vs the reference table, `curl` of affected routes on production and test, unauthenticated GETs of the admin `/api/public/*` reads, relative-link check across `docs/` and `AGENTS.md` |

## Coverage map

| Topic | Authoritative location | Status | Evidence / gap |
|---|---|---|---|
| Purpose, positioning, boundaries | [VISION](VISION.md), [DECISIONS ADR-015](DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning) | partial | Positioning decided. ICP and success measures are **proposed**, not confirmed ([OPEN_QUESTIONS P-02](OPEN_QUESTIONS.md#active-questions-table)). VISION's scope table still says the blog is not in this repo (P-07). |
| Terminology / glossary | none | missing | No glossary exists; terms (Action Layer, Integration Layer, Pass, tasks, AI credits, Mushrooms) are defined only where used. Needs an owner-approved list, not an inferred one. |
| Feature map and journeys | [modules/](modules/) 01–10, [FLOWS](FLOWS.md) | partial | Module 10 (blog) added this run. Modules 01, 04, 06, 07, 08, 09 have no code change since their stamps. 02, 03, 05 and FLOWS have code changes since their stamps (see unfinished work). |
| Architecture, request path, systems | [ARCHITECTURE](ARCHITECTURE.md), [current-infrastructure/](current-infrastructure/) | partial | Admin panel and `/blogs` added this run. Stamp left at `9ec4868d` because the homepage files it covers changed and were not re-read. |
| Routes, redirects, SEO files | [05-navigation](05-navigation.md), [admin-panel](current-infrastructure/admin-panel.md) | verified | Route table matches the build at `96b44de6`; redirect table matches `src/data/redirects.json`; live admin list compared 2026-11-08. Stamp not bumped: homepage-B files it covers were not re-read. |
| Data and contracts | [CONTRACTS](CONTRACTS.md), [database/entities](database/entities.md), [current-infrastructure/](current-infrastructure/) | partial | Plug service and admin panel verified at `96b44de6`. table-api, flow-webhooks and third-party-services have small unreviewed changes. |
| Setup, build, env vars | [DEVELOPMENT](DEVELOPMENT.md) | verified | Scripts, env-var reads and route count rechecked at `96b44de6`. `.env` contents could not be checked (none on the run machine). |
| Tests and acceptance checks | [DEVELOPMENT checklist](DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist), [22-definition-of-done](22-definition-of-done.md) | partial | There are **no automated tests, lint or typecheck**; the build and manual `curl` checks are the only gates. This is a finding, not a documentation gap. |
| Design, components, accessibility | [DESIGN](DESIGN.md) | partial | Announcement bar and blog components added to the catalog. Homepage compliance section, pricing plans and `SiteChrome` changes since `0244e05f` not re-read. No accessibility audit is recorded. |
| Marketing claims, proof, competitor evidence | [VISION](VISION.md), [modules/01-homepage](modules/01-homepage.md), [modules/10-blogs](modules/10-blogs.md) | partial | Compliance claims recorded (2026-11-05). Who approves competitor comparisons in `_posts/blogs/*-alternative.md` is unknown (P-07). |
| Performance and caching | [14-performance](14-performance.md) | partial | Cache table corrected for the admin fetches. Budgets are proposed only (D-12). Stamp left at `17b99cd8`. |
| Backend and data (validation, idempotency, retries) | [api/track-variant](api/track-variant.md), [12-api-guidelines](12-api-guidelines.md) | partial | The only route is `/api/track-variant` (doc current). `12-api-guidelines` predates the admin forward and environment filter. Migrations, queues and transactions: n/a, the site owns no database. |
| Security and privacy | [13-security](13-security.md) | partial | Env-var statement corrected. Open risks unchanged (S-01…S-11). |
| Measurement and experiments | [CONTRACTS](CONTRACTS.md#analytics--telemetry-event-contracts), [modules/01-homepage](modules/01-homepage.md), [DECISIONS ADR-017](DECISIONS.md) | verified | Homepage A/B split, events and admin forward documented at `52c28147`/`9ec4868d`; no code change since. |
| Operations, deploy, rollback | [DEVELOPMENT](DEVELOPMENT.md#pr-workflow--deployment-pipeline), [cloudflare](current-infrastructure/cloudflare.md) | partial | Procedures are documented, not tested. Dashboard settings are not visible from the repo (D-02, D-11). |
| CLI / SDK / infrastructure-as-code | n/a | n/a | The repo ships none. `/developers/docs` publishes the product's SDK contract ([CONTRACTS](CONTRACTS.md#published-contracts-developer-docs-page)). |
| Agent instructions | [AGENTS.md](../AGENTS.md), `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.github/copilot-instructions.md` | verified | Every adapter points to `AGENTS.md` (checked 2026-11-08). |
| Public agent discovery (`/llms.txt`) | `public/llms.txt`, [ARCHITECTURE](ARCHITECTURE.md#seo-files-sitemap--robots) | partial | The file was user-supplied (2026-10-30) and was not edited. Its `/help/*` links return 200 on production but 301 to `/new-direction` on test (P-05). |

## Unfinished work (next run starts here)

1. **Docs with code changes since their stamp, not re-read this run:** `modules/02-integrations-directory` (pricing/`SiteChrome` parts), `modules/03-automation-templates` (four layouts with share images), `modules/05-features-and-use-cases`, `FLOWS`, `DESIGN`, `09-coding-guidelines`, `12-api-guidelines`, `current-infrastructure/third-party-services`, `flow-webhooks`, `table-api`, `database/entities`. Run `/ai-docs check` or diff each doc's `covers:` from its `verified_at`.
2. **Decisions needed** (recorded in [OPEN_QUESTIONS](OPEN_QUESTIONS.md)): P-07 (which blog is canonical, ownership, ADR), P-08 (`/feedback` → `/support` redirect), plus the earlier open rows.
3. **Missing:** a glossary approved by the product owner; an accessibility check procedure; any automated test.
4. **`/pass`** has a route-map row only; it has no module doc (it shares the pricing components, so module 07 is the likely home).
