import Link from 'next/link';
import { Suspense } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import { COPY, fill, promptFor } from './copy';
import { Chevron, FeatureIcon } from './icons';
import { BlogPosts, FaqSection, SiteFooter, SiteHeader } from './SiteChrome';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import RotatingWord from './RotatingWord';
import OAuthDemo from './OAuthDemo';
import EventsList from './EventsList';
import BetaNotice from './BetaNotice';

// /integrations/{app}: "Add {app} to Your Product". Server-rendered, so every word of copy is in
// the HTML; only the rotating word, the sign-in animation, "Show all" and the copy buttons run
// in the browser.

const cx = (...names) => names.filter(Boolean).map((n) => s[n]).join(' ');


const categorySlug = (c) => c.replace(/\.$/, '').trim().toLowerCase().replace(/\s+/g, '-');

function AppIcon({ src, size }) {
    if (!src) return null;
    return <img className={s.appicon} src={src} alt="" width={size} height={size} style={{ width: size, height: size }} />;
}

export function toPageApp(appOneDetails) {
    const events = appOneDetails?.events || [];
    const pick = (type) =>
        events.filter((e) => e?.type === type && e?.name).map((e) => ({ name: e.name, description: e.description || '' }));
    return {
        name: appOneDetails?.name || '',
        slug: appOneDetails?.appslugname || '',
        description: appOneDetails?.description || '',
        iconUrl: appOneDetails?.iconurl || '',
        domain: appOneDetails?.domain || '',
        categories: (appOneDetails?.category || []).map((c) => String(c).replace(/\.$/, '').trim()).filter(Boolean),
        actions: pick('action'),
        triggers: pick('trigger'),
    };
}

// The large Managed Authentication card's picture: each customer's own connection to the app,
// kept signed in. Example customers, the same on every app page.
const AUTH_ROWS = [
    ['Acme Corp', 'token refreshed 2h ago'],
    ['Globex', 'token refreshed 9m ago'],
    ['Initech', 'connected today'],
];

