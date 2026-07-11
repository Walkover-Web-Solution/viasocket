'use client';
import Image from 'next/image';
import Link from 'next/link';
import ExternalLink from '@/utils/ExternalLink';
import { LinkText } from '@/components/uiComponents/buttons';
import createURL from '@/utils/createURL';

export default function AboutApps({ appOneDetails, appTwoDetails, getDoFollowUrlStatusArray }) {
    return (
        <div className="container pb-4">
            <div className="cont">
                <div className="flex flex-col md:flex-row border border-x-0 custom-border bg-white">
                    <div className="cont gap-4 w-full p-6 md:p-12 border border-t-0 md:border-b-0 custom-border">
                        <div className="cont gap-2">
                            <Image
                                className="h-10 w-fit"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt={`${appOneDetails?.name} logo`}
                            />
                            <h3 className="h3 font-bold pt-5">About {appOneDetails?.name}</h3>
                        </div>
                        <p className="text-sm sm:text-lg text-black h-full">{appOneDetails?.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {appOneDetails?.category?.slice(0, 2).map((cat, index) => (
                                <Link
                                    key={index}
                                    href={createURL(
                                        `/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
                                    )}
                                    className="mb-2"
                                >
                                    <span className="btn btn-outline">{cat}</span>
                                </Link>
                            ))}
                        </div>
                        <ExternalLink
                            href={(() => {
                                const baseUrl = appOneDetails?.domain?.startsWith('http')
                                    ? appOneDetails?.domain
                                    : 'http://' + appOneDetails?.domain;
                                const separator = baseUrl.includes('?') ? '&' : '?';
                                return `${baseUrl}${separator}utm_source=viasocket`;
                            })()}
                            appSlugName={appOneDetails?.appslugname}
                            doFollowArray={getDoFollowUrlStatusArray}
                        >
                            <LinkText children={'Learn more'} />
                        </ExternalLink>
                    </div>
                    <div className="cont w-full gap-4 p-12 border-x md:border-l-0 custom-border">
                        <div className="cont gap-2">
                            <Image
                                className="h-10 w-fit"
                                src={appTwoDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt={`${appTwoDetails?.name} logo`}
                            />
                            <h3 className="h3 font-bold pt-5">About {appTwoDetails?.name}</h3>
                        </div>
                        <p className="text-sm sm:text-lg text-black h-full">{appTwoDetails?.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {appTwoDetails?.category?.slice(0, 2).map((cat, index) => (
                                <Link
                                    key={index}
                                    href={createURL(
                                        `/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
                                    )}
                                    className="mb-2"
                                >
                                    <span className="btn btn-outline">{cat}</span>
                                </Link>
                            ))}
                        </div>
                        <ExternalLink
                            href={(() => {
                                const baseUrl = appTwoDetails?.domain?.startsWith('http')
                                    ? appTwoDetails?.domain
                                    : 'http://' + appTwoDetails?.domain;
                                const separator = baseUrl.includes('?') ? '&' : '?';
                                return `${baseUrl}${separator}utm_source=viasocket`;
                            })()}
                            appSlugName={appTwoDetails?.appslugname}
                            doFollowArray={getDoFollowUrlStatusArray}
                        >
                            <LinkText children={'Learn more'} />
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
