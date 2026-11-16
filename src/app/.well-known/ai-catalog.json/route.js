export const runtime = 'edge';

const buildAiCatalog = (origin) => {
    const url = new URL(origin);
    const base = url.origin;
    return {
        specVersion: '1.0',
        entries: [
            {
                identifier: `urn:air:${url.hostname}:mcp:docs`,
                type: 'application/mcp-server-card+json',
                url: `${base}/docs/mcp/server-card`,
            },
            {
                identifier: `urn:air:${url.hostname}:nlweb:ask`,
                displayName: 'viaSocket NLWeb Ask Endpoint',
                type: 'application/json',
                url: `${base}/ask`,
            },
        ],
    };
};

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = JSON.stringify(buildAiCatalog(origin));

    return new Response(body, {
        headers: {
            'Content-Type': 'application/ai-catalog+json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}