import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdArrowOutward, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '@/components/IntegrationsComp/integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '@/components/IntegrationsComp/IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '@/components/IntegrationsComp/integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useEffect, useState } from 'react';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '@/components/IntegrationsComp/integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import UseCaseList from '@/components/useCaseList/UseCaseList';
import GetStarted from '@/components/getStarted/getStarted';
import { setUtmSource } from '@/utils/handleUtmSource';
import McpEventComp from '../mcpEventsComp/McpEventsComp';

export default function McpAppComp({
    appOneDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    faqData,
    footerData,
    blogsData,
    metaData,
    getStartedData,
}) {
    const utm = pageInfo?.url;

    const [defaultUtmSource, setDefaultUtmSource] = useState('');
    useEffect(() => {
        const utmData = setUtmSource(appOneDetails.appslugname);

        if (!utmData) {
            setDefaultUtmSource(`utm_source=${appOneDetails.appslugname}`);
            return;
        }

        try {
            const parsedUtm = JSON.parse(utmData);
            if (parsedUtm && typeof parsedUtm === 'object') {
                const queryString = new URLSearchParams(parsedUtm).toString();
                setDefaultUtmSource(queryString);
            }
        } catch (error) {
            console.error('Error parsing UTM data:', error);
            setDefaultUtmSource(`utm_source=${appOneDetails.appslugname}`);
        }
    }, []);

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
            <div className="flex flex-col gap-8">
                <div style={{ background: appOneDetails?.brandcolor }}>
                    <div className="container cont py-8 gap-4 flex items-center justify-between">
                        <div className="flex md:items-center w-full justify-end gap-2 md:gap-4 flex-col md:flex-row ">
                            <Link href={`https://flow.viasocket.com?${defaultUtmSource}`} rel="nofollow">
                                <button className="bg-white flex border border-black items-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all">
                                    Login to viaSocket <MdOpenInNew />{' '}
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
                                    <div className="flex flex-wrap gap-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_FLOW_URL}/connect/${appOneDetails?.rowid}?utm_source=${utm}`}
                    className="flex items-center gap-2 container hover:text-blue-600"
                    rel="nofollow"
                >
                    Connect to {appOneDetails?.name} <MdOpenInNew />
                </Link>
            </div>

            <div className="container cont cont__gap  ">
                <div className="flex items-center gap-2 text-lg">
                    <Link href={createURL(`/mcp`)} className="flex items-center gap-0 underline">
                        MCP{' '}
                    </Link>
                    <MdChevronRight fontSize={22} />
                    <Link
                        href={createURL(`/mcp/${appOneDetails?.appslugname}`)}
                        className="flex items-center gap-0 underline"
                    >
                        {appOneDetails?.name}
                    </Link>
                </div>
            </div>

            {combosData?.combinations?.length > 0 ? (
                <div className="container cont gap-4">
                    <h2 className="h1">Actions</h2>
                    <McpEventComp appOneDetails={appOneDetails} />
                </div>
            ) : (
                <div className="container">
                    <h2 className="h1">No Actions Available!</h2>
                </div>
            )}

            {getStartedData && (
                <div className="container border border-black p-20">
                    <GetStarted data={getStartedData} isHero={'false'} />
                </div>
            )}

            {blogsData?.length > 0 && (
                <div className="container ">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}
            <div className="container cont__py">
                <div className="cont">
                    <div className="p-12 border border-black border-b-0">
                        {faqData && <FAQSection faqData={faqData} />}
                    </div>
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 border-black">
                        <div className="cont gap-4 p-12 border-x border-black w-full md:border-b-0 border-b">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3 className="h2 font-bold pt-5">About {appOneDetails?.name}</h3>
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
                                        <span className="px-3 text-sm py-2 hover:bg-accent bg-black text-white">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="w-full cont gap-4 p-12 border-x md:border-l-0 border-black">
                            <div>
                                <Image
                                    className="h-10 w-fit"
                                    src={'/assets/brand/fav_ico.svg'}
                                    width={36}
                                    height={36}
                                    alt="Slack"
                                />
                                <h3 className="h2 font-bold pt-5">About viaSocket</h3>
                            </div>
                            <p className="text-sm sm:text-lg text-black h-full font-medium">
                                viasocket is an innovative and versatile workflow automation platform designed to
                                streamline and simplify the integration of your favorite applications and to
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/" className="mb-2">
                                    <span className="px-3 py-2 text-sm hover:bg-accent bg-black text-white">
                                        Workflow Automation
                                    </span>
                                </Link>
                                <Link href="/integrations" className="mb-2">
                                    <span className="px-3 py-2 text-sm hover:bg-accent bg-black text-white">
                                        Integration
                                    </span>
                                </Link>
                            </div>
                            <Link href={'/'}>
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                    </div>
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
}
