import createURL from '@/utils/createURL';
import Link from 'next/link';
import { RxDiscordLogo } from 'react-icons/rx';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { FiLinkedin, FiYoutube } from 'react-icons/fi';
import { RequestIntegrationPopupOpener } from '../IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Footer({ footerData, borderClass, isBlack = false }) {
    const [ref, inView] = useScrollAnimation({ threshold: 0.1 });

    const filteredData = footerData?.filter((item) => !item?.hidden);
    const groupedData = filteredData?.reduce((acc, obj) => {
        const groupName = obj?.group_name;
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(obj);
        return acc;
    }, {});

    const borderTheme = isBlack ? 'white' : 'custom-border';

    const renderedGroups =
        groupedData &&
        Object?.entries(groupedData)?.map(([groupName, items]) => {
            if (items?.length > 0) {
                return (
                    <div className="flex flex-col gap-2 w-full" key={groupName}>
                        <h2 className="font-bold">{groupName}</h2>
                        <div className="flex flex-col gap-2">
                            {items?.map((item, index) => (
                                <Link
                                    target="_blank"
                                    href={createURL(item?.link)}
                                    key={index}
                                    className="hover:text-blue-500 transition-colors duration-300"
                                    aria-label={item?.name}
                                >
                                    <span className="text-sm">{item?.name}</span>
                                </Link>
                            ))}
                            {groupName === 'Support' && (
                                <RequestIntegrationPopupOpener title="Request an Integration" showType="footer" />
                            )}
                        </div>
                    </div>
                );
            }
        });
    return (
        <>
            <div
                ref={ref}
                className={`viasocket-footer-wrapper bg-white grid lg:grid-rows-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1  ms:grid-cols-4 grid-cols-1 border ${borderTheme} ${borderClass} scroll-animate ${inView ? 'in-view' : ''}`}
            >
                <div
                    className={`row-span-1 justify-center col-span-4 lg:col-span-1 order-last lg:order-first md:p-10 p-4 h-full lg:border-r border-r-0 ${borderTheme} flex flex-col `}
                >
                    <p className="rotate-viasocket font-extrabold w-full flex justify-center items-center text-[6vw]">
                        viaSocket
                    </p>
                </div>
                <div className=" row-span-1 col-span-4 lg:col-span-3 grid sm:grid-cols-3 grid-cols-1">
                    <div
                        className={`flex flex-col gap-12 md:p-10 p-4 lg:border-b-0 border-b sm:border-r ${borderTheme}`}
                    >
                        {renderedGroups?.slice(0, Math.ceil(renderedGroups?.length / 3))}
                    </div>

                    <div
                        className={`flex flex-col gap-12 md:p-10 p-4 sm:border-r lg:border-b-0  border-b ${borderTheme}`}
                    >
                        {renderedGroups?.slice(
                            Math.ceil(renderedGroups?.length / 3),
                            2 * Math.ceil(renderedGroups?.length / 3)
                        )}

                        <div className="flex flex-col gap-6 mt-auto p-4">
                            <div className="flex gap-2 justify-center items-center">
                                <img
                                    src="https://brand-assets.capterra.com/badge/3b902cef-5889-4a4e-afaa-855d73a3d238.svg"
                                    alt="capterra"
                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                />
                                <img
                                    src="https://www.g2.com/shared-assets/product-badges/users-love-us.svg"
                                    alt="g2"
                                    style={{ width: '100px', height: '60px', objectFit: 'contain' }}
                                />
                            </div>

                            <div className="flex gap-2 justify-center items-center md:gap-6">
                                <Link
                                    href={`https://www.instagram.com/walkover.inc/?igsh=MWEyZnptZmw3Z3phOQ%3D%3D`}
                                    target="_blank"
                                    className=""
                                    aria-label="instagram"
                                >
                                    <FaInstagram size={24} />
                                </Link>
                                <Link
                                    href={`https://www.linkedin.com/company/viasocket-walkover/`}
                                    target="_blank"
                                    className=""
                                    aria-label="facebook"
                                >
                                    <FiLinkedin size={24} />
                                </Link>

                                <Link
                                    href={`https://x.com/viasocket`}
                                    target="_blank"
                                    className=""
                                    aria-label="twitter"
                                >
                                    <FaXTwitter size={24} />
                                </Link>
                                <Link
                                    href={`https://www.youtube.com/@viasocket`}
                                    target="_blank"
                                    className=""
                                    aria-label="youtube"
                                >
                                    <FiYoutube size={24} />
                                </Link>
                                <Link
                                    href={`https://discord.com/invite/wqsSsMAkkz`}
                                    target="_blank"
                                    className=""
                                    aria-label="discord"
                                >
                                    <RxDiscordLogo size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col lg:border-b-0 border-b ${borderTheme} gap-12 md:p-10 p-4 `}>
                        {renderedGroups?.slice(2 * Math.ceil(renderedGroups?.length / 3))}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm flex items-center gap-1 flex-wrap mt-auto">
                                <span>© {new Date().getFullYear()} viaSocket |</span>
                                <Link href="/privacy" className="active-link text-link">
                                    Privacy<span className="text-black">,</span>
                                </Link>
                                <Link href="/terms" className="active-link text-link">
                                    Terms
                                </Link>
                                <span>and</span>
                                <Link href="/data-retention-deletion" className="active-link text-link">
                                    Data Retention & Deletion Policy
                                </Link>
                            </p>
                            <p className="text-sm flex items-center gap-1 flex-wrap">
                                Walkover Web Solutions Pvt Ltd. | All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
