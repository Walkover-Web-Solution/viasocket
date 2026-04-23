'use client';

import { useEffect, useState } from 'react';
import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalNavbar - Hides navbar ONLY on integration-related subdomains
 * 
 * Behavior:
 * - viasocket.com → Navbar VISIBLE
 * - app.viasocket.com → Navbar VISIBLE
 * - admin.viasocket.com → Navbar VISIBLE
 * - integration.viasocket.com → Navbar HIDDEN
 * - integrations.viasocket.com → Navbar HIDDEN
 */
export default function ConditionalNavbar({ children }) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setShouldRender(!isIntegrationSubdomain());
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
