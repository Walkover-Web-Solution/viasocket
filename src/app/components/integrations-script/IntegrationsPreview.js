'use client';

import { Lock, Link2, Code2, ArrowRight, Boxes } from 'lucide-react';
import Image from 'next/image';

const TEMPLATES = [
    'New record in YourApp → post a message in {{app}}',
    'New {{app}} message → create a record in YourApp',
    'Daily summary from YourApp → send to a {{app}} channel',
    'Status changed in YourApp → alert your team on {{app}}',
];

export default function IntegrationsPreview({ current }) {
    return (
        <div className="relative" aria-hidden="true">
            <div className="overflow-hidden rounded-2xl border border-[#ece9df] bg-white shadow-sm">
                {/* host bar */}
                <div className="flex items-center gap-2 border-b border-[#ece9df] bg-[#faf9f4] px-4 py-[11px]">
                    <div className="flex gap-[5px]">
                        <span className="h-[9px] w-[9px] rounded-full bg-[#e2e0d8]" />
                        <span className="h-[9px] w-[9px] rounded-full bg-[#e2e0d8]" />
                        <span className="h-[9px] w-[9px] rounded-full bg-[#e2e0d8]" />
                    </div>
                    <div className="flex flex-1 items-center gap-[6px] rounded-[7px] border border-[#ece9df] bg-white px-[11px] py-[5px] text-[11px] text-[#8a8a8a]">
                        <Lock className="h-[10px] w-[10px] text-[#2f8a4a]" strokeWidth={1.8} />
                        <b className="font-semibold text-[#5a5a5a]">yourproduct.com</b>/integrations
                    </div>
                </div>

                {/* head */}
                <div className="flex items-center justify-between px-[18px] pb-[14px] pt-4">
                    <div className="flex items-center gap-[11px]">
                        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#4b5563]">
                            <Link2 className="h-4 w-4 text-white" strokeWidth={2.4} />
                        </span>
                        <div>
                            <div className="text-[15px] font-bold leading-[1.1] tracking-[-0.2px] text-[#1a1a1a]">
                                Popular integrations
                            </div>
                            <div className="mt-[2px] text-[11px] text-[#5a5a5a]">
                                Powered by viaSocket · <span>YourApp + {current.name}</span>
                            </div>
                        </div>
                    </div>
                    <span className="flex items-center gap-[6px] rounded-full border border-[#cfe6d5] bg-[#eaf6ee] px-[10px] py-[4px] text-[10px] font-bold tracking-[0.6px] text-[#2f8a4a]">
                        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#2f8a4a]" />
                        LIVE
                    </span>
                </div>

                {/* templates grid */}
                <div className="grid grid-cols-1 gap-[11px] px-[18px] pb-[18px] sm:grid-cols-2">
                    {TEMPLATES.map((tpl, i) => (
                        <div
                            key={i}
                            className={`group flex flex-col gap-[10px] rounded-[11px] border border-[#ece9df] bg-white p-[14px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(26,26,26,0.2)] ${
                                i === 3 ? 'hidden sm:flex' : ''
                            }`}
                        >
                            <div className="flex items-center gap-[7px]">
                                <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#4b5563] bg-[#4b5563]">
                                    <Boxes className="h-4 w-4 text-white" />
                                </span>
                                <span className="font-semibold text-[#cbc9c1]">+</span>
                                <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#ece9df] bg-[#faf9f4]">
                                    <Image
                                        src={current.logo}
                                        alt={current.name}
                                        width={19}
                                        height={19}
                                        className="h-[19px] w-[19px] object-contain animate-fadeSlideIn [animation-duration:500ms] [animation-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                                    />
                                </span>
                            </div>
                            <div className="text-sm font-semibold leading-[1.4] text-[#2a2a2a]">
                                {tpl.split('{{app}}').map((part, idx, arr) => (
                                    <span key={idx}>
                                        {part}
                                        {idx < arr.length - 1 && <span className="text-accent">{current.name}</span>}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="rounded-full border border-[#ece9df] bg-[#f3f2ec] px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.3px] text-[#595959]">
                                    Use template
                                </span>
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f3f2ec] text-[#5a5a5a]">
                                    <ArrowRight className="h-[10px] w-[10px]" strokeWidth={2} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* floating widget */}
            <div className="absolute -bottom-[18px] -left-[18px] hidden items-center gap-[11px] rounded-xl border border-[#ece9df] bg-white px-3 py-2 sm:flex">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-[#ecd9a4] bg-[#fbf4e1] text-[#b8860b]">
                    <Code2 className="h-[17px] w-[17px]" strokeWidth={2} />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">1 script tag</span>
                    <span className="text-xs text-[#5a5a5a]">renders every template</span>
                </div>
            </div>
        </div>
    );
}
