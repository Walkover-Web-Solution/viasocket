import { MdMenu, MdLogin, MdPersonAdd, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { useState } from 'react';
import Support from '../chat-widget/support';
import { handleRedirect } from '@/utils/handleRedirection';

export default function Navbar({ navData, utm }) {
    let shorterData = [];
    if (navData?.length > 0) {
        const prioritizedItems = navData.filter((item) => item.priority);
        shorterData = prioritizedItems.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
        const nonPrioritizedItems = navData.filter((item) => !item.priority);
        shorterData = shorterData.concat(nonPrioritizedItems);
    }

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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden md:flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        href={`https://viasocket.com/discovery`}
                        rel="nofollow"
                    >
                        Explore Apps
                    </Link>
                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        href={`/pricing`}
                        rel="nofollow"
                    >
                        Pricing
                    </Link>
                    <button
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hidden sm:flex hover-bg-grey-100-text-black px-4 sm:min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                        rel="nofollow"
                    >
                        Login
                    </button>
                    <button
                        className={`${style.nav_btn} ${borderClass} flex text-white text-nowrap px-5 border transparent-border-black border-t-0 border-b-0 bg-accent items-center justify-center !text-xs`}
                        onClick={(e) => handleRedirect(e, '/signup?')}
                    >
                        Start Free Trial
                    </button>
                    <button
                        onClick={handleClick}
                        className={`${borderClass} hover-bg-grey-100-text-black items-center outline-none bg-[#FFFFFF10] px-4 flex border border-t-0 border-b-0 transparent-border-black`}
                        aria-label="Menu"
                    >
                        <MdMenu size={24} />
                    </button>
                </div>
            </div>
            <Support open={open} onClose={handleClose} />
        </>
    );
}
