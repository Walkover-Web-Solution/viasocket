'use client';

import Link from 'next/link';

export default function HeroContent() {
    return (
        <div className="relative z-[2] flex flex-col items-start text-left max-w-[760px] min-w-0 flex-1">
            <div className="inline-flex items-center gap-2.5 bg-white border border-black/10 rounded-full px-3.5 py-[7px] text-xs text-gray-500 mb-7 md:mb-6">
                <span aria-hidden className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span className="text-gray-900 font-bold tracking-[0.13em] text-[11px]">LIMITED LIFETIME OFFER</span>
            </div>

            <h1 className="h1 !font-semibold">
                Stop paying{' '}
                <span className="font-bold relative inline-block mx-2">
                    $70/mo.
                    <span
                        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 h-2 bg-[#A8200D] [transform:rotate(-4deg)] pointer-events-none"
                        aria-hidden
                    />
                </span>
                <br />
                Pay <span className="text-accent">once</span>. Automate <span className="text-accent">forever</span>.
            </h1>

            <p className="text-[17px] md:text-[18px] text-gray-500 leading-[1.65] max-w-[620px] m-0 mb-9">
                One payment for viaSocket Team &mdash; instead of{' '}
                <strong className="text-gray-900 font-bold">$840+ every single year</strong> to other automation tools
                <br />
                15,000 tasks &middot; 5,000 AI credits &middot; 2,200+ integrations included.
            </p>

            <div className="flex items-center gap-6 flex-wrap mb-8">
                <Link href="#pricing" className="btn btn-accent" rel="nofollow noopener noreferrer">
                    <span>Get Lifetime Access</span>
                    <span className="hidden sm:inline text-[13px] font-semibold opacity-90">from $399</span>
                    <span aria-hidden className="text-lg leading-none">
                        &rarr;
                    </span>
                </Link>
                <Link
                    href="#pricing"
                    className="text-gray-900 font-semibold text-[14.5px] hover:underline"
                    rel="nofollow noopener noreferrer"
                >
                    See what&rsquo;s inside
                </Link>
            </div>

            <div
                className="flex items-center gap-[18px] md:gap-3 flex-wrap text-[14px] md:text-[13px] text-gray-500"
                role="list"
            >
                {['30-day refund', 'One-time payment'].map((t, i) => (
                    <span key={t} className="contents">
                        <span role="listitem" className="inline-flex items-center gap-2 font-medium">
                            <svg
                                viewBox="0 0 16 16"
                                className="w-3.5 h-3.5 flex-shrink-0"
                                fill="none"
                                stroke="#16A34A"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                            >
                                <polyline points="3 8 7 12 13 4" />
                            </svg>
                            {t}
                        </span>
                        {i === 0 && <span aria-hidden className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />}
                    </span>
                ))}
            </div>
        </div>
    );
}
