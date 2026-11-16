import { NextResponse } from 'next/server';

const FALLBACK_BODY = `# Page not found

This page does not exist.

- [Site index](/llms.txt)
- [Developer docs](/developers/docs)
- [Home](/)
`;

/** Markdown 404 for agent clients (read.helpful-404). */
export async function serveNotFoundMarkdown(request) {
    const mdRes = await fetch(new URL('/not-found.md', request.url));
    const body = mdRes.ok ? await mdRes.text() : FALLBACK_BODY;
    return new NextResponse(body, {
        status: 404,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            Vary: 'Accept',
        },
    });
}