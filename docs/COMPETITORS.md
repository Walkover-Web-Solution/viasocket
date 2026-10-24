---
covers: []
verified_on: 2026-10-23
status: current-implementation
owner: "unassigned (proposed: Ankit / marketing)"
sources:
  - https://viasocket.com
  - https://viasocket.com/embed
  - https://viasocket.com/features
  - https://viasocket.com/developers/pricing
  - https://viasocket.com/mcp/aiagent
  - https://viasocket.com/help/security-and-compliance
  - https://composio.dev/pricing
  - https://pipedream.com/connect
  - https://nango.dev/docs/updates/changelog
  - https://www.useparagon.com/pricing
  - https://prismatic.io/pricing/
  - https://www.stackone.com/pricing
  - https://getmembrane.com/
  - https://albato.com/embedded/pricing
  - https://zapier.com/developer-platform
  - https://www.merge.dev/pricing
---
# Competitors

This page holds the canonical, dated competitor facts for viaSocket, positioned as "the integration and action layer for applications and AI agents."

- Per-competitor detail lives in [research/competitors/](research/competitors/).
- The machine-readable list the admin UI reads is [research/watchlist.json](research/watchlist.json).
- Every fact here was read from a public page on **2026-10-23**. Prices and counts are volatile, so re-check them before using them in copy.
- Sections are split into **Observation** (what a page says), **Interpretation** (what we read into it) and **Proposed** (recommendations needing approval).

## Scope and method

- **Question:** who else sells a way for SaaS and AI-agent builders to let their *end users* connect third-party apps? That covers managed auth, per-user connections, actions or agent tools, triggers, embedded connect UI, and custom connectors.
- **How we checked:**
  - We read official homepages, pricing pages, docs and changelogs with WebFetch.
  - Search-only facts are marked as such in each report.
- **When something counts as a competitor:** only when the product sells to the same builder for the same job. End-user automation tools are classed as substitutes.
- **Rules:**
  - Missing public evidence means "not found on public pages", never "absent".
  - Quotes are 15 words or fewer, attributed, and at most one per product.
  - No superiority claims.
- **viaSocket baseline used for comparison (Observation):**

