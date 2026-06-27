'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import IntegrationsPreview from './IntegrationsPreview';

const PAIRS = [
    { name: 'Slack', logo: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg' },
    { name: 'Google Sheets', logo: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png' },
    { name: 'HubSpot', logo: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg' },
    { name: 'Gmail', logo: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg' },
];

export default function HeroSection({ appCount = 0 }) {
    const [pairIdx, setPairIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setPairIdx((i) => (i + 1) % PAIRS.length), 4500);
        return () => clearInterval(id);
    }, []);

    const current = PAIRS[pairIdx];

    return (
        <section className="bg-[#faf9f4] global-top-space">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    {/* LEFT */}
                    <div>
                        <span className="mb-[22px] inline-flex items-center gap-[7px] rounded-full border border-[#e2dfd2] bg-white px-[14px] py-[6px] text-[12.5px] font-semibold text-[#3a3a3a]">
                            <Sparkles className="h-[13px] w-[13px] text-accent" />
                            viaSocket Integration Script
                        </span>
                        <h1 className="mb-[22px] text-[34px] font-bold leading-[1.1] tracking-[-1px] text-[#1a1a1a] md:text-[42px] lg:text-[46px] lg:tracking-[-1.2px]">
                            Show your app&apos;s integrations{' '}
                            <span className="bg-gradient-to-b from-transparent from-[60%] to-[#f1ede0] to-[60%] text-[#1a1a1a]">
                                right on your site
                            </span>
                        </h1>
                        <p className="mb-[30px] max-w-[520px] text-[17px] font-normal leading-[1.55] text-[#5a5a5a] lg:text-[19px]">
                            Add one script tag. Your users see ready-made automations between your app and the tools
                            they already use, ready to set up in one click.
                        </p>

                        <div className="mb-[34px] flex flex-wrap items-center gap-[14px]">
                            <a href="#setup" className="btn btn-accent">
                                Get the script
                            </a>
                            <a href="#how" className="btn btn-outline">
                                See how it works
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-[14px]">
                            <span className="text-sm font-semibold uppercase tracking-[0.6px] text-[#8a8a8a]">
                                Pairs with
                            </span>
                            <div className="flex items-center gap-[10px]">
                                {PAIRS.slice(0, 4).map((p) => (
                                    <span
                                        key={p.name}
                                        className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-[#ece9df] bg-white"
                                    >
                                        <Image
                                            src={p.logo}
                                            alt={p.name}
                                            width={20}
                                            height={20}
                                            className="h-5 w-5 object-contain"
                                        />
                                    </span>
                                ))}
                            </div>
                            <span className="text-[13px] font-semibold text-[#8a8a8a]">{appCount + 300}+ apps</span>
                        </div>
                    </div>

                    {/* RIGHT - PREVIEW */}
                    <IntegrationsPreview current={current} />
                </div>
            </div>
        </section>
    );
}
