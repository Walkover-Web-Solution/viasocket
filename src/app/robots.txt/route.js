/**
 * Server-side integration subdomain detection
 * Uses the SAME logic as /src/utils/domain.js but works with hostname string
 * 
 * @param {string} hostname - The hostname to check
 * @returns {boolean} true ONLY if integration subdomain, false otherwise
 */
function isIntegrationSubdomain(hostname) {
  if (!hostname) {
    return false;
  }

  const parts = hostname.split('.');

  if (parts.length < 2) {
    return false;
  }

  const subdomain = parts[0].toLowerCase();
  return subdomain.includes('integration') || subdomain.includes('integrate');
}

/**
 * Dynamic robots.txt route
 * Generates robots.txt based on the actual request hostname at runtime
 * 
 * Integration subdomains: Block all indexing
 * Main domain (production): Allow indexing with sitemap
 * Non-production: Block all indexing
 */
export async function GET(request) {
  const hostname = request.headers.get('host') || '';
  const isIntegrationDomain = isIntegrationSubdomain(hostname);
  const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

  let robotsContent;

  if (isIntegrationDomain) {
    robotsContent = `User-agent: *
Disallow: /`;
  } else if (isProd) {
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const sitemapUrl = `${protocol}://${hostname}/sitemap.xml`;
    
    robotsContent = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${sitemapUrl}`;
  } else {
    robotsContent = `User-agent: *
Disallow: /`;
  }

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
