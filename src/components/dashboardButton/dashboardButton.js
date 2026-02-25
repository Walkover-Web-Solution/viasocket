"use client";

import { FaArrowRightLong } from "react-icons/fa6";
// import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';

const DashboardButton = ({ utm_src, className = "", hasToken }) => {
    // const [hasToken, setHasToken] = useState(false);

    // // Read a cookie value by name (client-side only)
    // const getCookie = (name) => {
    //     if (typeof document === 'undefined') return undefined;
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    //     return undefined;
    // };

    // useLayoutEffect(() => {
    //     const token = getCookie('prod');
    //     setHasToken(Boolean(token));
    // }, []);

    return (
        <>
            {hasToken ? (
                <Link href={`https://flow.viasocket.com?utm_source=${utm_src}`} className={className}>
                    <button className="btn btn-accent z-50">Dashboard <FaArrowRightLong /></button>
                </Link>
            ) : (
                <Link href={`/signup?utm_source=${utm_src}`} className={className}>
                    <button className="btn btn-accent z-50">Start for free</button>
                </Link>
            )}
        </>
    )
}

export default DashboardButton;