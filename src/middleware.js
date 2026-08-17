import { NextResponse } from 'next/server';
import { VARIANT_COOKIE, VARIANTS, VARIANT_MAX_AGE, VISITOR_ID_COOKIE, VISITOR_ID_MAX_AGE } from '@/const/abTest';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isValidRdtCid = (value) => typeof value === 'string' && value.length >= 40 && RDT_CID_REGEX.test(value);

const getVariantCookieDomain = (hostname) => {
    if (!hostname) return undefined;
    // localhost and bare IPs are not registrable domains — browsers drop a cookie
    // that names one, so it is left off and the cookie stays host-only.
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return undefined;
    const parts = hostname.split('.');
    const rootDomain = parts.length > 2 ? parts.slice(-2).join('.') : hostname;
    return `.${rootDomain}`;
};

export async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    // Redirect /home → /
    if (pathname === '/home') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    const cookieDomain = getVariantCookieDomain(request.nextUrl.hostname);

    // A/B variant assignment (sticky, decided server-side at the edge)
    const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value;
    if (!existingVariant || !VARIANTS.includes(existingVariant)) {
        const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

        response.cookies.set(VARIANT_COOKIE, variant, {
            maxAge: VARIANT_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            domain: cookieDomain,
        });
    }

    // Anonymous visitor id — the key every visit is recorded against. Anything
    // that is not a plain uuid was not written by us, so it is replaced rather
    // than trusted as an identifier.
    const existingVisitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
    if (!UUID_REGEX.test(existingVisitorId || '')) {
        response.cookies.set(VISITOR_ID_COOKIE, crypto.randomUUID(), {
            maxAge: VISITOR_ID_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            domain: cookieDomain,
        });
    }

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