| Item | What the page says | Source |
|---|---|---|
| Hero | Hero reads "Integration Layer for your AI agent." | [viasocket.com](https://viasocket.com) |
| Apps | "2,300+ apps" | [viasocket.com](https://viasocket.com), [features](https://viasocket.com/features), [pricing](https://viasocket.com/developers/pricing) |
| Pricing | Free $0 (100K tasks), Pro $19/mo and Business $99/mo (launch prices), Enterprise custom | [pricing](https://viasocket.com/developers/pricing) |
| What is not billed | Connected accounts, users and seats | [pricing](https://viasocket.com/developers/pricing) |
| Compliance on the homepage | "GDPR · CCPA", HTTPS behind Cloudflare | [viasocket.com](https://viasocket.com) |
| Security page | Claims no certification | [help/security-and-compliance](https://viasocket.com/help/security-and-compliance) |
| Customer logos | None shown as customers on the homepage | [viasocket.com](https://viasocket.com) |

## Review cadence (Proposed)

- **Direct competitors:** every 30 days.
- **Indirect competitors and substitutes:** every 90 days.
- **On change:** re-research whenever any URL in an entry's `watch` list changes, for example pricing, changelog or homepage hero.
- The cadence values live in `review_cadence_days` in the watchlist.

## Who approves changes (Proposed)

- **Watchlist edits:** the marketing owner (proposed: Ankit) approves adding, dropping or recategorising competitors, and changes to `relevance`.
- **What anyone may update:** fact refreshes such as dates, prices and counts, as long as each one cites a URL.
- **What always needs owner approval:** any public comparison or "vs" page, before it ships.

## Summary

| Name | Category | Overlap | Positioning (verbatim, ≤15 words) | Integrations claim | Pricing model (public start) | Relevance | Last checked | Report |
|---|---|---|---|---|---|---|---|---|
| Composio | direct | Per-user auth, agent tools, MCP and triggers for AI apps | "Give your AI secure access to 1,500+ apps in minutes." | 1,500+ apps; 1,633 toolkits listed | Usage-based; free tier; Pro $29/mo | high | 2026-10-23 | [composio](research/competitors/composio.md) |
| Pipedream Connect | direct | Managed end-user auth, actions, triggers and MCP for apps and agents | "The integration layer for AI agents" | 3,000+ APIs; 10,000+ tools | Per external user plus credits; Startup ~$99/mo annual | high | 2026-10-23 | [pipedream-connect](research/competitors/pipedream-connect.md) |
| Nango | direct | Code-first auth, actions, syncs and MCP for products and agents | "Integrations for your products & agents" | 1,000+ APIs | Per connection plus compute; free tier; $50/mo PAYG | high | 2026-10-23 | [nango](research/competitors/nango.md) |
| Paragon | direct | Embedded Connect Portal plus ActionKit agent tools | "Connect your agent to customer data and tools." | 1000+, 300+ and 130+ on different pages | Per connected user; no public price | high | 2026-10-23 | [paragon](research/competitors/paragon.md) |
| Prismatic | direct | Embedded iPaaS plus MCP flow tools for B2B SaaS | "The AI-enabled embedded iPaaS" | 190+ connectors | Per instance; no public price | high | 2026-10-23 | [prismatic](research/competitors/prismatic.md) |
| StackOne | direct | Agent integration platform with an OEM embed plan | "Put your AI agents to work" | 570+ connectors; 35,000+ actions | Credits per tool call; free tiers; Team $600/mo | high | 2026-10-23 | [stackone](research/competitors/stackone.md) |
| Membrane | direct | Per-tenant connections and actions for products and agents | "Make your software talk to anything" | 100,000+, partly generated on demand | Free core; Business $3,000/mo (Jan 2026 article) | high | 2026-10-23 | [membrane](research/competitors/membrane.md) |
| Albato Embedded | direct | White-label integrations and embeddable agents inside SaaS | "Embed AI Agents connected to 1,000+ apps" | 1,000+ | From $3,000/mo; sales-led | high | 2026-10-23 | [albato-embedded](research/competitors/albato-embedded.md) |
| Arcade.dev | direct | Per-user OAuth agent tools and MCP, governance-led | "Govern every action for every AI agent" | 8,000+ tools | Per auth event plus call; Team $25/mo | medium | 2026-10-23 | [arcade](research/competitors/arcade.md) |
| Cyclr | direct | Embedded iPaaS marketplace plus MCP PaaS | "One platform for embedded integration, AI interoperability and data governance." | 600+ connectors | From $1,595/mo | medium | 2026-10-23 | [cyclr](research/competitors/cyclr.md) |
| Zapier (MCP / Embed) | indirect | Embedded MCP and Powered by Zapier for products, tied to Zapier accounts | "Power your product or AI agent with 9,000 app integrations" | 9,000+ apps | Tasks; 2 tasks per MCP call; embed pricing not public | high | 2026-10-23 | [zapier](research/competitors/zapier.md) |
| Merge | indirect | Unified API plus Agent Handler MCP | "The universal context engine for agents" | "5,000+ tools" vs "hundreds" | Per linked account; Launch $650/mo | medium | 2026-10-23 | [merge](research/competitors/merge.md) |
| Unified.to | indirect | Real-time unified API plus per-connection MCP | "Real-time Data Infrastructure" | 1,667 sources | Per API call; from $750/mo | medium | 2026-10-23 | [unified-to](research/competitors/unified-to.md) |
| Workato Embedded | indirect | Enterprise embedded iPaaS | "Embedded Integrations at Scale" | 1,200+ (embedded page) | Not public | medium | 2026-10-23 | [workato-embedded](research/competitors/workato-embedded.md) |
| Tray Embedded | indirect | Enterprise embedded integrations | "Embedded integration, built once and run for every customer." | 700+ | Usage-based; "starts at $50"; tiers sales-only | low | 2026-10-23 | [tray-embedded](research/competitors/tray-embedded.md) |
| Make | substitute | End users automate for themselves; OEM instance in docs only | "Build and manage AI agents and automations in one visual landscape" | 3,000+ / 3,500+ | Credits; free tier; paid prices not verified | medium | 2026-10-23 | [make](research/competitors/make.md) |
| n8n | substitute | Self-hosted automation; OEM embed requires n8n branding | "Build the agent. Understand its workflow." | 500+ native / 2,409 listed | Executions; Starter €20/mo; embed not public | medium | 2026-10-23 | [n8n](research/competitors/n8n.md) |

## Substitutes and workarounds (Observation and Interpretation)

These are alternatives to buying any integration layer at all. They are not tracked as products in the watchlist, because they have no URL to watch.

- **Build in-house.** The team registers OAuth apps per provider and writes a client per API. Competitors' own copy frames this as costly. For example, Pipedream quotes Lindy spending over $1M on about 250 integrations ([pipedream.com/connect](https://pipedream.com/connect)). viaSocket's own site tables estimate "4–6 weeks per workflow" with no source given (`src/app/embed/actions-for-ai/AIComparisonTable.js`). **Proposed:** source or remove that estimate.
- **Unified APIs as a category** (Merge, Unified.to, Apideck). These suit products that need normalised data from one category, such as HRIS or accounting. They are not built for per-app actions across many categories.
- **End users bring their own iPaaS** (Zapier, Make, n8n). The builder ships a webhook or API and lets customers wire it up themselves. This has no build cost for the builder, but the integration UX lives outside the product.
- **Spreadsheets, CSV import/export and manual copy-paste.** This is the default for early-stage products.
- **Do nothing.** No integrations, or a "request an integration" form.

## Positioning gaps viaSocket can credibly use

Each gap is an Interpretation backed by Observation. Each Proposed wording needs owner approval and must not name competitors without approval.

1. **No per-end-user or per-connection fees at self-serve prices.**
   - viaSocket's pricing page says connected accounts, users and seats are not billed, with a free tier and Pro at $19/mo ([pricing](https://viasocket.com/developers/pricing)).
   - Direct competitors meter the same thing:
     - Pipedream Connect: $2 per external user per month after 100 ([pricing](https://pipedream.com/pricing)).
     - Nango: $0.29 per connection ([pricing](https://nango.dev/pricing)).
     - Paragon: billed by Connected Users ([pricing](https://www.useparagon.com/pricing)).
     - Merge: per linked account, $650/mo for 10 ([pricing](https://www.merge.dev/pricing)).
     - Composio does not meter connected accounts. Its plans include "unlimited connected accounts" ([pricing](https://composio.dev/pricing)), so this gap does not apply against Composio.
   - **Proposed:** "Pay for actions, not for your users." Use this only while the pricing page says so.
2. **A ready catalog of per-app actions, larger than the self-serve developer tools and embedded iPaaS.**
   - viaSocket claims 2,300+ apps.
   - Nango claims 1,000+ APIs, Composio 1,500+ apps, StackOne 570+, Cyclr 600+, Prismatic 190+, Albato 1,000+, and Paragon at most 1000+ actions (sources in each report).
   - **Caveat:** Pipedream (3,000+ APIs), Zapier (9,000+), Arcade (8,000+ tools) and Membrane (100,000+, generated) all claim more. So this is **not** a "largest catalog" claim.
   - **Proposed:** "2,300+ apps with ready actions and triggers", stated without a comparison.
3. **Self-serve start, with no sales call or onboarding fee, for embedded integrations.**
   - These competitors are demo or sales-led, or have no public price:
     - Albato: from $3,000/mo, a 4 to 8 week rollout.
     - Cyclr: from $1,595/mo, and $5,000 MCP onboarding.
     - Prismatic and Paragon: no public price.
     - Workato and n8n Embed: not public.
     - Zapier embed: by form.
   - viaSocket has a public free tier and "Start free" ([pricing](https://viasocket.com/developers/pricing)).
   - **Proposed:** "Start free, ship today, no sales call."
   - **Caveat:** Composio, Nango, Arcade and StackOne are also self-serve.

**Not a gap any more:** setup by pasting a prompt into a coding agent. Nango (2026-06-01, [changelog](https://nango.dev/docs/updates/changelog)), Prismatic (Agent Skills, 2026-10-15), Paragon ("Paragon Skill"), Arcade and Composio (assistant plugins) all now offer some form of it. Keep it as a feature, not a differentiator.

**Needs internal confirmation before use:**

- **Branded connect UI with no add-on fee.** Nango gates branding behind a $450/mo add-on. Composio charges $0.30 per connection for advanced white-label and shows "Composio" on consent screens without your own OAuth app. Albato needs Pro at $5,000+ for white-label OAuth. n8n OEM requires n8n branding.
  - **Confirm** which viaSocket plans include custom branding.
  - **Confirm** what app name appears on viaSocket's own OAuth consent screen.
- **Triggers with real-time webhooks.** Composio's default polling minimum is reported as 15 minutes (search only).
  - **Confirm** viaSocket's own polling interval before contrasting.

## Risks: where competitors are stronger (Interpretation)

- **Compliance proof.**
  - Most direct competitors show SOC 2 Type II, and several show ISO 27001 or HIPAA: Composio, Pipedream, Paragon, StackOne, Membrane, Albato, Merge, Unified.to.
  - viaSocket's security page claims no certification ([help/security-and-compliance](https://viasocket.com/help/security-and-compliance)).
  - Yet repo pages state "SOC 2 Type II, ISO, GDPR & CCPA" (`src/app/migration/{zapier,n8n,relay}/*ComparisonTable.js`) and "SOC 2 Type II certified" (`src/app/embed/app-integration/page.js`).
  - **Proposed: resolve this contradiction first.** It is the highest-risk item on this page.
- **Message collision.** Pipedream's hero says "The integration layer for AI agents". Zapier says "Power your product or AI agent…". Nango says "Integrations for your products & agents". viaSocket's line is close to all three.
- **Proof.** Competitors show named customers (Pipedream: Perplexity, Lindy; Paragon: CrewAI, You.com; Albato: Bitrix24, Duda). viaSocket's homepage shows app logos only.
- **Enterprise governance.** Competitors lead with:
  - self-hosting, on-prem or BYOC (Nango, Arcade, Paragon, Membrane, Albato Enterprise)
  - open source (Nango, Prismatic connectors)
  - agent guardrails (StackOne prompt-injection guard and PII redaction, Merge DLP, Arcade policy hooks)
  - None of these was found on viaSocket's public pages.
- **Brand and funding scale.** Zapier, Merge and Workato are established brands. Pipedream is now part of Workday (per press and an SEC filing, not on pipedream.com).
- **viaSocket's own inconsistencies weaken trust.** Observed 2026-10-23:
  - App counts: 2,300+ (homepage, features, pricing), "1,929+" and "1,000+" (/mcp/aiagent), and 2,200+ / 2,500+ in source files (`src/app/embed/**`, `src/app/lifetime-deal/**`).
  - Price: "Free, then $99/mo" in the embed tables, against Pro at $19/mo on the pricing page.
- **Unsourced competitor claims already on site.**
  - `src/app/embed/app-integration/ComparisonTable.js` and `src/app/embed/actions-for-ai/AIComparisonTable.js` carry undated Paragon, Prismatic and Zapier cells. Some conflict with today's pages; for example Prismatic is shown at "~$500/mo, no free tier" while its pricing page shows no price and offers a trial.
  - In `AIComparisonTable.js` the data keys (`paragon`, `prismatic`) do not match the column headers (Composio, Paragon ActionKit).
  - **Proposed:** re-source every cell with a date, or remove it, with owner approval.

## Research candidates not confirmed

These are in `watchlist.json` with status `candidate` or `dropped`.

| Candidate | Status | Why |
|---|---|---|
| Activepieces Embed | candidate | An embedded flow builder with white label and customer connections ([activepieces.com/embed](https://www.activepieces.com/embed)); sales-only. Needs a deeper check |
| Truto | candidate | "Integration platform for your AI": 900+ integrations, MCP per integration ([truto.one](https://truto.one/)). No public pricing |
| Ampersand | candidate | Deep enterprise integrations as code, per-tenant credentials ([ampersand.ai](https://www.ampersand.ai/)). No MCP or count found |
| Alloy Automation | candidate | Navigation lists MCP, embedded iPaaS and a Connectivity API ([runalloy.com](https://runalloy.com/)). Sub-pages failed to load |
| Boomi Embedded | candidate | Enterprise embedded integrations ([boomi.com/platform/embedded](https://boomi.com/platform/embedded/)). Enterprise only |
| Klavis AI | candidate | The homepage now pitches agent training environments, while the docs still describe per-user MCP OAuth ([klavis.ai](https://www.klavis.ai/)). Possible pivot |
| Apideck | candidate | A unified API now focused on accounting, 55+ systems ([apideck.com](https://www.apideck.com/)). Substitute-type |
| Hotglue | candidate | Embedded data-sync integrations, 600+ connectors ([hotglue.com](https://hotglue.com/)). Data sync, not actions or agents |
| Smithery | candidate | An MCP registry. A banner says its managed identity shuts down on Oct 31 ([smithery.ai](https://smithery.ai/)) |
| Integrately Embed | dropped | Only pre-built automations in a widget ([integrately.com/embed](https://integrately.com/embed)); weak overlap |
| MuleSoft | dropped | No embedded or OEM offer found; internal iPaaS |
| Pabbly | dropped | No embed or white-label offer found |
| Relay.app | not evaluated | viaSocket has a `/migration/relay` page, which implies end-user automation overlap. **Proposed:** evaluate next cycle |

## Unknowns

- Pipedream Startup price: the page rendered garbled.
- Make paid prices: did not render.
- Membrane current prices: only a January 2026 article is available.
- Embed or partner pricing for Zapier, n8n, Make OEM, Workato, Prismatic and Paragon: not public.
- Whether embedded Zapier MCP users need their own Zapier accounts.
- Zapier AI Actions deprecation: search and community sources only.
- Compliance for Nango (trust center not read) and Workato (trust center did not load).
- Funding figures for Arcade and the Composio Series A amount: press or conflicting.
- The Workday close of Pipedream: SEC filing and press via search, not on pipedream.com.
- viaSocket's own facts needing confirmation:
  - compliance status
  - which plans include custom branding
  - the consent-screen app name
  - trigger polling interval
  - regions behind "Regional Deployment"
  - the canonical app count
