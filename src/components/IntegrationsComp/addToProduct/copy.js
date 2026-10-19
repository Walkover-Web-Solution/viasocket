// Copy for the single-app integration page ("Add {appName} to Your Product"). {appName} is
// filled with the app's name. Kept word for word with the approved design.

export const fill = (str, appName) => str.replace(/\{appName\}|\[appName\]/g, appName);

export const COPY = {
    metaTitle: 'Add [appName] Integration to Your Product | viaSocket',
    metaDesc:
        'Add [appName] to your product with managed authentication, actions, triggers, and customer connections using viaSocket.',
    h1Lead: 'Add {appName} to Your',
    h1Words: ['Product', 'AI Agent', 'Internal Tool'],
    sub: 'Give your customers access to {appName} from within your product. Use viaSocket to manage authentication, execute actions, and receive events from connected accounts.',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',

    featEyebrow: 'Integration Infrastructure',
    featTitle: 'Everything You Need to Manage {appName} Integrations',
    featLead:
        'Add {appName} to your product today. viaSocket runs the infrastructure; your AI coding assistant does the setup.',
    feats: [
        ['Managed Authentication', 'Let your customers connect their {appName} accounts without building and maintaining OAuth flows yourself.', 'key'],
        ['Customer-Specific Connections', 'Manage separate {appName} connections for each customer in your product.', 'users'],
        ['Actions, Triggers and Webhooks', 'Execute supported {appName} actions and receive events through a consistent integration interface.', 'bolt'],
        ['Managed Data Mapping', 'Map data between your product and the formats expected by {appName}.', 'map'],
        ['Monitoring and Debugging', 'Track executions, inspect errors, and troubleshoot integration issues.', 'pulse'],
        ['Your Product, Your Experience', 'Offer {appName} integrations under your own branding and within your existing product experience.', 'brand'],
    ],
    featsShort: [
        ['Managed auth', 'key'],
        ['Per-customer connections', 'users'],
        ['Actions & triggers', 'bolt'],
        ['Data mapping', 'map'],
        ['Monitoring & logs', 'pulse'],
        ['Your branding', 'brand'],
    ],

    atTitle: 'Available Actions and Triggers for {appName}',
    actTitle: 'What You Can Do with {appName}',
    actSub: 'Explore available actions to let your product interact with {appName}.',
    trgTitle: 'Respond to Events in {appName}',
    trgSub: 'Use triggers to let your product respond to events from connected {appName} accounts.',

    learnTitle: 'Learn more about adding {appName} Integrations',
    learnSub: 'Explore guides and resources to help you implement and use {appName} integrations.',
    blogCategoryUrl: 'https://viasocket.com/blog/category/Action%20Layer%20for%20AI%20Products',

    aboutViasocket:
        'Connect 2,300+ apps to your product or AI agent with one prompt. Auth, events and actions handled. Free to start.',

    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about adding {appName} to your product',
    faqSub: 'Find answers to common questions about integrating {appName} into your product, including authentication, supported actions, triggers, and implementation.',
    faqs: [
        ['How can I integrate {appName} into my product?', 'You can use viaSocket to add {appName} integration to your product. viaSocket provides APIs, managed authentication, actions, and triggers to help you build integration features for your customers.'],
        ['Do I need to build and maintain the integration infrastructure myself?', 'No. viaSocket manages the integration infrastructure, including authentication, customer connections, and supported actions and triggers.'],
        ['Can my customers connect their own {appName} accounts?', 'Yes. viaSocket supports customer-specific connections, allowing each customer to authorize their own {appName} account.'],
        ['Can I offer {appName} integration under my own branding?', "Yes. You can provide the integration experience under your own branding and within your product's existing interface."],
        ['Can I connect {appName} with other apps?', 'Yes. viaSocket supports integrations with 2,300+ apps, allowing your product to work with {appName} and other supported services.'],
        ['How do I execute actions in {appName}?', "Use viaSocket's supported actions and APIs to perform operations in connected {appName} accounts. Available operations depend on the integration's supported capabilities and the permissions granted."],
        ['Can my product respond to events from {appName}?', 'Yes. You can use supported triggers and webhooks to receive events from {appName} and respond within your product.'],
    ],

    endTitle: 'Bring {appName} Into Your Product',
};

