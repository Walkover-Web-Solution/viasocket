---
covers: ["src/**", "public/**", "build-utilities/**", "next.config.js", "tailwind.config.js", "jsconfig.json"]
verified_at: a261e40d
verified_on: 2026-10-28
---
# 08 Folder Structure

The tree below shows the repo at `17b99cd8` plus the working-tree cleanup. `node_modules/`, `.next/`, `.vercel/`, `.wrangler/` and `.git/` are left out because they are untracked build or tool output. The `@/` import alias maps to `src/` (`jsconfig.json`).

```text
viasocket/
├── AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules   # agent entry point + thin tool adapters
├── .github/copilot-instructions.md                 # Copilot adapter (no CI workflows)
├── docs/                                           # this doc set; README.md is the map
├── next.config.js            # / rewrite, afterFiles rewrites, every redirect, images.unoptimized, fs:false
├── tailwind.config.js        # theme tokens, dev-*/docs-* families, daisyUI plugin
├── wrangler.toml             # Cloudflare Pages (nodejs_compat)
├── build-utilities/
│   └── generate-robots-txt.js   # prebuild: writes untracked public/robots.txt
├── _posts/blog/*.mdx         # legacy Decap CMS posts; nothing reads them (C-02)
├── public/
│   ├── new-home/             # THE HOMEPAGE "/": index.html, styles.css, main.js, assets/
│   ├── assets/               # images for React pages (bg-img, brand, icons, img, index, shared)
│   ├── admin/                # Decap CMS config (legacy)
│   ├── uploads/              # images referenced by _posts/ MDX
│   ├── review-image/         # review screenshots
│   ├── _redirects            # one /faq rule
│   └── llms.txt, site.webmanifest, browserconfig.xml
└── src/
    ├── middleware.js         # /home → /, / cache headers, rdt_cid, Reddit CAPI
    ├── enums.js              # BlockTypes for the flow renderer
    ├── app/                  # App Router: one folder per route
    │   ├── layout.js         # RootLayout: global.scss, noindex off-prod, TrackingCookies, AppProvider
    │   ├── providers.js      # AppProvider: full-page-load link interception, UTM, Zaraz, chat
    │   ├── not-found.js, sitemap.js, robots.txt/route.js
    │   ├── api/track-variant/route.js   # the only internal API route
    │   ├── lib/              # page data loaders: <area>-data.js → get<Page>PageData()
    │   ├── components/       # route-scoped components (newer tree): navbar/, home/, integrations/,
    │   │                     #   automations/, mcp/, embed/, support/, feedback/, VariantTracker/ …
    │   ├── developers/       # self-contained /developers sub-app (own layout, fonts, Header/Footer)
    │   ├── embed/, migration/, lifetime-deal/, hire-an-expert/   # pages with sections beside page.js
    │   ├── page.js, home/, front-page/   # old homepage tree: builds, never renders (C-01)
    │   └── <route>/page.js   # every other route (see 05-navigation)
    ├── components/           # older shared components (pre-App-Router tree)
    │   ├── IntegrationsComp/
    │   │   ├── addToProduct/ # homepage design in Next: /integrations, /features, /use-cases,
    │   │   │                 #   /new-direction (copy.js, SiteChrome.js, addToProduct.module.scss)
    │   │   └── integrationsAppOneComp/, integrationsAppTwoComp/, IntegrationsBetaComp/ …  # legacy pages
    │   ├── ConditionalLayout/   # ConditionalNavbar/Footer (hide on integration subdomains)
    │   ├── footer/, faqSection/, metaHeadComp/, headComp/, pricing/, mcpComps/, breadcrumb/ …
    │   └── uiComponents/buttons.js   # LinkButton / LinkText
    ├── utils/                # axiosCalls.js (HTTP layer), getData.js (table getters), UTM,
    │                         #   redirect, tracking, mwExperiment.js, and slug-parsing helpers
    ├── const/                # tables.js (table ids), fields.js (column lists), abTest.js, integrations.js
    ├── hooks/                # useTemplateIds.js, useTemplateFilters.js
    ├── data/categories.json  # static category list for the legacy integrations search
    └── scss/                 # legacy global styles (global.scss imports the partials)
```

