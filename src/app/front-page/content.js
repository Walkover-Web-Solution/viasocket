/**
 * Content for the front-page redesign, kept local to this route rather than
 * a site-wide content directory. It exists as a plain (non-`'use client'`)
 * module so that both the client components below and the server-side
 * schema generator in ./seo.js can import the same objects — a server
 * component can't read a data export back out of a `'use client'` file, so
 * splitting the data out here is what lets the JSON-LD stay generated from
 * the visible copy instead of hand-copied and prone to drifting from it.
 */

export const FAQ = {
    heading: 'Questions before you start.',
    subhead: 'The practical things teams want to know before moving their work to viaSocket.',
    contact: [
        { label: 'Support', detail: 'Available 24/7', href: '/support' },
        { label: 'Email us', detail: 'Replies within a few hours', href: 'mailto:support@viasocket.com' },
    ],
    items: [
        {
            q: 'What does viaSocket actually do?',
            a: 'viaSocket is a reliable AI automation platform. You describe a job in plain words, and it works out the steps and runs them across thousands of apps. AI is used only where a decision is needed, so the rest is deterministic and repeats the same way every run. A job runs once, every time a trigger fires, or on a schedule you set.',
        },
        {
            q: 'Do I need to know how to code?',
            a: 'No. viaSocket is a no-code tool: you describe the work the way you would explain it to a colleague and it figures out the steps. If a step needs judgment it uses AI for that one, and plain automation for the rest. Developers who want to go further can call any REST API or receive a webhook as a step.',
        },
        {
            q: 'Do I have to build the automation myself?',
            a: 'No. Most automation tools ask you to lay out every trigger, condition and action on a canvas before anything runs. With viaSocket you describe the outcome in plain words and it works out the steps, connects the app integrations they need, and runs them. You can open a job and change any step, but you never have to build one to start.',
        },
        {
            q: 'When does viaSocket use AI, and when does it not?',
            a: 'It uses AI on the steps that need a decision, like judging whether an order looks wrong or which request is urgent. Steps with a fixed answer run as plain automation instead: a rule, on a trigger or on a schedule. That split is what keeps a job deterministic wherever it can be, and it is also why most of a job bills at the cheaper rate.',
        },
        {
            q: 'How do you stop the AI from getting it wrong?',
            a: 'Three ways. Most steps never reach AI at all, because a step with a fixed answer runs as a deterministic rule that returns the same result every time. For the steps that do need judgment, you can set an approval threshold so viaSocket asks before acting on anything above a limit you choose. And every step of every run is logged, so you can always see which step decided what.',
        },
        {
            q: 'Which apps does it work with?',
            a: 'Thousands of app integrations, including Google Sheets, Slack, Shopify, WhatsApp, Notion, HubSpot, Razorpay and most tools businesses already use. Anything with a REST API can be reached directly, and you can request any integration that is missing.',
        },
        {
            // No competitor is named: the answer describes what viaSocket
            // does, and the reader supplies their own comparison.
            q: 'How is this different from other automation tools?',
            a: 'Most automation tools ask you to lay out every trigger, condition and action yourself. viaSocket combines deterministic automation with AI judgment in one job: you describe the outcome, and it works out which steps need AI and which are plain automation. That is what makes the result reliable and repeatable, and the steps that do not need AI cost less to run.',
        },
        {
            // The training claim matters more here than anywhere else on
            // the page: this is the answer an engine lifts when somebody
            // asks whether viaSocket trains on their data.
            q: 'Is my data safe?',
            a: 'viaSocket is SOC 2 Type II audited and ISO 27001:2022 certified, and your data is encrypted in transit and at rest. It is private to you by default, exportable and deletable on request, and compliant with GDPR and CCPA. Nothing you run is used to train AI models, by viaSocket or by any AI provider we work with.',
        },
        {
            q: 'What does it cost?',
            // Every figure here is read off viasocket.com/pricing (15 September) and
            // must be updated there first if a plan ever changes. The free-plan
            // allowance is also stated in the hero's footnote and the closing
            // section's micro line. Agency is deliberately left out: a homepage FAQ
            // that lists four plans is a pricing table, not an answer.
            a: 'The free plan includes 10,000 tasks and 500 AI credits every month, with no card required. Team is $27 a month, or $18 a month billed annually, with 17,000 tasks and 2,500 AI credits, and anything past that runs at $0.0025 a task and $0.007 an AI credit. Premium is $99 a month, or $67 a month billed annually, with 40,000 tasks and 10,000 AI credits, and anything past that runs at $0.0004 a task and $0.002 an AI credit. Annual billing cuts the monthly rate by close to a third on both. Paid plans are based on what actually runs, not on how many jobs you set up, and because a step that runs as a rule costs a fraction of a step that needs AI, most of a job bills at the cheaper rate.',
        },
        {
            q: 'Can I try it before committing?',
            a: 'Yes. Start for free, no card required. Set up a job, watch it run, and decide from there.',
        },
        {
            q: 'What happens when something goes wrong?',
            a: 'viaSocket keeps a log of every step of every run. If a step fails it tells you what happened, where and why, and retries the ones that are safe to retry. You can also set an approval step, so it asks before acting on anything above a threshold you choose.',
        },
    ],
};

