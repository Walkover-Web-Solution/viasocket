'use client';

import Link from 'next/link';
import LimitedTimeOffer from '@/app/components/embed/LimitedTimeOffer';
import HeroCtaButtons from '@/app/components/embed/HeroCtaButtons';

export default function HeroContent({ appCount }) {
    return (
        <div className="flex flex-col items-start text-left gap-4">
            <LimitedTimeOffer href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" />
            <h1 className="h1 !text-white">Give your AI Agents the Power to Act</h1>

            <p className="text-base sm:text-lg md:text-xl leading-[1.55] text-white/80 mb-6 md:mb-8 max-w-[460px]">
                Your users connect {appCount + 300}+ apps, <br /> callable by your AI as tools or MCP servers
            </p>

            <HeroCtaButtons signupHref="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 items-center justify-start w-full" />
        </div>
    );
}
