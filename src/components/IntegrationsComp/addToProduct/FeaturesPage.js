import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, COPY, FEATURES_COPY as C } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import { FeatureIcon } from './icons';
import { VISUALS } from './FeatureVisuals';

// /features: the integration layer's features in the homepage design.

function FaqJsonLd({ faqs }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function SmallCard({ title, desc, icon, href, cta }) {
    return (
        <li>
            <div className={s['fx-sm-h']}>
                <span className={s['feat-ico']}>
                    <FeatureIcon name={icon} />
                </span>
                <h3>{title}</h3>
            </div>
            <p>{desc}</p>
            {href && (
                <a className={s['fx-link']} href={href}>
                    {cta} <span aria-hidden="true">→</span>
                </a>
            )}
        </li>
    );
}

/** One group: its heading, then the large card (text beside an illustration) with the short cards next to it. */
function FeatureGroup({ group }) {
    const { id, title, big, side, items } = group;
    const Visual = big && VISUALS[big[3]];
    return (
        <div className={s.fxg} id={id}>
            <div className={s['fxg-h']}>
                <h2 className={s.h2}>{title}</h2>
            </div>
            <ul className={`${s.fx} ${big ? s['fx-has-big'] : s['fx-flat']}`}>
                {big && (
                    <li className={`${s['fx-big']} ${side === 'right' ? s['fx-r'] : ''}`} style={{ gridRow: `span ${items.length}` }}>
                        <div className={s['fx-tx']}>
                            <span className={s['feat-ico']}>
                                <FeatureIcon name={big[2]} />
                            </span>
                            <h3>{big[0]}</h3>
                            <p>{big[1]}</p>
                        </div>
                        {Visual && (
                            <div className={s['fx-vis']} aria-hidden="true">
                                <Visual />
                            </div>
                        )}
                    </li>
                )}
                {items.map(([t, d, icon, opts]) => (
                    <SmallCard key={t} title={t} desc={d} icon={icon} {...opts} />
                ))}
            </ul>
        </div>
    );
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
                            {C.groups.map((g) => (
                                <FeatureGroup key={g.id} group={g} />
                            ))}
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
