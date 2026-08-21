'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const APP_LIST = [
    {
        name: 'Slack',
        bg: '#4A154B',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    },
    {
        name: 'HubSpot',
        bg: '#FF7A59',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    },
    {
        name: 'Google Sheets',
        bg: '#0F9D58',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    },
    {
        name: 'MailChimp',
        bg: '#423000',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/mailchimp.com/images/img673876726d_mailchimp.jpg',
    },
    {
        name: 'Notion',
        bg: '#191919',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/notion.so/images/img667018e3f8_notion.jpg',
    },
    {
        name: 'Stripe',
        bg: '#635BFF',
        fg: '#fff',
        icon: 'https://stuff.thingsofbrand.com/stripe.com/images/img67eab239fe_stripe.jpg',
    },
    {
        name: 'Airtable',
        bg: '#FCB400',
        fg: '#000',
        icon: 'https://stuff.thingsofbrand.com/airtable.com/images/img6da0d45803_airtable.jpg',
    },
    { name: 'Intercom', bg: '#1F8DED', fg: '#fff', icon: 'https://thingsofbrand.com/api/icon/intercom.com' },
    { name: 'Discord', bg: '#5865F2', fg: '#fff', icon: 'https://stuff.thingsofbrand.com/discord.com/images/img6dd59dde35_discord.jpg' },
    { name: 'Trello', bg: '#0052CC', fg: '#fff', icon: 'https://thingsofbrand.com/api/icon/trello.com' },
];

const CHIP_IDEAS = [
    {
        apps: ['Slack', 'HubSpot', 'MailChimp'],
        idea: 'When a new HubSpot lead emails you, post to Slack automatically.',
    },
    { apps: ['Notion', 'Discord', 'Google Sheets'], idea: 'Sync Discord tasks into Notion and log completions in Google Sheets.' },
    { apps: ['Stripe', 'Intercom', 'Slack'], idea: 'Alert Intercom and Slack the moment a Stripe payment fails.' },
    {
        apps: ['Trello', 'MailChimp', 'HubSpot'],
        idea: 'Create HubSpot contacts from Trello cards and notify via MailChimp.',
    },
];

function AppIcon({ app, size = 24 }) {
    return (
        <span
            className="inline-flex items-center justify-center shrink-0 bg-white border border-[#ebebeb] shadow-sm"
            style={{ width: size, height: size, borderRadius: size * 0.28 }}
        >
            <Image
                src={app.icon}
                alt={`${app.name} logo`}
                width={Math.round(size * 0.68)}
                height={Math.round(size * 0.68)}
                className="object-contain"
                style={{ width: size * 0.68, height: size * 0.68 }}
            />
        </span>
    );
}

function AutomationIdeasVisual() {
    const [setIdx, setSetIdx] = useState(0);
    const [fade, setFade] = useState(true);
    const current = CHIP_IDEAS[setIdx];

    useEffect(() => {
        const id = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setSetIdx((i) => (i + 1) % CHIP_IDEAS.length);
                setFade(true);
            }, 350);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="w-full max-w-[380px]">
            <div className="flex flex-wrap gap-2 mb-6">
                {APP_LIST.map((app) => {
                    const selected = current.apps.includes(app.name);
                    return (
                        <div
                            key={app.name}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border-[1.5px] transition-all duration-[400ms] ease-in-out"
                            style={{
                                background: selected ? app.bg : '#f5f5f5',
                                borderColor: selected ? app.bg : '#e8e8e8',
                                opacity: fade ? 1 : 0.5,
                                transform: selected ? 'scale(1.05)' : 'scale(1)',
                            }}
                        >
                            <Image
                                src={app.icon}
                                alt={`${app.name} logo`}
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain rounded-[3px]"
                                style={{ opacity: selected ? 1 : 0.55 }}
                            />
                            <span
                                className="text-xs"
                                style={{ color: selected ? app.fg : '#777', fontWeight: selected ? 600 : 400 }}
                            >
                                {app.name}
                            </span>
                            {selected && (
                                <span className="text-[10px] opacity-80" style={{ color: app.fg }}>
                                    ✓
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div
                className="bg-white rounded-2xl border border-[#ebebeb] px-5 py-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-[400ms] ease-in-out"
                style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(6px)' }}
            >
                <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-accent text-xs">✦</span>
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-[0.08em]">
                        Automation idea
                    </span>
                </div>
                <p className="text-sm text-[#222] leading-relaxed m-0">{current.idea}</p>
                <div className="mt-3 flex items-center gap-1.5">
                    {current.apps.map((name) => {
                        const app = APP_LIST.find((x) => x.name === name);
                        return <AppIcon key={name} app={app} size={24} />;
                    })}
                    <span className="text-[11px] text-[#aaa] ml-1">+ 12 more like this</span>
                </div>
            </div>
        </div>
    );
}

export default function AutomationIdeasSection() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <section className={`py-16 md:py-20 ${isHomePage ? 'bg-white' : ''}`}>
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-20">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-accent text-sm">✦</span>
                        <span className="text-xs font-semibold tracking-[0.1em] text-accent uppercase">
                            Not sure what to automate next?
                        </span>
                    </div>
                    <h2 className="h2 mb-5">Automation ideas for your stack</h2>
                    <p className="sub__h2 text-gray-600 max-w-[460px] mb-9">
                        Tell us the apps you use and get practical workflow ideas your team can put to work right away.
                    </p>
                    <Link
                        href="/automation-ideas"
                        data-track="main_automation_ideas_cta"
                        data-track-label="Automation ideas"
                        data-track-section="main"
                        className="btn btn-accent bg-accent inline-flex items-center gap-2.5 mb-5"
                    >
                        Get automation ideas
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                    <p className="text-[13px] text-gray-400 m-0">Choose your apps. Discover ideas. Build your flow.</p>
                </div>

                <div className="flex justify-center items-center">
                    <AutomationIdeasVisual />
                </div>
            </div>
        </section>
    );
}
