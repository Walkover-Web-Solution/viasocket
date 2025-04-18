import { MdMenu, MdLogin, MdPersonAdd, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';
import { useEffect, useState } from 'react';
import { setUtmSource } from '@/utils/handleUtmSource';

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
        backgroundClass = 'text-black hover:bg-black hover:text-white ';
    } else {
        backgroundClass = textClass + ' hover:bg-black hover:text-white ';
    }
    const [defaultUtmSource, setDefaultUtmSource] = useState('');
    const source = typeof window !== 'undefined' ? window.location.pathname : '';

    useEffect(() => {
        const utmData = setUtmSource({ source: source });
        setDefaultUtmSource(utmData);
    }, []);

    return (
        <>
            <div className="py-4 justify-between lg:flex hidden bg-white">
                <Link
                    href="/"
                    aria-label="logo"
                    className={` ${style.nav_btn} min-w-[180px] ${borderClass} ${backgroundClass}  flex bg-[#FFFFFF10]`}
                    style={{ backgroundColor: '#FFFFFF10' }}
                >
                    {mode === 'dark' ? (
                        <Image
                            src="/assets/brand/socketWhitesvg.png"
                            className="h-[40px] w-auto "
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    ) : (
                        <Image
                            src="/assets/brand/logo.svg"
                            className="h-[40px] w-auto "
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

                            return (
                                <div key={index} className="relative">
                                    {option.is_parent ? (
                                        <div className="dropdown dropdown-hover">
                                            {option.link ? (
                                                <Link
                                                    href={option.link}
                                                    target={option.open_in_new_tab ? '_blank' : '_self'}
                                                >
                                                    <button
                                                        tabIndex={0}
                                                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} flex min-w-[130px] border border-r-0 bg-[#FFFFFF10] items-center justify-center px-2`}
                                                    >
                                                        <span>{option.name}</span>
                                                        <MdOutlineKeyboardArrowDown size={20} />
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button
                                                    tabIndex={0}
                                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} flex min-w-[130px] border border-r-0 bg-[#FFFFFF10] items-center justify-center px-2`}
                                                >
                                                    <span>{option.name}</span>
                                                    <MdOutlineKeyboardArrowDown size={20} />
                                                </button>
                                            )}
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu shadow bg-white border border-gray-200 w-40"
                                            >
                                                {shorterData.map(
                                                    (childOption, childIndex) =>
                                                        childOption &&
                                                        childOption.is_child &&
                                                        childOption.group_name === option.name && (
                                                            <li key={childIndex}>
                                                                <Link
                                                                    href={childOption.link || '#'}
                                                                    target={
                                                                        childOption.open_in_new_tab ? '_blank' : '_self'
                                                                    }
                                                                    className="text-black hover:bg-gray-100 px-4 py-2 block"
                                                                >
                                                                    {childOption.name}
                                                                </Link>
                                                            </li>
                                                        )
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        !option.is_child && (
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
                                                    className={`${style.nav_btn} ${borderClass} ${backgroundClass} flex min-w-[130px] border border-r-0 bg-[#FFFFFF10] items-center justify-center px-2`}
                                                >
                                                    {option.name}
                                                </div>
                                            </Link>
                                        )
                                    )}
                                </div>
                            );
                        })}
                    <Link
                        className={`${style.nav_btn} ${borderClass} ${backgroundClass} flex w-[130px] border border-r-0 bg-[#FFFFFF10] items-center justify-center`}
                        href={`https://flow.viasocket.com?state=${defaultUtmSource}`}
                        rel="nofollow"
                    >
                        Login
                    </Link>
                    <Link
                        className={`${style.nav_btn} ${borderClass} text-white flex w-[160px] border bg-accent items-center justify-center`}
                        href={`/signup?utm_source=${utm}`}
                    >
                        Start Free Trial
                    </Link>
                </div>
            </div>
            <div className=" justify-between bg-white py-4  flex lg:hidden">
                <Link
                    href="/"
                    aria-label="logo"
                    className={` ${style.nav_btn} ${borderClass} sm:flex hidden  w-[192px]`}
                >
                    {mode === 'dark' ? (
                        <Image
                            src="/assets/brand/socketWhitesvg.png"
                            className="h-[40px] w-auto "
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    ) : (
                        <Image
                            src="/assets/brand/logo.svg"
                            className="h-[40px] w-auto "
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    )}
                </Link>
                <Link
                    href="/"
                    aria-label="logo"
                    className={` ${style.nav_btn} ${borderClass} ${backgroundClass} bg-[#FFFFFF10] flex sm:hidden w-[56px]`}
                >
                    {mode === 'dark' ? (
                        <Image
                            src="/assets/brand/favicon_light.svg"
                            className="h-[32px] w-auto "
                            width={48}
                            height={48}
                            alt="viasocket"
                        />
                    ) : (
                        <Image
                            src="/assets/brand/favicon_dark.svg"
                            className="h-[32px] w-auto "
                            width={48}
                            height={48}
                            alt="viasocket"
                        />
                    )}
                </Link>
                <div className=" flex">
                    <Link
                        className={` ${style.nav_btn} ${borderClass} ${backgroundClass} flex w-[56px] border border-r-0 bg-[#FFFFFF10] `}
                        href={`https://flow.viasocket.com?state=${defaultUtmSource}`}
                        aria-label="Login"
                        rel="nofollow"
                    >
                        <MdLogin size={24} />
                    </Link>
                    <Link
                        className={` ${style.nav_btn} ${borderClass} flex w-[56px]  text-white  border border-r-0 bg-accent`}
                        href={`/signup?utm_source=${utm}`}
                        aria-label="Sign Up"
                    >
                        <MdPersonAdd size={24} />
                    </Link>

                    <div className="dropdown dropdown-end  ">
                        <button
                            tabIndex={0}
                            className={` ${style.nav_btn} ${borderClass}  ${backgroundClass} bg-[#FFFFFF10] flex w-[56px] border`}
                            aria-label="Menu"
                        >
                            <MdMenu size={24} />
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu  shadow bg-white border border-gray-300 w-56 "
                        >
                            {shorterData &&
                                shorterData.map((option, index) => {
                                    if (!option) return null;
                                    return (
                                        <div key={index} className="collapse collapse-arrow ">
                                            {option.is_parent ? (
                                                <>
                                                    <input type="checkbox" />
                                                    <div className="collapse-title text-sm font-medium">
                                                        {option.name}
                                                    </div>
                                                    <div className="collapse-content">
                                                        {option.link && (
                                                            <Link
                                                                href={option.link}
                                                                className="text-black hover:underline"
                                                                target={option.open_in_new_tab ? '_blank' : '_self'}
                                                                rel="noreferrer"
                                                            >
                                                                {option.name}
                                                            </Link>
                                                        )}
                                                        {shorterData.map((childOption, childIndex) => {
                                                            if (
                                                                childOption &&
                                                                childOption.is_child &&
                                                                childOption.group_name === option.name
                                                            ) {
                                                                return (
                                                                    <div key={childIndex}>
                                                                        <Link
                                                                            href={childOption.link || '#'}
                                                                            className="text-sm text-gray-600 hover:bg-gray-100 block px-2 py-1 border-l ml-2"
                                                                            target={
                                                                                childOption.open_in_new_tab
                                                                                    ? '_blank'
                                                                                    : '_self'
                                                                            }
                                                                            rel="noreferrer"
                                                                        >
                                                                            {childOption.name}
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </div>
                                                </>
                                            ) : (
                                                !option.is_child && (
                                                    <Link
                                                        href={option.link || '#'}
                                                        className="text-sm text-black hover:bg-gray-100 block px-2 py-1 ml-2"
                                                        target={option.open_in_new_tab ? '_blank' : '_self'}
                                                        rel="noreferrer"
                                                    >
                                                        {option.name}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
