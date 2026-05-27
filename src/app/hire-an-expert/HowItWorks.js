'use client';

import { Sparkles } from 'lucide-react';
import Section from './Section';

const HOW_STEPS = [
    {
        step: '01',
        title: 'Describe your workflow',
        desc: 'Tell us what you want to automate in plain English — apps, triggers, outcomes.',
    },
    {
        step: '02',
        title: 'Get an AI-scoped plan',
        desc: 'We instantly draft scope, timeline and a fixed price tailored to your project.',
    },
    {
        step: '03',
        title: 'Pick add-ons & pay',
        desc: 'Add monitoring, training or priority support. Secure checkout, money-back guarantee.',
    },
    {
        step: '04',
        title: 'Book your kickoff',
        desc: 'Choose a slot. Your dedicated expert ships a working automation in days, not weeks.',
    },
];

export default function HowItWorks() {
    return (
        <Section
            eyebrow="How it works"
            title="Your workflow, handled step by step"
            subtitle="Get your workflows planned, reviewed, and implemented by Viasocket experts."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {HOW_STEPS.map((s) => (
                    <div
                        key={s.step}
                        className="bg-white border border-[#ececec] p-[18px] pb-6 flex flex-col shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    >
                        <span className="self-start text-accent text-sm font-semibold tracking-wide mb-3.5">
                            {s.step}
                        </span>
                        <div className="w-full aspect-[3/2] mb-[18px] bg-[#faf9f4] flex items-center justify-center text-[#94a3b8] text-xs">
                            <Sparkles className="w-8 h-8 text-accent/40" />
                        </div>
                        <h3 className="text-[17px] font-semibold leading-tight mb-2 tracking-[-0.2px]">
                            {s.title}
                        </h3>
                        <p className="text-[13.5px] text-[#555] leading-[1.5]">{s.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
