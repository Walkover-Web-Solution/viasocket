'use client';

import Image from 'next/image';
import { useState } from 'react';

const TRUST =
    /**
     * The trust band. A band, not a section: it clears the last objection
     * before the ask and then gets out of the way.
     *
     * The objection is one the repositioning created. When the page said
     * workflow automation the question was "does it work". This page says it
     * decides, and asks you when it is not sure, so the question becomes what
     * it can reach and who is accountable when it is wrong.
     *
     * Three cells, not six: observability, uptime and error recovery are real
     * features wearing a certificate's clothes, and beside SOC 2 a reader
     * averages the row down.
     */
    {
        heading: 'Your data, under the same controls you would ask for.',
        subhead:
            'Independently audited, certified to international security standards, and encrypted in transit and at rest.',
        cells: [
            {
                title: 'SOC 2 Type II',
                body: 'Audited by an independent firm on how your data is handled, stored and reached.',
            },
            {
                title: 'ISO 27001:2022',
                body: 'Certified against the international standard for managing information security.',
            },
            {
                title: 'GDPR and CCPA',
                body: 'Your data stays yours, exportable and deletable on request, in both jurisdictions.',
            },
        ],
    };

/** The certification seals. Rendered as supplied: the colour is theirs. */
const SEALS =
    /** The certification seals. Rendered as supplied: the colour is theirs. */
    [
        { name: 'AICPA SOC', src: 'https://stuff.thingsofbrand.com/viasocket.com/images/img8_image-28.png' },
        {
            name: 'ISO 27001:2022 Certified',
            src: 'https://stuff.thingsofbrand.com/viasocket.com/images/img2_image-29.png',
        },
    ];

/**
 * The trust band. A band, not a section: it clears the last objection before the
 * ask and then gets out of the way.
 *
 * Three cells, not six. Observability, uptime and error recovery are real
 * features wearing a certificate's clothes, and beside SOC 2 a reader averages
 * the row down.
 */
export default function IndexTrust() {
    /** A seal that will not load renders nothing rather than an empty frame. */
    const [broken, setBroken] = useState([]);

    return (
        <section className="bg-index-trust px-5 py-20 font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:py-24">
            <div className="mx-auto w-[min(1180px,100%)] rounded-[14px] border border-[#d5ddd2] bg-[#f2f5ed] p-5 min-[900px]:rounded-[18px] min-[900px]:px-[clamp(28px,3.4vw,48px)] min-[900px]:py-[clamp(36px,4vw,56px)]">
                <div className="mb-[22px] flex flex-col items-start justify-between gap-[18px] min-[900px]:mb-[clamp(28px,3vw,40px)] min-[900px]:flex-row min-[900px]:gap-[clamp(24px,4vw,56px)]">
                    <div>
                        <h2 className="m-0 max-w-none font-index-display text-[27px] font-normal leading-[1.04] tracking-[-0.03em] text-index-ink min-[900px]:max-w-[18ch] min-[900px]:text-[clamp(30px,3.3vw,48px)] min-[900px]:tracking-[-0.04em]">
                            {TRUST.heading}
                        </h2>
                        <p className="mt-[11px] max-w-none text-[15.5px] leading-[1.5] text-index-muted min-[900px]:mt-[14px] min-[900px]:max-w-[56ch] min-[900px]:text-[17px]">
                            {TRUST.subhead}
                        </p>
                    </div>

                    {/* Rendered as supplied: the colour is theirs, not a
                        decision of ours. Quiet, small, top right. */}
                    <div className="order-first flex flex-none items-center gap-[14px] min-[900px]:order-none">
                        {SEALS.map((seal) =>
                            broken.includes(seal.name) ? null : (
                                <Image
                                    key={seal.name}
                                    src={seal.src}
                                    alt={seal.name}
                                    width={60}
                                    height={60}
                                    loading="lazy"
                                    className="h-12 w-12 object-contain min-[900px]:h-[54px] min-[900px]:w-[54px]"
                                    onError={() => setBroken((b) => [...b, seal.name])}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-[10px] min-[900px]:grid-cols-3 min-[900px]:gap-[14px]">
                    {TRUST.cells.map((cell) => (
                        <div
                            key={cell.title}
                            className="rounded-[14px] border border-[#d5ddd2] bg-index-paper px-[17px] py-[15px] min-[900px]:px-[clamp(18px,2vw,26px)] min-[900px]:py-[clamp(18px,1.9vw,24px)]"
                        >
                            <h3 className="mb-[6px] mt-0 text-[15px] font-medium tracking-[-0.005em] text-index-ink min-[900px]:mb-[9px] min-[900px]:text-base">
                                {cell.title}
                            </h3>
                            <p className="m-0 text-[14px] leading-[1.5] text-index-muted min-[900px]:text-[14.5px] min-[900px]:leading-[1.55]">
                                {cell.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
