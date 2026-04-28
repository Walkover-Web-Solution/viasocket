/**
 * Detects if the current hostname is an integration-related subdomain
 * ONLY returns true for integration.*, integrations.*, integrate.* subdomains
 * All other domains/subdomains return false
 * 
 * @returns {boolean} true ONLY if integration subdomain, false otherwise
 * 
 * @example
 * viasocket.com → false (main domain, show header/footer)
 * app.viasocket.com → false (non-integration subdomain, show header/footer)
 * admin.viasocket.com → false (non-integration subdomain, show header/footer)
 * integration.viasocket.com → true (integration subdomain, hide header/footer)
 * integrations.viasocket.com → true (integration subdomain, hide header/footer)
 */
export function isIntegrationSubdomain() {
  if (typeof window === 'undefined') {
    return false;
  }

  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Need at least 2 parts (subdomain.domain)
  if (parts.length < 2) {
    return false;
  }

  const subdomain = parts[0].toLowerCase();

  // Check if subdomain contains "integration" or "integrate"
  return subdomain.includes('integration') || subdomain.includes('integrate');
}

// Backward compatibility alias
export const isSubdomain = isIntegrationSubdomain;

/**
 * Gets the subdomain from the current hostname (only if integration-related)
 * Returns null for all non-integration subdomains
 * 
 * @returns {string|null} subdomain name or null if not integration subdomain
 * 
 * @example
 * viasocket.com → null
 * app.viasocket.com → null (not integration-related)
 * integration.viasocket.com → "integration"
 * integrations.viasocket.com → "integrations"
 */
export function getIntegrationSubdomain() {
  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  if (parts.length < 2) {
    return null;
  }

  const subdomain = parts[0].toLowerCase();

  // Only return subdomain if it's integration-related
  if (subdomain.includes('integration') || subdomain.includes('integrate')) {
    return parts[0];
  }

  return null;
}

// Backward compatibility alias
export const getSubdomain = getIntegrationSubdomain;

/**
 * Server-side compatible function to check if hostname is an integration subdomain
 * Works with Next.js headers() API
 * 
 * @param {string} hostname - The hostname to check
 * @returns {boolean} true if integration subdomain, false otherwise
 * 
 * @example
 * const hostname = headers().get('host') || '';
 * const isIntegration = isIntegrationSubdomainSSR(hostname);
 */
export function isIntegrationSubdomainSSR(hostname) {
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
