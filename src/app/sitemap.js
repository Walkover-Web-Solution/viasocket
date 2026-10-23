import { getAllBlogs } from './lib/blogs';

export const runtime = 'edge';

const SITE_URL = 'https://viasocket.com';

// Every statically-routed page (no [param]/[...slug] segments) in src/app.
// Dynamic pages (integrations, departments, mcp, automations, find-apps,
// features) are covered by the backend's own sitemap instead — see
// build-utilities/generate-robots-txt.js and src/app/robots.txt/route.js.
// /embed and bare /mcp are left out too — both 301 elsewhere (next.config.js
// redirects), so they're not real destinations for crawlers to index.
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
    '/developers/auth',
    '/developers/docs',
    '/embed/actions-for-ai',
    '/embed/actions-via-webhook',
    '/embed/app-integration',
    '/experts',
    '/experts-are-live',
    '/features',
    '/free-access-programs',
    '/hire-an-expert',
    '/integrations',
    '/integrations-script',
    '/lifetime-deal',
    '/lifetime-deal/success',
    '/mcp/aiagent',
    '/mcp/saas',
    '/migration/n8n',
    '/migration/relay',
    '/migration/zapier',
    '/new-direction',
    '/pass',
    '/pricing',
    '/privacy',
    '/signup',
    '/support',
    '/terms',
    '/use-cases',
    '/webinar',
    '/workflow-automation-ideas',
    '/workflow-automations',
];

export default function sitemap() {
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
    return [...pages, ...posts];
}
