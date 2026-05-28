'use client';

import { ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';
import HeroHub from './HeroHub';

const HERO_FEATURES = [
    { label: 'Expert implementation', icon: ShieldCheck },
    { label: 'Ongoing support', icon: Tag },
    { label: 'Smart pricing', icon: Zap },
];

export default function Hero({ onHire }) {
    return (
        <section className="container pt-20 pb-24 grid lg:grid-cols-[1.35fr_1fr] grid-cols-1 gap-14 items-center">
            <div>
                <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3">
                    Workflow Automation Services
                </span>

                <h1 className="text-[44px] md:text-[60px] font-bold leading-[1.08] tracking-[-1px] mb-6">
                    Get your use cases automated by experts
                </h1>
                <p className="text-[17px] md:text-[19px] text-gray-500 leading-[1.6] mb-7 max-w-[520px]">
                    Share your workflow challenges and our team will plan, build, and manage the right automation setup
                    for you.
                </p>

                <div className="flex items-center gap-5 flex-wrap mb-10">
                    {HERO_FEATURES.map((f, i) => (
                        <div
                            key={f.label}
                            className={`inline-flex items-center gap-2 text-sm font-medium ${
                                i > 0 ? 'pl-5 border-l border-[#ececec]' : ''
                            }`}
                        >
                            <f.icon className="w-[18px] h-[18px] text-accent" strokeWidth={2} />
                            {f.label}
                        </div>
                    ))}
                </div>

                <button
                    onClick={onHire}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-[#8a1a0a] text-white text-sm font-semibold rounded-full transition-colors group"
                >
                    Hire an Expert
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>

            <div className="flex justify-center">
                <HeroHub />
            </div>
        </section>
    );
}
