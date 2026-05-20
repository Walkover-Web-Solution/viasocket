'use client';

import { memo, useEffect, useRef, useState } from 'react';
import CardContent from './CardContent';
import { fadeTransition } from './constants';

const getItemKey = (item) => item?.id ?? item?.link ?? item?.name ?? '';

const FadeLayer = memo(function FadeLayer({ item, visible }) {
    return (
        <div
            className="absolute inset-0"
            style={{
                opacity: visible ? 1 : 0,
                transition: fadeTransition,
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            {item && <CardContent item={item} />}
        </div>
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
            <FadeLayer item={layerA} visible={activeIsA} />
            <FadeLayer item={layerB} visible={!activeIsA} />
        </div>
    );
});

export default ReviewCard;
