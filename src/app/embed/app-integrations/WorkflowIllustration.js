'use client';

import Image from 'next/image';
import { Search, User, Webhook, MessageSquare, GitBranch, Clock, Zap } from 'lucide-react';

const APPS_LIST = [
    { name: 'Gmail', icon: 'https://thingsofbrand.com/api/icon/gmail.com' },
    { name: 'Slack', icon: 'https://thingsofbrand.com/api/icon/slack.com' },
    { name: 'Google Sheets', icon: 'https://thingsofbrand.com/api/icon/google.com', short: 'Sheets' },
    { name: 'Notion', icon: 'https://thingsofbrand.com/api/icon/notion.com' },
    { name: 'HubSpot', icon: 'https://thingsofbrand.com/api/icon/hubspot.com' },
];

const TOOLS_LIST = [
    { name: 'API Call', Icon: Webhook },
    { name: 'JS Code', isText: true, val: 'JS' },
    { name: 'Comment', Icon: MessageSquare },
    { name: 'Multiple Paths', Icon: GitBranch },
    { name: 'Delay', Icon: Clock },
    { name: 'Call AI Agent', Icon: Zap },
];

export default function WorkflowIllustration() {
    return (
        <div className="relative flex items-center justify-center" style={{ perspective: '1400px' }}>
            <div className="relative w-full max-w-[560px] mx-auto" aria-hidden="true">
                <div
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_36px_80px_rgba(0,0,0,.5),0_12px_28px_rgba(0,0,0,.2)] transition-transform duration-500 max-lg:transform-none hover:max-lg:transform-none"
                    style={{
                        transform: 'rotateY(-2deg) rotateX(1.5deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotateY(0) rotateX(0)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotateY(-2deg) rotateX(1.5deg)')}
                >
                    {/* Chrome: viaSocket logo + three-dot menu */}
                    <div
                        className="flex items-center justify-between px-[18px] py-[13px] border-b border-black/[0.07]"
                        style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #fff 100%)' }}
                    >
                        <Image
                            src="/assets/brand/socketIcon.svg"
                            alt="viaSocket"
                            width={24}
                            height={24}
                            className="h-6 w-auto object-contain"
                        />
                        <div className="flex gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
                            <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
                            <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
                        </div>
                    </div>

                    {/* Toggle nav: Integrations / History (centered) */}
                    <div className="flex items-center justify-between px-[18px] py-[10px] border-b bg-white">
                        <div className="flex-1" />
                        <div className="flex gap-[2px] bg-[#f3f4f6] rounded-lg p-[3px]">
                            <span className="text-[11px] font-semibold text-[#0a0a0a] px-[14px] py-[5px] rounded-md leading-none bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)]">
                                Integrations
                            </span>
                            <span className="text-[11px] font-semibold text-[#6b7280] px-[14px] py-[5px] rounded-md leading-none">
                                History
                            </span>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <span className="text-[11px] font-semibold text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] rounded-md px-[10px] py-[5px] leading-none">
                                + New workflow
                            </span>
                        </div>
                    </div>

                    {/* Two-column body */}
                    <div className="grid grid-cols-[1fr_180px] h-[360px] max-sm:grid-cols-1">
                        {/* LEFT: vertical workflow canvas */}
                        <div
                            className="px-[22px] p-1 flex flex-col relative flow-canvas-bg"
                            style={{
                                background:
                                    'radial-gradient(circle at 30% 20%, rgba(5,150,105,.05) 0%, transparent 55%), linear-gradient(180deg, #fafafa 0%, #fff 100%)',
                            }}
                        >
                            {/* Trigger: New signup */}
                            <div
                                className="bg-white border rounded-lg p-1 flex items-center gap-2 relative animate-[fnBob_4.5s_ease-in-out_infinite]"
                                style={{
                                    animationDelay: '0s',
                                    background: 'linear-gradient(135deg, #ecfdf5 0%, #fff 100%)',
                                    borderColor: 'rgba(5,150,105,.28)',
                                    boxShadow: '0 4px 16px rgba(5,150,105,.14)',
                                }}
                            >
                                <div className="absolute -inset-[2px] rounded-[12px] border-2 border-[rgba(5,150,105,.25)] animate-[fnPulseRing_2.5s_ease-in-out_infinite] pointer-events-none" />
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #059669, #10b981)',
                                        border: '1px solid #059669',
                                        color: '#fff',
                                    }}
                                >
                                    <User
                                        size={18}
                                        className="text-white"
                                        strokeWidth={2.5}
                                        style={{ stroke: '#fff', fill: '#fff' }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                                    <span className="text-[8.5px] font-medium tracking-[0.6px] uppercase text-[#047857] leading-none">
                                        Trigger
                                    </span>
                                    <span className="text-[12.5px] font-bold text-[#0a0a0a] leading-[1.25] truncate">
                                        New user signs up
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[22px] -my-[2px] mx-auto w-[14px] flex items-center justify-center fc-conn" />

                            {/* HubSpot: create contact */}
                            <div
                                className="bg-white border rounded-lg p-1 flex items-center gap-2 relative animate-[fnBob_4.5s_ease-in-out_infinite]"
                                style={{ animationDelay: '.45s' }}
                            >
                                <div className="absolute -inset-[2px] rounded-[12px] border-2 border-[rgba(5,150,105,.25)] animate-[fnPulseRing_2.5s_ease-in-out_infinite] pointer-events-none" />
                                <div className="w-9 h-9 flex items-center justify-center shrink-0 overflow-hidden">
                                    <Image
                                        src="https://thingsofbrand.com/api/icon/hubspot.com"
                                        alt="HubSpot"
                                        width={22}
                                        height={22}
                                        className="w-[22px] h-[22px] object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                                    <span className="text-[8.5px] font-medium tracking-[0.6px] uppercase text-[#9ca3af] leading-none">
                                        Action
                                    </span>
                                    <span className="text-[12.5px] font-bold text-[#0a0a0a] leading-[1.25] truncate">
                                        Create contact in CRM
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[22px] -my-[2px] mx-auto w-[14px] flex items-center justify-center fc-conn" />

                            {/* Gmail: welcome email */}
                            <div
                                className="bg-white border rounded-lg p-1 flex items-center gap-2 relative animate-[fnBob_4.5s_ease-in-out_infinite]"
                                style={{ animationDelay: '.9s' }}
                            >
                                <div className="absolute -inset-[2px] rounded-[12px] border-2 border-[rgba(5,150,105,.25)] animate-[fnPulseRing_2.5s_ease-in-out_infinite] pointer-events-none" />
                                <div className="w-9 h-9 rounded-lg bg-[#f4f4f5] border flex items-center justify-center shrink-0 overflow-hidden">
                                    <Image
                                        src="https://thingsofbrand.com/api/icon/gmail.com"
                                        alt="Gmail"
                                        width={22}
                                        height={22}
                                        className="w-[22px] h-[22px] object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                                    <span className="text-[8.5px] font-medium tracking-[0.6px] uppercase text-[#9ca3af] leading-none">
                                        Action
                                    </span>
                                    <span className="text-[12.5px] font-bold text-[#0a0a0a] leading-[1.25] truncate">
                                        Send welcome email
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[22px] -my-[2px] mx-auto w-[14px] flex items-center justify-center fc-conn" />

                            {/* Slack: notify team */}
                            <div
                                className="bg-white border rounded-lg p-1 flex items-center gap-2 relative animate-[fnBob_4.5s_ease-in-out_infinite]"
                                style={{ animationDelay: '1.35s' }}
                            >
                                <div className="absolute -inset-[2px] rounded-[12px] border-2 border-[rgba(5,150,105,.25)] animate-[fnPulseRing_2.5s_ease-in-out_infinite] pointer-events-none" />
                                <div className="w-9 h-9 rounded-lg bg-[#f4f4f5] border flex items-center justify-center shrink-0 overflow-hidden">
                                    <Image
                                        src="https://thingsofbrand.com/api/icon/slack.com"
                                        alt="Slack"
                                        width={22}
                                        height={22}
                                        className="w-[22px] h-[22px] object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                                    <span className="text-[8.5px] font-medium tracking-[0.6px] uppercase text-[#9ca3af] leading-none">
                                        Action
                                    </span>
                                    <span className="text-[12.5px] font-bold text-[#0a0a0a] leading-[1.25] truncate">
                                        Notify #sales channel
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[22px] -my-[2px] mx-auto w-[14px] flex items-center justify-center fc-conn" />

                            {/* Google Sheets: log signup */}
                            <div
                                className="bg-white border rounded-lg p-1 flex items-center gap-2 relative animate-[fnBob_4.5s_ease-in-out_infinite]"
                                style={{ animationDelay: '1.8s' }}
                            >
                                <div className="absolute -inset-[2px] rounded-[12px] border-2 border-[rgba(5,150,105,.25)] animate-[fnPulseRing_2.5s_ease-in-out_infinite] pointer-events-none" />
                                <div className="w-9 h-9 rounded-lg bg-[#f4f4f5] border flex items-center justify-center shrink-0 overflow-hidden">
                                    <Image
                                        src="https://thingsofbrand.com/api/icon/google.com"
                                        alt="Google Sheets"
                                        width={22}
                                        height={22}
                                        className="w-[22px] h-[22px] object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                                    <span className="text-[8.5px] font-medium tracking-[0.6px] uppercase text-[#9ca3af] leading-none">
                                        Action
                                    </span>
                                    <span className="text-[12.5px] font-bold text-[#0a0a0a] leading-[1.25] truncate">
                                        Log signup to sheet
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-[22px] -my-[2px] mx-auto w-[14px] flex items-center justify-center fc-conn" />

                            {/* Add step */}
                            <div className="border-[1.5px] border-dashed border-black/[0.16] rounded-[10px] px-[13px] py-[10px] flex items-center justify-center gap-[7px] text-[#9ca3af] text-[11.5px] font-semibold bg-white/60 mt-[2px]">
                                +
                            </div>
                        </div>
                        {/* /flow-canvas */}

                        {/* RIGHT: Add a Step panel */}
                        <div
                            className="border-l border-black/[0.08] px-[13px] py-[18px] flex flex-col gap-[10px] overflow-y-auto max-sm:border-l-0 max-sm:border-t max-sm:border-black/[0.08]"
                            style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)' }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-[#0a0a0a] tracking-[-0.2px]">
                                    Add a Step
                                </span>
                                <span className="text-xs text-[#9ca3af]">&#10005;</span>
                            </div>
                            <div className="bg-white border border-black/[0.08] rounded-md px-2 py-[5px] flex items-center gap-[5px] text-[10px] text-[#9ca3af]">
                                <Search size={10} className="text-[#9ca3af] shrink-0" strokeWidth={2} />
                                <span className="leading-none">Search Apps</span>
                            </div>
                            {/* Apps first */}
                            <div className="text-[9px] font-medium tracking-[0.7px] uppercase text-[#6b7280] leading-none mt-1">
                                Connected Apps
                            </div>
                            <div className="flex flex-col gap-[6px]">
                                {APPS_LIST.map((app) => (
                                    <div
                                        key={app.name}
                                        className="flex items-center gap-2 text-[11px] font-semibold text-[#374151] bg-white border rounded-[7px] px-2 py-[6px] leading-none"
                                    >
                                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 overflow-hidden bg-[#f4f4f5] border">
                                            <Image
                                                src={app.icon}
                                                alt={app.short || app.name}
                                                width={16}
                                                height={16}
                                                className="w-4 h-4 object-contain"
                                                unoptimized
                                            />
                                        </div>
                                        {app.name}
                                    </div>
                                ))}
                            </div>
                            {/* Built-In Tools after apps */}
                            <div className="text-[9px] font-medium tracking-[0.7px] uppercase text-[#6b7280] leading-none mt-1">
                                Built-In Tools
                            </div>
                            <div className="flex flex-col gap-[6px]">
                                {TOOLS_LIST.map((tool) => {
                                    const Icon = tool.Icon;
                                    return (
                                        <div
                                            key={tool.name}
                                            className="flex items-center gap-2 text-[11px] font-semibold text-[#374151] bg-white border rounded-[7px] px-2 py-[6px] leading-none"
                                        >
                                            <div
                                                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 overflow-hidden text-[9px] font-medium"
                                                style={{
                                                    background: tool.bg,
                                                    border: `1px solid ${tool.border}`,
                                                    color: tool.text || tool.stroke,
                                                }}
                                            >
                                                {tool.isText ? tool.val : <Icon size={14} strokeWidth={2} />}
                                            </div>
                                            {tool.name}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
