import { Suspense } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, COPY, INDEX_COPY } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import AppDirectory from './AppDirectory';

// /integrations and /integrations/category/{name}: the app directory in the homepage design.

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function IntegrationsIndexPage({ data }) {
    const { integrationsInfo = {}, categoryData = {}, actionLayerBlogs = [] } = data;
    const category = integrationsInfo?.category && integrationsInfo.category !== 'all' ? decodeURIComponent(categoryData?.name || integrationsInfo.category) : null;
    const h1 = category ? INDEX_COPY.categoryH1.replace('{category}', category) : INDEX_COPY.h1;
    const sub = INDEX_COPY.sub;

    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            {!category && <FaqJsonLd faqs={INDEX_COPY.faqs} />}
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={`${s.hero} ${s['dir-hero']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['dir-hero-in']}`}>
                            <div>
                                {category && (
                                    <nav className={s.crumbs} aria-label="Breadcrumb">
                                        <Link href="/integrations">Integrations</Link>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M9 6l6 6-6 6" />
                                        </svg>
                                        <span aria-current="page">{category}</span>
                                    </nav>
                                )}
                                <h1>{h1}</h1>
                                <p className={s['hero-sub']}>{sub}</p>
                                <div className={s['hero-cta']}>
                                    <CopyPromptButton />
                                    <span className={s.hint}>{COPY.copyHint}</span>
                                </div>
                            </div>
                            <p className={s['dir-list']}>
                                <span>{INDEX_COPY.listYourApp}</span>
                                <a href={INDEX_COPY.listYourAppUrl} target="_blank" rel="noopener noreferrer">
                                    {INDEX_COPY.listYourAppLink} ↗
                                </a>
                            </p>
                        </div>
                    </section>

                    <Suspense>
                        <AppDirectory
                            apps={data.apps}
                            categories={data.categories}
                            integrationsInfo={integrationsInfo}
                            pageInfo={data.pageInfo}
                            categoryData={categoryData}
                            appCount={data.appCount}
                        />
                    </Suspense>

                    <BlogPosts title={INDEX_COPY.blogTitle} lead={INDEX_COPY.blogLead} posts={actionLayerBlogs} viewAllUrl={COPY.blogCategoryUrl} />

                    <FaqSection eyebrow={INDEX_COPY.faqEyebrow} title={INDEX_COPY.faqTitle} faqs={INDEX_COPY.faqs} />

                    <section className={s['abc-sec']}>
                        <div className={`${s.wrap} ${s.abc}`}>
                            <h2>{INDEX_COPY.browseByName}</h2>
                            <nav aria-label={INDEX_COPY.browseByName}>
                                {LETTERS.map((l) => (
                                    <Link key={l} href={`/find-apps/${l.toLowerCase()}`} aria-label={`Apps starting with ${l}`}>
                                        {l}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </section>
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
