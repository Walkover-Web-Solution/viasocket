import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from '@/components/IntegrationsComp/addToProduct/addToProduct.module.scss';
import { BASE_PROMPT } from '@/components/IntegrationsComp/addToProduct/copy';
import { CopyPromptButton, CopyPromptProvider } from '@/components/IntegrationsComp/addToProduct/CopyPrompt';
import { FaqSection, SiteFooter, SiteHeader } from '@/components/IntegrationsComp/addToProduct/SiteChrome';
import ToolVisual from './ToolVisual';
import { actionsOf, toolContent } from './toolContent';

// /tools/{page}: one built-in viaSocket tool. Leads with what the tool does, for the searches people make
// for that task (toolContent.js), with the tool's own example in the hero (ToolVisual.js). That it needs no
// authentication, runs on viaSocket and is paid in credits comes second: one line in the hero and one
// section further down. The site's homepage look (s.root tokens, header, footer, FAQ) with Tailwind for the
// layout. `content` is the copy written for the plug in the admin panel (Programmatic pages); each part
// replaces toolContent's.

export const TOOL_COPY = {
    crumb: 'Tools',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    facts: ['No authentication', 'Runs on viaSocket'],
    creditsDefault: 'Pay per use in AI credits',

    doesEyebrow: 'What it does',
    doesTitle: 'What you can do with {name}',

    useCasesEyebrow: 'Use cases',
    useCasesTitle: 'What teams build with {name}',

    stepsEyebrow: 'How it works',
    stepsTitle: 'Add {name} in three steps',
    steps: [
        ['Copy the setup prompt', 'Paste it into Cursor, Claude Code or Codex inside your project.'],
        ['Your agent adds {name}', 'It sets up viaSocket and calls {name} where your product or agent needs it.'],
        ['Pay per run', 'Each run is paid from your Pass in AI credits, and every run shows in your logs.'],
    ],

    whyEyebrow: 'Why viaSocket',
    whyTitle: 'Nothing to connect. Pay only when it runs.',
    // [title, text, icon]
    why: [
        ['No authentication', 'No OAuth flow, API key or account to create, for you or your users. {name} works as soon as viaSocket is set up.', 'lock'],
        ['Runs on viaSocket', 'viaSocket hosts {name} and keeps it up to date. There is no vendor to sign up with and nothing to maintain.', 'cube'],
        ['Pay per use', '{price}Each run is paid in AI credits from your Pass. No subscription.', 'coin'],
    ],

    moreTitle: 'More built-in tools',
    moreAll: ['See all tools', '/tools'],

    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: '{name}: questions, answered',

    endTitle: 'Add {name} to your product',
    endSub: 'Copy the setup prompt into your coding agent. No authentication, nothing to connect.',
};

const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

const ICONS = {
    lock: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2',
    cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
    coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9.5c0-1 1.3-1.8 3-1.8s3 .8 3 1.8-1.3 1.6-3 1.9-3 .9-3 2 1.3 1.8 3 1.8 3-.8 3-1.8M12 6v1.7M12 16.3V18',
    check: 'M5 12.5l4.5 4.5L19 7.5',
};

export function Icon({ name, className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS[name]} />
        </svg>
    );
}

export function ToolIcon({ src, size }) {
    return <img src={src} alt="" width={size} height={size} style={{ width: size, height: size }} className="shrink-0 object-contain" />;
}

function Head({ eyebrow, title }) {
    return (
        <div className={s.sh}>
            {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
            <h2 className={s.h2}>{title}</h2>
        </div>
    );
}

function JsonLd({ tool, page, name, description, faqs }) {
    const software = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: `https://viasocket.com/tools/${page}`,
        description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: tool.credits || 'Paid per use in AI credits', url: 'https://viasocket.com/pricing' },
        provider: { '@type': 'Organization', name: 'viaSocket', url: 'https://viasocket.com' },
    };
    const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
        </>
    );
}

