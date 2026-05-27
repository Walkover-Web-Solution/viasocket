'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import style from '@/components/navbar/navbar.module.scss';

export default function TopNavLinks({ borderClass = '', backgroundClass = '', utm = '' }) {
    const MCPPadding = utm === '/embed' ? 'px-[21.5px] gini' : 'px-[21.4px] ragini-ji';
    const EmbedPadding = utm === '/embed' ? 'px-[18px] ragini' : 'px-[18.4px] ragi';
    
    return (
        <>
            <Link href="https://cal.id/team/viasocket/sales-team" target="_blank" rel="nofollow noopener noreferrer">
                <div
                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden border-l border-gray-300 lg:flex w-fit ${EmbedPadding} !h-[30px] items-center justify-center cursor-pointer hover:text-accent !text-xs text-nowrap`}
                >
                    Contact Sales
                </div>
            </Link>
            <Link
                href="https://cal.id/team/viasocket/hire-an-expert"
                target="_blank"
                rel="nofollow noopener noreferrer"
            >
                <div
                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden border-l border-gray-300 lg:flex w-fit ${MCPPadding} !h-[30px] items-center justify-center cursor-pointer hover:text-accent !text-xs text-nowrap`}
                >
                    Hire an expert
                </div>
            </Link>
            <Link href={'/support'}>
                <div
                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} border-l border-gray-300 hidden lg:flex w-fit px-4 !h-[30px] items-center justify-center cursor-pointer text-blue-500 !text-xs`}
                >
                    Support <ArrowUpRight className="w-3 h-3" />
                </div>
            </Link>
        </>
    );
}
