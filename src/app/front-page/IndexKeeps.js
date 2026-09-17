'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';

const KEEPS = {
    heading: 'Run it once, or keep it running.',
    subhead:
        'Run it once, or set a trigger and let it repeat. Every time something arrives, or on a schedule you choose.',
    hinge: {
        // Split around the slot, which cycles through the things a job can
        // start from. The sentence is the product's shape, so the slot shows
        // the breadth without a list of use cases underneath it.
        before: 'Trigger this every time',
        after: 'comes in?',
        slots: ['a booking', 'an invoice', 'an order', 'a support request', 'a payment'],
        // The prompt each control sends to signup, keyed to the word
        // currently in the slot, so the chat opens on the same job the
        // hinge sentence was just promising.
        prompts: [
            {
                automate:
                    'Every time a booking comes in, set the customer up and tell my team. Ask me where bookings come in, what setting a customer up involves, and where my team wants to be told.',
                once:
                    'I have a booking to handle now. Set the customer up and tell my team, just this once. Ask me where the booking is and what setting a customer up involves.',
            },
            {
                automate:
                    'Every time an invoice comes in, file it and tell my team. Ask me where invoices come in, which accounting tool to file it in, and where my team wants to be told.',
                once:
                    'I have an invoice to handle now. File it and tell my team, just this once. Ask me where the invoice is and which accounting tool to file it in.',
            },
            {
                automate:
                    'Every time an order comes in, get it ready to ship and tell my team. Ask me where orders come in, what getting an order ready involves, and where my team wants to be told.',
                once:
                    'I have an order to handle now. Get it ready to ship and tell my team, just this once. Ask me where the order is and what getting it ready involves.',
            },
            {
                automate:
                    'Every time a support request comes in, assign it to the right person and tell my team. Ask me where support requests come in, who handles what, and where my team wants to be told.',
                once:
                    'I have a support request to handle now. Assign it to the right person and tell my team, just this once. Ask me where the request is and who handles what.',
            },
            {
                automate:
                    'Every time a payment comes in, match it to the invoice it pays and tell my team. Ask me where payments come in, which accounting tool I use, and where my team wants to be told.',
                once:
                    'I have a payment to handle now. Match it to the invoice it pays and tell my team, just this once. Ask me where the payment is and which accounting tool I use.',
            },
        ],
        automate: 'Automate it',
        once: 'Just this once',
        // The other half of the argument. Choosing once gives you one mark,
        // which is the contrast the section is built on.
        onceNote: 'It ran once. Nothing is waiting for the next booking.',
    },
    kinds: {
        event: { closing: 'done in 4 seconds' },
        weekly: { closing: 'sent at 09:00' },
    },
    trackLabel:
        'Days passing, and the jobs viaSocket ran on them. Bookings below the line, the weekly report above it.',
    trackTitle: 'Schedule your work across the week',
    trackNote: 'Bookings as they arrive, the report every Monday.',
};

/**
 * The timeline's clock and cast. Bookings arrive on uneven days and the weekly
 * report runs every Monday, so the recurrence is stated by the calendar rather
 * than asserted by a sentence.
 */
const K =
    /**
     * The durability timeline's clock and cast. Bookings arrive on uneven days
     * and the weekly report runs every Monday, so the recurrence is stated by
     * the calendar rather than asserted by a sentence.
     */
    {
        /** Pixels a second the line travels. Slow enough to read. */
        speedPxPerSecond: 58,
        /** Pixels between one day and the next. */
        dayPx: 150,
        /** Where the day reaching "now" sits across the track. */
        playhead: 0.74,
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        /** The metronome: every seventh tick, the same day every time. */
        weeklyDay: 0,
        /** Uneven, and never next to the Monday. */
        eventDays: [2, 5],
        // The job is the headline, the customer is the detail: a name means
        // nothing to a stranger, so what happened leads and which one follows.
        // Five different kinds rather than five bookings, because a line of one
        // job repeated argues breadth while showing the same thing over.
        events: [
            { what: 'Booking confirmed', detail: 'Casa Verde' },
            { what: 'Invoice filed', detail: 'Harbour Ltd' },
            { what: 'Order packed', detail: 'Order 1190' },
            { what: 'Request routed', detail: 'Meera K.' },
            { what: 'Payment matched', detail: 'Anil S.' },
            { what: 'Booking confirmed', detail: 'Order 1204' },
            { what: 'Invoice filed', detail: 'Meera Textiles' },
            { what: 'Request routed', detail: 'Deepa R.' },
        ],
        weekly: { what: 'Weekly summary', detail: 'Monday, 9am' },
    };

