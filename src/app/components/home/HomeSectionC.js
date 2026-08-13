'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { getApps } from '@/utils/axiosCalls';

const MAX_SELECTED_APPS = 3;

// Chips are revealed 20 at a time, but the apps API is asked for a larger batch
// so one "More" in two does not cost a round trip.
const APPS_PER_VIEW = 20;
const APPS_PER_FETCH = 40;

const appKey = (app) => app?.appslugname || app?.name;

// Chips need both a label and an icon, so anything missing either is dropped.
const usableApps = (rows) => (Array.isArray(rows) ? rows.filter((app) => app?.name && app?.iconurl) : []);

const APP_ICONS = {
    Gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    HubSpot: 'https://thingsofbrand.com/api/icon/hubspot.com',
    Slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    Stripe: 'https://stuff.thingsofbrand.com/stripe.com/images/img67eab239fe_stripe.jpg',
    Salesforce: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png',
    'Google Sheets': 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    Shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
    Notion: 'https://thingsofbrand.com/api/icon/notion.com',
    Airtable: 'https://thingsofbrand.com/api/icon/airtable.com',
    QuickBooks: 'https://thingsofbrand.com/api/icon/quickbooks.com',
    Calendly: 'https://thingsofbrand.com/api/icon/calendly.com',
    Zoom: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg',
    'Google Drive': 'https://thingsofbrand.com/api/icon/drive.google.com',
};

const TAG_STYLES = {
    Sales: 'bg-[#16a34a] text-white',
    Finance: 'bg-[#f59e0b] text-white',
    Ops: 'bg-[#4b5563] text-white',
    Outbound: 'bg-[#a78bfa] text-white',
};

// Horizontal inset per side, used only by the floating (xl+) layout. Tighter
// below 2xl so the cards stay clear of the centred column; from 2xl there is
// room to bring them in, as in the design.
const SIDE_POSITION = {
    left: 'left-[1%] 2xl:left-[7%]',
    right: 'right-[1%] 2xl:right-[7%]',
};

const ACTIVITY_CARDS = [
    {
        app: 'HubSpot',
        tag: 'Sales',
        text: 'New lead captured — Priya Shah',
        side: 'left',
        position: 'top-[4%] -rotate-2',
    },
    {
        app: 'Gmail',
        tag: 'Outbound',
        text: 'Drafted follow-up to 12 prospects',
        side: 'right',
        position: 'top-[1%] rotate-2',
    },
    {
        app: 'Stripe',
        tag: 'Finance',
        text: 'Invoice #4821 marked paid — $2,450',
        side: 'left',
        position: 'top-[28%] -rotate-1',
    },
    {
        app: 'Google Drive',
        tag: 'Ops',
        text: 'Filed Q3 contracts in /Legal/2026',
        side: 'right',
        position: 'top-[34%] rotate-1',
    },
    {
        app: 'Salesforce',
        tag: 'Sales',
        text: 'Updated pipeline — 4 deals moved to negotiation',
        side: 'left',
        position: 'top-[55%] -rotate-1',
    },
    {
        app: 'QuickBooks',
        tag: 'Finance',
        text: 'Reconciled 38 transactions from Stripe',
        side: 'right',
        position: 'top-[64%] rotate-2',
    },
];

// floating: scattered around the hero (xl+). Otherwise the card sits in normal
// flow — a swipeable row on phones, a grid on tablets — so it is never hidden.
function ActivityCard({ app, tag, text, side, position, floating = false }) {
    const layout = floating
        ? `absolute w-[210px] 2xl:w-[265px] ${SIDE_POSITION[side]} ${position}`
        : 'w-[240px] shrink-0 sm:w-auto';

    return (
        <div
            className={`bg-white border border-black/[0.07] shadow-[0_4px_18px_rgba(0,0,0,0.07)] px-3.5 py-2.5 ${layout}`}
        >
            <div className="flex items-center gap-2">
                <Image
                    src={APP_ICONS[app]}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain rounded shrink-0"
                />
                <span className="text-sm font-semibold text-gray-900">{app}</span>
                <span className={`text-[10px] font-semibold leading-none px-1.5 py-1 rounded ${TAG_STYLES[tag]}`}>
                    {tag}
                </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-gray-500">{text}</p>
        </div>
    );
}

