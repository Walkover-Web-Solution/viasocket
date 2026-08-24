'use client';

import { setCookie } from '@/utils/handleUtmSource';

// n8n migration campaign tag. Every signup CTA on this page reports this source.
const N8N_UTM_SOURCE = 'n8n-migration';
const SIGNUP_URL = `/signup?utm_source=${N8N_UTM_SOURCE}`;

/**
 * Signup CTA for the n8n migration page.
 *
 * Cloned from RelaySignupCTA with only the source constant changed, so the live
 * Relay page is not touched. The cookie stamp matters: `utm_source` is the param
 * the signup page consumes via setUtmSource(), which forwards it to MSG91 as
 * `state` — but setUtmSource reads the `utmData` cookie first and only falls back
 * to the query string, so a stale cookie from an earlier page would otherwise be
 * reported for this conversion.
 *
 * Navigation is a full page load in the same tab, not a client-side route change,
 * so /signup reads the query string fresh.
 */
export default function N8nSignupCTA({ className, children }) {
    const goToSignup = () => {
        setCookie('utmData', JSON.stringify({ utm_source: N8N_UTM_SOURCE }), 1);
        window.open(SIGNUP_URL, '_self');
    };

    return (
        <button type="button" className={className} onClick={goToSignup}>
            {children}
        </button>
    );
}
