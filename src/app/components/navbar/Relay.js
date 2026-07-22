'use client';

import { useState, useEffect } from 'react';

function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

export default function Relay() {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const deadline = new Date('2026-09-14T00:00:00').getTime();

        const update = () => {
            const now = Date.now();
            const diff = Math.max(0, deadline - now);
            setTimeLeft(diff);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`hidden lg:flex w-full bg-accent text-white backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] !h-[30px] items-center justify-center gap-2 !text-sm`}
        >
            <span className="tracking-[0.06em]">
                Relay.app deletes all data on Sep 14.
                <span className="font-semibold tabular-nums bg-[#991B1B] border border-[#991B1B] px-2 py-0.5 rounded text-white text-xs">
                    {formatTime(timeLeft)}
                </span>{' '}
                Relay users get 1 year of viaSocket free.
            </span>
        </div>
    );
}
