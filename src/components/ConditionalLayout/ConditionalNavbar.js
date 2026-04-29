'use client';

import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalNavbar - Hides navbar ONLY on integration-related subdomains
 * Instant rendering with no flicker using synchronous domain detection
 *
 * Behavior:
 * - viasocket.com → Navbar VISIBLE
 * - app.viasocket.com → Navbar VISIBLE
 * - admin.viasocket.com → Navbar VISIBLE
 * - integration.viasocket.com → Navbar HIDDEN
 * - integrations.viasocket.com → Navbar HIDDEN
 * - integrate.viasocket.com → Navbar HIDDEN
 */
export default function ConditionalNavbar({ children }) {
    // Synchronous domain detection - no useEffect, no useState
    const isIntegration = isIntegrationSubdomain();

    // Don't render at all if it's an integration subdomain
    if (isIntegration) {
        return null;
    }

    // Render immediately for all other domains
    return <>{children}</>;
}
