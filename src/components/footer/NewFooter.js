'use client';

import Link from 'next/link';

/**
 * The footer, matched to the handoff's `SiteFooter`.
 *
 * Four things that attempt one got wrong, and they are the whole character of
 * the block:
 *
 * 1. The social row is icon buttons, not text labels: 36px squares, a 10.8px
 *    radius, a 1px border at 30% white, the glyph at 80%.
 * 2. Column headings are 18px at weight 600 in full white, sentence case, and
 *    each column carries a hairline rule above it. That rule is most of what
 *    makes the block read as a footer rather than as three stacked lists.
 * 3. Links are 17px at 80% white, not 13px.
 * 4. The wordmark is clipped and masked, not merely large. Its box is shorter
 *    than the letters, so they overflow it, and a gradient mask fades them out
 *    downward. `letter-spacing` carries the width and `font-size` carries the
 *    height — set to fill the line, the glyphs would be three times as tall as
 *    the band. The hairline stroke is what keeps an edge on the part that has
 *    faded; a filled wordmark is the thing that looks least like the reference.
 */

/* ── Brand marks, inlined ─────────────────────────────────────────
   Not hotlinked. The previous version pulled these from three separate third
   parties at render time — Wikimedia, a hugeicons query URL and a uxwing
   WordPress upload — two of them hotlinks into somebody's blog theme. The
   artwork is each brand's own, in each brand's own colour, which is the rule
   for a third party's mark: restyling it misrepresents it. ChatGPT's and
   Grok's artwork is monochrome, so on this ground they take the same white as
   the social marks. */

const LinkedInMark = () => (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
);

const XMark = () => (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
);

const YouTubeMark = () => (
    <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.6 15.6V8.4l6.4 3.6z" />
);

const DiscordMark = () => (
    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a18 18 0 0 1 4.3 1.4 15 15 0 0 0-5.2-1 15.4 15.4 0 0 0-5.3 1 18 18 0 0 1 4.35-1.4L13 3a19.8 19.8 0 0 0-4.9 1.4C4.9 9.1 4.05 13.7 4.5 18.2A19.9 19.9 0 0 0 10.5 21l1.2-1.7a12.9 12.9 0 0 1-2-1l.4-.3a14.2 14.2 0 0 0 12 0l.4.3a12.9 12.9 0 0 1-2 1L21.7 21a19.9 19.9 0 0 0 6-2.8c.5-5.2-.85-9.75-3.4-13.8zM9.7 15.4c-1.15 0-2.1-1.05-2.1-2.35S8.5 10.7 9.7 10.7s2.12 1.06 2.1 2.35c0 1.3-.94 2.35-2.1 2.35zm6.6 0c-1.15 0-2.1-1.05-2.1-2.35s.93-2.35 2.1-2.35 2.12 1.06 2.1 2.35c0 1.3-.93 2.35-2.1 2.35z" />
);

const InstagramMark = () => (
    <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" />
    </>
);

const SOCIALS = [
    {
        label: 'LinkedIn',
        track: 'linkedin',
        href: 'https://www.linkedin.com/company/viasocket-walkover/',
        Mark: LinkedInMark,
    },
    { label: 'X', track: 'x', href: 'https://x.com/viasocket', Mark: XMark },
    { label: 'YouTube', track: 'youtube', href: 'https://www.youtube.com/@viasocket', Mark: YouTubeMark },
    { label: 'Discord', track: 'discord', href: 'https://discord.com/invite/wqsSsMAkkz', Mark: DiscordMark },
    { label: 'Instagram', track: 'instagram', href: 'https://www.instagram.com/viasocket/', Mark: InstagramMark },
];

/* ── Explore with AI ──────────────────────────────────────────────
   Four marks that open an assistant with a prompt already in the box, asking it
   to look at the reader's own business and come back with the automations worth
   building. It is the one thing in this footer that is not a link to another
   page of ours.

   They are links, not buttons calling window.open: same destination, but
   middle-click, open-in-new-tab and a long-press on a phone all work, and it
   needs no JavaScript to function.

   Circles rather than the social row's rounded squares: the two sit one above
   the other and they are not the same offer, so the shape says which is which. */

const ChatGPTMark = () => (
    <svg viewBox="0 0 320 320" fill="currentColor" aria-hidden="true" focusable="false" className="h-[17px] w-[17px]">
        <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" />
    </svg>
);

const ClaudeMark = () => (
    <svg viewBox="0 0 100 100" fill="#D97757" aria-hidden="true" focusable="false" className="h-[17px] w-[17px]">
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
);

