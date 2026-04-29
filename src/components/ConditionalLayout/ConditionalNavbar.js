'use client';

import { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const show = !isIntegrationSubdomain();
    setShouldShow(show);
    setMounted(true);
  }, []);

  // Don't render at all if it's integration subdomain after mount
  if (mounted && !shouldShow) {
    return null;
  }

  // Use CSS to hide initially to prevent flicker
  return (
    <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
}
