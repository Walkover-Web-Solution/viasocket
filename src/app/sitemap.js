export const runtime = 'edge';

const SITE_URL = 'https://viasocket.com';

// Every statically-routed page (no [param]/[...slug] segments) in src/app.
// Dynamic pages (integrations, departments, mcp, automations, find-apps,
// features) are covered by the backend's own sitemap instead — see
// build-utilities/generate-robots-txt.js and src/app/robots.txt/route.js.
const STATIC_ROUTES = [
    '/',
    '/agency-partner',
    '/agency-partner/success',
    '/automations',
    '/black-friday-sale',
    '/data-deletion-policy',
    '/data-retention-deletion',
    '/departments',
    '/developers',
    '/developers/auth',
    '/developers/docs',
    '/developers/pricing',
    '/embed',
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
    '/mcp',
    '/mcp/aiagent',
    '/mcp/saas',
    '/migration/n8n',
    '/migration/relay',
    '/migration/zapier',
    '/pricing',
    '/privacy',
    '/signup',
    '/support',
    '/terms',
    '/webinar',
    '/workflow-automation-ideas',
    '/workflow-automations',
];

export default function sitemap() {
    return STATIC_ROUTES.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));
}
