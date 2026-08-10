'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, User, AlertTriangle, CalendarDays } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';
import { getCookie, setCookie } from '@/utils/handleUtmSource';

const SVG_BASE =
    'absolute inset-0 w-full h-full transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]';

const EXAMPLES = [
    { icon: User, label: 'New lead → enrich → CRM', prompt: 'When a new lead comes in, enrich it and add it to our CRM, then notify sales on Slack.' },
    { icon: AlertTriangle, label: 'Failed payment → Slack alert', prompt: 'When a payment fails in Stripe, alert the billing channel on Slack with the customer details.' },
    { icon: CalendarDays, label: 'Daily sales summary email', prompt: 'Every morning, summarise yesterday’s sales from our CRM and email the report to the team.' },
];

export default function HeroSectionB({ hasToken }) {
    const [prompt, setPrompt] = useState('');
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setShowChat((v) => !v), 2200);
        return () => clearInterval(id);
    }, []);

    const build = (e) => {
        // Carry the described automation forward via a cookie + localStorage (not the URL)
        const value = prompt.trim();
        if (typeof document !== 'undefined' && value) {
            const utmData = JSON.parse(getCookie('utmData') || '{}');
            utmData.prompt = value;
            setCookie('utmData', JSON.stringify(utmData), 1);
            try {
                window.localStorage.setItem('prompt', value);
            } catch {}
        }
        handleRedirect(e, '/signup?', null, 'home-B');
    };

    return (
        <section className="flex flex-col items-center justify-center text-center bg-transparent container">
            <div className="flex flex-col items-center justify-center w-full text-center">
                <h1 className="h1 mb-6 whitespace-normal lg:whitespace-nowrap">
                    Automate Anything with AI Agents.
                    <br />
                    Backed by Real{' '}
                    <span className="text-accent">
                        Human Support
                        <span className="relative inline-flex items-center justify-center align-middle ml-[0.2em] -top-[0.04em] w-[0.9em] h-[0.9em] cursor-pointer shrink-0">
                            <svg
                                viewBox="0 0 28 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${SVG_BASE} ${showChat ? 'opacity-0 scale-[0.7]' : 'opacity-100 scale-100'}`}
                            >
                                <circle cx="6" cy="10" r="2.4" fill="#A8200D" className="origin-center animate-dot-bounce" />
                                <circle
                                    cx="14"
                                    cy="10"
                                    r="2.4"
                                    fill="#A8200D"
                                    className="origin-center animate-dot-bounce [animation-delay:0.15s]"
                                />
                                <circle
                                    cx="22"
                                    cy="10"
                                    r="2.4"
                                    fill="#A8200D"
                                    className="origin-center animate-dot-bounce [animation-delay:0.3s]"
                                />
                            </svg>
                            <svg
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${SVG_BASE} ${showChat ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.7]'}`}
                            >
                                <rect x="1" y="1" width="26" height="18" rx="9" fill="#A8200D" />
                                <path d="M6 19l3-4" stroke="#A8200D" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="8.5" cy="10" r="2" fill="#fff" />
                                <circle cx="14" cy="10" r="2" fill="#fff" />
                                <circle cx="19.5" cy="10" r="2" fill="#fff" />
                            </svg>
                        </span>
                    </span>
                </h1>

                <p className="sub__h1 max-w-3xl mb-10 text-gray-600">
                    Just tell <span className="text-accent font-medium">viaSocket AI</span> what you want to automate,
                    and it builds the entire working workflow for you in minutes.
                </p>

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
