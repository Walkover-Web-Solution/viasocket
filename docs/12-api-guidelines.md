---
covers: ["src/app/api/**"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 12 API Guidelines

Rules for the site's own route handlers. There is one today, `POST /api/track-variant`. The external systems the site calls are listed in [CONTRACTS](CONTRACTS.md#external-systems).

## Layer Rules
- **Route handlers live in `src/app/api/<name>/route.js`** and run on the edge (`export const runtime = 'edge'`). Without that line `next build` still passes, but the Cloudflare build fails ([docs/AGENTS.md §2](AGENTS.md#2-server-vs-client-boundaries)).
- **A route handler is the only place that writes to a table.** Today `src/app/api/track-variant/route.js` is the only writer, through `saveAbTestVisit` and `updateAbTestVisit` in `src/utils/axiosCalls.js`. A new write gets its own route and its own `axiosCalls.js` function. Never write from a client component: the browser would need the key, and every `NEXT_PUBLIC_*` key is already public ([13-security](13-security.md#secrets)).
- **Pages read through loaders, with no API route in between.** A server `page.js` awaits `src/app/lib/*-data.js`, which calls `src/utils/getData.js` and then `src/utils/axiosCalls.js` ([ARCHITECTURE](ARCHITECTURE.md#layers)). Do not add a route just to proxy a read for a page.
  - Seven pages skip the loader and import the helpers directly: `src/app/features/page.js`, `src/app/agency-partner/page.js`, `src/app/hire-an-expert/page.js`, `src/app/integrations-script/page.js`, and the three `src/app/migration/*/page.js` (`zapier`, `n8n`, `relay`). They still call `axiosCalls.js`, never `fetch`. Do not add an eighth.
- **Components never call table-api.** One existing exception breaks this rule: `src/app/components/home/SearchInputHomeOptimized.js` (`'use client'`) calls `getIndustries`, `getDepartments`, `getVideoData` and `getBlogData` from the browser. Do not copy it ([13-security](13-security.md#secrets)).
- **The middleware never sees API routes.** The `src/middleware.js` matcher skips `api/`. A route handler cannot rely on `rdt_cid` handling or the `/home` redirect.

## Route Conventions
Observed from the one route; follow it for the next:

| Concern | Convention | Evidence |
|---|---|---|
| Path | `/api/<kebab-case-name>`, no version prefix | `src/app/api/track-variant/` |
| Method | one named export per method (`export async function POST`) | `src/app/api/track-variant/route.js:POST` |
| Input | JSON body read with `await request.json()`; unknown keys ignored; free text trimmed and capped, identifiers checked against a pattern (`ELEMENT_PATTERN`, `ACTION_PATTERN`) | `readInteraction` in the route |
| Identity | from cookies via `cookies()` (`next/headers`), never from the body; cookie names are constants in `src/const/abTest.js` | `VISITOR_ID_COOKIE`, `VARIANT_COOKIE` |
| Server-resolved fields | client IP (`x-forwarded-for` first entry, `x-real-ip`, `cf-connecting-ip`) and environment are computed in the route, not trusted from the body | `getClientIp`, `getEnvironment` |
| Cheap rejects first | cookies → body → validation → bot check → table read | [api/track-variant.md](api/track-variant.md#behavior-notes) |
| Auth, rate limit, caching | none | the route |

Path and query params: none used yet. If a route needs one, validate it before it reaches a table-api filter. Filters are raw strings ([table-api.md](current-infrastructure/table-api.md#schema--shape)).

## Response Shape
The site has no envelope: no `data:` wrapper and no error object. A route answers `NextResponse.json(...)` with **HTTP 200 in every case**, and `success` says whether the write happened. This is the shape from `src/app/api/track-variant/route.js`:

```ts
// success: the write (POST or PATCH) succeeded, or a duplicate event had nothing to write (counted: false)
{ success: true;  created: boolean; counted: boolean; merged?: number /* absent on insert */; viewCount: number }
// a partial failure still carries the counters it computed
{ success: false; created: false; counted: boolean; merged: 0; viewCount: number }   // PATCH failed
// rejected, or the event was dropped on purpose: `reason` names why
{ success: false; reason: 'missing tracking cookies' | 'unrecognised interaction' | 'bot' | 'lookup failed' }
// unexpected exception (caught, logged as '[variant tracking] failed:')
{ success: false }                                   // no reason: inspect the edge logs
```

- `reason` is a short lowercase phrase, present only when the route stopped before writing. Reuse that pattern. Do not invent status codes.
- The exact per-branch fields live in [api/track-variant.md](api/track-variant.md#response--200).
- Always-200 suits fire-and-forget telemetry, which the browser never reads (`fetch` with `keepalive`, or `navigator.sendBeacon`). A route whose response a page **does** read would need a different contract. Decide that with a maintainer before you build one.

## Error Handling
- **Wrap the whole handler in `try/catch`** and answer `{ success: false }` (200). A tracking failure must never surface as a page error.
- **Fail closed for writes.** When a lookup returns `null` (failure), drop the event. Never treat the failure as "no history" and insert, or duplicate rows pile up, and the table has no DELETE ([table-api.md](current-infrastructure/table-api.md)).
- **Helpers report and return a fallback.** `axiosCalls.js` functions call `sendErrorMessage` and return `null`. The route checks for `null` and does not use `try/catch` for this.
- **Tracking runs in all three environments.** Do not gate a route on production ([DECISIONS](DECISIONS.md) ADR-009).
- The site-wide fail-soft policy, including what `sendErrorMessage` sends and when: [18-error-handling](18-error-handling.md).

## Documenting a Route
Every route domain gets a file in [`api/`](api/). Clone [`api/_TEMPLATE.md`](api/_TEMPLATE.md). The worked example is [`api/track-variant.md`](api/track-variant.md), which also covers the `/robots.txt` and `/sitemap.xml` handlers. Then add the route to the "Internal API routes" line in [CONTRACTS](CONTRACTS.md#internal-api-routes) and to [05-navigation](05-navigation.md).
