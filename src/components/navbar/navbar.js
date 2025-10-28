import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import Menubar from './menubar';

export default function Navbar({ utm, navbarData }) {
    const router = useRouter();
    const [openSecondNavbar, setOpenSecondNavbar] = useState(false);
    const [groupName, setGroupName] = useState('');
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

    // Normalize a path: remove query/hash, ensure leading slash, drop trailing slash (except root)
    const normalizePath = (p) => {
        if (!p) return '/';
        const noQuery = p.split('?')[0].split('#')[0];
        let out = noQuery.trim();
        if (!out.startsWith('/')) out = '/' + out;
        if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
        return out;
    };

    const isActive = (path) => {
        const link = path || '';
        if (link.startsWith('http')) return '';
        const current = normalizePath(router.asPath);
        const target = normalizePath(link);
        const active = current === target || current.startsWith(target + '/');
        return active ? '!shadow-[inset_0_-4px_0_0_#A8200D] !shadow-accent !text-black' : '';
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

    return (
        <>
            <div
                className="fixed top-0 z-[100] transition-transform duration-300 w-full translate-y-0 bg-[#faf9f6]/80 supports-[backdrop-filter]:bg-[#faf9f6]/60 backdrop-blur-xl"
            >
                <div className="custom-border border-b">
                    <div className="container justify-between items-center flex px-4 h-[54px] ">
                        <div className="flex items-center justify-center">
                            <Link
                                href="/"
                                aria-label="logo"
                                className={`${style.nav_btn} min-w-[180px] ${borderClass} ${backgroundClass} flex !justify-start`}
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

                            {navbarData?.length > 0 && (
                                [...new Map(navbarData.map(item => [item.group_name, item])).values()].map((item, index) => (
                                    item?.is_link ? (
                                        <Link href={item?.group_link}>
                                            <div
                                                key={index}
                                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit px-8 border-r ${index == 0 ? 'border-l' : ''} custom-border !h-[54px] items-center justify-center text-sm cursor-pointer text-black hover:shadow-[inset_0_-4px_0_0_#A8200D] hover:shadow-accent ${isGroupActive(item.group_name) ? '!shadow-[inset_0_-4px_0_0_#A8200D] !shadow-accent !text-black' : ''
                                                    }`}
                                                onMouseEnter={() => {
                                                    setOpenSecondNavbar(true);
                                                    setGroupName(item.group_name);
                                                }}
                                                onMouseLeave={() => setOpenSecondNavbar(false)}
                                            >
                                                {item.group_name}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            key={index}
                                            className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden lg:flex w-fit px-8 border-r ${index == 0 ? 'border-l' : ''} custom-border !h-[54px] items-center justify-center text-sm cursor-pointer text-black hover:shadow-[inset_0_-4px_0_0_#A8200D] hover:shadow-accent ${isGroupActive(item.group_name) ? '!shadow-[inset_0_-4px_0_0_#A8200D] !shadow-accent !text-black' : ''
                                                }`}
                                            onMouseEnter={() => {
                                                setOpenSecondNavbar(true);
                                                setGroupName(item.group_name);
                                            }}
                                            onMouseLeave={() => setOpenSecondNavbar(false)}
                                        >
                                            {item.group_name}
                                        </div>
                                    )
                                ))
                            )}
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass}  hidden lg:flex px-4 border-l border-r custom-border sm:min-w-[90px] xl:min-w-[100px] !h-[54px]  items-center justify-center`}
                                onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                                rel="nofollow"
                            >
                                Login
                            </button>
                            <button
                                className={`${style.nav_btn} ${borderClass} flex items-center justify-center text-white px-5 bg-accent border-r custom-border h-full`}
                                onClick={(e) => handleRedirect(e, '/signup?', router)}
                            >
                                Sign Up
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
                <div
                    className={`border-b custom-border transition-all duration-300 ease-in-out overflow-hidden  ${openSecondNavbar
                        ? ' opacity-100 -translate-y-0 h-[54px]'
                        : ' opacity-0 h-0'}`}
                    onMouseEnter={() => setOpenSecondNavbar(true)}
                    onMouseLeave={() => setOpenSecondNavbar(false)}
                >
                    <div className="container justify-start items-center flex px-4 h-[54px]">
                        <div className="flex">
                            {navbarData?.length > 0 && (
                                navbarData.filter((item) => item.group_name === groupName).map((item, index) => (
                                    <Link
                                        key={index}
                                        className={`${style.nav_btn} ${borderClass} ${backgroundClass}   hidden lg:flex w-fit !h-[52px] px-2 mx-2 xl:px-4 xl:mx-4 hover:shadow-[inset_0_-4px_0_0_#A8200D] hover:shadow-accent text-sm items-center justify-center text-black ${isActive(`${item.link}`)}`}
                                        href={`${item.link}`}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Menubar open={menuOpen} onClose={() => setMenuOpen(false)} navbarData={navbarData} />
        </>
    );
}
