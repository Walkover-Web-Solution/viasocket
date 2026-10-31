---
covers: ["src/app/developers/**", "src/app/embed/**", "src/app/components/embed/**", "src/app/setup-prompt/**"]
verified_at: 1ae1f9ab
verified_on: 2026-10-29
---
# Module: Developers (Embed)

## Purpose

- **`/developers`, `/developers/auth`, `/developers/pricing`, `/developers/docs`** are a self-contained sub-app that sells viaSocket as "the action layer for AI products" to developers. Its primary action copies a setup prompt for the visitor's coding agent.
- **`/setup-prompt`** is the page viaSocket SDK emails link to. It is not part of the developers sub-app chrome. It copies a keys prompt (`for=keys`) or a first-run prompt (`for=run`) and makes no API call.
- **`/embed/actions-for-ai`, `/embed/actions-via-webhook`, `/embed/app-integration`** are older legacy-design Embed landing pages. They are still routable and listed in `src/app/sitemap.js`.
- **Bare `/embed`** is a 301 to `/` on production and test (admin redirect list, checked 2026-10-29), with an empty body. It is not an alias of `/developers`, and the response has no document to carry `rel=canonical`. The homepage it lands on canonicalises to the site root. `src/data/redirects.json` still says 308 to `/developers` for when the admin cannot be reached. Either way `src/app/embed/page.js` (`EmbedContent`) does not render. Bare `/developers` is also a 301 to `/` in the live list, so the two URLs are not two copies of one page. `/developers/auth` and `/developers/docs` still return 200.

---

## Business Value

- The page titles ("viaSocket — The action layer for AI products", "Managed auth · viaSocket", "Pricing · viaSocket", "Integrations Quickstart · viaSocket") and `src/app/developers/skill.js:SKILL` target developers who integrate through a coding agent.
- `/developers/pricing` 301s to `/pricing` in the live admin list. Which pricing page should be canonical is still [OPEN_QUESTIONS P-03](../OPEN_QUESTIONS.md).
- Commit `d0dff32c` ("Rebuild /developers landing page as native Next.js/Tailwind, drop static HTML") moved `/developers` off static HTML. The site-wide design target is now the static homepage's system (U-01, decided; [DECISIONS ADR-016](../DECISIONS.md#adr-016-the-static-homepages-design-system-is-the-site-wide-target)).

> [!TODO]
> Not stated: how Embed signups are counted, or whether the `/embed/*` subpages are meant to stay. Bare `/embed` now 301s to `/`, not to `/developers` ([OPEN_QUESTIONS P-06](../OPEN_QUESTIONS.md)).

---

## Navigation Flow
1. Visitors arrive from search, or from a link to `/developers/pricing` (live admin list 301s that to `/pricing`) or `/embed` (live admin list 301s that to `/`).
2. They copy the setup prompt (`CopyPromptButton`), read auth, pricing or docs, and toggle monthly or yearly pricing.
3. Next stops: the header "Signup" link (flow.viasocket.com/integrations, untagged), plan CTAs (`/developers#start`), or cal.id for Enterprise and "Talk to sales". The `/embed/*` CTAs go to `https://viasocket.com/signup?utm_source=/embed/...`.

