'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        rating: 5,
        heading: 'Fast implementation and reliable support',
        body: 'We moved from manual lead assignment to a fully automated workflow within days. The expert guidance made the process simple.',
        name: 'Riya Kapoor',
        role: 'Growth Manager at Sprintly',
        initials: 'RK',
    },
    {
        rating: 5,
        heading: 'Much easier than managing workflows ourselves',
        body: 'Instead of spending time debugging automations, our team could focus entirely on operations while Viasocket handled the setup.',
        name: 'Daniel Thomas',
        role: 'Operations Manager at NovaDesk',
        initials: 'DT',
    },
    {
        rating: 5,
        heading: 'Automation setup felt effortless',
        body: 'The Viasocket team handled the workflow planning, implementation, and testing smoothly. Our team saved hours of repetitive work every week.',
        name: 'Aarav Mehta',
        role: 'Operations Lead at Scaleflow',
        initials: 'AM',
    },
];

function TestimonialCard({ t, className, style, onClick }) {
    return (
        <div className={className} style={style} onClick={onClick}>
            <div className="flex gap-[3px] mb-3.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
            </div>
            <h3 className="text-lg font-semibold tracking-[-0.2px] leading-[1.3] mb-2.5">{t.heading}</h3>
            <p className="text-sm text-[#6b7280] leading-[1.6] mb-5 flex-1">{t.body}</p>
            <hr className="border-t border-[#ececec] mb-4" />
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fdf6f4] to-[#f3c8be] text-accent flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {t.initials}
                </div>
                <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-[#6b7280] mt-px">{t.role}</div>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialsCarousel() {
    const [idx, setIdx] = useState(0);
    const total = TESTIMONIALS.length;
    const prev = () => setIdx((i) => (i - 1 + total) % total);
    const next = () => setIdx((i) => (i + 1) % total);

    return (
        <section className="container py-24">
            <div className="text-center mb-14">
                <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3.5">
                    client feedback
                </span>
                <h2 className="text-2xl font-bold tracking-[-1.2px] leading-[1.15] mb-3.5">
                    What teams say about working with Viasocket
                </h2>
                <p className="text-[17px] text-[#555]">From founders, ops leads and agencies shipping fast.</p>
            </div>

            <div className="relative md:h-[340px] flex md:block flex-col items-center gap-4">
                {TESTIMONIALS.map((t, i) => {
                    const state =
                        i === idx
                            ? 'active'
                            : i === (idx - 1 + total) % total
                              ? 'prev'
                              : i === (idx + 1) % total
                                ? 'next'
                                : 'hidden';

                    const base =
                        'md:absolute md:top-0 bg-white border border-[#ececec] rounded-lg p-8 flex flex-col w-full md:w-[480px] transition-all duration-400';

                    if (state === 'active') {
                        return (
                            <TestimonialCard
                                key={i}
                                t={t}
                                className={`${base} md:left-1/2 md:-translate-x-1/2 md:z-20 opacity-100 shadow-[0_12px_28px_rgba(15,23,42,0.08)]`}
                            />
                        );
                    }
                    if (state === 'prev') {
                        return (
                            <TestimonialCard
                                key={i}
                                t={t}
                                onClick={prev}
                                className={`hidden md:flex ${base} left-1/2 md:z-10 cursor-pointer opacity-50 hover:opacity-80`}
                                style={{ transform: 'translateX(calc(-50% - 360px)) scale(0.94)' }}
                            />
                        );
                    }
                    if (state === 'next') {
                        return (
                            <TestimonialCard
                                key={i}
                                t={t}
                                onClick={next}
                                className={`hidden md:flex ${base} left-1/2 md:z-10 cursor-pointer opacity-50 hover:opacity-80`}
                                style={{ transform: 'translateX(calc(-50% + 360px)) scale(0.94)' }}
                            />
                        );
                    }
                    return null;
                })}
            </div>

            <div className="flex items-center justify-center gap-5 mt-9">
                <button
                    onClick={prev}
                    className="w-9 h-9 border border-[#ececec] rounded-full bg-white text-[#6b7280] flex items-center justify-center hover:border-[#d4d4d4] hover:text-[#222] hover:bg-[#fafafa] transition-colors"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-[7px] items-center">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIdx(i)}
                            className={`h-1.5 rounded-full transition-all ${
                                i === idx ? 'w-5 bg-accent' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-9 h-9 border border-[#ececec] rounded-full bg-white text-[#6b7280] flex items-center justify-center hover:border-[#d4d4d4] hover:text-[#222] hover:bg-[#fafafa] transition-colors"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}