export default function ToolPage({ tool, others = [], appOneDetails, content = null }) {
    const T = TOOL_COPY;
    const actions = actionsOf(appOneDetails);
    const c = toolContent(tool, actions);
    const vars = { name: tool.name, price: tool.credits ? `${tool.credits}. ` : '' };
    const f = (str) => fill(str, vars);
    const h1 = content?.h1 || c.h1;
    const faqs = content?.faqs?.length ? content.faqs : c.faqs;
    const useCases = content?.useCases?.length ? content.useCases : c.useCases;
    const facts = [...T.facts, tool.credits || T.creditsDefault];
    // Sections draw a line above themselves (.sec); the one right under the hero does not.
    const noLine = '!border-t-0';
    const prompt = BASE_PROMPT.replace('Install the viaSocket skill.', `Install the viaSocket skill. Use viaSocket's built-in ${tool.name} tool in this product.`);

    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <JsonLd tool={tool} page={tool.page} name={`${h1} by viaSocket`} description={content?.metaDescription || c.metaDesc} faqs={faqs} />
            <CopyPromptProvider prompt={prompt}>
                <SiteHeader />

                <main>
                    {/* Hero: what the tool does, and its own example */}
                    <section className={`${s.hero} ${s['fx-hero']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['fx-hero-in']} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]`}>
                            <div className="min-w-0">
                                <nav className={s.crumbs} aria-label="Breadcrumb">
                                    <Link href="/tools">{T.crumb}</Link>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M9 6l6 6-6 6" />
                                    </svg>
                                    <span aria-current="page">{tool.name}</span>
                                </nav>
                                <h1>{h1}</h1>
                                <p className={s['hero-sub']}>{content?.sub || c.sub}</p>
                                <div className={s['hero-cta']}>
                                    <CopyPromptButton />
                                </div>
                                <p className="mt-3 text-[13px] text-[color:var(--ink-3)]">{T.copyHint}</p>
                                <ul className="mt-8 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[14px] text-[color:var(--ink-2)]">
                                    {facts.map((x) => (
                                        <li key={x} className="flex items-center gap-1.5">
                                            <Icon name="check" className="h-4 w-4 text-[color:var(--ink)]" />
                                            {x}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <ToolVisual tool={tool} demo={c.demo} action={actions[0]?.name} />
                        </div>
                    </section>

                    {/* What it does */}
                    {c.does.length > 0 && (
                        <section className={`${s.sec} ${noLine}`} id="features">
                            <div className={s.wrap}>
                                <Head eyebrow={T.doesEyebrow} title={f(T.doesTitle)} />
                                <ul className="mt-[var(--content-gap)] grid list-none border-l border-t border-[color:var(--line)] p-0 sm:grid-cols-2">
                                    {c.does.map(([title, text]) => (
                                        <li key={title} className="border-b border-r border-[color:var(--line)] p-7 md:p-8">
                                            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{title}</h3>
                                            <p className="mt-2 text-[15.5px] leading-relaxed text-[color:var(--ink-2)]">{text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* Use cases */}
                    {useCases.length > 0 && (
                        <section className={`${s.sec} bg-[var(--s2)] ${c.does.length ? '' : noLine}`} id="use-cases">
                            <div className={s.wrap}>
                                <Head eyebrow={T.useCasesEyebrow} title={f(T.useCasesTitle)} />
                                <div className="mt-[var(--content-gap)] grid gap-4 md:grid-cols-3">
                                    {useCases.map(([title, text]) => (
                                        <div key={title} className="border border-[color:var(--line)] bg-[var(--s1)] p-7">
                                            <h3 className="text-[18px] font-semibold">{title}</h3>
                                            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-2)]">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* How it works */}
                    <section className={s.sec}>
                        <div className={s.wrap}>
                            <Head eyebrow={T.stepsEyebrow} title={f(T.stepsTitle)} />
                            <ol className="mt-[var(--content-gap)] grid list-none gap-8 p-0 md:grid-cols-3">
                                {T.steps.map(([title, text], i) => (
                                    <li key={title}>
                                        <span className="font-[family-name:var(--mono)] text-[13px] text-[color:var(--ink-3)]">0{i + 1}</span>
                                        <h3 className="mt-2 text-[19px] font-semibold">{f(title)}</h3>
                                        <p className="mt-2 text-[15px] text-[color:var(--ink-2)]">{f(text)}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    {/* Why run it on viaSocket */}
                    <section className={`${s.sec} border-t border-[color:var(--line)]`}>
                        <div className={s.wrap}>
                            <Head eyebrow={T.whyEyebrow} title={T.whyTitle} />
                            <ul className="mt-[var(--content-gap)] grid list-none border-l border-t border-[color:var(--line)] p-0 md:grid-cols-3">
                                {T.why.map(([title, text, icon]) => (
                                    <li key={title} className="border-b border-r border-[color:var(--line)] p-7 md:p-8">
                                        <span className="grid h-11 w-11 place-items-center border border-[color:var(--line-2)]">
                                            <Icon name={icon} className="h-5 w-5" />
                                        </span>
                                        <h3 className="mt-5 text-[19px] font-semibold">{title}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-2)]">{f(text)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* More built-in tools */}
                    {others.length > 0 && (
                        <section className={s.sec}>
                            <div className={s.wrap}>
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <Head title={T.moreTitle} />
                                    <Link className={s.ulink} href={T.moreAll[1]}>
                                        {T.moreAll[0]}
                                    </Link>
                                </div>
                                <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {others.map((t) => (
                                        <Link
                                            key={t.id}
                                            href={`/tools/${t.page}`}
                                            className="flex items-center gap-3 border border-[color:var(--line)] p-4 no-underline transition-colors hover:border-[color:var(--line-3)] hover:bg-[var(--tint-1)]"
                                        >
                                            <ToolIcon src={t.icon} size={28} />
                                            <span className="min-w-0 flex-1 font-medium">{t.name}</span>
                                            <span aria-hidden="true" className="text-[color:var(--ink-3)]">→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <FaqSection eyebrow={T.faqEyebrow} title={f(T.faqTitle)} faqs={faqs} />

                    {/* Closing call to action */}
                    <section className={s.sec}>
                        <div className={s.wrap}>
                            <div className="flex flex-col items-start justify-between gap-6 border border-[color:var(--line-2)] bg-[var(--s2)] p-8 md:flex-row md:items-center md:p-12">
                                <div>
                                    <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.02em]">{f(T.endTitle)}</h2>
                                    <p className="mt-2 text-[16px] text-[color:var(--ink-2)]">{T.endSub}</p>
                                </div>
                                <CopyPromptButton />
                            </div>
                        </div>
                    </section>
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
