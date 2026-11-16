import { NextResponse } from 'next/server';
import { acceptsMcpRequest, docsMcpContextFromRequest, handleDocsMcpJsonRpc } from '@/utils/docsMcp';
import { methodNotAllowedProblem } from '@/utils/jsonErrors';

export const runtime = 'edge';

const PRODUCT_MCP = process.env.NEXT_PUBLIC_VIASOCKET_MCP_URL || 'https://connect.viasocket.com/mcp';

const MCP_HEADERS = {
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type, accept, mcp-session-id',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
};

const jsonRpc = (result, id) => NextResponse.json({ jsonrpc: '2.0', result, id: id ?? null }, { headers: MCP_HEADERS });

const jsonRpcError = (code, message, id) =>
    NextResponse.json({ jsonrpc: '2.0', error: { code, message }, id: id ?? null }, { status: 200, headers: MCP_HEADERS });

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: MCP_HEADERS });
}

export async function GET(request) {
    const { docsRoot } = docsMcpContextFromRequest(request);
    const mcpUrl = new URL('/docs/mcp', docsRoot).href;
    return NextResponse.json(
        {
            name: 'viasocket-docs',
            description: 'Public read-only MCP over viaSocket documentation. POST JSON-RPC (initialize, tools/list, tools/call).',
            mcp: mcpUrl,
            docs: docsRoot,
            product_mcp: PRODUCT_MCP,
        },
        { headers: MCP_HEADERS },
    );
}

export async function POST(request) {
    if (!acceptsMcpRequest(request)) {
        return jsonRpcError(
            -32600,
            'Accept header must include both application/json and text/event-stream for POST requests',
            null,
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return jsonRpcError(-32700, 'Parse error', null);
    }

    const id = body?.id ?? null;
    const context = docsMcpContextFromRequest(request);

    try {
        const result = await handleDocsMcpJsonRpc(body, context);
        return jsonRpc(result, id);
    } catch (err) {
        const code = typeof err?.code === 'number' ? err.code : -32603;
        const message = err?.message || 'Internal error';
        return jsonRpcError(code, message, id);
    }
}

const methodNotAllowed = () => methodNotAllowedProblem('GET, POST, OPTIONS');

export async function PUT() {
    return methodNotAllowed();
}

export async function DELETE() {
    return methodNotAllowed();
}

export async function PATCH() {
    return methodNotAllowed();
}
