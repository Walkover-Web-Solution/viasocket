// Copy for the single-app integration page ("Add {appName} to Your Product"). {appName} is
// filled with the app's name. Kept word for word with the approved design.

export const fill = (str, appName) => str.replace(/\{appName\}|\[appName\]/g, appName);

export const COPY = {
    metaTitle: 'Add [appName] Integration to Your Product & Agents | viaSocket',
    metaDesc:
        'Add [appName] to your product & agents with managed authentication, actions, triggers, and customer connections using viaSocket.',
    h1Lead: 'Add {appName} to Your',
    h1Words: ['Product', 'AI Agent', 'Internal Tool'],
    sub: 'Give your customers access to {appName} from within your product & agents. Use viaSocket to manage authentication, execute actions, and receive events from connected accounts.',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',

    featEyebrow: 'Integration Infrastructure',
    featTitle: 'Everything You Need to Manage {appName} Integrations',
    featLead:
        'Add {appName} to your product & agents today. viaSocket runs the infrastructure; your AI coding assistant does the setup.',
    feats: [
        ['Managed Authentication', 'Let your customers connect their {appName} accounts without building and maintaining OAuth flows yourself.', 'key'],
        ['Customer-Specific Connections', 'Manage separate {appName} connections for each customer in your product & agents.', 'users'],
        ['Actions, Triggers and Webhooks', 'Execute supported {appName} actions and receive events through a consistent integration interface.', 'bolt'],
        ['Managed Data Mapping', 'Map data between your product & agents and the formats expected by {appName}.', 'map'],
        ['Monitoring and Debugging', 'Track executions, inspect errors, and troubleshoot integration issues.', 'pulse'],
        ['Your Product & Agents, Your Experience', 'Offer {appName} integrations under your own branding and within your existing product & agents.', 'brand'],
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
    actSub: 'Explore available actions to let your product & agents interact with {appName}.',
    trgTitle: 'Respond to Events in {appName}',
    trgSub: 'Use triggers to let your product & agents respond to events from connected {appName} accounts.',

    learnTitle: 'Learn more about adding {appName} Integrations',
    learnSub: 'Explore guides and resources to help you implement and use {appName} integrations.',
    blogCategoryUrl: 'https://viasocket.com/blog/category/Action%20Layer%20for%20AI%20Products',

    aboutViasocket:
        'Connect 2,300+ apps to your product & agents with one prompt. Auth, events and actions handled. Free to start.',

    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about adding {appName} to your product & agents',
    faqSub: 'Find answers to common questions about integrating {appName} into your product & agents, including authentication, supported actions, triggers, and implementation.',
    faqs: [
        ['How can I integrate {appName} into my product & agents?', 'You can use viaSocket to add {appName} integration to your product & agents. viaSocket provides APIs, managed authentication, actions, and triggers to help you build integration features for your customers.'],
        ['Do I need to build and maintain the integration infrastructure myself?', 'No. viaSocket manages the integration infrastructure, including authentication, customer connections, and supported actions and triggers.'],
        ['Can my customers connect their own {appName} accounts?', 'Yes. viaSocket supports customer-specific connections, allowing each customer to authorize their own {appName} account.'],
        ['Can I offer {appName} integration under my own branding?', "Yes. You can provide the integration experience under your own branding and within the existing interface of your product & agents."],
        ['Can I connect {appName} with other apps?', 'Yes. viaSocket supports integrations with 2,300+ apps, allowing your product & agents to work with {appName} and other supported services.'],
        ['How do I execute actions in {appName}?', "Use viaSocket's supported actions and APIs to perform operations in connected {appName} accounts. Available operations depend on the integration's supported capabilities and the permissions granted."],
        ['Can my product & agents respond to events from {appName}?', 'Yes. You can use supported triggers and webhooks to receive events from {appName} and respond within your product & agents.'],
    ],

    endTitle: 'Bring {appName} Into Your Product & Agents',
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

// /features: the integration layer's features. Kept word for word with the approved copy.
export const FEATURES_COPY = {
    metaTitle: 'Integration Layer for SaaS & AI Products | viaSocket',
    metaDesc:
        "Explore viaSocket's integration layer features, including 2,300+ app integrations, managed authentication, data mapping, AI agents, browser automation, and more.",
    eyebrow: 'Features',
    h1: 'Everything You Need to Build Connected Products and Agents',
    sub: 'Give your SaaS products and AI applications the infrastructure to connect apps, manage authentication, execute actions, and build AI-powered experiences.',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    // [title, description, icon]
    features: [
        ['2,300+ App Integrations', 'Connect your product to thousands of apps with ready-to-use actions to read, create, update, and manage data.', 'apps'],
        ['Custom Integrations & API Requests', "Connect services beyond our existing catalog or access additional API endpoints when pre-built actions aren't enough.", 'code'],
        ['Managed Authentication', 'Handle authentication flows, access tokens, and token refresh without building and maintaining them for every integration.', 'key'],
        ['Multi-tenant Support', 'Manage separate connected accounts and integration configurations for each customer.', 'users'],
        ['Managed Data Mapping', 'Map and transform data between your product and connected applications without building custom mappings for every integration.', 'map'],
        ['Triggers & Webhooks', 'Respond to events from connected applications and external systems to keep your product up to date.', 'bolt'],
        ['Execution Monitoring & Debugging', 'Track execution status, inspect logs, identify errors, and troubleshoot issues from one place.', 'pulse'],
        ['In-app AI Chatbots', 'Add chat interfaces that let users retrieve information and perform actions using your product and its connected apps.', 'chat'],
        ['AI Agents', "Build agents that draft emails, score leads, research prospects, and complete tasks using your product's data and connected tools.", 'agent'],
        ['Browser Automation', "Enable actions on websites when a suitable API isn't available.", 'browser'],
        ['Custom Branding & UX', "Deliver integration and connection experiences that match your product's branding and interface.", 'brand'],
        ['Regional Deployment', "Deploy viaSocket infrastructure in your customers' preferred regions.", 'globe'],
        ['Real-time Action Execution', 'Execute actions on demand with low latency so your product can interact with connected applications when needed.', 'fast'],
        ['Background Execution & Retries', 'Run longer tasks asynchronously and automatically retry eligible failed executions to recover from temporary errors.', 'retry'],
        ['Scheduled Execution', 'Run actions and tasks at defined intervals without requiring users to trigger them manually.', 'clock'],
        ['Execution Replay', 'Replay failed executions when appropriate, helping recover from errors without rebuilding the entire workflow.', 'replay'],
        ['AI Tool Calling & MCP Support', 'Give compatible AI models and agents access to structured tools and supported integrations so they can perform actions across connected applications.', 'tool'],
        ['Custom Connection Experience', 'Control how users connect, authorize, and manage their third-party accounts within your application.', 'link'],
    ],
    blogTitle: 'Learn more about building connected products',
    blogLead: 'Guides and resources on adding integrations and AI capabilities to your product.',
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about viaSocket features',
    faqs: [
        ['What is an integration layer?', 'An integration layer provides the infrastructure needed to connect a product to third-party applications. It handles capabilities such as authentication, data mapping, action execution, triggers, and monitoring, allowing developers to build integrations without managing every underlying component themselves.'],
        ['How many apps does viaSocket support?', 'viaSocket supports integrations with more than 2,300 apps, allowing developers to connect their products to a wide range of third-party services.'],
        ['Can I build custom integrations with viaSocket?', "Yes. You can connect services beyond the existing integration catalog and make additional API requests when pre-built actions don't meet your requirements."],
        ['How does viaSocket handle authentication?', 'viaSocket provides managed authentication capabilities, including authentication flows and token management, reducing the need to build and maintain these mechanisms separately for every integration.'],
        ['Does viaSocket support multi-tenant applications?', 'Yes. viaSocket supports managing separate connected accounts and integration configurations for different customers, making it suitable for SaaS products serving multiple tenants.'],
        ['Can I customize the integration experience?', "Yes. You can customize the integration experience to align with your product's branding and user interface, depending on your implementation requirements."],
        ['Can I add AI chatbots and agents to my product?', "Yes. You can use viaSocket to give AI chatbots and agents access to your product's capabilities and connected applications, enabling tasks such as retrieving information, drafting emails, scoring leads, and updating records."],
        ['Does viaSocket support MCP?', 'Yes. viaSocket supports MCP capabilities that allow compatible AI clients and agents to access supported tools and integrations.'],
        ['Can viaSocket interact with websites without APIs?', "Yes. Browser automation can enable interactions with websites when a suitable API isn't available."],
        ['Can I deploy viaSocket in different regions?', 'viaSocket supports regional infrastructure deployment to serve customers in their preferred regions, subject to available deployment options.'],
        ['How can I monitor and debug integrations?', 'viaSocket provides execution monitoring and debugging capabilities to help developers inspect execution status, review logs, identify errors, and troubleshoot integration issues.'],
        ['Does viaSocket support scheduled and background execution?', 'Yes. viaSocket supports scheduled execution and background processing, with retry capabilities for eligible failed executions.'],
    ],
};
