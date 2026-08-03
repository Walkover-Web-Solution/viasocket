'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCardPricing from './testimonials/ReviewCardPricing';

const hasReviewContent = (item) =>
    !!item &&
    (!!item.user_name?.trim() || !!item.subtitle?.trim() || !!item.description?.trim());

export default function TestimonialsPricingCarousel({ reviewData, matchesFilter }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const allFilteredReviews = useMemo(
        () => (reviewData || []).filter((item) => hasReviewContent(item) && matchesFilter(item)),
        [reviewData, matchesFilter]
    );

    const total = allFilteredReviews.length;

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [total]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, [total]);

    useEffect(() => {
        if (total > 0 && currentIndex >= total) {
            setCurrentIndex(0);
        }
    }, [total]); // eslint-disable-line react-hooks/exhaustive-deps

    if (total === 0) return null;

    const getPrevIndex = (idx) => (idx === 0 ? total - 1 : idx - 1);
    const getNextIndex = (idx) => (idx === total - 1 ? 0 : idx + 1);

    const prevIndex = getPrevIndex(currentIndex);
    const nextIndex = getNextIndex(currentIndex);

    return (
        <div className="relative">
            {/* Desktop: 3 visible cards */}
            <div className="hidden md:flex items-center justify-center gap-4 relative">
                {/* Left Arrow */}
                <button
                    onClick={goToPrev}
                    className="absolute left-0 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow -ml-5"
                    aria-label="Previous review"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                {/* Left Card (dimmed) */}
                <div className="w-[30%] opacity-50 scale-90 transition-all duration-300 select-none pointer-events-none">
                    <ReviewCardPricing item={allFilteredReviews[prevIndex]} />
                </div>

                {/* Center Card (active) */}
                <div className="w-[40%] z-10 scale-100 transition-all duration-300 shadow-xl rounded-2xl">
                    <ReviewCardPricing item={allFilteredReviews[currentIndex]} />
                </div>

                {/* Right Card (dimmed) */}
                <div className="w-[30%] opacity-50 scale-90 transition-all duration-300 select-none pointer-events-none">
                    <ReviewCardPricing item={allFilteredReviews[nextIndex]} />
                </div>

                {/* Right Arrow */}
                <button
                    onClick={goToNext}
                    className="absolute right-0 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow -mr-5"
                    aria-label="Next review"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Mobile: 1 card with arrows */}
            <div className="md:hidden flex items-center gap-2 relative">
                <button
                    onClick={goToPrev}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
                    aria-label="Previous review"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex-1 min-w-0">
                    <ReviewCardPricing item={allFilteredReviews[currentIndex]} />
                </div>

                <button
                    onClick={goToNext}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
                    aria-label="Next review"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {allFilteredReviews.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? 'bg-red-800 w-5' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to review ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
