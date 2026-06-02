'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set deadline to 7 days from now (or use a fixed date)
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);

        const updateTimer = () => {
            const now = new Date();
            const diff = deadline - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatNum = (n) => String(n).padStart(2, '0');

    const marqueeItems = [
        '⚡ 200+ Teams Join Every Day',
        '⚡ Limited Lifetime Offer',
        '⚡ 30-Day Money-Back Guarantee',
    ];

    // Repeat enough sets so track is always wider than any viewport
    const sets = 6;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[101] bg-[#0a0a0a] h-11 flex items-center overflow-hidden"
            role="banner"
            aria-label="Limited time offer"
        >
            {/* Left: scrolling marquee */}
            <div className="flex-1 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_85%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_85%,transparent_100%)]">
                <div className={`flex w-max items-center ${styles.annMarqueeTrack}`}>
                    {[...Array(sets)].map((_, setIdx) => (
                        <span key={`set-${setIdx}`} className="contents">
                            {marqueeItems.map((item, i) => (
                                <span key={`${setIdx}-${i}`} className="contents">
                                    <span className="inline-flex items-center gap-2 px-7 whitespace-nowrap text-xs font-medium text-white tracking-wide">
                                        {item}
                                    </span>
                                    <span className="w-[3px] h-[3px] rounded-full bg-white/70 inline-block shrink-0 self-center" aria-hidden="true" />
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: countdown + CTA */}
            <div className="flex items-center gap-4 px-5 pl-7 shrink-0 border-l border-white/15 ml-3">
                <Link
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 bg-white text-[#0a0a0a] text-xs font-bold py-1.5 px-3.5 rounded-full whitespace-nowrap no-underline transition-colors duration-200 shrink-0"
                >
                    Choose Your Plan
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-[11px] h-[11px] stroke-current stroke-[2.5] fill-none [stroke-linecap:round] [stroke-linejoin:round]"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="13 6 19 12 13 18" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
