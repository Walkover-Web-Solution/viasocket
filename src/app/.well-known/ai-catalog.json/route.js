export const runtime = 'edge';

const FLOW_ORIGIN = 'https://flow.viasocket.com';
const PRODUCT_MCP_URL = 'https://connect.viasocket.com/mcp';

const buildCatalog = (origin) => {
    const url = new URL(origin);
    const host = url.hostname;
    return {
        specVersion: '1.0',
        host: {
            displayName: 'viaSocket',
            identifier: origin,
            documentationUrl: `${origin}/`,
        },
        entries: [
            {
                identifier: `urn:air:${host}:site:home`,
                displayName: 'viaSocket website',
                type: 'text/html',
                url: `${origin}/`,
                description: 'Integration layer for your product & AI agents. Connect 2,300+ apps.',
                tags: ['website'],
            },
            {
                identifier: 'urn:air:viasocket.com:mcp:viasocket',
                displayName: 'viaSocket MCP server',
                type: 'application/mcp+json',
                url: PRODUCT_MCP_URL,
                description: 'Model Context Protocol server for viaSocket integrations and automations across 2,300+ apps.',
                tags: ['mcp', 'integrations', 'tools'],
                auth: {
                    status: 'oauth2',
                    docsUrl: `${FLOW_ORIGIN}/documentation/skill/login-and-orgs.md`,
                },
            },
            {
                identifier: `urn:air:${host}:mcp:docs`,
                displayName: 'viaSocket docs MCP server card',
                type: 'application/mcp-server-card+json',
                url: `${origin}/.well-known/mcp/server-card.json`,
                endpointUrl: `${origin}/docs/mcp`,
                description: 'SEP-2127 Server Card for public read-only Model Context Protocol server over viaSocket documentation.',
                tags: ['mcp', 'documentation', 'docs'],
                capabilities: ['get_doc_page', 'search_docs', 'list_doc_pages'],
                auth: {
                    status: 'none',
                },
            },
            {
                identifier: `urn:air:${host}:agent:docs`,
                displayName: 'viaSocket docs A2A agent card',
                type: 'application/a2a-agent-card+json',
                url: `${origin}/.well-known/agent-card.json`,
                description: 'Agent-to-Agent card for public documentation lookup tools.',
                tags: ['a2a', 'agent-card', 'docs'],
            },
            {
                identifier: `urn:air:${host}:llms:txt`,
                displayName: 'viaSocket llms.txt',
                type: 'text/markdown',
                url: `${origin}/llms.txt`,
                description: 'llms.txt index for viaSocket (agent-oriented documentation and quickstart).',
                tags: ['llms.txt', 'docs'],
            },
            {
                identifier: `urn:air:${host}:llms:full`,
                displayName: 'viaSocket llms-full.txt',
                type: 'text/markdown',
                url: `${origin}/llms-full.txt`,
                description: 'Full documentation in a single file for AI agents.',
                tags: ['llms.txt', 'docs'],
            },
            {
                identifier: 'urn:air:viasocket.com:llms:flow',
                displayName: 'viaSocket product documentation llms.txt',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/llms.txt`,
                description: 'Product documentation index and entry point for plugs, integrations, and the viaSocket SDK.',
                tags: ['llms.txt', 'docs'],
            },
            {
                identifier: 'urn:air:viasocket.com:skill:integrations',
                displayName: 'viaSocket integrations skill (installer)',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/documentation/skill-install.md`,
                description: 'Installable skill pointer for coding agents (Cursor, Claude Code, Codex) to integrate 2,300+ apps.',
                tags: ['skill', 'integrations', 'agent-skills'],
            },
            {
                identifier: 'urn:air:viasocket.com:skill:full-manual',
                displayName: 'viaSocket integrations skill (full manual)',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/documentation/skill.md`,
                description: 'Complete reference manual and integration rules for coding agents.',
                tags: ['skill', 'docs', 'agent-skills'],
            },
            {
                identifier: 'urn:air:viasocket.com:docs:apidocs',
                displayName: 'viaSocket - API docs & credentials setup',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/documentation/skill/setup.md`,
                description: 'API credentials setup and verification guide for viaSocket.',
                tags: ['docs', 'apiDocs'],
            },
            {
                identifier: `urn:air:${host}:docs:apps-api`,
                displayName: 'viaSocket Apps API quickstart',
                type: 'text/html',
                url: `${origin}/developers/docs`,
                description: 'Apps API quickstart documentation for integrating viaSocket into SaaS and agent products.',
                tags: ['docs', 'apiDocs', 'developers'],
            },
            {
                identifier: 'urn:air:viasocket.com:docs:authdocs',
                displayName: 'viaSocket - Auth docs',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/documentation/skill/login-and-orgs.md`,
                description: 'Managed authentication and organisation documentation for viaSocket.',
                tags: ['docs', 'authDocs'],
            },
            {
                identifier: 'urn:air:viasocket.com:docs:integrations',
                displayName: 'viaSocket - App integrations',
                type: 'text/markdown',
                url: `${FLOW_ORIGIN}/documentation/skill/app-integrations.md`,
                description: 'Integration guides and actions for 2,300+ apps.',
                tags: ['docs', 'integrations'],
            },
            {
                identifier: `urn:air:${host}:docs:pricing`,
                displayName: 'viaSocket pricing (markdown)',
                type: 'text/markdown',
                url: `${origin}/pricing.md`,
                description: 'Plain text agent-readable pricing details for viaSocket.',
                tags: ['docs', 'pricing'],
            },
            {
                identifier: `urn:air:${host}:api:catalog`,
                displayName: 'viaSocket API catalog (RFC 9727)',
                type: 'application/linkset+json',
                url: `${origin}/.well-known/api-catalog`,
                description: 'RFC 9727 API catalog linkset listing viaSocket APIs and documentation entry points.',
                tags: ['api-catalog', 'linkset'],
            },
            {
                identifier: `urn:air:${host}:nlweb:ask`,
                displayName: 'viaSocket NLWeb Ask Endpoint',
                type: 'application/json',
                url: `${origin}/ask`,
            },
        ],
    };
};

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const accept = request.headers.get('accept') || '';
    const contentType = accept.includes('application/ai-catalog+json')
        ? 'application/ai-catalog+json; charset=utf-8'
        : 'application/json; charset=utf-8';

    return new Response(JSON.stringify(buildCatalog(origin), null, 2), {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
            Vary: 'Accept',
        },
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
            'Access-Control-Allow-Headers': '*',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
