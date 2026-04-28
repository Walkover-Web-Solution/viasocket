const fs = require('fs');
const path = require('path');
function generateRobots() {
    // Check if subdomain contains 'integrate' or 'integration'
    const hostname = process.env.HOSTNAME || process.env.VERCEL_URL || '';
    const isIntegrationSubdomain = hostname.includes('integrate') || hostname.includes('integration');
    
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod' && !isIntegrationSubdomain;

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;

    fs.writeFileSync(path.resolve('public/robots.txt'), robotsContent);
}
generateRobots();
