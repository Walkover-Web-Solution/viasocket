import { MdMenu, MdLogin, MdPersonAdd } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import styles from './newnavbar.module.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const NewNavbar = ({ navData, utm, borderClass }) => {
    let shorterData;
    if (navData?.length > 0) {
        shorterData = navData?.sort((a, b) => {
            return parseInt(a.priority) - parseInt(b.priority);
        });
    }

    return (
        <>
            <div className={`${styles.navbar_cont} container flex flex-col w-full mt-12 mb-0`}>
                <div className="flex items-center justify-between w-full  ">
                    <div className={`border border-black ${borderClass} `}>
                        <div className="flex items-center h-12 px-3 lg:px-4 ">
                            <Link href="/" aria-label="logo" className="flex items-center gap-2">
                                <Image
                                    src="/assets/brand/favicon_dark.svg"
                                    width={32}
                                    height={32}
                                    alt="viasocket"
                                    className="h-6 w-6"
                                />
                                <span className="text-lg font-semibold hidden sm:inline font-times-now text-lg font-normal">
                                    SOCKET
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center flex-1 justify-end ">
                        {shorterData &&
                            shorterData.map((option, index) => (
                                <div key={index} className="relative">
                                    {option.is_parent ? (
                                        <div className="dropdown dropdown-hover">
                                            <button
                                                tabIndex={0}
                                                className="btn text-base text-black bg-white border border-black  flex items-center justify-between w-auto lg:w-40 h-10"
                                            >
                                                {option.name}
                                                <MdOutlineKeyboardArrowDown size={20} />
                                            </button>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu shadow bg-white border border-gray-200 w-40"
                                            >
                                                {shorterData.map(
                                                    (child, childIndex) =>
                                                        child.group_name === option.name && (
                                                            <li key={childIndex}>
                                                                <a
                                                                    target="_blank"
                                                                    href={child.link || '#'}
                                                                    className="text-black text-sm hover:bg-gray-100 px-2 py-1 block "
                                                                >
                                                                    {child.name}
                                                                </a>
                                                            </li>
                                                        )
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            target={option.link?.startsWith('http') ? '_blank' : '_self'}
                                            href={option.link || '#'}
                                            className={`btn w-40 h-10 text-base text-black bg-white border border-black lg:border-r-0 flex items-center justify-center ${borderClass} `}
                                        >
                                            {option.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                    </div>

                    <div className="flex items-center ">
                        <Link
                            href={`https://flow.viasocket.com?utm_source=${utm}`}
                            className={`hidden lg:inline-block btn px-4 py-2 text-black  bg-white font-times-now text-lg font-normal border border-r-0  border-black bg-white hover:bg-gray-50 text-md md:text-lgw-auto lg:w-40 h-10 ${borderClass} `}
                        >
                            Login
                        </Link>
                        <Link
                            href={`/signup?utm_source=${utm}`}
                            className={`hidden lg:inline-block btn px-4 py-2  text-white font-times-now text-lg font-normal border border-black bg-red-700 hover:bg-red-800 text-md md:text-lg w-auto lg:w-40 h-10 ${borderClass} `}
                        >
                            Sign Up
                        </Link>

                        <Link
                            href={`https://flow.viasocket.com?utm_source=${utm}`}
                            className={`lg:hidden text-black p-3  border border-black border-r-0 ${borderClass}`}
                            aria-label="Login"
                        >
                            <MdLogin size={24} />
                        </Link>
                        <Link
                            href={`/signup?utm_source=${utm}`}
                            className={`lg:hidden text-white p-3  bg-red-700 hover:bg-red-800 border border-black  border-r-0 ${borderClass} `}
                            aria-label="Sign Up"
                        >
                            <MdPersonAdd size={24} />
                        </Link>

                        <div className="dropdown dropdown-end lg:hidden">
                            <button
                                tabIndex={0}
                                className={`p-3 border border-black bg-white ${borderClass} `}
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
            </div>
        </>
    );
};

export default NewNavbar;
