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
                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} ${
                                        index === 0 ? 'border-l border-gray-300' : ''
                                    } border-r border-gray-300 hidden lg:flex w-fit !h-[54px] px-6 hover:text-accent !text-xs items-center justify-center ${isActive(
                                        `${item.link}`
                                    )}`}
                                    href={item.link}
                                >
                                    {item.name}
                                </Link>
                            ))}
                    </div>

                    {hasToken ? (
                        <button
                            className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                            onClick={(e) =>
                                handleRedirect(
                                    e,
                                    pathname?.startsWith('/mcp')
                                        ? 'https://flow.viasocket.com/mcp?'
                                        : 'https://flow.viasocket.com?'
                                )
                            }
                            rel="nofollow"
                        >
                            Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                            onClick={(e) =>
                                handleRedirect(
                                    e,
                                    pathname?.startsWith('/mcp') ? 'https://flow.viasocket.com/mcp?' : '/signup?'
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
