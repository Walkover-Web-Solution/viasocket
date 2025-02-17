import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdArrowOutward, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import BlogGrid from '@/components/blogGrid/blogGrid';

import { LinkText } from '@/components/uiComponents/buttons';
import { useState } from 'react';
import createURL from '@/utils/createURL';

import IntegrationsHeadComp from '../../integrationsHeadComp/integrationsHeadComp';
import IntegrationsEventsComp from '../../integrationsEventsComp/integrationsEventsComp';

export default function IntegrationsDisconnectedComp({
    appOneDetails,
    pageInfo,
    integrationsInfo,
    faqData,
    footerData,
    blogsData,
    metaData,
    disconnecteData,
}) {
    return (
        <>
            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appOneDetails]}
                type={'appOne'}
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
            />
            <div style={{ background: appOneDetails?.brandcolor }}>
                <div className="container cont py-8 gap-4 flex items-center justify-between">
                    <div className="flex md:items-center w-full justify-end gap-2 md:gap-4 flex-col md:flex-row ">
                        {/* <Link
                            target="_blank"
                            href={`${process.env.NEXT_PUBLIC_FLOW_URL}/connect/${appOneDetails?.rowid}`}
                        >
                            <button className="bg-white flex border border-black items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                                Connect {appOneDetails?.name} <MdOpenInNew />{' '}
                            </button>
                        </Link> */}
                        <Link
                            target="_blank"
                            href={
                                appOneDetails?.domain.startsWith('http')
                                    ? appOneDetails?.domain
                                    : 'http://' + appOneDetails?.domain
                            }
                        >
                            <button className="bg-white flex border border-black items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                                Login to {appOneDetails?.name} <MdOpenInNew />{' '}
                            </button>
                        </Link>
                    </div>
                    <div className="flex  gap-2 items-center w-full justify-start">
                        <div className="flex md:h-28 items-center gap-4 px-5 py-3 bg-white w-full max-w-[400px] border border-black">
                            <Image
                                className="h-8 md:h-10 w-fit"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt="Slack"
                            />
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold">{appOneDetails?.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {appOneDetails?.category?.slice(0, 1).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container cont cont__gap  ">
                <div className="flex items-center gap-2 text-lg">
                    <Link href={createURL(`/integrations`)} className="flex items-center gap-0 underline">
                        Integrations{' '}
                    </Link>
                    <MdChevronRight fontSize={22} />
                    <Link
                        href={createURL(`/integrations/${appOneDetails?.appslugname}`)}
                        className="flex items-center gap-0 underline"
                    >
                        {appOneDetails?.name}
                    </Link>
                </div>
                <div className="cont cont__w gap-4">
                    <div className="cont">
                        <h1 className="h1">{`Your ${appOneDetails?.name} Access is Disconnected`}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    disconnecteData?.length > 0
                                        ? disconnecteData[0]?.description
                                        : `<p class="sub__h1">Your ${appOneDetails?.name}  access has been disconnected, which may disrupt your workflows. Reconnect now to restore seamless access.</p>
 `,
                            }}
                        ></div>
                        {}
                    </div>
                    <Link target="_blank" href={`${process.env.NEXT_PUBLIC_FLOW_URL}/connect/${appOneDetails?.rowid}`}>
                        <button className="btn btn-primary">
                            Reconnect {appOneDetails?.name} <MdOpenInNew />{' '}
                        </button>
                    </Link>
                </div>
            </div>
            {appOneDetails?.events && appOneDetails?.events?.length > 0 && (
                <div className="container cont gap-4">
                    <h2 className="h1">Actions and Triggers</h2>
                    <IntegrationsEventsComp appOneDetails={appOneDetails} />
                </div>
            )}
            {blogsData?.length > 0 && (
                <div className="container ">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}
            <div className="container ">
                <div className="cont  border border-black">
                    <div className="p-12">{faqData && <FAQSection faqData={faqData} />}</div>
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 border-black">
                        <div className="cont gap-4 p-12 border-r border-black w-full ">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About {appOneDetails?.name}</h3>
                            </div>
                            <p>{appOneDetails?.description}</p>
                            <Link
                                target="_blank"
                                href={
                                    appOneDetails?.domain.startsWith('http')
                                        ? appOneDetails?.domain
                                        : 'http://' + appOneDetails?.domain
                                }
                            >
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                        <div className="w-full cont gap-4 p-12">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={'/assets/brand/fav_ico.svg'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3>About viaSocket</h3>
                            </div>
                            <p>
                                viasocket is an innovative and versatile workflow automation platform designed to
                                streamline and simplify the integration of your favorite applications and to
                            </p>
                            <Link href={'/'}>
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}