The journey and its footguns are in [FLOWS: Developers (Embed) funnel](../FLOWS.md#detailed-journey-developers-embed-funnel).

---

## Screens
### 1. Landing (`/developers` → `src/app/developers/page.js`)
`Header`, `Hero` (`CopyPromptButton` and animated app/agent strip), `OneAction`, `Trap`, `Expertise`, `Turn`, `Proof`, `Production`, `UseCases`, `Start` (`#start`, `CopyPromptButton`), `Faq` and `Footer`. All copy is constants in each file.

### 2. Managed auth (`/developers/auth` → `src/app/developers/auth/page.js`)
`AuthHero` (a simulated consent popup and `CopyPromptButton`), then `Scene` blocks with `Dash` (`DASH_ROWS`), `StepsGrid` (`HANDLED_STEPS`, `WRONG_STEPS`), `TenantTree`, `TrustPanel`, `CompareTable`, `AiRun` and `Faq`. The step arrays are defined in `page.js`.

### 3. Pricing (`/developers/pricing` → `src/app/developers/pricing/page.js`)
`PricingTop` (plans Free $0, Growth $29, Scale $99, Enterprise Custom; monthly/yearly toggle; overage ticker), `Ladder`, `CompareRows`, `FastValues`, `EnterpriseCta` (cal.id) and `Faq` with `PRICING_FAQS`. There is no checkout in this repo.

### 4. Docs (`/developers/docs` → `src/app/developers/docs/page.js`, layout `src/app/developers/docs/layout.js`)
A static quickstart (Slack example): `LangProvider`, `Header`, `Toc`, `Callout`, `Endpoint`, `ClickSteps`, `DocTable`, `StepH2`, `CodeBlock` and `LangBlock`. It has no footer. It documents the public product API for readers. It is **not** an API this site calls ([CONTRACTS: Published Contracts](../CONTRACTS.md#published-contracts-developer-docs-page)).

### 5. SDK setup prompt (`/setup-prompt` → `src/app/setup-prompt/page.js`)
A static edge page with one centered card and no site header, footer, chat button or login. `SetupPrompt.js` reads `for`, `org`, `project` and `name` from the query in the browser (`prompt.js`). Invalid `org` or `project` is ignored. The card shows the first two prompt lines; "Copy prompt" copies the whole prompt (`navigator.clipboard`, then a textarea that exists only for that attempt). Robots meta is `noindex, nofollow, noarchive`, with a separate `googlebot` meta of `noindex, nofollow`, and the response sends `X-Robots-Tag: noindex, nofollow`. Not in `src/app/sitemap.js`, not linked from any other page, and not `Disallow`ed in robots.txt. Visit tracking, Zaraz, GTM, the chatbot, the Reddit pixel and the signals script do not run here, and the Reddit page-visit payload omits the query.

### 6. Embed subpages (`/embed/<slug>` → `src/app/embed/<slug>/page.js`)
All three pages use the legacy chrome (`NavbarServer`, `Footer`, `RedditPixel`, `MetaHeadComp`) and share `EmbedPricing`, `RelatedEmbeds`, `ShowBadges`, `SecuritySection`, `BlogGrid` and `FaqSection`.
- `actions-for-ai`: `HeroAurora`, `EmbedImageSelector`, `UseCaseSection`, `EmbedSetupSteps`, `AIComparisonTable`, `HowFlowBecomesAiTool`, `DarkCta`.
- `actions-via-webhook`: `WebhookHero`, `WebhookFeatureHighlights`, `WebhookUseCase`, `WebhookSetup`, `HowWebhookBecomes`, and the `actions-for-ai` `DarkCta`.
- `app-integration`: `HeroAurora`, `WhyFeatures`, `UseCaseSection`, `EmbedSetup`, `ComparisonTable`, `HowAppIntegrationBecomes`, `DarkCta`.

---

## UI Components

The developers primitives (`Header`/`Footer`, `Label`/`H2`/`Lead`/`Scene`, `Button`, `BrandIcon`, `CopyPromptButton`, `CodeBlock`) are in the [component catalog](../DESIGN.md#reusable-component-catalog). The tokens (`dev-*`, `docs-*`, Albert Sans / JetBrains Mono, `.dev-grid`) are in [DESIGN: /developers](../DESIGN.md#developers-dev--docs-).

> [!WARNING]
> Keep `src/app/developers/**` self-contained. It imports nothing through `@/` ([ARCHITECTURE: /developers Sub-App](../ARCHITECTURE.md#developers-sub-app)). It still runs inside the root layout, so `global.scss`, `AppProvider`, the chatbot and tracking apply. `src/app/developers/layout.js` adds the `dev-grid font-dev-sans bg-dev-bg text-dev-ink` wrapper.

---

## Data Dependencies
1. **`/developers/**` and `/setup-prompt`:** none. These are static server components (`runtime = 'edge'`) with copy constants and no loader. `/setup-prompt` does not read `org` or `project` on the server.
2. **`/embed/*`:** `src/app/lib/data.js:getEmbedPageData(slug)`. Table-api ([table-api](../current-infrastructure/table-api.md), [entities](../database/entities.md)) supplies `getMetaData('/embed/<slug>')`, `getFooterData`, `getNavbarData`, `getFaqData`, `src/utils/getData.js:getEmbedData` and `getBlogData({ tag1: 'embed' })`. The plug service ([plug-service](../current-infrastructure/plug-service.md)) supplies `getAppCount`. The loader's comparison table and "how it works" steps are static. Each page also calls `getFaqData('/embed/<slug>', '')` separately.

---

## State Management
- **Server state:** none on `/developers`. On `/embed/*`, it is per request through the loader.
- **Client state:** local `useState` only: `PricingTop` `period` (`'m'`/`'y'`) and the overage slider, the `Hero`/`AuthHero` animation indices, and the `Start` copied flag. `src/app/developers/docs/LangContext.js` holds the code-sample language. `useReveal.js` drives scroll reveals.

---

## API Dependencies
- Global view and click tracking through `/api/track-variant` ([../api/track-variant.md](../api/track-variant.md)), and the Reddit pixel on `/embed/*`.
- No product API calls. The URLs on `/developers/docs` (flow-api.viasocket.com, flow.sokt.io) are documentation, not calls.

---

## Loading / Empty / Error States
- **Loading:** none (static content). The animations respect `prefers-reduced-motion` where implemented.
- **Empty:** on `/embed/*`, FAQ and blog sections render only when their data exists.
- **Error:** no route-specific handling. A loader failure falls back to the default metadata titles in each `generateMetadata`.

> [!WARNING]
> - `CopyPromptButton` shows "Paste in your agent" even when `navigator.clipboard.writeText` throws ([FLOWS](../FLOWS.md#detailed-journey-developers-embed-funnel)).
> - The header "Signup" carries no `utm_source` or `state`, so Embed signups from it are unattributed.
> - The `/embed/*` CTAs are absolute production URLs, and several on `app-integration` and `actions-via-webhook` are tagged `/embed/actions-for-ai` ([OPEN_QUESTIONS T-08](../OPEN_QUESTIONS.md)).

---

## Development Tasks (Open Items)
- [ ] Fix or confirm the `/embed/actions-for-ai` tags on other pages ([OPEN_QUESTIONS T-08](../OPEN_QUESTIONS.md)).
- [ ] Decide which pricing page is canonical ([OPEN_QUESTIONS P-03](../OPEN_QUESTIONS.md)).
- [ ] Decide whether the `/developers` header "Signup" should tag its source ([OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md) covers the same gap for `SiteHeader`).
- [ ] Decide the fate of the unreachable `src/app/embed/page.js` and `src/app/components/embed/EmbedContent.js` (new question; see the TODO under Business Value).
