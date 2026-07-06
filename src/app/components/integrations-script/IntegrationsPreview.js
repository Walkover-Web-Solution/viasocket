'use client';

import { ArrowRight, Boxes, Link2 } from 'lucide-react';
import Image from 'next/image';

const TEMPLATES = [
    'New record in YourApp → post a message in {{app}}',
    'New {{app}} message → create a record in YourApp',
    'Daily summary from YourApp → send to a {{app}} channel',
    'Status changed in YourApp → alert your team on {{app}}',
    'New file uploaded in YourApp → share it in {{app}}',
    'Task completed in YourApp → notify the owner on {{app}}',
];

const PLACEHOLDER = { name: 'Your app', logo: null };

function AppIcon({ app }) {
    if (app?.logo) {
        return (
            <Image
                src={app.logo}
                alt={app.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
            />
        );
    }
    return (
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f3f2ec] text-[#8a8a8a]">
            <Boxes className="h-4 w-4" />
        </span>
    );
}

export default function IntegrationsPreview({ current }) {
    const app = current || PLACEHOLDER;
    const yourApp = PLACEHOLDER;
    return (
        <div aria-hidden="true">
            <div className="flex items-center justify-between pb-[14px]">
                <div className="flex items-center gap-[11px]">
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#4b5563]">
                        <Link2 className="h-4 w-4 text-white" strokeWidth={2.4} />
                    </span>
                    <div>
                        <div className="text-[15px] font-bold leading-[1.1] tracking-[-0.2px] text-[#1a1a1a]">
                            Popular integrations
                        </div>
                        <div className="mt-[2px] text-[11px] text-[#5a5a5a]">
                            Powered by viaSocket · <span>YourApp + {app.name}</span>
                        </div>
                    </div>
                </div>
                <span className="flex items-center gap-[6px] rounded-full border border-[#cfe6d5] bg-[#eaf6ee] px-[10px] py-[4px] text-[10px] font-bold tracking-[0.6px] text-[#2f8a4a]">
                    <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#2f8a4a]" />
                    LIVE
                </span>
            </div>

            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
                {TEMPLATES.map((tpl, i) => {
                    const [first, second] = i % 2 === 0 ? [yourApp, app] : [app, yourApp];
                    return (
                        <div
                            key={i}
                            className="group flex min-h-[220px] flex-col justify-between rounded-[6px] border border-[#ece9df] bg-white p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(26,26,26,0.2)]"
                        >
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <AppIcon app={first} />
                                    <AppIcon app={second} />
                                </div>
                                <div className="text-[15px] leading-[1.5] text-[#1a1a1a]">
                                    {tpl.split('{{app}}').map((part, idx, arr) => (
                                        <span key={idx}>
                                            {part}
                                            {idx < arr.length - 1 && <span>{app.name}</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <span className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.6px] text-[#1a1a1a]">
                                    Try it
                                    <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2} />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
