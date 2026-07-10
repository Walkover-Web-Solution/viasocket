'use client';

import { useEffect } from 'react';
import { appendReferralToUrl, getReferral } from '@/utils/referralUtils';

/**
 * ReferralDebugger Component
 * Makes referral functions available globally for testing in console
 */
const ReferralDebugger = () => {
    useEffect(() => {
        // Make functions available globally for testing
        (window as any).appendReferralToUrl = appendReferralToUrl;
        (window as any).getReferral = getReferral;
        
        console.log('[ReferralDebugger] Functions available globally:');
        console.log('- window.appendReferralToUrl(url)');
        console.log('- window.getReferral()');
    }, []);

    return null;
};

export default ReferralDebugger;
