---
covers: ["src/app/pricing/**", "src/app/lib/pricing-data.js", "src/components/pricing/**"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Module: Pricing (`/pricing`)

The workflow-automation pricing page: the Free, Team and Premium plans, priced in tasks and AI credits. The Embed / integration-layer pricing page with the overage slider and ticker is `/developers/pricing`, owned by [module 04](./04-developers-embed.md).

## Purpose
- Answers "what does viaSocket automation cost, and what do I get free?" with plan cards (monthly or annual), perks, a comparison, reviews and FAQs.

> [!WARNING]
> **Two pricing pages with different plans.** `/pricing` sells Free / Team ($27 a month, $18 billed annually) / Premium ($99 / $67) in tasks and AI credits (`src/components/pricing/PricingPlans.js` `plans`). `/developers/pricing` sells Free / Growth / Scale. The homepage nav and the `addToProduct` header link **only** `/developers/pricing` (`src/components/IntegrationsComp/addToProduct/copy.js:NAV`). The legacy navbar (`src/app/components/navbar/NavbarOptimized.js`), `NewHeader` and `NewFooter` link `/pricing`. Which is canonical is open ([OPEN_QUESTIONS P-03](../OPEN_QUESTIONS.md#active-questions-table), positioning [P-01](../OPEN_QUESTIONS.md#active-questions-table)). Do not change prices in one page and assume the other follows.

---

## Business Value
- The page converts visitors to a free signup: every plan CTA, the hero and the final CTA go to `/signup`. Team and Premium cards say "Upgrade Plan" but also go to `/signup`, so checkout happens in the product, not here (*observed*).
- The sales path is the agency line under the plans ("Agency plan: $250/mo…", "Talk to us" → cal.id `/team/viasocket/sales-team`). The agency partner programme itself is `/agency-partner` ([module 09](./09-lead-and-support-forms.md)).

---

## Navigation Flow
1. Visitors arrive from the legacy navbar's "Pricing" (badge "free forever"), `NewFooter`, or search. `src/app/sitemap.js` lists `/pricing`.
2. They toggle monthly or annual (annual is the default), read the plans, perks and comparison, and open the FAQs.
3. They leave to `/signup` (hero `pricing_hero_signup`, plans `pricing_plan_*`, `pricing_final_cta`) or to cal.id. The signup journey itself is [FLOWS journey 1](../FLOWS.md#detailed-journey-landing-utm-capture-and-signup).

> [!WARNING]
> Pricing CTAs link to a bare `/signup` and never call `savePageUtmSource`. A visitor with no `utmData` cookie therefore reaches MSG91 with `setUtmSource`'s fallback source `'index'`, not `/pricing` (`src/utils/handleUtmSource.js:setUtmSource`). This conflicts with the "utm_source is the page path" rule ([DECISIONS ADR-012](../DECISIONS.md#adr-012-utm-attribution-conventions)).

---

## Screens
### 1. Pricing (`src/app/pricing/page.js:PricingPage`)
Sections in order, with the data source of each:

| Section | Component | Data |
|---|---|---|
| Navbar | `NavbarServer` (`utm={'/pricing'}`) inside `ConditionalNavbar` | navbar rows; `prod` cookie |
| Hero | `src/components/pricing/PricingHeroSection.js` (+ `LogoMarquee`) | `appCount` → `${appCount + 300}+`, or the fallback `'2300+'` |
| Plans | `src/components/pricing/PricingPlans.js:PricingPlans` | constants `plans`, `ALLOWANCE_NOTE` |
| Perks | `src/components/pricing/PerkGrid.js` | constants (no lock-in, fair usage, PPP pricing, 3x for impact orgs, top-up bonus, expert help) |
| Comparison | `src/components/pricing/ExperienceComparison.js` | constants |
| Reviews | `ReviewIframeOptimized` (`variant="pricing"`) | review rows |
| Final CTA | `src/components/pricing/FinalCTA.js` | constants |
| FAQ | `FAQSection` (`faqName="/pricing"`) | FAQ rows under `/pricing`; rendered only when non-empty |
| Badges, security | `ShowBadges`, `SecuritySection` | constants |
| Footer | `Footer` inside `ConditionalFooter` | footer rows |

- Metadata comes from table-api meta `/pricing`, with the fallback "Pricing - viaSocket".

---

## UI Components
- Feature-specific: everything in `src/components/pricing/`, all `'use client'`. `logo-marquee.scss` styles `LogoMarquee`.
- Shared (older tree): `NavbarServer`, `FAQSection`, `Footer`, `MetaHeadComp`, `ReviewIframeOptimized`, `ShowBadges`, `SecuritySection`. See the [DESIGN catalog](../DESIGN.md#reusable-component-catalog). The styling is daisyUI and Tailwind (`btn btn-accent`, `h2`).
- CTAs carry `data-track*` attributes; their names are an analytics contract ([CONTRACTS](../CONTRACTS.md#analytics--telemetry-event-contracts)).

---

## Data Dependencies
1. **Loader:** `src/app/lib/pricing-data.js:getPricingPageData`. It is the reference example of the one-loader-per-page rule ([ARCHITECTURE](../ARCHITECTURE.md#major-modules--responsibilities)). It runs eight requests in `Promise.all`:
   - `getMetaData('/pricing')`
   - `getFooterData`, `getNavbarData`
   - `getFaqData('/pricing')`
   - `src/utils/getData.js:getPricingFeatureData` (`PRICINGFEATURE`)
   - `src/utils/getCountries.js` (two `COUNTRIES` pages)
   - `src/utils/axiosCalls.js:getAppCount` (plug service)
   - `getReviewSectionData`
2. **Unused fetches:** the page never reads `features` or `countries`, so three table-api requests per render are wasted (*observed*: `PricingPage` destructures neither).
3. Tables are in [database/entities](../database/entities.md); systems are in [table-api](../current-infrastructure/table-api.md) and [plug-service](../current-infrastructure/plug-service.md).

---

## State Management
- **Server state:** the loader result per request, plus `src/app/lib/getAuth.js:getHasToken` (the `prod` cookie) passed to the hero.
- **Client state:** `isAnnual` in `PricingPlans` (`useState(true)`). Nothing is persisted.

---

## API Dependencies
- None of the site's own routes. Outbound links only: `/signup` and cal.id.

---

## Loading / Empty / Error States
- **Loading:** only `AppProvider`'s navigation skeleton.
- **Empty:** the FAQ is hidden when there are no rows; the hero falls back to "2300+" when `appCount` is 0.
- **Error:** the loader catches and returns empty defaults, so the page always renders, with table-driven sections missing. Each getter reports through `sendErrorMessage` ([FLOWS](../FLOWS.md#cross-cutting-failure-handling)).

---

## Development Tasks (Next Phases)
- [ ] Decide which pricing page is canonical ([OPEN_QUESTIONS P-03](../OPEN_QUESTIONS.md#active-questions-table)) and which app count to show ([P-04](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Decide whether the pricing CTAs should stamp `utm_source=/pricing`, and whether to drop the unused `features` and `countries` fetches (new questions in M2 notes).
