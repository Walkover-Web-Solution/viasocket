import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, COPY, FEATURES_COPY as C, START_URL } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import { FeatureIcon } from './icons';

// /features: the integration layer's features in the homepage design.

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function FeaturesPage({ blogs = [] }) {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <FaqJsonLd faqs={C.faqs} />
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={`${s.hero} ${s['fx-hero']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['fx-hero-in']}`}>
                            <span className={s.eyebrow}>{C.eyebrow}</span>
                            <h1>{C.h1}</h1>
                            <p className={s['hero-sub']}>{C.sub}</p>
                            <div className={s['hero-cta']}>
                                <CopyPromptButton />
                                <a className={`${s['btn-o']} ${s['fx-start']}`} href={START_URL}>
                                    Start free <span aria-hidden="true">→</span>
                                </a>
                            </div>
                            <p className={`${s.hint} ${s['fx-hint']}`}>{C.copyHint}</p>
                        </div>
                    </section>

                    <section className={s['fx-sec']} aria-label="Features">
                        <div className={s.wrap}>
                            <ul className={s.fx}>
                                {C.features.map(([title, desc, icon], i) => (
                                    <li key={title}>
                                        <div className={s['fx-top']}>
                                            <span className={s['feat-ico']}>
                                                <FeatureIcon name={icon} />
                                            </span>
                                            <span className={s['fx-n']}>{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                        <h2>{title}</h2>
                                        <p>{desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <BlogPosts title={C.blogTitle} lead={C.blogLead} posts={blogs} viewAllUrl={COPY.blogCategoryUrl} />

                    <FaqSection eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />

                    <section className={s['end-cta']}>
                        <div className={s.wrap}>
                            <div className={s['end-box']}>
                                <div className={s['end-copy']}>
                                    <h2>{C.endTitle}</h2>
                                    <div className={s['hero-cta']}>
                                        <CopyPromptButton />
                                        <span className={s.hint}>{C.copyHint}</span>
                                    </div>
                                </div>
                                <ul className={s['end-chips']} aria-label="What viaSocket handles">
                                    {C.endChips.map(([label, k]) => (
                                        <li key={label}>
                                            <FeatureIcon name={k} />
                                            <span>{label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
