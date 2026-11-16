export const runtime = 'edge';

function getDomain(request) {
    const rawHost =
        request.headers.get('x-forwarded-host')?.split(',')[0].trim() ||
        request.headers.get('host') ||
        new URL(request.url).host ||
        'viasocket.com';
    return rawHost.replace(/:(443|80)$/, '');
}

export async function GET(request) {
    const domain = getDomain(request);
    const body = {
        protocol_version: '1.0',
        organization: {
            name: 'viaSocket',
            domain,
        },
        apis: [
            {
                type: 'mcp',
                url: `https://${domain}/docs/mcp`,
                description: 'viaSocket documentation and integration MCP server',
            },
        ],
    };

    return new Response(JSON.stringify(body, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
