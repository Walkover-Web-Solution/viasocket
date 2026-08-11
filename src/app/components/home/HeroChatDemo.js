'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

// Used only when an app from the scripted demos is missing from the live apps list.
const FALLBACK_ICONS = {
    Instagram: 'https://stuff.thingsofbrand.com/nstagram.com/images/img3_nstagram.png',
    WhatsApp: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_whatsapp.svg',
    Shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
    'Facebook Ads': 'https://stuff.thingsofbrand.com/facebook.com/images/img6f6ece6e88_facebook.jpg',
    'Google Sheets': 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    Slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    Stripe: 'https://stuff.thingsofbrand.com/stripe.com/images/img67eab239fe_stripe.jpg',
    Gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    'AI Agent': 'https://stuff.thingsofbrand.com/openai.com/images/img6299ba7193_openai.jpg',
};

const DEMOS = [
    {
        prompt: 'Automate my Instagram comment replies.',
        steps: [
            ['Instagram', 'Trigger: New comment on post'],
            ['AI Agent', 'Generate context-aware reply'],
            ['Instagram', 'Post reply to comment'],
        ],
    },
    {
        prompt: 'When someone places a purchase order, send them a WhatsApp message.',
        steps: [
            ['Shopify', 'Trigger: New order placed'],
            ['WhatsApp', 'Send order confirmation message'],
        ],
    },
    {
        prompt: 'When a lead is received on Facebook, create an entry in Google Sheets.',
        steps: [
            ['Facebook Ads', 'Trigger: New lead form submitted'],
            ['Google Sheets', 'Append row to Leads tracker'],
        ],
    },
    {
        prompt: 'When a Shopify order is paid, notify my team in Slack.',
        steps: [
            ['Shopify', 'Trigger: Order payment confirmed'],
            ['Slack', 'Post to #orders — customer + amount'],
        ],
    },
    {
        prompt: 'When a payment fails, send a follow-up email with the payment link.',
        steps: [
            ['Stripe', 'Trigger: Payment failed'],
            ['AI Agent', 'Personalize recovery email copy'],
            ['Gmail', 'Send follow-up with payment link'],
        ],
    },
];

const TYPE_SPEED = 36;
const REPLY_SPEED = 30;

