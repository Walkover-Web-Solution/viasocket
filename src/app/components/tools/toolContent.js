// What each built-in tool's page (/tools/{page}) says about the task it does, keyed by the page name set in
// the admin (Pages → Built-in tools). Written for the searches people make for that task ("html to pdf",
// "gstin lookup"), not about built-in tools in general. Titles and H1s read "{task} tool for your product &
// AI agents"; they never call it an API, because it is used as a viaSocket action, not called as one. Copy written for the tool's plug in the admin
// (Programmatic pages) still wins, part by part (title, description, keywords, h1, sub, use cases, FAQs).
// A tool with no entry here gets GENERIC, filled from its name and its plug's action.
//
// Each entry: metaTitle, metaDesc, h1, sub, does: [title, text] (what it does), useCases: [title, text],
// faqs: [q, a], and demo: the hero's example, { in: Part, out: Part } where a Part is one of
//   { kind: 'code', label, value }        monospaced text (HTML, JSON)
//   { kind: 'text', label, value }        a paragraph
//   { kind: 'url', value }                an address bar
//   { kind: 'audio', label, value }       an audio file with a waveform
//   { kind: 'rows', label, rows: [[k, v]] } labelled values
//   { kind: 'bullets', label, items }     a list
//   { kind: 'pdf', label, title, lines }  a document page
//   { kind: 'image', label }              a generated illustration
//   { kind: 'chat', label, value, meta }  a WhatsApp message
//   { kind: 'big', label, value, note }   one large value

