import { MdMenu } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Support from '@/components/chat-widget/support';

export default function Navbar({ utm, footerData }) {
    const router = useRouter();
    const [hide, setHide] = useState(false);
    const [supportOpen, setSupportOpen] = useState(false);
    let lastScrollY = 0;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setHide(true);
        } else {
            setHide(false);
        }
        lastScrollY = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        backgroundClass = '!text-xs !capitalize';
    } else {
        backgroundClass = textClass + '!text-xs !capitalize';
    }

    const isActive = (path) => {
        if (path === '/') {
            return router.pathname === path ? 'text-accent !font-semibold' : '';
        }
        return router.pathname.startsWith(path) ? 'text-accent !font-semibold' : '';
    };

    return (
        <>
            <div
                // className={`sticky top-0 z-[100] transition-transform duration-300 w-full ${
                //     hide ? '-translate-y-full' : 'translate-y-0'
                // }`}
                className="sticky top-0 z-[100] transition-transform duration-300 w-full translate-y-0"
            >
                <div className="border-y custom-border">
                    <div className="justify-between flex bg-[#FAF9F6] px-4 h-[44px]">
                        <Link
                            href="/"
                            aria-label="logo"
                            className={`${style.nav_btn} min-w-[180px] ${borderClass} ${backgroundClass} flex !justify-start bg-[#FFFFFF10]`}
                            style={{ backgroundColor: '#FFFFFF10' }}
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

                        <div className="flex">
                            <Link
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/')}`}
                                href={`/`}
                            >
                                Home
                            </Link>
                            {router.pathname !== '/' &&
                                router.pathname !== '/pricing' &&
                                !router.pathname.startsWith('/automations') &&
                                !router.pathname.startsWith('/integrations') && (
                                    <Link
                                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center px-4 !text-accent !font-semibold`}
                                        href={router.pathname}
                                    >
                                        {(router.pathname.split('/')[1]?.toLowerCase() === 'mcp'
                                                ? 'MCP'
                                                : router.pathname.split('/')[1].charAt(0).toUpperCase() +
                                                router.pathname.split('/')[1].slice(1).toLowerCase())}
                                    </Link>
                                )}
                            <Link
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/automations')}`}
                                href={`/automations`}
                            >
                                Automations
                            </Link>
                            <Link
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden md:flex min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/integrations')}`}
                                href={`/integrations`}
                            >
                                Explore Apps
                            </Link>
                            <Link
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/pricing')}`}
                                href={`/pricing`}
                            >
                                Pricing
                            </Link>
                            <button
                                className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden sm:flex hover-bg-grey-100-text-black px-4 sm:min-w-[90px] xl:min-w-[100px] !h-[44px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                                onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                                rel="nofollow"
                            >
                                Login
                            </button>
                            <button
                                className={`${style.nav_btn} ${borderClass} flex text-white text-nowrap px-5 border custom-border border-t-0 border-b-0 !h-[44px] border-r-0 bg-accent items-center justify-center !text-xs`}
                                onClick={(e) => handleRedirect(e, '/signup?', router)}
                            >
                                Sign Up
                            </button>
                            <div
                                onMouseEnter={() => setSupportOpen(true)}
                                className={`${borderClass} hover-bg-grey-100-text-black items-center outline-none bg-[#FFFFFF10] px-4 flex border border-t-0 border-b-0 custom-border`}
                                aria-label="Menu"
                            >
                                <MdMenu size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Support open={supportOpen} onClose={() => setSupportOpen(false)} footerData={footerData} />
        </>
    );
}
