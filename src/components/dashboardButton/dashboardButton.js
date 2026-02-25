"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';

const DashboardButton = ({ utm_src, className = "", hasToken }) => {

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