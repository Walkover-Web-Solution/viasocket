'use client';

import { useEffect, useState } from 'react';
import { Home, Inbox, CircleDollarSign, LayoutGrid, Settings } from 'lucide-react';
import { BrandIcon } from './BrandIcon';
import { H2, Label, Lead, Scene } from './Heading';
import { revealClass, useReveal } from './useReveal';
import styles from './Production.module.scss';

const SCREENS = ['a', 'b', 'c'];

function ScreenA({ active }) {
    return (
        <div className={`${styles.scr} ${active ? styles.active : ''} grid grid-cols-[180px_1fr] h-full`}>
            <div className="border-r border-dev-line p-4 grid gap-1 content-start bg-dev-surface-2/40">
                <div className="flex items-center gap-2 font-semibold text-[15px] mb-3">
                    <i className="w-2 h-2 rounded-full bg-dev-accent inline-block" />
                    Pipeline
                </div>
                {[
                    [Home, 'Home'],
                    [Inbox, 'Inbox'],
                    [CircleDollarSign, 'Deals'],
                    [LayoutGrid, 'Integrations'],
                    [Settings, 'Settings'],
                ].map(([Icon, label]) => (
                    <div key={label} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[13.5px] ${label === 'Integrations' ? 'bg-dev-accent-soft text-dev-accent font-medium' : 'text-dev-ink-2'}`}>
                        <Icon size={15} />
                        {label}
                    </div>
                ))}
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Integrations</span>
                    <span className="text-[13px] text-dev-ink-3">4 connected</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Salesforce', 'Slack', 'Gmail', 'Zendesk'].map((n) => (
                        <span key={n} className="w-10 h-10 rounded-xl bg-dev-ink grid place-items-center">
                            <BrandIcon name={n} size={20} forceColor="#F7F7F8" />
                        </span>
                    ))}
                </div>
                <div className="border border-dev-line rounded-xl p-3 flex items-center justify-between gap-3 text-[14px]">
                    <span>Move the Acme deal to Negotiation.</span>
                    <span className="text-dev-ok font-medium whitespace-nowrap">Salesforce updated</span>
                </div>
            </div>
        </div>
    );
}

function ScreenB({ active }) {
    const rows = [
        ['Zendesk', 'Read and update tickets', true],
        ['Stripe', 'Refunds and charges', false],
        ['Slack', 'Post to channels', true],
        ['Intercom', 'Reply to customers', true],
        ['Notion', 'Known issues', false],
    ];
    return (
        <div className={`${styles.scr} ${active ? styles.active : ''} h-full`}>
            <div className="flex items-center gap-4 px-5 py-3 border-b border-dev-line text-[13.5px]">
                <span className="w-2 h-2 rounded-full bg-dev-accent inline-block" />
                <b className="font-semibold">Helpdesk</b>
                <span className="text-dev-ink-3">Inbox</span>
                <span className="text-dev-ink-3">Tickets</span>
                <span className="font-medium text-dev-ink">Tools</span>
                <span className="text-dev-ink-3">Team</span>
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-0 h-[calc(100%-49px)]">
                <div className="p-4 grid gap-2 content-start border-r border-dev-line">
                    {rows.map(([name, desc, on]) => (
                        <div key={name} className="flex items-center gap-3 p-2 rounded-lg">
                            <span className="w-7 h-7 rounded-lg bg-dev-ink grid place-items-center shrink-0">
                                <BrandIcon name={name} size={15} forceColor="#F7F7F8" />
                            </span>
                            <span className="flex-1 min-w-0">
                                <span className="block text-[13.5px] font-medium">{name}</span>
                                <small className="text-dev-ink-3 text-[12px]">{desc}</small>
                            </span>
                            <span className={`w-7 h-4 rounded-full relative shrink-0 ${on ? 'bg-dev-accent' : 'bg-dev-line-2'}`}>
                                <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${on ? 'left-3.5' : 'left-0.5'}`} />
                            </span>
                        </div>
                    ))}
                </div>
                <div className="p-4 grid gap-2 content-start">
                    <span className="text-[12px] text-dev-ink-3">Ticket #40213 · assistant</span>
                    <div className="bg-dev-surface-2 rounded-xl rounded-bl-sm p-3 text-[13.5px] max-w-[85%]">The customer was charged twice for order A-77120.</div>
                    <div className="bg-dev-ink text-dev-ink-inv rounded-xl rounded-br-sm p-3 text-[13.5px] max-w-[85%] justify-self-end">Refund the duplicate charge.</div>
                    <div className="border border-dev-line rounded-xl p-3 flex items-center justify-between gap-3 text-[13.5px] mt-2">
                        <span>Refunding via Stripe…</span>
                        <span className="text-dev-ok font-medium whitespace-nowrap">Refunded</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScreenC({ active }) {
    return (
        <div className={`${styles.scr} ${active ? styles.active : ''} grid grid-cols-[160px_1fr] h-full`}>
            <div className="border-r border-dev-line p-4 grid gap-1 content-start">
                <span className="text-[12px] text-dev-ink-3 mb-2">Settings</span>
                {['Profile', 'Team', 'Calendar', 'Notifications', 'Billing'].map((it) => (
                    <div key={it} className={`px-2 py-1.5 rounded-lg text-[13.5px] ${it === 'Calendar' ? 'bg-dev-accent-soft text-dev-accent font-medium' : 'text-dev-ink-2'}`}>{it}</div>
                ))}
            </div>
            <div className="p-6 grid gap-4 content-start">
                <h5 className="font-semibold text-[17px] m-0">Calendar</h5>
                <p className="text-dev-ink-2 text-[14px] m-0">Connect your calendar so the assistant can book interviews for you.</p>
                <div className="flex items-center gap-3 border border-dev-line rounded-xl p-3">
                    <span className="w-9 h-9 rounded-lg bg-dev-ink grid place-items-center shrink-0">
                        <BrandIcon name="Google Calendar" size={18} forceColor="#F7F7F8" />
                    </span>
                    <span className="flex-1">
                        <b className="block text-[14px] font-semibold">Google Calendar</b>
                        <span className="text-[12.5px] text-dev-ink-3">Read availability · Create events</span>
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-dev-ink text-dev-ink-inv text-[13px] font-medium">Connect</span>
                </div>
                <div className="border border-dev-line rounded-xl p-3 flex items-center justify-between gap-3 text-[14px]">
                    <span>Book 30 minutes with Dev next week.</span>
                    <span className="text-dev-ok font-medium whitespace-nowrap">Booked</span>
                </div>
            </div>
        </div>
    );
}

export default function Production() {
    const [active, setActive] = useState(0);
    const [ref, visible] = useReveal(0.2);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        const id = setInterval(() => setActive((i) => (i + 1) % SCREENS.length), 4200);
        return () => clearInterval(id);
    }, []);

    return (
        <Scene id="production">
            <Label>Inside your product</Label>
            <H2>It feels like your product.</H2>
            <Lead>Our action layer is designed to become an extension of your product.</Lead>
            <div ref={ref} className={`grid gap-[clamp(20px,3vw,32px)] w-full ${revealClass(visible)}`}>
                <div className="relative rounded-[18px] overflow-hidden shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] border border-dev-line bg-dev-surface min-h-[460px]">
                    <ScreenA active={active === 0} />
                    <ScreenB active={active === 1} />
                    <ScreenC active={active === 2} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px_28px] max-w-[880px]">
                    <div>
                        <b className="block font-semibold text-[16.5px]">Your brand</b>
                        <span className="text-dev-ink-2 text-[15px]">Your logo, your colours, your domain.</span>
                    </div>
                    <div>
                        <b className="block font-semibold text-[16.5px]">Your UI</b>
                        <span className="text-dev-ink-2 text-[15px]">Use our connect flow or build your own on the API.</span>
                    </div>
                    <div>
                        <b className="block font-semibold text-[16.5px]">Your control</b>
                        <span className="text-dev-ink-2 text-[15px]">You decide what each AI may read, write or delete.</span>
                    </div>
                </div>
            </div>
        </Scene>
    );
}
