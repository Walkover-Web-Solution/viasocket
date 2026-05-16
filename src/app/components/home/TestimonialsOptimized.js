'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronUp } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const INITIAL_COUNT = 6;
const ROTATION_INTERVAL = 5000;
const FADE_DURATION = 1200;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const FADE_TRANSITION = `opacity ${FADE_DURATION}ms ${EASING}`;

const hasReviewContent = (item) =>
    !!item &&
    (!!item.user_name?.trim() || !!item.subtitle?.trim() || !!item.description?.trim());

const getItemKey = (item) => item?.id ?? item?.link ?? item?.name ?? '';

const CardContent = memo(function CardContent({ item }) {
    const profile = item?.user_profile?.[0]?.trim();
    const logo = item?.platform_logo?.[0]?.trim();

    return (
        <Link href={item?.link || '#'} target="_blank" className="block h-full">
            <div className="bg-white md:p-12 p-6 flex flex-col gap-4 border custom-border h-[320px] group hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        {profile ? (
                            <Image
                                src={profile}
                                alt={item?.user_name}
                                width={100}
                                height={100}
                                className="w-12 h-12 rounded-full flex-shrink-0"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl flex-shrink-0">
                                {item?.user_name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="truncate">{item?.user_name}</p>
                            <p className="text-sm text-gray-600 truncate">{item?.subtitle}</p>
                        </div>
                    </div>
                    {logo && (
                        <div className="flex-shrink-0">
                            <Image src={logo} alt={item?.name} width={100} height={100} className="w-auto h-6" />
                        </div>
                    )}
                </div>
                <div className="line-clamp-5 flex-1">
                    <p>{item?.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto gap-2">
                    <p className="text-xs text-gray-400">{item?.date}</p>
                    <button className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 whitespace-nowrap">
                        Read more <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </Link>
    );
});

const ReviewCard = memo(function ReviewCard({ item }) {
    const [layerA, setLayerA] = useState(item);
    const [layerB, setLayerB] = useState(null);
    const [activeIsA, setActiveIsA] = useState(true);
    const prevKeyRef = useRef(getItemKey(item));

    useEffect(() => {
        const nextKey = getItemKey(item);
        if (nextKey === prevKeyRef.current) return undefined;
        prevKeyRef.current = nextKey;

        if (activeIsA) setLayerB(item);
        else setLayerA(item);

        const raf1 = requestAnimationFrame(() => {
            const raf2 = requestAnimationFrame(() => setActiveIsA((prev) => !prev));
            return () => cancelAnimationFrame(raf2);
        });

        return () => cancelAnimationFrame(raf1);
    }, [item, activeIsA]);

    return (
        <div className="relative h-[320px]" style={{ willChange: 'opacity' }}>
            <div
                className="absolute inset-0"
                style={{
                    opacity: activeIsA ? 1 : 0,
                    transition: FADE_TRANSITION,
                    pointerEvents: activeIsA ? 'auto' : 'none',
                }}
            >
                {layerA && <CardContent item={layerA} />}
            </div>
            <div
                className="absolute inset-0"
                style={{
                    opacity: activeIsA ? 0 : 1,
                    transition: FADE_TRANSITION,
                    pointerEvents: activeIsA ? 'none' : 'auto',
                }}
            >
                {layerB && <CardContent item={layerB} />}
            </div>
        </div>
    );
});

export default function TestimonialsOptimized({ reviewData, matchesFilter }) {
    const [showAll, setShowAll] = useState(false);

    const allFilteredReviews = useMemo(
        () => (reviewData || []).filter((item) => hasReviewContent(item) && matchesFilter(item)),
        [reviewData, matchesFilter]
    );

    const totalReviews = allFilteredReviews.length;
    const hasMore = totalReviews > INITIAL_COUNT;

    const [slots, setSlots] = useState(() => Array.from({ length: INITIAL_COUNT }, (_, i) => i));
    const tickRef = useRef(0);

    useEffect(() => {
        if (!totalReviews) return;
        setSlots(Array.from({ length: INITIAL_COUNT }, (_, i) => i % totalReviews));
        tickRef.current = INITIAL_COUNT;
    }, [totalReviews]);

    useEffect(() => {
        if (showAll || !hasMore) return undefined;
        const interval = setInterval(() => {
            const tick = tickRef.current;
            const slot = tick % INITIAL_COUNT;
            const nextIdx = tick % totalReviews;
            setSlots((prev) => {
                if (prev[slot] === nextIdx) return prev;
                const updated = prev.slice();
                updated[slot] = nextIdx;
                return updated;
            });
            tickRef.current = tick + 1;
        }, ROTATION_INTERVAL);
        return () => clearInterval(interval);
    }, [showAll, hasMore, totalReviews]);

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
            {hasMore && (
                <div className="flex justify-end mb-8">
                    <button onClick={toggleShowAll} className="btn btn-outline">
                        {showAll ? (
                            <>
                                Show less <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                See all reviews <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </>
    );
}
