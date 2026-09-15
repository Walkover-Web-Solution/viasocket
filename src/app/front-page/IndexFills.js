'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTimeline, on, onAll } from './story';
import IndexCardMark from './IndexCardMark';

const FILLS =
    /**
     * The bento grid. Each card is a heading that names its thing and says what
     * happens, the ask under it, and a visual that shows exactly that thing.
     * One reveal when the grid is first seen, then rest. Nothing loops, nothing
     * narrates.
     */
    {
        heading: 'viaSocket does more.',
        subhead:
            'Multi-step jobs that run on their own, research it does for you, a human in the loop when the call is yours, and the context it already has.',
        routine: {
            hook: 'Routine jobs run on their own.',
            ask: 'When a booking comes in, set the customer up and tell the team.',
            close: 'Stop doing the little steps.',
            done: 'done',
            rows: [
                { trigger: 'New booking', happened: 'customer set up, team told' },
                { trigger: 'Payment in', happened: 'invoice marked paid' },
                { trigger: 'Monday 9am', happened: 'week\u2019s numbers sent' },
            ],
        },
        research: {
            hook: 'It researches, then writes the brief.',
            ask: 'Research every new supplier before I place a large order.',
            close: 'You read the brief, not the sources.',
            // Six places it looked, scattered, each joined to the ones already
            // found by a thread, so the stage fills in like something being
            // worked through rather than a list ticking. `at` is a percentage
            // coordinate within the cloud.
            found: [
                { what: 'Website', at: [20, 14] },
                { what: 'What they sell', at: [64, 9] },
                { what: 'Recent news', at: [12, 50] },
                { what: 'Delivery area', at: [84, 46] },
                { what: 'Relevant people', at: [26, 88] },
                { what: 'Previous orders', at: [70, 86] },
            ],
            links: [
                [0, 1],
                [0, 2],
                [1, 3],
                [2, 4],
                [3, 5],
                [4, 5],
                [2, 3],
                [1, 2],
                [0, 5],
            ],
            brief: {
                kicker: 'Supplier brief',
                title: 'Meera Textiles, Surat',
                line: 'Six sources read. Ready for you.',
            },
        },
        memory: {
            hook: 'It remembers what you approved.',
            ask: 'Find 20 more companies like the ones I approved last week.',
            close: 'Don\u2019t explain everything again.',
            recalled: [
                { from: 'Last week', what: 'the 8 companies you approved' },
                { from: 'Your standards', what: 'size, region, what they make' },
                { from: 'Your CRM', what: 'who you already spoke to' },
            ],
            result: '20 more found.',
        },
        night: {
            hook: 'It asks you when it matters.',
            ask: 'Anything over \u20b925,000, ask me first.',
            close: 'You only hear about the ones that matter.',
            // A small chat: viaSocket reports the work it did under the limit,
            // then stops on the one thing over it and asks, in the shape an
            // assistant asks for permission. Just the controls and a line
            // saying it is waiting — a bordered panel of numbered rows made the
            // permission step the largest object in the bento.
            chat: {
                done: 'done this morning, all under your limit.',
                question: 'Invoice 3312 is \u20b929,200 to Harbour Ltd, \u20b94,200 over the purchase order. Pay it?',
                options: ['Yes, pay it', 'Hold it, I\u2019ll check'],
                waiting: 'Waiting for you',
            },
        },
    };

/**
 * PLACEHOLDER. An invented figure rendered as fact, and the one open item on
 * this page: it needs a real number or a sentence that does not need one.
 *
 * IndexRatio's night log states the same number for the same night and its five
 * rows sum to it. The two move together or they contradict each other.
 */
const NIGHT_TOTAL = '55';

/**
 * Section 6, the bento grid. Four cards, each a heading that names its thing
 * and says what happens, the ask under it, and a visual that shows exactly that
 * thing:
 *
 * 1. routine work, three jobs finishing on their own;
 * 2. research, a web of sources joined as they are found, resolving into a
 *    brief, because it researches and then makes something;
 * 3. the question, a small chat where viaSocket reports the work it did and
 *    then stops and asks for permission;
 * 4. memory, what it recalled and where each piece came from.
 *
 * One reveal when the grid is first seen, then rest. Nothing loops. Nothing
 * narrates. The mark appears once per card at most, as an avatar.
 */

/** One reveal per visit: live flips on when the section is first seen, and stays. */
function useReveal(ref) {
    const [live, setLive] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduced(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLive(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref]);

    return live && !reduced;
}

