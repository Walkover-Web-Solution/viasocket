import { NextResponse } from 'next/server';

/**
 * RFC 7807-style 404 for clients that accept JSON.
 */
export function buildJsonNotFoundResponse(requestOrPath) {
    const path =
        typeof requestOrPath === 'string'
            ? requestOrPath
            : new URL(requestOrPath.url).pathname;
    const origin =
        typeof requestOrPath === 'string'
            ? ''
            : new URL(requestOrPath.url).origin;

    const body = {
        type: `${origin}/errors/not-found`,
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource could not be found.',
        instance: path,
        code: 'not_found',
        error: 'Not Found',
        message: 'The requested resource could not be found.',
    };

    return NextResponse.json(body, {
        status: 404,
        headers: {
            'Content-Type': 'application/problem+json; charset=utf-8',
            Vary: 'Accept',
        },
    });
}