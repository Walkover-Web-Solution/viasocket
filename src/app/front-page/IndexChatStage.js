'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { ArrowUpRight, Check, ClipboardList, Send } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';
import { useTimeline, on, onAll } from './story';
import IndexCardMark from './IndexCardMark';
import { resolveIcon } from './appIcons';

// The screen-reader name for the card's entry point; the card's own verb
// follows it. IndexShowcase states the same label on each job row.
const OPEN_LABEL = 'Start this job';
// What closes a completed step, in place of a tick: a tick per line reads as a
// task manager or a checklist, which is not what this is.
const STEP_DONE = 'done';

/**
 * The chat's own clock, in milliseconds: the ask types in at 28ms a character,
 * a 500ms pause, a 700ms typing indicator, viaSocket's line, its steps landing
 * 520ms apart, 400ms, then done, then a 5s hold.
 *
 * A second viaSocket line lands once the steps have: 600ms after the last step,
 * a 500ms typing indicator, then the line itself. It is just another text turn
 * in the data, identified at render time by coming after a steps turn.
 *
 * `chatDuration` and the `steps()` callback must move together: this is the
 * pure arithmetic, `steps()` is the same arithmetic wired to the DOM.
 */
const TYPE_MS = 28;
const TYPE_PAUSE = 500;
const INDICATOR_MS = 700;
const STEP_GAP = 520;
const STEP_TO_DONE = 400;
const AFTER_GAP = 600;
const AFTER_TYPING = 500;
const HOLD_MS = 5000;
/** The beat between the ask finishing and it leaving the composer. */
const SEND_MS = 280;

export function chatDuration(chat) {
    const [youTurn, ...viaTurns] = chat;
    const askLen = youTurn?.text ? youTurn.text.length : 0;
    let t = (askLen * TYPE_MS + SEND_MS + TYPE_PAUSE + INDICATOR_MS) / 1000;
    let sawSteps = false;

    viaTurns.forEach((turn) => {
        if (turn.steps) {
            t += (turn.steps.length * STEP_GAP) / 1000;
            sawSteps = true;
        } else if (turn.done) {
            t += STEP_TO_DONE / 1000;
        } else if (sawSteps) {
            // The first text turn lands where the clock already is, free. A text
            // turn after the steps is the second message, and costs the wait
            // plus its own typing indicator.
            t += (AFTER_GAP + AFTER_TYPING) / 1000;
        }
    });

    return t + HOLD_MS / 1000;
}

/** The app a step ran in. 'form' is the one with no brand mark, so it is drawn. */
function StepApp({ icon, label, iconMap }) {
    const src = icon === 'form' ? null : resolveIcon(iconMap, icon, label);

    return (
        <span className="grid h-[18px] w-[18px] flex-none place-items-center" title={label}>
            {src ? (
                <Image
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                />
            ) : (
                <ClipboardList aria-hidden="true" className="h-[15px] w-[15px] text-[#7b857e]" />
            )}
            <span className="sr-only">{label}</span>
        </span>
    );
}

/**
 * One card's conversation. The whole card is what a reader actually sees in the
 * product: a chat. Header, message column, and a composer that is decorative but
 * not inert — the ask types into it and is sent from it on every run, so it
 * reads as playback rather than as an invitation. It is aria-hidden and cannot
 * be focused, clicked or tabbed to.
 *
 * IndexShowcase mounts exactly one of these at a time; there are no dormant
 * copies here.
 */
