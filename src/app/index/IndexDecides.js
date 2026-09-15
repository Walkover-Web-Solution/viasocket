'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, trackSignupClick } from './signup';
import { useTimeline, on, onAll } from './story';

const DECIDES = {
    // "Not every step needs AI." is a sentence the reader can nod at on
    // sight, and the three rows under it are then the demonstration rather
    // than the explanation. It also carries the positioning: the
    // interesting claim here is the restraint, not the capability.
    headingLines: ['Not every step needs AI.'],
    // An explanation, not a slogan: uses AI when it is needed, skips it
    // when it is not. One sentence, both halves of the rule, and the rows
    // underneath are then the evidence rather than more assertions.
    //
    // This is one of the few places 'AI' is allowed on the page, and it is
    // the right one: the word is rationed to the exact points where AI is
    // doing the judging, which is precisely what this section is about.
    sub: 'viaSocket uses AI on the steps that need it, and skips it on the ones that do not.',
    rows: [
        {
            sentence: 'When payment arrives, mark the invoice paid.',
            why: 'a rule',
            tag: 'Automation',
            kind: 'tick',
        },
        {
            sentence: 'Decide whether this order needs a human review.',
            why: 'a judgment',
            tag: 'AI',
            kind: 'sparkles',
        },
        {
            sentence: 'Every Monday at 9, send me the week\u2019s numbers.',
            why: 'a schedule',
            tag: 'Automation',
            kind: 'tick',
        },
    ],
    /**
     * What the split buys, under the evidence for it. The rows show which
     * steps take AI and which do not; these three say what the reader gets
     * for it. After the rows rather than in the lead, so they read as a
     * conclusion drawn from three examples and not as a fourth assertion.
     *
     * They are in causal order and that order is the argument: rules are
     * deterministic, which is what makes a job reliable, which is also why
     * it costs less. Read as a list they are three features; read left to
     * right they are one chain.
     *
     * No number is stated, so the pricing page can move without this going
     * stale.
     */
    payoffs: [
        { term: 'Deterministic', line: 'Same input, same result, every run.' },
        { term: 'Reliable', line: 'A job that ran yesterday runs the same today.' },
        { term: 'Smaller bill', line: 'A rule costs a fraction of an AI step.' },
    ],
    action: 'Just tell it what you need',
};

/**
 * How it decides. The reliability positioning needs the claim that viaSocket
 * itself decides which of a job's steps are automation and which need a model
 * to think — not the reader.
 *
 * Shaped like the rest of the page: a claim on the left, the evidence as cards.
 * Rows reveal once, in order, when the section is first seen, then rest. The
 * heading is static: it is the section's claim, not a demonstration.
 */

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

const TOTAL = 2;

