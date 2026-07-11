'use client';

import LogoMarquee from './LogoMarquee';
import PricingSliderCard from './PricingSliderCard';

export default function PricingHeroSection({ hasToken }) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-4">
                    <h1 className="h1">
                        Start free with <span className="text-accent">2,000 tasks</span> and{' '}
                        <span className="text-accent">500 AI credits</span> a month
                    </h1>

                    <p className="text-xl">
                        built on enterprise-grade security, with role-based plans so you only pay for what your team
                        actually needs.
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border w-fit">
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
                    </div>

                    {/* Trusted By - Marquee */}
                    <LogoMarquee />
                </div>

                {/* Right Card */}
                <div className="flex justify-center lg:justify-end">
                    <PricingSliderCard hasToken={hasToken} />
                </div>
                </div>
            </div>
        </div>
    );
}
