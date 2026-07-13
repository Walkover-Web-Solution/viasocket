'use client';

import { useEffect } from 'react';
import { setUtmSource } from '@/utils/handleUtmSource';

export default function LoginPage() {
    useEffect(() => {
        setUtmSource();
        
        let queryParams = [];
        if (typeof document !== 'undefined') {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; utmData=`);
            if (parts.length === 2) {
                const utmRaw = parts.pop().split(';').shift();
                if (utmRaw) {
                    try {
                        const parsed = JSON.parse(decodeURIComponent(utmRaw));
                        Object.entries(parsed).forEach(([key, val]) => {
                            queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
                        });
                    } catch (e) {}
                }
            }
        }
        
        const queryString = queryParams.join('&');
        
        if (queryString) {
            window.location.href = `https://flow.viasocket.com/?${queryString}`;
        } else {
            window.location.href = 'https://flow.viasocket.com/';
        }
    }, []);

    return null;
}