## Placement Rules

Where each kind of change goes. The rules come from existing patterns and from the root [AGENTS.md](../AGENTS.md) rules they cite. The module boundaries are in [ARCHITECTURE](ARCHITECTURE.md#major-modules--responsibilities), and the hard rules in [AGENTS](AGENTS.md).

| New … | Goes in | Rule / evidence |
|---|---|---|
| Page | `src/app/<route>/page.js`, as an async server component | It must `export const runtime = 'edge'` (AGENTS rule 4). Never name a route folder `index` ([DECISIONS](DECISIONS.md#lessons-learned--incident-log) incident 4). Render the navbar and footer of its design system ([05-navigation](05-navigation.md#navigation-model)), and pass its own path as `utm` (rule 7). Add a route without params to `src/app/sitemap.js:STATIC_ROUTES`, and add every route to the [route map](05-navigation.md#top-level-routes). |
| Page data loader | `src/app/lib/<area>-data.js`, exporting `get<Page>PageData()` | One loader per page, with its getters in a `Promise.all` (see `src/app/lib/pricing-data.js:getPricingPageData`). Small one-off pages share `src/app/lib/data.js`. |
| table-api read (content database) | a getter in `src/utils/getData.js` that calls `src/utils/axiosCalls.js:getDataFromTable` | AGENTS rule 5. The page reaches the getter only through its loader. |
| table-api write, a new database, or a plug-service call | its own function in `src/utils/axiosCalls.js` (axios, `auth-key` from env, `sendErrorMessage` on failure) | AGENTS rules 5 and 6. Never call raw `fetch` from a page or component, and never import `axiosCalls.js` into a `'use client'` file. |
| Table id / column list | `src/const/tables.js` / `src/const/fields.js` | AGENTS rule 6. The table catalog is in [database/entities](database/entities.md). |
| Env var | read as `process.env.NEXT_PUBLIC_*` in `src/utils/axiosCalls.js` (or `src/middleware.js`), and listed in [DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference) | A new database uses a `NEXT_PUBLIC_DB_ID_<NAME>` / `NEXT_PUBLIC_DB_KEY_<NAME>` pair (AGENTS rule 6). Everything `NEXT_PUBLIC_*` ships to the browser. | <!-- verify:ignore -->
| Section used by one route | beside its `page.js` (`src/app/migration/n8n/N8nHero.js`, `src/app/embed/app-integration/HeroAurora.js`, `src/app/lifetime-deal/LifetimeDealClient.js`) or in `src/app/components/<area>/` | Keep the copy as constants at the top of the file (AGENTS rule 14). The interactive half is a `<Name>Client.js` next to its server parent ([ARCHITECTURE](ARCHITECTURE.md#rendering-strategy--boundaries)). |
| Component shared across routes | `src/app/components/<area>/` (for example `src/app/components/SecuritySection.js`, `src/app/components/blog/BlogGrid.js`, `src/app/components/home/ShowBadges.js`) | Inferred: most components added since the App Router migration live here. Small generic UI goes in `src/components/uiComponents/`. Edit the existing legacy components in `src/components/` in place, and check the catalog in [DESIGN](DESIGN.md#reusable-component-catalog) before adding a duplicate. |
| Homepage-design page or piece | `src/components/IntegrationsComp/addToProduct/` | Only for pages in that design. Its shared `copy.js` and SCSS module are an exception to AGENTS rule 14, so don't copy the pattern elsewhere (U-07). |
| `/developers` piece | `src/app/developers/**` | No `@/` imports, only its own tokens and copy ([DESIGN](DESIGN.md)). |
| Homepage (`/`) change or asset | `public/new-home/index.html`, `styles.css`, `main.js`, `public/new-home/assets/` | Never `src/app/page.js` (AGENTS rule 3). Reference assets as `/new-home/assets/…`, and bump the `?v=` query on `styles.css`/`main.js` after editing them ([14-performance](14-performance.md#rendering)). |
| Image for a React page | `public/assets/<kind>/` | `next/image` does not optimize, so compress the file first ([14-performance](14-performance.md#rendering)). |
| Redirect | `next.config.js` `redirects()` | Every current redirect lives there. Middleware holds only `/home`, and `public/_redirects` holds one legacy rule. Record the redirect in [05-navigation](05-navigation.md#redirects-rewrites-and-middleware), and never shadow a path that another deployment serves (AGENTS rule 15). |
| Internal API route | `src/app/api/<name>/route.js` with `runtime = 'edge'` | See [12-api-guidelines](12-api-guidelines.md) and [api/](api/track-variant.md). |
| Tracking or analytics event | `src/utils/trackVisitor.js` (`trackCtaClick`, `trackInteraction`) and `[data-track]` attributes | AGENTS rules 7, 10 and 12. The event contracts are in [CONTRACTS](CONTRACTS.md#analytics--telemetry-event-contracts). |
| Middleware experiment client | `src/utils/mwExperiment.js` | One module. A page imports `mwVariant` and `mwSend`. Do not copy the snippet into a layout or into `public/new-home/`, and do not send an event until a page runs an experiment. Contract: [CONTRACTS](CONTRACTS.md#middleware-experiments). |
| Styles | Tailwind utilities, with tokens and keyframes in `tailwind.config.js` | AGENTS rule 14. `src/scss/` is legacy, so add nothing there unless Tailwind cannot do it. |
| Knowledge | the doc that owns the concern ([docs/README](README.md) has the map) | Update it in the same change, and bump the doc's frontmatter commit and date. |

## Recipe: Add a New Page

The placement rules above in order, for a new content route such as `/partners`:

1. **Route:** `src/app/partners/page.js`, an async Server Component with `export const runtime = 'edge'` and `generateMetadata`. Interactive parts go in a `'use client'` child (`PartnersClient.js`) with its copy as constants at the top ([09-coding-guidelines](09-coding-guidelines.md)). <!-- verify:ignore -->
2. **Data:** table id in `src/const/tables.js`, columns in `src/const/fields.js`, a getter in `src/utils/getData.js`, and a `getPartnersPageData()` loader in `src/app/lib/` that runs its getters in one `Promise.all`. Pass rows down as props; never fetch from the client ([database/entities](database/entities.md), [docs/AGENTS.md §2](AGENTS.md#2-server-vs-client-boundaries)). <!-- verify:ignore -->
3. **Metadata:** `getMetaData('/partners')` looks up the row whose `name` is the path in the table-api meta table (`getMeta`, table `tbl2bk656`). Ask the content owner to add that row; without it the page uses the fallback strings in `generateMetadata`. <!-- verify:ignore -->
4. **Chrome and attribution:** render the navbar and footer of the design system the page belongs to ([05-navigation](05-navigation.md#navigation-model)), and give CTAs `utm_source=/partners` (AGENTS rule 7).
5. **SEO:** add the path to `src/app/sitemap.js` `STATIC_ROUTES`, and to `public/llms.txt` if it is a product page.
6. **Docs, same change:** the route in [05-navigation](05-navigation.md#top-level-routes); the page in the module doc for its feature area, or a new `docs/modules/NN-<area>.md` cloned from `_TEMPLATE.md` and listed in [docs/README.md](README.md#project-overview) if no area fits; the table in [database/entities](database/entities.md); any env var in [DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference).
7. **Verify:** the checklist in [DEVELOPMENT](DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist) and [22-definition-of-done](22-definition-of-done.md).
