---
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Docs index

Written for AI coding agents and new engineers. Every claim was checked against the code at `verified_at`; run `/ai-docs check` (the create-ai-docs skill) to see what has drifted since. Start at the repo-root [`AGENTS.md`](../AGENTS.md). <!-- verify:ignore -->

## Project overview

- **Name:** viaSocket marketing site (`viasocket.com`), package `next-socket`.
- **Summary:** the public website for viaSocket. It runs the static homepage, SEO landing pages, an integrations directory, automation templates, campaign and program pages, lead forms and the `/developers` (Embed) funnel. It hands visitors to `/signup` or to the product at flow.viasocket.com with their attribution. It is not the product itself ([VISION](VISION.md#what-this-site-is-vs-what-the-product-is)).
- **Current phase:** live in production, mid-repositioning. Since October 2026, `/`, `/developers`, `/integrations`, `/features`, `/use-cases` and `/new-direction` pitch an "integration layer for your product and AI agents", while other pages still sell no-code workflow automation ([OPEN_QUESTIONS P-01](OPEN_QUESTIONS.md)).
- **Key features**, one module doc each:
  1. **Homepage:** the static site in `public/new-home/`, outside Next.js ([modules/01-homepage](modules/01-homepage.md)).
  2. **Integrations directory:** `/integrations`, app pages and app-pair pages ([modules/02-integrations-directory](modules/02-integrations-directory.md)).
  3. **Automation templates:** `/automations` and template pages ([modules/03-automation-templates](modules/03-automation-templates.md)).
  4. **Developers (Embed):** the `/developers` sub-app and `/embed/*` ([modules/04-developers-embed](modules/04-developers-embed.md)).
  5. **Features, use cases, founders' letter:** `/features`, `/use-cases`, `/new-direction` ([modules/05-features-and-use-cases](modules/05-features-and-use-cases.md)).
  6. **MCP pages:** `/mcp/*` ([modules/06-mcp](modules/06-mcp.md)).
  7. **Pricing:** `/pricing` ([modules/07-pricing](modules/07-pricing.md)).
  8. **Campaign and program pages:** migrations, offers, webinars, departments, legal ([modules/08-campaign-and-program-pages](modules/08-campaign-and-program-pages.md)).
  9. **Lead and support forms:** experts, hire an expert, agency partner, support, feedback, signup ([modules/09-lead-and-support-forms](modules/09-lead-and-support-forms.md)).

## Where to read

| Doc | Read it when |
|---|---|
| [VISION.md](VISION.md) | First, for any request: purpose, audience, principles, and how to evaluate a request |
| [ARCHITECTURE.md](ARCHITECTURE.md) | First, for any change: mental model, request path, layers, core systems |
| [AGENTS.md](AGENTS.md) | Before writing code: the detailed rulebook behind the root rules |
| [05-navigation.md](05-navigation.md) | Adding or changing a route, redirect, link or nav item |
| [08-folder-structure.md](08-folder-structure.md) | Deciding where new code goes |
| [09-coding-guidelines.md](09-coding-guidelines.md) | Writing code: style, component conventions, do/don't |
| [modules/](modules/) | Changing one feature area (start from the list above) |
| [FLOWS.md](FLOWS.md) | Changing a user journey: UTM and signup, integrations, templates, A/B, forms, developers |
| [DESIGN.md](DESIGN.md) | Styling, components, tokens, responsive, a11y, copy, SEO metadata |
| [CONTRACTS.md](CONTRACTS.md) | Any data or tracking change: where types live, cookies, storage, analytics events |
| [current-infrastructure/](current-infrastructure/) | Calling an external system: [table-api](current-infrastructure/table-api.md), [plug-service](current-infrastructure/plug-service.md), [flow-webhooks](current-infrastructure/flow-webhooks.md), [cloudflare](current-infrastructure/cloudflare.md), [third-party-services](current-infrastructure/third-party-services.md) |
| [database/entities.md](database/entities.md) | Reading or adding a table-api table |
| [api/track-variant.md](api/track-variant.md), [12-api-guidelines.md](12-api-guidelines.md) | Touching this site's own route handlers |
| [13-security.md](13-security.md) | Anything involving keys, env vars, PII or form input |
| [14-performance.md](14-performance.md) | Caching, bundle size, rendering cost |
| [18-error-handling.md](18-error-handling.md) | Failure, empty and not-found behaviour |
| [06-tech-stack.md](06-tech-stack.md) | Checking a library or version before adding one |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Setup, env vars, build, verification checklist, PR and deploy flow |
| [22-definition-of-done.md](22-definition-of-done.md) | Before handing work back |
| [DECISIONS.md](DECISIONS.md) | Before reversing an existing choice: rationale, rejected alternatives, incidents |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Before "fixing" something odd: it may be a known, undecided question |
| [plans/](plans/), [brainstorms/](brainstorms/) | Writing a dated plan or requirements doc: clone the `_TEMPLATE.md` |

## Needs a human

Each item below is a `[!TODO]` callout in the linked doc; the full list of decisions is in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).
- Target audience (ICP), success metrics and the canonical positioning: [VISION](VISION.md#target-audience--ideal-customer-profile-icp)
- Why the Next 16 / OpenNext attempts failed, and whether the static homepage is long-term: [DECISIONS](DECISIONS.md)
- Cloudflare Pages build settings, per-environment env values, rollback, branch protection and `npm run deploy`: [DEVELOPMENT](DEVELOPMENT.md)
- Performance budgets: [14-performance](14-performance.md#budgets)
- Open design choices (canonical in server metadata, `primary` colour, homepage tokens, `addToProduct` styling): [DESIGN](DESIGN.md)
- Business value or liveness per feature area: one callout in each of [modules/01](modules/01-homepage.md) to [modules/09](modules/09-lead-and-support-forms.md), except 05 and 07
