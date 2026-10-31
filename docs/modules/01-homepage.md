---
covers: ["public/new-home/**", "public/home-b/**", "public/home-ab.js", "next.config.js", "src/app/page.js", "src/app/home/**", "src/app/front-page/**"]
verified_at: 3662e484
verified_on: 2026-10-31
---
# Module: Homepage (`/`)

## Purpose

`/` is the static site in `public/new-home/`: plain HTML, CSS and JS that pitch viaSocket as an "Integration Layer for your AI agent". The primary action is "Copy setup prompt". The visitor pastes it into Cursor, Claude Code or Codex.

> [!WARNING]
> `/` is **not** a Next.js page. `next.config.js` `rewrites().beforeFiles` maps `/` to `/new-home/index.html` before any app route runs, so the root layout, `AppProvider`, tracking and UTM capture never run here ([FLOWS](../FLOWS.md#cross-cutting-navigation-facts)). Never edit `src/app/page.js` for homepage work. Version B is the separate static page `public/home-b/index.html`, served at `/home-b` by a `beforeFiles` rewrite to `/home-b/index.html`. The split script is `public/home-ab.js`, referenced from the first script tag in `public/new-home/index.html`.

> [!WARNING]
> **The source of truth for `public/new-home/` is the `viasocket-site` repo** (`variants/simple-bento`), not this one. Changes are made there, exported with `deploy/export-to-viasocket-repo.py --prod`, and the export is pushed to `test` (D-03, C-01, team answers to OPEN_QUESTIONS, 2026-10-22). A hand edit to `public/new-home/*` here is overwritten by the next export unless the same change is made in `viasocket-site`. If a request needs a homepage change, say so and ask whether to change the source repo or patch the export. <!-- verify:ignore -->

---

## Business Value

- The static site has been the homepage since commit `1f911f58` ("New homepage: serve the static site at "/"", 2026-10-13). Commit `a8f48657` made it indexable with a canonical to viasocket.com.
- `d1d0be8a` ("chat, talk to an expert and book a demo for ad visitors") and the `public/new-home/assets/support.js` header comment ("most arrive from ads") show that paid-ad visitors are an intended audience. Inference: the page is meant to turn those visitors into setup-prompt copies, expert calls or demo bookings.

> [!TODO]
> Proposed metrics, not yet approved (P-02, Ankit to confirm): setup-prompt copies and "Start free" signups first, then demo bookings and chat starts from ad traffic ([VISION](../VISION.md#strategic-priorities--success-measures)).

---

## Navigation Flow
1. Visitors land on `/` directly (ads, search). Middleware also 307s `/home` to `/`.
2. On the page they copy the setup prompt (hero), filter and preview use cases, copy a sample prompt, read the features table and FAQ, or open the support chat.
3. Every link leaves the page as an absolute URL: `/features`, `/use-cases`, `/integrations`, `/developers/pricing` and `/experts-are-live` on viasocket.com, "Start free"/"Log in" on flow.viasocket.com/integrations, and cal.id for "Book a demo". The page has no `/signup` CTA and writes no `utmData` cookie ([FLOWS](../FLOWS.md#4-alternative-branches)).

---

## Screens
### 1. Homepage (`public/new-home/index.html`)

| Section (anchor) | Content | Behaviour (`public/new-home/main.js` unless noted) |
|---|---|---|
| `header.top` | Logo, nav (Features, Book a demo, Pricing, Log in), "Start free" | static links |
| `#hero` | H1 with a rotating word (`[data-rot]`), "Copy setup prompt" (`[data-copy]`), "Talk to an expert", app/browser/AI-model strip, `#hx-panel` consent-screen carousel | the carousel pauses on hover, on focus and when the tab is hidden |
| `#in-action` | Heading "See viaSocket in action." and a 16:9 product video (`#pv`) | Poster is the YouTube thumbnail (blurred) with a play button. The click swaps in a `youtube-nocookie.com` iframe (`autoplay=1&rel=0`). Nothing from YouTube's player loads before that click. The section fades in once on scroll unless motion is reduced or JS never runs |
| `#use-cases` | Tabs (All / Agents / Apps / Internal tools), example list `#ix-list`, preview `#pane` | `filter`, `ixShow`; the pane's "Copy prompt" copies the setup prompt without the ask line, then `What I want to build: ` plus that example's existing build sentence (`galPrompt`) |
| `#prompts` | Six sample-prompt buttons (`[data-pr]`) | copies the setup prompt without "Ask me what I want to build first.", then `What I want to build: ` plus the card's own sentence |
| `#features` | "What viaSocket handles": a nine-row yes/no table, Book a demo | static |
| `#faq` | Nine `<details>` items | static; the same Q&A is duplicated in the `FAQPage` JSON-LD in `<head>` |
| `footer.ft` | Link groups, socials, G2/Capterra badges | static |
| `.chat-fab` | Support chat button (`[data-chat]`, `href` /support) | `public/new-home/assets/support.js` opens the gtwy chat when it loaded, otherwise the link navigates |
| `#promptText` | Hidden (`sr-only`) setup-prompt text. Org and project ids are the placeholders `<your org_id>` and `<your project_id>`: this page has no visitor ids to inject. Angle brackets are escaped in the HTML so they survive as text | `PROMPT = $('#promptText').textContent`. Every `[data-copy]` button (hero, features close, footer) copies that text alone |

All content is hardcoded in the HTML and in `main.js` constants (`IC` app icons, `GAL` examples, `PR` prompts). The page fetches no content API. `#in-action` loads one YouTube thumbnail image, and the player iframe only after the visitor clicks play.

> [!WARNING]
> `#in-action` was added in this repo. The next export from `viasocket-site` (`variants/simple-bento`, `deploy/export-to-viasocket-repo.py --prod`) overwrites `public/new-home/` and will remove the section unless the same markup, CSS and script are added there first.

### 2. Dormant Next homepage (`src/app/page.js`, `src/app/home/page.js`, `src/app/front-page/**`)

> [!WARNING]
> **Do not edit these for homepage changes.** `src/app/page.js:HomePage` (A/B variants via `src/utils/getVariant.js:getVariant`, `IndexPageContent` for the front-page design) and `src/app/home/page.js` still build but never render, because of the rewrite and the `/home` redirect in `src/middleware.js`. They are kept on purpose as the rollback path (reverting merge `cfdae23e` on `main` restores the A/B homepage) and will be retired once the new homepage has run stably for a few weeks (C-01, decided for now; [DECISIONS ADR-008](../DECISIONS.md#adr-008-serve--from-the-static-site-in-publicnew-home)).

---

## UI Components

The homepage uses no React components. Its tokens (`:root` in `public/new-home/styles.css`, with dark mode via `prefers-color-scheme`) are documented in [DESIGN: Static homepage](../DESIGN.md#static-homepage-publicnew-homestylescss). The Next copies of its header, footer and prompt (`SiteChrome.js`, `src/components/IntegrationsComp/addToProduct/copy.js:BASE_PROMPT`) are listed in the [component catalog](../DESIGN.md#reusable-component-catalog). They are **separate copies**, so a change on `/` does not reach them.

---

## Data Dependencies
1. **None at request time.** The HTML is a static file. App icons are hotlinked from `stuff.thingsofbrand.com` and `upload.wikimedia.org`. `main.js` drops an icon whose image fails to load.
2. **Third-party scripts:** GTM `GTM-THTCRSLN` (inline in `<head>`), Google Fonts (Geist, Geist Mono), and the gtwy.ai chatbot loaded by `support.js` ([third-party services](../current-infrastructure/third-party-services.md)). The chatbot's `embedToken` is hardcoded ([OPEN_QUESTIONS S-04](../OPEN_QUESTIONS.md)).
3. **Product video:** `https://img.youtube.com/vi/GRzkVjW839A/maxresdefault.jpg` (fallback `hqdefault.jpg` if that image errors) and, only after the click, `https://www.youtube-nocookie.com/embed/GRzkVjW839A?autoplay=1&rel=0`. No YouTube iframe API script.

---

## State Management
- **Server state:** none.
- **Client state:** module-scoped variables inside the `main.js` IIFE (active tab, carousel index, hold flags). `localStorage.viasocket_chat_thread` keeps the chat thread id for one hour (`support.js`, `TTL`).

---

## API Dependencies

Version A and version B both call `POST /api/track-variant` from `public/home-ab.js` (one homepage view, plus Start free and Log in clicks). They call no other table-api or plug-service endpoint. The route also stores a completed registration it can see on `/signup`. A view of any other page is still dropped ([../api/track-variant.md](../api/track-variant.md)).

## Homepage A/B test (version B)

Version A is the current page in `public/new-home/`. Version B is `public/home-b/index.html`, built from the mockup at `design/homepage-b/index.html` on branch `design/homepage-b-mockup` (commit `f5bfbc6a`). That file is not served. B is homepage-only: every other route keeps its own header.

`/` is cached as one document, so the server cannot pick the version. `public/home-ab.js` runs before the body paints:

1. A crawler (the same user-agent test as `src/utils/isBot.js`) stays on A. Middleware also 302s a crawler that requests `/home-b` back to `/`. `/home-b` sends `noindex` and its canonical is `/`.
2. A person with no `variant` cookie is assigned `A` or `B` with equal probability (`Math.floor(Math.random() * 2)`), the same cookie `TrackingCookies` uses (`src/const/abTest.js`, 30 days, domain `.viasocket.com` on viasocket hosts). The version is also mirrored in `localStorage` `vs_variant`, and a missing cookie is restored from that mirror, on the homepage and on every other page, so a return visit keeps the version after the cookie expires.
3. Variant B navigates to `/home-b` before paint (`location.replace`, query and hash kept). Variant A stays on `/`. Opening the other URL directly sends the visitor back to the version they were assigned.

The `visitor_id` cookie is set the same way as `TrackingCookies`, including the `vs_visitor` mirror.

### Where B's links go

Placeholders in the mockup point at the live homepage's destination. The footer's three use-case links have no pages of their own, so each goes to `/use-cases`. Contact goes to `/support`. Cookies goes to `/privacy#cookies`, the cookies section of the privacy policy. Docs goes to `/developers/docs` (the live homepage has no Docs link). Start free and Log in go to `https://flow.viasocket.com/integrations`. Copy setup prompt copies the same text as `#promptText` on version A. Sample-prompt and use-case cards copy that text with the "Ask me what I want to build first." line replaced by the card's sentence, which is what version A's sample prompts do. B loads the same gtwy chat (`public/new-home/assets/support.js`) and the same chat button.

### Carrying the version to signup

Start free and Log in on both homepages go to flow.viasocket.com and never open `/signup`. Both homepages add `hp_variant=A` or `hp_variant=B` to every such link, and the `variant` cookie is readable on `.viasocket.com` (not HttpOnly). A registration that finishes there, or that leaves `/signup` before this site sees a response, is stored only if that app records the version. What this site does store is in [Reading the test](#reading-visitors-signup-clicks-and-signups-per-version).

### Reading visitors, signup clicks and signups per version

Stored in the A/B table `tbla8b06r` (database `65c4c053a3fad7804af5bba8`), one row per visitor **per environment**. Always filter `environment` (`production`, `test` or `local`). There is no DELETE.

For a date range, read `page_data` and `click_data` (JSON arrays, newest 100 events). An exposure is a `page_view` whose `timestamp` is in range. Version A is `path` `/` with `variant` `A`. Version B is `path` `/home-b` with `variant` `B`. Count distinct `user_id`. A signup click is a `click_data` event with `event` `signup_click` (the Start free control; neither homepage has a separate Sign up link) and a login click is `login_click`. A completed signup this site saw is `event` `signup_completed` (the version is the `variant` on that event, the homepage version held in the cookie when `/signup` saw the response). Group those by `variant` and `timestamp` the same way.

All-time totals, not sliced by date, also sit on the row: `name.homeSessions` and `name.views.home` (homepage visits), `name.variantViews` (views by version; only homepage views are written), `name.signupClicks`, `name.loginClicks`, `name.signupCompletions`, and the `signup` column (`completed_signups` is the all-time completion count, with `last_variant`). `varient` is the first version stored for that visitor, not a per-day count.

A visitor who was active long enough to push an event out of the 100-event window will be missing from an older date range. That cap is `MAX_PAGE_EVENTS` / `MAX_CLICK_EVENTS` in `src/utils/abTestVisitor.js`.

`/signup` (`CustomLoginOptimized`) records one `signup_completed` when the MSG91 widget's POST to a URL containing `/c/register` returns HTTP 2xx and the body is not `hasError`. The widget `success` callback is not that signal: the register-and-redirect path never calls it, and some logins do. That count is readable from this table without the signup app.

Still invisible here, so still a signup-app job: homepage Start free and Log in, which go to flow.viasocket.com and never hit `/signup`, and Google, Apple, or any other path that leaves `/signup` before a `/c/register` response. That app must read `hp_variant` (`A` or `B`) from the arrival URL, or the `variant` cookie on `.viasocket.com` when the query param is absent, and store it on the new account.

---

## Loading / Empty / Error States
- **Loading:** none. The page is fully rendered HTML, and the scripts only add behaviour.
- **Empty:** not applicable (no data).
- **Error:** if the clipboard write fails, `copyText` falls back to `manual(text)`, a select-by-hand box. A `role="status"` toast confirms a successful copy. If the chat script fails, the chat button stays a plain link to `/support`.

> [!WARNING]
> - Bump the `?v=` query on `styles.css` / `main.js` in `index.html` whenever you edit either file, or cached copies are served ([DESIGN](../DESIGN.md#static-homepage-publicnew-homestylescss)).
> - Production `/` is held in the Cloudflare edge cache for more than a day, whatever the middleware says. **After every homepage deploy, purge `https://viasocket.com/`**, then verify on viasocket.com itself (D-10, [current-infrastructure/cloudflare](../current-infrastructure/cloudflare.md)).
> - When you change an FAQ answer, update both the `<details>` item and the JSON-LD `FAQPage` block.

---

## Development Tasks (Open Items)
- [ ] Tag "Start free" and "Log in" with `utm_source=/` and pass incoming `utm_*`/`gclid` to flow.viasocket.com (T-04, proposed; change it in `viasocket-site` and export). Today, UTMs that land on `/` are lost.
- [ ] Retire the dormant Next homepage tree once the new homepage has run stably for a few weeks, together with the middleware `no-store` branch for `/` once the Cloudflare rule respects origin headers ([OPEN_QUESTIONS C-01](../OPEN_QUESTIONS.md#c-01-the-old-homepage-tree-still-builds-but-never-renders), C-05, D-10).
- [ ] Confirm the app count: the proposed figure is "2,300+" everywhere ([OPEN_QUESTIONS P-04](../OPEN_QUESTIONS.md)).
- [x] This design system is the target for the rest of the site (U-01, decided; [DECISIONS ADR-016](../DECISIONS.md#adr-016-the-static-homepages-design-system-is-the-site-wide-target)).