export const TOOL_CONTENT = {
    'html-to-pdf': {
        metaTitle: 'HTML to PDF Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Convert HTML to PDF from your product or AI agent in one step. Set page size, margins and file name. No API key or account to set up; pay per document.',
        h1: 'HTML to PDF tool for your product & AI agents',
        sub: 'Turn any HTML into a PDF file from your product or AI agent: invoices, receipts, reports and certificates. Set the page size, margins and file name in the same call.',
        demo: {
            in: { kind: 'code', label: 'invoice.html', value: '<h1>Invoice #1042</h1>\n<p>Acme Corp · Due 30 Nov</p>\n<table>\n  <tr><td>Pro plan</td><td>$49</td></tr>\n</table>' },
            out: { kind: 'pdf', label: 'invoice-1042.pdf', title: 'Invoice #1042', lines: ['Acme Corp · Due 30 Nov', 'Pro plan                    $49', 'Total                       $49'] },
        },
        does: [
            ['Convert HTML to PDF', 'Send HTML, styles included, and get back a PDF file ready to download, email or store.'],
            ['Page size and margins', 'Choose the page size and margins so the PDF prints the way your layout expects.'],
            ['Name the file', 'Set the output file name, like invoice-1042.pdf, in the same call.'],
            ['Use the file anywhere', 'Attach the PDF to an email, upload it to storage or send it to your user in the same run.'],
        ],
        useCases: [
            ['Invoices and receipts', 'Render an invoice from your own HTML template and email the PDF when a payment succeeds.'],
            ['Reports', 'Turn a dashboard or weekly report into a PDF your users can download or share.'],
            ['Certificates and contracts', 'Fill an HTML template with a user’s details and send them a ready-to-sign PDF.'],
        ],
        faqs: [
            ['How do I convert HTML to PDF in my product?', 'Call the Convert HTML to PDF action with your HTML and, if you like, the page size, margins and file name. viaSocket returns the PDF file.'],
            ['Can I set the page size and margins?', 'Yes. Choose the page size and margins in the same call, along with the output file name.'],
            ['Do I need an API key for HTML to PDF?', 'No. HTML to PDF runs on viaSocket, so there is no account or API key to set up. Each document is paid from your Pass in AI credits.'],
            ['Can my AI agent create PDFs?', 'Yes. The action comes with an input schema, so your agent can call it as a tool, for example to turn a summary into a PDF report.'],
        ],
    },

    'web-scraper': {
        metaTitle: 'Web Scraper Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Extract data from any website in one step and get it back in the format you need. A web scraping tool for your product and AI agents, with no API key to manage.',
        h1: 'Web scraper tool for your product & AI agents',
        sub: 'Extract data from any web page and get it back in the format you need, ready for your product or AI agent. Prices, product details, articles, contacts: give it a URL and say what to pull.',
        demo: {
            in: { kind: 'url', value: 'https://example.com/pricing' },
            out: { kind: 'code', label: 'Extracted data', value: '{\n  "title": "Pricing",\n  "plans": [\n    { "name": "Pro", "price": "$29/mo" },\n    { "name": "Team", "price": "$79/mo" }\n  ]\n}' },
        },
        does: [
            ['Extract from any page', 'Give it a URL and get the page’s content back, without writing or hosting a scraper.'],
            ['Choose the format', 'Get the data back in the format you specify, ready to store or pass to the next step.'],
            ['Pull specific fields', 'Ask for just the fields you need, like prices, names or links, instead of the whole page.'],
            ['Feed your AI agent', 'Give your agent fresh web content to read, compare or summarise.'],
        ],
        useCases: [
            ['Price monitoring', 'Check competitors’ pricing pages on a schedule and alert your team when something changes.'],
            ['Lead enrichment', 'Pull company details from a prospect’s website into your CRM.'],
            ['Research agents', 'Let an AI agent read web pages and answer questions from what it finds.'],
        ],
        faqs: [
            ['How do I extract data from a website in my product?', 'Call the Extract Website Data action with the page URL and the format you want. viaSocket fetches the page and returns its data.'],
            ['What formats can I get the data in?', 'You choose the output format in the call, so the data comes back ready for the next step in your product or agent.'],
            ['Do I need proxies or an API key?', 'No. The web scraper runs on viaSocket, so there is nothing to host or sign up for. Each page is paid from your Pass in AI credits.'],
            ['Can an AI agent use the web scraper?', 'Yes. The action has an input schema, so your agent can call it as a tool whenever it needs content from a web page.'],
        ],
    },

    'transcribe-audio': {
        metaTitle: 'Audio Transcription Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Transcribe audio to text in one step, and get the tone, a short summary and key points with it. Speech to text for your product and AI agents, no API key needed.',
        h1: 'Audio transcription tool for your product & AI agents',
        sub: 'Turn an audio file into a transcript, with the tone, a short summary and the key points in the same response. Calls, meetings, voice notes and interviews, ready to search or act on.',
        demo: {
            in: { kind: 'audio', label: 'sales-call.mp3', value: '12:48' },
            out: {
                kind: 'rows',
                label: 'Transcript',
                rows: [
                    ['Text', '“Thanks for joining. Let’s start with how you invoice today…”'],
                    ['Tone', 'Friendly, focused'],
                    ['Summary', 'Wants to move invoicing off spreadsheets.'],
                    ['Key points', 'Budget approved · Live in March'],
                ],
            },
        },
        does: [
            ['Speech to text', 'Convert an audio file into a full written transcript.'],
            ['Tone of the conversation', 'Get the tone of the recording alongside the words.'],
            ['Short summary', 'Read what was said in a few sentences, without listening back.'],
            ['Key points', 'Pull out the decisions, numbers and next steps that matter.'],
        ],
        useCases: [
            ['Sales call notes', 'Transcribe every call and save the summary and key points to the deal in your CRM.'],
            ['Meeting minutes', 'Turn meeting recordings into searchable notes for the team.'],
            ['Voice notes in your app', 'Let users speak instead of type, and store what they said as text.'],
        ],
        faqs: [
            ['How do I transcribe audio in my product?', 'Call the Transcribe Audio action with your audio file. viaSocket returns the transcript with the tone, a short summary and the key points.'],
            ['Does it summarise the recording too?', 'Yes. Each transcription comes with a short summary and key points, as well as the tone of the conversation.'],
            ['Do I need a speech-to-text API key?', 'No. Transcription runs on viaSocket, so there is no account or key to set up. Each recording is paid from your Pass in AI credits.'],
            ['Can my AI agent transcribe audio?', 'Yes. Your agent can call the action as a tool and then act on the transcript, for example by updating a CRM.'],
        ],
    },

    'summarize-text': {
        metaTitle: 'Text Summarization Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Summarize long text in one step. A text summarization tool for your product and AI agents: articles, emails, tickets and documents in a few lines. No API key needed.',
        h1: 'Text summarization tool for your product & AI agents',
        sub: 'Turn long text into a short, clear summary with one call. Articles, email threads, support tickets and documents, condensed so your users read what matters.',
        demo: {
            in: { kind: 'text', label: 'Quarterly review · 1,840 words', value: 'Revenue grew 18% this quarter, driven mostly by enterprise renewals. Self-serve churn rose, and the team traced most of it to onboarding…' },
            out: { kind: 'bullets', label: 'Summary', items: ['Revenue up 18%, led by enterprise renewals', 'Self-serve churn rose, mostly from onboarding', 'Next: fix onboarding, expand to two regions'] },
        },
        does: [
            ['Summarize any text', 'Send articles, threads, transcripts or documents and get a concise summary back.'],
            ['Keep what matters', 'The summary keeps the main points and drops the filler.'],
            ['Use it in any flow', 'Summarize as part of a run: after an email arrives, a ticket closes or a document is uploaded.'],
            ['Feed your AI agent', 'Give your agent a short version of long content so it can act on it faster.'],
        ],
        useCases: [
            ['Support tickets', 'Summarize long ticket threads so the next agent gets up to speed in seconds.'],
            ['Email digests', 'Send users a daily digest of the emails or messages they missed.'],
            ['Document previews', 'Show a short summary next to every document uploaded to your product.'],
        ],
        faqs: [
            ['How do I summarize text in my product?', 'Call the Summarize Text action with the text. viaSocket returns a concise summary of it.'],
            ['What kind of text can I summarize?', 'Any text: articles, email threads, support tickets, meeting transcripts and documents.'],
            ['Do I need an AI model key to summarize text?', 'No. Summarize Text runs on viaSocket, so there is no model or key to set up. Each request is paid from your Pass in AI credits.'],
            ['Can my AI agent summarize text?', 'Yes. Your agent can call the action as a tool whenever it needs a shorter version of something.'],
        ],
    },

    'translate-text': {
        metaTitle: 'Translation Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Translate text into the language you choose in one step. A translation tool for your product and AI agents, with no API key to manage.',
        h1: 'Translation tool for your product & AI agents',
        sub: 'Translate text into the language you choose with one call. Product copy, messages, support replies and user content, in your users’ own language.',
        demo: {
            in: { kind: 'text', label: 'English', value: 'Your order has shipped and will arrive on Friday.' },
            out: {
                kind: 'rows',
                label: 'Translated',
                rows: [
                    ['Spanish', 'Tu pedido ha sido enviado y llegará el viernes.'],
                    ['French', 'Votre commande a été expédiée et arrivera vendredi.'],
                    ['Hindi', 'आपका ऑर्डर भेज दिया गया है और शुक्रवार को पहुँचेगा।'],
                ],
            },
        },
        does: [
            ['Translate any text', 'Send text and the language you want, and get the translation back.'],
            ['Choose the language', 'Pick the target language in each call, so one flow can serve every market.'],
            ['Translate as it happens', 'Translate messages, tickets or content the moment they arrive in a run.'],
            ['Multilingual agents', 'Let your AI agent reply in the language your user writes in.'],
        ],
        useCases: [
            ['Customer messages', 'Translate notifications and emails into each customer’s language before sending.'],
            ['Support tickets', 'Translate incoming tickets for your team, and their replies back for the customer.'],
            ['User content', 'Translate reviews, posts or listings so every user can read them.'],
        ],
        faqs: [
            ['How do I translate text in my product?', 'Call the Translate Text action with the text and the target language. viaSocket returns the translation.'],
            ['Which languages can I translate into?', 'You choose the target language in each call.'],
            ['Do I need a translation API key?', 'No. Translate Text runs on viaSocket, so there is no account or key to set up. Each request is paid from your Pass in AI credits.'],
            ['Can my AI agent translate text?', 'Yes. Your agent can call the action as a tool, for example to reply in the customer’s language.'],
        ],
    },

    'convert-to-json': {
        metaTitle: 'Text to JSON Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Convert unstructured text into clean, structured JSON in one step. Parse emails, notes and form text into fields your product and AI agents can use.',
        h1: 'Text to JSON tool for your product & AI agents',
        sub: 'Turn messy text into structured JSON your code can use. Emails, notes, form replies and chat messages, parsed into the fields you need.',
        demo: {
            in: { kind: 'text', label: 'Email', value: 'Hi, I’m Priya Shah from Northwind. Call me on +91 98200 11223 or write to priya@northwind.io' },
            out: { kind: 'code', label: 'JSON', value: '{\n  "name": "Priya Shah",\n  "company": "Northwind",\n  "phone": "+91 98200 11223",\n  "email": "priya@northwind.io"\n}' },
        },
        does: [
            ['Text to JSON', 'Send free text or key-value pairs and get back structured JSON.'],
            ['Ready for the next step', 'The output is shaped so other tools and actions can use it directly.'],
            ['Parse what people write', 'Pull names, dates, amounts and contacts out of emails, notes and messages.'],
            ['Clean data for agents', 'Give your AI agent structured fields instead of raw text.'],
        ],
        useCases: [
            ['Lead capture', 'Turn inbound emails into contact records with name, company, phone and email.'],
            ['Order parsing', 'Read orders that arrive as text and turn them into line items.'],
            ['Form replies', 'Convert free-text answers into fields you can store and filter.'],
        ],
        faqs: [
            ['How do I convert text to JSON in my product?', 'Call the Convert to JSON action with the text or key-value input. viaSocket returns it as structured JSON.'],
            ['What can I convert?', 'Free text, like emails, notes and messages, or key-value inputs that need to become a structured object.'],
            ['Do I need an API key?', 'No. Convert to JSON runs on viaSocket, so there is no account or key to set up. Each request is paid from your Pass in AI credits.'],
            ['Can my AI agent use Convert to JSON?', 'Yes. Your agent can call it as a tool to turn what it reads into fields it can act on.'],
        ],
    },

    'ai-image-generator': {
        metaTitle: 'AI Image Generator Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Create and edit images from a text prompt in one step. An AI image generator for your product and AI agents, with no model or API key to manage.',
        h1: 'AI image generator tool for your product & AI agents',
        sub: 'Create images from a text prompt, or edit an existing one, with one call. Product visuals, social posts, illustrations and thumbnails, made inside your product.',
        demo: {
            in: { kind: 'text', label: 'Prompt', value: 'A flat illustration of a rocket launching over a city at sunset' },
            out: { kind: 'image', label: 'Generated image' },
        },
        does: [
            ['Text to image', 'Describe what you want and get a generated image back.'],
            ['Edit images', 'Change an existing image with a written instruction.'],
            ['In your own flows', 'Generate images when content is created, a product is added or a post is scheduled.'],
            ['Images for agents', 'Let your AI agent create the visuals it needs as part of a task.'],
        ],
        useCases: [
            ['Social posts', 'Create an image for every post your users schedule.'],
            ['Product visuals', 'Generate placeholder or lifestyle images for new listings.'],
            ['Blog thumbnails', 'Make a cover image from each article’s title.'],
        ],
        faqs: [
            ['How do I generate images in my product?', 'Call the AI Image Generator action with a text prompt. viaSocket returns the generated image.'],
            ['Can it edit existing images?', 'Yes. You can create a new image or edit an existing one with a written instruction.'],
            ['Do I need an image model API key?', 'No. The image generator runs on viaSocket, so there is no model or key to set up. Each image is paid from your Pass in AI credits.'],
            ['Can my AI agent create images?', 'Yes. Your agent can call the action as a tool whenever it needs an image.'],
        ],
    },

    'gst-lookup': {
        metaTitle: 'GST Lookup Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Verify a GSTIN and get the GST details on record in one step. A GST verification tool for your product and AI agents, with GSTIN validation built in.',
        h1: 'GST lookup tool for your product & AI agents',
        sub: 'Check a GSTIN and get the business’s GST details with one call. Validate customers and vendors at signup or checkout, without leaving your product.',
        demo: {
            in: { kind: 'rows', label: 'Lookup', rows: [['GSTIN', '27AAPFU0939F1ZV']] },
            out: {
                kind: 'rows',
                label: 'GST details',
                rows: [
                    ['Legal name', 'Sample Traders Pvt Ltd'],
                    ['Status', 'Active'],
                    ['State', 'Maharashtra'],
                    ['Registered', '1 Jul 2017'],
                ],
            },
        },
        does: [
            ['Validate the GSTIN', 'Check that a GSTIN is well-formed before it is looked up.'],
            ['Get GST details', 'Get the business’s GST registration details for that GSTIN.'],
            ['Clear errors', 'An invalid or unknown GSTIN comes back with a clear error you can show your user.'],
            ['Flat, ready-to-use fields', 'Details come back as simple fields, ready to save or show.'],
        ],
        useCases: [
            ['Customer onboarding', 'Verify a business’s GSTIN when they sign up and fill in their details for them.'],
            ['Vendor checks', 'Check a vendor’s GST registration before you add them or pay an invoice.'],
            ['Invoicing', 'Confirm the buyer’s GSTIN before generating a GST invoice.'],
        ],
        faqs: [
            ['How do I verify a GSTIN in my product?', 'Call the Get GST Details action with the GSTIN. viaSocket validates it and returns the GST details on record.'],
            ['What happens with an invalid GSTIN?', 'The GSTIN is validated first, and an invalid or unknown number comes back with a clear error.'],
            ['Do I need a GST data account?', 'No. GST lookup runs on viaSocket, so there is no account or key to set up. Each lookup is paid from your Pass in AI credits.'],
            ['Can my AI agent look up GST details?', 'Yes. Your agent can call the action as a tool, for example while onboarding a business customer.'],
        ],
    },

    'currency-converter': {
        metaTitle: 'Currency Converter Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Convert any amount between currencies at the current exchange rate in one step. A currency conversion tool for your product and AI agents, no API key needed.',
        h1: 'Currency converter tool for your product & AI agents',
        sub: 'Convert an amount from one currency to another at the current exchange rate, with one call. Show local prices, total up multi-currency orders and report in one currency.',
        demo: {
            in: { kind: 'rows', label: 'Convert', rows: [['Amount', '100.00'], ['From', 'USD'], ['To', 'EUR']] },
            out: { kind: 'big', label: 'Converted', value: '€ 92.40', note: 'At the current rate · example' },
        },
        does: [
            ['Convert any amount', 'Send an amount and two currencies, and get the converted amount back.'],
            ['Current exchange rates', 'Conversions use the current rate, so you never keep a rate table yourself.'],
            ['Inside any flow', 'Convert as orders, invoices or payments come in.'],
            ['For AI agents', 'Let your agent answer price questions in the user’s currency.'],
        ],
        useCases: [
            ['Local pricing', 'Show prices in each visitor’s currency.'],
            ['Multi-currency orders', 'Convert every order to your reporting currency as it arrives.'],
            ['Expense reports', 'Convert receipts in foreign currencies before they are approved.'],
        ],
        faqs: [
            ['How do I convert currencies in my product?', 'Call the Convert Currency action with the amount and the two currencies. viaSocket returns the converted amount at the current rate.'],
            ['Which exchange rate is used?', 'The current exchange rate at the time of the call.'],
            ['Do I need an exchange rate API key?', 'No. The currency converter runs on viaSocket, so there is no account or key to set up. Each conversion is paid from your Pass in AI credits.'],
            ['Can my AI agent convert currencies?', 'Yes. Your agent can call the action as a tool to answer questions about prices and totals.'],
        ],
    },

    'send-whatsapp-message': {
        metaTitle: 'WhatsApp Messaging Tool for Your Product & AI Agents | viaSocket',
        metaDesc:
            'Send WhatsApp text, media, template and bulk messages from your product or AI agent in one step. No WhatsApp Business setup to manage; pay per message.',
        h1: 'WhatsApp messaging tool for your product & AI agents',
        sub: 'Send WhatsApp messages from your product or AI agent: text, media, templates and bulk sends, to a contact or a group. Order updates, reminders and alerts where your customers already are.',
        demo: {
            in: { kind: 'rows', label: 'Send', rows: [['To', 'Priya · +91 98200 xxxxx'], ['Template', 'order_shipped'], ['Order', '#1042']] },
            out: { kind: 'chat', label: 'WhatsApp', value: 'Hi Priya, your order #1042 has shipped and will arrive on Friday. Track it here: acme.co/t/1042', meta: '10:42 ✓✓' },
        },
        does: [
            ['Text and media', 'Send plain text, or images and documents, to a WhatsApp contact.'],
            ['Templates', 'Send approved template messages for updates and alerts.'],
            ['Groups and bulk', 'Message a WhatsApp group, or send to many contacts at once.'],
            ['From any event', 'Send when an order ships, a payment fails or an appointment is near.'],
        ],
        useCases: [
            ['Order updates', 'Tell customers on WhatsApp when their order is confirmed, shipped and delivered.'],
            ['Reminders', 'Send appointment and payment reminders where people actually read them.'],
            ['Agent replies', 'Let your AI agent answer or follow up with a customer on WhatsApp.'],
        ],
        faqs: [
            ['How do I send a WhatsApp message in my product?', 'Call the Send WhatsApp Message action with the contact or group and the message, template or media. viaSocket sends it.'],
            ['Can I send template and bulk messages?', 'Yes. Send text, media or template messages, to one contact, a group, or many contacts at once.'],
            ['How are WhatsApp messages charged?', 'Each message is paid from your Pass, priced by the recipient’s country and the template’s type.'],
            ['Can my AI agent send WhatsApp messages?', 'Yes. Your agent can call the action as a tool to message customers.'],
        ],
    },
};

