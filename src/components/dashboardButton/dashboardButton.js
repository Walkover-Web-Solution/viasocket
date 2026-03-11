"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { handleRedirect } from '@/utils/handleRedirection';

const DashboardButton = ({ utm_src, className = "", hasToken }) => {

    return (
        <>
            {hasToken ? (
                <button
                    className={`btn btn-accent z-50 ${className}`}
                    onClick={(e) => handleRedirect(e, `https://flow.viasocket.com?`, null, utm_src)}
                >
                    Dashboard <FaArrowRightLong />
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