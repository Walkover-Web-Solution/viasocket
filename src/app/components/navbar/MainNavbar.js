'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { handleRedirect } from '@/utils/handleRedirection';
import style from '@/components/navbar/navbar.module.scss';

export default function MainNavbar({
    navItems = [],
    hasToken = null,
    borderClass = '',
    backgroundClass = '',
    mode = 'light',
    setMenuOpen,
}) {
    const pathname = usePathname();

    const getMcpUtmSource = () => {
        if (!pathname?.startsWith('/mcp/')) return undefined;
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length >= 2 && segments[1] !== 'category') {
            return segments[1];
        }
        return undefined;
    };

    // Where the auth button actually leads, so the recorded interaction names the
    // same destination the click is about to take. On the MCP pages that is a
    // login screen, not a signup, and the two must not be read as each other.
    const isMcp = Boolean(pathname?.startsWith('/mcp'));
    const authDestination = isMcp
        ? 'https://app.mushroom.viasocket.com/login'
        : hasToken
          ? 'https://flow.viasocket.com'
          : '/signup';

    const isActive = (path) => {
        if (!path || path.startsWith('http')) return '';
        const currentPath = pathname.split('?')[0].split('#')[0];
        const targetPath = path.split('?')[0].split('#')[0];
        return currentPath === targetPath || currentPath.startsWith(targetPath + '/') ? '!text-accent' : '';
    };

    return (
        <div
            className={`border-b border-gray-300 transition-all duration-300 ease-in-out overflow-hidden h-[48px] bg-[#faf9f6]/80 supports-[backdrop-filter]:bg-[#faf9f6]/60 supports-[-webkit-backdrop-filter:blur(0)]:bg-[#faf9f6]/60 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]`}
        >
            <div className="justify-between items-center flex px-4 h-[48px]">
                <div className="flex items-center justify-center">
                    <Link
                        href="/"
                        aria-label="logo"
                        data-track="header_logo"
                        data-track-label="viaSocket logo"
                        data-track-section="header"
                        className={`${style.nav_btn} min-w-[120px] ${borderClass} ${backgroundClass} flex !justify-start`}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        {mode === 'dark' ? (
                            <Image
                                src="/assets/brand/socketWhitesvg.png"
                                className="h-[24px] w-auto"
                                width={40}
                                height={40}
                                alt="viaSocket"
                            />
                        ) : (
                            <Image
                                src="/assets/brand/logo.svg"
                                className="h-[24px] w-auto"
                                width={40}
                                height={40}
                                alt="viaSocket"
                            />
                        )}
                    </Link>
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex">
                        {navItems?.length > 0 &&
                            navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    data-track={`header_${item.track || 'nav'}`}
                                    data-track-label={item.name}
                                    data-track-section="header"
                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} ${
                                        index === 0 ? 'border-l border-gray-300' : ''
                                    } border-r border-gray-300 hidden lg:flex w-fit !h-[54px] px-6 hover:text-accent !text-xs items-center justify-center ${isActive(
                                        `${item.link}`
                                    )}`}
                                    href={item.link}
                                >
                                    <span className="flex flex-col items-center leading-tight">
                                        {item.name}
                                        {item.badge && (
                                            <span className="text-[9px] text-accent font-normal normal-case">
                                                {item.badge}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            ))}
                    </div>

                    {hasToken ? (
                        <button
                            data-track="header_dashboard"
                            data-track-label="Dashboard"
                            data-track-section="header"
                            data-track-action="dashboard_click"
                            data-track-destination={authDestination}
                            className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                            onClick={(e) =>
                                handleRedirect(
                                    e,
                                    pathname?.startsWith('/mcp')
                                        ? 'https://app.mushroom.viasocket.com/login?'
                                        : 'https://flow.viasocket.com?',
                                    null,
                                    pathname?.startsWith('/mcp') ? getMcpUtmSource() || 'viasocket' : undefined
                                )
                            }
                            rel="nofollow"
                        >
                            Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            data-track="header_login_signup"
                            data-track-label="Login/Sign Up"
                            data-track-section="header"
                            data-track-action={isMcp ? 'login_click' : 'signup_click'}
                            data-track-destination={authDestination}
                            className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                            onClick={(e) =>
                                handleRedirect(
                                    e,
                                    pathname?.startsWith('/mcp')
                                        ? 'https://app.mushroom.viasocket.com/login?'
                                        : '/signup?',
                                    null,
                                    pathname?.startsWith('/mcp') ? getMcpUtmSource() || 'viasocket' : undefined
                                )
                            }
                        >
                            Login/Sign Up
                        </button>
                    )}

                    <div
                        onMouseEnter={() => setMenuOpen?.(true)}
                        onClick={() => setMenuOpen?.(true)}
                        className={`${borderClass} items-center outline-none flex lg:hidden`}
                        aria-label="Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
