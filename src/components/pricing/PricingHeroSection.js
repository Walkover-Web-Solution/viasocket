'use client';
import LogoMarquee from './LogoMarquee';
import { ArrowRight, Puzzle, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PricingHeroSection() {
    return (
        <section className="bg-white">
            <div className="mt-12 md:mt-0 flex flex-col gap-10 items-center justify-center global-top-space min-h-screen">
                <div className="container flex flex-col gap-10 items-center justify-center">
                    <div className="flex flex-col gap-2 items-center mt-12">
                        <h1 className="h1 text-center">
                            Start free with every feature included <span className="text-accent">10,000 tasks</span> and{' '}
                            <span className="text-accent">500 AI credits</span> every month.
                        </h1>
                        <p className="text-center text-xl">
                            Power your workflows with 2,200+ integrations, built-in AI, and a platform designed to scale
                            with your team.
                        </p>
                    </div>

                    <Link
                        href="/signup"
                        className="btn btn-accent"
                        data-track="pricing_hero_signup"
                        data-track-section="pricing"
                        data-track-action="signup_click"
                    >
                        Start With Free Plan
                        <ArrowRight />{' '}
                    </Link>

                    <div className="flex flex-col items-center gap-6 mt-6">
                        {/* Rating */}
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-50 w-fit">
                            <div className="flex gap-0.5">
                                <span className="text-xs text-yellow-400">★</span>
                                <span className="text-xs text-yellow-400">★</span>
                                <span className="text-xs text-yellow-400">★</span>
                                <span className="text-xs text-yellow-400">★</span>
                                <span className="relative text-xs text-gray-300">
                                    ★
                                    <span className="absolute left-0 top-0 text-yellow-400 overflow-hidden w-1/2">
                                        ★
                                    </span>
                                </span>
                            </div>
                            <span className="font-bold text-xs text-gray-900">4.6/5</span>
                            <span className="text-gray-600 text-xs">(90+ on G2)</span>
                        </div>

                        {/* Trusted By - Marquee */}
                        <LogoMarquee />
                    </div>
                </div>

                {/* Stats bar */}
                <div className="w-full relative z-10 mt-16">
                    <div className="bg-[#f9f6f1] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-20 xl:gap-32">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-yellow-100 shrink-0">
                                <Puzzle size={18} className="text-accent" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-accent text-lg md:text-xl">2200+</span>
                                <span className="text-sm">Apps & Integrations</span>
                            </div>
                        </div>

                        <span className="hidden md:block w-px h-8 bg-gray-200" />

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-yellow-100 shrink-0">
                                <TrendingUp size={18} className="text-accent" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-accent text-lg md:text-xl">10M+</span>
                                <span className="text-sm">Tasks Automated</span>
                            </div>
                        </div>

                        <span className="hidden md:block w-px h-8 bg-gray-200" />

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-yellow-100 shrink-0">
                                <ShieldCheck size={18} className="text-accent" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-accent text-lg md:text-xl">99.9%</span>
                                <span className="text-sm">Platform Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