const PerplexityMark = () => (
    <svg viewBox="0 0 24 24" fill="#1FB8CD" aria-hidden="true" focusable="false" className="h-[17px] w-[17px]">
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
    </svg>
);

const GrokMark = () => (
    <svg
        viewBox="0 0 512 509.641"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="h-[17px] w-[17px]"
    >
        <path d="M213.235 306.019l178.976-180.002v.169l51.695-51.763c-.924 1.32-1.86 2.605-2.785 3.89-39.281 54.164-58.46 80.649-43.07 146.922l-.09-.101c10.61 45.11-.744 95.137-37.398 131.836-46.216 46.306-120.167 56.611-181.063 14.928l42.462-19.675c38.863 15.278 81.392 8.57 111.947-22.03 30.566-30.6 37.432-75.159 22.065-112.252-2.92-7.025-11.67-8.795-17.792-4.263l-124.947 92.341zm-25.786 22.437l-.033.034L68.094 435.217c7.565-10.429 16.957-20.294 26.327-30.149 26.428-27.803 52.653-55.359 36.654-94.302-21.422-52.112-8.952-113.177 30.724-152.898 41.243-41.254 101.98-51.661 152.706-30.758 11.23 4.172 21.016 10.114 28.638 15.639l-42.359 19.584c-39.44-16.563-84.629-5.299-112.207 22.313-37.298 37.308-44.84 102.003-1.128 143.81z" />
    </svg>
);

const EXPLORE_AI = {
    label: 'Explore with AI',
    prompt: 'I want to automate my business. Use everything you already know about me, including our previous conversations. If important details are missing, ask focused questions before making recommendations. Analyze my company, products, team structure, software stack, workflows, customer journey, and operational bottlenecks. Then recommend the highest-impact automations, AI agents, integrations, and workflows that can be built using viaSocket (https://viasocket.com), ranked by ROI, implementation effort, and business impact.',
    providers: [
        { id: 'chatgpt', name: 'ChatGPT', href: 'https://chatgpt.com/?q=', Mark: ChatGPTMark },
        { id: 'claude', name: 'Claude', href: 'https://claude.ai/new?q=', Mark: ClaudeMark },
        { id: 'perplexity', name: 'Perplexity', href: 'https://www.perplexity.ai/?q=', Mark: PerplexityMark },
        { id: 'grok', name: 'Grok', href: 'https://grok.com/?q=', Mark: GrokMark },
    ],
};

/* ── Columns ──────────────────────────────────────────────────────
   Nine groups, read off viasocket.com's own footer and each link opened and
   checked. Cut into three fixed columns of three groups each, in reading
   order, rather than flowed with CSS columns: a flow places a group wherever
   it fits, and nothing here should land by chance. */

