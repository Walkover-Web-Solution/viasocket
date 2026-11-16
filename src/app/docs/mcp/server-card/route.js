import { buildDocsMcpServerCard } from '@/utils/docsMcp';

export const runtime = 'edge';

const CARD_HEADERS = {
    'content-type': 'application/mcp-server-card+json; charset=utf-8',
    'cache-control': 'public, max-age=3600',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, if-none-match',
    'access-control-expose-headers': 'etag',
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CARD_HEADERS });
}

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = JSON.stringify(buildDocsMcpServerCard(origin));
    return new Response(body, { headers: CARD_HEADERS });
}