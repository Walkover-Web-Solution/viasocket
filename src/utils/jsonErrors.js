import { NextResponse } from 'next/server';

export const PROBLEM_CONTENT_TYPE = 'application/problem+json; charset=utf-8';

/**
 * Return an RFC 9457 problem details JSON response with standard error keys.
 * Ensures agents and scanners (Axien act.json-errors) receive machine-readable
 * JSON errors with status, code, message, error, and detail.
 */
export function problemResponse(status, title, detail, code, headers = {}) {
    return NextResponse.json(
        {
            type: 'about:blank',
            title,
            status,
            detail,
            code,
            error: title,
            message: detail,
        },
        {
            status,
            headers: {
                'Content-Type': PROBLEM_CONTENT_TYPE,
                'Cache-Control': 'no-store',
                ...headers,
            },
        }
    );
}

export function notFoundProblem(detail = 'The requested API endpoint was not found.') {
    return problemResponse(404, 'Not Found', detail, 'not_found');
}

export function methodNotAllowedProblem(allowed = 'POST') {
    return problemResponse(
        405,
        'Method Not Allowed',
        `Method not allowed. Allowed methods: ${allowed}`,
        'method_not_allowed',
        { Allow: allowed }
    );
}