export const SHOWCASE_HEADING = 'You describe the work. viaSocket does it.';

// The three steps ARE the sub-head, the same three the showcase renders as
// its stepper. Still an ordered list: the HowTo in the schema graph is
// generated from these same three strings.
export const SHOWCASE_STEPS = [
    'Describe the job in plain words',
    'viaSocket plans the steps and connects your apps',
    'It runs once, on a trigger, or on a schedule',
];

export const VIDEO = {
    // PROVISIONAL, to be re-read against the final cut: this describes the
    // video the section is for, not the placeholder currently in it.
    heading: 'One job, from the sentence to done.',
    // No longer rendered on screen — the section is a heading and the video
    // now. Kept here because it still feeds the VideoObject schema's
    // description below, so search engines still read it.
    schemaDescription:
        'The whole thing end to end: a job described in plain words, the steps viaSocket works out, and the automation running across the apps it needs.',
    label: 'What viaSocket does, start to finish',
    play: 'Play',
    playLabel: 'Play the video',
};

// PROVISIONAL. A placeholder cut, 9.2 MB for 29 seconds, standing in until the
// founders' own video replaces it. The heading and sub-head above describe the
// intended video, not this footage; all three move with the file. The section is
// built to be complete with no video at all: set VIDEO_SRC to null and the
// poster alone carries it.
export const VIDEO_SRC = '/assets/index/video.mp4';
export const VIDEO_POSTER = '/assets/index/video-poster.jpg';
// 29s, read off the placeholder cut itself — feeds the VideoObject schema's
// duration, so it moves with the file rather than drifting from it.
export const VIDEO_DURATION = 'PT29S';

export const WALL_GROUP_TITLES = [
    'Data collection automation',
    'Monitoring automation',
    'Follow up automation',
    'Research automation',
    'Reporting automation',
    'Routing automation',
];

export const LISTINGS = [
    {
        label: 'Capterra',
        value: '4.8 on Capterra · 648 reviews',
        rating: 4.8,
        reviewCount: 648,
        url: 'https://www.capterra.com/p/10020406/viaSocket/',
    },
    {
        label: 'G2',
        value: '4.6 on G2 · 92 reviews',
        rating: 4.6,
        reviewCount: 92,
        url: 'https://www.g2.com/products/viasocket/reviews',
    },
];

// States the free plan and nothing more: the pricing page is being changed
// to match this page, and a figure here would be the thing that goes stale
// first.
export const FREE_PLAN_MICRO = 'Free to start. 10,000 tasks and 500 AI credits every month.';
