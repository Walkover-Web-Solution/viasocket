'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { collectUserInfo, getUtmData } from '@/utils/collectUserInfo';

/**
 * Reports every visit — signed in or not, first time or hundredth — so the row
 * for this visitor records which variant they were served.
 *
 * The variant and the visitor id are read from cookies by the API route rather
 * than sent from here: they are set by middleware, and the server is the only
 * side that can trust them.
 */
export default function VariantTracker() {
    // Deliberately not useSearchParams: in the root layout it would opt every
    // page out of static rendering. The query string is read off window instead.
    const pathname = usePathname();
    const lastTracked = useRef(null);

    useEffect(() => {
        const view = `${pathname}${window.location.search}`;

        // React runs effects twice in development, and a re-render must not count
        // as a second view — only an actual change of page does.
        if (lastTracked.current === view) return;
        lastTracked.current = view;

        fetch('/api/track-variant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userInfo: collectUserInfo(),
                pageUrl: window.location.href,
                utmData: getUtmData(),
            }),
            keepalive: true,
        }).catch(() => {
            // Tracking is best-effort and must never disturb the page.
        });
    }, [pathname]);

    return null;
}
