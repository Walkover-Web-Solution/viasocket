---
covers: ["src/app/features/**", "src/app/use-cases/**", "src/app/new-direction/**", "src/app/lib/feature-data.js", "src/app/components/features/**", "src/components/IntegrationsComp/addToProduct/FeaturesPage.js", "src/components/IntegrationsComp/addToProduct/UseCasesPage.js", "src/components/IntegrationsComp/addToProduct/LetterPage.js", "src/components/IntegrationsComp/addToProduct/UseCaseGrid.js", "src/components/IntegrationsComp/addToProduct/FeatureVisuals.js", "src/components/IntegrationsComp/addToProduct/SiteChrome.js", "src/components/IntegrationsComp/addToProduct/CopyPrompt.js", "src/components/IntegrationsComp/addToProduct/copy.js", "src/components/IntegrationsComp/addToProduct/addToProduct.module.scss"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Module: Features, Use Cases and the Founders' Letter

The pages that explain the integration-layer product in the homepage design: `/features`, `/use-cases` and `/new-direction`. The older table-driven `/features/[...feature]` pages also live here. The integrations pages built on the same `addToProduct` components are module [02](./02-integrations-directory.md).

## Purpose
- `/features` answers "what does the integration layer give my product or agent?" in four groups: `connect`, `customers`, `ai` and `reliability` (`src/components/IntegrationsComp/addToProduct/copy.js:FEATURES_COPY`).
- `/use-cases` answers "what can I build?" with cards. Each card copies a ready prompt.
- `/new-direction` is the founders' letter on why viaSocket moved from the workflow editor to an integration and action layer. Since `b3a7ab32` (2026-10-20) it is also where `/help` and most `/help/*` paths 301 to (see [DECISIONS ADR-011](../DECISIONS.md)).

---

## Business Value
- The letter is the repo's main **approved-direction** source for the integration-layer positioning (see [VISION](../VISION.md)). Changing its copy changes the stated product direction, so treat edits as product decisions.
- Every screen leads with "Copy setup prompt", which sends the visitor's coding agent to flow.viasocket.com/documentation/skill.md (`src/components/IntegrationsComp/addToProduct/copy.js:BASE_PROMPT`). That is the funnel these pages serve. *Inferred* from the CTA order, since no metric is recorded ([OPEN_QUESTIONS P-02](../OPEN_QUESTIONS.md#active-questions-table)).

---

## Navigation Flow
1. Visitors arrive from the homepage header and footer (`Features`, `Use cases`), from `SiteHeader`/`SiteFooter` on the other `addToProduct` pages, or through a retired `/help` URL (→ `/new-direction`).
2. They copy the setup prompt (hero, footer, or the end of the letter) or a use-case prompt, or click "Talk to an expert" (`FEATURES_COPY.expertUrl`, `USECASES_COPY.expertUrl`: `/experts-are-live`, see [module 08](./08-campaign-and-program-pages.md)).
3. They leave via "Start free" or "Log in" (flow.viasocket.com/integrations), "Pricing" (`/developers/pricing`, [module 04](./04-developers-embed.md)) or "Book a demo" (cal.id). The journey is [FLOWS journey 7](../FLOWS.md#core-user-journeys-map). Why these CTAs carry no `utm_source` is covered in [FLOWS](../FLOWS.md#4-alternative-branches) and [OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md#active-questions-table).

---

## Screens
### 1. Features (`src/app/features/page.js` → `src/components/IntegrationsComp/addToProduct/FeaturesPage.js:FeaturesPage`)
- Static `metadata` from `FEATURES_COPY` (`metaTitle`, `metaDesc`), with `alternates.canonical` set to https://viasocket.com/features.
- Sections: `FaqJsonLd` (FAQPage JSON-LD), `SiteHeader`, hero (`h1`, `sub`, `CopyPromptButton`, expert link), one `FeatureGroup` per `FEATURES_COPY.groups` entry, `BlogPosts`, `FaqSection`, `SiteFooter`.
- In a group, a `big` card holds an illustration chosen by key from `src/components/IntegrationsComp/addToProduct/FeatureVisuals.js:VISUALS` (`auth`, `tenant`, `agent`, `chatbot`, `browser`). The `featured` group gives every card a visual.
- Data: only the blog cards are fetched, through `src/utils/axiosCalls.js:getActionLayerBlogs` (Action Layer RSS feed, 1-hour cache). Everything else is `copy.js`.

### 2. Use cases (`src/app/use-cases/page.js` → `src/components/IntegrationsComp/addToProduct/UseCasesPage.js:UseCasesPage`)
- Sections: `FaqJsonLd`, `SiteHeader`, hero, `UseCaseGrid`, `FaqSection`, `SiteFooter`. There is no data fetch.
- `src/components/IntegrationsComp/addToProduct/UseCaseGrid.js:UseCaseCard` copies `` `${c.prompt}\n\n${BASE_PROMPT}` `` when clicked. Cards come from `USECASES_COPY.cases` (14 entries); their app icons are URLs in the `ICONS` map in `copy.js`.

### 3. Founders' letter (`src/app/new-direction/page.js` → `src/components/IntegrationsComp/addToProduct/LetterPage.js:LetterPage`)
- Metadata sets `authors` and an `article` OpenGraph type whose image is the first author's photo (`LETTER_COPY.authors[0].photo`, under `public/new-home/assets/`).
- Body: `LETTER_COPY.body` is a list of `[type, value]` blocks rendered by `Block` (`p`, `strong`, `quote`, `h2`, `list`). The signatures use `next/font/google` Caveat. It ends with a `CopyPromptButton`.
- There is no data fetch.

### 4. Legacy feature pages (`src/app/features/[...feature]/page.js` → `src/app/components/features/FeaturesClient.js:FeaturesClient`)
- `/features/<slug>` (for example `/features/variables`, the target of the `/variables` redirect in `next.config.js`) loads `src/app/lib/feature-data.js:getFeaturesPageData`. That loader reads the features table by `slug`, plus navbar, footer, meta and blog rows tagged `feature`.
- Renders the older daisyUI components: `FeatureBannerComp`, `FeatureGridComp`, `AutomationIdeasSection`, `FeatureContentComp` (FAQs), `BlogGrid`, `FeaturesFooterComp`.
- The `!featureSlug` branch (`getAllFeatures`) appears unreachable now. `/features` itself is served by `src/app/features/page.js`, and a non-optional catch-all always has at least one segment (*inferred* from the routing).

---

## UI Components
- Feature-specific: `FeaturesPage`, `UseCasesPage`, `LetterPage`, `UseCaseGrid`, `FeatureVisuals` (`OAuthDemo`, `AgentDemo`, `AIDemos`), `RotatingWord`, `icons.js` (`FeatureIcon`, `Logo`, `SOCIAL`).
- Shared within `addToProduct`: `SiteHeader`, `SiteFooter`, `BlogPosts`, `FaqSection` (`SiteChrome.js`); `CopyPromptProvider`, `CopyPromptButton` and `useCopyPrompt` (`CopyPrompt.js`). Props and usage are in the [DESIGN catalog](../DESIGN.md#reusable-component-catalog); tokens are under [DESIGN: Homepage system in Next](../DESIGN.md#homepage-system-in-next-addtoproductmodulescss).
- All styling is the CSS module `addToProduct.module.scss` with the Geist fonts from the `geist` package. These pages use no Tailwind. Whether this pattern is accepted is [OPEN_QUESTIONS U-07](../OPEN_QUESTIONS.md#active-questions-table).

> [!WARNING]
> `SiteChrome.js` and `copy.js` (`NAV`, `FOOTER_GROUPS`, `BASE_PROMPT`) are **hand copies** of `public/new-home/index.html` (header, footer, `#promptText`). A change to the homepage nav, footer or setup prompt must be made in both places. Nothing keeps them in sync.

> [!WARNING]
> `FEATURES_COPY` is commented "Kept word for word with the approved copy" (`copy.js`). Do not reword it without a product request.

---

## Data Dependencies
1. **Action Layer blog feed:** `src/utils/axiosCalls.js:getActionLayerBlogs` reads the production feed from every environment ([OPEN_QUESTIONS S-05](../OPEN_QUESTIONS.md#active-questions-table)). Only `/features` uses it. See [table-api / feeds](../current-infrastructure/table-api.md).
2. **table-api (legacy `/features/<slug>` only):** `src/utils/getData.js:getFeatureData` (the `ALLFEATURES` table), `getNavbarData`, `getFooterData`, `src/utils/getMetaData.js:getMetaData`, `src/utils/getBlogData.js:getBlogData`. Table columns are in [database/entities](../database/entities.md).
3. **Constants:** everything else is `src/components/IntegrationsComp/addToProduct/copy.js` (`FEATURES_COPY`, `USECASES_COPY`, `LETTER_COPY`, `BASE_PROMPT`, `NAV`, `START_URL`, `FOOTER_GROUPS`).

---

## State Management
- **Server state:** none on `/use-cases` and `/new-direction`. `/features` fetches blogs once per request. The legacy pages also read the `prod` cookie through `src/app/lib/getAuth.js:getHasToken`.
- **Client state:** `CopyPromptProvider` holds the toast and the "copy by hand" fallback text (`manual`), and `CopyPromptButton` holds a 2.4 s `done` flag. Nothing is persisted, and these pages write no cookies.

---

## API Dependencies
- None of the site's own routes. The outbound read is the RSS feed above; the legacy page reads table-api rows. Contracts are in [CONTRACTS](../CONTRACTS.md).

---

## Loading / Empty / Error States
- **Loading:** no `loading.js` exists. A navigation shows `AppProvider`'s full-page skeleton ([ARCHITECTURE](../ARCHITECTURE.md#rendering-strategy--boundaries)). <!-- verify:ignore -->
- **Empty:** `BlogPosts` renders nothing when the feed returns no posts.
- **Error:** the copy prompt falls back to a selectable `<textarea>` dialog when `navigator.clipboard.writeText` throws. The legacy `/features/<slug>` page renders an inline "Page Not Found" with **HTTP 200** when `getFeaturesPageData` throws. An unknown slug gets `featureData: {}` and renders an empty feature page, not a 404 (*observed in code*).

---

## Development Tasks (Next Phases)
- [ ] Decide whether `/use-cases` and `/new-direction` join `src/app/sitemap.js:STATIC_ROUTES` ([OPEN_QUESTIONS U-08](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Decide whether the "Start free" CTA should tag `utm_source` with the page path ([OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Confirm the `addToProduct` SCSS-module plus shared `copy.js` pattern ([OPEN_QUESTIONS U-07](../OPEN_QUESTIONS.md#active-questions-table)) and whether the legacy `/features/<slug>` pages stay (new question in M2 notes).