// The homepage's setup prompt (public/new-home/index.html #promptText).
export const BASE_PROMPT = `Integrate apps into this product with viaSocket.
Download https://flow.viasocket.com/documentation/skill.md to .claude/skills/viasocket-integrations/SKILL.md and follow it.
Keep it there for next time; download it again if a call in it fails.
My org ID, project ID and secret are at https://flow.viasocket.com/integrations. Ask me for them; they go in .env only.
Build it complete for my use case: decide who supplies each value (my code, my user in a picker, or my assistant per run) and who picks the action, then report each line of the skill's "Finished when" list.`;

/** The setup prompt for this app: the base prompt, naming the app in its first line. */
export function promptFor({ name }) {
    return BASE_PROMPT.replace('Integrate apps into', `Integrate ${name} into`);
}

// The homepage header (public/new-home/index.html).
export const NAV = [
    ['Features', '/#features'],
    ['Pricing', 'https://viasocket.com/developers/pricing'],
    ['Log in', 'https://flow.viasocket.com/integrations'],
];
export const START_URL = 'https://flow.viasocket.com/integrations';

export const FOOTER_GROUPS = [
    ['Product', [['Integrations', '/integrations'], ['Discover top apps', '/discovery'], ['Security', '/help/security-and-compliance']]],
    ['Build', [['List your app', 'https://cal.id/team/viasocket/bring-saas-app-on-viasocket'], ['Build your own plug', '/help/plugin-builder'], ['Billing partners', '/help/viasocket-embed/billing-partner']]],
    ['Partners', [['Become a partner', '/help/partners'], ['Partner program', '/experts'], ['Agency partners', '/agency-partner']]],
    ['Support', [['Book a demo', 'https://cal.id/team/viasocket/workflow-setup-discussion'], ['Contact support', '/support'], ['Request a feature', 'https://roadmap.viasocket.com/b/n0elp3vg/feature-ideas'], ['Request an integration', '/integrations']]],
    ['Company', [['About', '/help/about-us'], ['We’re hiring', 'https://walkover.in/careers'], ['Culture we foster', 'https://walkover.in/about/culture-we-foster'], ['Roadmap', 'https://roadmap.viasocket.com/roadmap'], ['AI transparency', '/help/security-and-compliance/ai-transparency']]],
];

// /integrations and /integrations/category/{name}
export const INDEX_COPY = {
    metaTitle: 'App Integrations for Your Product | viaSocket',
    metaDesc:
        'Integrate 2,300+ apps into your product with managed authentication, customer-specific connections, and ready-to-use actions and triggers.',
    h1: 'Integrate 2,300+ Apps into Your Products & agents',
    categoryH1: 'Integrate {category} Apps into Your Product',
    sub: 'Build and manage secure app integrations with managed authentication, customer-specific connections, and ready-to-use actions and triggers.',
    listYourApp: 'Want to list your app?',
    listYourAppLink: 'Build viaSocket integration',
    listYourAppUrl: 'https://viasocket.com/help/plugin-builder',
    searchPlaceholder: 'Search apps or categories',
    blogTitle: 'Learn more about adding app integrations',
    blogLead: 'Explore guides and resources to help you implement and use integrations in your product.',
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about app integrations',
    faqs: [
        ['What is an app integration layer?', 'An integration layer lets you connect your product to third-party apps through a common interface, without building and maintaining every integration independently.'],
        ['How can I add app integrations to my product?', "With viaSocket, you can select supported apps, use their available actions and triggers, and integrate them into your product through viaSocket's APIs."],
        ['How many app integrations does viaSocket support?', 'viaSocket supports 2,300+ app integrations. Available actions, triggers, and capabilities vary by app.'],
        ['Are viaSocket integrations secure?', 'viaSocket provides managed authentication and customer-specific connections to help you manage access to connected apps. Security also depends on your configuration, permissions, and implementation.'],
        ['Can my customers connect their own app accounts?', 'Yes. viaSocket supports customer-specific connections, allowing your customers to authorize their own accounts within your product.'],
        ['Can I customize the integration experience with my own branding?', "Yes. You can offer integrations under your own branding and within your product's existing user experience."],
        ['Do I need to build and maintain OAuth authentication for every app?', 'viaSocket provides managed authentication for supported integrations, reducing the need to implement and maintain individual authentication flows yourself.'],
        ['Can I choose which actions and triggers my product supports?', "Yes. You can use the supported actions and triggers relevant to your product's requirements."],
        ['Can I integrate apps that are not listed in the directory?', "You can explore custom integration options based on the app's API availability and your requirements."],
    ],
    browseByName: 'Browse apps by name',
};
