---
status: approved
owner: Ankit Dongre
covers: ["public/new-home/**", "public/llms.txt", "src/app/layout.js", "src/app/new-direction/**", "src/components/IntegrationsComp/addToProduct/copy.js"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources:
  - https://viasocket.com/new-direction (founders' letter, LETTER_COPY in src/components/IntegrationsComp/addToProduct/copy.js)
  - https://viasocket.com/ (live homepage, fetched 2026-10-23)
  - Founder memory notes (Ankit Dongre): viasocket-repositioning-2026-10, viasocket-site-build, viasocket-website-repo-deploy, viasocket-homepage-version-b
  - Google Doc "AI Infastructure Layer" (1Itq2999YLNRZFBrBajPGYHeesave82Rc7sD7L9jMIG4), tabs "ankit's story", "one product, three panels" (Shreyas, 2026-10-07), Tab 8, Tab 11 (GTM strategy)
  - Google Doc "Use Cases" (10UUSE7dpBQR9u_CnIAn5Wj5S9UljWbX6JI_SP19mJCU)
  - Claude Doc "viaSocket Brand Guidelines" (https://claude.ai/code/artifact/f777c297-6960-4b5b-8ba2-6e77b1edeb8a, 2026-10-16)
  - Team answers to OPEN_QUESTIONS, 2026-10-22 (commit e5cc0bf; drafts in viasocket-pr-1841/docs/OPEN_QUESTIONS_ANSWERS.md)
  - docs/COMPETITORS.md
---
# Product Vision & Strategic Direction

This is the **product** vision: what viaSocket is, who it serves and where it is going. How the website says it (audiences, messages, claims, CTAs) is in [POSITIONING](POSITIONING.md). How it looks and sounds is in [DESIGN](DESIGN.md). How it is measured is in [MEASUREMENT](MEASUREMENT.md). Competitors are in [COMPETITORS](COMPETITORS.md). Campaigns are not covered here.

Labels: **Approved** = stated by the owner or shipped as a deliberate decision. **Proposed** = written down but not yet confirmed by the owner. **Unknown** = nobody has decided.

## Purpose

**Approved.** viaSocket is **the integration and action layer for applications and AI agents**. A builder adds viaSocket to the app or agent they already have, usually by pasting a setup prompt into a coding agent (Cursor, Claude Code, Codex). viaSocket then handles the connections to other apps and the actions taken in them.

The boundary is fixed: **"You build the app or agent. viaSocket handles the connections and actions."** The builder keeps the interface, the application logic, the hosting and the choice of AI. viaSocket keeps the connections, authenticated actions and events. viaSocket never runs or hosts the builder's app.

The owner's test for every line: *"If someone is making a notetaker app, why do they need viaSocket?"* Only when the app has to work with other tools.

The founders' letter at `/new-direction` (Pushpendra Agrawal and Ravi Paliwal) states the shift: builders bring viaSocket into their own software instead of building workflows in viaSocket's editor. The workflow engine and the integrations still matter underneath.

## Problems solved

**Approved** (homepage "What viaSocket handles" table and FAQ, which are built from the skill at flow.viasocket.com/documentation/skill.md). <!-- verify:ignore -->

| Building it yourself | What viaSocket handles |
|---|---|
| An OAuth app, consent flow and token refresh for every service | Managed auth on each app's own consent screen; tokens stored encrypted and refreshed |
| A data mapping per app | Managed mapping across APIs and data formats |
| Keeping each end user's connections apart | Multi-tenant connections and permissions |
| Connect screens built from scratch | A prebuilt connect flow, or your own UI and branding |
| Digging through logs when an action fails | Monitoring: debug and manage every action |
| Public webhook endpoints and polling | Event subscriptions with sandboxed handlers; polling and retries handled |
| An agent that needs tools | Every action has an input schema an agent can call |

The homepage table also lists server localization, real-time latency and Slack support. Those three are **Unverified** claims ([claim register](POSITIONING.md#claim-register)).

## Target Audience & Ideal Customer Profile (ICP)

**Approved basis:** the homepage visitor's mindset is *"I'm building something"*, not *"I'm a business owner looking for automation"* (strategy doc, Tab 8; repositioning brief 2026-10-10). Agents lead every use-case list; apps are included.

**Proposed** (P-02, Ankit to confirm):

| Priority | Who | Their situation |
|---|---|---|
| Primary | Developers and founders building a SaaS product or an AI agent | Their users must connect other apps. They are solution-aware and comparing ways to get integrations |
| Second | Agencies building software for clients | Same need, repeated per client |
| Traffic reality | Paid-ads visitors | A large share of traffic. The homepage added Chat, Talk to an expert and Book a demo for them (2026-10-19) |

A separate strategy draft (Tab 11, author not named) proposes narrowing further to **AI SaaS and agent startups, seed to Series B**, with B2B SaaS second. **Proposed**, not approved.

Not the target: an SMB owner who wants automation done for them. That may be served later by a separate first-party product (letter; Tab 8).

## Principles

1. **Boundary first.** Say what viaSocket handles and what the builder keeps. Never "runs", "hosts" or "powers" the app.
2. **Plain over jargon.** "Your AI builds the UI, viaSocket handles the backend" before "action layer" or "infrastructure".
3. **Show, don't list.** Product-led visuals: an app like yours with the connected app's own consent screen.
4. **Honest.** No invented metrics, prices, customer logos or testimonials. "What people are building" only with real customers.
5. **Agents first, apps included, one product.**
6. **Setup through the builder's own coding agent.** The skill and the setup prompt are how a builder "gives" viaSocket to their AI. This is a strength, but no longer unique ([COMPETITORS](COMPETITORS.md)).

## Long-term direction

- **Approved** (Shreyas, "one product, three panels", 2026-10-07, decided calls): infrastructure leads. One product and one login with three panels: Infra (the SDK and action layer), Automation (today's product) and MCP (connect apps, use them inside Claude, ChatGPT or Cursor). The homepage leads with Infra. Mushrooms and the tailored-systems product are out of scope.
- **Approved** (letter): a delegation-style product for businesses is in the works and is not part of this launch.
- **Proposed** (Tab 8): an executable, readable artifact for what an AI builds ("Starts when … Then … Connected … Status"), and "Connect → Test → Deploy → Run → Observe → Repair". Tab 8's line "AI creates. viaSocket connects, acts and runs." is **superseded** by the boundary line; do not use "runs".
- **Unknown:** panel names, and how the website points to the Automation and MCP panels.

## Strategic Priorities & Success Measures

Priorities, in order (**Approved** by what shipped in October 2026):
1. One integration-layer story across the site ([ADR-015](DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning)).
2. Turn visitors, including paid-ads traffic, into builders who copy the setup prompt or start free.
3. Keep attribution correct so conversions can be judged.

Success measures (definitions and instrumentation in [MEASUREMENT](MEASUREMENT.md)):

| Measure | Status | Note |
|---|---|---|
| Setup-prompt copies | **Proposed** (P-02) | Not instrumented as an event today |
| "Start free" signups at flow.viasocket.com | **Proposed** (P-02) | Start free carries no `utm_source` (T-04) |
| Demo bookings and chat starts from ad traffic | **Proposed** (P-02) | Happen on cal.id and the gtwy chatbot, outside this site |
| Activation: first successful action by a signed-up builder | **Proposed** (Tab 11) | Lives in the product, not here |

No targets are approved. Never present a target as a forecast.

## Boundaries & Non-Goals

- Not the product app: no login beyond the signup handoff, no user data, no workflow building.
- Not the help centre, the old blog at `/blog`, Mushrooms or Discovery. Those are other deployments.
- Not a workflow-automation, Zapier-alternative, AI-employee or internal-app-builder story on the lead pages (Tab 8; [ADR-015](DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning)). Older campaign pages that still say so are out of date.
- Not a home for invented proof.

## What This Site Is vs. What the Product Is

| Concern | Here? | Where it lives |
|---|---|---|
| Positioning, landing, pricing, campaign and SEO pages | Yes | `src/app/**`; the homepage is generated into `public/new-home/` from `viasocket-site` |
| Programmatic page content and most metadata | Rendering only | table-api, the plug service, and the viasocket-admin panel ([CONTRACTS](CONTRACTS.md)) |
| Signup, login, the product, the skill | No | flow.viasocket.com |
| MCP product | A few landing pages | mushrooms.viasocket.com |
| Help centre, `/blog`, `/discovery`, `/community` | No | Other deployments ([OPEN_QUESTIONS P-05](OPEN_QUESTIONS.md#p-05-paths-served-by-other-deployments)) |

## Approved sources

In order of authority: the owner (Ankit Dongre) in conversation and his memory notes; the founders' letter at `/new-direction`; the "one product, three panels" decided calls; the Brand Guidelines doc; the live homepage. The Use Cases doc is the approved list of 14 use cases in 7 groups (shipped on `/use-cases`). Tab 11 (GTM) and the OPEN_QUESTIONS drafts are proposals.

## Unresolved strategic questions

Tracked in [OPEN_QUESTIONS](OPEN_QUESTIONS.md): the ICP and metrics (P-02), the app count (P-04), and who owns viasocket-admin (P-07). Also open: whether paid ads should keep driving traffic before conversion data exists (Tab 11 advises against broad paid ads; the site currently gets much paid traffic), how the site should introduce the Automation and MCP panels, and what differentiates viaSocket now that prompt-based setup is common ([COMPETITORS](COMPETITORS.md)).
