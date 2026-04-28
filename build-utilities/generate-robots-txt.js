const fs = require("fs");
const path = require ("path");
function generateRobots() {
    // Direct subdomain detection matching domain.js logic
    const currentHost = process.env.VERCEL_URL || 'plugservice-api.viasocket.com';
    const hostnameParts = currentHost.split('.');
    const subdomain = hostnameParts.length >= 2 ? hostnameParts[0].toLowerCase() : '';
    const isIntegration = subdomain.includes('integration') || subdomain.includes('integrate');
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod' && !isIntegration;

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;

    fs.writeFileSync(path.resolve("public/robots.txt"), robotsContent);
}
generateRobots();
