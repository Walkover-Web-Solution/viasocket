'use client';

import { LayoutGrid, Lock, ArrowLeftRight, Layers, LayoutTemplate, Eye, Zap, Globe, Radio, Gem, Timer, MessageCircle } from 'lucide-react';
import { H2, Label, Lead, Scene } from './Heading';
import { useReveal, revealClass } from './useReveal';

const GETS = [
    { Icon: LayoutGrid, title: 'Actions for 2,300+ apps', copy: 'Give your AI actions across the apps your customers already use.' },
    { Icon: Lock, title: 'Managed auth', copy: 'Let customers securely connect their accounts.' },
    { Icon: ArrowLeftRight, title: 'Managed mapping', copy: 'Handle different APIs and data formats.' },
    { Icon: Layers, title: 'Multi-tenant', copy: "Keep every customer's connections and permissions separate." },
    { Icon: LayoutTemplate, title: 'Customizable UI', copy: 'Fit the integration into your product.' },
    { Icon: Eye, title: 'Monitoring', copy: 'Debug and manage every action.' },
    { Icon: Zap, title: 'Triggers & webhooks', copy: 'Bring events from other apps into your product.' },
    { Icon: Globe, title: 'Server localization', copy: 'Support customers across regions.' },
    { Icon: Radio, title: 'Real-time execution', copy: 'Run actions when your AI needs them.', live: true },
    { Icon: Gem, title: 'Pay as you go', copy: 'Pay based on the tasks you run.' },
    { Icon: Timer, title: 'Get live in under 15 minutes', copy: 'Add the action layer to your product quickly.' },
    { Icon: MessageCircle, title: 'Slack support', copy: 'Get direct help when you need it.' },
];

function GetCard({ Icon, title, copy, live }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`relative grid gap-3 content-start p-5 rounded-2xl border border-dev-line bg-dev-surface transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {live && (
                <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-dev-ok after:content-[''] after:absolute after:-inset-1 after:rounded-full after:border-[1.5px] after:border-dev-ok/60 after:animate-ping" />
            )}
            <span className="w-[38px] h-[38px] rounded-[10px] bg-dev-surface-2 grid place-items-center text-dev-ink">
                <Icon size={18} strokeWidth={1.7} />
            </span>
            <b className="font-semibold text-[16.5px] tracking-[-0.01em] leading-[1.2]">{title}</b>
            <span className="text-dev-ink-2 text-[14px] leading-[1.4]">{copy}</span>
        </div>
    );
}

export default function Proof() {
    return (
        <Scene id="proof">
            <Label>What you get</Label>
            <H2>The infrastructure behind every action.</H2>
            <Lead>Everything your AI needs to act.</Lead>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[1000px]">
                {GETS.map((g) => (
                    <GetCard key={g.title} {...g} />
                ))}
            </div>
        </Scene>
    );
}
