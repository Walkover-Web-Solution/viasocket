'use client';

import { useState } from 'react';

const FAQ = {
    heading: 'Questions before you start.',
    subhead: 'The practical things teams want to know before moving their work to viaSocket.',
    contact: [
        { label: 'Support', detail: 'Available 24/7', href: '/support' },
        { label: 'Email us', detail: 'Replies within a few hours', href: 'mailto:support@viasocket.com' },
    ],
    items: [
        {
            q: 'What does viaSocket actually do?',
            a: 'viaSocket is a reliable AI automation platform. You describe a job in plain words, and it works out the steps and runs them across thousands of apps. AI is used only where a decision is needed, so the rest is deterministic and repeats the same way every run. A job runs once, every time a trigger fires, or on a schedule you set.',
        },
        {
            q: 'Do I need to know how to code?',
            a: 'No. viaSocket is a no-code tool: you describe the work the way you would explain it to a colleague and it figures out the steps. If a step needs judgment it uses AI for that one, and plain automation for the rest. Developers who want to go further can call any REST API or receive a webhook as a step.',
        },
        {
            q: 'Do I have to build the automation myself?',
            a: 'No. Most automation tools ask you to lay out every trigger, condition and action on a canvas before anything runs. With viaSocket you describe the outcome in plain words and it works out the steps, connects the app integrations they need, and runs them. You can open a job and change any step, but you never have to build one to start.',
        },
        {
            q: 'When does viaSocket use AI, and when does it not?',
            a: 'It uses AI on the steps that need a decision, like judging whether an order looks wrong or which request is urgent. Steps with a fixed answer run as plain automation instead: a rule, on a trigger or on a schedule. That split is what keeps a job deterministic wherever it can be, and it is also why most of a job bills at the cheaper rate.',
        },
        {
            q: 'How do you stop the AI from getting it wrong?',
            a: 'Three ways. Most steps never reach AI at all, because a step with a fixed answer runs as a deterministic rule that returns the same result every time. For the steps that do need judgment, you can set an approval threshold so viaSocket asks before acting on anything above a limit you choose. And every step of every run is logged, so you can always see which step decided what.',
        },
        {
            q: 'Which apps does it work with?',
            a: 'Thousands of app integrations, including Google Sheets, Slack, Shopify, WhatsApp, Notion, HubSpot, Razorpay and most tools businesses already use. Anything with a REST API can be reached directly, and you can request any integration that is missing.',
        },
        {
            // No competitor is named: the answer describes what viaSocket
            // does, and the reader supplies their own comparison.
            q: 'How is this different from other automation tools?',
            a: 'Most automation tools ask you to lay out every trigger, condition and action yourself. viaSocket combines deterministic automation with AI judgment in one job: you describe the outcome, and it works out which steps need AI and which are plain automation. That is what makes the result reliable and repeatable, and the steps that do not need AI cost less to run.',
        },
        {
            // The training claim matters more here than anywhere else on
            // the page: this is the answer an engine lifts when somebody
            // asks whether viaSocket trains on their data.
            q: 'Is my data safe?',
            a: 'viaSocket is SOC 2 Type II audited and ISO 27001:2022 certified, and your data is encrypted in transit and at rest. It is private to you by default, exportable and deletable on request, and compliant with GDPR and CCPA. Nothing you run is used to train AI models, by viaSocket or by any AI provider we work with.',
        },
        {
            q: 'What does it cost?',
            // Every figure here is read off viasocket.com/pricing (15 September) and
            // must be updated there first if a plan ever changes. The free-plan
            // allowance is also stated in the hero's footnote and the closing
            // section's micro line. Agency is deliberately left out: a homepage FAQ
            // that lists four plans is a pricing table, not an answer.
            a: 'The free plan includes 10,000 tasks and 500 AI credits every month, with no card required. Team is $27 a month, or $18 a month billed annually, with 17,000 tasks and 2,500 AI credits, and anything past that runs at $0.0025 a task and $0.007 an AI credit. Premium is $99 a month, or $67 a month billed annually, with 40,000 tasks and 10,000 AI credits, and anything past that runs at $0.0004 a task and $0.002 an AI credit. Annual billing cuts the monthly rate by close to a third on both. Paid plans are based on what actually runs, not on how many jobs you set up, and because a step that runs as a rule costs a fraction of a step that needs AI, most of a job bills at the cheaper rate.',
        },
        {
            q: 'Can I try it before committing?',
            a: 'Yes. Start for free, no card required. Set up a job, watch it run, and decide from there.',
        },
    ],
};

