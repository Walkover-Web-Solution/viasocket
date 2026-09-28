'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
    { href: '/developers/auth', label: 'Managed auth' },
    { href: '/developers/pricing', label: 'Pricing' },
    { href: '/developers/docs', label: 'Docs' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 max-w-[1080px] mx-auto py-[18px] bg-dev-bg/85 backdrop-blur-[14px]">
            <Link href="/developers" className="flex items-center gap-[9px] font-bold text-[18px] tracking-[-0.02em] no-underline text-dev-ink">
                <i className="w-[9px] h-[9px] rounded-full bg-dev-accent inline-block" />
                viaSocket
            </Link>
            <nav className="flex items-center gap-[22px]">
                {NAV.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`hidden sm:inline text-[14.5px] no-underline ${
                            pathname === item.href ? 'text-dev-ink' : 'text-dev-ink-2'
                        }`}
                        aria-current={pathname === item.href ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
                <Link
                    href="https://viasocket.com/signup"
                    className="inline-flex items-center gap-[10px] bg-dev-ink text-dev-ink-inv no-underline px-[16px] py-[9px] rounded-full font-semibold text-[14px] transition-transform hover:-translate-y-px"
                >
                    Signup
                </Link>
            </nav>
        </header>
    );
}
