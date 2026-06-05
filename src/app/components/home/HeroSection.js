'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CTAButtons from './CTAButtons';

const AVATAR_BASE =
    'w-10 h-10 rounded-full border-[2.5px] border-white object-cover shadow-[0_2px_6px_rgba(0,0,0,0.12)]';
const SVG_BASE =
    'absolute inset-0 w-full h-full transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]';

export default function HeroSection({ hasToken }) {
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setShowChat((v) => !v), 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-center bg-transparent px-6">
            <div className="flex flex-col items-center justify-center w-full text-center">
                <h1 className="h1 mb-12 whitespace-normal lg:whitespace-nowrap">
                    Automate Anything with AI Agents.
                    <br />
                    Backed by Real{' '}
                    <span className="text-accent">
                        Human Support
                        <span className="relative inline-flex items-center justify-center align-middle ml-[0.2em] -top-[0.04em] w-[0.9em] h-[0.9em] cursor-pointer shrink-0">
                            <svg
                                viewBox="0 0 28 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${SVG_BASE} ${showChat ? 'opacity-0 scale-[0.7]' : 'opacity-100 scale-100'}`}
                            >
                                <circle
                                    cx="6"
                                    cy="10"
                                    r="2.4"
                                    fill="#A8200D"
                                    className="origin-center animate-dot-bounce"
                                />
                                <circle
                                    cx="14"
                                    cy="10"
                                    r="2.4"
                                    fill="#A8200D"
                                    className="origin-center animate-dot-bounce [animation-delay:0.15s]"
                                />
                                <circle
                                    cx="22"
                                    cy="10"
                                    r="2.4"
                                    fill="#A8200D"
                                    className="origin-center animate-dot-bounce [animation-delay:0.3s]"
                                />
                            </svg>
                            <svg
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${SVG_BASE} ${showChat ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.7]'}`}
                            >
                                <rect x="1" y="1" width="26" height="18" rx="9" fill="#A8200D" />
                                <path d="M6 19l3-4" stroke="#A8200D" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="8.5" cy="10" r="2" fill="#fff" />
                                <circle cx="14" cy="10" r="2" fill="#fff" />
                                <circle cx="19.5" cy="10" r="2" fill="#fff" />
                            </svg>
                        </span>
                    </span>
                </h1>

                <div className="flex items-center gap-8 flex-wrap justify-center">
                    <CTAButtons hasToken={hasToken} />
                    <Link href="/experts" className="group flex items-center gap-2.5 cursor-pointer no-underline">
                        <div className="flex items-center">
                            <img
                                className={AVATAR_BASE}
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Expert"
                            />
                            <img
                                className={`${AVATAR_BASE} -ml-2.5`}
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Expert"
                            />
                            <span className="relative inline-flex shrink-0 -ml-2.5">
                                <img
                                    className={AVATAR_BASE}
                                    src="https://randomuser.me/api/portraits/men/46.jpg"
                                    alt="Expert"
                                />
                                <span className="absolute bottom-0.5 right-0.5 w-[13px] h-[13px] rounded-full bg-[#22c55e] border-[2.5px] border-white z-[2] animate-pulse-dot" />
                            </span>
                        </div>
                        <span className="text-[15px] font-extrabold text-accent flex items-center gap-1.5 -tracking-[0.01em]">
                            Talk to an expert{' '}
                            <span className="text-[17px] transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
