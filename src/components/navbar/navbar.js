import { MdMenu } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { useState } from 'react';
import Support from '../chat-widget/support';
import { handleRedirect } from '@/utils/handleRedirection';
import { useRouter } from 'next/router';

export default function Navbar({ footerData, utm }) {
    const router = useRouter();

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
        backgroundClass = 'text-black !text-xs !capitalize';
    } else {
        backgroundClass = textClass + '!text-xs !capitalize';
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isActive = (path) => {
        return router.pathname === path ? 'text-accent !font-semibold' : '';
    };

    return (
        <>
            <div className="justify-between flex bg-white px-4">
                <Link
                    href="/"
                    aria-label="logo"
                    className={`${style.nav_btn} min-w-[180px] ${borderClass} ${backgroundClass} flex !justify-start bg-[#FFFFFF10]`}
                    style={{ backgroundColor: '#FFFFFF10' }}
                >
                    {mode === 'dark' ? (
                        <Image
                            src="/assets/brand/socketWhitesvg.png"
                            className="h-[28px] w-auto "
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    ) : (
                        <Image
                            src="/assets/brand/logo.svg"
                            className="h-[28px] w-auto "
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    )}
                </Link>

                <div className="flex">
                    {router.pathname !== '/pricing' && (
                        <Link
                            className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[120px] xl:min-w-[130px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center !text-accent !font-semibold`}
                            href={router.pathname}
                            rel="nofollow"
                        >
                            {router.pathname === '/'
                                ? 'Home'
                                : router.pathname.split('/')[1].charAt(0).toUpperCase() +
                                  router.pathname.split('/')[1].slice(1).toLowerCase()}
                        </Link>
                    )}
                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden md:flex min-w-[120px] xl:min-w-[130px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/discovery')}`}
                        href={`https://viasocket.com/discovery`}
                        rel="nofollow"
                    >
                        Explore Apps
                    </Link>
                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[120px] xl:min-w-[130px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center ${isActive('/pricing')}`}
                        href={`/pricing`}
                        rel="nofollow"
                    >
                        Pricing
                    </Link>
                    <button
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden sm:flex hover-bg-grey-100-text-black px-4 sm:min-w-[120px] xl:min-w-[130px] border custom-border border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                        rel="nofollow"
                    >
                        Login
                    </button>
                    <button
                        className={`${style.nav_btn} ${borderClass} flex text-white text-nowrap px-5 border custom-border border-t-0 border-b-0 bg-accent items-center justify-center !text-xs`}
                        onClick={(e) => handleRedirect(e, '/signup?')}
                    >
                        Start Free Trial
                    </button>
                    <div
                        onMouseEnter={handleHover}
                        className={`${borderClass} hover-bg-grey-100-text-black items-center outline-none bg-[#FFFFFF10] px-4 flex border border-t-0 border-b-0 custom-border`}
                        aria-label="Menu"
                    >
                        <MdMenu size={24} />
                    </div>
                </div>
            </div>
            <Support open={open} onClose={handleClose} footerData={footerData} />
        </>
    );
}
