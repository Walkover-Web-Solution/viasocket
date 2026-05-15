'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CLIENT_STORIES_API = 'https://api.docstar.io/p/getSideBarData?collectionId=EVBBQjKlmMxW';
const MAX_STORIES = 6;
const PAGE_SIZE = 3;
const TARGET_SLUG = 'client-story';
const BLOG_BASE_URL = 'https://viasocket.com/blog';

const NAV_BTN_CLASS =
    'w-9 h-9 flex items-center justify-center border custom-border rounded-full transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed';

const slugify = (value) =>
    (value || '').toString().trim().toLowerCase().replace(/\s+/g, '-');

const formatTag = (tag) =>
    (tag || TARGET_SLUG)
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

const isClientStory = (page) => {
    const meta = page?.meta;
    if (!meta) return false;
    if (slugify(meta.category) === TARGET_SLUG) return true;
    return Array.isArray(meta.tags) && meta.tags.some((t) => slugify(t) === TARGET_SLUG);
};

const pageToStory = (page, index) => {
    const meta = page?.meta || {};
    const rawTag = meta.category || meta.tags?.[0] || TARGET_SLUG;
    return {
        id: page?.id ?? index,
        tag: formatTag(slugify(rawTag)),
        headline: meta.ai_title || meta.title || page?.publishedPage?.name || page?.name || '',
        teaser: meta.ai_description || meta.description || '',
        image: meta.featureImage?.url || null,
        link: page?.urlName ? `${BLOG_BASE_URL}/${page.urlName}` : '#',
    };
};

const chunkIntoPages = (items, size = PAGE_SIZE) => {
    const out = [];
    for (let i = 0; i + size <= items.length; i += size) out.push(items.slice(i, i + size));
    return out;
};

const StoryCard = memo(function StoryCard({ story, featured = false }) {
    const { tag, headline, teaser, link, image } = story;
    const imageHeight = featured ? 240 : 140;
    const imageSizes = featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw';
    return (
        <Link
            href={link}
            className={`group flex flex-col bg-white border custom-border overflow-hidden no-underline transition-shadow duration-300 ${
                featured ? 'hover:shadow-lg w-full md:w-[58%] md:flex-shrink-0' : 'hover:shadow-md flex-1'
            }`}
        >
            <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ height: imageHeight }}
            >
                {image && (
                    <Image
                        src={image}
                        alt={headline}
                        fill
                        sizes={imageSizes}
                        className="object-cover block"
                    />
                )}
                <div
                    className={`absolute bottom-0 left-0 right-0 pointer-events-none ${featured ? 'h-16' : 'h-12'}`}
                    style={{
                        background: `linear-gradient(to top, rgba(0,0,0,${featured ? 0.55 : 0.5}), transparent)`,
                    }}
                />
                <span
                    className={`absolute z-10 font-semibold uppercase tracking-widest ${
                        featured ? 'bottom-5 left-6 text-[11px]' : 'bottom-3 left-4 text-[9px]'
                    }`}
                    style={{ color: 'rgba(255,255,255,0.90)' }}
                >
                    {tag}
                </span>
            </div>

            <div className={`flex flex-col flex-1 min-w-0 ${featured ? 'p-8' : 'p-4'}`}>
                <h3
                    className={`font-semibold leading-snug ${featured ? 'text-[22px] mb-3' : 'text-[14px] mb-2'}`}
                    style={
                        featured
                            ? { color: 'rgba(0,0,0,0.85)' }
                            : {
                                  color: 'rgba(0,0,0,0.85)',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                              }
                    }
                >
                    {headline}
                </h3>
                {featured && teaser && (
                    <p className="text-[14px] leading-[1.75] mb-6" style={{ color: 'rgba(0,0,0,0.50)' }}>
                        {teaser}
                    </p>
                )}
                <div className="mt-auto">
                    <span
                        className={`font-semibold flex items-center gap-1 ${featured ? 'text-[14px]' : 'text-[12px]'}`}
                        style={{ color: 'var(--accent, #8B1A1A)' }}
                    >
                        Read the full story
                        <ChevronRight
                            size={featured ? 16 : 14}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
});

export default function StoriesSection() {
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const res = await fetch(CLIENT_STORIES_API, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const filtered = Object.values(json?.pages || {})
                    .filter((p) => p?.isPublished && isClientStory(p))
                    .slice(0, MAX_STORIES)
                    .map(pageToStory)
                    .reverse();
                setStories(filtered);
            } catch (err) {
                if (err.name !== 'AbortError') console.error('Failed to load client stories:', err);
            }
        })();
        return () => controller.abort();
    }, []);

    const pages = useMemo(() => chunkIntoPages(stories), [stories]);

    if (pages.length === 0) return null;

    const currentPage = Math.min(page, pages.length - 1);
    const [featured, sup1, sup2] = pages[currentPage];
    const isFirst = currentPage === 0;
    const isLast = currentPage === pages.length - 1;

    const goPrev = () => setPage((p) => Math.max(0, p - 1));
    const goNext = () => setPage((p) => Math.min(pages.length - 1, p + 1));

    return (
        <section className="py-16">
            <div className="container">
                <div className="mb-10">
                    <h2 className="h2">
                        Client Stories from the <span className="gray-heading">viaSocket Community</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <StoryCard story={featured} featured />
                    <div className="flex flex-col gap-5 w-full md:flex-1">
                        <StoryCard story={sup1} />
                        <StoryCard story={sup2} />
                    </div>
                </div>

                {pages.length > 1 && (
                    <div className="flex justify-end items-center gap-3 mt-6">
                        <button
                            onClick={goPrev}
                            disabled={isFirst}
                            aria-label="Previous stories"
                            className={NAV_BTN_CLASS}
                        >
                            <ChevronLeft size={14} />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {pages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    aria-label={`Page ${i + 1}`}
                                    className="rounded-full transition-all duration-300"
                                    style={{
                                        height: 6,
                                        width: currentPage === i ? 20 : 6,
                                        background: currentPage === i ? 'var(--accent, #8B1A1A)' : 'rgba(0,0,0,0.15)',
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goNext}
                            disabled={isLast}
                            aria-label="Next stories"
                            className={NAV_BTN_CLASS}
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
