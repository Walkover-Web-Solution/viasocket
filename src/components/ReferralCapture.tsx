'use client';

import { useEffect } from 'react';
import { captureReferralFromUrl } from '@/utils/referralUtils';

/**
 * ReferralCapture Component
 *
 * Captures referral ID from URL query parameter on page load.
 * Should be placed on the home page or main entry point.
 *
 * Usage:
 * <ReferralCapture />
 *
 * Handles:
 * - Extracting ref parameter from URL
 * - Validating and trimming the value
 * - Saving to localStorage
 * - Cleaning up URL (optional)
 */
const ReferralCapture = () => {
    useEffect(() => {
        const capturedRef = captureReferralFromUrl();

        if (capturedRef) {
            try {
                const url = new URL(window.location.href);
                url.searchParams.delete('ref');

                if (url.search) {
                    window.history.replaceState({}, '', url.toString());
                } else {
                    window.history.replaceState({}, '', url.pathname);
                }
            } catch (error) {
                console.error('Failed to clean referral URL:', error);
            }
        }
    }, []);

    return null;
};

export default ReferralCapture;