/**
 * Section 4. The durability beat.
 *
 * The work stays on the line. Nothing leaves: a day that had work keeps it, the
 * finished job travels off the left edge with the rest of the past, and three or
 * four are legible at once. Monday comes round every seventh tick and the report
 * is there again, which is the recurrence stated by the calendar rather than
 * asserted by a sentence.
 *
 * Progress is derived, not timed. There is no spawn, no setTimeout chain and no
 * per-task state — a task belongs to its day, and how far it has got is a pure
 * function of how far that day is past the playhead. So a task cannot be
 * half-spawned, cannot be skipped when a frame is dropped, and cannot get out of
 * step with the line carrying it. The clock writes one CSS variable per frame;
 * React re-renders only when the window moves on a day or a visible task
 * actually gains a step.
 *
 * Two lanes: bookings hang below the line and the weekly report stands above it.
 * They are the two modes the heading is about, so separating them means the
 * section reads as one thing happening on arrival and another on a schedule,
 * without a word of labelling.
 *
 * Reduced motion gets a still line with one of each kind and no clock.
 */

/**
 * A phone has a fraction of the track a desktop has, so the line runs slower
 * there — and the day spacing scales with it. Slowing the line alone stretched
 * the gaps between task days to fourteen seconds of empty track, which is not a
 * calmer version of the same thing, it is a different section.
 */
const NARROW = 0.55;
const narrowNow = () => window.innerWidth < 900;
const speedNow = () => K.speedPxPerSecond * (narrowNow() ? NARROW : 1);
const dayPxFor = (narrow) => K.dayPx * (narrow ? NARROW : 1);
/**
 * Where the day reaching now sits across the track. A card is wide against a
 * phone's track, so the desktop playhead would have every task born half off
 * the right edge. The narrow one sits far enough left that a card arrives whole
 * and still leaves a couple of days of finished work behind it.
 */
const playheadFor = (narrow) => (narrow ? 0.55 : K.playhead);
/** Seconds a step takes to tick off. */
const STEP_SEC = 0.5;
/** How many ticks a card runs before it reads as done. */
const SETTLE_TICKS = 4;

/** Which kind of task, if any, falls on this day of the cycle. */
function taskOn(day) {
    const inWeek = ((day % 7) + 7) % 7;
    if (inWeek === K.weeklyDay) return 'weekly';
    return K.eventDays.includes(inWeek) ? 'event' : null;
}

/**
 * Which booking this is. Counted from the day rather than from a running total,
 * so the same day always produces the same customer however you got there, and
 * a week that scrolls past twice is not two different weeks.
 */
function eventIndex(day) {
    const week = Math.floor(day / 7);
    const inWeek = ((day % 7) + 7) % 7;
    const n = week * K.eventDays.length + K.eventDays.indexOf(inWeek);
    return ((n % K.events.length) + K.events.length) % K.events.length;
}

const sourceFor = (day, kind) => (kind === 'weekly' ? K.weekly : K.events[eventIndex(day)]);

