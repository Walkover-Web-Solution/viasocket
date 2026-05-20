'use client';

import { useEffect, useRef, useState } from 'react';
import { initialCount, rotationInterval } from './constants';

/**
 * Maintains an array of `initialCount` indices into a list of `total` items,
 * cycling one slot at a time every `rotationInterval` ms.
 * Pauses when `paused` is true or when `total <= initialCount`.
 */
export default function useRotatingSlots(total, paused) {
    const [slots, setSlots] = useState(() => Array.from({ length: initialCount }, (_, i) => i));
    const tickRef = useRef(0);

    useEffect(() => {
        if (!total) return;
        setSlots(Array.from({ length: initialCount }, (_, i) => i % total));
        tickRef.current = initialCount;
    }, [total]);

    useEffect(() => {
        if (paused || total <= initialCount) return undefined;
        const interval = setInterval(() => {
            const tick = tickRef.current;
            const slot = tick % initialCount;
            const nextIdx = tick % total;
            setSlots((prev) => {
                if (prev[slot] === nextIdx) return prev;
                const updated = prev.slice();
                updated[slot] = nextIdx;
                return updated;
            });
            tickRef.current = tick + 1;
        }, rotationInterval);
        return () => clearInterval(interval);
    }, [paused, total]);

    return slots;
}
