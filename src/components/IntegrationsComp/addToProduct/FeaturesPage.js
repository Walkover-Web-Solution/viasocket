import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, COPY, FEATURES_COPY as C } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import FeatureGrid from './FeatureGrid';
import { serializeJsonLd } from '@/utils/jsonLd';

// /features: every feature of the integration layer in one grid of toggle cards (FeatureGrid.js), in the homepage design.

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

export default function FeaturesPage({ blogs = [] }) {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <FaqJsonLd faqs={C.faqs} />
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={`${s.hero} ${s['fx-hero']} ${s['fx-hero-full']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['fx-hero-in']}`}>
                            <h1>{C.h1}</h1>
                            <p className={s['hero-sub']}>{C.sub}</p>
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

                    <section className={s['fx-sec']} aria-label="Features">
                        <div className={s.wrap}>
                            <FeatureGrid features={C.features} />
                        </div>
                    </section>

                    <BlogPosts title={C.blogTitle} posts={blogs} viewAllUrl={COPY.blogCategoryUrl} />

                    <FaqSection eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />

                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