export default function IndexKeeps({ utmSource = INDEX_UTM_SOURCE }) {
    const sectionRef = useRef(null);
    const stripRef = useRef(null);
    const [mode, setMode] = useState('auto');
    const [slot, setSlot] = useState(0);
    const [reduced, setReduced] = useState(false);
    const [live, setLive] = useState(false);
    /** The first day of the rendered window. Changes once per day travelled. */
    const [firstDay, setFirstDay] = useState(0);
    const [narrow, setNarrow] = useState(false);
    /** Day -> steps ticked off. Written only when one of them actually changes. */
    const [steps, setSteps] = useState({});

    const shift = useRef(0);
    const frame = useRef(0);
    const stepKey = useRef('');

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduced(true);
            return undefined;
        }

        setNarrow(narrowNow());
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => setLive(entry.isIntersecting));
            },
            { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // The word in the hinge cycles. The sentence is the product's shape, so the
    // slot shows the breadth without a list of use cases underneath it.
    useEffect(() => {
        if (reduced || !live) return undefined;
        const timer = window.setInterval(() => setSlot((i) => (i + 1) % KEEPS.hinge.slots.length), 1900);
        return () => window.clearInterval(timer);
    }, [reduced, live]);

    const once = mode === 'once';
    const still = reduced || once;

    /** Enough ticks to cross the track, plus a margin either side. */
    const span = narrow ? 12 : 18;

    // The clock. One variable per frame on the strip; React hears about it only
    // when the day window moves or a visible task gains a step.
    useEffect(() => {
        if (still || !live) return undefined;
        const track = stripRef.current?.parentElement;
        if (!track) return undefined;

        const playheadPx = track.clientWidth * playheadFor(narrowNow());
        const dayPx = dayPxFor(narrowNow());
        // Start with a full week already behind the playhead, so the section
        // opens with work on it rather than an empty line filling up.
        shift.current = -playheadPx + 1 + 7 * dayPx;
        let last = performance.now();

        const tick = (now) => {
            const dt = Math.min(now - last, 64) / 1000;
            last = now;
            shift.current += dt * speedNow();
            if (stripRef.current) stripRef.current.style.setProperty('--shift', shift.current.toFixed(1));

            const windowStart = Math.floor(shift.current / dayPx) - 1;
            setFirstDay((d) => (d === windowStart ? d : windowStart));

            // How far each task in the window has got, derived from the line's
            // own position, so a dropped frame loses nothing and nothing drifts.
            const next = {};
            for (let i = 0; i < span; i += 1) {
                const day = windowStart + i;
                if (!taskOn(day)) continue;
                const elapsed = (shift.current + playheadPx - day * dayPx) / speedNow();
                if (elapsed < 0) continue;
                next[day] = Math.floor(elapsed / STEP_SEC);
            }

            const key = Object.entries(next)
                .map(([d, s]) => `${d}:${Math.min(s, 9)}`)
                .join(',');
            if (key !== stepKey.current) {
                stepKey.current = key;
                setSteps(next);
            }

            frame.current = window.requestAnimationFrame(tick);
        };

        frame.current = window.requestAnimationFrame(tick);
        return () => {
            window.cancelAnimationFrame(frame.current);
            stepKey.current = '';
            setSteps({});
        };
    }, [still, live, span]);

    const renderRun = useCallback(
        (day, kind, step, left) => {
            const spec = KEEPS.kinds[kind];
            const source = sourceFor(day, kind);
            const done = step > SETTLE_TICKS;

            return (
                <div
                    className="group absolute top-0 h-full w-0 animate-index-run-in"
                    key={`${kind}-${day}`}
                    data-kind={kind}
                    data-done={done ? 'true' : 'false'}
                    style={{ left }}
                >
                    <span
                        className={`absolute left-0 top-[44%] -translate-x-1/2 -translate-y-1/2 ${
                            kind === 'weekly'
                                ? 'h-[10px] w-[10px] rounded-[2px] border-2 border-[#2c4a46] bg-transparent'
                                : 'h-[11px] w-[11px] rounded-full bg-[#2c4a46]'
                        }`}
                        aria-hidden="true"
                    />
                    {/* Below the line for an arrival, clearing the band the day
                        names sit in; above it and grown upward for the report,
                        because giving the scheduled thing its own side of the
                        line says so without a label. */}
                    <div
                        className={`absolute left-0 w-[168px] border-l border-[#b9cecb] pl-3 min-[900px]:w-[252px] min-[900px]:pl-[15px] ${
                            kind === 'weekly' ? 'bottom-[calc(56%+13px)]' : 'top-[calc(44%+32px)]'
                        }`}
                    >
                        {/* The job is the headline. A stranger should read the
                            line and know a booking happened, a report went out,
                            an invoice was filed. The customer is the detail
                            under it, not the other way round. */}
                        <p className="m-0 whitespace-nowrap">
                            <b className="text-[17px] font-medium tracking-[-0.02em] text-index-ink min-[900px]:text-[19px]">
                                {source.what}
                            </b>
                        </p>
                        <p className="mt-[3px] text-[13px] text-[#5b7570] min-[900px]:text-[14px]">{source.detail}</p>
                        <p
                            className="mt-[9px] text-[11.5px] text-[#7c9a95] opacity-0 transition-opacity duration-300 ease-out data-[on=true]:opacity-100 motion-reduce:transition-none"
                            data-on={done ? 'true' : 'false'}
                        >
                            {once ? KEEPS.hinge.onceNote : spec.closing}
                        </p>
                    </div>
                </div>
            );
        },
        [once]
    );

    const ticks = Array.from({ length: span }, (_, i) => firstDay + i);
    const days = ticks.filter((d) => steps[d] !== undefined);

    return (
        <section
            className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-index-keeps px-5 pb-[54px] pt-[90px] font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:pb-[62px] min-[900px]:pt-[94px]"
            ref={sectionRef}
        >
            <h2 className="m-0 font-index-display text-[clamp(40px,5vw,74px)] font-normal leading-[0.88] tracking-[-0.03em] min-[900px]:tracking-[-0.06em]">
                {KEEPS.heading}
            </h2>
            <p className="mt-[15px] max-w-[620px] text-[17px] leading-[1.5] text-[#5b6f6b]">{KEEPS.subhead}</p>

            {/* The hinge: the whole product in one control. It takes real space,
                so it reads as the thing the section is about rather than one
                more line of copy above the timeline. */}
            <div className="my-[clamp(18px,2vw,26px)] mt-[clamp(24px,2.6vw,32px)] flex w-[min(940px,100%)] flex-col items-start gap-[14px] rounded-[12px] border border-[#c6d7d4] bg-white/60 px-5 py-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-5">
                <p className="m-0 flex-1 text-[17px] leading-[1.5] text-index-ink min-[900px]:text-[clamp(16px,1.5vw,19px)]">
                    {KEEPS.hinge.before}{' '}
                    {/* On desktop only the live word is in flow, so the box
                        tracks it and a short word does not float in a gap. That
                        relies on the incoming word being absolutely positioned,
                        and the clip then hides it until the box catches up — at
                        phone widths there is nowhere for that to hide and a long
                        option rendered truncated, so below 900 every option
                        stacks in one grid cell and the box takes the width of
                        the longest. */}
                    <span className="relative inline-grid overflow-visible rounded-[7px] bg-[#dbe8e5] px-[11px] py-[2px] text-center align-middle min-[900px]:inline-block min-[900px]:overflow-hidden">
                        {KEEPS.hinge.slots.map((word, i) => {
                            const isOn = i === (reduced ? 0 : slot);
                            return (
                                <span
                                    key={word}
                                    className="static col-start-1 row-start-1 translate-y-[6px] whitespace-nowrap font-medium text-index-ink opacity-0 transition-[opacity,transform] duration-[90ms] ease-in data-[on=true]:translate-y-0 data-[on=true]:opacity-100 data-[on=true]:delay-100 data-[on=true]:duration-300 data-[on=true]:ease-out motion-reduce:transition-none min-[900px]:absolute min-[900px]:left-[11px] min-[900px]:top-[2px] min-[900px]:data-[on=true]:relative min-[900px]:data-[on=true]:left-auto min-[900px]:data-[on=true]:top-auto"
                                    data-on={isOn ? 'true' : 'false'}
                                    aria-hidden={isOn ? undefined : 'true'}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </span>{' '}
                    {KEEPS.hinge.after}
                </p>

                <div className="flex flex-none gap-[9px]">
                    {[
                        { label: KEEPS.hinge.automate, on: !once, set: 'auto', key: 'automate' },
                        { label: KEEPS.hinge.once, on: once, set: 'once', key: 'once' },
                    ].map((choice) => {
                        const activeSlot = reduced ? 0 : slot;
                        const prompt = KEEPS.hinge.prompts[activeSlot][choice.key];
                        return (
                            <a
                                key={choice.set}
                                className="rounded-full border border-[#8aa3a0] bg-transparent px-[17px] py-[9px] text-[14px] text-[#3c5551] transition-[background-color,color,border-color] duration-200 hover:border-index-ink hover:text-index-ink data-[on=true]:border-index-ink data-[on=true]:bg-index-ink data-[on=true]:text-[#f1f6f4] motion-reduce:transition-none"
                                data-on={choice.on}
                                aria-current={choice.on}
                                href={buildSignupHref(utmSource)}
                                onClick={() => {
                                    setMode(choice.set);
                                    carryPromptToSignup(prompt);
                                    trackSignupClick(utmSource, {
                                        element: `index_keeps_${choice.key}`,
                                        label: choice.label,
                                    });
                                }}
                            >
                                {choice.label}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* The track bleeds past the section's gutters, because a timeline
                that stops neatly at a margin reads as a diagram rather than as
                something still running. Both ends dissolve rather than being
                cut: a card guillotined by the viewport edge reads as a clipping
                bug rather than as something passing out of view.

                There is no "now" marker. It was a rule doing no work: the thing
                that says where now is, is the newest task on the line, and
                everything to the right of it is empty because it has not
                happened. */}
            <div
                className="group relative mx-[calc(50%-50vw)] h-[250px] w-screen overflow-hidden [--fade-in:46px] [--fade-out:30px] [mask-image:linear-gradient(90deg,transparent_0,#000_var(--fade-in),#000_calc(100%-var(--fade-out)),transparent_100%)] min-[900px]:h-[300px] min-[900px]:[--fade-in:118px] min-[900px]:[--fade-out:72px]"
                data-still={still ? 'true' : 'false'}
                role="img"
                aria-label={KEEPS.trackLabel}
            >
                {/* The line sits in the middle, because the two kinds of work
                    split around it: the weekly report stands above, every
                    booking hangs below. */}
                <span className="absolute inset-x-0 top-[44%] h-px bg-[#b9cecb]" aria-hidden="true" />

                <div
                    className="absolute inset-0 [transform:translate3d(calc(var(--shift,0)*-1px),0,0)] [will-change:transform] group-data-[still=true]:[transform:none]"
                    ref={stripRef}
                >
                    {/* The day axis. A seven-day cycle, so the Monday the weekly
                        job runs on comes round visibly rather than being
                        asserted. The names sit in a thin band under the rule,
                        leaving the space above it to the report. */}
                    {!still &&
                        ticks.map((d) => {
                            const isWeek = ((d % 7) + 7) % 7 === K.weeklyDay;
                            return (
                                <span
                                    className="absolute top-[44%] flex -translate-x-1/2 flex-col items-center gap-[5px] animate-index-run-in"
                                    key={d}
                                    aria-hidden="true"
                                    style={{ left: `${d * dayPxFor(narrow)}px` }}
                                >
                                    <i
                                        className={`w-px ${isWeek ? 'h-[13px] bg-[#a6c2bd]' : 'h-[9px] bg-[#cbdcd8]'}`}
                                    />
                                    <em
                                        className={`not-italic text-[10.5px] uppercase tracking-[0.09em] ${
                                            isWeek ? 'text-[#6f8f8a]' : 'text-[#9dbab6]'
                                        }`}
                                    >
                                        {K.days[((d % 7) + 7) % 7]}
                                    </em>
                                </span>
                            );
                        })}

                    {!still && days.map((d) => renderRun(d, taskOn(d), steps[d], `${d * dayPxFor(narrow)}px`))}

                    {/* Once, and reduced motion: one of each, standing still. The
                        point of "just this once" is what is missing, so the pair
                        is the argument. */}
                    {still && renderRun(2, 'event', 99, '30%')}
                    {still && !once && renderRun(0, 'weekly', 99, '62%')}
                </div>
            </div>

            {/* Under the track, not above it: the marks land one at a time and
                pull the eye to the rule anyway, so a header above is read before
                there is anything to apply it to. */}
            <p className="mt-[22px] text-[19px] font-medium leading-[1.3] tracking-[-0.01em] text-index-ink">
                {KEEPS.trackTitle}
                <span className="mt-1 block text-[14px] font-normal text-[#8b9a93]">{KEEPS.trackNote}</span>
            </p>
        </section>
    );
}
