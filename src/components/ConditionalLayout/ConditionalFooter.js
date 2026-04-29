'use client';

import { useEffect, useState } from 'react';
import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalFooter - Hides footer ONLY on integration-related subdomains
 * Prevents flicker by hiding with CSS initially, then showing only if not integration subdomain
 * 
 * Behavior:
 * - viasocket.com → Footer VISIBLE
 * - app.viasocket.com → Footer VISIBLE
 * - admin.viasocket.com → Footer VISIBLE
 * - integration.viasocket.com → Footer HIDDEN
 * - integrations.viasocket.com → Footer HIDDEN
 */
export default function ConditionalFooter({ children }) {
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
