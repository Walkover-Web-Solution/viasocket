---
covers: ["tailwind.config.js", "postcss.config.js", "src/scss/**", "src/components/**", "src/app/components/**", "src/app/layout.js", "src/app/lib/share-image.js", "src/app/og/**", "src/app/providers.js", "src/app/sitemap.js", "src/app/front-page/index-theme.scss", "src/app/developers/**/*.scss", "src/app/developers/*.js", "public/new-home/**", "public/llms.txt"]
verified_at: 5b278556
verified_on: 2026-10-30
---
# Design System & UI Standards

The site does not have one design system yet. It has **five visual systems**, and each one has its own token source. Find out which one a page belongs to before you style anything.

> [!NOTE]
> **Target (U-01, decided, team answers to OPEN_QUESTIONS 2026-10-22):** the static homepage's system is the target for the whole site: Geist and Geist Mono, its colour tokens, square corners, and light/dark following the OS. The full rules are in the external "viaSocket Brand Guidelines" doc. New and reworked pages converge on it, expressed as Tailwind tokens ([DECISIONS ADR-016](DECISIONS.md#adr-016-the-static-homepages-design-system-is-the-site-wide-target)).

The five systems today:

| System | Where it renders | Token source | Fonts | Dark mode |
|---|---|---|---|---|
| **Legacy site** | Most Next.js routes: `/pricing`, app-pair pages `/integrations/<app>/<app2>`, `/integrations/<app>?status=disconnected`, `/features/{slug}`, `/automations`, `/departments`, `/support`, `/experts`, legal pages, campaign pages | daisyUI theme in `tailwind.config.js` + SCSS globals in `src/scss/` + CSS vars in `src/scss/_variables.scss` and `src/scss/newtheme.scss` | Inter Tight | None (light only) |
| **Static homepage** | `/` only (served from `public/new-home/`, see [ARCHITECTURE](ARCHITECTURE.md#request-path-cloudflare-pages)) | CSS custom properties at the top of `public/new-home/styles.css` | Geist, Geist Mono | Yes, follows `prefers-color-scheme` |
| **Homepage system in Next (`addToProduct`)** | `/integrations`, `/integrations/category/*`, `/integrations/{app}`, `/features`, `/use-cases`, `/new-direction` | CSS custom properties on `.root` in `src/components/IntegrationsComp/addToProduct/addToProduct.module.scss` (a re-implementation of the static homepage's tokens, not an import of them) | Geist, Geist Mono (`geist` package); Caveat for the letter's signatures | Yes, follows `prefers-color-scheme` |
| **/developers** | `/developers`, `/developers/auth`, `/developers/pricing`, `/developers/docs` | `dev-*` and `docs-*` color/font families in `tailwind.config.js` | Albert Sans, JetBrains Mono | None (light only, on purpose) |
| **front-page (`index-*`)** | Not rendered anywhere today. It was the A/B variant B of `src/app/page.js`, which the `/` rewrite now hides | `index-*` colors, font sizes, spacing, shadows and keyframes in `tailwind.config.js` | Instrument Serif, DM Sans | None |

**Where each design concern lives in this file:** Tokens → [Design Tokens & Styling Primitives](#design-tokens--styling-primitives) · Typography → [Typography](#typography) · Theming (light/dark) → [Theming](#theming-light-and-dark-per-visual-system) · Component primitives → [Reusable Component Catalog](#reusable-component-catalog) · Voice & copy → [Website Messaging & Copy Guidelines](#website-messaging--copy-guidelines) · Examples → [Representative Examples](#representative-examples). How code is written (copy placement, file naming, server/client split) is in [09-coding-guidelines](09-coding-guidelines.md).

Styling stack: Tailwind 3.4 (`tailwindcss` ^3.4.16) with the daisyUI 4 plugin (`daisyui` ^4.7.2, 4.12.24 installed), plus Sass (`sass` ^1.69.4) for globals and per-component CSS modules (`src/**/*.module.scss`). PostCSS runs only `tailwindcss` and `autoprefixer` (`postcss.config.js`). The site has no component library such as Radix or shadcn and no CSS-in-JS. `next/font` is used only by the `addToProduct` pages (`geist/font/sans`, `geist/font/mono`, and `Caveat` from `next/font/google` in `LetterPage.js`).

## Visual & Interaction Principles

1. **Tailwind utilities first.** The look of a page is expressed in Tailwind utilities, and reusable tokens, keyframes and animations live in `tailwind.config.js` under `theme.extend`. The newer code follows this (commit `d0dff32c` rebuilt /developers "as native Next.js/Tailwind"); most of the older SCSS in `src/scss/` predates it. The `addToProduct` pages (October 2026) are styled almost entirely by one 649-line CSS module; whether that is accepted is [OPEN_QUESTIONS](OPEN_QUESTIONS.md) U-07. When custom CSS is allowed, and how to write utilities instead, is in [09-coding-guidelines](09-coding-guidelines.md#component-conventions). <!-- verify:ignore -->
2. **New tokens are scoped by page prefix, never global.** `index-*`, `dev-*` and `docs-*` each belong to one route family, so a new page's palette cannot leak into old pages. Follow the same pattern: add `<prefix>-*` keys under `theme.extend.colors` / `fontFamily` / etc. Do not change the daisyUI theme, `src/scss/_variables.scss` or `src/scss/_fonts.scss`. Those files reach every legacy page.
3. **Motion resolves, then stops.** The `index-*` keyframes say this in their config comment. /developers uses `src/app/developers/useReveal.js:useReveal` (IntersectionObserver, plays once) instead of the `motion` package. Only `src/app/components/new-home/FeaturesBanner.js` imports `motion/react`, and that file is part of the dormant homepage chain. Newer components honour `prefers-reduced-motion` (`motion-reduce:` / `@media (prefers-reduced-motion: reduce)` in `src/app/developers/**` and `src/app/front-page/**`, and a `reduced` flag in `public/new-home/main.js`).
4. **Square, hairline, low-shadow look.** Legacy cards are bordered boxes with no radius: `border custom-border`, `.modal-box { border-radius: 0 }`, and `rounded-none` on modals. The static homepage's stylesheet header says "calm, square" and reserves green for live and success states. /developers reserves `dev-ok` green for verified/succeeded states only.

## Design Tokens & Styling Primitives

### Theming (light and dark per visual system)

No page has a theme toggle; dark mode, where it exists, follows the OS setting only.

| System | Mechanism | Where the dark values live |
|---|---|---|
| Legacy site | One custom daisyUI theme named `light`, selected by `data-theme="light"` on `<html>` (`src/app/layout.js`) | none |
| Static homepage | `@media (prefers-color-scheme: dark)` redefines the `:root` tokens | `public/new-home/styles.css` |
| `addToProduct` pages | `prefers-color-scheme: dark` block redefines the `.root` tokens | `src/components/IntegrationsComp/addToProduct/addToProduct.module.scss` |
| /developers (light on purpose), front-page | Light only | none |

To add dark support to a light-only system, follow the homepage pattern (tokens as CSS variables, one media block), and only as its own request: it changes appearance on every page of that system.

### Legacy site (daisyUI + SCSS)

- **Theme:** `<html lang="en" data-theme="light">` in `src/app/layout.js`. `tailwind.config.js` defines a single custom daisyUI theme named `light`:

  | daisyUI key | Config value | What it renders as | Used via |
  |---|---|---|---|
  | `primary` | `'#0000'` | `--p: 0% 0 0` in the built CSS, i.e. **opaque black** (daisyUI drops the alpha) | `btn-primary` (~7 files), `bg-primary` |
  | `primary-content` | `#ffffff` | white | |
  | `accent` | `#A8200D` (brand red) | | `btn-accent` (~57 files: the main CTA), `text-accent` (~99), `bg-accent` (~39) |
  | `secondary` / `neutral` | `#f5f5f5` / `#fafafa` | | rare |
  | `--rounded-btn` | `0.0px` | overridden, see the warning below | |

- **CSS variables:** `src/scss/_variables.scss` defines `--custom-border` (gray-200), `--accent-border-color` (`#a8200d`), `--flow-border-color`, `--black-color` (`#0a0a0a`), `--border-color`, `--bg-surface`, `--bg-section`, `--shadow-container`. `src/scss/newtheme.scss` defines `--vs-*` (headline, body, muted, accent `#2563eb`, and the card variables used by `.vs-showcase-card`). `src/scss/_blog.scss` defines `--col-*` / `--c-fs-*`.
- **Base type:** `src/scss/_fonts.scss` sets `body { font-family: 'Inter Tight'; color: #252525; background-color: #FAF9F6 }`. `src/scss/global.scss` applies `font-inter-tight` to every `h1` in `@layer base`.
- **Heading classes (SCSS, not Tailwind):** `.h1` (`text-4xl md:text-6xl`, weight 600), `.h2` (fluid 24 to 38px, weight 500), `.h3`, `.h6`, `.sub__h1`, `.sub__h2`. The newer `.heading1` (36 / 48 / 57px), `.heading2`, `.sub-heading1` and `.sub-heading2` are also in `_fonts.scss`. Pages use `className="h1"` / `"h2"` on real `<h1>`/`<h2>` elements, for example `src/components/pricing/PricingHeroSection.js` and `src/components/faqSection/faqSection.js`.
- **Layout classes:** `.container` is **redefined** in `src/scss/_custom.scss`: `max-width: 1560px`, centred, with `px-12`, then `px-6` at 780px or less, then `px-4` at 480px or less. About 144 files use it. Other layout classes: `.cont` (flex column, plus `cont__py`, `cont__gap`, `cont__w`), `.py-container` (responsive vertical padding), `.section` / `.section-container` (`newtheme.scss`), and `.global-top-space` (`global.scss`: 48px top padding, 88px at 1024px and up, to clear the fixed navbar; used in 37 files).
- **Button classes:** daisyUI `btn` + `btn-accent` / `btn-outline` is the dominant pattern. SCSS adds `.primary-button`, `.secondary-button` and `.outline-button` (`_custom.scss`), `.link-btn` with an animated arrow (`_custom.scss`, rendered by `LinkButton` / `LinkText`), and `.hover-arrow-cta` (`newtheme.scss`).
- **Utility-looking SCSS classes:** `.custom-border` (68 files), `.text-link` (`#4485f2`), `.dotted-background`, `.no-scrollbar`, `.glass-card`, `.chip`, and others. See the warning below about the ones that share Tailwind names.

> [!WARNING]
> **Global SCSS silently overrides Tailwind and daisyUI.** These rules come after `@tailwind utilities` in `src/scss/global.scss` and sit outside any `@layer`, so they win:
> - `src/scss/_utility.scss` redefines `.bg-white` and `.border-black` with `!important`. On an element that has `bg-white`, `hover:bg-black` and `md:bg-gray-100` never apply.
> - `src/scss/newtheme.scss` redefines `.transition-colors` and `.transition-shadow` as `transition` shorthands with a fixed 200ms duration. Any `duration-*` utility next to them is reset.
> - `#__next .btn` in `src/scss/global.scss` makes every daisyUI button a 50px-radius pill with a 45px minimum height, whatever `--rounded-btn: 0` says. Override it per element (for example `rounded-none`), not in the theme.
> - `#__next { overflow-x: hidden }` turns `#__next` into a scroll container, so `position: sticky` inside it never sticks. `src/app/front-page/index-theme.scss` undoes this for one page only, with `#__next:has(.index-page)`. Use the same scoped pattern if you need `sticky`.
> - `.text-6xl` has a forced `line-height: 81px !important` (`_custom.scss`).

### Static homepage (`public/new-home/styles.css`)

This is a separate, hand-written CSS design system, about 115 KB, with no Tailwind. Its tokens are the `:root` block at the top of the file. Every colour on the page is meant to come from them:
- Surfaces and ink: `--bg`, `--s1`..`--s3`, `--ink`, `--ink-2`..`--ink-4`, `--line`, `--line-2`, `--line-3`, `--tint-1`..`--tint-4`.
- Status and buttons: `--green` / `--green-soft` (live and success only), `--btn-bg`, `--btn-ink`, `--btn-hover`.
- Product-window mockups: `--win*`, `--fx-*`, `--pop`.
- Shadows: `--sh-win`, `--sh-pop`, `--sh-dlg`, `--sh-il`.
- Type: `--sans` (Geist), `--mono` (Geist Mono).
- Layout: `--wrap: min(1240px, 100% - 48px)`, `--sec-pad`, `--head-gap`, `--content-gap`.

A `@media (prefers-color-scheme: dark)` block redefines all of them (see [Theming](#theming-light-and-dark-per-visual-system)).

> [!WARNING]
> - Editing `public/new-home/styles.css` or `main.js` without bumping the `?v=` query in `public/new-home/index.html` (for example `styles.css?v=168`, `main.js?v=109`) can serve stale assets from cache. Every homepage commit bumps it (see `75d86c93`, `6fd93807`). <!-- verify:ignore -->
> - None of the Next.js components, Tailwind tokens or `global.scss` reach `/`. The live homepage's header, footer, FAQ and copy are in `public/new-home/index.html`. Editing `src/components/footer/NewFooter.js` or `src/app/components/navbar/NewHeader.js` does **not** change `/`.

### Homepage system in Next (`addToProduct.module.scss`)

- The module's header calls it "The viasocket.com homepage system (Geist, square corners, hairline rules, ink buttons)". `.root` redefines the static homepage's token names with the same light values (`--bg`, `--s1`..`--s3`, `--ink`..`--ink-4`, `--line*`, `--green*`, `--btn-*`, `--win*`, `--sh-win`, `--sh-dlg`, `--sec-pad`, `--head-gap`, `--content-gap`), plus `--w: 1240px`, and a `prefers-color-scheme: dark` block. `--sans`/`--mono` point at the `next/font` variables `--font-geist-sans`/`--font-geist-mono`, which each page puts on its root `div` (`GeistSans.variable`, `GeistMono.variable`).
- It is a CSS module, so its class names (`s.hero`, `s.wrap`, `s['btn-o']` …) never meet daisyUI's `.btn`/`.hero`/`.toast` or the global `.h2`. `src/scss/global.scss` still loads on these pages through the root layout. There are no Tailwind classes in these files.
- The "Request a new integration" form is the shared daisyUI modal (`integrationsRequestComp.js`), opened from `AppDirectory` and `BetaNotice` inside `.root`. `<html data-theme="light">` keeps daisyUI on its light tokens, so the card stays white. In dark mode `.root` sets a light `--ink` and `color-scheme: dark`, and the form inherits that ink: headings, labels, typed text and field borders (they follow the current text color) sit on the white card. A `prefers-color-scheme: dark` block in this module restyles `.request-form` only when it is inside `.root`, using this page's surface, ink and line tokens. The accent submit button is unchanged. Legacy pages open the same component outside `.root`, so they stay on the light modal, and light mode is outside the query.
- Changing a token on `/` does not change these pages, and vice versa: the two token sets are separate copies. The same holds for the header and footer (`SiteChrome.js` copies `public/new-home/index.html`) and the setup prompt (`src/components/IntegrationsComp/addToProduct/copy.js:BASE_PROMPT` copies `#promptText`).
- The animated demos (`OAuthDemo`, `AgentDemo`, `AIDemos`, `RotatingWord`) check `prefers-reduced-motion` and then stay still (the demos show their finished state; `RotatingWord` keeps its first word).

### /developers (`dev-*`, `docs-*`)

- **Colors:** `dev.bg`, `dev.surface`, `dev.surface-2`, `dev.ink`, `dev.ink-2`, `dev.ink-3`, `dev.ink-inv`, `dev.line`, `dev.line-2`, `dev.accent` (`#2B5BFF`), `dev.accent-soft`, `dev.ok`, `dev.ok-soft`, `dev.warn`, `dev.bad`. `docs.*` uses the same ground with its own ink, accent and status tones.
- **Fonts:** `font-dev-sans` / `font-docs-sans` / `font-docs-serif` (all Albert Sans), `font-dev-mono` / `font-docs-mono` (JetBrains Mono). They are loaded by `@import url(...)` in `src/app/developers/fonts.scss`.
- **Wrapper:** `src/app/developers/layout.js` wraps every page in `dev-grid font-dev-sans bg-dev-bg text-dev-ink`. `.dev-grid` (96px grid background) is the only global class. Section-specific motion and connectors live in `Hero.module.scss`, `Turn.module.scss`, `OneAction.module.scss`, `Production.module.scss`, `src/app/developers/auth/AuthHero.module.scss` and `src/app/developers/pricing/OverageTicker.module.scss`.
- The root layout still wraps /developers, so `global.scss` applies there too, including the overrides in the warning above.

### front-page (`index-*`), dormant

- Colors: `index.paper`, `index.ink`, `index.muted`, `index.line`, `index.done`, `index.attention` (`#a8200d`), plus per-section grounds (`index.showcase`, `index.fills`, `index.reviews`, `index.keeps`, `index.trust`, `index.wall`).
- Fluid sizes: `text-index-hero`, `text-index-section`, `text-index-group`, `text-index-card`. Spacing: `index-gutter`, `index-section`. Shadows: `shadow-index-card`, `shadow-index-chip`. Keyframes: `indexMarkRoll`, `indexReviews` (uses `--set-w` and `--dur`), `indexDrift`, and others.
- `font-index-display` (Instrument Serif) breaks below about 34px, so smaller text uses `font-index-sans`. `src/app/front-page/index-theme.scss` declares the metric-matched `Instrument Serif Fallback` `@font-face` (`size-adjust: 76.16%`). It is a layout-shift fix: re-measure it if the display face changes.

### Shared animations (`theme.extend.animation`)

The legacy pages use `animate-shimmer`, `animate-blink`, `animate-dot-bounce`, `animate-pulse-dot`, `animate-marquee-scroll`, `animate-fadeSlideIn`, the `animate-flow*` set (embed flow cards, `HeroChatDemo`) and `animate-slide-right`. More keyframes live in `src/scss/animations.scss` (`animate-feat-*`, `animate-dash-flow`) and in `global.scss` (`gradientBorder` for `.border-animation`, and `ltd-marquee-left`/`ltd-marquee-right`).

### Typography

Heading conventions per system: legacy pages use the SCSS classes `.h1`/`.h2`/`.sub__h1` (see [Legacy site](#legacy-site-daisyui--scss)); /developers uses `src/app/developers/Heading.js` (`H2`, `Lead`); the homepage systems size type with their own CSS. Font faces and how each is loaded:

| Face | Loaded by | Used |
|---|---|---|
| Inter Tight | `@import url(...)` in `src/scss/global.scss` (Google Fonts) | Legacy body and headings |
| Albert Sans, JetBrains Mono | `src/app/developers/fonts.scss` | /developers |
| Instrument Serif, DM Sans | `src/app/front-page/index-theme.scss` | Dormant front-page |
| Geist, Geist Mono | `<link>` in `public/new-home/index.html` | `/` |
| Geist, Geist Mono | `geist` npm package (`geist/font/sans`, `geist/font/mono`, via `next/font`) | `addToProduct` pages |
| Caveat | `next/font/google` in `src/components/IntegrationsComp/addToProduct/LetterPage.js` | `/new-direction` signatures |

### Sass build warnings

`npm run build` prints "Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0" for `src/scss/global.scss` (`@import '_import'`) and for each `@import` in `src/scss/_import.scss`. Sass 1.91.0 is installed. The warnings do not break the build. Migrating to `@use`/`@forward` would change how the partials share scope (`_import.scss` pulls `blog`, `custom`, `fonts`, `utility`, `variables`, `flowRender`, `newtheme`, `animations` into one global scope), so do not mix that migration into unrelated work. The `@import url(...)` font lines are plain CSS imports, and Sass keeps them; they are not part of this deprecation.

## Reusable Component Catalog

Two component roots exist: `src/components/**` (older, shared) and `src/app/components/**` (newer, App Router era). Both are live. Reuse these before writing a new one:

| Component | File path | Purpose & when to use | Key props | Used by |
|---|---|---|---|---|
| `NavbarServer` | `src/app/components/navbar/NavbarServer.js` | Server wrapper for the legacy site navbar. It reads the `prod` cookie to choose between Dashboard and signup | `utm` (the page path; drives banners, text colour and signup `utm_source`), `navbarData` (**accepted but ignored**) | 37 files |
| `NavbarOptimized` | `src/app/components/navbar/NavbarOptimized.js` | Client navbar: fixed 30px top bar (≥`lg`) + `MainNavbar` + mobile `Menubar`. Holds the `navItems` constant with stable `track` names | `utm`, `hasToken` | `NavbarServer` only |
| `MainNavbar`, `TopNavLinks`, `Menubar` | `src/app/components/navbar/MainNavbar.js`, `src/app/components/navbar/TopNavLinks.js`, `src/components/navbar/menubar.js` | Pieces of the navbar. `Menubar` is the mobile drawer (`role="dialog" aria-modal="true"`). Styles in `src/components/navbar/navbar.module.scss` | `navItems`, `open`, `onClose` | `NavbarOptimized` |
| `Relay`, `WebinarBanner` | `src/app/components/navbar/Relay.js`, `src/app/components/webinar/WebinarBanner.js` | Top-bar banners chosen by `utm`. `MCPBanner` / `MigratingBanner` are commented out | | `NavbarOptimized` |
| `ConditionalNavbar` / `ConditionalFooter` | `src/components/ConditionalLayout/ConditionalNavbar.js`, `src/components/ConditionalLayout/ConditionalFooter.js` | Hide the navbar/footer on integration subdomains (`src/utils/domain.js:isIntegrationSubdomain`). They render `display:none` until mounted, so **the navbar and footer are not visible in SSR HTML** | `children` | ~29 pages |
| `Footer` | `src/components/footer/footer.js` | Legacy site footer, data-driven from the table-api footer rows (`group_name`, `hidden`). Includes `ExploreWithAIButton` and the "Request an Integration" opener | `footerData`, `borderClass`, `isBlack` | 36 files |
| `NewFooter` | `src/components/footer/NewFooter.js` | Dark footer with all copy as constants (the copy-in-component reference). **Only reachable from the dormant `src/app/front-page/IndexPageContent.js`** | none | front-page |
| `FooterNew` | `src/app/components/new-home/FooterNew.js` | Footer for `/home`. `src/middleware.js` redirects `/home` to `/`, so it never renders | `footerData` | `src/app/home/page.js` |
| `Header` / `Footer` (developers) | `src/app/developers/Header.js`, `src/app/developers/Footer.js` | /developers chrome. Do not reuse the legacy navbar there | none | /developers pages |
| `NewHeader` | `src/app/components/navbar/NewHeader.js` | front-page header (`index-*` tokens) | `utmSource` | dormant front-page |
| `MetaHeadComp` | `src/components/metaHeadComp/metaHeadComp.js` | Client-side `useEffect` that rewrites `document.title` and the description / OG / Twitter meta after hydration, and substitutes `[AppOne]`/`[AppTwo]`. It does **not** replace `generateMetadata` (see SEO) | `metaData`, `plugin`, `pathSlugs`, `page` | 26 files |
| `FAQSection` | `src/components/faqSection/faqSection.js` | Bordered FAQ accordion (daisyUI `collapse collapse-arrow`, one open at a time). Renders nothing when `faqData` is empty | `faqData` (`que`/`question`, `ans`/`answer`, `link`), `faqName` | 21 files |
| `Breadcrumb` | `src/components/breadcrumb/breadcrumb.js` | Up to 4 levels with lucide `ChevronRight` separators | `parent`, `parentLink`, `child1`..`child3`, `child1Link`, `child2Link` | 6 files |
| `Cta` | `src/components/CTA/Cta.js` | Boxed CTA band, white or black theme, `btn-accent` button | `title`, `description`, `subDescription`, `buttonLabel`, `buttonLink`, `theme`, `newTab`, `readMoreLink`, `trackName`, `trackSection` | MCP pages |
| `DashboardButton` | `src/components/dashboardButton/dashboardButton.js` | The most reused signup CTA. It shows "Dashboard" (to `flow.viasocket.com`) if `hasToken`, otherwise "Start for free" (to `/signup`) via `src/utils/handleRedirection.js:handleRedirect` | `utm_src`, `hasToken`, `section`, `className` | 8 files |
| `LinkButton`, `LinkText`, `BtnContWithIcon`, `BtnWithHideIco` | `src/components/uiComponents/buttons.js` | Text links with the animated `.link-btn` arrow. The only copy: a duplicate under `src/app/components/ui/` was merged into it on 2026-10-21 <!-- verify:ignore --> | `href`, `content`, `customClasses` | 7 files |
| `PhoneInput` | `src/components/phoneInput/phoneInput.js` | Country-code select + number. Defaults to `DEFAULT_COUNTRY_ISO = 'IN'` and auto-detects the country through ipapi.co. `onChange` gets `{ number, countryIso, countryCode, country }` | `value`, `countryIso`, `onChange`, `name`, `placeholder`, `required`, `maxLength` | `RequestMeetingComp`, `integrationsRequestComp` |
| `RequestIntegrationPopupOpener` | `src/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexClientComp.js` | Opens the "Request an integration" modal | `showType` (`button`/`searchView`/`footer`), `title`, `className` | 10 files |
| `GetStarted` | `src/components/getStarted/getStarted.js` | "Get started" help block | none | embed, integrations |
| `Skeleton` | `src/app/providers.js:Skeleton` | Full-page daisyUI `skeleton`, shown by `AppProvider` while it hard-navigates | none | `AppProvider` |
| `Label`, `H2`, `Lead`, `Scene` | `src/app/developers/Heading.js` | /developers section typography and wrappers | `children`, `className`, `id` | /developers |
| `Button` (developers) | `src/app/developers/Button.js` | `next/link` pill button. Its variants are `quiet` and `sm`: the established small-API button pattern | `href`, `quiet`, `sm`, `className` | /developers |
| `BrandIcon` | `src/app/developers/BrandIcon.js` | Brand marks of apps and coding agents as SVG data (lucide has no brand logos) | `name`, `size`, `forceColor` | /developers |
| `CopyPromptButton`, `CodeBlock` | `src/app/developers/CopyPromptButton.js`, `src/app/developers/docs/CodeBlock.js` | Copy-to-clipboard prompt; docs code block | `onCopied` / `children` | /developers |
| `SiteHeader`, `SiteFooter`, `BlogPosts`, `FaqSection` | `src/components/IntegrationsComp/addToProduct/SiteChrome.js` | The homepage's header and footer (nav and footer links from `copy.js` `NAV`/`FOOTER_GROUPS`), the Action Layer blog cards and the FAQ list for the homepage-design pages. Render inside `CopyPromptProvider` | none / `title`, `lead`, `posts`, `viewAllUrl` / `eyebrow`, `title`, `lead`, `faqs` | `addToProduct` pages |
| `CopyPromptProvider`, `CopyPromptButton`, `useCopyPrompt` | `src/components/IntegrationsComp/addToProduct/CopyPrompt.js` | One prompt per page, a toast, and a select-by-hand box when the clipboard is blocked | `prompt` / `small` | `addToProduct` pages |
| `AppDirectory` | `src/components/IntegrationsComp/addToProduct/AppDirectory.js` | Category list, app grid, search (`src/utils/searchApps.js`), Prev/Next, "Request an App" cell | `apps`, `categories`, `integrationsInfo`, … | `IntegrationsIndexPage` |
| `AddToProductPage`, `IntegrationsIndexPage`, `FeaturesPage`, `UseCasesPage`, `LetterPage` | `src/components/IntegrationsComp/addToProduct/` | Whole-page bodies for `/integrations/{app}`, `/integrations` (and categories), `/features`, `/use-cases`, `/new-direction` | loader data / `blogs` | the matching `page.js` |

Dead or duplicate components: there is no shared Modal, Input, Card or Toast primitive. Live pagination uses `react-paginate` (`src/app/components/experts/AgencyList.js`, styled by `.pagination` in `global.scss`).

### Modals, toasts and feedback

- **Modals** are daisyUI `<dialog className="modal">`. `src/components/requestMeetingComp/RequestMeetingComp.js` uses `id="meeting_request_form"` and is opened with `showModal()`. `src/components/IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp.js` renders `<dialog open>`, which is **not modal**: no focus trap, and `Escape` does nothing. Prefer `showModal()` for new modals.
- **Toasts:** the static homepage has one (`role="status" aria-live="polite"`, created in `public/new-home/main.js`), and `src/components/IntegrationsComp/addToProduct/CopyPrompt.js:CopyPromptProvider` has its own for the `addToProduct` pages. The rest of the Next app has no toast primitive.
- **Tracking attributes:** CTAs and nav links carry `data-track`, `data-track-section`, `data-track-label`, `data-track-action`, `data-track-destination` (37 files). Keep them when you restyle: their names are an analytics contract ([CONTRACTS](CONTRACTS.md#analytics--telemetry-event-contracts)). `NavbarOptimized.js` explains why `track` is spelled out separately from the label.

### Icons and images

- **Icons:** `lucide-react` (143 files) for generic icons. Brand and third-party marks are inline SVG in each brand's own colour (`src/components/footer/NewFooter.js`, `src/app/developers/BrandIcon.js`). Never hotlink them: `NewFooter.js` records why hotlinks to Wikimedia and uxwing were removed. The site has no `react-icons` or other icon set.
- **Images:** `next.config.js` sets `images.unoptimized: true`, so `next/image` (91 files) does no resizing and remote hosts work without matching `remotePatterns` (which lists only `placehold.co`). Most remote images are app icons from `stuff.thingsofbrand.com` and assets on `files.msg91.com`. Local brand assets live in `public/assets/brand/`. The static homepage uses `public/new-home/assets/`.

## Responsive Behavior & Breakpoints

`tailwind.config.js` **replaces** the default `theme.screens` with values that are 1px larger. The comments next to them still show the Tailwind defaults:

| Prefix | Min width | Note |
|---|---|---|
| `sm:` | 641px | |
| `md:` | 769px | `md:` means 769px and up, not 768 |
| `lg:` | 1025px | The navbar top bar appears here |
| `xl:` | 1281px | |
| `xl2:` | 1500px | Added in `theme.extend.screens`, not used anywhere |
| `2xl:` | 1537px | |

> [!WARNING]
> SCSS media queries use raw px values that do not match these: `_custom.scss` (1580, 1280, 780, 480), `global.scss` (576, 992, 1024, 1200, 1050, 1020), `newtheme.scss` (`$bp-md: 768px`, `$bp-xl: 1280px`) and `_fonts.scss` (768, 1024). At exactly 768px and 1024px, an SCSS rule and its `md:`/`lg:` Tailwind counterpart disagree by one pixel. Use Tailwind prefixes for new responsive rules.

- **Mobile navigation:** below `lg`, the 30px top bar is hidden and `MainNavbar` opens `Menubar`. Pages that use the fixed navbar must clear it with `.global-top-space` or a spacer such as `h-[48px] lg:h-[78px]` (`src/app/page.js`).
- **Static homepage:** has its own breakpoints in `styles.css` (600, 760, 900, 1024, 1199, 1800, 2300px) and changes `--sec-pad`/`--content-gap` at 600px or less.

## Accessibility (A11y) Standards

What the code actually does. Match the stronger patterns in new work:
- **Static homepage is the reference.** It has a skip link (`.skip` to `#main`), `<main id="main">`, labelled `<nav aria-label="Main">` / `"Footer"`, `:focus-visible { outline: 2px solid var(--ink) }`, a `.sr-only` utility, `aria-hidden` on decorative SVGs, a live-region toast, reduced-motion handling, and exactly one `<h1>`.
- **Next app:** `aria-label` appears in about 67 files and `aria-hidden` in about 58. Only 3 files use `aria-expanded` (`src/app/front-page/IndexFaq.js`, and `src/app/lifetime-deal/Faq.js` and `PricingCard.js`). `focus-visible:` rings appear in 5 files (three dormant front-page sections, `src/app/developers/docs/CodeBlock.js` and `src/components/IntegrationsComp/integrationsAppTwoComp/AboutApps.js`). `sr-only` appears once (`src/app/front-page/IndexChatStage.js`). `aria-current="page"` is used in `src/app/developers/Header.js`.
- **Known gaps:** `Menubar` declares `role="dialog" aria-modal="true"` but has no `Escape` handler or focus trap. `<dialog open>` modals are not modal (see above). `FAQSection` uses daisyUI's checkbox `collapse` (keyboard-reachable through the hidden input, but it has no `aria-expanded`).
- `<html lang="en">` is set in both `src/app/layout.js` and `public/new-home/index.html`.

## Website Messaging & Copy Guidelines

- **Voice:** plain and concrete. Copy describes the job being done, not features in the abstract. The static homepage's FAQ, in the JSON-LD in `public/new-home/index.html`, is the current tone reference. Positioning is owned by [VISION](VISION.md).
- **Primary CTA labels:** "Start for free" (`DashboardButton`) or "Start free" on signup buttons, and "Dashboard" for signed-in users (the `prod` cookie). "Book a demo" is the secondary CTA. The navbar's Pricing link carries the badge `free forever`.
- **Claim-bearing figures:** "2,300+" (apps) is hardcoded in about 14 `src/` files and 9 times in `public/new-home/index.html`, while other components render the live `appCount` from table-api. If you change the number, grep for both "2,300+" and "2300+". Where two places show the same figure, leave a comment at each copy that names the other.
- **Signup links** carry the page path as `utm_source`. This is owned by [FLOWS](FLOWS.md#detailed-journey-landing-utm-capture-and-signup) and [DECISIONS](DECISIONS.md#adr-012-utm-attribution-conventions).
- **Where copy lives in code:** as constants in the component file; see [09-coding-guidelines](09-coding-guidelines.md#component-conventions) for the rule and its two exceptions.
- **Empty states:** components return `null` rather than render an empty state. `FAQSection` and `Footer` do this when their data is empty. The site has no empty-state illustration pattern.

## Representative Examples

Legacy site: SCSS heading classes, `text-accent` brand red, and the shared signup CTA with the page path as `utm_src` (`src/app/workflow-automations/page.js`):

```jsx
<section className="py-12">
    <h1 className="h1">
        Your Business, Automated
        <span className="text-accent"> Intelligently</span>
    </h1>
    <p className="sub__h1 text-gray-600 leading-relaxed mb-3">…</p>
    <DashboardButton utm_src={"/workflow-automations"} hasToken={hasToken} section="workflow_automations" />
</section>
```

/developers: `dev-*` tokens, Tailwind arbitrary values, and the local `Button` with its `quiet` variant (`src/app/developers/Hero.js`):

```jsx
<p className="text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 max-w-[46ch]">…</p>
<div className="flex items-center justify-center gap-4 flex-wrap mt-2">
    <CopyPromptButton />
    <Button href="/developers/docs" quiet>Read docs</Button>
    <span className="text-[14px] text-dev-ink-3">Live in under 15 minutes</span>
</div>
```

`addToProduct` pages: CSS-module classes on `.root`, Geist variables on the root `div`, copy from `copy.js` (`src/components/IntegrationsComp/addToProduct/FeaturesPage.js`):

```jsx
<div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
    <CopyPromptProvider prompt={BASE_PROMPT}>
        <SiteHeader />
        <main>
            <section className={`${s.hero} ${s['fx-hero']} ${s['fx-hero-full']}`}>
                <div className={`${s.wrap} ${s['fx-hero-in']}`}>
                    <h1>{C.h1}</h1>
                    <p className={s['hero-sub']}>{C.sub}</p>
```

## SEO & Metadata Expectations

- **Server metadata is the source of truth.** Every `page.js` (or its `layout.js`, for `/automations` and `/automations/[...slug]`) exports `generateMetadata` or `metadata`: 44 files export `generateMetadata` and 7 export `metadata`. The `addToProduct` pages (`/features`, `/use-cases`, `/new-direction`, and the index and single-app branches of `/integrations`) take their title and description from `copy.js`, not table-api. The standard pattern (`src/app/pricing/page.js`) is:
  1. A `src/app/lib/*-data.js` loader calls `src/utils/getMetaData.js:getMetaData` with `(name, pageUrl)`.
  2. `getMetaData` reads the shared meta table through `src/utils/axiosCalls.js:getMeta` (20-minute cache) and picks the row whose `name` is the page key, for example `'/pricing'`.
  3. The page returns `title`, `description`, `keywords`, `openGraph` and `twitter`, with hardcoded fallbacks.

  To change a page's title or description, edit the table row, not the fallback ([current-infrastructure/table-api](current-infrastructure/table-api.md)). Dynamic integration pages replace `[AppOne]`/`[AppTwo]` in the server metadata (`src/app/integrations/[...slug]/page.js`).
- **Titles** are not uniform. The fallbacks use "Pricing - viaSocket", "viaSocket — The action layer…" and "… | viaSocket". The root layout sets no `title.template`. Match the table row's existing style.
- **Root defaults** (`src/app/layout.js`): site-wide OG and Twitter image `https://files.msg91.com/342616/wnitwkyk` (1200×630), `twitter.card: summary_large_image`, favicons from `public/assets/brand/`, and `robots: 'noindex, nofollow'` unless `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT` is `prod`.
- **Share images:** a page's own `openGraph`/`twitter` replace the root's whole objects, image included, so every page sets its image through `src/app/lib/share-image.js` (`ogImages(path, image)`, `twitterImages(path, image)`). A page keeps its own image (for example table-api `metaData.image`); with none, or only the root's generic image, it gets `https://viasocket.com/og/<path>`: its hero (breadcrumb, `<h1>`, the `.hero-sub` line or the meta description) drawn at 1200×630 by `src/app/og/[...path]/route.js`, which reads the live page and does not follow redirects. When you add a page, pass its path to those helpers. // pragma: allowlist secret
- **Canonical:** Next pages get a canonical only **client-side**. `src/app/providers.js:AppProvider` computes `https://viasocket.com${pathname}`, collapsing `/page/N` pagination for `/integrations` and `/mcp`, and `src/components/headComp/headComp.js:HeadComp` injects the `<link rel="canonical">` in a `useEffect`. Only `/integrations`, `/integrations/{app}`, `/features`, `/use-cases` and `/new-direction` also set `alternates.canonical` on the server; `HeadComp` then rewrites that same link. The static homepage has a real `<link rel="canonical" href="https://viasocket.com/">` (commit `a8f48657`). Always use the bare domain, never `www`. <!-- verify:ignore --> // pragma: allowlist secret
- **Never use `next/head`.** In the App Router it renders nothing (its head manager context is only `{ appDir: true }`), so the old `next/head` head components were removed on 2026-10-21. Put metadata in `generateMetadata`. <!-- verify:ignore -->
- **JSON-LD** (`<script type="application/ld+json">`):
  - `Organization` in `src/app/layout.js`, on every Next page.
  - `SoftwareApplication` + `FAQPage` in `src/components/IntegrationsComp/addToProduct/AddToProductPage.js` (single-app pages); `FAQPage` in `FeaturesPage.js`, `UseCasesPage.js` and `IntegrationsIndexPage.js` (index only, not categories), all built from `copy.js`. The older `integrationsAppOneComp.js` has the same pair but no longer renders ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) C-08).
  - `Organization`, `WebSite`, `SoftwareApplication`, `WebPage` and `FAQPage` in `public/new-home/index.html`. If you edit the homepage FAQ, update both the visible FAQ and the JSON-LD: they are separate copies.
  - The dormant front-page builds its graph from visible copy (`src/app/front-page/seo.js:schemaGraph`).
- **Headings:** one `<h1>` per page, styled with `.h1`, and section titles as `<h2 className="h2">`. Footers use `<h2>` for column titles (`src/components/footer/footer.js`).
- **Sitemap, robots, llms.txt:** `src/app/sitemap.js:STATIC_ROUTES` lists static routes only. When you add a static page, add it there (`/use-cases` and `/new-direction` are missing, U-08). Robots precedence is documented in [ARCHITECTURE](ARCHITECTURE.md#seo-files-sitemap--robots). `public/llms.txt` is a hand-maintained Markdown index of the site for LLM crawlers (1141 lines). When you add or rename a public section, update it by hand.

> [!TODO]
> Answered 2026-10-22 but not yet confirmed or implemented ([OPEN_QUESTIONS](OPEN_QUESTIONS.md)): move canonicals into server metadata and drop the client-side rewrite in `HeadComp` (U-03, recommended fix); daisyUI `primary: '#0000'` rendering black is intended (U-02, recommended); page titles use "X | viaSocket" through a `title.template` of `%s | viaSocket` (U-05, proposed); the `addToProduct` `copy.js` and SCSS module are accepted for now and revisited when the design system becomes Tailwind tokens (U-07, proposed, maintainer to confirm).
