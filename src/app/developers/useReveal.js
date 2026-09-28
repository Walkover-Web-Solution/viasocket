'use client';

import { useEffect, useRef, useState } from 'react';

// Matches this codebase's existing IntersectionObserver + useState pattern
// (see src/app/front-page/IndexClose.js) rather than the 'motion' package,
// which this repo barely uses. Plays once, then disconnects.
export function useReveal(threshold = 0.2) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(node);
                    }
                });
            },
            { threshold },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

export const revealClass = (visible) =>
    `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-[0.55] translate-y-[10px]'}`;
