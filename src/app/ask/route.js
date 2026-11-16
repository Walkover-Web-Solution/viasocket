export const runtime = 'edge';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const RESPONSE_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    ...CORS_HEADERS,
};

const getCatalog = (origin) => [
    {
        id: 'platform',
        type: 'SoftwareApplication',
        name: 'viaSocket — Integration Layer for Your Product & AI Agents',
        url: `${origin}/`,
        description:
            'viaSocket is the integration layer for SaaS products and AI agents. Connect 2,300+ apps, manage multi-tenant OAuth, execute authenticated actions, and subscribe to webhooks.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        keywords: [
            'viasocket',
            'integration layer',
            'action layer',
            'ai agent',
            'agents',
            'oauth',
            'connections',
            'connect',
            'workflows',
            'automation',
            'saas',
        ],
    },
    {
        id: 'developers',
        type: 'TechArticle',
        name: 'viaSocket Developer Quickstart & Apps API Docs',
        url: `${origin}/developers/docs`,
        description:
            'Quickstart and reference for the viaSocket Apps API and Embed SDK. Install the SDK, authenticate end-user accounts, and run actions across third-party tools.',
        keywords: [
            'developer',
            'developers',
            'docs',
            'documentation',
            'embed',
            'api',
            'apps api',
            'sdk',
            'quickstart',
            'code',
            'npm',
            'viasocket-apps',
        ],
    },
    {
        id: 'integrations',
        type: 'DataCatalog',
        name: 'viaSocket 2,300+ Apps & Integrations Directory',
        url: `${origin}/integrations`,
        description:
            'Directory of over 2,300 pre-built integrations with triggers and actions, including Slack, Google Sheets, Gmail, HubSpot, Salesforce, Notion, and OpenAI.',
        keywords: [
            'integrations',
            'apps',
            'directory',
            'catalog',
            'connectors',
            'triggers',
            'actions',
            'slack',
            'sheets',
            'gmail',
            'hubspot',
            'salesforce',
            'notion',
        ],
    },
    {
        id: 'features',
        type: 'WebPage',
        name: 'viaSocket Key Features',
        url: `${origin}/features`,
        description:
            'Key capabilities of viaSocket: managed OAuth popups with token refresh, multi-tenant permission isolation, event subscriptions with sandboxed JS handlers, and structured schemas for agent tool calling.',
        keywords: [
            'features',
            'capabilities',
            'webhooks',
            'multi-tenant',
            'sandbox',
            'tools',
            'events',
            'token refresh',
            'tool calling',
        ],
    },
    {
        id: 'use-cases',
        type: 'CollectionPage',
        name: 'viaSocket Use Cases & Automation Templates',
        url: `${origin}/use-cases`,
        description:
            'Pre-built automation patterns and integration use cases for customer onboarding, notification routing, bi-directional sync, CRM updates, and autonomous AI agents.',
        keywords: [
            'use cases',
            'templates',
            'automations',
            'workflows',
            'patterns',
            'ideas',
            'sync',
            'notifications',
        ],
    },
    {
        id: 'pricing',
        type: 'WebPage',
        name: 'viaSocket Pricing & Plans',
        url: `${origin}/pricing`,
        description:
            'Pricing plans: Free tier (free forever), Pro ($19/mo or $190/yr), Business ($99/mo or $990/yr), and custom Enterprise plans with task-based metering.',
        keywords: [
            'pricing',
            'plans',
            'cost',
            'free',
            'pro',
            'business',
            'enterprise',
            'subscription',
            'rate',
            'price',
        ],
    },
    {
        id: 'docs-mcp',
        type: 'WebAPI',
        name: 'viaSocket Public Docs MCP Server',
        url: `${origin}/docs/mcp`,
        description:
            'Public, read-only Model Context Protocol (MCP) server over viaSocket documentation for AI assistants and coding agents. Supports get_doc_page, search_docs, and list_doc_pages.',
        keywords: ['mcp', 'model context protocol', 'docs mcp', 'public mcp', 'json-rpc'],
    },
    {
        id: 'agent-card',
        type: 'CreativeWork',
        name: 'viaSocket A2A Agent Card',
        url: `${origin}/.well-known/agent-card.json`,
        description:
            'Machine-readable Agent2Agent (A2A) discovery card identifying viaSocket documentation agent skills and endpoints.',
        keywords: ['agent card', 'agent-card', 'a2a', 'agent2agent', 'discovery'],
    },
    {
        id: 'api-catalog',
        type: 'DataCatalog',
        name: 'viaSocket RFC 9727 API Catalog',
        url: `${origin}/.well-known/api-catalog`,
        description:
            'RFC 9727 linkset catalog listing machine-readable endpoints, documentation feeds, and agent interfaces.',
        keywords: ['api catalog', 'catalog', 'rfc 9727', 'linkset', 'endpoints'],
    },
    {
        id: 'llms-txt',
        type: 'DigitalDocument',
        name: 'viaSocket llms.txt Guidance for Agents',
        url: `${origin}/llms.txt`,
        description:
            'Curated markdown guidance for LLMs and coding agents detailing viaSocket architecture, SDK usage, and available tools.',
        keywords: ['llms.txt', 'llms', 'guidance', 'markdown', 'coding agent', 'instructions'],
    },
    {
        id: 'security',
        type: 'AboutPage',
        name: 'viaSocket Security & Compliance',
        url: `${origin}/help/security-and-compliance`,
        description:
            'Security certifications and controls including SOC 2 Type II, ISO 27001:2022, GDPR, and CCPA compliance with encrypted credential storage.',
        keywords: ['security', 'compliance', 'soc 2', 'iso 27001', 'gdpr', 'ccpa', 'privacy', 'encryption'],
    },
];

