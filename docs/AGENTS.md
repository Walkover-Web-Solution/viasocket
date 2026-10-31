---
covers: ["src/utils/**", "src/const/**", "src/app/**/page.js", "src/app/lib/**", "src/middleware.js"]
verified_at: a261e40d
verified_on: 2026-10-31
---
# AI Agent Guidelines (viaSocket marketing site)

Rules and heuristics for AI coding agents working in the `viasocket` repository.
Read this carefully before generating or modifying any code. These rules override
default agent behavior.

> This is the **project-specific** rulebook. The repo-root [`AGENTS.md`](../AGENTS.md) is the short
> universal version, with one-line rules that point here; this file is where the detail and the reasons live.

## 1. Architecture / Integration Phase

The site is fully integrated with live backends; there is no mock layer and none may be added.

- Pages render on every request (edge runtime) from **table-api** content and the **plug service**. See [ARCHITECTURE](ARCHITECTURE.md#backend--aggregation-layer) and [current-infrastructure/](current-infrastructure/).
- `/` is **not** a Next.js page. It is the static site in `public/new-home/`, served through a `beforeFiles` rewrite in `next.config.js`. Its source of truth is the `viasocket-site` repo, exported into `public/new-home/` ([modules/01-homepage](modules/01-homepage.md)). `src/app/page.js`, `src/app/home/page.js` and `src/app/front-page/**` build but never render; they are kept only as the rollback path, so do not edit them ([OPEN_QUESTIONS C-01](OPEN_QUESTIONS.md#c-01-the-old-homepage-tree-still-builds-but-never-renders)).
- A page MAY read table-api only through `src/utils/getData.js` getters or `src/utils/axiosCalls.js` functions, called from its `src/app/lib/*-data.js` loader. To add a table, put its id in `src/const/tables.js` and its columns in `src/const/fields.js`; never hardcode the URL ([database/entities](database/entities.md)).
- If a feature needs a backend capability that does not exist (for example deleting a table row), write the needed contract in [CONTRACTS](CONTRACTS.md#required--unavailable-backend-capabilities). **Do NOT** fake it with fixtures, a stub route or a mock.
- `/help/*` footer pages, `/blog`, `/discovery` and `/community` are served by **other deployments** on the same Cloudflare zone. Never add a route that would shadow them ([05-navigation](05-navigation.md), [current-infrastructure/cloudflare](current-infrastructure/cloudflare.md)).

## 2. Server vs Client Boundaries

- Every `page.js` is a Server Component and none is `'use client'`. Interactivity lives in a child, conventionally named `*Client` or `*ClientComp`, that starts with `'use client'` ([09-coding-guidelines](09-coding-guidelines.md)).
- Every dynamic `page.js` and `route.js` must `export const runtime = 'edge'`, because `@cloudflare/next-on-pages` cannot deploy anything else. `next build` passes without it but the Cloudflare build fails. No Node APIs (`fs`, `path`) are available at request time.
- **NEVER** import `src/utils/axiosCalls.js` or `src/utils/getData.js` into a new `'use client'` file. Everything named `NEXT_PUBLIC_*` (including the table-api `auth-key` values) is inlined into any client bundle that references it, Three existing `'use client'` files import these helpers, and one of them (`src/app/components/home/SearchInputHomeOptimized.js`) sends the content and blog keys from the browser ([13-security](13-security.md)).
- Only `src/app/api/track-variant/route.js` writes to a table. A new write gets its own route handler and its own function in `axiosCalls.js`, never a client-side call ([api/track-variant](api/track-variant.md), [12-api-guidelines](12-api-guidelines.md)).

## 3. Tech Stack Restrictions

- **Styling:** Tailwind 3 utilities (plus the daisyUI plugin). Custom CSS only when Tailwind genuinely cannot do it, such as `@font-face`; tokens and keyframes go in `tailwind.config.js`. Legacy global SCSS in `src/scss/` overrides some utilities, so read [DESIGN](DESIGN.md) before restyling a legacy page.
- **Icons:** `lucide-react` only.
- **Charts:** none. The site has no charting library; do not add one without asking.
- **Animations:** Tailwind keyframes in `tailwind.config.js` and CSS transitions. `motion` is used only by the dormant homepage tree; `/developers` uses its own `useReveal` hook. Do not spread `motion` to new pages.
- **Other concerns, one library each:** `axios` + `axios-cache-interceptor` (HTTP), `react-markdown` (markdown), `react-fast-marquee` (marquees), `google-libphonenumber` (phone input), `@dotlottie/player-component` (Lottie). Versions are in [06-tech-stack](06-tech-stack.md). Adding a second library for a covered concern is a review-blocking change.
- **No framework migrations or broad upgrades inside other work.** Next 16, React 19 and `@opennextjs/cloudflare` were each tried and reverted ([DECISIONS ADR-002](DECISIONS.md#adr-002-stay-on-next-15--react-18--next-on-pages-reject-next-16-and-opennextjscloudflare)).

## 4. ID Handling & Cross-System References

- **table-api table ids** (`tbl…`): constants in `src/const/tables.js`, e.g. `FOOTER`, `NAVBAR`, `TEMPLATES`, `ABTESTCOUNT`. Pass the constant, never the literal.
- **table-api database ids** (24-hex): the content database id and the A/B database id are currently written inline in `src/utils/axiosCalls.js` (`getDataFromTable`, `abTestTableUrl`). That is tracked debt ([OPEN_QUESTIONS S-02](OPEN_QUESTIONS.md)), not a pattern to copy: a new database gets `NEXT_PUBLIC_DB_ID_<NAME>` / `NEXT_PUBLIC_DB_KEY_<NAME>` env vars.
- **Row ids:** table rows are addressed by `rowid` (`row…`). `updateAbTestVisit` refuses anything else. Ordering by `autonumber` gives "the oldest row".
- **`visitor_id` cookie** (`src/const/abTest.js:VISITOR_ID_COOKIE`, 1 year, mirrored to localStorage `vs_visitor`): the anonymous visitor identity that ties visits to one tracking row. It is shared by test and production because it is set on `.viasocket.com`, so any read-back must also filter on the row's `environment`. `getAbTestVisitorRows` does.
- **`variant` cookie** (`VARIANT_COOKIE`, `VARIANTS = ['A', 'B']`, 30 days): the A/B arm. It is written by the browser (`TrackingCookies`), never by middleware ([DECISIONS ADR-007](DECISIONS.md#adr-007-tracking-cookies-are-written-by-the-browser-and--is-sent-no-store)).
- **Middleware experiment id** (`localStorage` `mw_visitor`, `src/utils/mwExperiment.js`): a different visitor from `visitor_id`, used only to assign and record experiments the owner starts in the middleware. Do not write those events to `/api/track-variant`, and do not start an experiment from the layout. Contract: [CONTRACTS](CONTRACTS.md#middleware-experiments).
- **`utm_source`:** a page tags its own signups with its **path** (`/integrations`, `/embed/app-integration`). `isInternalUtmSource()` in `src/utils/handleUtmSource.js` treats empty, path-shaped and `INTERNAL_UTM_SOURCES` values as the site's own. Anything else is external attribution, which `savePageUtmSource()` will not overwrite for a day. Campaign pages keep their registered tag (e.g. `relay-switch-google-ads`), stamp it into the `utmData` cookie just before navigating, and put `utm_source` in the signup URL exactly once ([FLOWS](FLOWS.md#detailed-journey-landing-utm-capture-and-signup), [DECISIONS ADR-012](DECISIONS.md#adr-012-utm-attribution-conventions)).
- **`utmData` cookie:** JSON, 1 day, carries `utm_*` and a typed `prompt` to signup through MSG91 `state`. Write it with `setCookie` from `src/utils/handleUtmSource.js`. Never put a prompt in a query parameter.
- **App slugs:** plug-service `appslugname` identifies an app across `/integrations/[app]`, the dofollow table and template lookups ([current-infrastructure/plug-service](current-infrastructure/plug-service.md)).

Never assume an ID is universally available. Pass the specific ID type each data source needs.

## 5. Fallback & Graceful Degradation

- table-api and plug-service helpers never throw to the page. On failure they report through `src/utils/SendErrorMessage.js:sendErrorMessage` and return `undefined`, `null`, `[]` or `{}`, and loaders fall back with `|| []` / `|| {}`. A broken upstream renders an empty section, not an error page ([18-error-handling](18-error-handling.md)). One known exception: `src/utils/getFaqData.js:getFaqData` throws when its fetch fails, and the loader's catch then blanks the whole page ([OPEN_QUESTIONS C-12](OPEN_QUESTIONS.md)); guard it if you touch it.
- Missing content means `notFound()`, or a redirect to the index for unknown integration and template slugs. Keep that behaviour unless asked; whether a 404 is better for SEO is [OPEN_QUESTIONS C-06](OPEN_QUESTIONS.md).
- Tracking must fail closed: `/api/track-variant` drops an event rather than inserting a duplicate row when its lookup fails.
- **Prove the failing layer before editing tracking or analytics code.** Instrument cookie → request → payload → response → a cache-busted read, and compare local, test and production. The obvious explanation has been wrong before ([DECISIONS incident log](DECISIONS.md#lessons-learned--incident-log)).

## 6. Modifying Documentation

If you learn something new about infrastructure, or change an API/data contract, you
**must** update the corresponding file in `docs/api/`, `docs/database/`, `docs/modules/`,
or `docs/current-infrastructure/` in the same change, and bump its `verified_at` / `verified_on`. <!-- verify:ignore -->
Routes and redirects go in [05-navigation](05-navigation.md), env vars in [DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference),
decisions in [DECISIONS](DECISIONS.md), and unknowns in [OPEN_QUESTIONS](OPEN_QUESTIONS.md). The docs are the source of truth.
