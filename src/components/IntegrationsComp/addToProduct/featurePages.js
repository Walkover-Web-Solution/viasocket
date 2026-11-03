// /features/{slug}: one page per feature, all from FeatureDetailPage.js. A feature in FEATURES_COPY.features
// gets a page (and its tile on /features becomes a link) once its `slug` has an entry here.
//
// Each page: {
//   metaTitle, metaDesc,
//   h1, sub,                                  hero
//   capsTitle, capsLead, caps: [[title, text, icon]],      what you get (icon names from icons.js)
//   stepsTitle, steps: [[title, text]],       how it works, three steps
//   usesTitle, uses: [[title, text]],         what teams build with it
//   related: [slug],                          other features shown at the end
//   faqs: [[question, answer]],
//   endTitle,                                 closing call to action
// }
// Draft copy: to be approved before launch.

export const FEATURE_PAGES = {
    'ai-agent': {
        metaTitle: 'AI Agents | Build Agents That Act in Your Product | viaSocket',
        metaDesc:
            'Build AI agents with 50+ AI models, memory, and 2,300+ connected apps as tools. Agents reason through multi-step tasks and take action for your users.',
        h1: 'Build AI Agents That Get Work Done in Your Product',
        sub: 'Give agents 50+ AI models, memory, and thousands of connected apps as tools, so they can reason through multi-step tasks and act for your users.',
        capsTitle: 'Everything an agent needs to act',
        capsLead: 'The model, the memory, the tools and the runtime, ready to use, so you build the agent and not the plumbing around it.',
        caps: [
            ['50+ AI models', 'Pick the model that fits each task and switch between them without rewriting your agent.', 'agent'],
            ['Memory', 'Agents keep the context they need across steps, so they build on earlier results instead of starting over.', 'replay'],
            ['Connected apps as tools', 'Actions across 2,300+ apps become tools your agent can call, with authentication already handled.', 'apps'],
            ['Multi-step workflows', 'Chain reasoning, tool calls and decisions into workflows that run until the task is done.', 'map'],
            ['Browser actions', "When an app has no API, agents can browse pages, click, and fill in forms to finish the job.", 'browser'],
            ['Monitoring', 'See every step an agent took, the tools it called, and what came back, in one place.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Describe the task', 'Tell the agent what it should achieve and choose the AI model it runs on.'],
            ['Give it tools', 'Pick the apps and actions it may use. Your users connect their own accounts.'],
            ['Run it in your product', 'Trigger the agent from your product, a schedule, or an event, and see each run as it happens.'],
        ],
        usesTitle: 'What teams build with AI agents',
        uses: [
            ['Lead scoring', 'Score new leads from CRM and enrichment data, then update the record and alert the right rep.'],
            ['Support triage', 'Read incoming tickets, pull the customer’s history, and route or draft a reply.'],
            ['Email drafting', 'Draft follow-ups from meeting notes and deal context, ready for a person to review and send.'],
        ],
        related: ['ai-chatbots', 'browser-actions', 'managed-authentication'],
        faqs: [
            ['What is an AI agent in viaSocket?', 'An AI agent combines an AI model, memory, and tools from connected apps to work through a task step by step: it decides what to do next, calls the tools it needs, and acts on the results.'],
            ['Which AI models can agents use?', 'Agents can run on any of 50+ supported AI models, and you can choose a different model for each agent.'],
            ['Can agents use my users’ connected apps?', 'Yes. Agents call actions in the apps your users have connected, and viaSocket manages the authentication for each account.'],
            ['Can I see what an agent did?', 'Yes. Each run records the steps the agent took, the tools it called, and their results, so you can review and debug it.'],
        ],
        endTitle: 'Add AI agents to your product',
    },

    'managed-authentication': {
        metaTitle: 'Managed Authentication for Integrations | OAuth & Tokens | viaSocket',
        metaDesc:
            'Let your users connect their accounts without building OAuth flows. viaSocket handles consent, token storage, and token refresh for 2,300+ apps.',
        h1: 'Managed Authentication for Every Integration',
        sub: 'Let your users connect their own accounts in a click. viaSocket runs the consent flow, stores each grant, and refreshes tokens, so you never build OAuth again.',
        capsTitle: 'Sign-in, handled for every app',
        capsLead: 'No OAuth apps to register, no client secrets to hold, and no refresh logic to write.',
        caps: [
            ['App consent screens', "Users approve access on the app's own consent screen in a popup, so your code never sees a password.", 'key'],
            ['Token storage and refresh', 'viaSocket stores each grant and refreshes it before it expires, for every connected account.', 'retry'],
            ['One connection id', 'You get back a connection id to keep against the user. That is all your database stores.', 'code'],
            ['Per-user connections', "Each user's connections and permissions are kept apart, with nothing shared between them.", 'users'],
            ['List and revoke', "List a user's connections or revoke one whenever they need to disconnect an app.", 'map'],
            ['Your branding', 'Show the connect flow inside your product, with your labels and theme.', 'brand'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['User clicks Connect', "The app's own consent screen opens in a popup inside your product."],
            ['They approve access', 'viaSocket receives the grant, stores it securely, and returns a connection id.'],
            ['You call actions', 'Use the connection id to run actions for that user. Tokens stay fresh in the background.'],
        ],
        usesTitle: 'Where teams use managed authentication',
        uses: [
            ['Integration marketplaces', 'Offer dozens of apps in your product without registering an OAuth app for each one.'],
            ['AI agents on user accounts', "Let agents act in each user's Gmail, Slack, or CRM with that user's own permissions."],
            ['Customer data sync', "Keep data in sync with each customer's tools without handling their credentials."],
        ],
        related: ['multi-tenant', 'custom-branding', 'custom-integrations'],
        faqs: [
            ['Do I need to register OAuth apps or hold client secrets?', "No. viaSocket stores each user's grant and refreshes it, so you don't register OAuth apps, hold client secrets, or write refresh logic."],
            ['How do users connect their accounts?', "They click Connect and approve access on the app's own consent screen in a popup. Your code never sees their password."],
            ['What do I store in my database?', 'Only the connection id viaSocket returns for each connected account.'],
            ['Can users disconnect an app?', 'Yes. You can list the connections for each user and revoke any of them.'],
        ],
        endTitle: 'Stop building OAuth flows',
    },

    'custom-integrations': {
        metaTitle: 'Custom Integrations & API Requests | viaSocket',
        metaDesc:
            "Connect apps beyond the catalog and call any API endpoint when pre-built actions aren't enough. Build a custom connector once and use it everywhere.",
        h1: 'Connect Any App, Call Any Endpoint',
        sub: "When the catalog doesn't have the app or action you need, build a custom connector or make a direct API request, with the same auth, logs, and tools as every other integration.",
        capsTitle: 'Go beyond the catalog',
        capsLead: 'Custom connectors work like built-in apps, so nothing else in your product has to change.',
        caps: [
            ['Custom connectors', "Build a connector once in viaSocket's Plug Builder. From then on it works like any other app.", 'code'],
            ['Direct API requests', 'Call additional endpoints on a connected app when a pre-built action is not enough.', 'fast'],
            ['Same authentication', "Requests run with the user's connected account, so you don't handle tokens yourself.", 'key'],
            ['Works as an agent tool', 'Custom actions get an input schema, so AI agents can call them like any other tool.', 'agent'],
            ['Same monitoring', 'Custom requests show up in the same logs as every other action.', 'pulse'],
            ['Request an app', 'Ask the viaSocket team to add an integration you need to the catalog.', 'apps'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Define the connector', "Set up the app's authentication and the actions you need in the Plug Builder."],
            ['Let users connect it', 'Your users connect their accounts the same way they connect any other app.'],
            ['Call it from your code', 'Your code and your agents call its actions through the same interface.'],
        ],
        usesTitle: 'What teams build with custom integrations',
        uses: [
            ['Internal and niche tools', "Connect industry-specific or in-house systems your customers rely on that aren't in the catalog."],
            ['Extra endpoints', "Reach an API endpoint that the app's pre-built actions don't cover yet."],
            ['Your own API as a tool', 'Expose your own product API to AI agents alongside the 2,300+ catalog apps.'],
        ],
        related: ['managed-authentication', 'data-mapping', 'execution-monitoring'],
        faqs: [
            ["What if the app I need isn't in the catalog?", "Build it once as a custom connector in viaSocket's Plug Builder. Your users then connect it, and your code and agents call its actions like any other app. You can also request an integration from the viaSocket team."],
            ['Can I call API endpoints that have no pre-built action?', 'Yes. You can make additional API requests to connected services when pre-built actions do not meet your requirements.'],
            ['Do custom integrations support authentication?', 'Yes. Custom connectors use the same managed authentication as built-in apps.'],
            ['Can AI agents use custom integrations?', 'Yes. Custom actions can be used as tools by AI agents, the same way as catalog actions.'],
        ],
        endTitle: 'Connect the apps your customers need',
    },

    webhook: {
        metaTitle: 'Triggers & Webhooks | React to Events in Connected Apps | viaSocket',
        metaDesc:
            'Respond to events in your users’ apps, like a new payment or a new email, without building public webhook endpoints. Polling and retries are handled for you.',
        h1: 'React to Events in Your Users’ Apps',
        sub: 'Subscribe to events, like a new Stripe payment or a new Gmail message, and run your own logic when they happen. No public webhook endpoints to build or secure.',
        capsTitle: 'Events without the plumbing',
        capsLead: 'viaSocket receives each event, checks it, and hands it to your code.',
        caps: [
            ['Event subscriptions', "Subscribe to events from your users' connected apps across the catalog.", 'bolt'],
            ['JavaScript handlers', 'Attach a short JavaScript handler that runs in its own sandbox when the event arrives.', 'code'],
            ['No public endpoint', 'Handlers can call your API directly, so you do not need to expose and secure a webhook URL.', 'key'],
            ['Polling handled', 'For apps without webhooks, viaSocket polls for new events for you.', 'clock'],
            ['Retries handled', 'Failed deliveries are retried, so a short outage does not lose events.', 'retry'],
            ['Logs for every event', 'See each event that arrived and what your handler did with it.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Pick the event', 'Choose the app and the event to listen for, for each connected user.'],
            ['Add your handler', 'Write a short JavaScript handler that decides what happens next.'],
            ['Act on it', 'Update your product, notify a user, or start an agent the moment the event arrives.'],
        ],
        usesTitle: 'What teams build with triggers',
        uses: [
            ['Live dashboards', 'Update your product as soon as a deal moves, an order ships, or a payment lands.'],
            ['Instant notifications', 'Alert the right user in your product when something changes in their tools.'],
            ['Event-driven agents', 'Start an AI agent when a new email, ticket, or form response comes in.'],
        ],
        related: ['real-time-execution', 'background-execution', 'execution-monitoring'],
        faqs: [
            ['How do I react to events in my users’ apps?', 'Subscribe to the event and attach a short JavaScript handler. The handler runs in its own sandbox and can call your API.'],
            ['Do I need a public webhook endpoint?', 'No. Handlers can call your API directly, so you do not need to expose a webhook URL.'],
            ['What about apps that do not support webhooks?', 'viaSocket polls those apps for new events, so they work the same way.'],
            ['What happens if an event fails?', 'Retries are handled for you, and every event is logged so you can see what happened.'],
        ],
        endTitle: 'Respond to every event, instantly',
    },

    'multi-tenant': {
        metaTitle: 'Multi-tenant Integrations for SaaS | viaSocket',
        metaDesc:
            'Manage separate connected accounts and integration settings for every customer. viaSocket keeps each tenant’s connections and permissions apart.',
        h1: 'Integrations Built for Every Customer',
        sub: 'Give each customer their own connected accounts and integration settings, kept apart from everyone else, without building tenant isolation yourself.',
        capsTitle: 'Every tenant, kept separate',
        capsLead: 'One integration in your code, a separate set of connections for each customer.',
        caps: [
            ['Per-customer connections', 'Each customer connects their own accounts, and each connection belongs only to them.', 'users'],
            ['Isolated permissions', "Customers' connections and permissions are kept apart, with nothing leaking between them.", 'key'],
            ['Per-customer settings', 'Store integration configuration for each customer separately.', 'map'],
            ['One code path', 'Your code calls the same action for every customer; viaSocket picks the right connection.', 'code'],
            ['Per-customer logs', 'See runs and errors for a single customer when you need to help them.', 'pulse'],
            ['Your branding', 'Every customer sees the connect experience inside your product.', 'brand'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Customer connects', 'Each customer connects their own accounts from inside your product.'],
            ['Store the connection id', 'Keep the connection id against that customer in your database.'],
            ['Run actions per customer', "Call actions with the customer's connection; their data never mixes with anyone else's."],
        ],
        usesTitle: 'What teams build for many customers',
        uses: [
            ['B2B SaaS integrations', 'Let every customer account connect its own CRM, email, and support tools.'],
            ['Agency and partner tools', 'Manage integrations for each client separately from one product.'],
            ['AI assistants per user', "Run agents that only ever act on the signed-in user's own connected apps."],
        ],
        related: ['managed-authentication', 'custom-branding', 'regional-deployment'],
        faqs: [
            ['Does viaSocket support multi-tenant applications?', 'Yes. viaSocket manages separate connected accounts and integration configurations for each customer.'],
            ['Can one customer access another customer’s connections?', "No. Each customer's connections and permissions are kept apart."],
            ['Do I need a separate integration for each customer?', 'No. You build the integration once, and each customer uses their own connection.'],
            ['Can I see activity for a single customer?', 'Yes. You can review runs and errors for a specific customer to troubleshoot issues.'],
        ],
        endTitle: 'Add integrations for every customer',
    },

    'custom-branding': {
        metaTitle: 'Custom Branding & Embedded Integration UI | viaSocket',
        metaDesc:
            'Embed integration screens that look like your product. Set labels and themes, and show the full catalog, a single app, or one action’s form.',
        h1: 'Integrations That Look Like Your Product',
        sub: 'Embed prebuilt integration screens in your product and match them to your brand, so customers never feel like they left your app.',
        capsTitle: 'Your product, your experience',
        capsLead: 'Prebuilt screens you can drop in and style, instead of building every connection screen from scratch.',
        caps: [
            ['Prebuilt screens', 'Mount the integration screens with one component instead of building them yourself.', 'apps'],
            ['Your labels and theme', 'Set the labels and theme so the screens match the rest of your product.', 'brand'],
            ['Show what you need', "Show the whole catalog, a single app, one action's form, or a saved flow.", 'map'],
            ['Inside your product', 'Connection screens appear in your interface, not on a third-party site.', 'globe'],
            ['Events to your app', 'An event tells your app what each user builds, so you can react to it.', 'bolt'],
            ['Managed auth included', 'Connect flows use managed authentication, so you get branding and sign-in together.', 'key'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Mount the component', 'Add the prebuilt integration screen where it belongs in your product.'],
            ['Set your theme', 'Choose labels and styling so it matches your product.'],
            ['Users connect and build', 'Customers connect apps and set up integrations without leaving your product.'],
        ],
        usesTitle: 'Where teams embed integrations',
        uses: [
            ['In-app integrations page', 'Offer a branded integrations page that lists the apps your customers can connect.'],
            ['Onboarding flows', 'Ask new users to connect their tools as a step of signing up.'],
            ['Feature-level connections', 'Show a single app or action right where a feature needs it.'],
        ],
        related: ['managed-authentication', 'multi-tenant', 'ai-chatbots'],
        faqs: [
            ['Can I embed viaSocket’s integration screens in my product?', "Yes. Mount the prebuilt screens with one component and show the whole catalog, a single app, one action's form, or a saved flow."],
            ['Can I match the screens to my brand?', 'Yes. Set the labels and theme so the screens look like your product.'],
            ['Will my customers see viaSocket?', 'You can provide the integration experience under your own branding, within your existing interface.'],
            ['How does my app know what users set up?', 'An event tells your app what each user builds, so you can respond to it.'],
        ],
        endTitle: 'Give customers an experience that feels like yours',
    },

    'ai-chatbots': {
        metaTitle: 'In-app AI Chatbots That Take Action | viaSocket',
        metaDesc:
            'Add a chat assistant to your product that answers questions and takes actions in your product and your users’ connected apps.',
        h1: 'Add an AI Chatbot That Takes Action',
        sub: 'Give your users a chat assistant inside your product that can look things up and get things done, in your product and in the apps they have connected.',
        capsTitle: 'More than answers',
        capsLead: 'A chat assistant with real tools behind it, built into your own interface.',
        caps: [
            ['Built into your UI', 'Add a chat assistant to your own interface instead of sending users elsewhere.', 'chat'],
            ['Connected apps as tools', "The assistant can read from and act in each user's connected apps.", 'apps'],
            ['Your product’s actions', 'Give the assistant access to your own product capabilities, too.', 'code'],
            ['Per-user permissions', "The assistant only acts on the signed-in user's own connected accounts.", 'users'],
            ['50+ AI models', 'Choose the model that fits your assistant.', 'agent'],
            ['Monitoring', 'Review what the assistant did on each request.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Add the assistant', 'Place the chat interface in your product.'],
            ['Choose its tools', 'Pick the actions it may use from your product and the connected apps.'],
            ['Users ask, it acts', 'Users ask in plain language; the assistant finds answers and runs the actions.'],
        ],
        usesTitle: 'What teams build with in-app chatbots',
        uses: [
            ['Sales assistant', 'Answer "which deals close this week?" from the CRM and offer a summary.'],
            ['Support copilot', 'Look up orders and email customers, all from one chat.'],
            ['Product helper', 'Let users create records and update settings by asking instead of clicking.'],
        ],
        related: ['ai-agent', 'browser-actions', 'managed-authentication'],
        faqs: [
            ['Can I add an AI chatbot to my product?', 'Yes. viaSocket gives chatbots access to your product’s capabilities and connected apps, so they can retrieve information and perform actions.'],
            ['Can the chatbot take actions, not just answer questions?', 'Yes. It can perform tasks such as drafting emails, updating records, and retrieving information from connected apps.'],
            ['Whose accounts does the chatbot use?', "It acts on the signed-in user's own connected accounts and permissions."],
            ['Is there a built-in chat assistant?', 'Yes. If you want a chat assistant in your own UI, viaSocket has one built in.'],
        ],
        endTitle: 'Put an assistant that acts in your product',
    },

    'browser-actions': {
        metaTitle: 'Browser Actions for AI Agents | viaSocket',
        metaDesc:
            'Let AI agents browse websites, navigate pages, interact with elements, and complete tasks in a browser when there is no API.',
        h1: 'Let AI Agents Use the Browser',
        sub: "When a website has no API, your agents can still get the job done: browse pages, click, fill in forms, and read what's on the screen.",
        capsTitle: 'When there is no API',
        capsLead: 'Browser actions fill the gaps between the apps that have APIs.',
        caps: [
            ['Browse and navigate', 'Agents open websites and move between pages to reach what they need.', 'browser'],
            ['Interact with pages', 'Click buttons, fill in forms, and work with page elements.', 'fast'],
            ['Read the page', 'Pull information from pages to use in the next step.', 'map'],
            ['Combined with APIs', 'Mix browser steps with API actions from 2,300+ apps in one task.', 'apps'],
            ['Used by agents', 'Browser actions are tools your AI agents can call when they need them.', 'agent'],
            ['Monitoring', 'Review each step the agent took in the browser.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Give the agent a task', 'Describe what needs to be done on the website.'],
            ['It works in the browser', 'The agent navigates, clicks, and fills in fields as needed.'],
            ['Results come back', 'The information or outcome goes back to your product or to the next step.'],
        ],
        usesTitle: 'What teams build with browser actions',
        uses: [
            ['Portals without APIs', 'Pull reports or submit forms on supplier and government portals.'],
            ['Research tasks', 'Gather information from websites and save it into a sheet or CRM.'],
            ['Legacy systems', 'Work with older web tools that never shipped an API.'],
        ],
        related: ['ai-agent', 'ai-chatbots', 'custom-integrations'],
        faqs: [
            ['Can viaSocket interact with websites without APIs?', "Yes. Browser automation can interact with websites when a suitable API isn't available."],
            ['What can agents do in the browser?', 'They can browse websites, navigate pages, interact with web elements, and complete tasks.'],
            ['Can browser steps be combined with app actions?', 'Yes. Agents can use browser actions alongside actions from connected apps in the same task.'],
            ['When should I use browser actions?', 'Use them when an app has no API or the API does not cover what you need; use API actions whenever they exist.'],
        ],
        endTitle: 'Give your agents a browser',
    },

    'real-time-execution': {
        metaTitle: 'Real-time Action Execution | viaSocket',
        metaDesc:
            'Run actions in connected apps on demand with low latency, so your product and agents get results the moment they need them.',
        h1: 'Run Actions the Moment You Need Them',
        sub: 'Execute actions in your users’ connected apps on demand with low latency, without running your own queues, workers, or timeouts.',
        capsTitle: 'Fast by default',
        capsLead: 'Call an action and get the result back, ready for your product or your agent.',
        caps: [
            ['On-demand execution', 'Run any supported action the moment your product or agent calls it.', 'fast'],
            ['Low latency', 'Actions are built to respond quickly, so users are not left waiting.', 'clock'],
            ['No infrastructure to run', 'No queues, workers, or timeout handling to build and maintain.', 'code'],
            ['Consistent interface', 'Call every app the same way and get structured results back.', 'apps'],
            ['Agent-ready', 'Every action has an input schema, so agents can call it as a tool.', 'agent'],
            ['Logged runs', 'Each execution is logged so you can review and debug it.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Call the action', 'Your code or agent calls an action with a user’s connection id.'],
            ['viaSocket runs it', 'The action runs against the connected app with the user’s permissions.'],
            ['Use the result', 'The result comes straight back to your product or agent.'],
        ],
        usesTitle: 'What teams build with real-time actions',
        uses: [
            ['In-app lookups', 'Show a customer’s latest CRM or billing data right inside your product.'],
            ['One-click actions', 'Let users create a ticket, send a message, or add a row with one button.'],
            ['Agent tool calls', 'Give agents quick answers from connected apps mid-conversation.'],
        ],
        related: ['background-execution', 'webhook', 'execution-monitoring'],
        faqs: [
            ['What is real-time action execution?', 'It runs actions in connected applications on demand with low latency, so your product can interact with them when needed.'],
            ['Do I need my own queues or workers?', 'No. viaSocket runs the actions, so you do not build queues, workers, or timeout handling.'],
            ['What about long-running tasks?', 'Use background execution for longer tasks; it runs them asynchronously and retries eligible failures.'],
            ['Can agents use real-time actions?', 'Yes. Each action comes with an input schema, so agents can call it as a tool.'],
        ],
        endTitle: 'Run actions on demand',
    },

    'background-execution': {
        metaTitle: 'Background Execution & Automatic Retries | viaSocket',
        metaDesc:
            'Run longer tasks asynchronously and automatically retry eligible failed executions to recover from temporary errors.',
        h1: 'Run Long Tasks in the Background, with Retries',
        sub: 'Hand off longer tasks to run asynchronously, and let viaSocket retry eligible failures automatically, so temporary errors don’t become lost work.',
        capsTitle: 'Reliable work, out of the way',
        capsLead: 'Your product stays responsive while the heavy lifting happens in the background.',
        caps: [
            ['Asynchronous runs', 'Start a long task and carry on; it runs in the background.', 'clock'],
            ['Automatic retries', 'Eligible failed executions are retried to recover from temporary errors.', 'retry'],
            ['Resilient to outages', 'Short outages or rate limits in a connected app do not lose the work.', 'bolt'],
            ['Status you can check', 'See whether each task is running, done, or failed.', 'pulse'],
            ['Replay when needed', 'If a task still fails, replay it once the cause is fixed.', 'replay'],
            ['No workers to manage', 'No background job system to build or keep running.', 'code'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Start the task', 'Your product or agent starts a longer task and returns right away.'],
            ['It runs in the background', 'viaSocket runs it asynchronously and retries eligible failures.'],
            ['Check the outcome', 'See the result and status of every run in the logs.'],
        ],
        usesTitle: 'What teams run in the background',
        uses: [
            ['Bulk syncs', 'Move large batches of records between your product and customers’ apps.'],
            ['Multi-step agent tasks', 'Let agents work through longer jobs without holding a request open.'],
            ['Report generation', 'Collect data from several apps and build a report while the user carries on.'],
        ],
        related: ['execution-replay', 'scheduled-execution', 'real-time-execution'],
        faqs: [
            ['Does viaSocket support background execution?', 'Yes. Longer tasks can run asynchronously in the background.'],
            ['Are failed executions retried?', 'Yes. Eligible failed executions are automatically retried to recover from temporary errors.'],
            ['Which failures are retried?', 'Retries cover eligible failures such as temporary errors; others are logged so you can fix the cause and replay them.'],
            ['How do I know when a task is done?', 'Each run has a status and logs you can check at any time.'],
        ],
        endTitle: 'Run long tasks reliably',
    },

    'scheduled-execution': {
        metaTitle: 'Scheduled Execution | Run Actions on a Schedule | viaSocket',
        metaDesc:
            'Run actions and tasks at defined intervals without users triggering them manually. Schedule syncs, reports, and agents in your product.',
        h1: 'Run Actions and Tasks on a Schedule',
        sub: 'Set an action, a workflow, or an agent to run at defined intervals, so the work happens on time without anyone clicking a button.',
        capsTitle: 'Set it, and it runs',
        capsLead: 'Scheduling built into the same layer that runs your actions.',
        caps: [
            ['Defined intervals', 'Run tasks every few minutes, hourly, daily, or on the schedule you need.', 'clock'],
            ['No cron servers', 'No scheduler infrastructure to host or monitor yourself.', 'code'],
            ['Any action or agent', 'Schedule app actions, multi-step workflows, or AI agents.', 'agent'],
            ['Per customer', "Run each customer's schedule against their own connected accounts.", 'users'],
            ['Retries included', 'Scheduled runs get the same retries for eligible failures.', 'retry'],
            ['Run history', 'See every scheduled run and its outcome.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Pick the task', 'Choose the action, workflow, or agent to run.'],
            ['Set the schedule', 'Define how often it should run.'],
            ['It runs on time', 'viaSocket runs it at every interval and logs each run.'],
        ],
        usesTitle: 'What teams schedule',
        uses: [
            ['Regular syncs', 'Pull fresh data from customers’ apps every hour.'],
            ['Daily digests', 'Send each user a summary of yesterday’s activity every morning.'],
            ['Recurring agent tasks', 'Have an agent review new leads or tickets on a schedule.'],
        ],
        related: ['background-execution', 'webhook', 'execution-monitoring'],
        faqs: [
            ['Does viaSocket support scheduled execution?', 'Yes. You can run actions and tasks at defined intervals without users triggering them manually.'],
            ['Do I need my own cron jobs?', 'No. viaSocket runs the schedule for you.'],
            ['Can I schedule AI agents?', 'Yes. Agents can run on a schedule as well as from your product or from events.'],
            ['What if a scheduled run fails?', 'Eligible failures are retried, and every run is logged so you can see what happened.'],
        ],
        endTitle: 'Put recurring work on autopilot',
    },

    'data-mapping': {
        metaTitle: 'Managed Data Mapping Between Apps | viaSocket',
        metaDesc:
            'Map and transform data between your product and connected apps without building and maintaining a custom mapping for every integration.',
        h1: 'Map Data Between Apps Without Custom Code',
        sub: 'Every app shapes its data differently. viaSocket maps and transforms fields between your product and connected apps, so you don’t maintain a mapping for each one.',
        capsTitle: 'One shape in, the right shape out',
        capsLead: 'Stop writing and maintaining a different mapping for every app.',
        caps: [
            ['Field mapping', 'Map fields like first_name to FirstName between your product and each app.', 'map'],
            ['Transformations', 'Reshape and convert values into the format each app expects.', 'code'],
            ['Every app’s full actions', 'Keep each app’s complete set of actions, not a reduced common model.', 'apps'],
            ['Variables and functions', 'Use variables and small functions when a mapping needs logic.', 'fast'],
            ['Schemas for agents', 'Actions expose input schemas, so agents can fill in the right fields.', 'agent'],
            ['Easy to debug', 'See the data that went in and came out of each step.', 'pulse'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Send your data', 'Your product sends data in its own format.'],
            ['viaSocket maps it', 'Fields are mapped and transformed into the format the app expects.'],
            ['The app receives it', 'The action runs with correctly shaped data, and the result comes back mapped to yours.'],
        ],
        usesTitle: 'What teams use data mapping for',
        uses: [
            ['CRM sync', 'Send contacts from your product to Salesforce, HubSpot, and others with one format.'],
            ['Order and invoice data', 'Move orders and invoices between commerce and accounting apps.'],
            ['Agent outputs', 'Turn an agent’s results into the fields a connected app needs.'],
        ],
        related: ['custom-integrations', 'real-time-execution', 'execution-monitoring'],
        faqs: [
            ['What is managed data mapping?', 'It maps and transforms data between your product and connected applications, so you do not build a custom mapping for every integration.'],
            ['Is this a unified API?', "No. A unified API maps one category of apps onto a shared model. viaSocket keeps every app's full set of actions and handles the mapping between their data formats."],
            ['Can I transform values, not just rename fields?', 'Yes. You can reshape and convert values, and use variables and functions when a mapping needs logic.'],
            ['Can I see the mapped data?', 'Yes. Logs show the data that went into and came out of each step.'],
        ],
        endTitle: 'Stop maintaining mappings for every app',
    },

    'execution-replay': {
        metaTitle: 'Execution Replay | Recover from Failed Runs | viaSocket',
        metaDesc:
            'Replay failed executions when appropriate, so you recover from errors without rebuilding the entire workflow.',
        h1: 'Replay Failed Executions in One Step',
        sub: 'When a run fails, fix the cause and replay it, instead of rebuilding the workflow or asking the user to start again.',
        capsTitle: 'Recover, don’t rebuild',
        capsLead: 'Every run is kept, so a failure is something you can fix and finish.',
        caps: [
            ['Replay failed runs', 'Run a failed execution again once the cause is fixed.', 'replay'],
            ['Same input', 'Replays use the original input, so nothing has to be re-entered.', 'map'],
            ['No workflow rebuild', 'Recover without rebuilding or re-triggering the whole workflow.', 'code'],
            ['Find the failure first', 'Logs show exactly which step failed and why before you replay.', 'pulse'],
            ['Works with retries', 'Automatic retries handle temporary errors; replay covers the rest.', 'retry'],
            ['Per customer', "Replay a single customer's run without touching anyone else's.", 'users'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Spot the failure', 'See the failed run and the step that caused it in the logs.'],
            ['Fix the cause', 'Reconnect an account, update a setting, or fix the data.'],
            ['Replay it', 'Run it again and confirm it succeeds.'],
        ],
        usesTitle: 'When teams use replay',
        uses: [
            ['Expired connections', 'Replay runs that failed while a user’s connection needed reauthorizing.'],
            ['App outages', 'Finish the work that failed while a connected app was down.'],
            ['Bad data', 'Correct a bad value and replay the run instead of starting from scratch.'],
        ],
        related: ['background-execution', 'execution-monitoring', 'webhook'],
        faqs: [
            ['What is execution replay?', 'It lets you replay failed executions when appropriate, helping you recover from errors without rebuilding the entire workflow.'],
            ['How is replay different from retries?', 'Retries run automatically for eligible temporary errors. Replay is for runs you choose to run again, usually after fixing the cause.'],
            ['Does a replay use the original data?', 'Yes. A replay runs with the original input of the failed execution.'],
            ['Can I see why a run failed before replaying it?', 'Yes. Execution logs show the failing step and the error.'],
        ],
        endTitle: 'Turn failures into finished work',
    },

    'execution-monitoring': {
        metaTitle: 'Execution Monitoring & Debugging for Integrations | viaSocket',
        metaDesc:
            'Track execution status, inspect logs, identify errors, and troubleshoot integration issues for every app and customer from one place.',
        h1: 'See Every Execution, Fix Every Error',
        sub: 'Track the status of every action, event, and agent run, inspect logs, and find what went wrong from one place, instead of digging through scattered logs.',
        capsTitle: 'Know what happened, every time',
        capsLead: 'One place to see every run across every app and customer.',
        caps: [
            ['Execution status', 'See whether each run succeeded, failed, or is still running.', 'pulse'],
            ['Detailed logs', 'Inspect the input, output, and each step of a run.', 'code'],
            ['Error details', 'See the failing step and the error the app returned.', 'bolt'],
            ['Filter by customer', 'Find the runs for a single customer when they need help.', 'users'],
            ['Agent steps', 'Review the steps an AI agent took and the tools it called.', 'agent'],
            ['Replay from the log', 'Replay a failed run once you have fixed the cause.', 'replay'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Every run is recorded', 'Actions, events, schedules, and agent runs are logged automatically.'],
            ['Find the problem', 'Filter to the failing runs and open one to see what happened.'],
            ['Fix and replay', 'Fix the cause and replay the run, or let retries handle temporary errors.'],
        ],
        usesTitle: 'How teams use monitoring',
        uses: [
            ['Customer support', 'Answer "why didn’t my sync run?" by opening that customer’s run.'],
            ['Release checks', 'Confirm a new integration runs cleanly for real users after launch.'],
            ['Agent review', 'Check what an agent did before widening what it can do.'],
        ],
        related: ['execution-replay', 'background-execution', 'ai-agent'],
        faqs: [
            ['How can I monitor and debug integrations?', 'viaSocket lets you inspect execution status, review logs, identify errors, and troubleshoot issues from one place.'],
            ['What do the logs include?', 'Each run shows its status, input, output, steps, and any error returned by the app.'],
            ['Can I see runs for one customer?', 'Yes. You can find the runs for a specific customer to help troubleshoot their issue.'],
            ['Can I monitor AI agents too?', 'Yes. Agent runs record the steps taken and the tools called.'],
        ],
        endTitle: 'Debug integrations in minutes, not hours',
    },

    'regional-deployment': {
        metaTitle: 'Regional Deployment & Data Residency | viaSocket',
        metaDesc:
            'Choose the server region where your viaSocket infrastructure runs to meet deployment and data residency requirements.',
        h1: 'Run Your Integrations in the Region You Choose',
        sub: 'Pick the server region where your viaSocket infrastructure runs, so your integrations meet your deployment and data residency requirements.',
        capsTitle: 'Infrastructure where your customers are',
        capsLead: 'Serve customers from their preferred region without running servers there yourself.',
        caps: [
            ['Choose your region', 'Select the server region your viaSocket infrastructure runs in.', 'globe'],
            ['Data residency', 'Keep data handling in the region your requirements call for.', 'key'],
            ['Closer to customers', 'Run closer to your customers for faster responses.', 'fast'],
            ['No servers to run', 'Get regional infrastructure without hosting it yourself.', 'code'],
            ['Same features', 'Use the same integrations, agents, and monitoring in every region.', 'apps'],
            ['Help with compliance', 'Talk to the team about the deployment your requirements need.', 'users'],
        ],
        stepsTitle: 'How it works',
        steps: [
            ['Share your requirements', 'Tell us where your customers are and what your data rules require.'],
            ['Choose the region', 'Pick from the available deployment regions.'],
            ['Run as usual', 'Build and run integrations the same way, in the region you chose.'],
        ],
        usesTitle: 'Who needs regional deployment',
        uses: [
            ['Customers with residency rules', 'Serve customers whose contracts require data to stay in a region.'],
            ['Regulated industries', 'Meet the deployment requirements of finance, health, and public-sector buyers.'],
            ['Global products', 'Serve customers in each market from infrastructure close to them.'],
        ],
        related: ['multi-tenant', 'managed-authentication', 'execution-monitoring'],
        faqs: [
            ['Can I deploy viaSocket in different regions?', 'viaSocket supports regional infrastructure deployment to serve customers in their preferred regions, subject to available deployment options.'],
            ['Which regions are available?', 'Talk to an expert for the current deployment regions and options.'],
            ['Does it help with data residency requirements?', 'Yes. Choosing a region lets you meet deployment and data residency requirements where options are available.'],
            ['Do features change by region?', 'You build and run integrations the same way in every region.'],
        ],
        endTitle: 'Deploy where your customers need you',
    },
};

export const featurePage = (slug) => FEATURE_PAGES[slug] || null;
