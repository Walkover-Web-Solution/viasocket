'use client';

import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCardPricing from './testimonials/ReviewCardPricing';

const hasReviewContent = (item) =>
    !!item &&
    (!!item.user_name?.trim() || !!item.subtitle?.trim() || !!item.description?.trim());

export default function TestimonialsPricingCarousel({ reviewData, matchesFilter }) {
    const scrollRef = useRef(null);

    const allFilteredReviews = useMemo(
        () => (reviewData || []).filter((item) => hasReviewContent(item) && matchesFilter(item)),
        [reviewData, matchesFilter]
    );

    const total = allFilteredReviews.length;
    const [currentIndex, setCurrentIndex] = useState(() =>
        total > 0 ? Math.floor(total / 2) : 0
    );

    const scrollToIndex = useCallback(
        (idx, behavior = 'smooth') => {
            const el = scrollRef.current;
            if (!el || idx < 0 || idx >= total) return;
            const card = el.children[idx];
            if (card) {
                card.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
            }
            setCurrentIndex(idx);
        },
        [total]
    );

    const goToPrev = useCallback(() => {
        scrollToIndex(currentIndex === 0 ? total - 1 : currentIndex - 1);
    }, [currentIndex, total, scrollToIndex]);

    const goToNext = useCallback(() => {
        scrollToIndex(currentIndex === total - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, total, scrollToIndex]);

    useEffect(() => {
        if (total > 0) {
            const middleIdx = Math.floor(total / 2);
            setCurrentIndex(middleIdx);
            const timer = setTimeout(() => {
                scrollToIndex(middleIdx, 'auto');
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [allFilteredReviews, scrollToIndex, total]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || total === 0) return;

        const handleScroll = () => {
            const cards = Array.from(el.children);
            const center = el.scrollLeft + el.clientWidth / 2;
            let closestIdx = 0;
            let closestDist = Infinity;

            cards.forEach((card, idx) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const dist = Math.abs(center - cardCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = idx;
                }
            });

            setCurrentIndex(closestIdx);
        };

        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [total]);

    if (total === 0) return null;

    return (
        <div className="relative">
            <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-sm hover:shadow-md transition-shadow -ml-5"
                aria-label="Previous review"
            >
                <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-12 md:px-16 py-2"
            >
                {allFilteredReviews.map((item, idx) => (
                    <div
                        key={idx}
                        className={`snap-center shrink-0 origin-center w-[calc(100%-3rem)] md:w-[40%] transition-all duration-300 ${
                            idx === currentIndex
                                ? 'opacity-100 scale-100 z-10 shadow-xl rounded-2xl'
                                : 'opacity-40 scale-[0.85] select-none pointer-events-none'
                        }`}
                    >
                        <ReviewCardPricing item={item} />
                    </div>
                ))}
            </div>

            <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-sm hover:shadow-md transition-shadow -mr-5"
                aria-label="Next review"
            >
                <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
                {allFilteredReviews.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-800 w-5' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to review ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
