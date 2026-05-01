'use client';

import { useEffect, useState } from 'react';
import { isIntegrationSubdomain } from '@/utils/domain';

/**
 * ConditionalNavbar - Hides navbar ONLY on integration-related subdomains
 * Shows immediately on main domain, never shows on integration domains
 *
 * Behavior:
 * - viasocket.com → Navbar VISIBLE (no flicker)
 * - app.viasocket.com → Navbar VISIBLE (no flicker)
 * - admin.viasocket.com → Navbar VISIBLE (no flicker)
 * - integration.viasocket.com → Navbar HIDDEN (no flicker)
 * - integrations.viasocket.com → Navbar HIDDEN (no flicker)
 */
export default function ConditionalNavbar({ children }) {
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
