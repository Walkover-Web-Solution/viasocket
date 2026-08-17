import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { VARIANTS, VARIANT_COOKIE, VISITOR_ID_COOKIE } from '@/const/abTest';
import { getAbTestVisitCount, saveAbTestVisit } from '@/utils/axiosCalls';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// x-forwarded-for is a comma separated chain; the first entry is the client.
const getClientIp = (request) =>
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    '';

/**
 * Which of the three deployments this visit came from.
 *
 * NEXT_PUBLIC_PRODUCTION_ENVIRONMENT is the flag the rest of the site already
 * branches on, so it wins; the hostname is only a fallback for a deployment
 * where the variable was never set.
 */
const getEnvironment = (request) => {
    const flag = (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT || '').toLowerCase();
    if (flag === 'prod' || flag === 'production') return 'production';
    if (flag === 'test' || flag === 'stage' || flag === 'staging') return 'test';
    if (flag === 'local' || flag === 'development' || flag === 'dev') return 'local';

    const hostname = new URL(request.url).hostname;
    if (hostname === 'viasocket.com' || hostname.endsWith('.viasocket.com')) return 'production';
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return 'local';
    return 'test';
};

/**
 * Records one visit for the current anonymous visitor.
 *
 * The browser sends what only it knows (device, screen, utm, page); the visitor
 * id, variant, IP and environment are resolved here, where they can be trusted.
 * The table accepts inserts only, so a visit is always a new row and view_count
 * is this visit's position in that visitor's history. Always answers 200 — the
 * client never reads the response, and a tracking failure must not surface as a
 * page error.
 */
export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const visitorId = cookieStore.get(VISITOR_ID_COOKIE)?.value;
        const variant = cookieStore.get(VARIANT_COOKIE)?.value;

        if (!UUID_REGEX.test(visitorId || '') || !VARIANTS.includes(variant)) {
            return NextResponse.json({ success: false, reason: 'missing tracking cookies' });
        }

        const { userInfo, pageUrl, utmData } = await request.json();

        const viewCount = (await getAbTestVisitCount(visitorId, pageUrl)) + 1;

        // pageurl is a linked-record column and rejects a plain URL, so the page
        // is kept inside user_info rather than dropped.
        const record = {
            name: JSON.stringify({
                visitorId,
                pageUrl: pageUrl || '',
                ...(userInfo || {}),
                ipAddress: getClientIp(request),
            }),
            varient: variant,
            view_count: viewCount,
            environment: getEnvironment(request),
            utmdata: JSON.stringify(utmData || {}),
            timestamp: new Date().toISOString(),
        };

        const saved = await saveAbTestVisit(record, pageUrl);

        return NextResponse.json({ success: Boolean(saved), viewCount });
    } catch (error) {
        console.error('[variant tracking] failed:', error);
        return NextResponse.json({ success: false });
    }
}
