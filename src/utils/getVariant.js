import { cache } from 'react';
import { cookies } from 'next/headers';
import { VARIANT_COOKIE, VARIANTS } from '@/const/abTest';

// The variant this request renders: the visitor's cookie when it holds one,
// otherwise a fresh coin flip. The browser then records whatever was rendered
// (see TrackingCookies), so the next visit renders the same one. Cached per
// request so generateMetadata and the page agree on a first visit.
export const getVariant = cache(async () => {
    const cookieStore = await cookies();
    const value = cookieStore.get(VARIANT_COOKIE)?.value;
    return VARIANTS.includes(value) ? value : VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
});
