'use client';

import { ArrowRight, Gift, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroContent({ appCount }) {
    return (
        <div className="flex flex-col items-start text-left">
            <Link
                href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 mb-6 text-sm border border-white/20 shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
                <Gift size={16} className="text-accent" />
                <span className="font-medium text-accent tracking-wide">LIMITED-TIME OFFER</span>
                <span className="text-gray-700 font-medium text-sm">Get 6 months for the price of 1</span>
                <ChevronRight size={14} className="text-gray-500" />
            </Link>
            <h1 className="h1 !text-white mb-2">Give your AI Agents the Power to Act</h1>

            <p className="text-xl leading-[1.55] text-white/80 mb-8 max-w-[460px]">
                Connect your agent to {appCount + 300}+ apps and let it take action across your tools.
            </p>

            <div className="flex items-center gap-6">
                <Link href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-outline">
                    Get Started
                    <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
                <Link
                    href="https://cal.id/team/viasocket/sales-team"
                    className="text-white/80 hover:text-white underline text-lg"
                >
                    Contact sales
                </Link>
            </div>
        </div>
    );
}
