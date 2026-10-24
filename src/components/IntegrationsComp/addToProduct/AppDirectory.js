'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import s from './addToProduct.module.scss';
import searchApps from '@/utils/searchApps';
import createURL from '@/utils/createURL';
import { APPERPAGE } from '@/const/integrations';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

// The app directory on /integrations and /integrations/category/{name}: the category list on the
// left, the apps on the right, a search over both, Prev/Next pages and "Request an App".
// Same structure as before, in the homepage design.

const byPriority = (cats) =>
    [...(cats || [])]
        .filter((c) => !c?.hidden && c?.slug)
        .sort((a, b) => (Number(a.priority) || Infinity) - (Number(b.priority) || Infinity) || a.name.localeCompare(b.name));

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
        </svg>
    );
}

function AppCard({ app }) {
    return (
        <Link href={createURL(`/integrations/${app?.appslugname}`)} className={s['dir-app']}>
            <img className={s.appicon} src={app?.iconurl || 'https://placehold.co/36x36'} alt="" width={32} height={32} style={{ width: 32, height: 32 }} loading="lazy" />
            <span>{app?.name}</span>
        </Link>
    );
}

/** "Request an App": opens the existing request form (same ?requestIntegration=true link as before). */
function useRequestForm() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const open = params?.get('requestIntegration') === 'true' && !params?.get('requestType');
    const set = (on) => {
        const p = new URLSearchParams(params?.toString() || '');
        if (on) p.set('requestIntegration', 'true');
        else {
            p.delete('requestIntegration');
            p.delete('requestType');
        }
        const q = p.toString();
        router.replace(`${pathname}${q ? `?${q}` : ''}`, { scroll: false });
    };
    return { open, show: () => set(true), hide: () => set(false) };
}

function RequestCard({ onRequest }) {
    return (
        <div className={s['dir-req']}>
            <b>Can’t find an app?</b>
            <button type="button" onClick={onRequest}>
                Request it →
            </button>
        </div>
    );
}

export default function AppDirectory({ apps = [], categories = [], integrationsInfo = {}, pageInfo = {}, categoryData = {}, appCount = 0 }) {
    const [term, setTerm] = useState('');
    const [query, setQuery] = useState('');
    const [found, setFound] = useState(null); // null = not searching
    const request = useRequestForm();
    const inputRef = useRef(null);

    const sorted = useMemo(() => byPriority(categories), [categories]);
    const current = integrationsInfo?.category && integrationsInfo.category !== 'all' ? integrationsInfo.category : null;
    const page = Number(integrationsInfo?.page) || 0;

    useEffect(() => {
        const t = setTimeout(() => setQuery(term.trim()), 400);
        return () => clearTimeout(t);
    }, [term]);

    useEffect(() => {
        if (!query) {
            setFound(null);
            return;
        }
        let live = true;
        searchApps(query).then((res) => live && setFound(res || []));
        return () => {
            live = false;
        };
    }, [query]);

    const shownCats = query ? sorted.filter((c) => c.name?.toLowerCase().includes(query.toLowerCase())) : sorted;

    const nextUrl = `/integrations/${current ? `category/${current}/` : ''}page/${page + 1}`;
    const prevUrl = page - 1 > 0 ? `/integrations/${current ? `category/${current}/` : ''}page/${page - 1}` : `/integrations${current ? `/category/${current}` : ''}`;
    const showNext = apps.length > 0 && apps.length >= APPERPAGE;


    return (
        <section className={`${s.sec} ${s['dir-sec']}`} id="apps">
            <div className={s.wrap}>
                <div className={s['dir-head']}>
                    <div className={s.sh}>
                        {current && (
                            <>
                                <h2 className={s.h2}>
                                    <span className={s['dir-count']}>{categoryData?.appcount || 300}+</span>{' '}
                                    {decodeURIComponent(categoryData?.name || current)}
                                </h2>
                                {categoryData?.subheading && <p className={s.lead}>{categoryData.subheading}</p>}
                            </>
                        )}
                    </div>
                    <label className={s['dir-search']} htmlFor="app-search">
                        <SearchIcon />
                        <input
                            id="app-search"
                            ref={inputRef}
                            type="search"
                            placeholder="Search apps or categories"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            autoComplete="off"
                        />
                    </label>
                </div>

                <div className={s.dir}>
                    <div className={s['dir-side']}>
                        <nav className={s['dir-cats']} aria-label="App categories">
                            {shownCats.map((c) => (
                                <Link key={c.slug} href={createURL(`/integrations/category/${c.slug}`)} className={c.slug === (current || 'all') ? s.on : undefined}>
                                    {c.name}
                                </Link>
                            ))}
                            {query && !shownCats.length && <span className={s['dir-none']}>No category matches “{query}”.</span>}
                        </nav>
                    </div>

                    <div className={s['dir-main']}>
                        {found === null ? (
                            <div className={s['dir-grid']}>
                                {apps.map((app) => (
                                    <AppCard key={app?.rowid || app?.appslugname} app={app} />
                                ))}
                                <RequestCard onRequest={request.show} />
                            </div>
                        ) : found.length ? (
                            <div className={s['dir-grid']}>
                                {found.map((app) => (
                                    <AppCard key={app?.rowid || app?.appslugname} app={app} />
                                ))}
                                <RequestCard onRequest={request.show} />
                            </div>
                        ) : (
                            <div className={s['dir-empty']}>
                                <p>
                                    No app matches “{query}”. <b>Request it</b> and we’ll try to add it within 48 hours, or build its plug yourself.
                                </p>
                                <div className={s['hero-cta']}>
                                    <button type="button" className={s.btn} onClick={request.show}>
                                        Request an app
                                    </button>
                                    <a className={s['btn-o']} style={{ display: 'inline-flex', alignItems: 'center' }} href="https://viasocket.com/help/plugin-builder" target="_blank" rel="noopener noreferrer">
                                        Read our playbook
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {found === null && (page > 0 || showNext) && (
                    <div className={s['dir-pager']}>
                        {page > 0 && (
                            <Link className={s['btn-o']} href={createURL(prevUrl)}>
                                ← Prev
                            </Link>
                        )}
                        {showNext && (
                            <Link className={s['btn-o']} href={createURL(nextUrl)}>
                                Next →
                            </Link>
                        )}
                    </div>
                )}
            </div>
            {request.open && <IntegrationsRequestComp onClose={request.hide} />}
        </section>
    );
}
