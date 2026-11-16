const MAX_DOC_CHARS = 120_000;
const MAX_SEARCH_HITS = 20;

export const DOCS_MCP_PROTOCOL = '2024-11-05';

const GET_DOC_PAGE_OUTPUT_SCHEMA = {
    type: 'object',
    properties: {
        path: {
            type: 'string',
            description: 'The requested documentation path.',
        },
        content: {
            type: 'string',
            description: 'Markdown or plain text content of the documentation page.',
        },
        found: {
            type: 'boolean',
            description: 'True if the document was found and retrieved successfully.',
        },
        status: {
            type: 'integer',
            description: 'HTTP response status code (e.g. 200 or 404).',
        },
    },
    required: ['path', 'content', 'found'],
    additionalProperties: false,
};

const SEARCH_DOCS_OUTPUT_SCHEMA = {
    type: 'object',
    properties: {
        query: {
            type: 'string',
            description: 'The search query executed against the index.',
        },
        matches: {
            type: 'array',
            items: { type: 'string' },
            description: 'Index entries matching all query terms.',
        },
        count: {
            type: 'integer',
            description: 'Number of matching index lines returned.',
        },
    },
    required: ['query', 'matches', 'count'],
    additionalProperties: false,
};

const LIST_DOC_PAGES_OUTPUT_SCHEMA = {
    type: 'object',
    properties: {
        pages: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of documentation page entries from index.md.',
        },
        content: {
            type: 'string',
            description: 'Full markdown text of the documentation index.',
        },
        count: {
            type: 'integer',
            description: 'Total number of indexed pages.',
        },
    },
    required: ['pages', 'content', 'count'],
    additionalProperties: false,
};

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
        outputSchema: GET_DOC_PAGE_OUTPUT_SCHEMA,
        output_schema: GET_DOC_PAGE_OUTPUT_SCHEMA,
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
        outputSchema: SEARCH_DOCS_OUTPUT_SCHEMA,
        output_schema: SEARCH_DOCS_OUTPUT_SCHEMA,
        annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    {
        name: 'list_doc_pages',
        description: 'Return the viaSocket documentation index (index.md): every linked page in one line each.',
        inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
        },
        outputSchema: LIST_DOC_PAGES_OUTPUT_SCHEMA,
        output_schema: LIST_DOC_PAGES_OUTPUT_SCHEMA,
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
    try {
        const res = await fetch(`${docsOrigin}/${path}`, {
            headers: { accept: 'text/plain, text/markdown, */*' },
            cf: { cacheTtl: 300 },
        });
        if (res.ok) {
            const text = (await res.text()).slice(0, MAX_DOC_CHARS);
            return { ok: true, status: res.status, text };
        }
    } catch {
        // network or fetch failure, fall through to fallback
    }

    const prodOrigin = process.env.NEXT_PUBLIC_PROD_ENVIRONMENT;
    if (prodOrigin && !docsOrigin.startsWith(prodOrigin)) {
        try {
            const fallbackRes = await fetch(`${prodOrigin.replace(/\/$/, '')}/docs/${path}`, {
                headers: { accept: 'text/plain, text/markdown, */*' },
            });
            if (fallbackRes.ok) {
                const text = (await fallbackRes.text()).slice(0, MAX_DOC_CHARS);
                return { ok: true, status: fallbackRes.status, text };
            }
        } catch {
            // fallback fetch failed
        }
    }

    return { ok: false, status: 404, text: `Could not load ${path} (HTTP 404).` };
};

export const callDocsMcpTool = async (docsOrigin, name, args) => {
    if (name === 'list_doc_pages') {
        const doc = await fetchDoc(docsOrigin, 'index.md');
        const text = doc.text;
        const pages = doc.ok
            ? text
                  .split('\n')
                  .map((l) => l.trim())
                  .filter((l) => l.length > 0 && !l.startsWith('#'))
            : [];
        return {
            text,
            structuredContent: {
                pages,
                content: text,
                count: pages.length,
            },
        };
    }
    if (name === 'get_doc_page') {
        const path = normalizeDocPath(args?.path);
        if (!path) {
            const text = 'Invalid path. Use a docs filename like skill.md or skill/setup.md (letters, numbers, slashes, dots).';
            return {
                text,
                structuredContent: {
                    path: args?.path || '',
                    content: text,
                    found: false,
                    status: 400,
                },
            };
        }
        const doc = await fetchDoc(docsOrigin, path);
        return {
            text: doc.text,
            structuredContent: {
                path,
                content: doc.text,
                found: doc.ok,
                status: doc.ok ? 200 : doc.status || 404,
            },
        };
    }
    if (name === 'search_docs') {
        const query = typeof args?.query === 'string' ? args.query.trim().toLowerCase() : '';
        if (!query) {
            const text = 'Provide a non-empty query.';
            return {
                text,
                structuredContent: {
                    query: '',
                    matches: [],
                    count: 0,
                },
            };
        }
        const doc = await fetchDoc(docsOrigin, 'index.md');
        if (!doc.ok) {
            return {
                text: doc.text,
                structuredContent: {
                    query,
                    matches: [],
                    count: 0,
                },
            };
        }
        const terms = query.split(/\s+/).filter(Boolean);
        const hits = doc.text
            .split('\n')
            .filter((line) => terms.every((t) => line.toLowerCase().includes(t)))
            .slice(0, MAX_SEARCH_HITS);
        const text = hits.length ? hits.join('\n') : `No index lines matched "${query}". Try list_doc_pages or get_doc_page with skill.md.`;
        return {
            text,
            structuredContent: {
                query,
                matches: hits,
                count: hits.length,
            },
        };
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
                instructions:
                    'viaSocket documentation MCP server. Call list_doc_pages to view the index of all available documentation pages, search_docs with a short keyword to find relevant documentation lines, and get_doc_page with a relative markdown path (e.g. skill.md or skill/setup.md) to retrieve the full page content.',
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
                const result = await callDocsMcpTool(docsOrigin, toolName, toolArgs);
                const text = typeof result === 'string' ? result : result?.text || '';
                const structuredContent =
                    typeof result === 'object' && result?.structuredContent ? result.structuredContent : undefined;
                const response = {
                    content: [{ type: 'text', text }],
                    isError: false,
                };
                if (structuredContent !== undefined) {
                    response.structuredContent = structuredContent;
                    response.structured_content = structuredContent;
                }
                return response;
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
    if (!accept || accept === '*/*') return true;
    return accept.includes('application/json') || accept.includes('text/event-stream');
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