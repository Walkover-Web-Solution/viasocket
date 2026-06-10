'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroContent({ agent }) {
    return (
        <div className="flex flex-col items-start text-left">
            <h1 className="h1 !text-white mb-2">Give your AI Agents Real hands</h1>

            <p className="text-xl leading-[1.55] text-white/80 mb-8 max-w-[460px]">
                Connect your agent to 2,500+ apps and let it take action across your tools.
            </p>

            <div className="flex items-center gap-6">
                <Link href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-accent">
                    Get Started
                    <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
                <Link href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="text-white/80 hover:text-white underline text-lg">
                    Contact sales
                </Link>
            </div>
        </div>
    );
}
