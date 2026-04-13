'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GoArrowUpRight } from 'react-icons/go';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { handleRedirect } from '@/utils/handleRedirection';
import Menubar from '@/components/navbar/menubar';
import style from '@/components/navbar/navbar.module.scss';
import { FaArrowRightLong } from "react-icons/fa6"

const navItems = [
    {
        name: 'Usecases',
        link: '/departments',
    },
    {
        name: 'Features',
        link: '/features',
    },
    {
        name: 'Explore Apps',
        link: '/integrations',
    },
    {
        name: 'Pricing',
        link: '/pricing',
    },
];

export default function NavbarOptimized({
    utm,
    hasToken = null,
}) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    let mode = 'light';
    let borderClass;
    let backgroundClass;
    let textClass;

    if (utm && utm === '/pricing') {
        borderClass = '';
    }
    if (utm !== '/index') {
        textClass = 'text-dark ';
    } else {
        textClass = 'text-white ';
    }
    if (utm && utm === '/index') {
        backgroundClass = '!uppercase';
    } else {
        backgroundClass = textClass + '!uppercase';
    }

    const isActive = (path) => {
        if (!path || path.startsWith('http')) return '';
        const currentPath = pathname.split('?')[0].split('#')[0];
        const targetPath = path.split('?')[0].split('#')[0];
        return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
            ? '!text-accent'
            : '';
    };

    return (
        <>
            <div
                className={`sticky top-0 z-[100] w-full transition-all duration-300 max-h-none overflow-visible translate-y-0 opacity-100 pointer-events-auto`}
            >
                {/* Top navigation bar */}
                <div className={`border-gray-300 border-b lg:block hidden bg-gray-200/80 supports-[backdrop-filter]:bg-gray-200/70 supports-[-webkit-backdrop-filter:blur(0)]:bg-gray-200/70 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]`}>
                    <div className="items-center justify-end flex !h-[30px]">
                        <div
                            className={`hidden lg:flex cursor-pointer w-full bg-[#5CD2A2]/90 supports-[backdrop-filter]:bg-[#5CD2A2]/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] !h-[30px] items-center justify-center gap-2 !text-sm`}
                        >
                            <span>MCP is now</span>
                            <Image src={`/assets/img/mushrooms-text.svg`} alt="explore mcp" width={100} height={100} />
                            <Link href={'https://mushrooms.viasocket.com'} target='_blank' rel="nofollow noopener noreferrer">
                                <div className='bg-white rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors mx-2 !h-[20px] !text-xs'>
                                    Explore More <GoArrowUpRight />
                                </div>
                            </Link>
                        </div>
                        <Link href="https://cal.id/team/viasocket/sales-team" target="_blank" rel="nofollow noopener noreferrer">
                            <div
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden border-l border-gray-300 lg:flex w-fit px-[18px] !h-[30px] items-center justify-center cursor-pointer hover:text-accent !text-xs text-nowrap`}
                            >
                                Contact Sales
                            </div>
                        </Link>
                        <Link href="https://cal.id/team/viasocket/hire-an-expert" target="_blank" rel="nofollow noopener noreferrer">
                            <div
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden border-l border-gray-300 lg:flex w-fit px-[22px] !h-[30px] items-center justify-center cursor-pointer hover:text-accent !text-xs text-nowrap`}
                            >
                               Hire an expert
                            </div>
                        </Link>
                        <Link href={'/support'}>
                            <div
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} border-l border-gray-300 hidden lg:flex w-fit px-4 !h-[30px] items-center justify-center cursor-pointer text-blue-500 !text-xs`}
                            >
                                Support <GoArrowUpRight />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Main navigation bar */}
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
                            {/* Dynamic navigation links based on selected group */}
                            <div className="flex">
                                {navItems?.length > 0 &&
                                    navItems.map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} ${index === 0 ? 'border-l border-gray-300' : ''
                                                    } border-r border-gray-300 hidden lg:flex w-fit !h-[54px] px-6 hover:text-accent !text-xs items-center justify-center ${isActive(
                                                        `${item.link}`
                                                    )}`}
                                                href={item.link}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                            </div>

                            {/* Dynamic login/panel button based on token */}
                            {hasToken ? (
                                <button
                                    className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent h-full !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                                    onClick={(e) => handleRedirect(e, pathname?.startsWith('/mcp') ? 'https://flow.viasocket.com/mcp?' : 'https://flow.viasocket.com?')}
                                    rel="nofollow"
                                >
                                    Dashboard <FaArrowRightLong className="ml-2" />
                                </button>
                            ) : (
                                <button
                                    className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-4 mx-4 lg:mr-0 bg-accent h-full !text-xs text-nowrap hover:bg-black !h-[32px] !font-normal rounded-full`}
                                    onClick={(e) => handleRedirect(e, pathname?.startsWith('/mcp') ? 'https://flow.viasocket.com/mcp?' : '/signup?')}
                                >
                                    Login/Sign Up
                                </button>
                            )}

                            {/* Mobile menu trigger */}
                            <div
                                onMouseEnter={() => setMenuOpen(true)}
                                onClick={() => setMenuOpen(true)}
                                className={`${borderClass} items-center outline-none flex lg:hidden`}
                                aria-label="Menu"
                            >
                                <MdMenu size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Menubar open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} />
        </>
    );
}