/* One set of card chrome, so the four cards cannot drift apart. Stacked below
   900 they take their own height; side by side they are fixed, because a row of
   cards that each size to their content reads as a broken grid. */
const CARD =
    'relative flex h-auto min-h-0 flex-col overflow-hidden rounded-[14px] border border-[#e2e3dc] bg-[#fbfbf8] p-[18px] min-[900px]:p-[26px_28px_24px]';
const STAGE = 'relative mt-[14px] min-h-0 flex-1 min-[900px]:mt-5';
const CLOSE = 'mt-[14px] flex-none font-index-sans text-[15px] font-semibold text-index-ink min-[900px]:text-base';
/* Every revealed thing on this grid shares one transition, so nothing can be
   left half-drawn and no two tiles ease differently. */
const REVEAL =
    'transition-[opacity,transform,background-color,border-color,color] duration-[350ms] ease-out motion-reduce:transition-none';

/** The heading and, where the card is not itself a chat, the ask as a quoted line. */
function Head({ hook, ask }) {
    return (
        <header className="flex-none">
            <h3 className="m-0 font-index-display text-2xl font-normal leading-[1.02] tracking-[-0.03em] text-index-ink min-[900px]:text-index-card">
                {hook}
            </h3>
            {ask && (
                <p className="mt-[10px] max-w-[46ch] font-index-sans text-[14px] leading-[1.4] text-index-muted min-[900px]:text-base">
                    “{ask}”
                </p>
            )}
        </header>
    );
}

const TOTAL = 4.5;

/* --------------------------------------------------------------- 1. routine */

