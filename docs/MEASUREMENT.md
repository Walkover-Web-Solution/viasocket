---
status: proposed
owner: unassigned (analytics); Ankit Dongre (success measures)
covers: ["public/new-home/index.html", "public/new-home/main.js", "public/new-home/assets/support.js", "src/middleware.js", "src/utils/trackVisitor.js", "src/utils/handleUtmSource.js", "src/utils/handleRedirection.js", "src/app/components/RedditPixel/**", "src/app/components/VariantTracker/**", "src/app/api/track-variant/**", "src/components/headComp/**", "src/components/IntegrationsComp/addToProduct/copy.js"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources:
  - docs/CONTRACTS.md (analytics events, cookies, third-party tags) and docs/FLOWS.md (UTM and signup journey)
  - docs/database/entities.md (A/B visitor table)
  - public/new-home/index.html and main.js (CTAs, GTM, copy handlers), src/middleware.js (Reddit CAPI), src/components/IntegrationsComp/addToProduct/copy.js (START_URL)
  - Team answers to OPEN_QUESTIONS 2026-10-22 (P-02, T-01, T-04, S-10)
  - Google Doc "AI Infastructure Layer", Tab 11 (activation events, proposed)
---
# Measurement

What the site is trying to cause, how each outcome is defined, what is instrumented today, and what is missing. Event payloads and schemas live in [CONTRACTS](CONTRACTS.md#analytics--telemetry-event-contracts) and [database/entities](database/entities.md); this doc does not repeat them.

Status: the **success measures are proposed** (P-02, Ankit to confirm). The instrumentation facts below are **current implementation**, checked in code at `dbc4292c`.

## Conversion journey

```
Visit (search, ads, referral)
  → CTA on a page
      ├─ Copy setup prompt  → builder pastes it into a coding agent → skill.md → signup/keys at flow.viasocket.com
      ├─ Start free         → flow.viasocket.com/integrations (signup)
      ├─ Talk to an expert  → /experts-are-live
      ├─ Book a demo        → cal.id/team/viasocket/workflow-setup-discussion
      └─ Chat               → gtwy support bot (data-chat)
  → Signup at flow.viasocket.com
  → Activation (product): first connection, first successful action
```

Legacy Next pages send signups to `/signup?utm_source=<path>` instead, which hands off through MSG91 with the `utmData` cookie ([FLOWS](FLOWS.md#detailed-journey-landing-utm-capture-and-signup)).

## Outcomes and signals

| Kind | Measure | Status |
|---|---|---|
| Primary outcome | Setup-prompt copies | Proposed |
| Primary outcome | "Start free" signups | Proposed |
| Primary outcome (ads traffic) | Demo bookings and chat starts | Proposed |
| Downstream outcome | Activation: a signed-up builder's first successful action | Proposed (Tab 11); measured in the product |
| Supporting signal | CTA clicks by page and section (`data-track`) | Instrumented on Next pages, but the write path is switched off |
| Supporting signal | Talk-to-expert clicks, pricing-page visits, integrations searches | Not instrumented as events |
| Supporting signal | Organic landings and queries | Search Console (access not documented here) |

## Metric definitions (Proposed)

None of these is computed anywhere today. Timezone and windows are proposals; confirm with the analytics owner.

| Metric | Source | Numerator / denominator | Window | Dedup |
|---|---|---|---|---|
| Prompt-copy rate | A GTM event on any `[data-copy]`, `[data-gcopy]` or prompt-card copy (needs adding) | Visitors with ≥1 copy / visitors with a page view | Daily and 7-day, UTC | One per visitor per day |
| Start-free click rate | GTM click event on links to `flow.viasocket.com/integrations` | Visitors with ≥1 click / visitors | Daily, UTC | One per visitor per day |
| Signups by source | flow.viasocket.com signup records with `utm_source` | Signups per `utm_source` / Start-free clicks from that page | 7-day, UTC | One per account |
| Demo bookings | cal.id bookings for the viaSocket team (outside this site) | Bookings / Book-a-demo clicks | Weekly | One per email |
| Chat starts | gtwy chatbot conversations (outside this site) | Conversations / chat opens | Weekly | One per visitor per day |
| Activation | Product event: first successful action per org | Activated orgs / signups | 14 days from signup | One per org |

## Current instrumentation

| Piece | Where it runs | What it records | Notes |
|---|---|---|---|
| Google Tag Manager `GTM-THTCRSLN` | `/` (added by the export script) and every Next page (`HeadComp`) | Whatever the container defines | Container contents and owners are not in the repo. The homepage pushes **no custom `dataLayer` events**: prompt copies are invisible unless GTM has click triggers |
| First-party visitor tracking (`/api/track-variant`, `data-track`) | Next pages only | `view`, `click`, `cta` rows in the A/B table | **Switched off** since `77b3dec5` (T-01). Rows would store IP and device details (S-10) |
| A/B visitor table | table-api | One row per visitor | Off; must filter on `environment` before any re-enable (T-02) |
| Reddit pixel | Next pages, production only | `PageVisit` | Not on `/` |
| Reddit Conversions API | `src/middleware.js`, production only | page visit with `rdt_cid` click id | Runs for `/` too, but only when a request reaches the origin; edge-cached copies of `/` send nothing. The call is not awaited (T-09) |
| Google Ads `AW-16852796533` | `/lifetime-deal`, `/migration/*` | conversion on success pages | `gtag_report_conversion` has no caller (T-12) |
| X pixel, Cloudflare Zaraz, cr-relay `signals` | Next pages | see [CONTRACTS](CONTRACTS.md#third-party-tags) | Not on `/` |

### UTM conventions

`utm_source` is the page's own path (`/integrations`); campaign pages keep their registered tag (for example `relay-switch-google-ads`); it appears once per signup URL; a typed prompt rides in the `utmData` cookie, never in a URL ([ADR-012](DECISIONS.md#adr-012-utm-attribution-conventions)). External attribution already in the cookie is not overwritten for a day.

## Attribution limitations

1. **The homepage bypasses the Next layout.** No `TrackingCookies`, `VariantTracker`, `utmData` capture, Reddit pixel or Zaraz on `/`; only GTM.
2. **"Start free" and "Log in" carry no `utm_source`** on `/` and on every homepage-design page (`START_URL` in `copy.js`). Incoming `utm_*` and `gclid` are not passed to flow.viasocket.com. Paid-ads signups from these pages cannot be tied to a page (T-04, proposed fix: `utm_source=<path>` plus pass-through, made in `viasocket-site` and exported).
3. **Setup-prompt copies leave the site.** The builder signs up later from their coding agent's flow, so a copy cannot be joined to a signup without a shared id.
4. **Demo and chat happen on third parties** (cal.id, gtwy). Only a click is visible here.
5. **The edge cache serves `/` without hitting the origin**, so anything server-side (Reddit CAPI, middleware) misses most homepage views.
6. **Test and production share the `visitor_id` cookie** on `.viasocket.com`; any read-back must filter on `environment`.

## Consent, privacy and retention

- No cookie-consent banner was found on `/` or the Next pages. Whether one is required for the traffic mix (EU visitors, ads pixels) is a legal question ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) P-10).
- The homepage claims GDPR and CCPA compliance; that claim is unverified ([claim register](POSITIONING.md#claim-register)).
- Never put personal data in URLs (S-03, S-06). Retention for the A/B table, GTM tags and third-party pixels is not documented.

## Freshness

- GTM and pixels report in their own tools with their own delays (unknown here).
- The A/B table would be near-real-time, but it is off.
- Signup and activation live in the product database; how often marketing can see them is unknown.

## Instrumentation gaps (in priority order)

1. Push a `dataLayer` event for every setup-prompt copy (hero, prompt cards, use-case pane, closing box, footer) with the page path and the section. Make the change in `viasocket-site` and export.
2. Add `utm_source=<path>` to "Start free" and "Log in" on the homepage-design pages and pass incoming `utm_*`/`gclid` through (T-04).
3. Events for "Talk to an expert", "Book a demo" and "Chat" clicks, so ads traffic can be judged.
4. A documented GTM container: owner, tags, triggers, consent mode.
5. A join from signup to activation that marketing can read, defined with the product team ([CONTRACTS](CONTRACTS.md#required--unavailable-backend-capabilities) is where the missing contract goes).
