const fs = require("fs");
const path = require("path");

/**
 * Generates a fallback static robots.txt for builds
 * 
 * NOTE: The dynamic route at /src/app/robots.txt/route.js will take precedence
 * and handle runtime subdomain detection. This is just a fallback for static builds.
 * 
 * Production: Allow indexing (dynamic route will handle integration subdomains)
 * Non-production: Block all indexing
 */
function generateRobots() {
  const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

  const robotsContent = isProd
    ? `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://viasocket.com/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  fs.writeFileSync(path.resolve('public/robots.txt'), robotsContent);
}

generateRobots();
