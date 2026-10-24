import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { BASE_PROMPT } from './copy';
import { CopyPromptProvider } from './CopyPrompt';
import { SiteFooter, SiteHeader } from './SiteChrome';
import { serializeJsonLd } from '@/utils/jsonLd';

// Shared by /pricing and /pass: the homepage frame, section headings and the homepage-style FAQ.

/** The homepage frame: its header and footer, tokens and fonts. */
export function PageFrame({ children }) {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}

/** A section heading, as on the homepage: optional eyebrow, title, lead. */
export function Head({ eyebrow, title, lead, id }) {
    return (
        <div className={s.sh}>
            {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
            <h2 className={s.h2} id={id}>
                {title}
            </h2>
            {lead && <p className={s.lead}>{lead}</p>}
        </div>
    );
}

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

/** FAQs as on the homepage: a heading, then one boxed list of numbered rows with a square toggle.
 *  Each FAQ is [question, answer, optional [link text, href] shown after the answer]. */
export function Faq({ eyebrow, title, faqs }) {
    return (
        <section className={s.sec} id="faq" aria-labelledby="h-faq">
            <FaqJsonLd faqs={faqs} />
            <div className={s.wrap}>
                <Head eyebrow={eyebrow} title={title} id="h-faq" />
                <div className={p.fq}>
                    {faqs.map(([q, a, link], i) => (
                        <details key={q} className={p['fq-i']} open={i === 0}>
                            <summary>
                                <h3 className={p['fq-q']}>{q}</h3>
                                <span className={p['fq-x']} aria-hidden="true" />
                            </summary>
                            <p className={p['fq-a']}>
                                {a}
                                {link && (
                                    <>
                                        {' '}
                                        <a href={link[1]}>{link[0]}</a>
                                    </>
                                )}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
