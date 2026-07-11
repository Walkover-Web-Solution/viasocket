'use client';

import { useEffect } from 'react';
import { getStoredReferral, trackReferral } from '@/utils/referral';

export default function LoginPage() {
    useEffect(() => {
        // Track immediately in case someone lands directly on /login?ref=xxx
        trackReferral();
        
        const storedRef = getStoredReferral();
        
        if (storedRef) {
            window.location.href = `https://flow.viasocket.com/?ref=${storedRef}`;
        } else {
            // Preserve the existing redirect exactly as it works today
            window.location.href = 'https://flow.viasocket.com/';
        }
    }, []);

    return null;
}
