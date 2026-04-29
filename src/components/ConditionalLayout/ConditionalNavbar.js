'use client';

import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalNavbar - Hides navbar ONLY on integration-related subdomains
 * Prevents flicker by hiding with CSS initially, then showing only if not integration subdomain
 * 
 * Behavior:
 * - viasocket.com → Navbar VISIBLE
 * - app.viasocket.com → Navbar VISIBLE
 * - admin.viasocket.com → Navbar VISIBLE
 * - integration.viasocket.com → Navbar HIDDEN
 * - integrations.viasocket.com → Navbar HIDDEN
 */
export default function ConditionalNavbar({ children }) {
  if (typeof window !== 'undefined' && isIntegrationSubdomain()) {
    return null;
  }

  return <>{children}</>;
}
