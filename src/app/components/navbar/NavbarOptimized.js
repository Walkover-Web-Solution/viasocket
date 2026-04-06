'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GoArrowUpRight } from 'react-icons/go';
import { MdMenu } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { handleRedirect } from '@/utils/handleRedirection';
import Menubar from '@/components/navbar/menubar';
import style from '@/components/navbar/navbar.module.scss';
import { FaArrowRightLong } from "react-icons/fa6";

// Link overrides for navbar items - allows redirecting specific links to new URLs
const NAVBAR_LINK_OVERRIDES = {
    '/mcp': 'https://mushrooms.viasocket.com',
};

// Helper function to get the final link (with any overrides applied)
const getNavbarLink = (link) => {
    if (!link) return link;
    return NAVBAR_LINK_OVERRIDES[link] || link;
};

export default function NavbarOptimized({
    utm,
    navbarData,
    hasToken = null,
    initialGroupName = '',
    groupedNavbarData = {},
    topLevelGroups = [],
    currentPath = '/',
    isNavbarWhite = false
}) {
    const pathname = usePathname();
    const [groupName, setGroupName] = useState(initialGroupName);
    const [menuOpen, setMenuOpen] = useState(false);
    const [originalGroupName, setOriginalGroupName] = useState(initialGroupName);
    const [showNavbarOnScroll, setShowNavbarOnScroll] = useState(!isNavbarWhite);

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

    // Normalize a path: remove query/hash, ensure leading slash, drop trailing slash (except root)
    const normalizePath = (p) => {
        if (!p) return '/';
        const noQuery = p.split('?')[0].split('#')[0];
        let out = noQuery.trim();
        if (!out.startsWith('/')) out = '/' + out;
        if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
        return out;
    };

    // Parse a path into base path and hash fragment (without '#')
    const parsePath = (p) => {
        const raw = (p || '').toString();
        const noQuery = raw.split('?')[0];
        const [pathOnly, hash = ''] = noQuery.split('#');
        return { base: normalizePath(pathOnly), hash };
    };

    const isActive = (path) => {
        const link = path || '';
        if (link.startsWith('http')) return '';
        const cur = parsePath(pathname);
        const trg = parsePath(link);

        // Special handling for /embed and its hash children
        if (trg.base === '/embed') {
            // Only accent the exact selected hash child
            if (trg.hash) {
                return cur.base === '/embed' && cur.hash === trg.hash ? '!text-accent' : '';
            }
            // Base /embed (no hash) should only be active when no hash is present in current
            return cur.base === '/embed' && !cur.hash ? '!text-accent' : '';
        }

        // Default behavior for all other routes
        const active = cur.base === trg.base || cur.base.startsWith(trg.base + '/');
        return active ? '!text-accent' : '';
    };

    const isGroupActive = (groupName) => {
        const groupItems = groupedNavbarData?.[groupName] || [];
        if (!groupItems.length) return false;

const current = normalizePath(currentPath || pathname);

        // Mark group active if any item's link OR the group's parent link (group_link) equals current or is a prefix of current (sub-route). Ignore external links.
        return groupItems.some((item) => {
            const candidates = [];
            const child = item?.link || '';
            const parent = item?.group_link || '';

            if (child && !child.startsWith('http')) candidates.push(normalizePath(child));
            if (parent && !parent.startsWith('http')) candidates.push(normalizePath(parent));

            return candidates.some((target) => current === target || current.startsWith(target + '/'));
        });
    };

    // Keep local hover state in sync when server sends updated active group.
    useEffect(() => {
        setGroupName(initialGroupName || '');
        setOriginalGroupName(initialGroupName || '');
    }, [initialGroupName]);

    useEffect(() => {
        if (!isNavbarWhite) {
            setShowNavbarOnScroll(true);
            return;
        }

        const onScroll = () => {
            setShowNavbarOnScroll(window.scrollY > 16);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isNavbarWhite]);


    return (
        <>
            <div
                className={`${
                    isNavbarWhite ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
                } z-[100] w-full transition-all duration-300 ${
                    isNavbarWhite
                        ? showNavbarOnScroll
                            ? 'max-h-[84px] overflow-visible translate-y-0 opacity-100 pointer-events-auto'
                            : 'max-h-0 overflow-hidden -translate-y-full opacity-0 pointer-events-none'
                        : 'max-h-none overflow-visible translate-y-0 opacity-100 pointer-events-auto'
                }`}
                onMouseLeave={() => {
                    setGroupName(originalGroupName);
                }}
            >
                {/* Top navigation bar */}
                <div className={`border-gray-300 border-b lg:block hidden ${isNavbarWhite ? 'bg-white/40 supports-[backdrop-filter]:bg-[#ffffff]/60 supports-[-webkit-backdrop-filter:blur(0)]:bg-[#ffffff]/60' : 'bg-[#f2f2ef] supports-[backdrop-filter]:bg-[#f2f2ef]/60 supports-[-webkit-backdrop-filter:blur(0)]:bg-[#f2f2ef]/60'} backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]`}>
                    <div className="justify-end items-center flex px-4 h-[34px]">
                        <div className="flex justify-center items-center">
                            {navbarData?.length > 0 && topLevelGroups?.length > 0 &&
                                topLevelGroups.map(
                                    (item, index) =>
                                        item?.is_link ? (
                                            <Link key={index} href={getNavbarLink(item?.group_link)}>
                                                <div
                                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit mx-2 px-2 !h-[24px] items-center justify-center cursor-pointer hover:text-accent !text-xs ${
                                                        isGroupActive(item.group_name)
                                                            ? '!text-accent !shadow-[inset_0_-1.5px_0_0_#A8200D] !shadow-accent'
                                                            : ''
                                                    }`}
                                                    onMouseEnter={() => {
                                                        setGroupName(item.group_name);
                                                    }}
                                                >
                                                    {item.group_name}
                                                </div>
                                            </Link>
                                        ) : (
                                            <div
                                                key={index}
                                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit mx-2 px-2 !h-[24px] items-center justify-center cursor-pointer hover:text-accent !text-xs ${
                                                    isGroupActive(item.group_name)
                                                        ? '!text-accent !shadow-[inset_0_-1.5px_0_0_#A8200D] !shadow-accent'
                                                        : ''
                                                }`}
                                                onMouseEnter={() => {
                                                    setGroupName(item.group_name);
                                                }}
                                            >
                                                {item.group_name}
                                            </div>
                                        )
                                )}
                        </div>
                        <Link href={'/support'}>
                            <div
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit pl-2 !h-[32px] items-center justify-center cursor-pointer text-blue-500 !text-xs`}
                            >
                                Support <GoArrowUpRight />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Main navigation bar */}
                <div
                    className={`border-b border-gray-300 transition-all duration-300 ease-in-out overflow-hidden h-[48px] ${isNavbarWhite ? 'bg-white/40 supports-[backdrop-filter]:bg-[#ffffff]/60 supports-[-webkit-backdrop-filter:blur(0)]:bg-[#ffffff]/60' : 'bg-[#faf9f6]/80 supports-[backdrop-filter]:bg-[#faf9f6]/60 supports-[-webkit-backdrop-filter:blur(0)]:bg-[#faf9f6]/60'} backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]`}
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
                                {navbarData?.length > 0 && groupedNavbarData &&
                                    (groupedNavbarData[groupName] || [])
                                        .map((item, index) => {
                                            const finalLink = getNavbarLink(item.link);
                                            return (
                                                <Link
                                                    key={index}
                                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} ${
                                                        index === 0 ? 'border-l border-gray-300' : ''
                                                    } border-r border-gray-300 hidden lg:flex w-fit !h-[54px] px-6 hover:text-accent !text-xs items-center justify-center ${isActive(
                                                        `${item.link}`
                                                    )} ${item.name === 'Home' ? 'lg:hidden' : ''}`}
                                                    href={finalLink}
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

            <Menubar open={menuOpen} onClose={() => setMenuOpen(false)} navbarData={navbarData} />
        </>
    );
}
