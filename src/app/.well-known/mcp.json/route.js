import { DOCS_MCP_INSTRUCTIONS } from '@/utils/docsMcp';

export const runtime = 'edge';

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = {
        name: 'viasocket-docs',
        description: 'Public read-only Model Context Protocol server over viaSocket documentation.',
        url: `${origin}/docs/mcp`,
        transport: 'streamable-http',
        version: '1.0',
        instructions: DOCS_MCP_INSTRUCTIONS,
        servers: [
            {
                name: 'viasocket-docs',
                description: 'Public read-only Model Context Protocol server over viaSocket documentation.',
                url: `${origin}/docs/mcp`,
                transport: 'streamable-http',
                instructions: DOCS_MCP_INSTRUCTIONS,
                capabilities: {
                    tools: true,
                    resources: false,
                    prompts: false,
                },
            },
        ],
    };

    return new Response(JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
