---
status: approved
owner: Ankit Dongre
covers: ["public/new-home/index.html", "public/llms.txt", "src/app/layout.js", "src/components/IntegrationsComp/addToProduct/copy.js", "src/app/**/page.js"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources:
  - https://viasocket.com/, /features, /use-cases, /integrations, /pricing, /pass, /new-direction, /embed/app-integration, /embed/actions-for-ai, /mcp/aiagent, /migration/zapier, /lifetime-deal, /help/security-and-compliance, /llms.txt (all fetched with curl on 2026-10-23)
  - Founder memory note viasocket-repositioning-2026-10 (brief of 2026-10-10)
  - Claude Doc "viaSocket Brand Guidelines" (https://claude.ai/code/artifact/f777c297-6960-4b5b-8ba2-6e77b1edeb8a)
  - Google Doc "AI Infastructure Layer" (1Itq2999YLNRZFBrBajPGYHeesave82Rc7sD7L9jMIG4), Tab 11 GTM strategy
  - Google Doc "Use Cases" (10UUSE7dpBQR9u_CnIAn5Wj5S9UljWbX6JI_SP19mJCU)
  - viasocket-site/seo-audit-homepage-2026-10-13.md (facts to confirm)
  - flow.viasocket.com/documentation/skill.md (the source for homepage FAQ facts)
  - docs/COMPETITORS.md (competitor research, 2026-10-23)
  - commits 304bf6d, aa290ba (pricing), 75d86c9 (What viaSocket handles)
---
# Positioning

How the website explains viaSocket. Product direction is in [VISION](VISION.md); voice and banned words are in [DESIGN](DESIGN.md#voice-and-terminology); competitors are in [COMPETITORS](COMPETITORS.md). Labels: **Approved**, **Proposed**, **Unknown**.

## Category and core promise

**Approved.**

| Element | Text (use as is) |
|---|---|
| What viaSocket is | The integration and action layer for applications and AI agents |
| Category line (homepage H1 pattern, footer) | Integration Layer for your products & agents. The H1 rotates the noun: AI agent / CRM / support desk / recruiting app |
| Boundary line | You build the app or agent. viaSocket handles the connections and actions. |
| How you start | Copy the setup prompt and paste it into Cursor, Claude Code or Codex |

Use "integration layer" as the category. "Action layer" is an older name (still in old `/developers` copy and the Pass page). "Infrastructure" only describes what the builder would otherwise build. Never "workflow automation tool", "iPaaS", "AI employee" or "business operating system" on lead pages.

## Audiences and buying situations

| Audience | Buying situation | Status |
|---|---|---|
| Developer or founder building an AI agent | The agent must act in users' apps (Slack, Gmail, CRM) and needs tools, auth and per-user connections | **Approved** as the lead (agents first) |
| Developer or founder building a SaaS product | Customers ask for integrations; an integrations page, sync or an in-app automation builder is on the roadmap | **Approved** (apps included) |
| Agency building for clients | The same need across many client builds | **Proposed** second ICP (P-02) |
| Paid-ads visitor | Arrives cold from an ad, may not code, wants to talk to someone | **Approved** as a reality to serve (Chat, Talk to an expert, Book a demo added 2026-10-19) |
| Internal-tools builder | Connects company systems and internal APIs | **Approved** use case (Use Cases doc, group 6), not a lead audience |

The 14 approved use cases in 7 groups (AI agent integrations; AI assistants and chatbots; SaaS and API integrations; embedded app marketplace; embedded automation builder; internal tools and dashboards; browser-based automation) are shipped on `/use-cases`. The homepage shows 8 examples (4 agents, 3 apps, 1 internal tool).

## Alternatives

Buyers compare viaSocket with building in-house, unified APIs, embedded iPaaS and agent-tool platforms. Named competitors, their positioning and evidence are in [COMPETITORS](COMPETITORS.md); do not restate competitor claims here.

The approved comparison line (homepage FAQ): a unified API maps one category onto a shared model; viaSocket keeps every app's full set of actions and handles the mapping, and its prebuilt screens cover what an embedded iPaaS does.

## Differentiators and reasons to believe

| Differentiator | Reason to believe | Status |
|---|---|---|
| Setup through the builder's own coding agent (one prompt, the viaSocket skill) | The live setup prompt; skill.md | **Approved**, documented. **No longer unique**: competitors offer prompt or skill setup too ([COMPETITORS](COMPETITORS.md)). Don't call it unique or first |
| Each app's full set of actions, not one category | Homepage FAQ | **Approved**, documented |
| No OAuth apps, client secrets or token database to own | Homepage FAQ (skill.md) | **Approved**, documented |
| Users consent on the app's own screen | Homepage hero scenes and FAQ | **Approved**, documented |
| Actions double as agent tools (input schemas) | Homepage FAQ | **Approved**, documented |
| Events without a public webhook endpoint (sandboxed handlers) | Homepage FAQ | **Approved**, documented |
| Custom connectors (Plug Builder) and embeddable screens | Homepage FAQ | **Approved**, documented |
| Breadth: 2,300+ apps | Owner's figure; see claim register | **Conflicting** across pages |

Missing proof (do not invent): customer logos, named testimonials, case studies with numbers, any security certification.

## Objections

| Objection | Current answer on the site | Gap |
|---|---|---|
| "I can build integrations myself." | The "Building it yourself / With viaSocket" table | No cost or time figure (none confirmed) |
| "Is it secure?" | Trust line and "Security details" link to `/help/security-and-compliance` | The help page says there are no third-party audits yet, while legacy pages claim SOC 2 Type II and ISO (P-09) |
| "Does it support my app?" | `/integrations` directory, request an integration, Plug Builder | App count conflicts |
| "What does it cost?" | `/pricing` (Free plan, launch prices) | Prices not confirmed; `/embed/*` tables say "then $99/mo"; Pass page has placeholder rates |
| "Who else uses it?" | Nothing | No approved proof yet |

## Offer

- **Current implementation** (`/pricing`, live 2026-10-23, commit `aa290ba`): Free $0 with 100K tasks and 1,000 AI credits a month; Pro $19/mo and Business $99/mo marked "Launch price"; Enterprise custom; annual = 2 months free. Owner approval of these prices is **Unknown**: treat them as shipped copy, not as numbers to reuse elsewhere.
- **Current implementation** (`/pass`, live): a prepaid "viaSocket Pass". Several rates read "To be set" ([OPEN_QUESTIONS P-08](OPEN_QUESTIONS.md)).
- Low-friction offer on every page: "Start free" (flow.viasocket.com/integrations) and "Copy setup prompt".

## Message hierarchy

1. Category: Integration Layer for your products & agents.
2. Boundary: You build the app or agent. viaSocket handles the connections and actions.
3. How: one setup prompt in your coding agent.
4. Proof by demonstration: an app like yours asking to connect Slack or Gmail on the app's own consent screen.
5. What viaSocket handles (the nine-row table).
6. Breadth and fit: use cases, sample prompts, the integrations directory.
7. Doubt removal: FAQ, security details, pricing.

**Proposed** (Tab 11): separate AI-product and SaaS landing pages under the same umbrella ("Give your AI agents the ability to act." / "Take integrations off your engineering roadmap."). Not approved.

## Audience-specific CTAs

| Audience | Primary CTA | Secondary | Status |
|---|---|---|---|
| Builder with a coding agent | Copy setup prompt | Start free | **Approved** (homepage) |
| Paid-ads visitor | Talk to an expert (`/experts-are-live`) | Book a demo (cal.id), Chat (gtwy bot) | **Approved** (homepage, 2026-10-19) |
| Pricing evaluator | Start free / Start with Pro | Talk to us (Enterprise) | Current implementation |
| Returning user | Log in | n/a | Current implementation |

## Claim register

Checked on 2026-10-23 against live pages with curl. **Verified** = backed by a source named here. **Unverified** = no evidence in hand. **Conflicting** = different values on different pages, or a page contradicts another. Owner `marketing` is unassigned by name.

| Claim | Where used | Evidence / source | Status | Owner |
|---|---|---|---|---|
| "2,300+ apps / integrations" | `/` (9×), `/features`, `/integrations`, `/pricing`, `/new-direction`, `/mcp/aiagent`, `/automations`, `src/` hardcodes (~14 files) | Owner's figure; catalog pages pass 6,000 (site-build notes) | **Conflicting** (see next rows) | marketing (P-04) |
| "2,200+" / "2400+" apps | `/embed/app-integration`, `/lifetime-deal` | none | **Conflicting** | marketing |
| "1,929+ Apps" | `/mcp/aiagent`, `/mcp/saas` titles | likely a live MCP count | **Conflicting** | marketing |
| "1,500+" / "1,000+" / "9,000+" / "130+" apps | `/migration/zapier`, `/lifetime-deal`, `/automations`, `/embed/app-integration` | none | **Conflicting** | marketing |
| "5,000+ apps" | `/integrations` (a description in the page payload) | none | **Conflicting** | marketing |
| "1000+ app integrations" | `public/llms.txt` | none | **Conflicting** | marketing |
| "50+ AI models" | `/` hero strip, `/features` (AI Agents tile) | Owner's figure; not in skill.md | **Unverified** | Ankit |
| "Browser" / Browser Actions | `/` hero strip, `/features`, `/use-cases` (Browser Agent) | In the approved Use Cases doc; not in skill.md | **Unverified** capability | Ankit / product |
| Server localization / Regional Deployment | `/` table, `/features` | From the old `/embed` capability list | **Unverified** | product |
| Real-time latency / low-latency execution | `/` table, `/features` | From the old `/embed` list | **Unverified** | product |
| Slack support | `/` table | From the old `/embed` list | **Unverified** | support |
| GDPR · CCPA | `/` trust line, `/embed/*`, `/migration/zapier` | none in hand | **Unverified** | legal |
| HTTPS behind Cloudflare, DDoS protection, web firewall | `/` trust line | Cloudflare serves the site (`cf-cache-status` headers); `/help/security-and-compliance` lists Cloudflare WAF | **Verified** (self-described on the help page) | engineering |
| SOC 2 Type II, ISO certified | `/embed/app-integration`, `/embed/actions-for-ai`, `/developers/auth`, `/migration/zapier`, `/lifetime-deal` | `/help/security-and-compliance` says "we have not yet implemented formal automated security testing or third-party audits" | **Conflicting** (the help page contradicts the badges) | legal (P-09) |
| 99.99% uptime | `/embed/*`, `/developers/auth`, `/migration/zapier` | none | **Unverified** | engineering |
| "10,000+ businesses", "200+ Teams" | `/embed/*`, `/lifetime-deal` | none | **Unverified** | marketing |
| "100x the Free Tasks" vs Zapier | `/migration/zapier` title | none | **Unverified** | marketing |
| Competitor cells in comparison tables (prices, features of other tools) | `/embed/app-integration`, `/embed/actions-for-ai`, `/migration/*` | No source cited ([COMPETITORS](COMPETITORS.md)) | **Unverified** | marketing |
| viaSocket price in comparison tables: "Start Free, then $99/mo" / "Free, then $99/mo" | `/embed/app-integration`, `/embed/actions-for-ai` | `/pricing` shows Pro at $19/mo (launch) and Business at $99/mo | **Conflicting** | Ankit (P-08) |
| Column labels of the `/embed/actions-for-ai` comparison table | `/embed/actions-for-ai` | Columns are mislabelled ([COMPETITORS](COMPETITORS.md)) | **Conflicting** (wrong as published) | marketing |
| "Paste a prompt" setup as a differentiator | `/`, `/features`, `/use-cases` | Competitors now offer prompt or skill setup ([COMPETITORS](COMPETITORS.md)) | **Verified** as a feature; **not unique** | Ankit |
| No OAuth apps or token DB; consent on the app's own screen; actions have input schemas; sandboxed event handlers; Plug Builder; embeddable screens | `/` FAQ and JSON-LD | skill.md (FAQ answers were written only from it) | **Verified** (docs) | Ankit |
| Tokens stored encrypted and refreshed | `/` table | Developer docs (site-build notes) | **Verified** (docs); re-check on change | product |
| Free plan $0: 100K tasks, 1,000 AI credits | `/pricing`, blog popup, JSON-LD `price: 0` | commit `aa290ba` | Shipped; approval **Unknown** | Ankit |
| Pro $19 / Business $99 launch prices; 40% / up to 60% cheaper overage | `/pricing` | commit `aa290ba` | Shipped; approval **Unknown** | Ankit |
| "Every plan includes 100K calls and 50K trigger events" | `/pass` | Contradicts `/pricing` (100K tasks, where a task includes a delivered trigger event) | **Conflicting** | Ankit |
| Pass rates "To be set"; competitor subscription prices ($49/mo etc.) | `/pass` | Marked "Illustrative" | **Unverified** placeholders live in production | Ankit |
| Unlimited connected accounts, users, workflows and projects | `/pricing` | none | **Unverified** | Ankit |
| "Live in under 15 minutes" | old `/developers` hero (now redirected to `/`) | Owner's claim from 2026-09-24, never re-confirmed | **Unverified** | Ankit |
| Hotelator OS is a live app built on viaSocket | `/` use cases | Owner (Brand Guidelines) | **Verified** | Ankit |
| Capterra and G2 listings | `/` footer | Links to the real review pages | **Verified** | marketing |

## Inconsistencies found (2026-10-23)

| Topic | Says integration layer | Says something else |
|---|---|---|
| Category | `/`, `/features`, `/use-cases`, `/integrations`, `/integrations/{app}`, `/pricing`, `/blogs`, `/new-direction` | Root metadata in `src/app/layout.js` ("Connect your apps and automate workflows"); `public/llms.txt` ("AI-powered automation platform … no-code workflows"); `/embed/app-integration` ("Embedded iPaaS for SaaS"); `/embed/actions-for-ai` ("Embedded MCP for AI Agents"); `/lifetime-deal` ("AI Workflow Automation Tools"); app-pair pages ("Integrate HubSpot with Slack for automation"); `/automations`, `/departments`, `/experts`, `/workflow-automations` |
| Name of the layer | "Integration layer" | "Action layer" (old `/developers` metadata, Pass copy) |
| App count | 2,300+ | seven other figures (claim register) |
| Security | `/help/security-and-compliance`: no third-party audits yet | SOC 2 Type II / ISO badges on `/embed/*`, `/migration/zapier`, `/developers/auth`, `/lifetime-deal` |
| Price | `/pricing`: Pro $19, Business $99 | `/embed/*` tables: "then $99/mo" |
| Usage units | `/pricing`: tasks and AI credits | `/pass`: calls and trigger events with their own free amounts |
| Pricing entry | `/pricing` (header nav, `/developers/pricing` 301s here) | `llms.txt` describes "Subscription plans and lifetime free access program" |
| Title format | "X \| viaSocket" (`/`, `/integrations`, `/use-cases`) | "X · viaSocket" (`/pricing`, `/pass`, `/blogs`), "viaSocket Key Features \| Integration Layer", "Sign Up - viaSocket", no brand at all (`/automations`, `/departments`, `/features/variables`) |

Fix these only when the owning page is in scope, and only with the approved values. Root metadata and `llms.txt` are the biggest gaps because every Next page and every LLM crawler inherits them ([SEO](SEO.md)). The security and price contradictions are the riskiest: remove or correct them before more ad traffic reaches those pages.
