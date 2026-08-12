'use client';

import { setCookie } from '@/utils/handleUtmSource';

// Relay Ads campaign tag. Every signup CTA on this page reports this source.
const RELAY_UTM_SOURCE = 'relay-switch-google-ads';
const SIGNUP_URL = `/signup?utm_source=${RELAY_UTM_SOURCE}`;

/**
 * Signup CTA for the Relay page.
 *
 * `utm_source` is the param the signup page consumes: CustomLoginOptimized calls
 * setUtmSource(), which forwards it to MSG91 as `state`. But setUtmSource reads
 * the `utmData` cookie first and only falls back to the query string, so a stale
 * cookie left by an earlier page — an integrations visit, say — would be
 * reported for this Relay conversion. Stamping the cookie here keeps a Relay
 * signup attributed to Relay.
 *
 * Navigation is a full page load in the same tab, not a client-side route
 * change, so /signup reads the query string fresh.
 */
export default function RelaySignupCTA({ className, children }) {
    const goToSignup = () => {
        setCookie('utmData', JSON.stringify({ utm_source: RELAY_UTM_SOURCE }), 1);
        window.open(SIGNUP_URL, '_self');
    };

    return (
        <button type="button" className={className} onClick={goToSignup}>
            {children}
        </button>
    );
}
