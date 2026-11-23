import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from '@/components/IntegrationsComp/addToProduct/addToProduct.module.scss';
import { BASE_PROMPT } from '@/components/IntegrationsComp/addToProduct/copy';
import { CopyPromptButton, CopyPromptProvider } from '@/components/IntegrationsComp/addToProduct/CopyPrompt';
import { FaqSection, SiteFooter, SiteHeader } from '@/components/IntegrationsComp/addToProduct/SiteChrome';
import { Icon, ToolIcon } from './ToolPage';

// /tools: every built-in viaSocket tool that has a page (the admin panel's list, src/app/lib/tools-data.js).
// Same look as /tools/{page}: leads with no authentication, built into viaSocket, runs on AI credits.

export const TOOLS_COPY = {
    metaTitle: 'Built-in Tools for Your Product & AI Agents | viaSocket',
    metaDesc:
        "viaSocket's built-in tools for your product & AI agents: HTML to PDF, web scraping, transcription, translation, GST lookup and more. No authentication or API key; runs on AI credits.",
    h1: 'Built-in tools for your product & AI agents',
    sub: 'Ready-made tools that viaSocket runs for you. Call them like any other action, and pay only when they run.',
    // [title, text, icon]
    facts: [
        ['No authentication', 'No OAuth flow, API key or account to connect, for you or your users. A tool works as soon as viaSocket is set up.', 'lock'],
        ['Runs on viaSocket', 'viaSocket hosts every tool and keeps it up to date. There is no vendor to sign up with and nothing to maintain.', 'cube'],
        ['Pay per use', 'Each run is paid in AI credits from your Pass. No subscription, and every run shows its cost in your logs.', 'coin'],
    ],
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    count: '{n} tools',
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about built-in tools',
    faqs: [
        ['What is a viaSocket built-in tool?', 'A tool viaSocket runs on its own infrastructure, like HTML to PDF or a web scraper. Your product & agents call it like any other action, and viaSocket keeps it running and up to date.'],
        ['Do built-in tools need authentication?', 'No. There is no OAuth flow, no API key and no account to connect, for you or your users.'],
        ['How are built-in tools charged?', 'Each use is paid from your viaSocket Pass in AI credits, on every plan. There is no subscription, and your logs show the cost of every run.'],
        ['Can my AI agent use these tools?', 'Yes. Every action comes with an input schema, so your agent can call a built-in tool as a tool.'],
        ['Can I use a built-in tool with other apps?', 'Yes. Use it in the same run as any of the 2,300+ apps viaSocket connects, and pass data between them.'],
    ],
};

export default function ToolsIndexPage({ tools = [] }) {
    const T = TOOLS_COPY;
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main>
                    <section className={`${s.hero} ${s['fx-hero']}`}>
                        <div className={s['hero-grid']} aria-hidden="true" />
                        <div className={`${s.wrap} ${s['fx-hero-in']}`}>
                            <h1>{T.h1}</h1>
                            <p className={s['hero-sub']}>{T.sub}</p>
                            <div className={s['hero-cta']}>
                                <CopyPromptButton />
                            </div>
                            <p className="mt-3 text-[13px] text-[color:var(--ink-3)]">{T.copyHint}</p>
                        </div>
                    </section>

                    {/* The three things every tool has in common */}
                    <section className="pb-16 md:pb-20">
                        <div className={s.wrap}>
                            <ul className="grid list-none border-l border-t border-[color:var(--line)] p-0 md:grid-cols-3">
                                {T.facts.map(([title, text, icon]) => (
                                    <li key={title} className="border-b border-r border-[color:var(--line)] bg-[var(--s1)] p-8 md:p-10">
                                        <span className="grid h-12 w-12 place-items-center border border-[color:var(--line-2)]">
                                            <Icon name={icon} className="h-6 w-6" />
                                        </span>
                                        <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.02em]">{title}</h2>
                                        <p className="mt-3 text-[16px] leading-relaxed text-[color:var(--ink-2)]">{text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="pb-[var(--sec-pad)]" id="tools">
                        <div className={s.wrap}>
                            <p className="mb-4 font-[family-name:var(--mono)] text-[12px] uppercase tracking-[0.08em] text-[color:var(--ink-3)]">
                                {T.count.replace('{n}', tools.length)}
                            </p>
                            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                                {tools.map((t) => (
                                    <li key={t.id}>
                                        <Link
                                            href={`/tools/${t.page}`}
                                            className="group flex h-full flex-col border border-[color:var(--line)] bg-[var(--s1)] p-6 no-underline transition-colors hover:border-[color:var(--line-3)]"
                                        >
                                            <span className="flex items-center gap-3">
                                                <ToolIcon src={t.icon} size={40} />
                                                <b className="min-w-0 flex-1 text-[18px] font-semibold">{t.name}</b>
                                                <span aria-hidden="true" className="text-[color:var(--ink-3)] transition-colors group-hover:text-[color:var(--ink)]">
                                                    →
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <FaqSection eyebrow={T.faqEyebrow} title={T.faqTitle} faqs={T.faqs} />
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