// Decorative marketing animation: it mirrors copy that already exists on the page,
// so it is hidden from assistive tech and built out of non-interactive elements.
export default function HeroChatDemo({ apps }) {
    const [demoIndex, setDemoIndex] = useState(0);
    const [typed, setTyped] = useState('');
    const [stage, setStage] = useState('typing'); // typing → sent → thinking → result
    const [replyText, setReplyText] = useState('');
    const [showFlow, setShowFlow] = useState(false);

    const cancelledRef = useRef(false);
    const timerRef = useRef(null);

    const iconFor = useMemo(() => {
        const byName = new Map(
            (apps || []).filter((app) => app?.iconurl && app?.name).map((app) => [app.name.toLowerCase(), app.iconurl])
        );
        return (name) => byName.get(name.toLowerCase()) || FALLBACK_ICONS[name];
    }, [apps]);

    useEffect(() => {
        cancelledRef.current = false;
        const alive = () => !cancelledRef.current;
        const sleep = (ms) =>
            new Promise((resolve) => {
                timerRef.current = setTimeout(resolve, ms);
            });

        const run = async () => {
            let index = 0;
            while (alive()) {
                const demo = DEMOS[index];
                setDemoIndex(index);
                setStage('typing');
                setTyped('');
                setReplyText('');
                setShowFlow(false);

                for (let i = 0; i < demo.prompt.length && alive(); i++) {
                    await sleep(TYPE_SPEED);
                    setTyped(demo.prompt.slice(0, i + 1));
                }
                await sleep(600);
                if (!alive()) return;

                setStage('sent');
                await sleep(300);
                if (!alive()) return;

                setStage('thinking');
                await sleep(2000);
                if (!alive()) return;

                setStage('result');
                const reply = `Flow created — ${demo.steps.length} steps ready.`;
                for (let i = 0; i < reply.length && alive(); i++) {
                    await sleep(REPLY_SPEED);
                    setReplyText(reply.slice(0, i + 1));
                }
                setShowFlow(true);

                await sleep(3000);
                index = (index + 1) % DEMOS.length;
            }
        };

        run();

        return () => {
            cancelledRef.current = true;
            clearTimeout(timerRef.current);
        };
    }, []);

    const demo = DEMOS[demoIndex];
    const isTyping = stage === 'typing';

    return (
        <div
            aria-hidden="true"
            className="opacity-0 animate-fadeSlideIn [animation-delay:0.5s] bg-white border border-[#e8e8e8] rounded-lg overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
        >
            <div className="px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
                <span className="font-mono text-[11px] text-[#bbb] tracking-[0.06em]">viaSocket AI</span>
            </div>

            <div className="px-5 pt-5 pb-1 h-[230px] md:h-[200px] flex flex-col gap-3.5 overflow-hidden">
                {!isTyping && (
                    <div className="flex items-end justify-end gap-2.5 animate-fadeSlideIn">
                        <div className="text-[13px] leading-[1.55] px-3.5 py-2.5 max-w-[82%] bg-[#0a0a0a] text-white rounded-[16px_16px_2px_16px]">
                            {demo.prompt}
                        </div>
                        <div className="w-[26px] h-[26px] rounded-full grid place-items-center shrink-0 text-[10px] font-semibold bg-[#0a0a0a] text-white">
                            U
                        </div>
                    </div>
                )}

                {(stage === 'thinking' || stage === 'result') && (
                    <div className="flex items-start gap-2.5 animate-fadeSlideIn">
                        <div className="w-[26px] h-[26px] rounded-full grid place-items-center shrink-0 text-[13px] bg-[#ede9fe]">
                            ✦
                        </div>
                        <div className="flex flex-col gap-2.5 flex-1">
                            <div className="text-[13px] leading-[1.55] px-3.5 py-2.5 max-w-[82%] bg-[#f7f7f7] border border-[#efefef] text-[#444] rounded-[16px_16px_16px_2px]">
                                {stage === 'thinking' ? (
                                    <span className="text-[#888]">
                                        Creating flow<span className="animate-blink">...</span>
                                    </span>
                                ) : (
                                    replyText
                                )}
                            </div>

                            {showFlow && (
                                <div className="flex items-center gap-2 animate-fadeSlideIn">
                                    {demo.steps.map(([appName, description], i) => {
                                        const icon = iconFor(appName);
                                        return (
                                            <div
                                                key={`${appName}-${i}`}
                                                title={description}
                                                className="w-6 h-6 rounded-[5px] overflow-hidden bg-[#f0f0f0] shrink-0"
                                            >
                                                {icon && (
                                                    <Image
                                                        src={icon}
                                                        alt={appName}
                                                        width={24}
                                                        height={24}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                    <span className="px-3 py-[5px] bg-accent text-white rounded-[5px] text-[11px] font-semibold">
                                        Live flow →
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t border-[#f0f0f0] px-3.5 py-2.5 flex items-center gap-2.5">
                <div
                    className={`flex-1 min-h-[36px] px-3 py-2 bg-[#f9f9f9] rounded-lg text-[15px] font-semibold leading-6 border-2 ${
                        isTyping ? 'border-[#0a0a0a] text-[#222]' : 'border-[#ebebeb]'
                    }`}
                >
                    {isTyping ? (
                        typed
                    ) : (
                        <span className="text-[#bbb] italic text-xs">Ask viaSocket AI anything…</span>
                    )}
                </div>
                <div
                    className={`w-[34px] h-[34px] rounded-lg grid place-items-center shrink-0 ${
                        isTyping && typed ? 'bg-accent text-white' : 'bg-[#e5e5e5] text-[#bbb]'
                    }`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