function AuthPanel({ app }) {
    return (
        <div className={s['auth-vis']} aria-hidden="true">
            <div className={s['auth-panel']}>
                <div className={s['auth-head']}>
                    <span>Customer connections</span>
                    <span>{app.name}</span>
                </div>
                {AUTH_ROWS.map(([who, note]) => (
                    <div key={who} className={s['auth-row']}>
                        <AppIcon src={app.iconUrl} size={26} />
                        <span className={s['auth-who']}>
                            <b>{who}</b>
                            <small>{note}</small>
                        </span>
                        <span className={s.gtag}>
                            <span className={s.dot} />
                            Connected
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** The structured data the old page carried, with this page's FAQs. */
function JsonLd({ app }) {
    const software = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `viaSocket for ${app.name}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `https://viasocket.com/integrations/${app.slug}`,
        description: fill(COPY.metaDesc, app.name),
        featureList: [
            ...(app.triggers.length ? [`${app.triggers.length} triggers`] : []),
            ...(app.actions.length ? [`${app.actions.length} actions`] : []),
            ...COPY.feats.map(([h]) => h),
        ],
        isRelatedTo: { '@type': 'SoftwareApplication', name: app.name },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://viasocket.com/pricing' },
        provider: {
            '@type': 'Organization',
            name: 'viaSocket',
            url: 'https://viasocket.com',
            logo: { '@type': 'ImageObject', url: 'https://viasocket.com/assets/brand/logo.svg' },
        },
    };
    const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: COPY.faqs.map(([q, a]) => ({
            '@type': 'Question',
            name: fill(q, app.name),
            acceptedAnswer: { '@type': 'Answer', text: fill(a, app.name) },
        })),
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
        </>
    );
}

export default function AddToProductPage({ appOneDetails, blogs = [] }) {
    const app = toPageApp(appOneDetails);
    const f = (str) => fill(str, app.name);

    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <JsonLd app={app} />
            <CopyPromptProvider prompt={promptFor(app)}>
                <SiteHeader />

                <main>
                    <section className={s.hero}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={cx('wrap', 'hero-in')}>
                            <div>
                                <nav className={s.crumbs} aria-label="Breadcrumb">
                                    <Link href="/integrations">Integrations</Link>
                                    <Chevron />
                                    <span aria-current="page">{app.name}</span>
                                </nav>
                                <h1>
                                    <span className={s['h1-line']}>{f(COPY.h1Lead)}</span> <RotatingWord words={COPY.h1Words} />
                                </h1>
                                <p className={s['hero-sub']}>{f(COPY.sub)}</p>
                                <div className={s['hero-cta']}>
                                    <CopyPromptButton />
                                    <span className={s.hint}>{COPY.copyHint}</span>
                                </div>
                            </div>
                            <OAuthDemo app={app} />
                        </div>
                    </section>

                    <section className={s['cta-sec']} id="get-started">
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={cx('wrap', 'cta-in')}>
                            <div className={s['cta-head']}>
                                <div className={s['cta-copy']}>
                                    <span className={s.eyebrow}>{COPY.featEyebrow}</span>
                                    <h2 className={s.h2}>{f(COPY.featTitle)}</h2>
                                    <p className={s.lead}>{f(COPY.featLead)}</p>
                                </div>
                            </div>
                            <div className={s.bento}>
                                {COPY.feats.map(([h, p, k], i) => (
                                    <div key={h} className={cx('bcard', i === 0 && 'big')}>
                                        <span className={s['feat-ico']}>
                                            <FeatureIcon name={k} />
                                        </span>
                                        <h3>{h}</h3>
                                        <p>{f(p)}</p>
                                        {i === 0 && <AuthPanel app={app} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {app.actions.length || app.triggers.length ? (
                        <section className={s.sec} id="actions-triggers">
                            <div className={s.wrap}>
                                <div className={s.sh}>
                                    <h2 className={s.h2}>{f(COPY.atTitle)}</h2>
                                </div>
                                <div className={s.at}>
                                    <div className={s['at-group']}>
                                        <div>
                                            <h3>{f(COPY.actTitle)}</h3>
                                            <p>{f(COPY.actSub)}</p>
                                        </div>
                                        <EventsList kind="action" items={app.actions} appName={app.name} iconUrl={app.iconUrl} />
                                    </div>
                                    <div className={s['at-group']}>
                                        <div>
                                            <h3>{f(COPY.trgTitle)}</h3>
                                            <p>{f(COPY.trgSub)}</p>
                                        </div>
                                        <EventsList kind="trigger" items={app.triggers} appName={app.name} iconUrl={app.iconUrl} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <Suspense>
                            <BetaNotice appInfo={appOneDetails} />
                        </Suspense>
                    )}

                    <BlogPosts title={f(COPY.learnTitle)} lead={f(COPY.learnSub)} posts={blogs} viewAllUrl={COPY.blogCategoryUrl} />

                    <section className={s.sec} id="about">
                        <div className={s.wrap}>
                            <div className={s.about}>
                                <div className={s['about-card']}>
                                    <AppIcon src={app.iconUrl} size={40} />
                                    <h3>About {app.name}</h3>
                                    <p>{app.description}</p>
                                    {app.categories.length > 0 && (
                                        <div className={s.tags}>
                                            {app.categories.slice(0, 2).map((c) => (
                                                <Link key={c} className={s.tag} href={`/integrations/category/${categorySlug(c)}`}>
                                                    {c}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {app.domain && (
                                        <a className={s.ulink} href={`https://${app.domain}`} rel="nofollow noopener" target="_blank">
                                            Learn more
                                        </a>
                                    )}
                                </div>
                                <div className={s['about-card']}>
                                    <img className={s['about-logo']} src="/new-home/assets/favicon.svg" alt="viaSocket" width={40} height={40} />
                                    <h3>About viaSocket</h3>
                                    <p>{COPY.aboutViasocket}</p>
                                    <div className={s.tags}>
                                        <Link className={s.tag} href="/">
                                            Integration Layer
                                        </Link>
                                        <Link className={s.tag} href="/integrations">
                                            Integrations
                                        </Link>
                                    </div>
                                    <Link className={s.ulink} href="/">
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <FaqSection
                        eyebrow={COPY.faqEyebrow}
                        title={f(COPY.faqTitle)}
                        lead={f(COPY.faqSub)}
                        faqs={COPY.faqs.map(([q, a]) => [f(q), f(a)])}
                    />

                    <section className={s['end-cta']} id="get-started-cta">
                        <div className={s.wrap}>
                            <div className={s['end-box']}>
                                <div className={s['end-copy']}>
                                    <h2>{f(COPY.endTitle)}</h2>
                                    <div className={s['hero-cta']}>
                                        <CopyPromptButton />
                                        <span className={s.hint}>{COPY.copyHint}</span>
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
