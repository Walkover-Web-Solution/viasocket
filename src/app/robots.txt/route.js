import { NextResponse } from 'next/server';

/**
 * Checks if the hostname is an integration-related subdomain
 * Matches the logic from src/utils/domain.js isIntegrationSubdomain()
 * 
 * @param {string} hostname - The hostname from the request
 * @returns {boolean} true if integration subdomain, false otherwise
 */
function isIntegrationSubdomain(hostname) {
  if (!hostname) {
    return false;
  }

  const parts = hostname.split('.');

  // Need at least 2 parts (subdomain.domain)
  if (parts.length < 2) {
    return false;
  }

  const subdomain = parts[0].toLowerCase();

  // Check if subdomain contains "integration" or "integrate"
  return subdomain.includes('integration') || subdomain.includes('integrate');
}

/**
 * Dynamic robots.txt generation based on subdomain
 * GET /robots.txt
 */
export async function GET(request) {
  // Get hostname from request headers
  const hostname = request.headers.get('host') || '';
  
  // Check if it's an integration subdomain
  const isIntegration = isIntegrationSubdomain(hostname);
  
  // Production robots.txt ONLY if:
  // 1. Environment is production AND
  // 2. Subdomain is NOT integration-related
  const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod' && !isIntegration;

  const robotsContent = isProd
    ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
    : `User-agent: *
Disallow: /`;

  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
