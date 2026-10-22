---
covers: ["wrangler.toml", "next.config.js", "src/middleware.js", "public/_redirects", "src/app/robots.txt/route.js", "build-utilities/generate-robots-txt.js", "src/app/providers.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Cloudflare (Pages hosting + viasocket.com zone)

Cloudflare Pages runs this site (test.viasocket.com from `test`, viasocket.com from `main`), and the viasocket.com zone in front of it caches pages and routes some paths to other deployments.

> [!WARNING]
> **Production HTML is cached by a zone rule that is not in the repo, and that cache strips `Set-Cookie`.** On 2026-10-22 production `/` returned `cache-control: public, max-age=10800, must-revalidate` with `cf-cache-status: HIT`, and `/pricing` returned `max-age=10800`, `HIT`; test `/` returned `max-age=0`, `DYNAMIC`. Anything per-visitor (cookies set by the server, variant-specific HTML) works on local and test and breaks on production. Write cookies from the browser (ADR-007 in [DECISIONS](../DECISIONS.md)) and verify per-visitor behaviour on production ([DEVELOPMENT.md](../DEVELOPMENT.md) checklist).

## Role
Hosting and edge runtime for every Next.js route; CDN cache for production; path router for the zone (other apps serve `/help/*`, `/blog`, `/discovery`, `/community`); host of Zaraz (`/cdn-cgi/zaraz/i.js`). Build commands, branches and the deploy flow live in [DEVELOPMENT.md](../DEVELOPMENT.md); the adapter decision in [DECISIONS](../DECISIONS.md) (ADR-001, ADR-002).

## Connection
- **Env var(s):** none read from Cloudflare at runtime by name. Per-environment `NEXT_PUBLIC_*` values are set in the Pages dashboard and inlined at **build** time, so a dashboard change needs a rebuild ([DEVELOPMENT.md](../DEVELOPMENT.md)).
- **Client:** `@cloudflare/next-on-pages` (build adapter, runs `vercel build` internally, output `.vercel/output/`), `wrangler` (local `preview`/`deploy`), `wrangler.toml` (only `compatibility_flags = ["nodejs_compat"]`).
- **Auth:** Pages Git integration (not in the repo).
- **Access posture:** the zone rules, Pages project settings and env values are dashboard-only; no agent can read or change them from the repo ([OPEN_QUESTIONS D-02](../OPEN_QUESTIONS.md)).

## Entities / Tables / Endpoints
| Name | Purpose |
|---|---|
| Pages project (test / production) | Builds each branch with next-on-pages; serves the worker |
| Edge runtime | Every server-rendered page and route handler exports `export const runtime = 'edge'` (why: [ARCHITECTURE.md](../ARCHITECTURE.md)) |
| Zone cache rule | Caches production HTML (`max-age=10800` observed on `/`, `/pricing`, `/sitemap.xml`, `/llms.txt`); not present on test |
| Other zone deployments | `/help/*`, `/blog`, `/discovery`, `/community` (and `/faq`) answer from other apps; on 2026-10-22 they returned `private, no-store` / `no-cache, no-store`, `DYNAMIC`, and no `x-matched-path` header ([OPEN_QUESTIONS P-05](../OPEN_QUESTIONS.md)) |
| `public/_redirects` | One Pages redirect rule (`/faq/a-step-by-step-guide`), possibly unreachable ([OPEN_QUESTIONS C-07](../OPEN_QUESTIONS.md)) |
| Zaraz | Loaded by `src/app/providers.js:loadZarazManually`; configured in the dashboard ([third-party-services.md](third-party-services.md)) |

## Schema / Shape
```text
Request -> zone (cache rule, path routing to other apps)
        -> Pages worker: public/_redirects -> next.config.js redirects -> src/middleware.js -> beforeFiles rewrite (/ -> /new-home/index.html) -> filesystem/App Router
Response headers that identify this project: x-matched-path (/ shows /new-home/index.html)
```
Full routing order: [ARCHITECTURE.md](../ARCHITECTURE.md) "Request Path". Route and redirect table: [../05-navigation.md](../05-navigation.md).

Search-engine posture per environment:
- **robots.txt** comes from `src/app/robots.txt/route.js:GET` at request time (and an identical prebuild file from `build-utilities/generate-robots-txt.js`, [OPEN_QUESTIONS D-01](../OPEN_QUESTIONS.md)). Only `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod'` on a host without `integrate`/`integration` gets `Disallow: /admin/` plus two `Sitemap:` lines; everything else gets `Disallow: /`.
- **noindex**: the root layout `metadata` sets `robots: 'noindex, nofollow'` when not `prod` (React pages only; the static `/` has its own canonical).
- **Preview noindex header**: [DECISIONS](../DECISIONS.md) (ADR-008) credits "Cloudflare's preview noindex header" for keeping test out of search, but on 2026-10-22 `https://test.viasocket.com/` returned no `x-robots-tag` header. Treat robots `Disallow: /` and the layout `noindex` as the only evidenced guards.

## Functions We Call
| Function | Returns | Used by |
|---|---|---|
| `middleware(request)` | `/home` 307 to `/`; sets `Cache-Control: private, no-store, must-revalidate` and `CDN-Cache-Control: no-store` on `/` (**ineffective in production**, [OPEN_QUESTIONS C-05](../OPEN_QUESTIONS.md)); `rdt_cid` cookie | every page request (matcher skips paths under _next/ and api/, and dotted paths) |
| `loadZarazManually()` | injects `/cdn-cgi/zaraz/i.js` once | `src/app/providers.js:AppProvider` |
| `GET /robots.txt` | text, see above | crawlers |

## Degradation
If the zone cache serves a stale page, content edits in table-api appear only after up to 3 hours plus the in-process TTL. Zaraz returns 404 outside Cloudflare (local), which is harmless. A failed Pages build leaves the previous deployment live; there is no other CI gate ([DEVELOPMENT.md](../DEVELOPMENT.md)).
