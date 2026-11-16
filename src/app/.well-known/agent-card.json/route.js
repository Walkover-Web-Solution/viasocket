export const runtime = 'edge';

const buildAgentCard = (origin) => ({
    name: 'viaSocket Docs',
    description:
        'Public read-only agent on the viaSocket marketing site. It answers questions about viaSocket integration-layer docs via MCP JSON-RPC at the endpoint below (no account). Product actions and user app connections require developer sign-in on the flow product app.',
    version: '1.0.0',
    documentationUrl: `${origin}/llms.txt`,
    provider: {
        organization: 'Walkover Web Solutions Pvt Ltd',
        url: `${origin}/`,
    },
    supportedInterfaces: [
        {
            url: `${origin}/docs/mcp`,
            protocolBinding: 'JSONRPC',
            protocolVersion: '1.0',
        },
    ],
    capabilities: {
        streaming: true,
        pushNotifications: false,
        extensions: [
            {
                uri: 'https://modelcontextprotocol.io/specification',
                description:
                    'POST JSON-RPC to the interface URL with MCP protocol version 2024-11-05 (initialize, tools/list, tools/call).',
                required: false,
            },
        ],
    },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['text/plain', 'application/json'],
    skills: [
        {
            id: 'search-docs',
            name: 'Search documentation',
            description: 'Find the right viaSocket docs page from the public index before fetching a full page.',
            tags: ['documentation', 'search', 'viasocket'],
            examples: ['How do I embed viaSocket OAuth?', 'MCP setup for my product'],
        },
        {
            id: 'get-doc-page',
            name: 'Fetch documentation page',
            description: 'Return one public /docs page as markdown or plain text (skill.md, automations.md, etc.).',
            tags: ['documentation', 'markdown', 'viasocket'],
            examples: ['Load skill.md', 'Show skill/setup.md'],
        },
        {
            id: 'list-doc-pages',
            name: 'List documentation pages',
            description: 'Return the viaSocket documentation index with every linked page.',
            tags: ['documentation', 'index', 'viasocket'],
        },
    ],
});

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = buildAgentCard(origin);

    return new Response(JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}