'use client';

import { useCallback, useMemo, useState } from 'react';
import ReviewCard from './testimonials/ReviewCard';
import ShowMoreButton from './testimonials/ShowMoreButton';
import useRotatingSlots from './testimonials/useRotatingSlots';
import { initialCount } from './testimonials/constants';

const hasReviewContent = (item) =>
    !!item &&
    (!!item.user_name?.trim() || !!item.subtitle?.trim() || !!item.description?.trim());

const getItemKey = (item) => item?.id ?? item?.link ?? item?.name ?? '';

export default function TestimonialsOptimized({ reviewData, matchesFilter }) {
    const [showAll, setShowAll] = useState(false);

    const allFilteredReviews = useMemo(
        () => (reviewData || []).filter((item) => hasReviewContent(item) && matchesFilter(item)),
        [reviewData, matchesFilter]
    );

    const totalReviews = allFilteredReviews.length;
    const hasMore = totalReviews > initialCount;

    const slots = useRotatingSlots(totalReviews, showAll || !hasMore);

    const visibleReviews = useMemo(() => {
        if (showAll) return allFilteredReviews;
        return slots.map((idx) => allFilteredReviews[idx]).filter(Boolean);
    }, [showAll, slots, allFilteredReviews]);

    const toggleShowAll = useCallback(() => setShowAll((prev) => !prev), []);

    return (
        <>
            <div className="mb-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {visibleReviews.map((item, index) => (
                    <ReviewCard
                        key={showAll ? `all-${getItemKey(item)}-${index}` : `slot-${index}`}
                        item={item}
                    />
                ))}
            </div>
            {hasMore && <ShowMoreButton showAll={showAll} onToggle={toggleShowAll} />}
        </>
    );
}
