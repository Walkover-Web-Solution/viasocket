'use client';

import { useEffect, useState } from 'react';
import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalFooter - Hides footer ONLY on integration-related subdomains
 * 
 * Behavior:
 * - viasocket.com → Footer VISIBLE
 * - app.viasocket.com → Footer VISIBLE
 * - admin.viasocket.com → Footer VISIBLE
 * - integration.viasocket.com → Footer HIDDEN
 * - integrations.viasocket.com → Footer HIDDEN
 */
export default function ConditionalFooter({ children }) {
  const [shouldRender, setShouldRender] = useState(false); // Default to hidden to prevent flicker

  useEffect(() => {
    // Only show footer if NOT an integration subdomain
    setShouldRender(!isIntegrationSubdomain());
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
