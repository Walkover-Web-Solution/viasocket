'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';
import WorkflowNetwork from './WorkflowNetwork';

const HeroSection = ({ appCount }) => {
    return (
        <section className="relative bg-[#faf9f6] min-h-screen flex items-center justify-center overflow-hidden">
            <WorkflowNetwork />
            <div className="container mx-auto px-4 text-center">
                {/* Label */}
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a8200d] mb-6">
                    Agency Partner Program
                </p>

                {/* Heading */}
                <h1 className="h1 mb-4">
                    Build automations for clients, <br />
                    with
                    <span className="text-[#a8200d]">viaSocket.</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    One account, unlimited client workspaces, and everything you need to build and manage automations
                    for every client you work with.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <Link href="/signup" className="btn btn-accent">
                        Become a Partner
                    </Link>
                    <Link href="/support" className="btn btn-outline">
                        Talk to Sales
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400">
                    Trusted by {appCount + 300}+ automation agencies worldwide
                </p>
                <ShowAppsIndexOptimized isTrustMarquee={true} />
            </div>
        </section>
    );
};

export default HeroSection;
