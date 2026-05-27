'use client';

import { Sparkles } from 'lucide-react';

export default function Step2() {
    return (
        <div className="bg-[#faf9f4] rounded-2xl p-7">
            <div className="flex items-center gap-3.5 mb-[18px]">
                <Sparkles className="w-9 h-9 text-accent" />
                <div>
                    <h3 className="text-base font-bold text-[#111] tracking-[-0.2px]">AI is analysing your project</h3>
                    <p className="text-[13px] text-[#555]">Matching with available experts, drafting scope…</p>
                </div>
            </div>

            <div className="relative w-full h-1 bg-[#ececec] rounded-full overflow-hidden mb-[18px]">
                <div className="absolute inset-y-0 left-0 bg-accent rounded-full animate-[hireProgress_3.8s_cubic-bezier(0.4,0,0.2,1)_forwards]" />
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#555] mb-[18px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Reviewing similar past projects…
            </div>

            <div className="flex flex-col gap-2.5">
                {[95, 88, 65].map((w, i) => (
                    <div
                        key={i}
                        className="h-2.5 rounded-md bg-gradient-to-r from-[#ececec] via-[#f5f5f5] to-[#ececec] bg-[length:200%_100%] animate-[hireSkeleton_1.6s_ease-in-out_infinite]"
                        style={{ width: `${w}%` }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes hireProgress {
                    0% {
                        width: 0%;
                    }
                    40% {
                        width: 55%;
                    }
                    80% {
                        width: 88%;
                    }
                    100% {
                        width: 100%;
                    }
                }
                @keyframes hireSkeleton {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
                @keyframes hireStepFade {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
