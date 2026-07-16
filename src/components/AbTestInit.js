'use client';
import { useEffect } from 'react';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

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
