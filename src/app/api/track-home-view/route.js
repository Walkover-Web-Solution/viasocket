import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { VARIANT_COOKIE, VARIANTS, VISITOR_ID_COOKIE } from '@/const/abTest';
import { trackHomeVariantView } from '@/utils/axiosCalls';

export const runtime = 'edge';

// Cookies are set by middleware, so a value that isn't a plain uuid was put there
// by hand — it is ignored rather than written into the table's filter condition.
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Records one homepage view for the current anonymous visitor.
 *
 * The homepage calls this after it has rendered, and it always answers 200: the
 * response is never read, and tracking problems must not surface as page errors.
 */
export async function POST() {
    try {
        const cookieStore = await cookies();
        const visitorId = cookieStore.get(VISITOR_ID_COOKIE)?.value;
        const variant = cookieStore.get(VARIANT_COOKIE)?.value;

        if (!UUID_REGEX.test(visitorId || '') || !VARIANTS.includes(variant)) {
            return NextResponse.json({ success: false, reason: 'missing tracking cookies' });
        }

        const result = await trackHomeVariantView({ visitorId, variant }, '/');

        return NextResponse.json({ success: Boolean(result), ...(result || {}) });
    } catch (error) {
        console.error('[home variant tracking] failed:', error);
        return NextResponse.json({ success: false });
    }
}
