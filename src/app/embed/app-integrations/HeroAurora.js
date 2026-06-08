'use client';

import { useEffect, useRef, useState } from 'react';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';
import './HeroAurora.scss';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import WorkflowIllustration from './WorkflowIllustration';

const APPS = [
    { name: 'Gmail', icon: 'https://thingsofbrand.com/api/icon/gmail.com' },
    { name: 'Slack', icon: 'https://thingsofbrand.com/api/icon/slack.com' },
    { name: 'HubSpot', icon: 'https://thingsofbrand.com/api/icon/hubspot.com' },
    { name: 'Notion', icon: 'https://thingsofbrand.com/api/icon/notion.com' },
    { name: 'Stripe', icon: 'https://thingsofbrand.com/api/icon/stripe.com' },
];

export default function HeroAurora() {
    const [activeApp, setActiveApp] = useState(APPS[0]);
    const [isFading, setIsFading] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        let idx = 0;
        intervalRef.current = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                idx = (idx + 1) % APPS.length;
                setActiveApp(APPS[idx]);
                setIsFading(false);
            }, 250);
        }, 3000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <section className="container relative max-md:px-6 max-sm:px-4">
                <EmbedBreadcrumbs currentPage="App Integrations" />
                <div
                    className="relative min-h-[520px] flex items-center justify-center overflow-hidden border"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 70% at 88% 75%, #0d6e52 0%, #0a5040 18%, #063826 42%, #032820 70%, #021810 100%)',
                    }}
                >
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[620px] h-[620px] bg-[#0a4836] -left-[8%] -top-[10%] opacity-25 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[540px] h-[540px] bg-[#0e7a5c] -right-[6%] top-[35%] opacity-30 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[520px] h-[520px] bg-[#063826] left-[40%] -bottom-[18%] opacity-18 max-md:blur-[60px]" />
                    <div className="aurora-grid-bg" />

                    <div className="relative z-[2] w-full grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-16 p-6 md:p-12">
                        <div className="flex flex-col items-start text-left max-lg:items-center max-lg:text-center">
                            <h1 className="h1 !text-white">
                                <span className="flex flex-wrap items-center gap-[14px] max-md:gap-2">
                                    Let users connect
                                </span>
                                <span className="flex flex-wrap items-center gap-[14px] max-md:gap-2">
                                    <span>your app to</span>
                                    <span
                                        className={`inline-flex items-center gap-[10px] bg-white px-[22px] py-[6px] pl-[10px] shadow-[0_8px_28px_rgba(0,0,0,.32)] font-sans text-[40px] font-bold tracking-[-1.5px] text-[#0a0a0a] leading-[1.1] justify-start transition-opacity duration-[250ms] ease-[ease] rounded-[10px] min-w-[240px] max-md:text-[26px] max-md:min-w-[180px] max-md:px-[14px] max-md:py-1 max-md:pl-[6px] max-md:gap-2 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <span className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-md overflow-hidden bg-[#f8fafc] max-md:w-[34px] max-md:h-[34px]">
                                            <Image
                                                src={activeApp.icon}
                                                alt={activeApp.name}
                                                width={30}
                                                height={30}
                                                className="w-[30px] h-[30px] object-contain max-md:w-[22px] max-md:h-[22px]"
                                                unoptimized
                                            />
                                        </span>
                                        <span>{activeApp.name}</span>
                                    </span>
                                </span>
                            </h1>

                            <p className="text-base text-white/[0.72] max-w-[480px] mb-8 leading-[1.55] font-normal max-lg:mx-auto">
                                Embed a visual workflow builder in your product. Your users link your app with 2,500+
                                others including Slack, HubSpot, and Notion. No code required.
                            </p>

                            <Link
                                href="https://viasocket.com/signup?utm_source=/embed/app-integration"
                                className="btn btn-outline"
                            >
                                Get Started
                                <ArrowRight size={14} strokeWidth={2.2} />
                            </Link>
                        </div>

                        <WorkflowIllustration />
                    </div>
                </div>
            </section>
        </>
    );
}
