import Link from 'next/link';
import Image from 'next/image';
import CTAButtons from './CTAButtons';
import HeroChatDemo from './HeroChatDemo';

const AVATAR_BASE =
    'w-10 h-10 rounded-full border-[2.5px] border-white object-cover shadow-[0_2px_6px_rgba(0,0,0,0.12)]';

// Shown only when the apps API returns nothing, mirroring ShowAppsIndexOptimized.
const STRIP_FALLBACK = [
    { name: 'Gmail', iconurl: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg' },
    { name: 'Slack', iconurl: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg' },
    { name: 'Google Sheets', iconurl: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png' },
    { name: 'WhatsApp', iconurl: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_whatsapp.svg' },
    { name: 'Instagram', iconurl: 'https://stuff.thingsofbrand.com/nstagram.com/images/img3_nstagram.png' },
    { name: 'Shopify', iconurl: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg' },
    { name: 'Stripe', iconurl: 'https://stuff.thingsofbrand.com/stripe.com/images/img67eab239fe_stripe.jpg' },
    { name: 'Notion', iconurl: 'https://thingsofbrand.com/api/icon/notion.com' },
];

// Locale-independent so the server and client render the same string.
const withThousands = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function HeroSection({ hasToken, appCount, apps }) {
    const totalApps = appCount ? appCount + 300 : 0;
    const appsLabel = totalApps ? withThousands(totalApps) : '2,000';
    const moreLabel = totalApps ? `+${Math.round(totalApps / 1000)}k` : '+2k';

    const liveApps = (apps || []).filter((app) => app?.iconurl);
    const stripApps = (liveApps.length ? liveApps : STRIP_FALLBACK).slice(0, 8);

    return (
        <section className="container text-left">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-32 items-center">
                <div className="space-y-6">
                    <h1 className="h1">
                        Connect your apps,
                        <br />
                        <span className="text-accent">let AI automate your workflows.</span>
                    </h1>

                    <p className="text-lg font-light leading-[1.7] text-[#555] max-w-[440px] mb-10 opacity-0 animate-fadeSlideIn [animation-delay:0.2s]">
                        Connect Gmail, Instagram, Google Sheets, WhatsApp, Slack, Shopify, and {appsLabel}+ other apps.
                        Just tell AI what you want to automate — no coding required.
                    </p>

                    <div className="flex items-center gap-6 flex-wrap opacity-0 animate-fadeSlideIn [animation-delay:0.3s]">
                        <CTAButtons hasToken={hasToken} />
                        <Link
                            href="/experts-are-live"
                            target="_blank"
                            className="group flex items-center gap-2.5 cursor-pointer no-underline"
                        >
                            <div className="flex items-center">
                                <Image
                                    className={AVATAR_BASE}
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="Expert"
                                    width={40}
                                    height={40}
                                />
                                <Image
                                    className={`${AVATAR_BASE} -ml-2.5`}
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt="Expert"
                                    width={40}
                                    height={40}
                                />
                                <span className="relative inline-flex shrink-0 -ml-2.5">
                                    <Image
                                        className={AVATAR_BASE}
                                        src="https://randomuser.me/api/portraits/men/46.jpg"
                                        alt="Expert"
                                        width={40}
                                        height={40}
                                    />
                                    <span className="absolute bottom-0.5 right-0.5 w-[13px] h-[13px] rounded-full bg-[#22c55e] border-[2.5px] border-white z-[2] animate-pulse-dot" />
                                </span>
                            </div>
                            <span className="text-base font-medium text-accent flex items-center gap-1.5 -tracking-[0.01em]">
                                Talk to an expert{' '}
                                <span className="text-[17px] transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </Link>
                    </div>

                    <div className="pt-8 border-t border-gray-200 ! mt-12">
                        <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
                            Works with your stack
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            {stripApps.map((app, i) => (
                                <div
                                    key={`${app.iconurl}-${i}`}
                                    title={app.name || 'app'}
                                    className="w-8 h-8 p-1 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
                                >
                                    <Image
                                        src={app.iconurl}
                                        alt={app.name || 'app icon'}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-md bg-[#f5f5f5] grid place-items-center text-xs font-semibold text-gray-500">
                                {moreLabel}
                            </div>
                        </div>
                    </div>
                </div>

                <HeroChatDemo apps={apps} />
            </div>
        </section>
    );
}
