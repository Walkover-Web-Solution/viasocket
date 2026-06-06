'use client';

import { ArrowRight } from 'lucide-react';

export default function HeroContent({ agent }) {
    return (
        <div className="flex flex-col items-start text-left">
            <h1 className="flex flex-col items-start gap-[14px] text-white font-extrabold leading-[1.2] tracking-[-2px] mb-6 text-[32px] sm:text-[42px] lg:text-[54px]">
                <span className="flex flex-wrap items-center gap-[14px]">Give real hands</span>
                <span className="flex flex-wrap items-center gap-[14px]">
                    <span>to</span>
                    <span className="inline-flex items-center gap-[10px] rounded-xl border border-white/20 bg-black/45 backdrop-blur-md py-2 pr-[18px] pl-[10px] font-bold tracking-[-1px] text-white text-[24px] sm:text-[36px] transition-all duration-300">
                        <span className="inline-flex items-center justify-center w-9 h-9 [&_svg]:w-full [&_svg]:h-full">
                            {agent.icon}
                        </span>
                        <span>{agent.name}</span>
                    </span>
                </span>
            </h1>

            <p className="text-[18px] leading-[1.55] text-white/80 mb-8 max-w-[460px]">
                Connect your agent to 2,500+ apps with one MCP endpoint. Stop describing actions. Execute them.
            </p>

            <a href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-accent">
                Get Started
                <ArrowRight size={14} strokeWidth={2.2} />
            </a>
        </div>
    );
}
