'use client';

import { ArrowRight, Gift } from 'lucide-react';
import Link from 'next/link';

export default function HeroContent({ appCount }) {
    return (
        <div className="flex flex-col items-start text-left">
            <Link
                href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 mb-6 text-xs md:text-sm border border-white/20 shadow-sm hover:bg-white hover:shadow-md transition-all max-w-full"
            >
                <Gift size={14} className="text-accent shrink-0" />
                <span className="font-medium text-accent tracking-wide whitespace-nowrap">LIMITED-TIME OFFER</span>
                <span className="text-gray-700 font-medium">Get 6 months for the price of 1</span>
                <ArrowRight size={14} strokeWidth={2.2} className="shrink-0" />
            </Link>
            <h1 className="h1 !text-white !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl mb-2">Give your AI Agents the Power to Act</h1>

            <p className="text-base sm:text-lg md:text-xl leading-[1.55] text-white/80 mb-6 md:mb-8 max-w-[460px]">
                Your users connect {appCount + 300}+ apps, <br /> callable by your AI as tools or MCP servers
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 items-center justify-center md:justify-start w-full">
                <Link href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-outline">
                    Get Started
                    <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
                <Link
                    href="https://cal.id/team/viasocket/sales-team"
                    className="text-white/80 hover:text-white underline"
                    target="_blank"
                >
                    Contact sales
                </Link>
            </div>
        </div>
    );
}
