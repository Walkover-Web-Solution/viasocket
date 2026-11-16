export const runtime = 'edge';

const FLOW_ORIGIN = 'https://flow.viasocket.com';

const marketingLinkset = (origin) => ({
    anchor: `${origin}/`,
    'service-doc': [
        { href: `${origin}/llms.txt` },
        { href: `${origin}/docs/mcp` },
    ],
});

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = {
        linkset: [
            {
                anchor: `${FLOW_ORIGIN}/`,
                'service-doc': [
                    { href: `${FLOW_ORIGIN}/documentation` },
                    { href: `${FLOW_ORIGIN}/llms.txt` },
                ],
            },
            marketingLinkset(origin),
        ],
    };

    return new Response(JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/linkset+json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}