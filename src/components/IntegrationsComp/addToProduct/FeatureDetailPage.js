import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, COPY, FEATURES_COPY } from './copy';
import { Chevron, FeatureIcon } from './icons';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import FeatureGrid from './FeatureGrid';

// /features/{slug}: one feature, in the homepage design. The page's copy is in featurePages.js; its title
// comes from the feature's tile in FEATURES_COPY. Hero, what you get, how it works, what teams build,
// related features, posts, FAQs, and the closing call to action.

const cx = (...names) => names.filter(Boolean).map((n) => s[n]).join(' ');

/** The feature's tile in FEATURES_COPY: [title, description, icon, options], or undefined. */
export const featureBySlug = (slug) => FEATURES_COPY.features.find((f) => f[3]?.slug === slug);

function JsonLd({ url, title, page }) {
    const data = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Features', item: 'https://viasocket.com/features' }, // pragma: allowlist secret
                { '@type': 'ListItem', position: 2, name: title, item: url },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        },
    ];
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function FeatureDetailPage({ slug, page, url, blogs = [] }) {
    const [title] = featureBySlug(slug);
    const related = page.related.map(featureBySlug).filter(Boolean);

    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <JsonLd url={url} title={title} page={page} />
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={cx('hero', 'fx-hero', 'fd-hero')}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={cx('wrap', 'fx-hero-in')}>
                            <nav className={s.crumbs} aria-label="Breadcrumb">
                                <Link href="/features">Features</Link>
                                <Chevron />
                                <span aria-current="page">{title}</span>
                            </nav>
                            <h1>{page.h1}</h1>
                            <p className={s['hero-sub']}>{page.sub}</p>
                            <div className={s['hero-cta']}>
                                <CopyPromptButton />
                                <a className={s['hero-ex']} href={FEATURES_COPY.expertUrl}>
                                    <span className={s['hero-live']} aria-hidden="true" />
                                    {FEATURES_COPY.expert} <span aria-hidden="true">→</span>
                                </a>
                                <span className={cx('hint', 'fx-hint')}>{FEATURES_COPY.copyHint}</span>
                            </div>
                        </div>
                    </section>

                    <section className={s.sec} id="capabilities">
                        <div className={s.wrap}>
                            <div className={s.sh}>
                                <h2 className={s.h2}>{page.capsTitle}</h2>
                                <p className={s.lead}>{page.capsLead}</p>
                            </div>
                            <div className={s.feats}>
                                {page.caps.map(([h, p, k]) => (
                                    <div key={h} className={s.feat}>
                                        <span className={s['feat-ico']}>
                                            <FeatureIcon name={k} />
                                        </span>
                                        <h3>{h}</h3>
                                        <p>{p}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={s.sec} id="how-it-works">
                        <div className={s.wrap}>
                            <div className={s.sh}>
                                <h2 className={s.h2}>{page.stepsTitle}</h2>
                            </div>
                            <ol className={s['fd-steps']}>
                                {page.steps.map(([h, p]) => (
                                    <li key={h}>
                                        <h3>{h}</h3>
                                        <p>{p}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    <section className={s.sec} id="use-cases">
                        <div className={s.wrap}>
                            <div className={s.sh}>
                                <h2 className={s.h2}>{page.usesTitle}</h2>
                            </div>
                            <div className={s.bento}>
                                {page.uses.map(([h, p]) => (
                                    <div key={h} className={s.bcard}>
                                        <h3>{h}</h3>
                                        <p>{p}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {related.length > 0 && (
                        <section className={s.sec} id="related">
                            <div className={s.wrap}>
                                <div className={s['sh-row']}>
                                    <div className={s.sh}>
                                        <h2 className={s.h2}>Related features</h2>
                                    </div>
                                    <Link className={s['btn-o']} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }} href="/features">
                                        All features
                                    </Link>
                                </div>
                                <FeatureGrid features={related} />
                            </div>
                        </section>
                    )}

                    <BlogPosts title={FEATURES_COPY.blogTitle} posts={blogs} viewAllUrl={COPY.blogsUrl} />

                    <FaqSection eyebrow={FEATURES_COPY.faqEyebrow} title={`FAQs about ${title}`} faqs={page.faqs} />

                    <section className={s['end-cta']} id="get-started-cta">
                        <div className={s.wrap}>
                            <div className={s['end-box']}>
                                <div className={s['end-copy']}>
                                    <h2>{page.endTitle}</h2>
                                    <div className={s['hero-cta']}>
                                        <CopyPromptButton />
                                        <span className={s.hint}>{FEATURES_COPY.copyHint}</span>
                                    </div>
                                </div>
                                <ul className={s['end-chips']} aria-label="What viaSocket handles">
                                    {COPY.featsShort.map(([label, k]) => (
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
