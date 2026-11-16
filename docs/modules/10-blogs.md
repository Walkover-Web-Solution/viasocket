---
covers: ["src/app/blogs/**", "src/app/lib/blogs.js", "build-utilities/generate-blogs.js", "_posts/blogs/**", "src/data/blogs.json", "src/components/IntegrationsComp/addToProduct/BlogsPage.js", "src/components/IntegrationsComp/addToProduct/BlogPostPage.js", "src/components/IntegrationsComp/addToProduct/BlogPromo.js", "src/components/IntegrationsComp/addToProduct/blogs.module.scss", "src/app/sitemap.js"]
verified_at: 96b44de6
verified_on: 2026-11-08
---
# Module: Blog (`/blogs`, `/blogs/{slug}`)

The site's own blog, in the homepage design. Posts are Markdown files in `_posts/blogs/`, compiled to `src/data/blogs.json` at dev and build time and bundled with the site. No table-api or other backend is involved. This is a different thing from `/blog` (singular), which another deployment serves ([05-navigation](../05-navigation.md#paths-served-by-other-deployments)), and from the legacy `_posts/blog/*.mdx` posts, which nothing reads ([OPEN_QUESTIONS C-02](../OPEN_QUESTIONS.md#active-questions-table)).

## Purpose
- Search-led content for the integration-layer audience: alternatives and comparisons (Composio, Merge, Nango, Paragon, Prismatic, Zapier MCP), OAuth, MCP, webhooks and build-vs-buy guides (20 published posts at `96b44de6`).
- Feeds the "Learn more" cards on `/features` (`src/app/lib/blogs.js:getLatestBlogs`, [module 05](./05-features-and-use-cases.md)).

> [!TODO]
> Business value, owner and success measure for the blog are not written down anywhere in the repo. Who approves claims in competitor comparisons (for example the dated pricing or feature claims inside each `*-alternative.md`) is also not recorded.

---

## Routes and rendering
| Route | File | Notes |
|---|---|---|
| `/blogs` | `src/app/blogs/page.js` → `BlogsPage` | Static `metadata` from `copy.js:BLOGS_COPY` (`metaTitle`, `metaDesc`), canonical `src/app/lib/blogs.js:BLOGS_URL` (the production `/blogs` URL), share image from `src/app/lib/share-image.js`. Newest post featured, the rest as cards. Empty state copy is `BLOGS_COPY.emptyTitle` / `emptyText` with a link to `/features`. |
| `/blogs/{slug}` | `src/app/blogs/[slug]/page.js` → `BlogPostPage` | `generateMetadata`: title `{post.title} · viaSocket`, the post's `description`, canonical `BLOGS_URL` + `/{slug}`, `og:type` `article` with `publishedTime` and author, the post's `image` or the generated hero image. Unknown slug: `notFound()`, a real 404. `generateMetadata` returns the title "Post not found · viaSocket", but production served the generic "404 - Page not found" title on 2026-11-08. |

Both pages set `runtime = 'edge'`, use `SiteHeader` / `SiteFooter` from `SiteChrome.js` (so the admin announcement bar also shows here, [admin-panel](../current-infrastructure/admin-panel.md)) and render `BlogPromo`.

A post page shows: breadcrumb (Home → Blog → title), author photo and name, category, date, reading time (words / 220, at least 1 minute), share buttons, cover image, a "Jump to section" list built from the `##` headings (only when there are two or more), the body HTML, and up to three related posts (same `category` first, then newest). It emits `BlogPosting` JSON-LD, plus `FAQPage` JSON-LD when the post has a `## FAQ` section.

`BlogPromo` is a dismissible "Start free" card that slides in after about 30% of the page is scrolled. Esc or × closes it for the rest of the session (`sessionStorage` key `vs-blog-promo-dismissed`). Its button links to `copy.js:START_URL` with no `utm_source`, like `SiteHeader`'s "Start free" ([OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md#active-questions-table)).

## Writing and publishing a post
1. Copy `_posts/blogs/_template.md` to `_posts/blogs/<slug>.md`. The file name is the URL and must be lowercase words joined by hyphens. Files starting with `_` are never published.
2. Front matter: `title` and `date` (`YYYY-MM-DD`) are required; `description`, `author`, `category`, `image` are optional; `draft: true` keeps it out. YAML is parsed with the JSON schema, so dates stay strings.
3. Images go in `public/blogs/<slug>/`; an author photo is found by name at `public/blogs/authors/<name-with-hyphens>.{jpg,jpeg,png,webp}`.
4. Run `node build-utilities/generate-blogs.js` (it also runs as `predev` and inside `prebuild`) and commit the regenerated `src/data/blogs.json` with the Markdown. **Never hand-edit `blogs.json`**: the next dev or build run overwrites it.

What the generator does to the Markdown (GitHub-flavoured via `micromark` + `micromark-extension-gfm`):
- Raw HTML in a post is escaped, not rendered.
- Links leaving `*.viasocket.com` get `target="_blank" rel="noopener noreferrer"`; images get `loading="lazy"`.
- Every `##` heading gets an id for the section list; a `## FAQ` (or "FAQs", "Frequently asked questions") section with `### question` headings becomes `<details>` toggles and the FAQ JSON-LD.
- A missing `title`, a bad `date` or a non-slug file name fails the script with the file name, which fails `npm run dev` / `npm run build`.

## Data dependencies
- `src/app/lib/blogs.js` reads only the bundled `src/data/blogs.json`: `getAllBlogs`, `getBlog(slug)`, `getRelatedBlogs`, `getLatestBlogs`, `formatBlogDate`. Posts are sorted newest first, then by title.
- `src/app/sitemap.js` lists every post (`/blogs/{slug}`, `lastModified` = post date) as well as `/blogs` in `STATIC_ROUTES`.
- Nothing is fetched at request time, so there is no loading or upstream-failure state. A new post appears only after a deploy.

## Verification
- Last checked 2026-11-08: production `/blogs` and `/blogs/composio-alternative` return 200 with the expected title and canonical, an unknown slug returns 404, and production's `/sitemap.xml` lists 19 posts while `test` has 20 (`build-vs-buy-software` was on `test` but not yet released).
- After adding or editing a post: run the generator and check the console line `[blogs] N posts written`; `git diff src/data/blogs.json` should show only that post.
- On `npm run dev`: `/blogs` and `/blogs/<slug>` return 200 with the expected `<title>` and canonical; an unknown slug returns 404; `/sitemap.xml` lists the new URL.
- Not covered by any automated check (the repo has no tests).

## Open items
- Blog ownership, editorial approval of competitor claims, and success metrics (see the TODO above).
- `/blogs` is not linked from the static homepage's nav or footer (`public/new-home/index.html` has no `/blogs` link at `96b44de6`); discovery is through `/features`, the sitemap and search.
