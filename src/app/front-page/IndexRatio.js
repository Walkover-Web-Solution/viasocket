'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTimeline, on, onAll } from './story';

const RATIO = {
    heading: 'It keeps working.',
    // The number in the middle is NIGHT_TOTAL, not retyped, so
    // the two cannot drift apart. Split around it so the component can set
    // it in <b>.
    subheadBefore: 'Overnight it filed, confirmed, packed, replied and routed. ',
    subheadAfter: ' things done before anyone was awake.',
    // The night log. Five rows, in order, time then what, and they sum to
    // ratioTotal. No control on the panel: the card's whole argument is
    // that nobody has to touch anything overnight.
    night: {
        from: '00:00',
        to: '09:00',
        done: 'done',
        rows: [
            { time: '02:14', what: 'Filed 12 invoices' },
            { time: '03:40', what: 'Confirmed 9 bookings' },
            { time: '05:12', what: 'Packed 14 orders' },
            { time: '06:30', what: 'Replied to 12 customers' },
            { time: '07:05', what: 'Routed 8 support requests' },
        ],
    },
};

/**
 * PLACEHOLDER, and the one open item on this page: the total is an invented
 * figure rendered as fact. It needs a real number or a sentence that does not
 * need one before this ships.
 *
 * The five rows of the night log sum to it (12 + 9 + 14 + 12 + 8), and the
 * bento's night card in IndexFills states the same number for the same night.
 * All three move together.
 */
const NIGHT_TOTAL = '55';

/**
 * The ratio card. Not a section, an element: it stands on its own and carries
 * the claim as its heading, with the night log as the proof of it.
 *
 * A small panel holds five rows of the night itself, time then what. A moon
 * marks the panel's start, a sun its end. The rows reveal once, top to bottom,
 * as the card comes into view.
 *
 * No marks on the rows and no exception row. A tick beside every line makes a
 * section read as a checklist, and this one is only about it keeping working
 * whether you are there or not, so the row that needed a person does not belong
 * in it.
 */
export default function IndexRatio() {
    const ref = useRef(null);
    const nightRef = useRef(null);
    const [shown, setShown] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShown(true);
            setReduced(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setShown(true);
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // The rows fade in top to bottom, once, when the card is first seen.
    const reset = useCallback((stage) => onAll(stage, '.night-row', false), []);
    const finish = useCallback((stage) => onAll(stage, '.night-row', true), []);
    const steps = useCallback((stage) => {
        const rows = Array.from(stage.querySelectorAll('.night-row'));
        return rows.map((row, i) => [i * 0.26, () => on(row)]);
    }, []);

    const total = RATIO.night.rows.length * 0.26 + 0.3;
    useTimeline({ live: shown && !reduced, runId: 0, stageRef: nightRef, reset, finish, steps, total });

    return (
        <section className="bg-index-paper px-5 pb-16 pt-12 font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:pb-24 min-[900px]:pt-16">
            <div
                className="relative rounded-[22px] bg-[#eff1ea] px-[22px] pb-[26px] pt-7 min-[900px]:px-12 min-[900px]:py-11"
                ref={ref}
                data-shown={shown ? 'true' : 'false'}
            >
                <div className="mx-auto max-w-[760px] text-center">
                    <h2 className="mx-auto max-w-none font-index-display text-[clamp(40px,4.6vw,64px)] font-normal leading-[1.04] tracking-[-0.03em] text-index-ink min-[900px]:max-w-[26ch]">
                        {RATIO.heading}
                    </h2>
                    <p className="mx-auto mt-5 max-w-none text-[18px] leading-[1.55] text-index-muted min-[900px]:max-w-[56ch]">
                        {RATIO.subheadBefore}
                        <b className="font-semibold text-index-ink">{NIGHT_TOTAL}</b>
                        {RATIO.subheadAfter}
                    </p>

                    {/* A small paper panel with a row per fact and no control on
                        it: the card's whole argument is that nobody has to touch
                        anything overnight. */}
                    <div
                        className="mx-auto mt-8 max-w-[520px] rounded-[16px] border border-index-line bg-index-paper px-4 py-[18px] text-left min-[900px]:px-[22px] min-[900px]:py-5"
                        ref={nightRef}
                    >
                        <div className="mb-[14px] flex items-center justify-between text-[13px] tabular-nums text-index-muted">
                            <span className="inline-flex items-center gap-[5px]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="currentColor" />
                                </svg>
                                {RATIO.night.from}
                            </span>
                            <span className="inline-flex items-center gap-[5px]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <line x1="12" y1="1" x2="12" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="23" />
                                        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
                                        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
                                        <line x1="1" y1="12" x2="3" y2="12" />
                                        <line x1="21" y1="12" x2="23" y2="12" />
                                        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
                                        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
                                    </g>
                                </svg>
                                {RATIO.night.to}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            {RATIO.night.rows.map((row) => (
                                <div
                                    key={row.time + row.what}
                                    /* The time leads the row and the fact
                                       follows it. With the tick gone the row
                                       needs something on the left to line up
                                       on, and the clock is what makes it a log
                                       rather than a list of claims.

                                       `night-row` carries no styles: it is the
                                       handle the reveal timeline uses. */
                                    className="night-row flex translate-y-[6px] items-baseline gap-[14px] border-t border-index-line py-[9px] text-base text-index-ink opacity-0 transition-[opacity,transform] duration-300 ease-out first:border-t-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none"
                                    data-on="false"
                                >
                                    <span className="min-w-[46px] flex-none text-[14px] tabular-nums text-index-muted">
                                        {row.time}
                                    </span>
                                    <span className="flex-1">{row.what}</span>
                                    {/* The same pill the showcase steps close
                                        with, so completion looks like one thing
                                        across the page rather than two. */}
                                    <span className="flex-none rounded-full bg-[#e4f1e9] px-[9px] py-[3px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[#3f7a5c]">
                                        {RATIO.night.done}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
