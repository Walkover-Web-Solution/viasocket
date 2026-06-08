'use client';

import { useState, useEffect, useCallback } from 'react';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';

const events = [
    {
        text: 'New Signup',
        iconColor: '#059669',
        iconSvg: 'M12 2L13.4 8.4L20 10L13.4 11.6L12 18L10.6 11.6L4 10L10.6 8.4Z',
    },
    {
        text: 'Order Placed',
        iconColor: '#2563eb',
        iconSvg: 'M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z',
    },
    {
        text: 'Payment Received',
        iconColor: '#d97706',
        iconSvg:
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z',
    },
    {
        text: 'Form Submitted',
        iconColor: '#7c3aed',
        iconSvg:
            'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    },
    {
        text: 'Meeting Booked',
        iconColor: '#db2777',
        iconSvg:
            'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    },
];

const scenarios = [
    {
        event: 'order.placed',
        value: '149.00',
        pill: '5 done',
        rows: [
            {
                name: 'Gmail',
                sub: 'Send order receipt',
                img: 'https://thingsofbrand.com/api/icon/gmail.com',
            },
            {
                name: 'Slack',
                sub: 'Notify #sales',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Sheets',
                sub: 'Log order row',
                img: 'https://thingsofbrand.com/api/icon/google.com',
            },
            {
                name: 'HubSpot',
                sub: 'Create deal in pipeline',
                img: 'https://thingsofbrand.com/api/icon/hubspot.com',
            },
            {
                name: 'Notion',
                sub: 'Add order to tracker',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
    {
        event: 'user.signup',
        value: '0.00',
        pill: '3 done',
        rows: [
            {
                name: 'Mailchimp',
                sub: 'Add to welcome list',
                img: 'https://thingsofbrand.com/api/icon/mailchimp.com',
            },
            {
                name: 'Slack',
                sub: 'Alert #growth',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Airtable',
                sub: 'Create user record',
                img: 'https://thingsofbrand.com/api/icon/airtable.com',
            },
            {
                name: 'HubSpot',
                sub: 'Create contact',
                img: 'https://thingsofbrand.com/api/icon/hubspot.com',
            },
            {
                name: 'Notion',
                sub: 'Log to CRM',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
    {
        event: 'payment.success',
        value: '499.00',
        pill: '4 done',
        rows: [
            {
                name: 'QuickBooks',
                sub: 'Record invoice',
                img: 'https://thingsofbrand.com/api/icon/quickbooks.com',
            },
            {
                name: 'Slack',
                sub: 'Notify #finance',
                img: 'https://thingsofbrand.com/api/icon/slack.com',
            },
            {
                name: 'Gmail',
                sub: 'Send receipt',
                img: 'https://thingsofbrand.com/api/icon/gmail.com',
            },
            {
                name: 'Stripe',
                sub: 'Update customer',
                img: 'https://thingsofbrand.com/api/icon/stripe.com',
            },
            {
                name: 'Notion',
                sub: 'Log transaction',
                img: 'https://thingsofbrand.com/api/icon/notion.com',
            },
        ],
    },
];

export default function WebhookHero() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const cycle = useCallback(() => {
        setFade(true);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % events.length);
            setFade(false);
        }, 250);
    }, []);

    useEffect(() => {
        const interval = setInterval(cycle, 3000);
        return () => clearInterval(interval);
    }, [cycle]);

    const scenario = scenarios[index % scenarios.length];
    const event = events[index];

    return (
        <>
            <section className="pt-3 mx-auto bg-transparent relative container max-[768px]:px-6 max-[480px]:px-4">
                <EmbedBreadcrumbs currentPage="Action via Webhook" />
                <div className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_85%_60%,#0f3a3a_0%,#071e2e_30%,#050f1f_60%,#030a14_100%)] border border-white/10">
                    {/* Aurora blobs */}
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[620px] h-[620px] bg-[#0a4a4a] -left-[8%] -top-[10%] opacity-55 animate-[blobFloat1_8s_ease-in-out_infinite] max-[768px]:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[540px] h-[540px] bg-[#0d6e6e] -right-[6%] top-[30%] opacity-45 animate-[blobFloat2_10s_ease-in-out_infinite] max-[768px]:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[520px] h-[520px] bg-[#0a3d5c] left-[40%] -bottom-[18%] opacity-40 animate-[blobFloat3_12s_ease-in-out_infinite] max-[768px]:blur-[60px]" />

                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1.2px, transparent 1.6px)',
                            backgroundSize: '22px 22px',
                            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 100%)',
                            WebkitMaskImage:
                                'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 100%)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 px-12 w-full grid grid-cols-2 gap-12 items-center max-[960px]:grid-cols-1 max-[960px]:gap-16 max-[960px]:py-[72px] max-[960px]:px-6">
                        {/* Left */}
                        <div className="flex flex-col gap-2 items-start text-left max-[960px]:items-center max-[960px]:text-center">
                            <h1 className="h1 !text-white flex flex-wrap items-center gap-1 mb-4">
                                Trigger real actions when
                                <span
                                    className={`inline-flex items-center gap-2.5 bg-white py-1.5 pl-2.5 pr-[22px] shadow-[0_8px_28px_rgba(0,0,0,0.32)] text-[40px] font-bold tracking-[-1.5px] text-[#0a0a0a] leading-[1.1] justify-start transition-opacity duration-[250ms] will-change-opacity rounded-[10px] min-w-[260px] max-[768px]:text-[26px] max-[768px]:min-w-[200px] max-[768px]:py-1 max-[768px]:pl-1.5 max-[768px]:pr-3.5 max-[768px]:gap-2 ${fade ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    <span
                                        className="w-[42px] h-[42px] flex items-center justify-center shrink-0 rounded-md overflow-hidden max-[768px]:w-[34px] max-[768px]:h-[34px]"
                                        style={{ backgroundColor: event.iconColor + '15' }}
                                    >
                                        <svg
                                            className="w-7 h-7 max-[768px]:w-6 max-[768px]:h-6"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={event.iconColor}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d={event.iconSvg} />
                                        </svg>
                                    </span>
                                    <span>{event.text}</span>
                                </span>
                            </h1>

                            <p className="text-base text-white/70 max-w-[480px] mb-8 leading-[1.55] font-normal max-[960px]:mx-auto">
                                POST an event from your server and viaSocket executes real actions across every app your
                                users have connected — instantly, reliably, no AI needed.
                            </p>

                            <a
                                href="https://viasocket.com/signup?utm_source=/embed/actions-via-webhook"
                                className="btn btn-outline"
                            >
                                Get Started
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                >
                                    <path d="M2.5 7h9M8.5 3l4 4-4 4" />
                                </svg>
                            </a>
                        </div>

                        {/* Right */}
                        <div className="relative flex items-center justify-center">
                            <div className="flex items-stretch w-full max-w-[560px] h-[420px] mx-auto rounded-xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.1)] max-[768px]:max-w-[380px]">
                                {/* Left: POST request card */}
                                <div className="bg-[#0d0d14] w-[196px] shrink-0 flex flex-col border-r border-white/[0.09] max-[768px]:w-[155px]">
                                    <div className="flex items-center gap-[7px] py-[11px] px-[13px] border-b border-white/[0.08] shrink-0">
                                        <span className="bg-[#059669] text-white text-[8.5px] font-medium tracking-[0.6px] py-[3px] px-[7px] rounded font-sans shrink-0">
                                            POST
                                        </span>
                                        <span className="font-mono text-[8.5px] text-white/[0.32] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                                            flow.viasocket.com/wh/…
                                        </span>
                                    </div>
                                    <div
                                        className={`py-[13px] px-[13px] flex-1 font-mono text-[11px] leading-[1.9] text-[#e2e8f0] transition-opacity duration-[250ms] whitespace-pre-wrap max-[768px]:text-[9.5px] max-[768px]:p-[10px] ${fade ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <span className="text-[#86efac]">&quot;event&quot;</span>:{' '}
                                        <span className="text-[#fbbf24]">&quot;{scenario.event}&quot;</span>,{'\n'}
                                        <span className="text-[#86efac]">&quot;user_id&quot;</span>:{' '}
                                        <span className="text-[#fbbf24]">&quot;usr_92k&quot;</span>,{'\n'}
                                        <span className="text-[#86efac]">&quot;amount&quot;</span>:{' '}
                                        <span className="text-[#fbbf24]">{scenario.value}</span>
                                    </div>
                                    <div className="py-[9px] px-[13px] border-t border-white/[0.08] flex items-center gap-[7px] shrink-0">
                                        <span className="w-[7px] h-[7px] rounded-full bg-[#059669] shrink-0 animate-[whDot_1.5s_ease-in-out_infinite]" />
                                        <span className="text-[9.5px] font-semibold text-white/[0.38] font-sans tracking-[0.1px]">
                                            Sending…
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Execution log */}
                                <div className="bg-white flex-1 flex flex-col">
                                    <div className="flex items-center justify-between py-[11px] px-[13px] border-b border-black/[0.07] shrink-0">
                                        <span className="text-[10px] font-bold text-[#111] font-sans tracking-[-0.1px]">
                                            Actions executed
                                        </span>
                                        <span
                                            className={`text-[8px] font-bold py-0.5 px-2 rounded-full font-sans tracking-[0.3px] transition-colors duration-300 ${fade ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-[#dcfce7] text-[#15803d]'}`}
                                        >
                                            {scenario.pill}
                                        </span>
                                    </div>
                                    {scenario.rows.map((row, i) => (
                                        <div
                                            className="flex items-center gap-[9px] py-[9px] px-[13px] border-b border-black/[0.06] flex-1 last:border-b-0"
                                            key={i}
                                        >
                                            <div className="w-[27px] h-[27px] rounded-[7px] bg-[#f4f4f5] border border-black/[0.07] flex items-center justify-center shrink-0 overflow-hidden">
                                                <img
                                                    className="w-4 h-4 object-contain"
                                                    src={row.img}
                                                    alt=""
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[11px] font-bold text-[#111] font-sans whitespace-nowrap overflow-hidden text-ellipsis leading-[1.2]">
                                                    {row.name}
                                                </div>
                                                <div className="text-[9.5px] text-[#9ca3af] font-sans whitespace-nowrap overflow-hidden text-ellipsis mt-px leading-[1.2]">
                                                    {row.sub}
                                                </div>
                                            </div>
                                            <span
                                                className={`text-[7.5px] font-medium py-0.5 px-1.5 rounded-full font-sans tracking-[0.4px] shrink-0 transition-colors duration-300 ${fade ? 'bg-[#f3f4f6] text-[#9ca3af]' : 'bg-[#dcfce7] text-[#16a34a]'}`}
                                            >
                                                {fade ? 'WAIT' : 'DONE'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                @keyframes blobFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, 20px) scale(1.05); }
                }
                @keyframes blobFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 30px) scale(1.08); }
                }
                @keyframes blobFloat3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.06); }
                }
                @keyframes whDot {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1); }
                }
            `}</style>
            </section>
        </>
    );
}
