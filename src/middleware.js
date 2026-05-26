import { NextResponse } from 'next/server';

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isValidRdtCid = (value) => typeof value === 'string' && value.length >= 40 && RDT_CID_REGEX.test(value);

export async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    // Redirect /home → /
    if (pathname === '/home') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    // Read click id from URL
    const rawIncomingClickId = searchParams.get('rdt_cid');

    const incomingClickId = isValidRdtCid(rawIncomingClickId) ? rawIncomingClickId : null;

    // Save valid click id in cookie
    if (incomingClickId) {
        response.cookies.set(RDT_CID_COOKIE, incomingClickId, {
            maxAge: RDT_CID_MAX_AGE,
            path: '/',
            sameSite: 'lax',
        });
    } else if (rawIncomingClickId && !isValidRdtCid(rawIncomingClickId)) {
        response.cookies.delete(RDT_CID_COOKIE);
    }

    // Reddit tracking
    if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod') {
        try {
            const pageUrl = request.url;

            const cookieClickId = request.cookies.get(RDT_CID_COOKIE)?.value;

            const clickId = incomingClickId || (isValidRdtCid(cookieClickId) ? cookieClickId : null);

            // IMPORTANT
            // const apiUrl = 'http://127.0.0.1:3000/api/reddit/page-visit';
            const apiUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}api/reddit/page-visit`;

            const payload = {
                event_source_url: pageUrl,
            };

            if (clickId) {
                payload.click_id = clickId;
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).catch((err) => {
                console.error('[Reddit CAPI] tracking error:', err);
            });
        } catch (err) {
            console.error('Middleware error:', err);
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
