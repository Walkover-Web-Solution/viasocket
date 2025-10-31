import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MdMenu } from 'react-icons/md';
import Menubar from './menubar';
import { GoArrowUpRight } from "react-icons/go";

export default function Navbar({ utm, navbarData }) {
    const router = useRouter();
    const [groupName, setGroupName] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [originalGroupName, setOriginalGroupName] = useState('');

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
        const cur = parsePath(router.asPath);
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
        if (!navbarData?.length) return false;

        const current = normalizePath(router.asPath);
        const groupItems = navbarData.filter((item) => item.group_name === groupName);

        // Mark group active if any item's link equals current or is a prefix of current (sub-route)
        // Ignore external links
        return groupItems.some((item) => {
            const link = item?.link || '';
            if (!link || link.startsWith('http')) return false;
            const target = normalizePath(link);
            return current === target || current.startsWith(target + '/');
        });
    };

    // Ensure the second layer reflects the active first-layer group based on current route
    useEffect(() => {
        if (!navbarData?.length) return;

        const current = normalizePath(router.asPath);

        // Find the first group (by navbarData order) that matches current route
        const groupsInOrder = [...new Map(navbarData.map((i) => [i.group_name, i])).values()].map(
            (i) => i.group_name
        );

        let matchedGroup = '';
        for (const g of groupsInOrder) {
            const items = navbarData.filter((it) => it.group_name === g);
            const hasMatch = items.some((it) => {
                const link = it?.link || '';
                if (!link || link.startsWith('http')) return false;
                const target = normalizePath(link);
                return current === target || current.startsWith(target + '/');
            });
            if (hasMatch) {
                matchedGroup = g;
                break;
            }
        }

        // Only update if different to avoid unnecessary re-renders
        if (matchedGroup && matchedGroup !== groupName) {
            setGroupName(matchedGroup);
            setOriginalGroupName(matchedGroup);
        }
    }, [router.asPath, navbarData]);

    return (
        <>
            <div
                className="fixed top-0 z-[100] transition-transform duration-300 w-full translate-y-0 bg-[#faf9f6]/80 supports-[backdrop-filter]:bg-[#faf9f6]/60 backdrop-blur-xl"
                onMouseLeave={() => {
                    setGroupName(originalGroupName);
                }}
            >
                <div className="border-gray-300 border-b lg:block hidden">
                    <div className="justify-end items-center flex px-4 h-[32px]">
                        <div className="flex justify-center items-center">
                            {navbarData?.length > 0 && (
                                [...new Map(navbarData.map(item => [item.group_name, item])).values()].map((item, index) => (
                                    item?.is_link ? (
                                        <Link href={item?.group_link}>
                                            <div
                                                key={index}
                                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit mx-2 px-2 !h-[32px] items-center justify-center  cursor-pointer hover:text-accent !text-xs ${isGroupActive(item.group_name) ? '!text-accent !shadow-[inset_0_-4px_0_0_#A8200D] !shadow-accent' : ''
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
                                            className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit mx-2 px-2 !h-[32px] items-center justify-center  cursor-pointer  hover:text-accent !text-xs ${isGroupActive(item.group_name) ? '!text-accent !shadow-[inset_0_-4px_0_0_#A8200D] !shadow-accent' : ''
                                                }`}
                                            onMouseEnter={() => {
                                                setGroupName(item.group_name);
                                            }}
                                        >
                                            {item.group_name}
                                        </div>
                                    )
                                ))
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
                <div
                    className={`border-b border-gray-300 transition-all duration-300 ease-in-out overflow-hidden h-[54px]`}
                >
                    <div className="justify-between items-center flex px-4 h-[54px]">
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
                                        className="h-[24px] w-auto "
                                        width={40}
                                        height={40}
                                        alt="viaSocket"
                                    />
                                ) : (
                                    <Image
                                        src="/assets/brand/logo.svg"
                                        className="h-[24px] w-auto "
                                        width={40}
                                        height={40}
                                        alt="viaSocket"
                                    />
                                )}
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex">
                                {navbarData?.length > 0 && (
                                    navbarData.filter((item) => item.group_name === groupName).map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} ${index === 0 ? 'border-l border-gray-300' : ''} border-r border-gray-300 hidden lg:flex w-fit !h-[54px] px-6 hover:text-accent !text-xs items-center justify-center ${isActive(`${item.link}`)} ${item.name === 'Home' ? 'lg:hidden' : ''}`}
                                                href={`${item.link}`}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    })
                                )}
                            </div>
                            <button
                                className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-2 ml-4 lg:mr-0 mr-4 bg-accent border border-black h-full !text-xs text-nowrap hover:bg-black !h-[32px]`}
                                onClick={(e) => handleRedirect(e, '/signup?', router)}
                            >
                                Login/Sign Up
                            </button>
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