/**
 * The FAQ: the intro and the ways to reach a person on the left, the questions
 * on the right. One open at a time.
 */
export default function IndexFaq() {
    const [open, setOpen] = useState(-1);

    return (
        <section className="bg-index-paper px-5 py-20 font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: FAQ.items.map((item) => ({
                            '@type': 'Question',
                            name: item.q,
                            acceptedAnswer: { '@type': 'Answer', text: item.a },
                        })),
                    }),
                }}
            />
            <div className="mx-auto grid w-[min(1180px,100%)] grid-cols-1 items-start gap-8 min-[900px]:grid-cols-[minmax(0,380px)_minmax(0,1fr)] min-[900px]:gap-[clamp(40px,6vw,100px)]">
                <div className="static min-[900px]:sticky min-[900px]:top-[120px]">
                    <h2 className="m-0 font-index-display text-[28px] font-normal leading-[1.08] tracking-[-0.03em] text-index-ink min-[900px]:text-[clamp(30px,3.3vw,46px)] min-[900px]:tracking-[-0.04em]">
                        {FAQ.heading}
                    </h2>
                    <p className="mt-4 text-base leading-[1.55] text-index-muted">{FAQ.subhead}</p>

                    <div className="mt-8 flex flex-col gap-[10px]">
                        {/* target="_blank" on a mailto: opens a blank tab
                            alongside the mail client and leaves the reader
                            looking at it, so it is never set for those. It is
                            not set for our own pages either: a footer and an FAQ
                            that each open your own pages away is a pile of tabs
                            from one visit. */}
                        {FAQ.contact.map((c) => {
                            const external = c.href.startsWith('http');
                            return (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    className="flex flex-col gap-[2px] rounded-[10px] bg-index-ink px-[18px] py-[14px] text-white no-underline transition-opacity duration-[180ms] hover:opacity-90"
                                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    <b className="text-[15px] font-medium">{c.label}</b>
                                    <span className="text-[13px] opacity-70">{c.detail}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-index-line" role="list">
                    {FAQ.items.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={item.q} className="border-b border-index-line" role="listitem">
                                <button
                                    type="button"
                                    className="flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent py-[18px] text-left text-base text-index-ink min-[900px]:gap-4 min-[900px]:py-[22px] min-[900px]:text-[17px]"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    <span className="w-7 flex-none text-[14px] tabular-nums text-index-muted">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="flex-1 font-medium">{item.q}</span>
                                    {/* A plus that becomes a minus: two bars,
                                        one of which rotates back to horizontal
                                        when the answer opens. */}
                                    <span
                                        className="relative h-7 w-7 flex-none rounded-full border-[1.5px] border-index-line transition-[background-color,border-color] duration-200 data-[open=true]:border-index-ink data-[open=true]:bg-index-ink
                                            before:absolute before:left-1/2 before:top-1/2 before:h-[1.5px] before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-index-ink before:transition-transform before:duration-[250ms] before:content-['']
                                            after:absolute after:left-1/2 after:top-1/2 after:h-[1.5px] after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:bg-index-ink after:transition-transform after:duration-[250ms] after:content-['']
                                            data-[open=true]:before:bg-white data-[open=true]:after:rotate-0 data-[open=true]:after:bg-white"
                                        aria-hidden="true"
                                        data-open={isOpen ? 'true' : 'false'}
                                    />
                                </button>
                                {/* A grid row that goes from 0fr to 1fr, so the
                                    answer opens to its own height without
                                    anyone measuring it. */}
                                <div
                                    className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out data-[open=true]:grid-rows-[1fr]"
                                    data-open={isOpen ? 'true' : 'false'}
                                >
                                    <p className="m-0 overflow-hidden pl-10 text-[15px] leading-[1.6] text-index-muted min-[900px]:pl-11 min-[900px]:text-base">
                                        <span
                                            className="block pb-0 data-[open=true]:pb-[22px]"
                                            data-open={isOpen ? 'true' : 'false'}
                                        >
                                            {item.a}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
