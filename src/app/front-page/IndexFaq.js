'use client';

import { useState } from 'react';
import { FAQ } from './content';

/**
 * The FAQ: the intro and the ways to reach a person on the left, the questions
 * on the right. One open at a time.
 */
export default function IndexFaq() {
    const [open, setOpen] = useState(-1);

    return (
        <section className="bg-index-paper px-5 py-20 font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:py-24">
            {/* FAQPage schema is generated in ./seo.js from this same FAQ
                object and rendered once, page-wide, in page.js. */}
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
