import { cookies } from 'next/headers';
import { VARIANT_COOKIE, VARIANTS } from '@/const/abTest';

// Reads the A/B variant assigned by middleware (server-side / edge).
// Returns 'A' | 'B', falling back to the first variant if unset.
export async function getVariant() {
    const cookieStore = await cookies();
    const value = cookieStore.get(VARIANT_COOKIE)?.value;
    return VARIANTS.includes(value) ? value : VARIANTS[0];
}