export default function IndexDecides() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const live = useReveal(sectionRef);

    const reset = useCallback((stage) => onAll(stage, '.decides-row', false), []);
    const finish = useCallback((stage) => onAll(stage, '.decides-row', true), []);
    const steps = useCallback((stage) => {
        const rows = Array.from(stage.querySelectorAll('.decides-row'));
        return rows.map((row, i) => [i * 0.4, () => on(row)]);
    }, []);

    useTimeline({ live, runId: 0, stageRef, reset, finish, steps, total: TOTAL });

    const actionHref = buildSignupHref(INDEX_UTM_SOURCE);

    return (
        <section
            className="flex flex-col items-center justify-start bg-index-paper px-5 py-[62px] font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:py-[76px]"
            ref={sectionRef}
            aria-labelledby="decides-heading"
        >
            {/* Stacked, not two columns. The heading is the section's whole
                claim, and in a narrow column it capped at 32px: the smallest
                heading on the page, under the one argument that has to land. The
                section stays narrow; the heading gets the width of it. */}
            <div className="w-[min(880px,100%)]">
                <div className="grid grid-cols-1 items-start gap-8 min-[900px]:gap-10">
                    <div className="flex flex-col items-start">
                        {/* Rendered from the array rather than a hard-coded
                            pair, so any number of lines works and the second
                            and later ones take the quieter italic. */}
                        <h2
                            id="decides-heading"
                            className="m-0 font-index-display text-[clamp(32px,4.2vw,56px)] font-normal leading-[1.04] tracking-[-0.03em] text-index-ink min-[900px]:tracking-[-0.04em] [&_i]:not-italic [&_i]:text-[#8a9a8e]"
                        >
                            {DECIDES.headingLines.map((line, i) => (
                                <Fragment key={line}>
                                    {i > 0 && <br />}
                                    {i === 0 ? line : <i>{line}</i>}
                                </Fragment>
                            ))}
                        </h2>

                        <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-index-muted">{DECIDES.sub}</p>

                        <a
                            className="mt-[22px] inline-flex w-max items-center gap-[3px] border-0 border-b border-index-ink bg-none pb-[3px] text-[15px] text-index-ink transition-[gap] duration-200 hover:gap-2"
                            href={actionHref}
                            onClick={() =>
                                trackSignupClick(INDEX_UTM_SOURCE, {
                                    element: 'index_decides_action',
                                    label: DECIDES.action,
                                    destinationUrl: actionHref,
                                })
                            }
                        >
                            {DECIDES.action} <ArrowUpRight aria-hidden="true" size={17} />
                        </a>
                    </div>

                    <div className="flex min-w-0 flex-col gap-[10px]" ref={stageRef}>
                        {DECIDES.rows.map((row) => (
                            <div
                                key={row.sentence}
                                /* `decides-row` carries no styles: it is the
                                   handle the reveal timeline uses. */
                                className="decides-row flex translate-y-[8px] flex-col items-start justify-between gap-[10px] rounded-[12px] border border-index-line bg-white px-5 py-[18px] opacity-0 transition-[opacity,transform] duration-[400ms] ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100 motion-reduce:transition-none min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-4"
                                data-on="false"
                            >
                                <div className="min-w-0">
                                    {/* Sans, not the display serif: at this size
                                        the serif closes its counters, and these
                                        three sentences are the ones a reader has
                                        to scan. */}
                                    <p className="m-0 font-index-sans text-[20px] font-medium leading-[1.25] tracking-[-0.012em] text-index-ink min-[900px]:text-2xl">
                                        {row.sentence}
                                    </p>
                                    <p className="mt-[6px] text-[13.5px] text-index-muted">{row.why}</p>
                                </div>
                                {/* A pale chip for the deterministic side and
                                    ink for the AI side. Saturated colour here
                                    would be the loudest thing anywhere on the
                                    page, inside a section otherwise made of
                                    paper and ink. */}
                                <span
                                    className={`inline-flex flex-none items-center gap-[6px] self-start rounded-full px-3 py-[6px] font-index-sans text-[13px] tracking-[0.02em] min-[900px]:self-auto ${
                                        row.kind === 'tick'
                                            ? 'bg-[#eef2e7] text-index-ink'
                                            : 'bg-index-ink text-index-paper'
                                    }`}
                                >
                                    {row.tag}
                                    {row.kind === 'tick' ? (
                                        <Check aria-hidden="true" size={14} />
                                    ) : (
                                        <Sparkles aria-hidden="true" size={13} />
                                    )}
                                </span>
                            </div>
                        ))}

                        {/* What the split buys, under the evidence for it. Not
                            boxed: bordered cards here would put three more boxes
                            directly under three boxed rows, and the eye would
                            have to resolve a second grid before reading a word.
                            One ink hairline per column instead — the oldest way
                            of saying "this heads that", and it gives the summary
                            a harder edge than the evidence, which is the right
                            way round.

                            A <dl> because that is what it is: three terms and
                            their definitions, which also gives a parser clean
                            pairs where a comma-spliced sentence did not. */}
                        <dl className="mt-[22px] grid grid-cols-1 gap-4 min-[900px]:mt-7 min-[900px]:grid-cols-3 min-[900px]:gap-[clamp(18px,2.4vw,38px)]">
                            {DECIDES.payoffs.map((payoff) => (
                                <div
                                    key={payoff.term}
                                    className="border-t border-index-ink pt-[11px] min-[900px]:pt-[13px]"
                                >
                                    {/* The term is the loud part. These three
                                        words are the positioning, and the whole
                                        reason this stopped being a sentence is
                                        so they can be read alone. */}
                                    <dt className="text-base font-medium tracking-[-0.01em] text-index-ink">
                                        {payoff.term}
                                    </dt>
                                    <dd className="m-0 mt-[6px] text-[14px] leading-[1.55] text-index-muted">
                                        {payoff.line}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
