const fs = require("fs");
const path = require ("path");
function generateRobots() {
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;


    fs.writeFileSync(path.resolve("public/robots.txt"), robotsContent);
}
generateRobots();