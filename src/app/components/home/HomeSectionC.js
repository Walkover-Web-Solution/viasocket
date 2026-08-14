'use client';

import { useEffect, useState } from 'react';
import { getApps, getUsecases } from '@/utils/axiosCalls';
import searchApps from '@/utils/searchApps';
import { savePageUtmSource } from '@/utils/handleUtmSource';
import ActivityCard, { ACTIVITY_CARDS } from './ActivityCard';
import AppPicker, { appKey } from './AppPicker';

// The automation-ideas app takes it from here; `web=true` marks the visit as
// coming from the site.
const AUTOMATION_IDEAS_URL = 'http://viasocket.com/automation-ideas';

// Home C variant tag — the source a signup from this hero reports.
const HOME_C_UTM_SOURCE = 'home-C';
const SIGNUP_URL = `/signup?utm_source=${HOME_C_UTM_SOURCE}`;

const MAX_SELECTED_APPS = 3;

// Chips are revealed 20 at a time, but the apps API is asked for a larger batch
// so one "More" in two does not cost a round trip.
const APPS_PER_VIEW = 10;
const APPS_PER_FETCH = 40;

// Chips need both a label and an icon, so anything missing either is dropped.
// Some rows come back with the icon URL padded, which next/image rejects.
const usableApps = (rows) =>
    (Array.isArray(rows) ? rows : [])
        .filter((app) => app?.name && app?.iconurl?.trim())
        .map((app) => ({ ...app, iconurl: app.iconurl.trim() }));

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
    // null while the visitor is browsing; an array once a search has answered.
    const [searchResults, setSearchResults] = useState(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    // The slug lookup runs before leaving the page, so the loader covers that gap.
    const [isRedirecting, setIsRedirecting] = useState(false);

    const isSearching = searchResults !== null;
    const pool = isSearching ? searchResults : apps;
    const limitReached = selectedApps.length >= MAX_SELECTED_APPS;
    const visibleApps = pool.slice(0, visibleCount);
    const hasMore = isSearching ? visibleCount < pool.length : visibleCount < apps.length || !reachedEnd;

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

    // Typing searches the whole catalogue rather than the loaded pool, which is
    // only its first pages. Debounced so a fast typist makes one request.
    useEffect(() => {
        const term = query.trim();
        setVisibleCount(APPS_PER_VIEW);

        if (!term) {
            setSearchResults(null);
            setIsSearchLoading(false);
            return;
        }

        let active = true;
        setIsSearchLoading(true);

        const timer = setTimeout(async () => {
            const rows = await searchApps(term);
            if (!active) return;
            setSearchResults(usableApps(rows));
            setIsSearchLoading(false);
        }, 500);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [query]);

    const showMore = async () => {
        // Reveal what is already loaded before going back to the API.
        if (visibleCount < pool.length) {
            setVisibleCount((current) => current + APPS_PER_VIEW);
            return;
        }
        // A search is a fixed set of results — there is no next page to fetch.
        if (isSearching || reachedEnd || isLoading) return;

        setIsLoading(true);
        const rows = await getApps({ limit: APPS_PER_FETCH, offset: fetchedCount });
        addBatch(rows);
        setVisibleCount((current) => current + APPS_PER_VIEW);
        setIsLoading(false);
    };

    const startSignup = () => {
        savePageUtmSource(HOME_C_UTM_SOURCE);
        // Straight to signup rather than handleRedirect, which sends utm_source
        // twice — once inside `state`, once standalone. Only the standalone one is
        // read: CustomLoginOptimized rebuilds `state` itself from the cookie.
        window.open(SIGNUP_URL, '_self');
    };

    const clearApps = () => setSelectedApps([]);

    // The usecase API filters by one app at a time, and a returned record is keyed
    // to its own primary app — so the slug is read off the entry matching the app
    // that was picked, not off the record. The picker's slug is the fallback.
    const slugFor = async (app) => {
        const records = await getUsecases(app.name);
        const match = (records || [])
            .flatMap((record) => record?.apps || [])
            .find((entry) => entry?.app?.toLowerCase() === app.name?.toLowerCase());

        return match?.app_slug || app.appslugname;
    };

    const showUsecases = async () => {
        if (!selectedApps.length || isRedirecting) return;

        setIsRedirecting(true);

        const slugs = await Promise.all(selectedApps.map(slugFor));
        const params = new URLSearchParams({ web: 'true' });
        [...new Set(slugs.filter(Boolean))].forEach((slug) => params.append('app', slug));

        window.open(`${AUTOMATION_IDEAS_URL}?${params}`, '_blank');
        // The tab opens beside this page, so the guard has to be released or the
        // button would stay dead after the first click.
        setIsRedirecting(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Once apps are picked, Enter shows what they can automate; with an
            // empty bar it still goes straight to signup.
            selectedApps.length ? showUsecases() : startSignup();
            return;
        }
        // With nothing left to delete in the input, Backspace steps back through
        // the picked apps instead, the way tag inputs behave.
        if (e.key === 'Backspace' && !query && selectedApps.length) {
            setSelectedApps((current) => current.slice(0, -1));
        }
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
                    Automation for every app you already use.
                    {/* <br className="hidden sm:inline" /> all your apps in one place. */}
                </h1>

                <p className="mt-6 max-w-[520px] text-base md:text-lg leading-[1.7] text-gray-600">
                    It handles the busywork across every app in your stack, around the clock.
                </p>

                <AppPicker
                    query={query}
                    onQueryChange={setQuery}
                    onKeyDown={handleKeyDown}
                    selectedApps={selectedApps}
                    visibleApps={visibleApps}
                    limitReached={limitReached}
                    hasMore={hasMore}
                    isLoading={isLoading || isSearchLoading}
                    onToggleApp={toggleApp}
                    onClearApps={clearApps}
                    onShowMore={showMore}
                    onSubmit={showUsecases}
                />

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
