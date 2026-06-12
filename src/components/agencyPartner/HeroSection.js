'use client';

import Link from 'next/link';
import React from 'react';
import WorkflowNetwork from './WorkflowNetwork';
import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';

export default function HeroSection({
    eyebrow = 'Agency Partner Program',
    titleLine1 = 'Build automations for clients,',
    titleLine2 = 'viaSocket.',
    subtitle = 'One account, unlimited client workspaces, and everything you need to build and manage automations for every client you work with.',
    appCount,
}) {
    const renderTitle = () => {
        if (typeof titleLine1 === 'string' && typeof titleLine2 === 'string') {
            return (
                <>
                    {titleLine1}
                    <br />
                    <span className="relative inline-block">
                        <span
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none -z-10"
                            style={{
                                background:
                                    'radial-gradient(circle at center, rgba(168, 32, 13, 0.05) 0%, rgba(168, 32, 13, 0.03) 40%, transparent 72%)',
                                filter: 'blur(300px)',
                            }}
                        />
                        with <span className="text-[#a8200d]">{titleLine2}</span>
                    </span>
                </>
            );
        }
        return titleLine1;
    };

    return (
        <section className="relative overflow-hidden bg-[#fafafa] min-h-[100dvh] flex flex-col pt-[48px] lg:pt-[78px]">
            {/* Workflow network background */}
            <WorkflowNetwork />

            <div className="flex flex-col items-center justify-center text-center py-16 px-5 md:py-[88px] md:px-8 relative z-10 max-w-[1140px] mx-auto w-full flex-1">
                {eyebrow && (
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#a8200d] mb-5">
                        {eyebrow}
                    </span>
                )}

                <h1 className="h1">{renderTitle()}</h1>

                {subtitle && (
                    <p className="max-w-[720px] text-[clamp(16px,1.8vw,19px)] leading-[1.65] text-[#555] mb-10">
                        {subtitle}
                    </p>
                )}

                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-5 mb-14">
                    <Link href="/signup" className="btn btn-accent">
                        Become a partner
                    </Link>

                    <Link href="/contact" className="btn btn-outline">
                        Talk to sales
                        <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
            <ShowAppsIndexOptimized isHomePage appCount={appCount} />
        </section>
    );
}
