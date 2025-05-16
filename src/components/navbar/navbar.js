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
                    {shorterData &&
                        shorterData.map((option, index) => {
                            if (!option) return null;
                            if (option.is_parent) {
                                const children = shorterData.filter(
                                    (child) => child.is_child && child.name === option.names
                                );

                                return (
                                    <div key={index} className="relative xl:flex hidden">
                                        <div className="dropdown dropdown-hover">
                                            {option.link ? (
                                                <Link
                                                    href={option.link}
                                                    target={option.open_in_new_tab ? '_blank' : '_self'}
                                                >
                                                    <button
                                                        tabIndex={0}
                                                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center px-4`}
                                                    >
                                                        <span className="!text-xs">{option.names}</span>
                                                        <MdOutlineKeyboardArrowDown size={20} />
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button
                                                    tabIndex={0}
                                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center px-4`}
                                                >
                                                    <span className="!text-xs">{option.names}</span>
                                                    <MdOutlineKeyboardArrowDown size={20} />
                                                </button>
                                            )}
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu shadow bg-white border border-gray-200 w-[18vw] gap-2"
                                            >
                                                {children.length > 0 ? (
                                                    children.map((childOption, childIndex) => (
                                                        <li key={childIndex} className="hover:bg-gray-100 py-2">
                                                            <Link
                                                                href={childOption.link || '#'}
                                                                target={
                                                                    childOption.open_in_new_tab ? '_blank' : '_self'
                                                                }
                                                                className="text-black py-1 block !text-xs"
                                                            >
                                                                {childOption.names}
                                                                {/* {childOption.description} */}
                                                            </Link>
                                                            <span className="py-0 text-xs">
                                                                {childOption.description}
                                                            </span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-gray-400 py-2 block !text-xs">No items</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            }

                            if (!option.is_child) {
                                return (
                                    <Link
                                        key={index}
                                        target={
                                            option.open_in_new_tab
                                                ? '_blank'
                                                : option.link?.startsWith('http')
                                                  ? '_blank'
                                                  : '_self'
                                        }
                                        href={option.link || '#'}
                                    >
                                        <div
                                            className={`${style.nav_btn} ${borderClass} ${backgroundClass} flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center px-4`}
                                        >
                                            {option.names}
                                        </div>
                                    </Link>
                                );
                            }

                            return null;
                        })}

                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black hidden sm:flex min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        href={`/pricing`}
                        rel="nofollow"
                    >
                        Pricing
                    </Link>
                    <button
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} hover-bg-grey-100-text-black flex px-4 sm:min-w-[120px] xl:min-w-[130px] border transparent-border-black border-t-0 border-b-0 border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                        rel="nofollow"
                    >
                        Login
                    </button>
                    <button
                        className={`${style.nav_btn} ${borderClass} hidden md:flex text-white text-nowrap px-5 border transparent-border-black border-t-0 border-b-0 bg-accent items-center justify-center !text-xs`}
                        onClick={(e) => handleRedirect(e, '/signup?')}
                    >
                        Start Free Trial
                    </button>
                    <button
                        onClick={handleClick}
                        className={`${borderClass} hover-bg-grey-100-text-black items-center bg-[#FFFFFF10] px-4 flex border border-t-0 border-b-0 transparent-border-black`}
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
