---
covers: ["src/**", ".prettierrc", ".prettierignore", "jsconfig.json"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 09 Coding Guidelines

How code is written in this repo. Visual rules (tokens, which visual system a page uses, components) live in [DESIGN](DESIGN.md). The short hard rules are in the root [AGENTS.md](../AGENTS.md#project-rules--boundaries); this file adds the detail behind the coding ones and links rather than repeating them.

## Language & Style

- **Plain JavaScript, no TypeScript.** `src/` has 431 `.js` files and one `.jsx` (`src/utils/ExternalLink.jsx`). There are no `.ts` files, no PropTypes, no ESLint config, no typecheck and no tests ([DEVELOPMENT](DEVELOPMENT.md)). <!-- verify:ignore -->
- **Formatter config exists but is not enforced.** `.prettierrc` (Prettier `3.2.5` in devDependencies):

  ```json
  { "singleQuote": true, "trailingComma": "es5", "tabWidth": 4, "semi": true,
    "bracketSpacing": true, "printWidth": 120, "quoteProps": "preserve" }
  ```

  `.prettierignore` lists only `build`, `coverage`, `/node_modules`, `/.pnp`, `.pnp.js`, `/.next/`, `/out/`. `husky` and `lint-staged` are installed but have no hook or config, so nothing runs on commit ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) D-08). Write new lines in the `.prettierrc` style (4 spaces, single quotes, semicolons, 120 columns); inside an existing file, match that file. <!-- verify:ignore -->
- **Imports:** the `@/` alias maps to `src/` (`jsconfig.json`: `"@/*": ["./src/*"]`). Both styles are live: 139 files use `@/`, 76 use `../` relative paths, often mixed in one file (`src/app/support/page.js` imports `@/components/footer/footer` and `../lib/support-data` (that is, `src/app/lib/support-data.js`)). Prefer `@/` for new imports across top-level folders; don't rewrite existing ones. No import ordering is enforced; observed order is framework (`next/*`, `react`), then libraries, then local. <!-- verify:ignore -->
- **`'use client'`** is the first line, single-quoted in 172 files (7 use double quotes).
- **File naming (observed, not enforced):**

  | Kind | Convention | Examples |
  |---|---|---|
  | Newer components (`src/app/**`, `src/components/IntegrationsComp/addToProduct/`, `src/app/developers/`) | PascalCase file = component name | `src/app/components/support/SupportClient.js`, `src/components/footer/NewFooter.js` |
  | Older shared components (`src/components/**`) | camelCase file in a camelCase folder, often with a `Comp` suffix | `src/components/faqSection/faqSection.js` (exports `FAQSection`), `src/components/metaHeadComp/metaHeadComp.js` |
  | Utils and constants | camelCase | `src/utils/handleUtmSource.js`, `src/const/tables.js`; exception `src/utils/SendErrorMessage.js` |
  | Page data loaders | kebab-case `src/app/lib/*-data.js` | `src/app/lib/pricing-data.js`, `src/app/lib/support-data.js` |
  | Route folders | kebab-case | `src/app/workflow-automation-ideas/`, `src/app/hire-an-expert/` |

  New components use PascalCase. **Keep legacy misspellings**: `src/utils/getInterationsInfo.js` and `src/components/chat-widget/chat-wdget.js` are imported by those names (`src/app/lib/integration-data.js`, `src/app/providers.js`); renaming them is churn outside any request (Rule 1).

## Component Conventions

