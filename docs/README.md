---
status: current-implementation
owner: unassigned
covers: ["docs/**", "AGENTS.md"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources: ["AGENTS.md", "docs/**"]
---
# Docs index

For AI agents and new people working on viasocket.com. Start at the repo-root [`AGENTS.md`](../AGENTS.md). Each doc's frontmatter says its `status` (approved, current-implementation, proposed, draft), `owner`, `sources` and when it was last verified. Only **approved** content is direction. <!-- verify:ignore -->

## Project overview

viasocket.com is the public website for viaSocket, **the integration and action layer for applications and AI agents** ("You build the app or agent. viaSocket handles the connections and actions."). It runs the static homepage, landing and SEO pages, the integrations directory, pricing, the `/blogs` blog, campaign pages and lead forms, and hands visitors to signup at flow.viasocket.com. It is live in production and mid-repositioning: pages that still sell no-code workflow automation are out of date ([ADR-015](DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning)).

## Direction and marketing

| Doc | What it holds |
|---|---|
| [VISION.md](VISION.md) | Product purpose, problems solved, ICP, principles, long-term direction, success measures, non-goals |
| [POSITIONING.md](POSITIONING.md) | Audiences, category, differentiators, objections, offer, message hierarchy, CTAs, **claim register** and inconsistencies |
| [COMPETITORS.md](COMPETITORS.md) | Competitors and alternatives, with evidence (owned by the competitor research) |
| [DESIGN.md](DESIGN.md) | **Brand**: voice, banned phrases, logo, colour, type, layout, motion, accessibility; then the five visual systems in code |
| [SEO.md](SEO.md) | Page map and search intent, canonicals, robots and sitemaps, redirects, structured data, metadata, measured spot check |
| [MEASUREMENT.md](MEASUREMENT.md) | Conversion journey, metric definitions, current instrumentation, attribution limits, gaps |

## Engineering

| Doc | Read it when |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Any code change: request path, layers, core systems |
| [AGENTS.md](AGENTS.md) | Before writing code: the detailed rulebook behind the root rules |
| [FLOWS.md](FLOWS.md) | Changing a journey: UTM and signup, integrations, templates, forms |
| [CONTRACTS.md](CONTRACTS.md) | Any data or tracking change: cookies, storage, events, schemas |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Setup, env vars, build, verification checklist, PR and deploy flow |
| [05-navigation.md](05-navigation.md) | Routes, links, nav items, paths served by other deployments |
| [08-folder-structure.md](08-folder-structure.md), [09-coding-guidelines.md](09-coding-guidelines.md) | Where code goes and how it is written |
| [modules/](modules/) | One feature area: homepage, integrations, templates, developers, features and use cases, MCP, pricing, campaigns, forms |
| [current-infrastructure/](current-infrastructure/), [database/entities.md](database/entities.md), [api/](api/) | External systems, table-api tables, this site's own route |
| [12-api-guidelines.md](12-api-guidelines.md), [13-security.md](13-security.md), [14-performance.md](14-performance.md), [18-error-handling.md](18-error-handling.md), [06-tech-stack.md](06-tech-stack.md) | Route handlers, keys and PII, caching, failure behaviour, libraries |
| [22-definition-of-done.md](22-definition-of-done.md) | Before handing work back |

## Memory

| Doc | What it holds |
|---|---|
| [DECISIONS.md](DECISIONS.md) | Why things are the way they are; read before reversing a choice |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Undecided questions, each with an owner and what would settle it |
| [plans/](plans/), [brainstorms/](brainstorms/) | Dated plans and requirement drafts (clone `_TEMPLATE.md`) |

## Needs a human now

- Confirm the ICP and success measures (P-02, Ankit), the app count (P-04, marketing) and the unverified or contradictory claims, starting with SOC 2 / ISO (P-09).
- Confirm the admin redirects for `/developers` and `/embed` (P-06) and name the viasocket-admin owner (P-07).
- Confirm `/pricing` prices, fix the "$99/mo" comparison tables and decide on the unfinished `/pass` page (P-08).
- Name the GTM owner and decide on consent (P-10); pick the canonical blog (P-11); fix or remove the unsourced comparison tables (P-12).
- Engineering questions (why the Next 16 upgrade was reverted, Cloudflare build settings, performance targets, canonical and title fixes) are in [OPEN_QUESTIONS](OPEN_QUESTIONS.md).
