'use client';

import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalFooter - Hides footer ONLY on integration-related subdomains
 * Instant rendering with no flicker using synchronous domain detection
 *
 * Behavior:
 * - viasocket.com → Footer VISIBLE
 * - app.viasocket.com → Footer VISIBLE
 * - admin.viasocket.com → Footer VISIBLE
 * - integration.viasocket.com → Footer HIDDEN
 * - integrations.viasocket.com → Footer HIDDEN
 * - integrate.viasocket.com → Footer HIDDEN
 */
export default function ConditionalFooter({ children }) {
    // Synchronous domain detection - no useEffect, no useState
    const isIntegration = isIntegrationSubdomain();

    // Don't render at all if it's an integration subdomain
    if (isIntegration) {
        return null;
    }

    // Render immediately for all other domains
    return <>{children}</>;
}
