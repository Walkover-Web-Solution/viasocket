---
covers: ["src/const/admin.js", "src/middleware.js", "src/data/redirects.json", "src/app/lib/admin-content.js", "src/app/lib/admin-announcements.js", "src/app/components/navbar/AnnouncementBar.js", "src/app/components/navbar/NavbarServer.js", "src/app/components/navbar/NavbarOptimized.js", "src/components/IntegrationsComp/addToProduct/SiteChrome.js", "src/app/integrations/[...slug]/page.js", "src/app/api/track-variant/route.js"]
verified_at: 96b44de6
verified_on: 2026-11-08
---
# Admin panel (`viasocket-admin`)

The team's admin app on Embarko, `https://viasocket-admin.embarko.app`. The website reads three kinds of managed content from its public API and sends it visitor events. Its source is the `viasocket-admin` repo, not this one, so the request and response shapes below are what this site's code reads, not a published contract.

## Connection
- **Base URL:** `src/const/admin.js:ADMIN_URL` = `NEXT_PUBLIC_ADMIN_URL` (optional override, for example a local admin) or the built-in `https://viasocket-admin.embarko.app`. Trailing slashes are stripped.
- **Auth:** none on the three reads. The event ingest uses a built-in `x-tracking-secret` ([DECISIONS ADR-018](../DECISIONS.md#adr-018-admin-visitor-events-do-not-use-a-cloudflare-setting)).
- **Calls are plain `fetch`, not `axiosCalls.js`.** They live in `src/middleware.js` and two `src/app/lib/admin-*.js` loaders, all server-side.
- **Rule for every use: the site must keep working without the admin.** Each call has a short timeout and falls back to what the code already has.

## What the site reads and writes

| Use | Endpoint | Caller | Timeout / freshness | When the admin fails |
|---|---|---|---|---|
| Redirects (admin: Pages → Redirects) | `GET /api/public/redirects` → `{ redirects: [{ source, destination, statusCode }] }` | `src/middleware.js:managedRedirects` | 1.5 s; list kept in isolate memory for 60 s | Keeps the last list it had, else `src/data/redirects.json` |
| Copy for `/integrations/{app}` (admin: Programmatic pages) | `GET /api/public/content/{slug}` → `{ content: { seo, hero_section, use_cases, faqs } }`; 404 = nothing written | `src/app/lib/admin-content.js:getAdminContent`, from `src/app/lib/integration-data.js` | 2 s; `next.revalidate` 300 s; React `cache` per request | `null`: the page uses its fixed copy from `copy.js:COPY`, field by field |
| Announcement bar (admin: Pages → Announcements) | `GET /api/public/announcements` → `{ announcements: [{ id, text, link, newTab, pages, exclude }] }`, only the ones live now, newest first | `src/app/lib/admin-announcements.js:getAnnouncements`, from `NavbarServer` and `SiteChrome.js:SiteHeader` | 1.5 s; `next.revalidate` 60 s | `null`: the classic navbar shows its built-in `WebinarBanner` (not on `/index`, `/migration/relay`, `/webinar`); homepage-design pages show no bar |
| Visitor events | `POST /api/public/events` | `src/app/api/track-variant/route.js:forwardToAdmin` | see [api/track-variant](../api/track-variant.md) | Every event that passes the cookie and bot checks is copied, before the homepage-only table filter; a failed copy is not retried |

Whether `next: { revalidate }` caches anything under `@cloudflare/next-on-pages` has not been verified; treat the admin as read on most requests.

### Redirect rules
Applied first in middleware, before any other routing ([05-navigation](../05-navigation.md#redirects-rewrites-and-middleware)). `/old` matches only `/old`; `/old/*` matches `/old` and everything under it; a destination ending in `*` receives what the source's `*` matched; the query string is kept; the most specific rule wins (exact, then the longest wildcard); `statusCode` 0 means "no redirect" (used to keep the footer `/help/*` pages up). Allowed codes are 301, 302, 307 and 308 (anything else becomes 308). Every redirect is sent with `Cache-Control: public, max-age=300`, so a rule removed in the admin stops redirecting returning browsers within five minutes.

`src/data/redirects.json` is a hand-refreshed copy of the admin list and is known to differ from it ([OPEN_QUESTIONS P-06](../OPEN_QUESTIONS.md#active-questions-table)). When you add or change a redirect, make it in the admin and copy it into that file.

### App-page copy
`getAdminContent(slug)` maps `seo.page_title`, `seo.meta_description`, `seo.primary_keywords` + `secondary_keywords`, `hero_section.h1_title`, `hero_section.subheadline`, `use_cases[{title, description}]` and `faqs[{question, answer}]`. Each part is used only when present and well-formed. On `/integrations/{app}` it supplies the `<title>`, meta description, keywords, `<h1>`, hero subline, FAQs (and their JSON-LD) and the "Use cases" section, which renders only when the admin has use cases and the app is not in beta ([module 02](../modules/02-integrations-directory.md)).

### Announcement rules
`AnnouncementBar.js:pickAnnouncement` picks one per path: `*` is every page, `/path` only that page, `/path/*` the path and everything under it; `exclude` wins over `pages`; the most specific match wins, then the newest. Links are kept only when they are a site path or an `http(s)` URL. The classic navbar shows the bar only at `lg` widths and up. The static homepage `/` does not render it.

## Verification
- Last checked 2026-11-08 with unauthenticated GETs: `/api/public/redirects` returned 20 rules (`src/data/redirects.json` has 16), `/api/public/announcements` returned one entry with exactly the six fields above, and `/api/public/content/slack` returned 404 `{ error }` (no copy written for that app).
- Redirects: `curl -sI` a managed source on local, test and production and compare `location`, status and `cache-control` (rule 13 in the root [AGENTS.md](../../AGENTS.md)).
- Copy and announcements: compare the page with the admin entry, then point `NEXT_PUBLIC_ADMIN_URL` at an unreachable host locally and confirm the page still renders with its fixed copy and no error.
- No automated test covers any of this.
