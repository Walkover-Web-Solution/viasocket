'use client';
import { useEffect } from 'react';
import { getCookie, setCookie } from '@/utils/handleUtmSource';

export default function AbTestInit({ variant }) {
    useEffect(() => {
        const existing = getCookie('ab_test');
        const isLoggedIn = !!getCookie('prod');

        if (existing) {
            try {
                const abData = JSON.parse(decodeURIComponent(existing));
                // Update signup flag if user is now logged in (one-way latch)
                if (isLoggedIn && !abData.signup) {
                    abData.signup = true;
                    setCookie('ab_test', encodeURIComponent(JSON.stringify(abData)), 365);
                }
            } catch {}
            return;
        }

        // No ab_test cookie exists — create it client-side
        const signup = isLoggedIn;
        setCookie('ab_test', encodeURIComponent(JSON.stringify({ variant, signup })), 365);
    }, [variant]);

    return null;
}
