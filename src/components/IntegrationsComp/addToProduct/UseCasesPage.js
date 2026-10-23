import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, USECASES_COPY as C } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import UseCaseGrid from './UseCaseGrid';
import { serializeJsonLd } from '@/utils/jsonLd';

// /use-cases: what people build with viaSocket, in the homepage design.

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

export default function UseCasesPage() {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <FaqJsonLd faqs={C.faqs} />
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={`${s.hero} ${s['fx-hero']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['fx-hero-in']}`}>
                            <h1>{C.h1}</h1>
                            <div className={s['hero-cta']}>
                                <CopyPromptButton />
                                <a className={s['hero-ex']} href={C.expertUrl}>
                                    <span className={s['hero-live']} aria-hidden="true" />
                                    {C.expert} <span aria-hidden="true">→</span>
                                </a>
                                <span className={`${s.hint} ${s['fx-hint']}`}>{C.copyHint}</span>
                            </div>
                        </div>
                    </section>

                    <section className={s['fx-sec']} aria-label="Use cases">
                        <div className={s.wrap}>
                            <UseCaseGrid />
                        </div>
                    </section>

                    <FaqSection eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
