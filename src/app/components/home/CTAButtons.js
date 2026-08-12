'use client';

import { ArrowRight } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';
import { savePageUtmSource } from '@/utils/handleUtmSource';

// Home A variant tag — the source a signup from this hero reports.
const HOME_A_UTM_SOURCE = 'home-A';
const SIGNUP_URL = `/signup?utm_source=${HOME_A_UTM_SOURCE}`;

export default function CTAButtons({ hasToken }) {
    const go = (e) => {
        savePageUtmSource(HOME_A_UTM_SOURCE);

        if (hasToken) {
            handleRedirect(e, `https://flow.viasocket.com?`, null, HOME_A_UTM_SOURCE);
            return;
        }

        // Straight to signup rather than handleRedirect, which sends utm_source
        // twice — once inside `state`, once standalone. Only the standalone one is
        // read: CustomLoginOptimized rebuilds `state` itself from the cookie.
        window.open(SIGNUP_URL, '_self');
    };

    return (
        <div className="flex gap-4 justify-center">
            <button className="btn btn-accent z-50 relative z-index-1" onClick={go}>
                {hasToken ? (
                    <>
                        Dashboard <ArrowRight className="w-4 h-4" />
                    </>
                ) : (
                    'Start for free'
                )}
            </button>
        </div>
    );
}
