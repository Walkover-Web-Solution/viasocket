import Image from 'next/image';
import Link from 'next/link';
import { FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { FiLinkedin, FiYoutube } from 'react-icons/fi';

const NewFooter = ({ footerData, borderClass }) => {
    const groupedData = footerData?.reduce((acc, obj) => {
        const groupName = obj.group_name;
        if (!obj?.hidden) {
            if (!acc[groupName]) {
                acc[groupName] = [];
            }
            acc[groupName].push(obj);
        }

        return acc;
    }, {});

    const renderedGroups =
        groupedData &&
        Object.entries(groupedData).map(([groupName, items]) => {
            if (items.length > 0) {
                return (
                    <div className="flex flex-col gap-2 w-full" key={groupName}>
                        <h2 className="font-bold">{groupName}</h2>
                        <div className="flex flex-col gap-2">
                            {items.map(
                                (item, index) =>
                                    !item.hidden && (
                                        <Link
                                            target="_blank"
                                            href={
                                                item?.link
                                                    ? item.link
                                                    : `/${item?.name.toLowerCase().replace(/\s+/g, '-')}`
                                            }
                                            key={index}
                                            aria-label={item?.name}
                                        >
                                            {item?.name}
                                        </Link>
                                    )
                            )}
                        </div>
                    </div>
                );
            }
        });
    return (
        <>
            <div
                className={`grid lg:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1  ms:grid-cols-4 grid-cols-1 border  border-black ${borderClass}`}
            >
                <div className="row-span-1 col-span-4 lg:col-span-1 order-last lg:order-first md:p-10 p-4  lg:border-r border-r-0 border-black">
                    <div className="flex flex-col gap-2 mb-12 sm:mb-6 py-4">
                        <Link href="/" aria-label="socket fav icon">
                            <Image
                                src="/assets/brand/socket_fav_dark.svg"
                                width={46}
                                height={46}
                                alt="socket fav icon"
                            />
                        </Link>
                        <p>© 2024 viaSocket</p>
                        <p>All rights reserved.</p>
                    </div>
                    <div className="flex items-end gap-2 w-full flex-wrap my-8">
                        <span>A product of</span>
                        <Link href="https://walkover.in/" target="_blank" aria-label="walkover">
                            <Image src="/assets/brand/walkover.svg" alt="walkover" width={100} height={20} />
                        </Link>
                    </div>
                </div>
                <div className=" row-span-1 col-span-4 lg:col-span-3 grid sm:grid-cols-3 grid-cols-1">
                    <div className="flex flex-col gap-8 md:p-10 p-4 lg:border-b-0  border-b sm:border-r border-black">
                        {renderedGroups.slice(0, 2)}
                    </div>

                    <div className="flex flex-col gap-8 md:p-10 p-4 sm:border-r lg:border-b-0  border-b border-black">
                        {renderedGroups.slice(2, 4)}
                    </div>

                    <div className="flex flex-col lg:border-b-0 border-b border-black gap-8 md:p-10 p-4 ">
                        {renderedGroups.slice(4, 5)}
                        <div className="flex gap-2 md:gap-4">
                            <Link
                                href={`https://www.instagram.com/walkover.inc/?igsh=MWEyZnptZmw3Z3phOQ%3D%3D`}
                                className=""
                                aria-label="instagram"
                            >
                                <FaInstagram size={24} />
                            </Link>
                            <Link
                                href={`https://www.linkedin.com/company/viasocket-walkover/`}
                                className=""
                                aria-label="facebook"
                            >
                                <FiLinkedin size={24} />
                            </Link>

                            <Link href={`https://x.com/viasocket`} className="" aria-label="twitter">
                                <FaXTwitter size={24} />
                            </Link>
                            <Link href={`https://www.youtube.com/@viasocket`} className="" aria-label="youtube">
                                <FiYoutube size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NewFooter;
