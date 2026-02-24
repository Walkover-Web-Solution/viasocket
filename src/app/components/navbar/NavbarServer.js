import { cookies } from 'next/headers';
import NavbarOptimized from './NavbarOptimized';

export default async function NavbarServer({ utm, navbarData }) {
    // Server-side cookie reading
    const cookieStore = await cookies();
    const token = cookieStore.get('prod');
    const hasToken = Boolean(token?.value);

    return (
        <NavbarOptimized 
            utm={utm} 
            navbarData={navbarData} 
            hasToken={hasToken}
        />
    );
}
