'use client';

import { ArrowRight, User, Zap, Lock } from 'lucide-react';

const FEATURES = [
    { label: 'Automation Specialists', icon: User },
    { label: 'Fast Response', icon: Zap },
    { label: 'Secure & Confidential', icon: Lock },
];

export default function ReadyToAutomate({ onHire }) {
    return (
        <section className="relative container overflow-hidden bg-black text-white py-20 md:py-28 text-center">
            <svg
                className="pointer-events-none absolute left-0 top-[24px] h-full w-auto opacity-80 hidden md:block"
                viewBox="0 0 240 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {/* Top cable: enters from top-left, runs right, curves down, ends with rounded tip */}
                <path
                    d="M-12 20 H150 a30 30 0 0 1 30 30 V230"
                    stroke="#3a3a3a"
                    strokeWidth="22"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Bottom cable + plug: cable from left to plug body */}
                <path
                    d="M-12 290 H150"
                    stroke="#3a3a3a"
                    strokeWidth="22"
                    fill="none"
                />
                {/* Plug body */}
                <circle cx="170" cy="290" r="22" fill="#3a3a3a" />
                {/* Plug prongs */}
                <rect x="190" y="278" width="22" height="7" rx="2" fill="#3a3a3a" />
                <rect x="190" y="295" width="22" height="7" rx="2" fill="#3a3a3a" />
            </svg>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
                Ready to Automate Your Operations?
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
                Tell us your operational challenges and we&apos;ll help you build the right automation workflow.
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-10">
                {FEATURES.map(({ label, icon: Icon }, i) => (
                    <div
                        key={label}
                        className={`inline-flex items-center gap-2 text-sm text-gray-300 ${
                            i > 0 ? 'pl-4 md:pl-6 border-l border-gray-700' : ''
                        }`}
                    >
                        <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                        {label}
                    </div>
                ))}
            </div>

            <button onClick={onHire} className="btn btn-accent group">
                Hire an Expert
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </section>
    );
}
