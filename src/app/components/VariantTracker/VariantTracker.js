'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackInteraction, trackView } from '@/utils/trackVisitor';

/**
 * The site's one tracking provider.
 *
 * It reports two things against the single row a visitor owns: that they looked at
 * a page, and that they pressed something meaningful. Both go to the same endpoint
 * and the same row, so a click can never insert a visitor.
 *
 * The variant and the visitor id are read from cookies by the API route rather
 * than sent from here: they are set by middleware, and the server is the only
 * side that can trust them.
 */

/**
 * Which presses count.
 *
 * Rather than a handler on every button, meaningful elements name themselves with
 * `data-track` and one listener on the document picks them up. That keeps the
 * decision about what is worth recording next to the markup it describes, and
 * means a new CTA is instrumented by naming it rather than by wiring it up.
 *
 *   data-track             stable identifier, e.g. "header_pricing"  (required)
 *   data-track-label       human label; defaults to the element's text
 *   data-track-section     "header" | "hero" | "main" | "footer" | "menu" | …
 *   data-track-action      defaults to "click"; "signup_click", "login_click", …
 *   data-track-destination where it leads; defaults to the nearest href
 */
const TRACK_SELECTOR = '[data-track]';

const absolute = (url) => {
    if (!url) return '';
    try {
        return new URL(url, window.location.href).href;
    } catch {
        return url;
    }
};

const describe = (element) => {
    const { track, trackLabel, trackSection, trackAction, trackDestination } = element.dataset;

    const href = trackDestination || element.getAttribute('href') || element.closest('a')?.getAttribute('href') || '';

    return {
        element: track,
        label: trackLabel || element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '',
        section: trackSection || 'other',
        action: trackAction || 'click',
        destinationUrl: absolute(href),
    };
};

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

        trackView();
    }, [pathname]);

    useEffect(() => {
        const onClick = (nativeEvent) => {
            // Capture phase and no preventDefault check: the press is reported
            // whatever the page then chooses to do with it, including navigating
            // away, and reporting never interferes with that.
            const target = nativeEvent.target?.closest?.(TRACK_SELECTOR);
            if (!target) return;

            try {
                trackInteraction(describe(target));
            } catch {
                // A page must never break because something could not be reported.
            }
        };

        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
