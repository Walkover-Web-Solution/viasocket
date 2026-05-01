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
    const [isChecked, setIsChecked] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const isIntegration = isIntegrationSubdomain();
        setShouldRender(!isIntegration);
        setIsChecked(true);
    }, []);

    // Don't render at all if it's an integration subdomain
    if (isChecked && !shouldRender) {
        return null;
    }

    // Hide with CSS until check is complete to prevent flicker
    return <div style={{ display: isChecked ? 'block' : 'none' }}>{children}</div>;
}