/** The page content for a tool: its entry, or GENERIC built from its name and its plug's first action. */
export function toolContent(tool, actions = []) {
    if (TOOL_CONTENT[tool.page]) return TOOL_CONTENT[tool.page];
    const name = tool.name;
    const action = actions[0];
    return {
        metaTitle: `${name} Tool for Your Product & AI Agents | viaSocket`,
        metaDesc: `Use ${name} in your product and AI agents in one step. ${action?.description || ''} No API key to set up; pay per use.`.replace(/\s+/g, ' ').trim(),
        h1: `${name} tool for your product & AI agents`,
        sub: action?.description ? `${action.description} From your product or AI agent, with one call.` : `Use ${name} from your product or AI agent with one call.`,
        demo: {
            in: { kind: 'text', label: 'Input', value: action?.name || name },
            out: { kind: 'text', label: 'Result', value: action?.description || `${name} result` },
        },
        does: actions.map((a) => [a.name, a.description]).filter(([, d]) => d),
        useCases: [],
        faqs: [
            [`How do I use ${name} in my product?`, `Call the ${action?.name || name} action from your product or agent. viaSocket runs it and returns the result.`],
            [`Do I need an API key for ${name}?`, `No. ${name} runs on viaSocket, so there is no account or key to set up. Each use is paid from your Pass in AI credits.`],
        ],
    };
}

/** The plug's actions, [{ name, description }], from its apps API record (appOneDetails.events). */
export const actionsOf = (appOneDetails) =>
    (appOneDetails?.events || []).filter((e) => e?.type === 'action' && e?.name).map((e) => ({ name: e.name, description: e.description || '' }));
