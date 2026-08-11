'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, User, AlertTriangle, CalendarDays } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';
import { getCookie, setCookie } from '@/utils/handleUtmSource';

const CAPABILITIES = ['Workflow', 'MCP', 'AI Agents'];

const EXAMPLES = [
    { icon: User, label: 'New lead → enrich → CRM', prompt: 'When a new lead comes in, enrich it and add it to our CRM, then notify sales on Slack.' },
    { icon: AlertTriangle, label: 'Failed payment → Slack alert', prompt: 'When a payment fails in Stripe, alert the billing channel on Slack with the customer details.' },
    { icon: CalendarDays, label: 'Daily sales summary email', prompt: 'Every morning, summarise yesterday’s sales from our CRM and email the report to the team.' },
];

export default function HeroSectionB({ hasToken }) {
    const [prompt, setPrompt] = useState('');

    const build = (e) => {
        // Carry the described automation forward via a cookie + localStorage (not the URL)
        const value = prompt.trim();
        if (typeof document !== 'undefined' && value) {
            const utmData = JSON.parse(getCookie('utmData') || '{}');
            utmData.prompt = value;
            setCookie('utmData', JSON.stringify(utmData), 1);
            try {
                window.localStorage.setItem('prompt', value);
            } catch { }
        }
        handleRedirect(e, '/signup?', null, 'home-B');
    };

    return (
        <section className="container flex flex-col items-center justify-center text-center bg-transparent">
            <div className="flex flex-col items-center justify-center w-full text-center">
                <div className="flex flex-col items-center w-full mb-10">
                    <h1 className="h1 max-w-5xl tracking-tight">
                        Talk to AI. It connects your apps and automates your repetitive work.
                    </h1>

                    <p className="mt-5 max-w-3xl text-base md:text-lg leading-[1.7] text-gray-600">
                        Connect Gmail, Instagram, Google Sheets, WhatsApp, Slack, Shopify, and 2,000+ other apps. Just
                        describe what you want to happen, and AI connects your apps, builds the automation, and gets it
                        ready to run - no coding required
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
                        {CAPABILITIES.map((capability) => (
                            <span
                                key={capability}
                                className="rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-600"
                            >
                                {capability}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-4xl text-left bg-white border border-black rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-black text-white shrink-0">
                            <Sparkles className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-semibold tracking-[0.08em] uppercase text-black">
                            Describe it · viaSocket builds it
                        </span>
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                        placeholder="When a new lead comes in, enrich it and add it to our CRM, then notify sales on Slack."
                        className="w-full resize-none bg-transparent text-lg md:text-xl text-[#252525] placeholder:text-gray-400 focus:outline-none"
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={build}
                        >
                            Build my workflow <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-center mt-6">
                    <span className="text-sm font-medium text-gray-500">Try:</span>
                    {EXAMPLES.map(({ icon: Icon, label, prompt: p }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() => setPrompt(p)}
                            className="flex items-center gap-2 border border-black text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
