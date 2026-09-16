'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';
import IndexChatStage, { chatDuration } from './IndexChatStage';
import { buildIconMap } from './appIcons';

const SHOWCASE = {
    // The point is that any kind of work goes in as a prompt and comes back
    // done, so the heading says that and the steps show the shape of it.
    heading: 'You describe the work. viaSocket does it.',
    // The three steps ARE the sub-head. A lead sentence and a stepper were
    // saying the same thing twice in two registers, so the sentence went
    // and the stepper took its slot. Still an ordered list: the HowTo in
    // the schema graph is generated from these same three strings.
    steps: [
        'Describe the job in plain words',
        'viaSocket plans the steps and connects your apps',
        'It runs once, on a trigger, or on a schedule',
    ],
    // No total. Naming one closes the set: a reader whose job is not among
    // them would then know it is not on the list. "just examples" says the
    // set is open without claiming "anything".
    more: 'These are just examples. See more',
    counterOf: '/',
    prev: 'Previous',
    next: 'Next',
    /** Screen-reader name for the per-card arrow. The card's name follows it. */
    open: 'Start this job',
    /** Screen-reader name for the carousel itself. */
    region: 'Jobs viaSocket runs',
    // What closes a completed step, in place of a tick: a tick per line
    // reads as a task manager or a checklist, which is not what this is.
    // The app the work happened in leads the line instead, and the line
    // ends by saying it is done. Same information, without the to-do list.
    stepDone: 'done',
    /**
     * Five cards, one chat each. viaSocket is chat-first, so the showcase
     * shows the product doing what it does, as a chat: the user types the
     * job, viaSocket says what it is doing, and the job is done.
     *
     * `chat` is the whole conversation in order — the ask, what viaSocket
     * says it is doing, the steps as they land, and the done line, which is
     * the receipt and the only claim a card makes.
     *
     * `icon` on a step is matched against the app catalogue for its mark.
     * The slug comes from the content beside the label rather than being
     * derived from it: a name-to-slug map in code is a silent trap the
     * first time somebody writes a new label. 'form' has no brand mark and
     * is drawn instead.
     */
    cards: [
        // Repetitive work. The other cards each show one job in depth; this
        // one shows five, because the thing a reader arrives wanting is not
        // a named workflow, it is the pile of small jobs they do by hand
        // every day. Its steps are use cases rather than the stages of one
        // job. It is the only card built that way, and it is placed first
        // because it is the broadest entry point.
        {
            verb: 'Repetitive tasks',
            subhead: 'The small jobs nobody schedules and everybody does. They keep happening; you stop doing them.',
            job: 'Every morning, copy yesterday\u2019s orders into Sheets and chase the ones that didn\u2019t pay.',
            accent: '#5b7cc4',
            chat: [
                {
                    from: 'you',
                    text: 'Every morning, copy yesterday\u2019s orders into Sheets and chase the ones that didn\u2019t pay.',
                },
                { from: 'via', text: 'Tell me which ones. Here are five I see teams hand over first.' },
                {
                    from: 'via',
                    steps: [
                        {
                            text: 'Copy every new form entry into the sheet \u00b7 each time one arrives',
                            app: 'Google Sheets',
                            icon: 'googlesheets',
                        },
                        {
                            text: 'Chase the invoices that passed their date \u00b7 every morning',
                            app: 'Gmail',
                            icon: 'gmail',
                        },
                        {
                            text: 'File the signed contract and tell the deal owner \u00b7 on signature',
                            app: 'Google Drive',
                            icon: 'googledrive',
                        },
                        {
                            text: 'Post the day\u2019s numbers to the team channel \u00b7 6pm',
                            app: 'Slack',
                            icon: 'slack',
                        },
                        {
                            text: 'Open a ticket when a reply goes past two days \u00b7 each time',
                            app: 'Zendesk',
                            icon: 'zendesk',
                        },
                    ],
                },
                { from: 'via', text: 'Each one runs on its own from here. Nobody has to remember any of them.' },
                { from: 'via', done: '5 jobs running \u00b7 nothing on your list' },
            ],
        },
        {
            verb: 'Data collection',
            subhead:
                'Records arrive in whatever shape the sender chose. They end up as rows that match, without anyone retyping them.',
            job: 'Put every invoice that lands in Gmail into my accounting sheet.',
            accent: '#14b585',
            chat: [
                {
                    from: 'you',
                    text: 'Put every invoice that lands in Gmail into my accounting sheet.',
                },
                {
                    from: 'via',
                    text: 'On it. I\u2019ll watch email, the web form, Drive, the shop and #expenses.',
                },
                {
                    from: 'via',
                    steps: [
                        {
                            text: 'HARB-2041.pdf \u00b7 Harbour Ltd \u00b7 \u20b984,200',
                            app: 'Email',
                            icon: 'gmail',
                        },
                        {
                            text: 'Expense claim \u00b7 Ravi Menon \u00b7 \u20b92,450',
                            app: 'Web form',
                            icon: 'form',
                        },
                        {
                            text: 'Order-0912.pdf \u00b7 Casa Verde \u00b7 \u20b918,600',
                            app: 'Drive',
                            icon: 'googledrive',
                        },
                        {
                            text: 'Order #1187 \u00b7 Meera Textiles \u00b7 \u20b96,300',
                            app: 'Shopify',
                            icon: 'shopify',
                        },
                        {
                            text: 'Receipt photo \u00b7 Anil Supplies \u00b7 \u20b933,900',
                            app: 'Slack',
                            icon: 'slack',
                        },
                    ],
                },
                {
                    from: 'via',
                    text: 'All five are in the sheet, matched to the sender and the amount. Nothing needed you.',
                },
                { from: 'via', done: '5 rows added to Accounting sheet \u00b7 9:02am' },
            ],
        },
        {
            verb: 'Follow ups',
            subhead:
                'Somebody owes you something. viaSocket keeps asking until they send it, and knows when to stop and when to bring you in.',
            job: 'Chase unpaid invoices until they pay, then stop.',
            accent: '#2f8fe8',
            chat: [
                {
                    from: 'you',
                    text: 'Chase unpaid invoices until they pay, then stop.',
                },
                {
                    from: 'via',
                    text: 'Invoice 2041 to Casa Verde, \u20b918,600, is 4 days overdue. Sending the first reminder.',
                },
                {
                    from: 'via',
                    steps: [
                        {
                            text: 'Day 4 \u00b7 reminder sent to Meera at Casa Verde',
                            app: 'Gmail',
                            icon: 'gmail',
                        },
                        { text: 'Day 11 \u00b7 second reminder sent', app: 'Gmail', icon: 'gmail' },
                        { text: 'Day 14 \u00b7 paid, reference 88213', app: 'Razorpay', icon: 'razorpay' },
                    ],
                },
                {
                    from: 'via',
                    text: 'Casa Verde paid on day 14. I stopped the reminders the moment the payment landed.',
                },
                { from: 'via', done: 'Paid \u20b918,600. Reminders stopped.' },
            ],
        },
        {
            verb: 'Weekly reporting',
            subhead: 'viaSocket watches the week, writes up what changed, and sends it to whoever needs it.',
            job: 'Every Monday at 9, send me last week\u2019s sales and refunds.',
            accent: '#7c5cff',
            chat: [
                {
                    from: 'you',
                    text: 'Every Monday at 9, send me last week\u2019s sales and refunds.',
                },
                { from: 'via', text: 'Monday, 9:00. Here is the week to 21 September.' },
                {
                    from: 'via',
                    // Only what viaSocket DID is marked done. Two of these
                    // are observations, and a finding is not a task, so
                    // they carry no app and no done marker.
                    steps: [
                        {
                            text: '23 orders \u00b7 5 invoices \u00b7 1 refund',
                            app: 'Sheets',
                            icon: 'googlesheets',
                        },
                        { text: 'Thursday was the busiest day, 6 orders.' },
                        { text: '5 invoices went out, \u20b915,000 in total.' },
                    ],
                },
                { from: 'via', text: 'The full sheet is in #finance. Nothing else changed this week.' },
                { from: 'via', done: 'Sent to #finance and Priya Nair \u00b7 Monday 9:00am' },
            ],
        },
        {
            verb: 'Request routing',
            subhead:
                'Everything lands in one queue and somebody has to sort it. viaSocket reads each one and hands it to the person who owns it.',
            job: 'Read every support email and send it to the right person.',
            accent: '#f2673f',
            chat: [
                {
                    from: 'you',
                    text: 'Read every support email and send it to the right person.',
                },
                { from: 'via', text: 'Five new tickets since 9. Reading them.' },
                {
                    from: 'via',
                    steps: [
                        {
                            text: '#4821 Payment link isn\u2019t working \u00b7 Priya, Support',
                            app: 'Zendesk',
                            icon: 'zendesk',
                        },
                        {
                            text: '#4822 Quote for 200 units \u00b7 Kenji, Sales',
                            app: 'HubSpot',
                            icon: 'hubspot',
                        },
                        {
                            text: '#4823 Invoice 2038 looks wrong \u00b7 Anita, Accounts',
                            app: 'Slack',
                            icon: 'slack',
                        },
                        {
                            text: '#4824 Order never arrived \u00b7 Priya, Support',
                            app: 'Zendesk',
                            icon: 'zendesk',
                        },
                        {
                            text: '#4825 Bulk pricing question \u00b7 Kenji, Sales',
                            app: 'HubSpot',
                            icon: 'hubspot',
                        },
                    ],
                },
                { from: 'via', text: 'Each one is with its owner and they have been told. The queue is empty.' },
                { from: 'via', done: '5 routed \u00b7 nothing waiting' },
            ],
        },
        {
            verb: 'Inventory management',
            subhead:
                'viaSocket watches what you have left, works out what needs reordering, and has the order ready before you run out.',
            job: 'Tell me when a product drops below 10 in stock and draft the reorder email.',
            accent: '#e0a800',
            chat: [
                {
                    from: 'you',
                    text: 'Tell me when a product drops below 10 in stock and draft the reorder email.',
                },
                { from: 'via', text: 'Three items are under their minimum after this morning\u2019s orders.' },
                {
                    from: 'via',
                    steps: [
                        {
                            text: 'Linen apron \u00b7 9 left, min 12 \u00b7 40 units',
                            app: 'Shopify',
                            icon: 'shopify',
                        },
                        {
                            text: 'Copper whisk \u00b7 6 left, min 10 \u00b7 25 units',
                            app: 'Shopify',
                            icon: 'shopify',
                        },
                        {
                            text: 'Cotton tea towel \u00b7 4 left, min 9 \u00b7 60 units',
                            app: 'Sheets',
                            icon: 'googlesheets',
                        },
                    ],
                },
                {
                    from: 'via',
                    text: 'Kumar & Sons have the order. At the current rate the apron stock lasts till Thursday.',
                },
                { from: 'via', done: 'Reorder list sent to Kumar & Sons \u00b7 Monday 9:02am' },
            ],
        },
    ],
};

