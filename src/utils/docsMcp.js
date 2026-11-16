const MAX_DOC_CHARS = 120_000;
const MAX_SEARCH_HITS = 20;

export const DOCS_MCP_PROTOCOL = '2024-11-05';

export const DOCS_MCP_TOOLS = [
    {
        name: 'get_doc_page',
        description:
            'Fetch one viaSocket documentation page by path (for example skill.md or skill/setup.md). Returns markdown/plain text from the site public /docs tree.',
        inputSchema: {
            type: 'object',
            properties: {
                path: {
                    type: 'string',
                    description: 'Docs path without a leading slash, usually ending in .md (skill.md, index.md, automations.md).',
                },
            },
            required: ['path'],
            additionalProperties: false,
        },
        annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    {
        name: 'search_docs',
        description:
            'Search the viaSocket docs index (index.md) for lines mentioning a short phrase. Use this before calling get_doc_page when the right path is unknown.',
        inputSchema: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'A few distinctive words from the topic (oauth, embed, mcp, automations, etc.).',
                },
            },
            required: ['query'],
            additionalProperties: false,
        },
        annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    {
        name: 'list_doc_pages',
        description: 'Return the viaSocket documentation index (index.md): every linked page in one line each.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
];

const SAFE_PATH = /^[a-z0-9][a-z0-9._/-]*\.md$/i;

export const normalizeDocPath = (raw) => {
    const path = typeof raw === 'string' ? raw.trim().replace(/^\/+/, '') : '';
    if (!SAFE_PATH.test(path) || path.includes('..')) return null;
    return path;
};

const fetchDoc = async (docsOrigin, path) => {
    const res = await fetch(`${docsOrigin}/${path}`, {
        headers: { accept: 'text/plain, text/markdown, */*' },
        cf: { cacheTtl: 300 },
    });
    if (!res.ok) {
        return { ok: false, status: res.status, text: `Could not load ${path} (HTTP ${res.status}).` };
    }
    const text = (await res.text()).slice(0, MAX_DOC_CHARS);
    return { ok: true, text };
};

export const callDocsMcpTool = async (docsOrigin, name, args) => {
    if (name === 'list_doc_pages') {
        const doc = await fetchDoc(docsOrigin, 'index.md');
        return doc.ok ? doc.text : doc.text;
    }
    if (name === 'get_doc_page') {
        const path = normalizeDocPath(args?.path);
        if (!path) return 'Invalid path. Use a docs filename like skill.md or skill/setup.md (letters, numbers, slashes, dots).';
        const doc = await fetchDoc(docsOrigin, path);
        return doc.text;
    }
    if (name === 'search_docs') {
        const query = typeof args?.query === 'string' ? args.query.trim().toLowerCase() : '';
        if (!query) return 'Provide a non-empty query.';
        const doc = await fetchDoc(docsOrigin, 'index.md');
        if (!doc.ok) return doc.text;
        const terms = query.split(/\s+/).filter(Boolean);
        const hits = doc.text
            .split('\n')
            .filter((line) => terms.every((t) => line.toLowerCase().includes(t)))
            .slice(0, MAX_SEARCH_HITS);
        return hits.length ? hits.join('\n') : `No index lines matched "${query}". Try list_doc_pages or get_doc_page with skill.md.`;
    }
    throw new Error(`Unknown tool: ${name}`);
};

export const handleDocsMcpJsonRpc = async (body, context) => {
    const docsOrigin = context?.docsOrigin;
    const docsRoot = context?.docsRoot;
    const { method, params } = body ?? {};
    switch (method) {
        case 'initialize':
            return {
                protocolVersion: DOCS_MCP_PROTOCOL,
                capabilities: { tools: { listChanged: false } },
                serverInfo: {
                    name: 'viasocket-docs',
                    title: 'viaSocket documentation (read-only)',
                    version: '1.0.0',
                    website: docsRoot,
                },
            };
        case 'notifications/initialized':
        case 'ping':
            return {};
        case 'tools/list':
            return { tools: DOCS_MCP_TOOLS };
        case 'tools/call': {
            const toolName = params?.name;
            const toolArgs = params?.arguments ?? {};
            try {
                const text = await callDocsMcpTool(docsOrigin, toolName, toolArgs);
                return {
                    content: [{ type: 'text', text }],
                    isError: false,
                };
            } catch (err) {
                return {
                    content: [{ type: 'text', text: err?.message || 'Tool call failed.' }],
                    isError: true,
                };
            }
        }
        default:
            throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
    }
};

export const acceptsMcpRequest = (request) => {
    const accept = request.headers.get('accept') || '';
    return accept.includes('application/json') && accept.includes('text/event-stream');
};

export const docsMcpContextFromRequest = (request) => {
    const url = new URL(request.url);
    const docsRoot = `${url.origin}/docs/`;
    const configuredBase = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
    const docsOrigin = configuredBase ? `${configuredBase}/docs` : docsRoot.replace(/\/$/, '');
    return { docsOrigin, docsRoot };
};

/** SEP-2127 Server Card for the public docs MCP at `/docs/mcp`. */
export const buildDocsMcpServerCard = (origin) => {
    const base = origin.replace(/\/$/, '');
    const mcpUrl = `${base}/docs/mcp`;
    return {
        $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
        name: 'com.viasocket/docs',
        version: '1.0.0',
        title: 'viaSocket Docs',
        description: 'Read-only MCP over public viaSocket docs. No sign-in.',
        websiteUrl: `${base}/llms.txt`,
        remotes: [
            {
                type: 'streamable-http',
                url: mcpUrl,
                supportedProtocolVersions: [DOCS_MCP_PROTOCOL],
            },
        ],
    };
};