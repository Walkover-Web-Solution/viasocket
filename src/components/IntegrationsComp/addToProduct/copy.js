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

    // The use cases section under the hero, shown only when the admin panel has use cases for the app.
    buildEyebrow: 'Use cases',
    buildTitle: 'What our users are building with {appName} Integration',
    buildSub: 'Explore ways to use {appName} capabilities to build features your customers need.',

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
    ['Features', '/features'],
    ['Book a demo', 'https://cal.id/team/viasocket/workflow-setup-discussion'],
    ['Pricing', '/pricing'],
    ['Log in', 'https://flow.viasocket.com/integrations'],
];
export const START_URL = 'https://flow.viasocket.com/integrations';

export const FOOTER_GROUPS = [
    ['Product', [['Features', '/features'], ['Use cases', '/use-cases'], ['Integrations', '/integrations'], ['Discover top apps', '/discovery'], ['Security', '/help/security-and-compliance']]],
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
    metaTitle: 'viaSocket Key Features | Integration Layer',
    metaDesc:
        "Explore viaSocket's integration layer features, including 2,300+ app integrations, managed authentication, data mapping, AI agents, browser automation, and more.",
    h1: 'Everything You Need to Build Connected Products and Agents',
    sub: 'Give your SaaS products and AI applications the infrastructure to connect apps, manage authentication, execute actions, and build AI-powered experiences.',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    expert: 'Talk to an expert',
    expertUrl: 'https://viasocket.com/experts-are-live',
    // Every feature, in one grid: [title, description, icon, { href, cta, ex, hint }]. Most cards are
    // plain on purpose; a few carry a small example at the bottom (`ex`: app logos, a line of code, a
    // field mapping, a chat, run-status squares) and a few only a hint (`hint`: 'check' on the icon,
    // 'live' dot by the title). `ai` gives the three AI tiles a slowly moving colour wash.
    // Illustrative only, no figures.
    features: [
        ['Managed Authentication', 'Handle authentication flows, access tokens, and token refresh without building and maintaining them for every integration.', 'key',
            { hint: 'check' }],
        ['2,300+ App Integrations', 'Connect your product to thousands of apps with ready-to-use actions to read, create, update, and manage data.', 'apps',
            { href: '/integrations', cta: 'Browse all integrations', ex: { kind: 'apps', apps: ['gmail', 'slack', 'hubspot', 'salesforce', 'sheets', 'notion', 'shopify', 'airtable'], more: '+2.3K' } }],
        ['Custom Integrations & API Requests', "Connect services beyond our existing catalog or access additional API endpoints when pre-built actions aren't enough.", 'code',
            { ex: { kind: 'code', method: 'GET', text: '/v2/invoices?status=open' } }],
        ['Triggers & Webhooks', 'Respond to events from connected applications and external systems to keep your product up to date.', 'bolt',
            { hint: 'live' }],
        ['Multi-tenant Support', 'Manage separate connected accounts and integration configurations for each customer.', 'users'],
        ['Custom Branding & UX', "Deliver integration and connection experiences that match your product's branding and interface.", 'brand'],
        ['AI Agents', 'Build powerful AI agents with 50+ AI models, memory, connected apps and tools, and multi-step workflows that enable agents to reason, make decisions, and execute tasks autonomously.', 'agent',
            { ai: true }],
        ['In-app AI Chatbots', 'Add chat interfaces that let users retrieve information and perform actions using your product and its connected apps.', 'chat',
            { ai: true, ex: { kind: 'chat', me: 'Which deals close this week?', bot: 'Three, all in HubSpot. Want a summary?' } }],
        ['Browser Actions', 'Give AI agents the ability to browse websites, navigate pages, interact with web elements, and complete tasks in a browser when needed.', 'browser',
            { ai: true }],
        ['Real-time Action Execution', 'Execute actions on demand with low latency so your product can interact with connected applications when needed.', 'fast'],
        ['Background Execution & Retries', 'Run longer tasks asynchronously and automatically retry eligible failed executions to recover from temporary errors.', 'retry'],
        ['Scheduled Execution', 'Run actions and tasks at defined intervals without requiring users to trigger them manually.', 'clock'],
        ['Managed Data Mapping', 'Map and transform data between your product and connected applications without building custom mappings for every integration.', 'map',
            { ex: { kind: 'map', from: 'first_name', to: 'FirstName' } }],
        ['Execution Replay', 'Replay failed executions when appropriate, helping recover from errors without rebuilding the entire workflow.', 'replay'],
        ['Execution Monitoring & Debugging', 'Track execution status, inspect logs, identify errors, and troubleshoot issues from one place.', 'pulse',
            { ex: { kind: 'status', runs: 'oooooooxoo' } }],
        ['Regional Deployment', 'Choose the server region where your viaSocket infrastructure runs to meet your deployment and data residency requirements.', 'globe'],
    ],
    blogTitle: 'Learn more about building connected products',
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

// /use-cases: what people build with viaSocket. Kept word for word with the approved copy.
export const APP_ICONS = {
    salesforce: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png',
    hubspot: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    outlook: 'https://stuff.thingsofbrand.com/microsoft.com/images/img9_Microsoft_Office_Outlook.png',
    slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    notion: 'https://stuff.thingsofbrand.com/notion.so/images/img667018e3f8_notion.jpg',
    sheets: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    trello: 'https://stuff.thingsofbrand.com/trello.com/images/img6e60f5aa10_trello.jpg',
    airtable: 'https://stuff.thingsofbrand.com/airtable.com/images/img6da0d45803_airtable.jpg',
    mailchimp: 'https://stuff.thingsofbrand.com/mailchimp.com/images/img673876726d_mailchimp.jpg',
    freshdesk: 'https://stuff.thingsofbrand.com/freshdesk.com/images/imgf_freshdesk.png',
    openai: 'https://stuff.thingsofbrand.com/openai.com/images/img6299ba7193_openai.jpg',
    linkedin: 'https://stuff.thingsofbrand.com/linkedin.com/images/img60aec4bbba_linkedin.jpg',
    shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
};
// Each card's apps, by icon key.
const app = (k) => ({ name: k, icon: APP_ICONS[k] });

export const USECASES_COPY = {
    metaTitle: 'Explore Use Cases & Examples of Integration Layer | viaSocket',
    metaDesc:
        'Discover what you can build with viaSocket. Explore use cases for adding integrations to products, powering AI agents, and enabling apps to take action across connected tools.',
    h1: 'Explore What You Can Build with viaSocket',
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    expert: 'Talk to an expert',
    expertUrl: 'https://viasocket.com/experts-are-live',
    cardCopy: 'Copy prompt',
    cases: [
        { title: 'AI Agent / AI App', apps: [app('salesforce'), app('hubspot'), app('gmail')],
          prompt: "I'm building an AI sales platform. Let my users connect Salesforce, HubSpot, and Gmail so their agents can retrieve leads, update deals, create tasks, and send follow-up emails from one interface." },
        { title: 'AI Agent Builder', apps: [app('gmail'), app('slack'), app('notion'), app('hubspot')],
          prompt: "I'm building a platform where users create their own AI agents. Let them select apps, connect their accounts, choose available actions, and give those actions to their agents as tools." },
        { title: 'SaaS Apps', apps: [app('gmail'), app('outlook'), app('slack'), app('salesforce')],
          prompt: "I'm building a CRM. Let customers connect Gmail, Outlook, Slack, and their existing CRM systems to sync contacts, associate conversations with deals, and receive notifications when important records change." },
        { title: 'Complete App Marketplace', apps: [app('slack'), app('hubspot'), app('shopify'), app('notion')],
          prompt: 'I want to bring viaSocket’s entire app marketplace inside my app and all new apps in the future.' },
        { title: 'Embedded Automation Builder', apps: [app('slack'), app('sheets'), app('hubspot'), app('trello')],
          prompt: "I'm building an automation feature inside my SaaS. Let customers connect their own apps, select triggers and actions, configure field mappings, and create workflows without leaving my product." },
        { title: 'Internal Tools Builder', apps: [app('airtable'), app('salesforce'), app('sheets')],
          prompt: "I'm building an internal tools platform. Let employees connect company systems and create interfaces that retrieve records, update data, and execute business operations without building custom integrations for every app." },
        { title: 'Internal App', apps: [app('hubspot'), app('mailchimp'), app('freshdesk'), app('slack')],
          prompt: 'I want to build an admin dashboard that brings together customer data from my CRM, email activity from my marketing platform, support tickets, and employee activity so I can see everything in one place.' },
        { title: 'AI Agent Integrations', apps: [app('openai'), app('gmail'), app('slack'), app('notion')],
          prompt: 'I want to build a product that lets users connect their existing AI agents to the apps they use and give those agents access to the actions they need.' },
        { title: 'AI Chatbot for SaaS', apps: [],
          prompt: 'I want to add a chatbot to my CRM that lets users find contacts, check deal status, retrieve customer information, and update records by asking questions in plain English.' },
        { title: 'AI Agent in SaaS', apps: [app('linkedin'), app('gmail')],
          prompt: 'I want to add an AI assistant to my CRM that researches leads using their details, writes personalized sales emails, and saves them as drafts in Gmail.' },
        { title: 'Browser Agent', apps: [app('linkedin')],
          prompt: 'I want to let my users find relevant job openings across job portals, fill out application forms using their profile and resume, and submit applications from my platform.' },
        { title: 'Custom API Integration', apps: [],
          prompt: 'I’m building a project management app. Let my users connect a project management tool not in the marketplace using its API documentation so they can view projects and manage tasks from my app.' },
        { title: 'Internal App Integration', apps: [],
          prompt: 'I’ve built an internal CRM. Let my employees retrieve customer details from our internal support system and update CRM records using data from both systems.' },
        { title: 'Chatbot for Internal App', apps: [app('slack')],
          prompt: 'I’m building an internal IT support chatbot. Let employees ask questions about company systems, check their access permissions, and create support tickets by connecting the chatbot to our private IT tools and internal APIs.' },
    ],
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'FAQs about viaSocket use cases',
    faqs: [
        ['What can you build with viaSocket?', 'You can build AI agents, AI-powered SaaS features, embedded integration and automation builders, app marketplaces, internal tools, and applications that connect to third-party or internal systems.'],
        ['Can I use viaSocket to add integrations to my SaaS product?', 'Yes. viaSocket helps you add app integrations to your product so your customers can connect their accounts, access app data, and perform supported actions without you building and maintaining every integration yourself.'],
        ['Can I use viaSocket to build AI agents that interact with external apps?', 'Yes. You can use app connections and supported actions to give AI agents access to business tools, allowing them to retrieve information and perform tasks within the permissions and capabilities you configure.'],
        ['Can I embed an integration or automation builder in my product?', 'Yes. You can build customer-facing experiences where users connect their apps, configure supported triggers and actions, and create workflows within your product.'],
        ["Can viaSocket connect to apps that aren't in its marketplace?", "Custom integrations may be possible using an app's API, depending on the available API documentation, authentication requirements, and supported integration capabilities."],
        ['Can I use viaSocket for internal tools and private APIs?', 'You can build connected internal applications and tools using supported integrations and custom API connections, subject to the authentication, access, and connectivity requirements of your systems.'],
    ],
};

// /new-direction: the founder's letter. Kept word for word with the approved copy.
// Blocks: ['p', text] · ['strong', text] (a line that stands alone) · ['h2', text] ·
// ['quote', text] · ['list', [items]].
export const LETTER_COPY = {
    metaTitle: 'Why we’re changing viaSocket | viaSocket',
    metaDesc: 'The infrastructure that powered our automations can now power your apps and AI agents.',
    h1: 'Why we’re changing viaSocket',
    dek: 'The infrastructure that powered our automations can now power your apps and AI agents.',
    authors: [
        { name: 'Pushpendra Agrawal', role: 'Founder, viaSocket', photo: '/new-home/assets/founder-pushpendra.webp' },
        { name: 'Ravi Paliwal', role: 'Co-founder, viaSocket', photo: '/new-home/assets/cofounder-ravi.jpg' },
    ],
    copyHint: 'Paste it into Cursor, Claude Code or Codex.',
    body: [
        ['p', 'If you arrived here looking for one of our older workflow guides, you deserve an explanation.'],
        ['strong', 'viaSocket is changing. I want to tell you why.'],
        ['p', 'We built viaSocket to help businesses connect their apps and automate repetitive work. You chose what should start the work, added the steps, connected your accounts and turned it on.'],
        ['p', 'That was useful. It made things possible without having to write every integration yourself.'],
        ['p', 'But I don’t think the workflow editor should be the centre of that experience anymore.'],
        ['p', 'You wanted the work done. Building a workflow was the way to get there.'],
        ['strong', 'Now we have another way.'],

        ['h2', 'You should be able to build the experience you need'],
        ['p', 'AI coding agents can help build applications, work with existing code and implement changes directly in a project. That gives builders more freedom over the software they create.'],
        ['p', 'A sales team might need a small CRM that fits its process. A SaaS company might want integrations inside its product. Someone building a support agent might need it to check orders and update tickets.'],
        ['p', 'None of them should have to shape their entire product around our workflow editor.'],
        ['p', 'That led us to a simple question:'],
        ['quote', 'Why make you come into viaSocket to connect your software? Why not let you bring viaSocket into the software you’re building?'],
        ['strong', 'That is the new direction.'],
        ['p', 'viaSocket is the integration and action layer for apps and AI agents. You build the product. We provide the connections and actions underneath it, across 2,300+ apps.'],

        ['h2', 'The action is small. The responsibility behind it isn’t.'],
        ['p', '“Send an email” sounds simple.'],
        ['p', 'Until every customer needs to connect their own email account. Permissions differ. Tokens expire. An API changes. A request fails. Someone needs to know what happened.'],
        ['p', 'AI can help write the integration code. But writing it and being responsible for it are different jobs.'],
        ['p', 'viaSocket handles the connection lifecycle, authenticated actions and event infrastructure so your team does not have to implement that separately for every supported app. Your customers authorize their own accounts; your software uses those connections.'],
        ['p', 'You keep your interface, your application logic and your choice of AI.'],
        ['p', 'Your application stays in the hosting environment you choose. It calls viaSocket for the connected work. You do not have to move your whole application into our platform.'],

        ['h2', 'What does that make possible?'],
        ['list', [
            'Your support agent can look up an order before replying, then update the ticket.',
            'Your recruiting application can create interviews in the recruiter’s connected calendar.',
            'Your CRM can send emails from each customer’s own account.',
            'Your SaaS can let customers create automations inside your product, using their own connections and rules.',
        ]],
        ['strong', 'The experience belongs to you.'],
        ['p', 'viaSocket is underneath, handling the connected actions.'],
        ['p', 'This is not about putting a chat box on our old workflow builder and calling it an AI product. It is about making the infrastructure useful independently of the builder.'],
        ['p', 'The workflow engine still matters. The integrations still matter. The execution still matters.'],
        ['p', 'They no longer need to dictate what your product looks like.'],

        ['h2', 'Why we believe we should build this'],
        ['p', 'We are not starting with a prompt and hoping infrastructure takes care of itself.'],
        ['p', 'We built the integration and execution foundations to power our own automation product. Now we are making those capabilities available directly to other products and agents.'],
        ['p', 'Our team at Walkover also built MSG91. Through that communications business, we have operated infrastructure at billion-message scale.'],
        ['p', 'That experience shapes how we think.'],
        ['p', 'A successful demonstration is not enough. What happens when a connection expires? When a service rejects a request? When two customers have different permissions? When something fails and a developer needs an answer?'],
        ['strong', 'Those are not details to add after launch. They are the product.'],
        ['p', 'We want you to use viaSocket because you trust us to maintain this layer, not because you think your AI cannot write an API call.'],

        ['h2', 'AI-first does not mean AI for every step'],
        ['p', 'There is another thing I feel strongly about.'],
        ['quote', 'If a step is predictable, use code or an API. If it requires interpretation or judgment, use AI. If it requires someone’s permission, ask.'],
        ['p', 'Making AI improvise every operation is not progress.'],
        ['p', 'The goal is less manual work for the person using the product, not more AI calls underneath it.'],
        ['p', 'We are also working on a separate experience for businesses that simply want to hand over work: do this once, do it whenever something happens, or keep doing it.'],
        ['p', 'That experience will be designed around delegation rather than drawing workflows. It is a separate product direction, not something we are pretending this infrastructure launch already delivers.'],
        ['p', 'viaSocket will provide the foundation.'],

        ['h2', 'Start with one thing your product needs to do'],
        ['p', 'You do not need to rebuild your application.'],
        ['p', 'Start with one integration. Let a customer connect an account. Complete one useful action inside your own product.'],
        ['p', 'Our setup prompt helps your coding agent implement the integration. You still authorize the accounts, review the setup and verify the result.'],
        ['p', 'That is the change.'],
        ['p', 'Earlier, you came to viaSocket to build an automation.'],
        ['strong', 'Now, bring viaSocket into what you’re building.'],
    ],
};

// /pricing: plans, the savings calculator and the viaSocket Pass
const SALES_URL = 'https://cal.id/team/viasocket/embed-viasocket';
export const PRICING_COPY = {
    metaTitle: 'Pricing · viaSocket',
    metaDesc: '100K tasks and 1,000 AI credits free every month, on every plan. Higher plans take more off your usage.',

    h1: 'Cheaper than building and maintaining it yourself.',
    sub: '100K tasks and 1,000 AI credits free every month, on every plan. Higher plans take more off your usage.',
    yearlyNote: '2 months free',

    launchLabel: 'Launch price',
    // tagline: under the name; m / y: the price monthly and on annual billing (2 months free); per: the
    // suffix; launch: shows "Launch price" above the price; note: the line under the price. A perk can be
    // { text, limit: true } for a limit (an empty box instead of a check). limits: the included tasks and
    // AI credits and the monthly launch price, as numbers, for the plan finder below.
    plans: [
        {
            name: 'Free',
            tagline: 'For building and testing',
            m: '$0',
            y: '$0',
            perks: ['100K tasks a month', '1,000 AI credits a month', { text: 'Stops at the limit', limit: true }],
            limits: { tasks: 100e3, credits: 1e3, price: 0 },
            cta: 'Start free',
            href: START_URL,
        },
        {
            name: 'Pro',
            tagline: 'For going live',
            launch: true,
            m: '$19',
            y: '$190',
            per: ['/mo', '/yr'],
            perks: ['250K tasks a month', '10,000 AI credits a month', 'Pay as you go'],
            limits: { tasks: 250e3, credits: 10e3, price: 19 },
            cta: 'Start with Pro',
            href: START_URL,
        },
        {
            name: 'Business',
            tagline: 'For high volume',
            badge: 'Best value',
            launch: true,
            m: '$99',
            y: '$990',
            per: ['/mo', '/yr'],
            perks: ['1M tasks a month', '50,000 AI credits a month', 'Pay as you go, 40% cheaper'],
            limits: { tasks: 1e6, credits: 50e3, price: 99 },
            cta: 'Start with Business',
            href: START_URL,
            popular: true,
        },
        {
            name: 'Enterprise',
            tagline: 'For custom needs',
            m: 'Custom',
            y: 'Custom',
            note: 'Billed annually',
            perks: ['Custom tasks and AI credits', 'Pay as you go, up to 60% cheaper', 'Custom terms and support'],
            cta: 'Talk to us',
            href: SALES_URL,
        },
    ],
    // Under the plans. The first line's [text, href] parts are links.
    everyPlan: ['Every plan: ', ['2,300+ integrations', '/integrations'], ', unlimited connected accounts, users, workflows and projects.'],
    taskNote: 'A task is one call or one delivered trigger event; a poll that finds nothing is free. AI credits pay for AI, built-in tools and data.',

    // The plan finder: the cheapest plan whose included tasks and AI credits cover the usage on the
    // sliders (limits on each plan above); past Business, Enterprise. Sliders step through these amounts.
    calcTitle: 'Find the right plan',
    calcLead: 'Move the sliders to your monthly usage.',
    calcTasks: 'Tasks a month',
    calcCredits: 'AI credits a month',
    calcPlan: 'Best plan for you',
    calcPrice: 'Price a month',
    calcTasksIncl: 'Tasks included',
    calcCreditsIncl: 'AI credits included',
    calcCustom: 'Custom',
    calcNote: 'At launch prices, billed monthly. A task is one call or one delivered trigger event. Above Business, Enterprise sets custom tasks and AI credits.',
    calcSteps: {
        tasks: [0, 25e3, 50e3, 100e3, 150e3, 200e3, 250e3, 400e3, 500e3, 750e3, 1e6, 1.5e6, 2e6, 3e6],
        credits: [0, 500, 1e3, 2.5e3, 5e3, 10e3, 20e3, 30e3, 50e3, 75e3, 100e3],
        tasksStart: 5,
        creditsStart: 4,
    },

    salesUrl: SALES_URL,

    faqEyebrow: 'FAQ',
    faqTitle: 'Pricing questions, answered',
    // [question, answer, optional [link text, href] at the end of the answer]
    faqs: [
        ['Is there a free plan?', 'Yes. The Free plan is $0 and includes 100K tasks and 1,000 AI credits every month. It stops when you reach either limit.'],
        ['What counts as a task?', 'A task is one call or one delivered trigger event; a poll that finds nothing is free. Connected accounts, users and seats are never billed.'],
        ['What are AI credits?', 'AI credits pay for AI, built-in tools and data. Free includes 1,000 a month, Pro 10,000 and Business 50,000; Enterprise sets a custom amount.'],
        ['What happens when I reach my limit?', 'On Free, usage stops at the limit until the next month. On Pro and Business you keep going and pay as you go for the extra, 40% cheaper on Business. Enterprise pays as it goes at up to 60% cheaper.'],
        ['Do I pay per integration, user or connected account?', 'No. Every plan includes 2,300+ integrations and unlimited connected accounts, users, workflows and projects. You pay for tasks and AI credits.'],
        ['Which plan is right for me?', 'Free is for building and testing, Pro for going live, Business for high volume, and Enterprise for custom needs. Move the sliders to your usage to see which plan covers it.', ['Find the right plan', '#plan-finder']],
        ['What does launch pricing mean?', 'Pro at $19/mo and Business at $99/mo are launch prices, available for a limited time. Launch pricing may end any time.'],
        ['Can I change plans later?', 'Yes, upgrade or downgrade any time. Annual plans get 2 months free.'],
    ],
};

// /pass: the viaSocket Pass, the balance that pays for usage, AI and tools
export const PASS_COPY = {
    metaTitle: 'viaSocket Pass · viaSocket',
    metaDesc: "One Pass for everything your product uses. It pays for calls, trigger events and AI at your plan's rates, plus built-in tools and other platforms with no keys to manage.",

    passEyebrow: 'viaSocket Pass',
    passTitle: 'One Pass for everything your product uses',
    passLead: "Your plan's included usage and anything you add sit in one Pass. It pays for calls, trigger events and AI at your plan's rates, plus built-in tools and other platforms with no keys to manage.",
    passCta: 'Get your Pass',
    passNote: 'Every plan includes 100K calls and 50K trigger events a month before the Pass is used.',
    passCard: {
        title: 'viaSocket Pass',
        status: 'Auto top-up on',
        label: 'Balance',
        balance: '$42.30',
        sub: 'Top-ups never expire',
        rows: [
            ['Calls, 1,000', '$0.15'],
            ['AI model, summary', '$0.004'],
            ['Web search', '$0.005'],
            ['Contact enrichment', '$0.020'],
        ],
        note: 'Example charges on Pro.',
    },

    ratesTitle: 'Rates: calls, trigger events and AI',
    ratesCols: ['Beyond the free amounts', 'Free', 'Pro', 'Business', 'Typical alternatives'],
    ratesRows: [
        ['Call', '$0.00025', '$0.00015', '$0.0001', '$0.0003'],
        ['Trigger event', '$0.0025', '$0.0015', '$0.001', '$0.003'],
        ['AI calls, per model', 'Standard', 'Lower', 'Lowest', 'Varies'],
        ['Usage', 'Standard rates', '40% cheaper', '60% cheaper', 'n/a'],
        ['Included in your Pass', '$2 on us, first month', '$19 a month', '$99 a month', 'n/a'],
        ['Worth, with the free calls', 'n/a', 'About 225K calls', 'About 1.1M calls', 'n/a'],
    ],
    ratesNote: "A call is an action run or an automation step. A trigger event is billed only when it's delivered; a poll that finds nothing is free. Free stops when its free amounts and the $2 on us are used. Enterprise rates are custom.",

    toolsTitle: 'Pass: built-in tools and other platforms',
    toolsLead: 'Paid per use from your Pass, on every plan. Pro pays less and Business pays least.',
    toolsCols: ['Tool', 'Charged per', 'Free', 'Pro', 'Business'],
    // [group, [[tool, charged per, free, pro, business]]]
    toolsGroups: [
        [
            'Built-in tools',
            [
                ['Web search', 'Search', 'To be set', 'To be set', 'To be set'],
                ['Page reading', 'Page', 'To be set', 'To be set', 'To be set'],
                ['SMS', 'Message, by country', 'To be set', 'To be set', 'To be set'],
                ['WhatsApp message', 'Message', 'To be set', 'To be set', 'To be set'],
            ],
        ],
        [
            'Other platforms',
            [
                ['Contact and company data', 'Lookup', 'To be set', 'To be set', 'To be set'],
                ['Web scraping', 'Page', 'To be set', 'To be set', 'To be set'],
                ['Voice generation', 'Minute', 'To be set', 'To be set', 'To be set'],
                ['Transcription', 'Minute', 'To be set', 'To be set', 'To be set'],
                ['Image generation', 'Image', 'To be set', 'To be set', 'To be set'],
            ],
        ],
    ],
    toolsNote: 'Every other tool is charged at its own listed price per use, shown before you use it and in your logs.',

    vsTitle: 'One Pass instead of a pile of subscriptions',
    vsLead: 'Your product only needs a few calls from each tool. Pay for those calls, not for the plans.',
    vsSubs: {
        title: 'Separate subscriptions',
        rows: [['Search', '$49/mo'], ['Email finder', '$49/mo'], ['Voice', '$22/mo'], ['Scraping', '$19/mo']],
        total: ['Every month, used or not', '$139'],
    },
    vsPass: {
        title: 'viaSocket Pass',
        rows: [['Search, 1 call', '$0.005'], ['Email finder, 1 call', '$0.020'], ['Voice, 1 call', '$0.090'], ['Scraping, 1 call', '$0.003']],
        total: ['Only what you use', '$0.118'],
    },
    vsNote: 'Illustrative prices.',

    controlTitle: 'You stay in control',
    // [title, text, icon]
    control: [
        ['Fill it your way', 'Add any amount. Pro and Business include monthly usage. What you add never expires.', 'apps'],
        ['Auto top-up', 'Refill automatically when it runs low, so your product never stops mid-run.', 'retry'],
        ['See and switch off', "Every run's cost shows in your logs, by tool and by user. Turn the Pass off for a project in one click.", 'pulse'],
    ],
    // [title, lead, points]
    controlNotes: [
        ["Your users' own accounts", 'Never charged to your Pass', ['Calls through accounts your users connect count toward your plan', 'Use them alongside Pass tools in the same run']],
        ['When your Pass runs out', 'Only Pass tools pause', ["Your users' connected accounts keep working", 'Add funds or turn on auto top-up to carry on']],
    ],
    salesUrl: SALES_URL,
    pricingLink: ['See plans and pricing', '/pricing'],

    faqEyebrow: 'FAQ',
    faqTitle: 'Pass questions, answered',
    faqs: [
        ['What is the Pass?', "Your viaSocket balance. It holds your plan's included usage and anything you add, and pays for calls, trigger events, AI, built-in tools and other platforms, with no API keys of your own."],
        ['How does it work with my plan?', 'Your plan sets your rates and puts its included usage in your Pass each month. Everything your product uses is paid from the Pass at those rates.'],
        ['Does my balance expire?', "What you add never expires. Your plan's monthly usage resets each month."],
        ['Which plans can use it?', 'All of them. Free pays per use; Pro pays less; Business pays least.'],
        ['How do I build with it?', 'Your coding agent calls Pass tools the same way as any integration. No keys to add.'],
        ['How do I see what I spent?', 'Billing shows your balance and spend by tool. Logs show the cost of every run.'],
    ],
};

// /blogs and /blogs/{slug}
export const BLOGS_COPY = {
    metaTitle: 'Blog · viaSocket',
    metaDesc: 'Guides, product updates and lessons from building the integration layer for products and AI agents.',

    eyebrow: 'Blog',

    emptyTitle: 'The first posts are on their way.',
    emptyText: 'We are writing them now. Until then, see what the integration layer does.',
    emptyLink: 'Explore the features',

    backLink: 'All posts',
    shareLabel: 'Share this article',
    tocTitle: 'Jump to section',
    // The card that slides in on a post once the reader scrolls down
    promoTitle: '100K tasks and 1,000 AI credits free every month.',
    promoCta: 'Start free',
    moreTitle: 'Keep reading',
};
