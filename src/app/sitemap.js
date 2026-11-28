import { getAllBlogs } from './lib/blogs';
import { getToolsIndexData } from './lib/tools-data';

export const runtime = 'edge';

const SITE_URL = 'https://viasocket.com';

// Every statically-routed page (no [param]/[...slug] segments) in src/app.
// Dynamic pages (integrations, departments, mcp, automations, features) are
// covered by the backend's own sitemap instead — see
// build-utilities/generate-robots-txt.js and src/app/robots.txt/route.js.
// The 27 /find-apps/{letter} index pages are fixed slugs and are listed below.
// Bare /embed and bare /mcp are left out. Middleware redirects them before a
// page renders (live admin list: /embed → / with 301, /mcp → mushrooms with
// 308; src/data/redirects.json still sends /embed to /developers with 308 if
// the admin cannot be reached). They are not indexable destinations.
// /setup-prompt is left out on purpose. It is noindex and linked only from
// SDK emails (src/app/setup-prompt/page.js). Do not add it here, and do not
// Disallow it in robots.txt: crawlers must fetch the page to see the noindex.
const STATIC_ROUTES = [
    '/',
    '/agency-partner',
    '/agency-partner/success',
    '/automations',
    '/black-friday-sale',
    '/blogs',
    '/data-deletion-policy',
    '/data-retention-deletion',
    '/departments',
    '/developers',
    '/developers/apps',
    '/developers/auth',
    '/developers/docs',
    '/embed/actions-for-ai',
    '/embed/actions-via-webhook',
    '/embed/app-integration',
    '/experts',
    '/experts-are-live',
    '/features',
    '/feedback',
    '/free-access-programs',
    '/hire-an-expert',
    '/home',
    '/integrations',
    '/integrations-script',
    '/lifetime-deal',
    '/lifetime-deal/success',
    '/mcp/aiagent',
    '/mcp/saas',
    '/migration/n8n',
    '/migration/relay',
    '/migration/zapier',
    '/pass',
    '/pricing',
    '/privacy',
    '/signup',
    '/support',
    '/terms',
    '/tools',
    '/webinar',
    '/workflow-automation-ideas',
    '/workflow-automations',
];

// Apps whose names start with a digit (slug 0-9) plus a–z — see getFindAppsPageData.
const FIND_APPS_INDEX_SLUGS = ['0-9', ...'abcdefghijklmnopqrstuvwxyz'.split('')];

export default async function sitemap() {
    const pages = STATIC_ROUTES.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));
    // The /blogs posts are bundled with the site (src/data/blogs.json), so they're listed here too.
    const posts = getAllBlogs().map((p) => ({
        url: `${SITE_URL}/blogs/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));
    // The built-in tools' pages (/tools/{page}) come from the admin panel's list (lib/tools-data.js).
    const tools = (await getToolsIndexData()).map((t) => ({
        url: `${SITE_URL}/tools/${t.page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
    const findApps = FIND_APPS_INDEX_SLUGS.map((slug) => ({
        url: `${SITE_URL}/find-apps/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));
    return [...pages, ...findApps, ...tools, ...posts];
}
