'use client';

import { useEffect } from 'react';

/**
 * ReferralCaptureWrapper Component
 * 
 * Simpler wrapper to capture referral directly without external function
 * This ensures it runs on client side properly
 */
const ReferralCaptureWrapper = () => {
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const ref = params.get('ref');

            if (ref && ref.trim().length > 0) {
                const trimmedRef = ref.trim();
                localStorage.setItem('referralId', trimmedRef);

                try {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('ref');
                    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
                } catch (error) {
                    console.error('Failed to clean referral URL:', error);
                }
            }
        } catch (error) {
            console.error('Failed to capture referral:', error);
        }
    }, []);

    return null;
};

export default ReferralCaptureWrapper;
