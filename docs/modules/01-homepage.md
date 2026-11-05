---
covers: ["public/new-home/**", "public/home-b/**", "public/home-ab.js", "next.config.js", "src/app/page.js", "src/app/home/**", "src/app/front-page/**"]
verified_at: cbb6d228
verified_on: 2026-11-04
---
# Module: Homepage (`/`)

## Purpose

`/` is the static site in `public/new-home/`: plain HTML, CSS and JS that pitch viaSocket as an "Integration Layer for your AI agent". The primary action is "Copy setup prompt". The visitor pastes it into Cursor, Claude Code or Codex.

> [!WARNING]
> `/` is **not** a Next.js page. `next.config.js` `rewrites().beforeFiles` maps `/` to `/new-home/index.html` (version A) for every request, so the root layout, `AppProvider`, tracking and UTM capture never run here ([FLOWS](../FLOWS.md#cross-cutting-navigation-facts)). Version B is written into that same document in the browser by the inline gate at the top of A's `<head>` ([below](#homepage-ab-test-version-b)). The browser URL stays `/`. Never edit `src/app/page.js` for homepage work: that file is the old Next homepage, not version B. Opening `/home-b` redirects to `/`.

> [!WARNING]
> **The source of truth for `public/new-home/` is the `viasocket-site` repo** (`variants/simple-bento`), not this one. Changes are made there, exported with `deploy/export-to-viasocket-repo.py --prod`, and the export is pushed to `test` (D-03, C-01, team answers to OPEN_QUESTIONS, 2026-10-22). A hand edit to `public/new-home/*` here is overwritten by the next export unless the same change is made in `viasocket-site`. The export must keep three things from this repo's copy of `public/new-home/index.html`: `data-hp="A"` on `<html>`, the inline gate `<script data-cfasync="false">` as the first script in `<head>` (copied verbatim, including that attribute), and `<script src="/home-ab.js?v=6"></script>` straight after it. Without the gate every visitor gets A. `home-ab.js` supplies A's `utm_source=a` at runtime, so the export does not need per-link query edits. If a request needs a homepage change, say so and ask whether to change the source repo or patch the export. <!-- verify:ignore -->

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
| `#features` | "What viaSocket handles": a nine-row yes/no table, Book a demo. The "Security details" link at the close still goes to `/help/security-and-compliance` | static |
| `#compliance` | "Your data, under the same controls you would ask for." Three square cards (SOC 2 Type II, ISO 27001:2022, GDPR and CCPA) and two round text seals | static. Official badge images are not in this repo, so the seals are text |
| `#faq` | Nine `<details>` items | static; the same Q&A is duplicated in the `FAQPage` JSON-LD in `<head>` |
| `footer.ft` | Link groups, socials, G2/Capterra badges. The Company column here does not yet include the "Explore more" link that `SiteFooter` has; add that link in `viasocket-site` and export, because this file is overwritten by the next export | static |
| `.chat-fab` | Support chat button (`[data-chat]`, `href` /support) | `public/new-home/assets/support.js` opens the gtwy chat when it loaded, otherwise the link navigates |
| `#promptText` | Hidden (`sr-only`) setup-prompt text. Org and project ids are the placeholders `<your org_id>` and `<your project_id>`: this page has no visitor ids to inject. Angle brackets are escaped in the HTML so they survive as text | `PROMPT = $('#promptText').textContent`. Every `[data-copy]` button (hero, features close, footer) copies that text alone |

All content is hardcoded in the HTML and in `main.js` constants (`IC` app icons, `GAL` examples, `PR` prompts). The page fetches no content API. `#in-action` loads one YouTube thumbnail image, and the player iframe only after the visitor clicks play.

> [!WARNING]
> `#in-action` was added in this repo. The next export from `viasocket-site` (`variants/simple-bento`, `deploy/export-to-viasocket-repo.py --prod`) overwrites `public/new-home/` and will remove the section unless the same markup, CSS and script are added there first.

> `#compliance` was added in this repo too. The same export removes it unless `variants/simple-bento` gets the same piece first: the `#compliance` section placed after the features section and before the FAQ in the file that exports to `public/new-home/index.html`, and the `.comp` / `.comp-c` / `.comp-seals` / `#compliance .seal` rules at the end of the file that exports to `public/new-home/styles.css` (cache query `styles.css?v=172`). The seal radius is `50% !important` because that stylesheet flattens every other radius. The internal filenames inside `viasocket-site` could not be confirmed from this repo. `public/home-b/` is not part of that export. The seals are text because this repo has no SOC 2 or ISO badge artwork.

### 2. Dormant Next homepage (`src/app/page.js`, `src/app/home/page.js`, `src/app/front-page/**`)

> [!WARNING]
> **Do not edit these for homepage changes.** `src/app/page.js:HomePage` (A/B variants via `src/utils/getVariant.js:getVariant`, `IndexPageContent` for the front-page design) and `src/app/home/page.js` still build but never render, because of the rewrite and the `/home` redirect in `src/middleware.js`. They are kept on purpose as the rollback path (reverting merge `cfdae23e` on `main` restores the A/B homepage) and will be retired once the new homepage has run stably for a few weeks (C-01, decided for now; [DECISIONS ADR-008](../DECISIONS.md#adr-008-serve--from-the-static-site-in-publicnew-home)).

---

## UI Components

The homepage uses no React components. Its tokens (`:root` in `public/new-home/styles.css`, with dark mode via `prefers-color-scheme`) are documented in [DESIGN: Static homepage](../DESIGN.md#static-homepage-publicnew-homestylescss). The Next copies of its header, footer and prompt (`SiteChrome.js`, `src/components/IntegrationsComp/addToProduct/copy.js:BASE_PROMPT`) are listed in the [component catalog](../DESIGN.md#reusable-component-catalog). They are **separate copies**, so a change on `/` does not reach them.

---

## Data Dependencies
1. **None at request time.** The HTML is a static file. For a version B visitor the gate also fetches `/home-b/index.html`. App icons are hotlinked from `stuff.thingsofbrand.com` and `upload.wikimedia.org`. `main.js` drops an icon whose image fails to load.
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

Version A is the current page in `public/new-home/`. Version B is `public/home-b/index.html`, built from the mockup at `design/homepage-b/index.html` on branch `design/homepage-b-mockup` (commit `c0064420`). That file is not a public URL. B is homepage-only: every other route keeps its own header.

B's `#security` chapter (story index "07 Security") is "Your data, under the same controls you would ask for.": three rounded cards (SOC 2 Type II, ISO 27001:2022, GDPR and CCPA), two round text seals, then the same Security details link version A uses (`/help/security-and-compliance`). The G2 and Capterra badges that already sat in that chapter stay under the link. The Agent view repeats the three claims in the page markdown. The chapter is the same for every visitor of B and does not change the split, the index entry, or the version tags.

B's product video is the section `#video`, "See viaSocket in action.", between "Connect once" and "What teams build". It is the same video as version A (YouTube `GRzkVjW839A`). The page shows that video's thumbnail and a play button, and it requests nothing from the YouTube player until the click. The click replaces the thumbnail with the `youtube-nocookie.com` embed (`autoplay=1`, `rel=0`). The sidebar lists it as "04 In action" and numbers the later chapters 05 to 09. Scroll tracking follows those nine links. The Agent view lists the video under a Video heading.

In B's "Plug in viaSocket, and your app or agent can act in 2,300+ apps." diagram, the middle viaSocket card uses the neutral surface (`--s3` background, a 1px `--line-3` border, no shadow) and the logo in `--ink`. Those tokens are `#ececea` / `rgba(17,17,19,.24)` / `#111113` in light mode and `#1d1d20` / `rgba(255,255,255,.26)` / `#f1efe9` in dark mode. The two neighbouring cards are unchanged.

Both versions are shown at `/`, and the address bar never changes. The server has no per-visitor logic: `/` is version A's static HTML for everyone, so any cache may store it. The version is chosen in the browser by the inline gate, the first `<script>` in `public/new-home/index.html`:

1. A crawler (the same user-agent test as `src/utils/isBot.js`) gets A and no cookie. A visitor without JavaScript gets A. The gate only acts on path `/`.
2. On `test.viasocket.com`, this Pages project's `*.viasocket-website.pages.dev` previews, `localhost` and `127.0.0.1`, `?variant=a` or `?variant=b` forces that version and sets the cookie. `viasocket.com` ignores the parameter.
3. Otherwise a `variant` cookie of `A` or `B` keeps the visitor's version. A visitor with no cookie gets a fair coin flip (`Math.random() < 0.5`). The gate writes the cookie with `document.cookie` (30 days, the value in `src/const/abTest.js`, domain `.viasocket.com` on viasocket hosts, `secure` on https).
4. **A:** the gate returns and the page loads as before.
5. **B:** the gate hides `<html>`, starts `fetch('/home-b/index.html')` with the header `X-Homepage-Fetch: B`, and writes `<plaintext id="hp-rest" style="display:none">`. That tag turns the rest of A's file into inert text, so no later script, stylesheet or tag of A runs or paints. A's Tag Manager snippet and `home-ab.js` never run for a B visitor. When B arrives, the gate waits until A has finished parsing, keeps a copy of that HTML, and replaces the document with `document.open()`, `document.write(B)` and `document.close()`. Both copies are normalised first ([Rocket Loader](#rocket-loader)). The URL and history are unchanged. B's own `home-ab.js` and Tag Manager run once. B's script sets `window.__hpReady` on its first line.
6. **Fallback:** if B fails, is redirected, does not carry `data-hp="B"`, or has not arrived 2 seconds after the gate started, the gate waits until A has finished downloading into `#hp-rest` and writes A back: the tags parsed before the gate plus that text. The same rebuild runs about 1.5 seconds after B was written if `window.__hpReady` is still unset, which is what happens when B's scripts never start. `window.__hpGate` is `fallback`. A's Tag Manager runs once, with `homepage_variant: 'excluded'`. `home-ab.js` tags A's links with `utm_source=a` and posts nothing, so no exposure is counted for either version. The cookie stays `B`, so the next visit tries B again. The stored A text is normalised the same way as B, so a rewritten copy of A still runs.
7. `src/middleware.js` 302s `/home-b` and `/home-b/index.html` to `/` for every caller, crawlers included. The only exception is a request for `/home-b/index.html` carrying `X-Homepage-Fetch: B`, which is the gate's fetch.

`public/home-ab.js` then runs in whichever document is on screen. Before that page's Tag Manager snippet, it pushes `{ homepage_variant: 'A' | 'B' }` (the `data-hp` of the page on screen) to `dataLayer`, or `'excluded'` after a fallback or when the cookie does not match the page, so those pageviews can be left out of both versions. It writes the cookie only if it is missing, and it posts a view only when the cookie matches the version on screen, because `/api/track-variant` reads the version from that cookie. `localStorage` `vs_variant` mirrors it. The `visitor_id` cookie is still written only from the browser, the same way as `TrackingCookies`.

Measured on the PR 1904 Pages preview (Chrome 122, fresh profile per session, time from navigation start until B's headline is visible): about 0.4 s median with no throttling (A about 0.33 s), 0.58 s on fast 4G (A 0.43 s), and 2.0 s on slow 4G (A 1.4 s). No session fell back to A. The 2-second timer starts when the gate runs, after A's first bytes arrive, so slow 4G stays inside it, but a slower link than that will see A.

#### Editing version A's `<head>`

- Keep the gate the **first script** and keep it **inline**, with `data-cfasync="false"` on its tag. Only `<meta charset>` and `<meta name="viewport">` may come before it. Anything placed above it runs for B visitors too, and anything rebuilt after a fallback is serialized from the DOM. Without `data-cfasync="false"`, Rocket Loader postpones the gate and no visitor is sorted.
- Anything after the gate (Tag Manager, `home-ab.js`, styles, JSON-LD, the body) is skipped for B visitors. Tracking that must also run on B has to be added to `public/home-b/index.html` as well.
- Keep `home-ab.js` before the Tag Manager snippet in both files, so the pageview carries `homepage_variant`.
- `public/home-b/index.html` must keep `data-hp="B"` within its first 200 characters. The gate checks it before writing B.
- A script written into the document by `document.write` must be same-origin or `async`. Chrome may block cross-origin parser-blocking scripts written that way on slow connections.
- After editing the gate or `home-ab.js`, bump `home-ab.js?v=` in both HTML files.
- Every script in `public/home-b/index.html` keeps `data-cfasync="false"`. B's main script sets `window.__hpReady` and adds `hp-on` to `<html>` before it does anything else. The `.rv` hide rule applies only under `html.hp-on`.

### Rocket Loader

viasocket.com runs Cloudflare Rocket Loader. `test.viasocket.com` and the `*.pages.dev` previews do not, so a check on those hosts never shows this failure.

Rocket Loader rewrites every script in an HTML response to `type="<hex>-text/javascript"` (for example `type="4b560cea63a5d8dad7eaf3b4-text/javascript"`), adds a `data-cf-settings` attribute, and injects its own `rocket-loader.min.js`. That file is what switches the scripts back on after a normal page load. The gate inserts B with `document.write`, and a fallback inserts A the same way, so the loader never runs and every rewritten script stays inert. The theme switch, the use-case cards, the FAQ and the demo are all built by those scripts. B's sections below the hero (`.rv`) used to start at `opacity: 0` and only became visible from the same script, so a visitor whose script never ran saw a blank page under the hero.

`normalise()` in the gate runs on B and on the stored copy of A before `document.write`. It turns `type="<hex>-text/javascript"` back into a normal script, drops `data-cf-settings`, and removes the `rocket-loader.min.js` tag. `data-cfasync="false"` on the gate and on every script in `public/home-b/index.html` asks Rocket Loader not to rewrite those tags in the first place. The normalisation stays either way: a response that is already rewritten, including the A text sitting in `#hp-rest`, is still repaired.

B's main script sets `window.__hpReady` and `html.hp-on` on its first line. `.rv` sections are hidden only while `hp-on` is set, and revealed when they scroll into view. If that script never starts, the sections stay visible, and about 1.5 seconds after the write the gate rebuilds the normalised A with `__hpGate` of `fallback`, so the visit is not counted as a B exposure.

### Where B's links go

Placeholders in the mockup point at the live homepage's destination. The footer's three use-case links have no pages of their own, so each goes to `/use-cases`. Contact goes to `/support`. Cookies goes to `/privacy#cookies`, the cookies section of the privacy policy. Docs goes to `/developers/docs` (the live homepage has no Docs link). Start free and Log in go to `https://flow.viasocket.com/integrations`. Copy setup prompt copies the same text as `#promptText` on version A. Sample-prompt and use-case cards copy that text with the "Ask me what I want to build first." line replaced by the card's sentence, which is what version A's sample prompts do. B loads the same gtwy chat (`public/new-home/assets/support.js`) and the same chat button.

### Carrying the version to signup

Start free and Log in on both homepages go to flow.viasocket.com and never open `/signup`. Both homepages add `hp_variant=A` or `hp_variant=B` to every such link, and the `variant` cookie is readable on `.viasocket.com` (not HttpOnly).

`public/home-ab.js` sets `utm_source` to `a` on version A and `b` on version B. Query parameters already on the link stay; `utm_source` is added or replaced. These links carry it:

- Start free, Log in, Talk to an expert, Book a demo
- a setup-prompt link that opens another page
- Chat with us, because it sits with the closing buttons (`.ctas`, `.vt-f-alt`)
- a nav or footer link to flow.viasocket.com or `/signup`
- List your app, Partner program and Contact support
- Contact (version B's footer)

Left untagged: anchors, copy buttons, the menu, the rest of the footer (Features, Use cases, Blog, Security, Privacy, Terms, Cookies and the others), Pricing, Docs, Integrations, social links and badges. `a` and `b` are in `INTERNAL_UTM_SOURCES`, so a later page can still overwrite them. The homepage does not write the `utmData` cookie. `utmData()` on the tracking event still reads only the `utm_*` query on the page the visitor opened.

A registration that finishes on flow.viasocket.com, or that leaves `/signup` before this site sees a response, is stored only if that app records the version. It can read `utm_source` or `hp_variant` from the arrival URL. What this site does store is in [Reading the test](#reading-visitors-signup-clicks-and-signups-per-version).

### Reading visitors, signup clicks and signups per version

Stored in the A/B table `tbla8b06r` (database `65c4c053a3fad7804af5bba8`), one row per visitor **per environment**. Always filter `environment` (`production`, `test` or `local`). There is no DELETE.

For a date range, read `page_data` and `click_data` (JSON arrays, newest 100 events). An exposure is a `page_view` whose `timestamp` is in range. Both versions are `path` `/`. Version A is `variant` `A` and version B is `variant` `B`. Count distinct `user_id`. Older rows from before both versions were served at `/` used `path` `/home-b` for version B. A signup click is a `click_data` event with `event` `signup_click` (the Start free control; neither homepage has a separate Sign up link) and a login click is `login_click`. Each of those events stores `variant` (`A` or `B`) and a `destination_url` whose `utm_source` is `a` or `b`. The event's `utmData` is still the landing URL's `utm_*`, not the version tag. A completed signup this site saw is `event` `signup_completed` (the version is the `variant` on that event, the homepage version held in the cookie when `/signup` saw the response). Group those by `variant` and `timestamp` the same way.

All-time totals, not sliced by date, also sit on the row: `name.homeSessions` and `name.views.home` (homepage visits), `name.variantViews` (views by version; only homepage views are written), `name.signupClicks`, `name.loginClicks`, `name.signupCompletions`, and the `signup` column (`completed_signups` is the all-time completion count, with `last_variant`). `varient` is the first version stored for that visitor, not a per-day count.

A visitor who was active long enough to push an event out of the 100-event window will be missing from an older date range. That cap is `MAX_PAGE_EVENTS` / `MAX_CLICK_EVENTS` in `src/utils/abTestVisitor.js`.

`/signup` (`CustomLoginOptimized`) records one `signup_completed` when the MSG91 widget's POST to a URL containing `/c/register` returns HTTP 2xx and the body is not `hasError`. The widget `success` callback is not that signal: the register-and-redirect path never calls it, and some logins do. That count is readable from this table without the signup app.

Still invisible here, so still a signup-app job: homepage Start free and Log in, which go to flow.viasocket.com and never hit `/signup`, and Google, Apple, or any other path that leaves `/signup` before a `/c/register` response. That app must read `utm_source` (`a` or `b`) or `hp_variant` (`A` or `B`) from the arrival URL, or the `variant` cookie on `.viasocket.com` when the query param is absent, and store it on the new account. Signup clicks per version are already on this table, from `variant` and from `destination_url`.

---

## Loading / Empty / Error States
- **Loading:** version A is fully rendered HTML, and the scripts only add behaviour. For a version B visitor the page stays blank (`<html>` hidden) until B is written, at most 2 seconds before the gate falls back to A.
- **Empty:** not applicable (no data).
- **Error:** if the clipboard write fails, `copyText` falls back to `manual(text)`, a select-by-hand box. A `role="status"` toast confirms a successful copy. If the chat script fails, the chat button stays a plain link to `/support`.

> [!WARNING]
> - Bump the `?v=` query on `styles.css` / `main.js` in `index.html` whenever you edit either file, or cached copies are served ([DESIGN](../DESIGN.md#static-homepage-publicnew-homestylescss)).
> - `/` is the same HTML for every visitor, so the production zone cache rule (D-10) can keep it without breaking the split. **After every homepage deploy, purge `/`** so the new gate reaches visitors. If that rule ever caches the `/home-b/index.html` redirect, the gate gets A's HTML back, rejects it (no `data-hp="B"`) and shows A to B visitors, counting nothing. Check that a request carrying `X-Homepage-Fetch: B` returns B on the production host ([current-infrastructure/cloudflare](../current-infrastructure/cloudflare.md)).
> - When you change an FAQ answer, update both the `<details>` item and the JSON-LD `FAQPage` block.

---

## Development Tasks (Open Items)
- [ ] Pass incoming `utm_*` and `gclid` from the homepage through to flow.viasocket.com (the rest of T-04). Homepage calls to action already carry `utm_source=a` or `utm_source=b`. The Next `SiteHeader` pages still send Start free with no `utm_source`.
- [ ] Retire the dormant Next homepage tree once the new homepage has run stably for a few weeks, ([OPEN_QUESTIONS C-01](../OPEN_QUESTIONS.md#c-01-the-old-homepage-tree-still-builds-but-never-renders)).
- [ ] Confirm the app count: the proposed figure is "2,300+" everywhere ([OPEN_QUESTIONS P-04](../OPEN_QUESTIONS.md)).
- [x] This design system is the target for the rest of the site (U-01, decided; [DECISIONS ADR-016](../DECISIONS.md#adr-016-the-static-homepages-design-system-is-the-site-wide-target)).
