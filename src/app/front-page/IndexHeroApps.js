'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Reads as a caption on the row of marks, not as a free-standing statistic.
const CAPTION_LEAD = 'Works with';
const APPS_FALLBACK = '2,300+ apps';

const SWAP_MS = 2400;
const FADE_MS = 420;
const ROW_SIZE = 6;

export default function IndexHeroApps({ apps = [], appCount }) {
    const pool = apps.filter((app) => app?.iconurl);
    const [row, setRow] = useState(() => pool.slice(0, ROW_SIZE));
    const [swapping, setSwapping] = useState(-1);
    const rowRef = useRef(row);
    rowRef.current = row;
    const lastRef = useRef(-1);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        if (rowRef.current.length < 2 || pool.length <= ROW_SIZE) return undefined;

        const tick = () => {
            let at = Math.floor(Math.random() * rowRef.current.length);
            if (at === lastRef.current) at = (at + 1) % rowRef.current.length;
            lastRef.current = at;

            const shown = new Set(rowRef.current.map((app) => app.name));
            const spare = pool.filter((app) => !shown.has(app.name));
            if (!spare.length) return;

            const next = spare[Math.floor(Math.random() * spare.length)];
            setSwapping(at);

            window.setTimeout(() => {
                setRow((prev) => prev.map((app, i) => (i === at ? next : app)));
                setSwapping(-1);
            }, FADE_MS);
        };

        const timer = window.setInterval(tick, SWAP_MS);
        return () => window.clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!row.length) return null;

    return (
        <div className="mx-auto mt-4 flex items-center justify-center gap-[9px] min-[721px]:mt-5 min-[721px]:gap-[11px]">
            <span className="inline-flex items-center pl-[5px]" aria-hidden="true">
                {row.map((app, i) => (
                    <span
                        key={`${app.iconurl}-${i}`}
                        className="-ml-[9px] grid h-[27px] w-[27px] place-items-center rounded-full border border-[#dfe3da] bg-index-paper shadow-[0_1px_2px_rgb(31_39_33/5%)] transition-[transform,opacity] duration-[420ms] ease-out hover:z-[9] hover:-translate-y-[3px] data-[swap=true]:scale-[0.82] data-[swap=true]:opacity-0 motion-reduce:transition-none motion-reduce:data-[swap=true]:scale-100 motion-reduce:data-[swap=true]:opacity-100 min-[721px]:-ml-[10px] min-[721px]:h-[30px] min-[721px]:w-[30px]"
                        data-swap={swapping === i ? 'true' : 'false'}
                        style={{ zIndex: row.length - i }}
                    >
                        <Image
                            src={app.iconurl}
                            alt=""
                            title={app.name}
                            width={20}
                            height={20}
                            loading="lazy"
                            className="h-[15px] w-[15px] object-contain opacity-90 transition-opacity hover:opacity-100 min-[721px]:h-[17px] min-[721px]:w-[17px]"
                        />
                    </span>
                ))}
            </span>

            <Link
                href="/integrations"
                target="_blank"
                className="m-0 font-index-sans text-xs tracking-[0.01em] text-index-muted underline underline-offset-2 transition-colors hover:text-[#2f3932] min-[721px]:text-[13px]"
            >
                {CAPTION_LEAD}{' '}
                <b className="font-medium text-[#5a665c]">{appCount ? `${appCount + 300}+ apps` : APPS_FALLBACK}</b>
            </Link>
        </div>
    );
}
