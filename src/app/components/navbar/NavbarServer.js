import { cookies } from 'next/headers';
import NavbarOptimized from './NavbarOptimized';
import NewHeader from './NewHeader';
import { getVariant } from '@/utils/getVariant';

// Variant A's header, site-wide: the full nav (Explore Apps, top bar with
// Contact Sales/Let us build/Support) is retired in favour of this trimmed
// set for every page, matching variant B's header being the trimmed set of
// its own links.
const VARIANT_A_NAV_ITEMS = [
    {
        name: 'Usecases',
        link: '/departments',
        track: 'usecases',
    },
    {
        name: 'Features',
        link: '/features',
        track: 'features',
    },
    {
        name: 'Pricing',
        link: '/pricing',
        track: 'pricing',
    },
];

export default async function NavbarServer({ utm, navbarData }) {
    // Server-side cookie reading
    const cookieStore = await cookies();
    const token = cookieStore.get('prod');
    const hasToken = Boolean(token?.value);
    const variant = await getVariant();

    if (variant === 'B') {
        return <NewHeader utmSource={utm} homepage={false} />;
    }

    return <NavbarOptimized utm={utm} hasToken={hasToken} navItems={VARIANT_A_NAV_ITEMS} showTopBar={false} />;
}
