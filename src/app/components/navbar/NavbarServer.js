import { cookies } from 'next/headers';
import NavbarOptimized from './NavbarOptimized';
import { getAnnouncements } from '@/app/lib/admin-announcements';

export default async function NavbarServer({ utm, navbarData }) {
    // Server-side cookie reading
    const cookieStore = await cookies();
    const token = cookieStore.get('prod');
    const hasToken = Boolean(token?.value);
    const announcements = await getAnnouncements();

    return (
        <NavbarOptimized 
            utm={utm}
            hasToken={hasToken}
            announcements={announcements}
        />
    );
}
