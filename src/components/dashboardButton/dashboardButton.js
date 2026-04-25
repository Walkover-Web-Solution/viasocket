"use client";

import { ArrowRight } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';

const DashboardButton = ({ utm_src, className = "", hasToken }) => {

    return (
        <>
            {hasToken ? (
                <button
                    className={`btn btn-accent z-50 ${className}`}
                    onClick={(e) => handleRedirect(e, `https://flow.viasocket.com?`, null, utm_src)}
                >
                    Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <button
                    className={`btn btn-accent z-50 ${className}`}
                    onClick={(e) => handleRedirect(e, `/signup?`, null, utm_src)}
                >
                    Start for free
                </button>
            )}
        </>
    )
}

export default DashboardButton;