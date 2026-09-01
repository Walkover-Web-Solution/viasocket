"use client";

import { ArrowRight } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';

// This button is the site's most reused signup CTA, so `section` lets each of its
// call sites say which part of the site the press came from — otherwise every one
// of them reports as the same anonymous element.
const DashboardButton = ({ utm_src, className = "", hasToken, section = 'main' }) => {

    return (
        <>
            {hasToken ? (
                <button
                    className={`btn btn-accent z-50 ${className}`}
                    data-track="dashboard_button_dashboard"
                    data-track-section={section}
                    data-track-action="dashboard_click"
                    data-track-destination="https://flow.viasocket.com"
                    onClick={(e) => handleRedirect(e, `https://flow.viasocket.com?`, null, utm_src)}
                >
                    Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <button
                    className={`btn btn-accent z-50 ${className}`}
                    data-track="dashboard_button_signup"
                    data-track-section={section}
                    data-track-action="signup_click"
                    data-track-destination="/signup"
                    onClick={(e) => handleRedirect(e, `/signup?`, null, utm_src)}
                >
                    Start for free
                </button>
            )}
        </>
    )
}

export default DashboardButton;