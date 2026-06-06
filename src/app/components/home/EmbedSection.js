import Link from 'next/link';
import Image from 'next/image';
import style from '../../../scss/embed.module.scss';

const orbitApps = [
    { name: 'Slack', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
    { name: 'Gmail', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg' },
    { name: 'Notion', img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { name: 'HubSpot', img: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg' },
    { name: 'Figma', img: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
    { name: 'Google Sheets', img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg' },
];

const proofCards = [
    {
        title: 'Two-step setup, zero engineering',
        desc: 'Configure the display, grab the embed code, paste it in. No SDKs to learn, no developer time burned. Automation in minutes.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2L4.5 13.5h6L11 22l8.5-11.5h-6L13 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'We maintain the infrastructure',
        desc: 'OAuth flows, token refresh, API changes, rate limits, error recovery: all handled. When an app updates, we adapt. Your users never notice.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Power up your AI with actions',
        desc: "Connect your chatbot or AI agent to 2100+ apps. Your AI doesn't just answer questions; it sends emails, creates tickets, and updates records.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function EmbedSection() {
    return (
        <div className="bg-[#1c1c1c] py-24">
            <div className="container flex lg:flex-row flex-col gap-12 items-center justify-between mb-6">
                <div className="flex-1 max-w-4xl">
                    <p className="inline-flex items-center bg-[rgba(160,30,30,0.35)] border border-[rgba(220,80,80,0.55)] rounded-full px-3.5 py-1.5 text-[#e06060] text-sm font-semibold tracking-widest uppercase mb-3 shadow-[0_0_16px_rgba(196,80,80,0.2)]">
                        For SaaS &amp; AI products
                    </p>
                    <h2 className="h2 mb-5 text-white">Your product, now with 2100+ integrations</h2>
                    <p className="sub__h2 mb-12 text-gray-400">
                        Drop one embed into your product. Your users instantly get thousands of app integrations,
                        pre-built workflow templates, and AI-powered actions, without ever leaving your platform.
                    </p>

                    <Link href="/embed" className="btn btn-accent">
                        Explore embed
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="w-[360px] h-[360px] md:w-[320px] md:h-[320px] relative" aria-hidden="true">
                        <div className="absolute top-1/2 left-1/2">
                            <div className={`absolute rounded-full pointer-events-none w-[200px] h-[200px] -top-[100px] -left-[100px] md:w-60 md:h-60 md:-top-[120px] md:-left-[120px] border border-[rgba(220,90,90,0.65)] ${style.ring1}`} />
                            <div className={`absolute rounded-full pointer-events-none w-[280px] h-[280px] -top-[140px] -left-[140px] md:w-80 md:h-80 md:-top-40 md:-left-40 border border-[rgba(220,90,90,0.35)] ${style.ring2}`} />
                            <div className={`absolute rounded-full pointer-events-none w-[350px] h-[350px] -top-[175px] -left-[175px] md:w-[400px] md:h-[400px] md:-top-[200px] md:-left-[200px] border border-[rgba(220,90,90,0.15)] ${style.ring3}`} />

                            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[3]">
                                <div className={style['center-box']}>
                                    <Image
                                        src="/assets/brand/favicon-96x96.png"
                                        alt="viaSocket"
                                        width={72}
                                        height={72}
                                        className="w-[72px] h-[72px] max-w-none drop-shadow-[0_6px_24px_rgba(220,80,80,0.45)]"
                                    />
                                </div>
                            </div>

                            {orbitApps.map((app, i) => (
                                <div
                                    key={app.name}
                                    className={`absolute -top-[22px] -left-[22px] w-11 h-11 rounded-xl bg-[#303030] border border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden z-[2] ${style[`o${i + 1}`]}`}
                                >
                                    <Image src={app.img} alt={app.name} width={26} height={26} unoptimized className="w-[26px] h-[26px] object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {proofCards.map((card) => (
                        <div key={card.title} className="bg-[#272727] p-7 shadow-[0_2px_20px_rgba(0,0,0,0.35)] transition-all duration-200 ease-in-out">
                            <div className="inline-flex items-center justify-center w-11 h-11 rounded-[10px] bg-[rgba(139,26,26,0.25)] text-[#c45050] mb-[18px]">
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-400">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
