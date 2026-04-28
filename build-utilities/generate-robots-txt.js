const fs = require("fs");
const path = require("path");

/**
 * NOTE: This script is deprecated in favor of dynamic robots.txt generation.
 * Robots.txt is now generated at runtime via /src/app/robots.txt/route.js
 * which detects the actual subdomain from the request.
 * 
 * This fallback robots.txt is only used if the dynamic route fails.
 */
function generateRobots() {
    // Generate a safe fallback robots.txt that blocks everything
    // The actual robots.txt will be served dynamically based on subdomain
    const robotsContent = `User-agent: *
Disallow: /`;

    fs.writeFileSync(path.resolve('public/robots.txt'), robotsContent);
    console.log('Generated fallback robots.txt (dynamic version at /src/app/robots.txt/route.js)');
}

generateRobots();