/**
 * Section 3. One job, shown as the chat it actually is in the product.
 *
 * Two columns: the heading, the steps and a sidebar list of the jobs on the
 * left, like a chat app's own conversation list, with the chat card filling the
 * rest on the right. The counter and arrows sit under the sidebar list — under
 * the card on mobile, where the list becomes a horizontal chip row. Clicking a
 * sidebar row or chip selects that card exactly as the arrows do.
 */
export default function IndexShowcase({ apps }) {
    const frameRef = useRef(null);
    const [active, setActive] = useState(0);
    // One run of one card's conversation. Bumping it restarts that run from zero.
    const [runId, setRunId] = useState(0);
    const [paused, setPaused] = useState(false);
    const [live, setLive] = useState(false);
    const [reduced, setReduced] = useState(false);

    const iconMap = useMemo(() => buildIconMap(apps), [apps]);

    const cards = SHOWCASE.cards;
    const count = cards.length;
    const card = cards[active];
    const total = chatDuration(card.chat);

    /** Step by whole cards, restarting the story from zero either way. */
    const go = useCallback(
        (delta) => {
            setActive((a) => (((a + delta) % count) + count) % count);
            setRunId((n) => n + 1);
        },
        [count]
    );

    const select = useCallback((index) => {
        setActive(index);
        setRunId((n) => n + 1);
    }, []);

    // The section only runs while it is on screen.
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setLive(false);
            setReduced(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => setLive(entry.isIntersecting));
            },
            { threshold: 0.4 }
        );
        observer.observe(frame);
        return () => observer.disconnect();
    }, []);

    /**
     * What happens when a card's conversation ends. Only the advance pauses,
     * not the conversation itself: a card someone is looking at replays rather
     * than sitting finished and dead.
     */
    useEffect(() => {
        if (!live || reduced) return undefined;
        const timer = window.setTimeout(() => {
            if (paused) setRunId((n) => n + 1);
            else go(1);
        }, total * 1000);
        return () => window.clearTimeout(timer);
    }, [live, reduced, paused, total, runId, go]);

    const counter = (
        <span className="text-[13px] tabular-nums tracking-[0.08em] text-index-muted">
            {String(active + 1).padStart(2, '0')} <i className="not-italic opacity-50">{SHOWCASE.counterOf}</i>{' '}
            {String(count).padStart(2, '0')}
        </span>
    );

    /* Glass: the arrows do not sit on the card's own edges, so they read against
       whatever ground is behind them. */
    const ARROW =
        'grid h-11 w-11 flex-none place-items-center rounded-full border border-white/70 bg-white/45 text-index-ink shadow-[0_2px_10px_rgb(0_0_0/6%)] backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white/70';

    const arrows = (
        <span className="flex gap-2">
            <button type="button" className={ARROW} aria-label={SHOWCASE.prev} onClick={() => go(-1)}>
                <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" className={ARROW} aria-label={SHOWCASE.next} onClick={() => go(1)}>
                <ArrowRight size={16} aria-hidden="true" />
            </button>
        </span>
    );

    return (
        <section
            className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-index-showcase px-5 pb-14 pt-[104px] font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:pb-14"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
        >
            {/* Five rows on desktop: heading, the steps across both columns, then
                the list and the card side by side, then the foot. The steps earn
                a full-width row of their own — in the left column they were a
                vertical list stacked on another vertical list, and a reader could
                not tell the explanation from the navigation.

                Below 720 it is one column in source order, and the job list is
                swapped for a chip row. */}
            <div className="grid w-full grid-cols-1 items-start gap-6 min-[721px]:grid-cols-[minmax(268px,29%)_1fr] min-[721px]:gap-x-[clamp(32px,4vw,64px)] min-[721px]:gap-y-0 min-[721px]:[grid-template-rows:auto_auto_auto_auto_auto]">
                {/* The heading spans the grid now that the steps do. Confined to
                    the narrow column it wrapped to three lines with the
                    right-hand side of the row empty, which read as a column
                    header rather than the section's title. */}
                <h2 className="col-span-full m-0 mb-[22px] max-w-[18ch] font-index-display text-[clamp(34px,4vw,62px)] font-normal leading-[0.88] tracking-[-0.03em] min-[721px]:row-start-1 min-[900px]:tracking-[-0.06em]">
                    {SHOWCASE.heading}
                </h2>

                {/* The steps are the sub-head. A flex row sized to its content,
                    not three equal columns: split into thirds each step's text
                    filled about half its column and the three sat with a gulf
                    between them, which read as three separate statements rather
                    than one sequence. One column on a phone, where three across
                    would be three narrow columns of wrapped text. No rules on
                    them — the numerals do the separating. */}
                <ol className="col-span-full m-0 mb-[26px] mt-[18px] flex list-none flex-col flex-wrap gap-[13px] p-0 min-[721px]:row-start-2 min-[721px]:mb-[clamp(34px,3.8vw,52px)] min-[721px]:mt-0 min-[721px]:flex-row min-[721px]:gap-x-[clamp(22px,2.6vw,40px)] min-[721px]:gap-y-[clamp(12px,1.4vw,18px)]">
                    {SHOWCASE.steps.map((step, i) => (
                        <li key={step} className="flex items-start gap-[11px] min-[721px]:items-center">
                            {/* Outlined, not filled: three solid ink discs in
                                the line under the heading were three of the
                                darkest objects in the section and pulled ahead
                                of the words beside them. */}
                            <i
                                aria-hidden="true"
                                className="mt-px grid h-[23px] w-[23px] flex-none place-items-center rounded-full border border-[#c6cbbc] bg-none not-italic text-[12px] font-medium text-index-muted min-[721px]:mt-0"
                            >
                                {i + 1}
                            </i>
                            <span className="min-w-0 text-[15px] leading-[1.4] text-index-ink min-[721px]:text-base">
                                {step}
                            </span>
                        </li>
                    ))}
                </ol>

                <div className="flex min-w-0 flex-col min-[721px]:col-start-1 min-[721px]:row-start-3">
                    {/* The job list: a chat app's own conversation list. Hidden
                        below 721, where the chip row takes over. */}
                    <div className="hidden flex-col gap-[2px] min-[721px]:flex">
                        {cards.map((c, i) => (
                            <div
                                className="group/row relative flex flex-col"
                                key={c.verb}
                                data-active={i === active ? 'true' : 'false'}
                            >
                                <button
                                    type="button"
                                    /* Only the open row is boxed — giving every
                                       row a card made six of them compete at
                                       once and the column read as clutter. The
                                       right padding is the arrow's seat, not
                                       decoration: less than it and the subhead
                                       runs underneath the disc. */
                                    className="flex w-full cursor-pointer items-start gap-3 rounded-[14px] border border-transparent bg-none py-[17px] pl-[18px] pr-[56px] text-left text-index-ink transition-[background-color,border-color] duration-200 ease-out hover:bg-white/50 data-[active=true]:border-index-line data-[active=true]:bg-index-paper"
                                    data-active={i === active ? 'true' : 'false'}
                                    aria-current={i === active}
                                    onClick={() => select(i)}
                                >
                                    <span className="min-w-0">
                                        <span className="block text-[18px] font-medium leading-[1.3]">{c.verb}</span>
                                        {i === active && (
                                            <span className="mt-1 block text-[14px] leading-[1.45] text-index-muted">
                                                {c.subhead}
                                            </span>
                                        )}
                                    </span>
                                </button>
                                {/* A SIBLING of the row laid over its right
                                    edge, not a child: an anchor inside a button
                                    is invalid and neither control would work.
                                    The row selects; the arrow starts that job.

                                    Only the open category carries it: a
                                    start-this-job control on a collapsed row
                                    offers to start a job the reader cannot see.
                                    Present at all times on that row, because a
                                    control that appears on hover is invisible
                                    until the reader has already found it. */}
                                <a
                                    className="invisible absolute right-[14px] top-1/2 z-[2] grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-index-ink text-index-paper opacity-0 shadow-[0_1px_2px_rgb(20_32_31/16%)] transition-[opacity,transform,box-shadow] duration-[180ms] ease-out focus-visible:visible focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-index-ink group-data-[active=true]/row:visible group-data-[active=true]/row:opacity-100 group-data-[active=true]/row:hover:scale-110 group-data-[active=true]/row:hover:shadow-[0_4px_10px_rgb(20_32_31/24%)] group-data-[active=true]/row:active:scale-95"
                                    href={buildSignupHref(INDEX_UTM_SOURCE)}
                                    onClick={() => {
                                        carryPromptToSignup(c.job);
                                        trackSignupClick(INDEX_UTM_SOURCE, {
                                            element: 'index_showcase_row',
                                            label: c.verb,
                                        });
                                    }}
                                    aria-label={`${SHOWCASE.open}: ${c.verb}`}
                                >
                                    <ArrowUpRight size={15} aria-hidden="true" />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Chips first, then the handoff. In source order the "see
                        more" link follows the job list, which is right on
                        desktop; with the list swapped for the chip row it ends
                        up above the thing it follows, so the two are reordered.

                        It scrolls, but the bar is hidden: a visible scrollbar
                        under six chips reads as a broken edge, and the chips
                        already overflow the frame visibly enough to say they
                        continue. */}
                    <div className="order-1 flex gap-2 overflow-x-auto pb-[2px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[721px]:hidden">
                        {cards.map((c, i) => (
                            <button
                                type="button"
                                key={c.verb}
                                className="flex-none whitespace-nowrap rounded-full border border-index-line bg-index-paper px-[14px] py-2 text-[14px] text-index-ink transition-[background-color,color,border-color] duration-200 ease-out data-[active=true]:border-index-ink data-[active=true]:bg-index-ink data-[active=true]:text-index-paper"
                                data-active={i === active ? 'true' : 'false'}
                                aria-current={i === active}
                                onClick={() => select(i)}
                            >
                                {c.verb}
                            </button>
                        ))}
                    </div>

                    {/* Says the cards are a sample and hands off to the wall.
                        Quiet on purpose: a way onward, not a second CTA
                        competing with the per-row arrows beside it. */}
                    <a
                        className="order-2 mt-5 inline-flex w-max items-center gap-[7px] border-b border-index-line pb-[2px] text-[14.5px] text-index-muted transition-[color,border-color] duration-[180ms] hover:border-index-ink hover:text-index-ink min-[721px]:order-none min-[721px]:mt-[18px]"
                        href="#use-cases"
                    >
                        {SHOWCASE.more}
                        <ArrowDown size={14} aria-hidden="true" />
                    </a>
                </div>

                {/* The counter is its own grid row, outside the column the card
                    is measured against, so the card finishes level with the list
                    rather than with the counter. Hidden below 721, where it
                    repeats under the card instead. */}
                <div className="hidden items-center justify-between gap-4 min-[721px]:col-start-1 min-[721px]:row-start-4 min-[721px]:mt-[22px] min-[721px]:flex">
                    {counter}
                    {arrows}
                </div>

                {/* Column, not row: the frame holds the card AND the mobile
                    counter row, so a flex row would lay the two side by side and
                    squeeze the card. */}
                <div
                    className="flex min-h-0 w-full min-w-0 flex-col min-[721px]:col-start-2 min-[721px]:row-start-3 min-[721px]:row-end-5 min-[721px]:self-start"
                    ref={frameRef}
                    role="region"
                    aria-label={SHOWCASE.region}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            go(1);
                        }
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            go(-1);
                        }
                    }}
                >
                    <IndexChatStage key={active} card={card} live={live && !reduced} runId={runId} iconMap={iconMap} />

                    <div className="mt-4 flex items-center justify-between gap-4 min-[721px]:hidden">
                        {counter}
                        {arrows}
                    </div>
                </div>
            </div>
        </section>
    );
}
