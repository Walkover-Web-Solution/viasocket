import { MdMenu, MdLogin, MdPersonAdd } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import style from './navbar.module.scss';

export default function Navbar({ navData, utm }) {
    let shorterData;
    if (navData?.length > 0) {
        shorterData = navData?.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
    }
    const darkPageArray = [
        '/index',
        '/pricing',
        '/integrations',
        '/support',
        '/experts',
        '/free-access-programs',
        '/privacy',
        '/terms',
    ];
    let mode = utm && darkPageArray.includes(utm) ? 'light' : 'dark';

    let borderClass;
    let backgroundClass;
    let textClass;
    if (utm && utm === '/pricing') {
        borderClass = 'border-b-0';
    }
    if (
        (utm && utm === '/pricing') ||
        utm === '/integrations' ||
        utm === '/support' ||
        utm === '/experts' ||
        utm === '/free-access-programs' ||
        utm === '/privacy' ||
        utm === '/terms'
    ) {
        textClass = 'text-dark ';
    } else {
        textClass = 'text-white ';
    }
    if (utm && utm === '/index') {
        backgroundClass = 'text-black hover:bg-black hover:text-white ';
    } else {
        backgroundClass = textClass + ' hover:bg-black hover:text-white ';
    }

    return (
        <>
            <div className="mt-8 justify-between xl:flex hidden">
                <Link
                    href="/"
                    aria-label="logo"
                    className={` ${style.nav_btn} w-[192px] ${borderClass} ${backgroundClass} border flex bg-[#FFFFFF10]`}
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
                        shorterData?.map((option, index) => {
                            return (
                                <Link
                                    key={index}
                                    target={option.link?.startsWith('http') ? '_blank' : '_self'}
                                    href={option.link || '#'}
                                >
                                    <div
                                        className={` ${style.nav_btn} ${borderClass} ${backgroundClass} flex w-[150px] border border-r-0 bg-[#FFFFFF10]`}
                                    >
                                        {option.name}
                                    </div>
                                </Link>
                            );
                        })}
                    <Link
                        className={` ${style.nav_btn} ${borderClass} ${backgroundClass} flex w-[150px] border border-r-0 bg-[#FFFFFF10]`}
                        href={`/login?utm_source=${utm}`}
                    >
                        Login
                    </Link>
                    <Link
                        className={` ${style.nav_btn} ${borderClass} text-white flex w-[150px] border bg-accent`}
                        href={`/signup?utm_source=${utm}`}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <div className="container justify-between   mt-8  flex xl:hidden">
                <Link
                    href="/"
                    aria-label="logo"
                    className={` ${style.nav_btn} ${borderClass} sm:flex hidden  w-[192px]  border`}
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
                    className={` ${style.nav_btn} ${borderClass} ${backgroundClass} bg-[#FFFFFF10] flex sm:hidden w-[56px] border`}
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
                        href={`/login?utm_source=${utm}`}
                        aria-label="Login"
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
                            className="dropdown-content menu  shadow bg-white border border-gray-300 w-48 "
                        >
                            {shorterData &&
                                shorterData.map((option, index) => (
                                    <li key={index}>
                                        <Link
                                            href={option.link || '#'}
                                            className="text-black text-sm hover:bg-gray-100 block px-2 "
                                        >
                                            {option.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
