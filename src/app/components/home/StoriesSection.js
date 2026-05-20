'use client';

import { useCallback, useMemo, useState } from 'react';
import StoryCard from './stories/StoryCard';
import StoriesPagination from './stories/StoriesPagination';

const pageSize = 3;

const chunkIntoPages = (items, size = pageSize) => {
    const out = [];
    for (let i = 0; i + size <= items.length; i += size) out.push(items.slice(i, i + size));
    return out;
};

export default function StoriesSection({ stories = [] }) {
    const [page, setPage] = useState(0);

    const pages = useMemo(() => chunkIntoPages(stories), [stories]);

    const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
    const goNext = useCallback(
        () => setPage((p) => Math.min(pages.length - 1, p + 1)),
        [pages.length]
    );

    if (pages.length === 0) return null;

    const currentPage = Math.min(page, pages.length - 1);
    const [featured, sup1, sup2] = pages[currentPage];

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

                <StoriesPagination
                    totalPages={pages.length}
                    currentPage={currentPage}
                    onPrev={goPrev}
                    onNext={goNext}
                    onSelect={setPage}
                />
            </div>
        </section>
    );
}
