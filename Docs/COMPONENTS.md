# Component & Page Rules (STRICT)

## Source of Truth Mapping

- **Page Files** → `src/app/[route]/page.js`
- **Shared/Common Components** → `src/components/` (used across multiple pages)
- **Page-Specific Components** → `src/app/components/` (specific to particular pages/features)
- **Page Data Functions** → `src/app/lib/*.js`
- **Navbar Component** → `src/app/components/navbar/`

### Component Location Rules

**`src/components/` - Shared Components:**
- Reusable across multiple pages
- Common UI elements (Footer, FAQ, MetaHead, etc.)
- Generic feature components (IntegrationsComp, FeaturesComp, etc.)
- Examples: `footer/`, `faqSection/`, `metaHeadComp/`, `dashboardButton/`

**`src/app/components/` - Page-Specific Components:**
- Tied to specific pages or routes
- Page-level orchestration components
- Examples: `home/`, `pricing/`, `integrations/`, `navbar/`

---

## Core Rules

### Server vs Client

- Default = Server Component
- Use `'use client'` ONLY if:
  - using hooks (useState, useEffect, etc.)
  - handling events (onClick, etc.)
  - using browser APIs (window, document)

❌ Do NOT create unnecessary client components

---

### Page Rules (MANDATORY)

- Every page MUST:
  - export `runtime = 'edge'`
  - use `generateMetadata()`
  - fetch data using `get[Page]PageData()`

---

### Page Structure (STRICT ORDER)

```jsx
<MetaHeadComp metaData={metaData} page={'/route'} />
<NavbarServer navbarData={navbarData} utm={'/route'} />

{/* page content */}

<Footer footerData={footerData} />
```

---

### Dynamic Routes (MANDATORY)

- ALWAYS resolve params and searchParams before use

```js
const resolvedParams = await params;
const resolvedSearchParams = await searchParams;
const slug = resolvedParams?.slug || [];
```