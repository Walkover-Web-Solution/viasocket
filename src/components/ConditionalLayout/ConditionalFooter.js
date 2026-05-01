'use client';

import { useEffect, useState } from 'react';
import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalFooter - Hides footer ONLY on integration-related subdomains
 * Shows immediately on main domain, never shows on integration domains
 *
 * Behavior:
 * - viasocket.com → Footer VISIBLE (no flicker)
 * - app.viasocket.com → Footer VISIBLE (no flicker)
 * - admin.viasocket.com → Footer VISIBLE (no flicker)
 * - integration.viasocket.com → Footer HIDDEN (no flicker)
 * - integrations.viasocket.com → Footer HIDDEN (no flicker)
 */
export default function ConditionalFooter({ children }) {
    const [isIntegration, setIsIntegration] = useState(false);

    useEffect(() => {
        setIsIntegration(isIntegrationSubdomain());
    }, []);

    // Hide completely on integration domains after check
    if (isIntegration) {
        return null;
    }

    // Show on main domain immediately (default visible)
    return <>{children}</>;
}
