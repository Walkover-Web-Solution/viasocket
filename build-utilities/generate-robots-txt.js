const fs = require("fs");
const path = require("path");

function generateRobots() {
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://socket-plug-services-h7duexlbuq-el.a.run.app/sitemap/index-page
Sitemap: https://viasocket.com/sitemap.xml`
        : `User-agent: *
Disallow: /`;

    const publicDir = path.join(__dirname, "..", "public");
    const robotsPath = path.join(publicDir, "robots.txt");
    
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(robotsPath, robotsContent);
}

generateRobots();