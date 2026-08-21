'use client';

import { ArrowRight } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';
import { savePageUtmSource } from '@/utils/handleUtmSource';
import { trackCtaClick } from '@/utils/trackVisitor';

// Home A variant tag — the source a signup from this hero reports.
const HOME_A_UTM_SOURCE = 'home-A';
const SIGNUP_URL = `/signup?utm_source=${HOME_A_UTM_SOURCE}`;

export default function CTAButtons({ hasToken }) {
    const go = (e) => {
        savePageUtmSource(HOME_A_UTM_SOURCE);

        // Signed in, this is a jump to the dashboard; signed out it is the start of
        // a signup. They are recorded as the different actions they are.
        trackCtaClick(
            HOME_A_UTM_SOURCE,
            hasToken
                ? {
                      element: 'hero_dashboard',
                      label: 'Dashboard',
                      action: 'dashboard_click',
                      destinationUrl: 'https://flow.viasocket.com',
                  }
                : {
                      element: 'hero_start_free',
                      label: 'Start for free',
                      action: 'signup_click',
                      destinationUrl: SIGNUP_URL,
                  }
        );

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