function RoutineCard({ live }) {
    const stageRef = useRef(null);
    const r = FILLS.routine;

    const reset = useCallback((stage) => onAll(stage, '.rt-row', false), []);
    const finish = useCallback((stage) => onAll(stage, '.rt-row', true), []);
    const steps = useCallback(
        (stage) => Array.from(stage.querySelectorAll('.rt-row')).map((li, i) => [0.6 + i * 0.4, () => on(li)]),
        []
    );

    useTimeline({ live, runId: 0, stageRef, reset, finish, steps, total: TOTAL });

    return (
        <article className={`${CARD} min-[900px]:h-[420px]`}>
            <Head hook={r.hook} ask={r.ask} />
            {/* Centred: the stage holds a short list and nothing else, so pinned
                to the top the card read as a list that had run out rather than a
                list sitting in a card. */}
            <div className={`${STAGE} flex flex-col justify-center`} ref={stageRef}>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {r.rows.map((row) => (
                        <li
                            className={`rt-row flex items-center gap-2 rounded-[10px] bg-[#f2f3ec] px-[10px] py-[7px] opacity-60 data-[on=true]:bg-[#eef3ea] data-[on=true]:opacity-100 min-[900px]:gap-[10px] min-[900px]:px-3 min-[900px]:py-2 ${REVEAL}`}
                            key={row.trigger}
                            data-on="false"
                        >
                            <span className="flex-none whitespace-nowrap rounded-full bg-[#e3e5db] px-[9px] py-[3px] text-[11px] font-medium text-[#5d6760] min-[900px]:px-[11px] min-[900px]:py-1 min-[900px]:text-[13px]">
                                {row.trigger}
                            </span>
                            <span className="min-w-0 flex-1 text-[14.5px] text-index-ink min-[900px]:text-[15.5px]">
                                {row.happened}
                            </span>
                            <span className="flex-none text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#2f7a58]">
                                {r.done}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <p className={CLOSE}>{r.close}</p>
        </article>
    );
}

/* -------------------------------------------------------------- 2. research */

/**
 * The web, then the brief. Six places it looked, each joined to the ones
 * already found by a thread, so the stage fills in like something being worked
 * through rather than a list ticking. When the last one lands the web dims and
 * the brief comes up over it: the research became a document.
 */
function ResearchCard({ live }) {
    const stageRef = useRef(null);
    const r = FILLS.research;
    const PER = 0.3;

    const reset = useCallback((stage) => {
        onAll(stage, '.rs-found', false);
        onAll(stage, '.rs-thread', false);
        onAll(stage, '.rs-brief', false);
        stage.querySelector('.rs-cloud')?.setAttribute('data-dim', 'false');
    }, []);

    const finish = useCallback((stage) => {
        onAll(stage, '.rs-found', true);
        onAll(stage, '.rs-thread', true);
        onAll(stage, '.rs-brief', true);
        stage.querySelector('.rs-cloud')?.setAttribute('data-dim', 'true');
    }, []);

    const steps = useCallback(
        (stage) => {
            const plan = [];
            const found = Array.from(stage.querySelectorAll('.rs-found'));
            const threads = Array.from(stage.querySelectorAll('.rs-thread'));

            found.forEach((f, i) => plan.push([0.4 + i * PER, () => on(f)]));

            // A thread appears with the later of its two ends, so nothing points
            // at something not yet found.
            r.links.forEach(([a, b], k) => {
                const at = 0.4 + Math.max(a, b) * PER + 0.12;
                plan.push([
                    at,
                    () => {
                        const thread = threads[k];
                        if (thread) on(thread);
                    },
                ]);
            });

            const end = 0.4 + r.found.length * PER + 0.5;
            plan.push([
                end,
                () => {
                    stage.querySelector('.rs-cloud')?.setAttribute('data-dim', 'true');
                    onAll(stage, '.rs-brief', true);
                },
            ]);

            return plan;
        },
        [r]
    );

    useTimeline({ live, runId: 0, stageRef, reset, finish, steps, total: TOTAL });

    return (
        <article className={`${CARD} min-[900px]:h-[420px]`}>
            <Head hook={r.hook} ask={r.ask} />
            <div className={`${STAGE} flex`} ref={stageRef}>
                {/* The cloud has less width to scatter into on a phone, so the
                    labels come down a size and the brief goes under the web
                    rather than over it — the labels have no room to clear it.
                    The bottom margin reserves the brief's room. All six stay:
                    the point is that it looked in several places. */}
                <div
                    className="rs-cloud group/cloud relative mb-[112px] min-h-[190px] w-full flex-1 transition-opacity duration-500 ease-out min-[900px]:mb-0 min-[900px]:min-h-[230px]"
                    data-dim="false"
                >
                    <svg
                        className="absolute inset-0 h-full w-full overflow-visible transition-opacity duration-500 ease-out group-data-[dim=true]/cloud:opacity-55"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        {r.links.map(([a, b], k) => (
                            <line
                                key={k}
                                className="rs-thread stroke-[#b9c4b0] stroke-1 opacity-0 [vector-effect:non-scaling-stroke] transition-opacity duration-[400ms] ease-out data-[on=true]:opacity-100"
                                data-on="false"
                                x1={r.found[a].at[0]}
                                y1={r.found[a].at[1]}
                                x2={r.found[b].at[0]}
                                y2={r.found[b].at[1]}
                            />
                        ))}
                    </svg>

                    {r.found.map((f) => (
                        <span
                            className="rs-found absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-[7px] whitespace-nowrap rounded-full border border-[#e2e3dc] bg-white py-1 pl-[7px] pr-[9px] text-[11.5px] text-[#4e5851] opacity-0 transition-opacity duration-[400ms] ease-out data-[on=true]:opacity-100 group-data-[dim=true]/cloud:opacity-55 min-[900px]:py-[5px] min-[900px]:pl-2 min-[900px]:pr-[11px] min-[900px]:text-[14px]"
                            key={f.what}
                            data-on="false"
                            style={{ left: `${f.at[0]}%`, top: `${f.at[1]}%` }}
                        >
                            <i className="h-[7px] w-[7px] rounded-full bg-index-done" aria-hidden="true" />
                            {f.what}
                        </span>
                    ))}

                    {/* Same card as everything else on the page rather than a
                        dark slab: the research card is about the cloud of
                        sources resolving into one brief, and a dark brief was
                        eating the cloud. */}
                    <div
                        className="rs-brief absolute inset-x-0 top-full z-[1] mt-[14px] w-auto translate-y-[6px] rounded-[12px] border border-index-line bg-white px-[13px] pb-3 pt-[11px] text-index-ink opacity-0 shadow-[0_6px_18px_rgb(20_32_31/7%)] transition-[opacity,transform] duration-[450ms] ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none min-[900px]:inset-x-auto min-[900px]:left-1/2 min-[900px]:top-1/2 min-[900px]:mt-0 min-[900px]:w-[min(250px,80%)] min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-[calc(50%-6px)] min-[900px]:px-4 min-[900px]:pb-[14px] min-[900px]:pt-[13px] min-[900px]:data-[on=true]:-translate-y-1/2"
                        data-on="false"
                    >
                        <p className="m-0 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#8b9a93]">
                            {r.brief.kicker}
                        </p>
                        <p className="m-0 mt-1 font-index-sans text-[18px] font-medium leading-[1.25] tracking-[-0.01em] min-[900px]:text-[21px]">
                            {r.brief.title}
                        </p>
                        <p className="m-0 mt-[6px] text-[13.5px] text-index-muted">{r.brief.line}</p>
                    </div>
                </div>
            </div>
            <p className={CLOSE}>{r.close}</p>
        </article>
    );
}

/* ---------------------------------------------------------------- 3. memory */

/** What it recalled, and where from, then the answer. */
function MemoryCard({ live }) {
    const stageRef = useRef(null);
    const m = FILLS.memory;

    const reset = useCallback((stage) => {
        onAll(stage, '.fm-row', false);
        onAll(stage, '.fm-found', false);
    }, []);

    const finish = useCallback((stage) => {
        onAll(stage, '.fm-row', true);
        onAll(stage, '.fm-found', true);
    }, []);

    const steps = useCallback((stage) => {
        const plan = Array.from(stage.querySelectorAll('.fm-row')).map((row, i) => [0.7 + i * 0.5, () => on(row)]);
        plan.push([0.7 + FILLS.memory.recalled.length * 0.5 + 0.5, () => onAll(stage, '.fm-found', true)]);
        return plan;
    }, []);

    useTimeline({ live, runId: 0, stageRef, reset, finish, steps, total: TOTAL });

    return (
        <article className={`${CARD} min-[900px]:h-[440px]`}>
            <Head hook={m.hook} ask={m.ask} />
            <div className={`${STAGE} flex flex-col justify-center`} ref={stageRef}>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {m.recalled.map((row) => (
                        <li
                            className={`fm-row flex translate-y-[4px] items-baseline gap-[10px] border-b border-[#e6e7e0] py-[7px] opacity-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 ${REVEAL}`}
                            key={row.from}
                            data-on="false"
                        >
                            <span className="min-w-[84px] flex-none text-[10px] font-semibold uppercase tracking-[0.07em] text-[#8a938c] min-[900px]:min-w-[96px] min-[900px]:text-[11px]">
                                {row.from}
                            </span>
                            <span className="text-[14px] text-index-ink min-[900px]:text-[15px]">{row.what}</span>
                        </li>
                    ))}
                </ul>
                <p
                    className={`fm-found mt-4 inline-flex items-center font-index-sans text-[22px] font-medium tracking-[-0.015em] text-index-ink opacity-0 data-[on=true]:opacity-100 min-[900px]:text-[28px] ${REVEAL}`}
                    data-on="false"
                >
                    {m.result}
                </p>
            </div>
            <p className={CLOSE}>{m.close}</p>
        </article>
    );
}

/* ---------------------------------------------------------- 4. the question */

/**
 * A small chat. The ask is the first bubble. viaSocket reports the work it did
 * under the limit, then stops on the one thing over it and asks, in the shape
 * an assistant asks for permission: the question, the controls, and a note that
 * it is waiting.
 */
function NightCard({ live }) {
    const stageRef = useRef(null);
    const n = FILLS.night;

    const reset = useCallback((stage) => {
        onAll(stage, '.fn-turn', false);
        onAll(stage, '.fn-options', false);
    }, []);

    const finish = useCallback((stage) => {
        onAll(stage, '.fn-turn', true);
        onAll(stage, '.fn-options', true);
    }, []);

    const steps = useCallback((stage) => {
        const turns = Array.from(stage.querySelectorAll('.fn-turn'));
        return [
            [0.3, () => on(turns[0])],
            [1.1, () => on(turns[1])],
            [2.0, () => on(turns[2])],
            [2.6, () => onAll(stage, '.fn-options', true)],
        ];
    }, []);

    useTimeline({ live, runId: 0, stageRef, reset, finish, steps, total: TOTAL });

    return (
        <article className={`${CARD} min-[900px]:h-[440px]`}>
            <Head hook={n.hook} />
            {/* The box is inside the stage, not the stage itself: as the same
                element it stretched to every pixel of the card's middle and sat
                there with a hand's depth of empty paper under the last button.
                Wrapped, the box takes the width of a conversation and the height
                of its own turns, and the stage centres what is left around it. */}
            <div className={`${STAGE} flex items-center justify-center`} ref={stageRef}>
                {/* Stacked, the card is already narrow: the box takes what there
                    is. Wider up, it takes the width of a conversation and the
                    height of its own turns, and the stage centres what is left
                    around it. */}
                <div className="flex w-full flex-col gap-3 rounded-[14px] border border-index-line bg-index-paper px-[13px] py-3 min-[900px]:w-[min(94%,780px)] min-[900px]:px-[18px] min-[900px]:py-4">
                    <div
                        className={`fn-turn translate-y-[5px] self-end rounded-[16px_16px_5px_16px] bg-[#e9efe6] px-[14px] py-[9px] text-[14px] leading-[1.4] text-index-ink opacity-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 min-[900px]:max-w-[78%] min-[900px]:text-[15px] ${REVEAL}`}
                        data-on="false"
                    >
                        <span>{n.ask}</span>
                    </div>

                    <div
                        className={`fn-turn flex max-w-[92%] translate-y-[5px] items-start gap-[10px] opacity-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 ${REVEAL}`}
                        data-on="false"
                    >
                        <i className="mt-px h-[22px] w-[22px] flex-none text-index-ink" aria-hidden="true">
                            <IndexCardMark />
                        </i>
                        <p className="m-0 text-[14px] leading-[1.45] text-index-ink min-[900px]:text-[15px]">
                            {NIGHT_TOTAL} {n.chat.done}
                        </p>
                    </div>

                    <div
                        className={`fn-turn flex max-w-[92%] translate-y-[5px] items-start gap-[10px] opacity-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 ${REVEAL}`}
                        data-on="false"
                    >
                        <i className="mt-px h-[22px] w-[22px] flex-none text-index-ink" aria-hidden="true">
                            <IndexCardMark />
                        </i>
                        <div className="flex min-w-0 flex-col gap-[9px]">
                            <p className="m-0 text-[14px] leading-[1.45] text-index-ink min-[900px]:text-[15px]">
                                {n.chat.question}
                            </p>
                            {/* Just the controls and a line saying it is
                                waiting: a bordered panel of numbered rows made
                                the permission step the largest object in the
                                bento. */}
                            <div
                                className="fn-options flex flex-col gap-[9px] opacity-0 transition-opacity duration-[350ms] ease-out data-[on=true]:opacity-100 motion-reduce:transition-none"
                                data-on="false"
                                aria-hidden="true"
                            >
                                <span className="flex flex-wrap gap-2">
                                    {n.chat.options.map((o, i) => (
                                        <span
                                            className={`inline-flex items-center rounded-[9px] border px-[15px] py-2 text-[14px] font-medium leading-none ${
                                                i === 0
                                                    ? 'border-index-ink bg-index-ink text-index-paper'
                                                    : 'border-[#cfd5c7] bg-white text-index-ink'
                                            }`}
                                            key={o}
                                        >
                                            {o}
                                        </span>
                                    ))}
                                </span>
                                <span className="m-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a77a12]">
                                    {n.chat.waiting}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className={CLOSE}>{n.close}</p>
        </article>
    );
}

/* ------------------------------------------------------------------ the grid */

export default function IndexFills() {
    const ref = useRef(null);
    const live = useReveal(ref);

    return (
        <section
            className="relative flex flex-col justify-start bg-index-fills px-5 pb-16 pt-20 font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:pb-[88px] min-[900px]:pt-[104px]"
            ref={ref}
            data-live={live ? 'true' : 'false'}
        >
            <h2 className="m-0 max-w-[24ch] font-index-display text-[clamp(40px,5vw,74px)] font-normal leading-[0.88] tracking-[-0.03em] min-[900px]:tracking-[-0.06em]">
                {FILLS.heading}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.5] text-index-muted">{FILLS.subhead}</p>

            {/* Row A runs narrow then wide, row B wide then narrow, which is the
                alternation that keeps the grid from reading as two equal halves.
                One column below 900, where an alternation has nothing to
                alternate against. */}
            <div className="mt-[22px] grid grid-cols-1 gap-[10px] min-[900px]:mt-[clamp(28px,3vw,44px)] min-[900px]:grid-cols-[1fr_1.25fr] min-[900px]:gap-3">
                <RoutineCard live={live} />
                <ResearchCard live={live} />
            </div>
            <div className="mt-[10px] grid grid-cols-1 gap-[10px] min-[900px]:mt-3 min-[900px]:grid-cols-[1.1fr_1fr] min-[900px]:gap-3">
                <NightCard live={live} />
                <MemoryCard live={live} />
            </div>
        </section>
    );
}
