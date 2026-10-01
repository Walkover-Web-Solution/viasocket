'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Label, Lead } from '../Heading';
import { BrandIcon } from '../BrandIcon';
import { useReveal, revealClass } from '../useReveal';
import { APPS, CATEGORY_ORDER } from './apps-data';

const PER_PAGE = 24;

export default function AppsDirectory() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [ref, visible] = useReveal();

    const counts = useMemo(() => {
        const c = { All: APPS.length };
        CATEGORY_ORDER.slice(1).forEach((cat) => {
            c[cat] = APPS.filter((a) => a.category === cat).length;
        });
        return c;
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return APPS.filter((a) => {
            const inCategory = category === 'All' || a.category === category;
            const inQuery = !q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
            return inCategory && inQuery;
        });
    }, [query, category]);

    const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const safePage = Math.min(page, pages);
    const visibleApps = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

    function selectCategory(cat) {
        setCategory(cat);
        setPage(1);
    }

    function onQueryChange(e) {
        setQuery(e.target.value);
        setPage(1);
    }

    return (
        <>
            <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(24px,4vw,40px)] grid gap-[clamp(20px,3vw,36px)] justify-items-center text-center">
                <span className="inline-flex items-center gap-2 text-dev-accent bg-dev-accent-soft border border-dev-accent/25 rounded-full px-3.5 py-1.5 font-medium">
                    <i className="w-1.5 h-1.5 rounded-full bg-dev-accent inline-block" />
                    Action layer · app directory
                </span>
                <h1 className="font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(38px,5.6vw,72px)] mx-auto max-w-[18ch]">
                    AI actions for the apps you already use
                </h1>
                <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 mx-auto max-w-[46ch]">
                    Give your AI agents access to actions across thousands of apps.
                </p>
                <label className="flex items-center gap-3 w-full max-w-[560px] border border-dev-line-2 bg-dev-surface rounded-full px-[18px] py-3 shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)]">
                    <Search size={18} className="text-dev-ink-3 shrink-0" strokeWidth={2} />
                    <input
                        type="search"
                        placeholder="Search app to add to your product"
                        aria-label="Search apps"
                        value={query}
                        onChange={onQueryChange}
                        className="border-0 outline-0 bg-transparent font-[inherit] text-[16px] text-dev-ink w-full placeholder:text-dev-ink-3"
                    />
                </label>
            </section>

            <section ref={ref} className={`max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(56px,8vw,112px)] ${revealClass(visible)}`}>
                <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-[clamp(24px,4vw,48px)] items-start">
                    <aside className="lg:sticky lg:top-[84px] grid gap-3.5">
                        <Label>Categories</Label>
                        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
                            {CATEGORY_ORDER.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    aria-pressed={category === cat}
                                    onClick={() => selectCategory(cat)}
                                    className={`flex items-center justify-between gap-2.5 text-[14.5px] cursor-pointer transition-colors rounded-full border border-dev-line px-3.5 py-2 lg:rounded-[10px] lg:border-0 lg:px-3 lg:py-[9px] ${
                                        category === cat ? 'bg-dev-ink text-dev-ink-inv' : 'bg-dev-surface lg:bg-transparent text-dev-ink-2 hover:bg-dev-surface-2 hover:text-dev-ink'
                                    }`}
                                >
                                    {cat}
                                    <span className={`hidden lg:inline font-dev-mono text-[11px] ${category === cat ? 'text-dev-ink-inv/70' : 'text-dev-ink-3'}`}>{counts[cat]}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div className="grid gap-4">
                        <div className="min-h-[18px] flex items-center justify-between">
                            <span className="font-dev-mono text-[11.5px] tracking-[0.1em] uppercase text-dev-ink-3">
                                {filtered.length ? `Showing ${(safePage - 1) * PER_PAGE + 1}–${Math.min(safePage * PER_PAGE, filtered.length)} of ${filtered.length}${category === 'All' ? ' apps' : ` ${category} apps`}` : ''}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {visibleApps.map((app) => (
                                <Link
                                    key={app.slug}
                                    href={`/developers/apps/${app.slug}`}
                                    className="flex items-center gap-3.5 p-5 rounded-2xl border border-dev-line bg-dev-surface no-underline text-dev-ink transition-all hover:-translate-y-0.5 hover:border-dev-line-2 hover:shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)]"
                                >
                                    <span className="w-11 h-11 rounded-xl bg-dev-surface-2 grid place-items-center shrink-0">
                                        <BrandIcon name={app.name} size={22} />
                                    </span>
                                    <b className="text-[16.5px] font-semibold tracking-[-0.01em]">{app.name}</b>
                                </Link>
                            ))}
                        </div>

                        {!filtered.length && (
                            <p className="text-dev-ink-3 text-[15px]">
                                No apps match that search. viaSocket supports 2,300+ apps, so it is very likely covered.{' '}
                                <Link href="/developers#start" className="text-dev-accent font-medium">Ask us</Link>.
                            </p>
                        )}

                        {pages > 1 && (
                            <nav aria-label="Pagination" className="flex flex-wrap gap-1.5 items-center justify-center mt-2">
                                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        aria-current={p === safePage ? 'page' : undefined}
                                        onClick={() => setPage(p)}
                                        className={`min-w-[38px] h-[38px] px-3 rounded-[10px] border text-[14px] cursor-pointer ${
                                            p === safePage ? 'bg-dev-ink text-dev-ink-inv border-dev-ink' : 'bg-dev-surface text-dev-ink-2 border-dev-line'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </nav>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