- **Server `page.js`, client child.** No `page.js` contains `'use client'`. A page is an `async` server component that loads data, exports `generateMetadata`, and hands plain props to one `*Client` child that owns state and events. Reference shape: `src/app/support/page.js` → `src/app/components/support/SupportClient.js`. Other pairs: `AutomationsClient`, `AutomationSlugClient`, `DepartmentClient`, `FeaturesClient`, `LifetimeDealClient`, and the older `*ClientComp` files (`src/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneClientComp.js`). Pages with no interactive state render server components directly (`src/app/features/page.js` → `FeaturesPage`).
- **`export const runtime = 'edge'`** in every dynamic `page.js` and `route.js` (50 files). `next build` passes without it; the Cloudflare build does not. Only `src/app/lifetime-deal/success/page.js` and `src/app/agency-partner/success/page.js` omit it ([AGENTS](../AGENTS.md#project-rules--boundaries) Rule 4, [DECISIONS ADR-001](DECISIONS.md#adr-001-cloudflare-pages-via-next-on-pages-with-the-edge-runtime)).
- **Data loading:** a page calls one loader in `src/app/lib/*-data.js` (for example `src/app/lib/support-data.js:getSupportPageData`), which calls getters in `src/utils/getData.js` / `src/utils/axiosCalls.js`. Components do not fetch content themselves. The table-api path is [AGENTS](../AGENTS.md#project-rules--boundaries) Rule 5; contracts are in [CONTRACTS](CONTRACTS.md).
- **Copy lives as module constants in the component file** (maintainer rule). `src/components/footer/NewFooter.js` is the reference shape: `SOCIALS`, `GROUPS`, `COLUMNS`, `LEGAL`, `TAGLINE`, `COPYRIGHT`, `ENTITY`, `WORDMARK` sit above `export default function NewFooter()`, so editing the footer's words means opening one file. `src/app/developers/Header.js:NAV` and `src/app/components/navbar/NavbarOptimized.js` (`navItems`) follow it. Do not create a central content module.
  - Exception 1: `src/app/front-page/content.js`, shared so `src/app/front-page/seo.js:schemaGraph` can build JSON-LD from the visible copy (dormant tree).
  - Exception 2: `src/components/IntegrationsComp/addToProduct/copy.js` holds approved word-for-word copy for all five `addToProduct` pages, which build FAQ JSON-LD from it. Whether this is accepted is [OPEN_QUESTIONS](OPEN_QUESTIONS.md) U-07; don't copy the pattern elsewhere.
  - A figure rendered in two places ("2,300+") gets a comment at each copy naming the other ([DESIGN](DESIGN.md#website-messaging--copy-guidelines)).
- **Styling, how to write it.** The visual rule (Tailwind-first, prefixed tokens) is in [DESIGN](DESIGN.md#visual--interaction-principles). In code:
  - Reach for Tailwind 3 features before a stylesheet: arbitrary values (`text-[clamp(17px,1.5vw,20px)]` in `src/app/developers/Hero.js`), arbitrary properties, arbitrary and `data-*` variants, and CSS variables inside arbitrary values.
  - Custom CSS (`.scss`, `.module.scss`, `<style>`, inline `style`) only for what Tailwind cannot express: `@font-face`, third-party font `@import`, multi-layer backgrounds, ancestor `:has()` (`src/app/front-page/index-theme.scss`, `src/app/developers/fonts.scss` state this in their comments). <!-- verify:ignore -->
  - Don't add rules to `src/scss/`; it predates the rule and reaches every legacy page.

## Do / Don't

- **Do** keep the diff to the lines the request needs ([DECISIONS ADR-013](DECISIONS.md#adr-013-working-conventions-maintainer-guidance)).
- **Do** match the density and idiom of surrounding code.
- **Don't** run Prettier or any formatter repo-wide or over files you didn't otherwise change: about 221 of 471 `src` files would be rewritten ([DEVELOPMENT](DEVELOPMENT.md)). A past 43-file sweep got a whole session reverted. <!-- verify:ignore -->
- **Don't** add a second library for a concern already covered:

  | Concern | Library | Where |
  |---|---|---|
  | Icons | `lucide-react` | brand marks are inline SVG instead ([DESIGN](DESIGN.md#icons-and-images)) |
  | Markdown rendering | `react-markdown` | `src/app/components/home/ResultSectionOptimized.js`, `src/app/components/automations/AutomationSlugClient.js` |
  | Marquee | `react-fast-marquee` | `src/components/marqueeComponent/marqueeComponent.js`, `src/components/departmentFAQ/DepartmentAppsMarquee.js` |
  | Phone parsing | `google-libphonenumber` | `src/components/phoneInput/phoneInput.js` |
  | Pagination | `react-paginate` | `src/app/components/experts/AgencyList.js` |
  | Animation | CSS / Tailwind keyframes, `src/app/developers/useReveal.js:useReveal` | `motion` is imported only by the dormant `src/app/components/new-home/FeaturesBanner.js`; don't spread it |
  | HTTP | `axios` + `axios-cache-interceptor` via `src/utils/axiosCalls.js` | no raw `fetch` in pages or components |

- **Don't** import `src/utils/axiosCalls.js` into a `'use client'` file: it carries the table-api keys. Three files already do (`src/app/components/home/SearchInputHomeOptimized.js`, `src/app/components/integrations-script/TemplatePreview.js`, `src/components/indexComps/CategoryAppsDisplay.js`); that is debt ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) S-01), not a pattern.
- **Don't** add `www` handling to host checks or URLs; the domain is bare `viasocket.com` (Rule 11).
- **Don't** hardcode endpoints, database ids or keys; compose them from env vars (Rule 6; names in [DEVELOPMENT](DEVELOPMENT.md)).
- **Don't** use `next/head`; it renders nothing in the App Router ([DESIGN](DESIGN.md#seo--metadata-expectations)).

## Comments

Comments explain **why**, especially constraints that the code cannot show: platform behaviour, an incident, a contract. Write them in full sentences next to the code they justify. Reference examples:

- `src/middleware.js`: why visitor cookies are set in the browser (Cloudflare strips `Set-Cookie` from HTML it handles) and why both `Cache-Control` and the CDN header are sent.
- `src/app/api/track-variant/route.js`: JSDoc blocks on each helper state what the browser may decide, why duplicates within a window collapse, and why the route always answers 200.
- `src/components/footer/NewFooter.js`: why brand marks are inline SVG instead of hotlinks.

Don't add comments that restate the code (`// Redirect /home → /` is the existing low end). When you keep two copies of a value in sync, the comment naming the other copy is required.