export default function HomeSectionC({ initialApps }) {
    const [query, setQuery] = useState('');
    const [selectedApps, setSelectedApps] = useState([]);
    // Everything pulled from the apps API so far, and how much of it is on screen.
    const [apps, setApps] = useState(() => usableApps(initialApps));
    const [visibleCount, setVisibleCount] = useState(APPS_PER_VIEW);
    // Counted on raw rows, not the filtered pool, since it is the API's offset.
    const [fetchedCount, setFetchedCount] = useState(initialApps?.length || 0);
    const [isLoading, setIsLoading] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);
    const inputRef = useRef(null);

    const limitReached = selectedApps.length >= MAX_SELECTED_APPS;
    const visibleApps = apps.slice(0, visibleCount);
    const hasMore = visibleCount < apps.length || !reachedEnd;

    const addBatch = (rows) => {
        setFetchedCount((current) => current + (rows?.length || 0));
        if (!rows?.length || rows.length < APPS_PER_FETCH) setReachedEnd(true);

        setApps((current) => {
            const seen = new Set(current.map(appKey));
            return [...current, ...usableApps(rows).filter((app) => !seen.has(appKey(app)))];
        });
    };

    // The home page hands variant C the apps it already fetched; only pages that
    // pass none need this first request.
    useEffect(() => {
        if (apps.length) return;

        let active = true;
        const loadFirstBatch = async () => {
            setIsLoading(true);
            const rows = await getApps({ limit: APPS_PER_FETCH, offset: 0 });
            if (!active) return;
            addBatch(rows);
            setIsLoading(false);
        };

        loadFirstBatch();
        return () => {
            active = false;
        };
    }, []);

    const showMore = async () => {
        // Reveal what is already loaded before going back to the API.
        if (visibleCount < apps.length) {
            setVisibleCount((current) => current + APPS_PER_VIEW);
            return;
        }
        if (reachedEnd || isLoading) return;

        setIsLoading(true);
        const rows = await getApps({ limit: APPS_PER_FETCH, offset: fetchedCount });
        addBatch(rows);
        setVisibleCount((current) => current + APPS_PER_VIEW);
        setIsLoading(false);
    };

    const toggleApp = (app) => {
        setSelectedApps((current) => {
            if (current.some((selected) => appKey(selected) === appKey(app))) {
                return current.filter((selected) => appKey(selected) !== appKey(app));
            }
            if (current.length >= MAX_SELECTED_APPS) return current;
            return [...current, app];
        });
    };

    return (
        <section className="relative overflow-hidden dotted-background">

            <div aria-hidden="true" className="hidden lg:block">
                {ACTIVITY_CARDS.map((card) => (
                    <ActivityCard key={card.text} floating {...card} />
                ))}
            </div>

            <div className="container relative flex flex-col items-center text-center py-14">
                <span className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm">
                    <span className="w-2 h-2 bg-accent shrink-0" />
                    Chosen by 30,000+ teams
                </span>

                <h1 className="h1 font-bold tracking-[-0.03em] max-w-3xl mt-6 sm:mt-8">
                    AI workers that run
                    <br className="hidden sm:inline" /> all your apps in one place.
                </h1>

                <p className="mt-6 max-w-[520px] text-base md:text-lg leading-[1.7] text-gray-600">
                    ViaSocket&apos;s AI workers plug into the tools your team already uses. Hire them once — they handle
                    the busywork across every app, around the clock.
                </p>

                {/* Selected apps stay in the bar as removable chips, the same shape the
                    existing home search uses. */}
                <div
                    onClick={() => inputRef.current?.focus()}
                    className="mt-10 flex items-center gap-2 w-full max-w-xl h-14 px-4 sm:px-5 bg-white border border-black/10 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus-within:border-black/30 transition-colors cursor-text overflow-x-auto no-scrollbar"
                >
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />

                    {selectedApps.map((app) => (
                        <span
                            key={appKey(app)}
                            className="flex items-center gap-1 shrink-0 rounded-full border border-accent bg-[#fff5f5] px-1 text-[10px]"
                        >
                            <Image
                                src={app?.iconurl}
                                alt=""
                                width={12}
                                height={12}
                                className="w-4 h-4 object-contain"
                            />
                            {app?.name}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleApp(app);
                                }}
                                aria-label={`Remove ${app?.name}`}
                                className="grid place-items-center w-5 h-5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={selectedApps.length ? '' : 'Try airtable...'}
                        className="grow min-w-[6rem] bg-transparent outline-none text-base text-[#252525] placeholder:text-gray-400"
                    />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-[760px]">
                    {visibleApps.map((app) => {
                        const isSelected = selectedApps.some((selected) => appKey(selected) === appKey(app));
                        // Once three are picked, the rest are out of reach until one is removed.
                        const isDisabled = !isSelected && limitReached;

                        return (
                            <button
                                key={appKey(app)}
                                type="button"
                                onClick={() => toggleApp(app)}
                                disabled={isDisabled}
                                aria-pressed={isSelected}
                                className={`flex items-center gap-2 rounded-full border px-2 py-1 text-xs bg-white font-medium shadow-sm transition-colors ${
                                    isSelected
                                        ? 'border-accent bg-accent/5 text-accent'
                                        : isDisabled
                                          ? 'border-black/10 bg-white text-gray-400 cursor-not-allowed opacity-60'
                                          : 'border-black/10 bg-white text-gray-800 hover:border-black/30'
                                }`}
                            >
                                <Image
                                    src={app?.iconurl}
                                    alt=""
                                    width={18}
                                    height={18}
                                    className={`w-[18px] h-[18px] object-contain ${isDisabled ? 'grayscale' : ''}`}
                                />
                                {app?.name}
                                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                        );
                    })}

                    {hasMore && (
                        <button
                            type="button"
                            onClick={showMore}
                            disabled={isLoading}
                            className="flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm transition-colors hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? 'Loading…' : 'More'}
                            {!isLoading && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                    )}
                </div>

                {limitReached && (
                    <p className="mt-3 text-[13px] text-gray-500">
                        You can compare up to {MAX_SELECTED_APPS} apps — remove one to pick another.
                    </p>
                )}

                {/* Below xl there is no room to float the cards beside the copy, so they
                    run in flow instead: a swipeable row on phones, a grid from sm up. */}
                <div
                    aria-hidden="true"
                    className="lg:hidden w-full mt-12 flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-3"
                >
                    {ACTIVITY_CARDS.map((card) => (
                        <ActivityCard key={card.text} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