export default function IndexChatStage({ card, live, runId, iconMap, utmSource = INDEX_UTM_SOURCE }) {
    const stageRef = useRef(null);
    const [youTurn, ...viaTurns] = card.chat;
    const askText = youTurn?.text || '';

    /** The composer lives outside `.chat-body`, so it is reached from the card. */
    const composerOf = (stage) => stage.closest('.showcase-card');

    const reset = useCallback((stage) => {
        on(stage.querySelector('.chat-row-you'), false);
        const youText = stage.querySelector('.chat-you-text');
        if (youText) youText.textContent = '';
        on(stage.querySelector('.chat-row-via'), false);
        onAll(stage, '.chat-typing', false);
        onAll(stage, '.chat-via-col > [data-vi]', false);
        onAll(stage, '.chat-via-text', false);
        onAll(stage, '.chat-step', false);

        const cardEl = composerOf(stage);
        const draft = cardEl?.querySelector('.chat-composer-text');
        if (draft) draft.textContent = '';
        on(cardEl?.querySelector('.chat-caret'), false);
        on(cardEl?.querySelector('.chat-composer-send'), false);

        // Back to the top. Opacity does not change the body's scrollHeight, so
        // without this a card that had scrolled on a phone began its next run
        // parked at the empty end of the conversation.
        stage.scrollTop = 0;
    }, []);

    const finish = useCallback(
        (stage) => {
            on(stage.querySelector('.chat-row-you'), true);
            const youText = stage.querySelector('.chat-you-text');
            if (youText) youText.textContent = askText;
            on(stage.querySelector('.chat-row-via'), true);
            onAll(stage, '.chat-typing', false);
            onAll(stage, '.chat-via-col > [data-vi]', true);
            onAll(stage, '.chat-via-text', true);
            onAll(stage, '.chat-step', true);

            // The resting state is a sent message and an empty composer, which is
            // what the card looks like after the exchange rather than mid-way
            // through it.
            const cardEl = composerOf(stage);
            const draft = cardEl?.querySelector('.chat-composer-text');
            if (draft) draft.textContent = '';
            on(cardEl?.querySelector('.chat-caret'), false);
            on(cardEl?.querySelector('.chat-composer-send'), false);
            stage.scrollTop = stage.scrollHeight;
        },
        [askText]
    );

    const steps = useCallback(
        (stage) => {
            const plan = [];
            const rowYou = stage.querySelector('.chat-row-you');
            const youText = stage.querySelector('.chat-you-text');
            const cardEl = composerOf(stage);
            const draft = cardEl?.querySelector('.chat-composer-text') ?? null;
            const caret = cardEl?.querySelector('.chat-caret') ?? null;
            const sendBtn = cardEl?.querySelector('.chat-composer-send') ?? null;
            const rowVia = stage.querySelector('.chat-row-via');
            const indicator = stage.querySelector('.chat-typing:not(.chat-typing-after)');
            const afterIndicator = stage.querySelector('.chat-typing-after');
            const viaBlocks = Array.from(stage.querySelectorAll('.chat-via-col > [data-vi]'));
            const scroll = () => {
                stage.scrollTop = stage.scrollHeight;
            };

            let t = 0;

            // The ask is typed into the composer, then sent. Typing it where a
            // person would actually type it makes the section's own heading
            // literal: you describe the work, then viaSocket does it.
            plan.push([
                t,
                () => {
                    on(caret, true);
                    scroll();
                },
            ]);

            // Typing is continuous, but the timeline is a list of one-shot
            // steps, so it is one step per character revealed.
            for (let c = 1; c <= askText.length; c += 1) {
                plan.push([
                    t + (c * TYPE_MS) / 1000,
                    () => {
                        if (draft) draft.textContent = askText.slice(0, c);
                    },
                ]);
            }
            t += (askText.length * TYPE_MS) / 1000;
            plan.push([t, () => on(caret, false)]);

            // The send: the composer empties and the same words land as the bubble.
            t += SEND_MS / 1000;
            plan.push([
                t,
                () => {
                    if (draft) draft.textContent = '';
                    if (youText) youText.textContent = askText;
                    on(rowYou, true);
                    on(sendBtn, true);
                    scroll();
                },
            ]);
            // The button's lit state is a flash, not a mode.
            plan.push([t + 0.34, () => on(sendBtn, false)]);

            t += TYPE_PAUSE / 1000;
            plan.push([
                t,
                () => {
                    on(rowVia, true);
                    on(indicator, true);
                    scroll();
                },
            ]);
            t += INDICATOR_MS / 1000;
            plan.push([t, () => on(indicator, false)]);

            let sawSteps = false;
            viaTurns.forEach((turn, vi) => {
                const block = viaBlocks[vi];

                if (turn.steps) {
                    sawSteps = true;
                    const stepEls = block ? Array.from(block.querySelectorAll('.chat-step')) : [];
                    turn.steps.forEach((_, si) => {
                        t += STEP_GAP / 1000;
                        plan.push([
                            t,
                            () => {
                                on(block, true);
                                on(stepEls[si], true);
                                scroll();
                            },
                        ]);
                    });
                } else if (turn.done) {
                    t += STEP_TO_DONE / 1000;
                    plan.push([
                        t,
                        () => {
                            on(block, true);
                            scroll();
                        },
                    ]);
                } else if (sawSteps) {
                    // The second message: a wait, its own typing indicator, then
                    // it lands.
                    t += AFTER_GAP / 1000;
                    plan.push([
                        t,
                        () => {
                            on(afterIndicator, true);
                            scroll();
                        },
                    ]);
                    t += AFTER_TYPING / 1000;
                    plan.push([
                        t,
                        () => {
                            on(afterIndicator, false);
                            on(block, true);
                            on(block?.querySelector('.chat-via-text'), true);
                            scroll();
                        },
                    ]);
                } else {
                    // The first message lands where the clock already is.
                    plan.push([
                        t,
                        () => {
                            on(block, true);
                            on(block?.querySelector('.chat-via-text'), true);
                            scroll();
                        },
                    ]);
                }
            });

            return plan;
        },
        [askText, viaTurns]
    );

    useTimeline({ live, runId, stageRef, reset, finish, steps, total: chatDuration(card.chat) });

    let sawSteps = false;

    return (
        <div
            /* One fixed height for all the cards, and it has to be fixed:
               letting a card size to its own content meant it changed height as
               you moved between categories, so the counter row and everything
               below it jumped on every click. The vw term is inverse — as the
               viewport narrows the chat column narrows with it and the same
               conversation needs more lines, so the box has to grow as the
               screen shrinks.

               Stacked, the card has no list to match, so it takes a height of
               its own: at phone widths the bubbles wrap enough that no sane
               height holds the whole exchange, so it stops trying and reads as a
               window onto a conversation instead of eating the screen.

               `showcase-card` carries no styles: it is the handle the timeline
               uses to reach the composer from the message column. */
            className="showcase-card relative flex h-[min(82vh,668px)] w-full animate-index-card-in flex-col overflow-hidden rounded-[20px] border border-index-line bg-index-paper shadow-index-card motion-reduce:animate-none min-[721px]:h-[clamp(530px,calc(530px+(1440px-100vw)*0.16),650px)]"
            style={{ '--accent': card.accent }}
        >
            <div className="relative z-[1] flex h-[46px] flex-none items-center gap-[10px] border-b border-index-line bg-index-paper px-[18px]">
                <span className="h-[22px] w-[22px] flex-none text-index-ink" aria-hidden="true">
                    <IndexCardMark />
                </span>
                <span className="text-[15px] font-medium text-index-ink">viaSocket</span>
                <span className="ml-auto rounded-full border border-index-line bg-transparent px-[13px] py-[5px] text-[13px] font-medium text-index-muted">
                    {card.verb}
                </span>
                {/* Mobile only. On desktop the entry point is an arrow on each
                    job row; the list collapses to chips below 721, and without
                    this a phone has no way into the card at all. */}
                <a
                    className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full border border-index-line bg-transparent text-index-ink transition-colors duration-200 ease-out min-[721px]:hidden"
                    href={buildSignupHref(utmSource)}
                    onClick={() => {
                        carryPromptToSignup(card.job);
                        trackSignupClick(utmSource, {
                            element: 'index_showcase_card',
                            label: card.verb,
                        });
                    }}
                    aria-label={`${OPEN_LABEL}: ${card.verb}`}
                >
                    <ArrowUpRight size={16} aria-hidden="true" />
                </a>
            </div>

            {/* The conversation is anchored to the top and the body does not
                scroll on desktop. Centring a block whose height changes moves it:
                the typing indicator alone produced dozens of pixels of travel in
                one run. The composer closes the bottom, so whatever room is left
                sits between them — which in a chat is simply room to say more.

                On a phone the conversation is genuinely taller than the card, so
                it still has to travel; smooth scrolling makes that one
                continuous advance rather than a jump. */}
            <div
                className="chat-body flex min-h-0 flex-1 flex-col overflow-hidden scroll-smooth px-[15px] py-[13px] motion-reduce:scroll-auto min-[721px]:px-5 min-[721px]:py-[10px]"
                ref={stageRef}
            >
                {/* The ask and the answer are one block, so the pair can be
                    centred in the body as a unit rather than each pinned to the top. */}
                <div className="m-0 flex w-full flex-col gap-3">
                    <div
                        className="chat-row-you flex translate-y-[6px] justify-end opacity-0 transition-[opacity,transform] duration-300 ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none"
                        data-on="false"
                    >
                        <div className="max-w-[78%] whitespace-pre-wrap break-words rounded-[18px] rounded-br-[6px] bg-[color-mix(in_srgb,var(--accent)_10%,#f7f7f2)] px-[14px] py-[10px] text-base leading-[1.4] text-index-ink min-[721px]:text-[17px]">
                            <span className="chat-you-text" />
                        </div>
                    </div>

                    {/* A clear beat between the ask and the answer: the body's
                        own gap read as one block of conversation rather than two
                        turns. */}
                    <div
                        className="chat-row-via mt-[10px] flex translate-y-[6px] items-start justify-start gap-[10px] opacity-0 transition-[opacity,transform] duration-300 ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none"
                        data-on="false"
                    >
                        <span className="mt-[2px] h-[22px] w-[22px] flex-none text-index-ink" aria-hidden="true">
                            <IndexCardMark />
                        </span>
                        <div className="chat-via-col relative flex max-w-[78%] min-w-0 flex-col gap-[10px]">
                            {/* Out of the flow when off, and adding no height
                                when on. The first indicator precedes a sibling
                                block, so it comes out of the column's flow and
                                sits over where that block's first line appears:
                                the dots give way to the words in place. The two
                                are never both on — the indicator is switched off
                                in the same step that turns the text on. */}
                            <div
                                className="chat-typing absolute left-0 top-0 hidden h-[22px] items-center gap-1 data-[on=true]:flex"
                                data-on="false"
                                aria-hidden="true"
                            >
                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted motion-reduce:animate-none" />
                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted [animation-delay:0.15s] motion-reduce:animate-none" />
                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted [animation-delay:0.3s] motion-reduce:animate-none" />
                            </div>

                            {viaTurns.map((turn, i) => {
                                if (turn.steps) {
                                    sawSteps = true;
                                    return (
                                        <div className="flex flex-col gap-[9px]" data-vi={i} key={i}>
                                            {turn.steps.map((step, si) => (
                                                <div
                                                    className="chat-step flex translate-y-[4px] items-center gap-[9px] border-t border-[#edefe8] pt-[9px] text-[14.5px] text-index-ink opacity-0 transition-[opacity,transform] duration-[260ms] ease-out first:border-t-0 first:pt-0 data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none min-[721px]:text-[15px]"
                                                    data-on="false"
                                                    key={si}
                                                >
                                                    {/* The app the work happened in, in place of a
                                                        tick: a tick per line reads as a task manager.
                                                        The icon says where it ran, and `done` closes it.
                                                        Lines that are findings rather than actions keep
                                                        the indent so the column stays straight. */}
                                                    {step.app ? (
                                                        <StepApp icon={step.icon} label={step.app} iconMap={iconMap} />
                                                    ) : (
                                                        <span
                                                            className="invisible h-[18px] w-[18px] flex-none"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                                        {step.text}
                                                    </span>
                                                    {/* Only what viaSocket DID is marked done. An
                                                        observation is not a task. The chip goes below
                                                        721, where it forces a second line on nearly
                                                        every row and the closing line already says how
                                                        many ran. */}
                                                    {step.app && (
                                                        <span className="ml-auto hidden flex-none rounded-full bg-[#e4f1e9] px-[9px] py-[3px] text-[10.5px] font-medium uppercase tracking-[0.07em] text-[#3f7a5c] min-[721px]:block">
                                                            {STEP_DONE}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }

                                if (turn.done) {
                                    return (
                                        <p
                                            className="chat-done m-0 flex translate-y-[4px] items-center gap-[7px] text-base font-medium text-[var(--accent)] opacity-0 transition-[opacity,transform] duration-300 ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none min-[721px]:text-[15px] [&>svg]:h-[14px] [&>svg]:w-[14px] [&>svg]:flex-none"
                                            data-vi={i}
                                            data-on="false"
                                            key={i}
                                        >
                                            <Check aria-hidden="true" />
                                            {turn.done}
                                        </p>
                                    );
                                }

                                const isAfter = sawSteps;
                                return (
                                    /* A grid rather than a column, so the second
                                       indicator can be laid into the same cell
                                       as the line it precedes. */
                                    <div className="grid grid-cols-[minmax(0,1fr)] gap-[10px]" data-vi={i} key={i}>
                                        {isAfter && (
                                            <div
                                                className="chat-typing chat-typing-after col-start-1 row-start-1 hidden h-[22px] items-center gap-1 data-[on=true]:flex"
                                                data-on="false"
                                                aria-hidden="true"
                                            >
                                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted motion-reduce:animate-none" />
                                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted [animation-delay:0.15s] motion-reduce:animate-none" />
                                                <i className="h-[6px] w-[6px] animate-index-typing rounded-full bg-index-muted [animation-delay:0.3s] motion-reduce:animate-none" />
                                            </div>
                                        )}
                                        <p
                                            className="chat-via-text col-start-1 row-start-1 m-0 translate-y-[4px] text-base leading-[1.4] text-index-ink opacity-0 transition-[opacity,transform] duration-[280ms] ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none min-[721px]:text-[17px]"
                                            data-on="false"
                                        >
                                            {turn.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Inert by construction, not by styling: pointer-events plus
                aria-hidden mean it cannot be clicked, focused or tabbed to. The
                ask types into it and is sent from it on every run, so it reads
                as playback rather than as an invitation. The send button is ink
                rather than the accent, which was the only saturated fill in the
                section and the thing that made it read as the live control. */}
            <div
                className="flex h-[54px] flex-none select-none items-center gap-[10px] border-t border-index-line px-4 [pointer-events:none]"
                aria-hidden="true"
            >
                <div className="flex h-[38px] min-w-0 flex-1 items-center gap-px overflow-hidden whitespace-nowrap rounded-full border border-index-line bg-index-paper px-[14px] text-[14.5px] text-index-ink">
                    <span className="chat-composer-text overflow-hidden text-ellipsis" />
                    <span
                        className="chat-caret ml-px inline-block h-[1em] w-[2px] -translate-y-0 bg-current align-[-0.15em] opacity-0 data-[on=true]:animate-index-caret data-[on=true]:opacity-100 motion-reduce:data-[on=true]:animate-none"
                        data-on="false"
                    />
                </div>
                <div
                    className="chat-composer-send grid h-8 w-8 flex-none place-items-center rounded-full bg-index-ink text-index-paper opacity-40 transition-[opacity,transform] duration-[180ms] ease-out data-[on=true]:scale-110 data-[on=true]:opacity-100 motion-reduce:transition-none"
                    data-on="false"
                >
                    <Send size={15} />
                </div>
            </div>
        </div>
    );
}