const scoreItem = (item, terms) => {
    if (!terms.length) return 1;
    let score = 0;
    const nameLower = item.name.toLowerCase();
    const descLower = item.description.toLowerCase();
    const keywords = item.keywords || [];

    for (const term of terms) {
        if (keywords.some((k) => k.includes(term) || term.includes(k))) score += 5;
        if (nameLower.includes(term)) score += 3;
        if (descLower.includes(term)) score += 1;
    }
    return score;
};

const buildAnswerSummary = (matchedItems, queryText, origin) => {
    if (!queryText) {
        return 'viaSocket is the integration layer for products and AI agents. It handles authenticated connections, OAuth, actions, and webhooks across 2,300+ applications.';
    }

    const top = matchedItems[0];
    if (!top) {
        return `viaSocket connects products and AI agents to 2,300+ applications with managed OAuth, actions, and webhooks. Explore ${origin}/ for full details.`;
    }

    if (top.id === 'pricing') {
        return 'viaSocket offers a Free forever plan, Pro at $19/month ($190/year), Business at $99/month ($990/year), and custom Enterprise plans with task-based metering.';
    }
    if (top.id === 'integrations') {
        return 'viaSocket provides pre-built triggers and actions for 2,300+ apps, including Slack, Google Sheets, Gmail, HubSpot, Salesforce, and OpenAI.';
    }
    if (top.id === 'developers') {
        return `Developers can embed viaSocket with the viasocket-apps SDK and Apps API. Follow the quickstart at ${origin}/developers/docs.`;
    }
    if (top.id === 'docs-mcp') {
        return 'A public read-only documentation MCP server is available at /docs/mcp for tool-calling agents without sign-in.';
    }
    if (top.id === 'security') {
        return 'viaSocket holds SOC 2 Type II and ISO 27001:2022 certifications and adheres to GDPR and CCPA compliance.';
    }

    return `${top.description} Learn more at ${top.url}.`;
};

const resolveResults = (origin, queryText) => {
    const catalog = getCatalog(origin);
    const cleaned = (queryText || '').trim().toLowerCase();
    const terms = cleaned.split(/[^a-z0-9_-]+/).filter((t) => t.length > 1);

    const scored = catalog
        .map((item) => ({ item, score: scoreItem(item, terms) }))
        .sort((a, b) => b.score - a.score);

    const positive = scored.filter((s) => s.score > 0).map((s) => s.item);
    const items = positive.length > 0 ? positive : catalog.slice(0, 5);

    const results = items.map((entry) => ({
        '@context': 'https://schema.org',
        '@type': entry.type,
        name: entry.name,
        url: entry.url,
        description: entry.description,
        ...(entry.applicationCategory ? { applicationCategory: entry.applicationCategory } : {}),
        ...(entry.operatingSystem ? { operatingSystem: entry.operatingSystem } : {}),
        schema_object: {
            '@type': entry.type,
            name: entry.name,
            url: entry.url,
            description: entry.description,
        },
        grounding: {
            url: entry.url,
        },
    }));

    const answer = buildAnswerSummary(items, cleaned, origin);
    return { results, answer };
};

const buildNlWebResponse = (origin, rawQuery) => {
    const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';
    const { results, answer } = resolveResults(origin, query);
    const queryId = `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

    return {
        _meta: {
            response_type: 'answer',
            response_format: 'conversational_search',
            version: '0.55',
        },
        query: query || 'what does viasocket offer',
        query_id: queryId,
        answer,
        message: null,
        results,
    };
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
    const url = new URL(request.url);
    const rawQuery =
        url.searchParams.get('query') ||
        url.searchParams.get('q') ||
        url.searchParams.get('text') ||
        '';

    const origin = url.origin;
    const body = buildNlWebResponse(origin, rawQuery);

    return new Response(JSON.stringify(body, null, 2), {
        status: 200,
        headers: RESPONSE_HEADERS,
    });
}

export async function POST(request) {
    const url = new URL(request.url);
    let rawQuery = '';

    try {
        const json = await request.json();
        if (json) {
            if (typeof json.query === 'string') {
                rawQuery = json.query;
            } else if (typeof json.query?.text === 'string') {
                rawQuery = json.query.text;
            } else if (typeof json.q === 'string') {
                rawQuery = json.q;
            } else if (typeof json.text === 'string') {
                rawQuery = json.text;
            }
        }
    } catch {
        // Fall back to empty query if body is not JSON
    }

    if (!rawQuery) {
        rawQuery =
            url.searchParams.get('query') ||
            url.searchParams.get('q') ||
            url.searchParams.get('text') ||
            '';
    }

    const origin = url.origin;
    const body = buildNlWebResponse(origin, rawQuery);

    return new Response(JSON.stringify(body, null, 2), {
        status: 200,
        headers: RESPONSE_HEADERS,
    });
}
