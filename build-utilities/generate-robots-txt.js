const fs = require('fs');
const path = require('path');

function generateRobots() {
    const hostname = process.env.HOSTNAME || 
                     process.env.VERCEL_URL || 
                     process.env.NEXT_PUBLIC_VERCEL_URL || 
                     process.env.HOST || 
                     '';
    
    const isIntegrationSubdomain = hostname.includes('integrate') || hostname.includes('integration');
    const isProduction = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';
    const isProd = isProduction && !isIntegrationSubdomain;

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;

    fs.writeFileSync(path.resolve('public/robots.txt'), robotsContent);
}

generateRobots();
