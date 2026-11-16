import { DOCS_MCP_SERVER_CARD_CORS_HEADERS, docsMcpServerCardResponse } from '@/utils/docsMcp';

export const runtime = 'edge';

const CONTENT_TYPE = 'application/mcp-server-card+json; charset=utf-8';

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: { ...DOCS_MCP_SERVER_CARD_CORS_HEADERS, 'content-type': CONTENT_TYPE },
    });
}

export async function GET(request) {
    const origin = new URL(request.url).origin;
    return docsMcpServerCardResponse(origin, CONTENT_TYPE);
}