const GROUPS = [
    {
        title: 'AI and automation',
        links: [
            { label: 'Apps integrations', href: '/integrations' },
            { label: 'Features', href: '/features' },
            { label: 'List your app', href: 'https://cal.id/team/viasocket/bring-saas-app-on-viasocket' },
            { label: 'Automations', href: '/automations' },
            { label: 'Discover top apps', href: '/discovery' },
            { label: 'Embed', href: '/embed' },
            { label: 'Workflow automation guide', href: '/workflow-automations' },
            { label: 'Automation ideas', href: '/automation-ideas' },
        ],
    },
    {
        title: 'Plans, pricing and offers',
        links: [
            { label: 'Pricing', href: '/pricing' },
            { label: 'Free access programs', href: '/free-access-programs' },
        ],
    },
    {
        title: 'Compare',
        links: [
            { label: 'viaSocket vs Zapier', href: '/blog/viasocket-vs-zapier/' },
            { label: 'viaSocket vs Make', href: '/blog/viasocket-vs-make/' },
            { label: 'viaSocket vs Pabbly', href: '/blog/viasocket-vs-pabbly' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Book a demo', href: 'https://cal.id/team/viasocket/workflow-setup-discussion' },
            { label: 'Contact support team', href: '/support' },
            { label: 'Request a feature', href: 'https://roadmap.viasocket.com/b/n0elp3vg/feature-ideas' },
            { label: 'Knowledge base', href: '/faq' },
            { label: 'Community', href: '/community' },
            { label: 'Blog', href: '/blog' },
            { label: 'Download mobile app', href: 'https://play.google.com/store/apps/details?id=com.viasocketmobile' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '/help/about-us' },
            // Hiring lives on the parent company's domain.
            { label: 'We are hiring', href: 'https://walkover.in/careers' },
            { label: 'Culture we foster', href: 'https://walkover.in/about/culture-we-foster' },
            { label: 'Roadmap', href: 'https://roadmap.viasocket.com/roadmap' },
            { label: 'AI transparency', href: '/help/security-and-compliance/ai-transparency' },
        ],
    },
    {
        title: 'Automation experts',
        links: [
            { label: 'Hire an expert', href: 'https://tally.so/r/wzVdKZ' },
            { label: 'Become a partner', href: '/help/partners' },
            { label: 'Partner program', href: '/experts' },
            { label: 'Agency partner program', href: '/agency-partner' },
        ],
    },
    {
        title: 'For SaaS',
        links: [
            { label: 'List your app', href: 'https://cal.id/team/viasocket/bring-saas-app-on-viasocket' },
            { label: 'Build your own plug', href: '/help/plugin-builder' },
            { label: 'Embed', href: '/embed' },
            { label: 'Whitelabel MCP server', href: '/mcp/saas' },
            { label: 'Become a billing partner', href: '/help/viasocket-embed/billing-partner' },
            { label: 'Showcase popular workflows', href: '/integrations-script' },
        ],
    },
    {
        title: 'For AI agent builders',
        links: [
            { label: 'viaSocket embed', href: '/embed#ai_agent' },
            { label: 'MCP marketplace', href: '/mcp/aiagent' },
        ],
    },
    {
        title: 'MCP',
        links: [
            { label: 'MCP marketplace', href: '/mcp' },
            { label: 'MCP for AI agents', href: '/mcp/aiagent' },
            { label: 'MCP for SaaS players', href: '/mcp/saas' },
        ],
    },
];

// Three fixed columns of three groups each, in the order above, not a
// flowing layout: which group sits in which column never changes with
// viewport width, only how the three columns themselves reflow.
const COLUMNS = [GROUPS.slice(0, 3), GROUPS.slice(3, 6), GROUPS.slice(6, 9)];

const LEGAL = [
    { label: 'Privacy', href: '/privacy', track: 'privacy' },
    { label: 'Terms', href: '/terms', track: 'terms' },
    { label: 'Data retention', href: '/data-retention-deletion', track: 'data_retention' },
    { label: 'AI transparency', href: '/help/security-and-compliance/ai-transparency', track: 'ai_transparency' },
];

const TAGLINE = 'Get digital work done.';
const COPYRIGHT = `© ${new Date().getFullYear()} viaSocket`;
const ENTITY = 'Walkover Web Solutions Pvt Ltd.';
const WORDMARK = 'viaSocket';

/**
 * Is this link leaving viaSocket?
 *
 * A viasocket.com URL is the same site, so it stays in the tab. A subdomain
 * (`roadmap.`) or another company (`walkover.in`, `cal.id`, the social
 * profiles) is genuinely elsewhere and opens away.
 *
 * A new tab only for somewhere else: opening your own site in one is unusual,
 * it leaves a reader with a pile of tabs from one footer, and it breaks the
 * back button as a way home.
 */
function offsite(href) {
    if (!href?.startsWith('http')) return false;
    try {
        return new URL(href).hostname !== 'viasocket.com';
    } catch {
        return false;
    }
}

const SOCIAL_BUTTON =
    'grid h-9 w-9 place-items-center rounded-[10.8px] border border-white/30 text-white/80 transition-[border-color,color,background-color] duration-[180ms] hover:border-white/60 hover:bg-white/[0.06] hover:text-white';

export default function NewFooter() {
    const prompt = encodeURIComponent(EXPLORE_AI.prompt);

    return (
        <footer className="static m-0 block bg-black p-0 text-[15px] text-white/80">
            <div className="px-5 pb-6 pt-12 min-[721px]:px-index-gutter min-[721px]:pb-[26px] min-[721px]:pt-16">
                <div className="grid grid-cols-1 gap-9 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,3fr)] min-[1100px]:gap-12">
                    <div>
                        <p className="m-0 max-w-[320px] text-[17px] leading-[26px] text-white">{TAGLINE}</p>

                        <div className="mt-[22px] flex flex-wrap gap-[10px]">
                            {SOCIALS.map(({ label, track, href, Mark }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    data-track={`new_footer_social_${track}`}
                                    data-track-label={label}
                                    data-track-section="new_footer"
                                    className={SOCIAL_BUTTON}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <Mark />
                                    </svg>
                                </a>
                            ))}
                        </div>

                        {/* Under the social row, because it is the same kind of
                            thing: a way out of this page to somewhere the reader
                            already is. */}
                        <div className="mt-[26px]">
                            <p className="m-0 text-[13px] tracking-[0.02em] text-white/[0.62]">{EXPLORE_AI.label}</p>
                            <ul className="m-0 mt-[11px] flex list-none flex-wrap gap-[10px] p-0">
                                {EXPLORE_AI.providers.map(({ id, name, href, Mark }) => (
                                    <li key={id}>
                                        <a
                                            href={`${href}${prompt}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={name}
                                            aria-label={`${EXPLORE_AI.label}: ${name}`}
                                            data-track={`new_footer_ai_${id}`}
                                            data-track-label={name}
                                            data-track-section="new_footer"
                                            className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white/85 transition-[border-color,background-color,color] duration-[180ms] hover:border-white/60 hover:bg-white/[0.06] hover:text-white"
                                        >
                                            <Mark />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Three fixed columns, not a flowing layout: which group
                        sits in which column never changes, only how the three
                        columns reflow. A rule sits between them once there is
                        room for all three side by side. */}
                    <div className="grid grid-cols-1 gap-y-9 min-[721px]:grid-cols-2 min-[721px]:gap-x-9 min-[721px]:gap-y-9 min-[1100px]:grid-cols-3 min-[1100px]:gap-x-0 min-[1100px]:divide-x min-[1100px]:divide-white/15">
                        {COLUMNS.map((column, columnIndex) => (
                            <div
                                key={columnIndex}
                                className="flex flex-col gap-9 min-[1100px]:px-9 min-[1100px]:first:pl-0 min-[1100px]:last:pr-0"
                            >
                                {column.map((group) => (
                                    <nav
                                        key={group.title}
                                        aria-label={group.title}
                                        /* The hairline above each group is most of
                                           what makes this read as a footer rather
                                           than as stacked lists. */
                                        className="border-t border-white/15 pt-5"
                                    >
                                        <h4 className="m-0 mb-3 font-index-sans text-base font-semibold normal-case tracking-normal text-white min-[721px]:mb-[14px] min-[721px]:text-[18px]">
                                            {group.title}
                                        </h4>
                                        <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                            {group.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        href={link.href}
                                                        {...(offsite(link.href)
                                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                                            : {})}
                                                        data-track="new_footer_nav_link"
                                                        data-track-label={`${group.title} → ${link.label}`}
                                                        data-track-section="new_footer"
                                                        className="text-sm text-white/80 transition-colors duration-[180ms] hover:text-white"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Clipped and masked to fade downward. Set in caps here and
                    nowhere else: the lowercase-v rule governs how the name is
                    written in prose; this is a wordmark treatment, it is
                    aria-hidden, and the accessible name of the company is
                    carried by the nav logo and the copyright line below. */}
                <div
                    className="mt-11 h-[0.78em] select-none overflow-hidden text-[14.6vw] [mask-image:linear-gradient(#000_62%,transparent_99%)] min-[721px]:mt-[clamp(48px,6vw,88px)] min-[721px]:text-[min(12.8vw,184px)]"
                    aria-hidden="true"
                >
                    {/* letter-spacing carries the width and font-size carries
                        the height: set to fill the line on its own, the glyphs
                        would be three times the band's height. The trailing
                        letter-space after the last glyph is clipped by the
                        parent's overflow, so the run still ends flush right. */}
                    <span className="block whitespace-nowrap text-center font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[length:inherit] font-bold leading-none tracking-[0.037em] text-transparent [-webkit-text-fill-color:transparent] [-webkit-text-stroke:0.8px_rgba(255,255,255,0.34)] min-[721px]:tracking-[0.087em] min-[721px]:[-webkit-text-stroke:1px_rgba(255,255,255,0.34)]">
                        {WORDMARK.toUpperCase()}
                    </span>
                </div>

                <div className="flex flex-col items-start gap-[14px] border-t border-white/10 pt-6 text-[14px] text-white/60 min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between min-[721px]:gap-4 min-[721px]:text-[15px]">
                    <p className="m-0">
                        {COPYRIGHT}{' '}
                        <span className="ml-[10px] border-l border-white/20 pl-[11px] text-white/45">{ENTITY}</span>
                    </p>
                    <div className="flex flex-wrap gap-x-[22px] gap-y-2">
                        {LEGAL.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                {...(offsite(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                data-track={`new_footer_${link.track}`}
                                data-track-label={link.label}
                                data-track-section="new_footer"
                                className="text-white/60 transition-colors duration-[180ms] hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
