import Image from 'next/image';
import Link from 'next/link';
import { MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import { LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import { useEffect, useState } from 'react';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import GetStarted from '@/components/getStarted/getStarted';
import VideoGrid from '@/components/videoGrid/videoGrid';
import Navbar from '@/components/navbar/navbar';

export default function IntegrationsAppTwoComp({
    combosData,
    pageInfo,
    faqData,
    footerData,
    appOneDetails,
    appTwoDetails,
    blogsData,
    metaData,
    videoData,
}) {
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);

    return (
        <div
            style={{ borderLeftColor: appOneDetails?.brandcolor, borderLeftWidth: '10px' }}
            className="cont gap-12 md:gap-16 lg:gap-20"
        >
            <Navbar footerData={footerData} utm={'/integrations/apptwo'} />

            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appOneDetails, appTwoDetails]}
                type={'appTwo'}
                pageInfo={pageInfo}
            />

            <div className="container flex w-full flex-col md:flex-row ">
                <div className="flex md:h-28 items-center justify-center gap-4 px-5 py-3  border border-r-0 custom-border bg-white w-full max-w-[300px] min-w-fit">
                    <Image
                        className="h-8 md:h-10 w-fit"
                        src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                        width={36}
                        height={36}
                        alt={appOneDetails?.name}
                    />
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">{appOneDetails?.name}</h2>
                    </div>
                </div>
                <div className="flex md:h-28 items-center justify-center gap-4 px-5 py-3  border custom-border bg-white w-full max-w-[300px] min-w-fit">
                    <Image
                        className="h-8 md:h-10 w-fit"
                        src={appTwoDetails?.iconurl || 'https://placehold.co/40x40'}
                        width={36}
                        height={36}
                        alt={appTwoDetails?.name}
                    />
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">{appTwoDetails?.name}</h2>
                    </div>
                </div>
            </div>

            <div className="container cont cont__gap">
                <div className="flex flex-wrap items-center md:gap-2 gap-0 md:text-lg text-sm">
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
                    <MdChevronRight fontSize={22} />
                    <Link
                        href={createURL(`/integrations/${appTwoDetails?.appslugname}`)}
                        className="flex items-center gap-0 underline"
                    >
                        {appTwoDetails?.name}
                    </Link>
                </div>
                {combosData?.combinations?.length > 0 && (
                    <>
                        <div className="cont">
                            <h1 className="h1  ">
                                Create integrations between <span className="text-accent">{appOneDetails?.name}</span>{' '}
                                and <span className="text-accent">{appTwoDetails?.name}</span>
                            </h1>
                        </div>

                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t custom-border">
                                {combosData?.combinations?.slice(0, visibleCombos).map((combo, index) => {
                                    const integrations =
                                        combosData?.plugins[combo?.trigger?.name]?.rowid +
                                        ',' +
                                        combosData?.plugins[combo?.actions[0]?.name]?.rowid;
                                    const triggerName = combosData?.plugins[combo?.trigger?.name]?.events?.find(
                                        (event) => event?.rowid === combo?.trigger?.id
                                    )?.name;
                                    const actionName = combosData?.plugins[combo?.actions[0]?.name]?.events?.find(
                                        (event) => event?.rowid === combo?.actions[0]?.id
                                    )?.name;
                                    return (
                                        <CombinationCardComp
                                            trigger={{
                                                name: triggerName,
                                                iconurl:
                                                    combosData?.plugins[combo?.trigger?.name]?.iconurl ||
                                                    'https://placehold.co/40x40',
                                            }}
                                            action={{
                                                name: actionName,
                                                iconurl:
                                                    combosData?.plugins[combo?.actions[0]?.name]?.iconurl ||
                                                    'https://placehold.co/40x40',
                                            }}
                                            description={combo?.description}
                                            link={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions?.map((action) => action?.id).join(',')}&integrations=${integrations}&action&`}
                                        />
                                    );
                                })}
                            </div>
                            {showMore && (
                                <button
                                    onClick={() => {
                                        setVisibleCombos(visibleCombos + 8);
                                        if (combosData?.combinations?.length <= visibleCombos) {
                                            setShowMore(false);
                                        }
                                    }}
                                    className="btn btn-outline border-t-0 border-2 border-gray-400 "
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </>
                )}

                {!combosData?.combinations?.length > 0 &&
                    !appOneDetails?.events?.length > 0 &&
                    !appTwoDetails?.events?.length > 0 && (
                        <IntegrationsBetaComp appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} />
                    )}

                {((!combosData?.combinations?.length > 0 && appOneDetails?.events?.length > 0) ||
                    (!combosData?.combinations?.length > 0 && appTwoDetails?.events?.length > 0)) && (
                    <div className="cont gap-4">
                        <div className="cont cont__w gap-2">
                            <h2 className="h2  ">
                                Enable Integrations or automations with these events of{' '}
                                <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                                <span className="text-accent">{appTwoDetails?.name}</span>
                            </h2>
                            <p className="sub__h1">
                                {`Enable Integrations or automations with these events of ${appOneDetails?.name} and ${appTwoDetails?.name}`}
                            </p>
                        </div>

                        <IntegrationsEventsComp
                            combosData={combosData}
                            appOneDetails={appOneDetails}
                            appTwoDetails={appTwoDetails}
                        />
                    </div>
                )}
            </div>

            {combosData?.combinations?.length > 0 &&
                appOneDetails?.events?.length > 0 &&
                appTwoDetails?.events?.length > 0 && (
                    <div className="container cont gap-4">
                        <h2 className="h2">Actions and Triggers</h2>
                        <IntegrationsEventsComp appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} />
                    </div>
                )}

            
                <div className="container cont">
                    <GetStarted  />
                </div>
       

            {videoData?.length > 0 && (
                <div className="container">
                    <VideoGrid videoData={videoData} />
                </div>
            )}

            {blogsData?.length > 0 && (
                <div className="container">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}

            <div className="container pb-4">
                <div className="cont ">
                    {faqData && <FAQSection faqData={faqData} />}
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 custom-border bg-white">
                        <div className="cont gap-4 w-full p-12 border border-t-0 md:border-b-0  custom-border">
                            <div className="cont gap-2 ">
                                <Image
                                    className="h-10 w-fit"
                                    src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                    width={36}
                                    height={36}
                                    alt={appOneDetails?.name}
                                />
                                <h3 className="h3 font-bold pt-5">About {appOneDetails?.name}</h3>
                            </div>
                            <p className="text-sm sm:text-lg text-black h-full f">{appOneDetails?.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {appOneDetails?.category?.slice(0, 2).map((cat, index) => (
                                    <Link
                                        key={index}
                                        href={createURL(
                                            `/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
                                        )}
                                        className="mb-2"
                                    >
                                        <span className="px-3 text-sm py-2 hover:bg-accent bg-black text-white ">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href={
                                    appOneDetails?.domain?.startsWith('http')
                                        ? appOneDetails?.domain
                                        : 'http://' + appOneDetails?.domain
                                }
                            >
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                        <div className="cont w-full gap-4 p-12 border-x md:border-l-0 custom-border">
                            <div className="cont gap-2">
                                <Image
                                    className="h-10 w-fit"
                                    src={appTwoDetails?.iconurl || 'https://placehold.co/36x36'}
                                    width={36}
                                    height={36}
                                    alt={appTwoDetails?.name}
                                />
                                <h3 className="h3 font-bold pt-5">About {appTwoDetails?.name}</h3>
                            </div>
                            <p className="text-sm sm:text-lg text-black h-full ">{appTwoDetails?.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {appTwoDetails?.category?.slice(0, 2).map((cat, index) => (
                                    <Link
                                        key={index}
                                        href={createURL(
                                            `/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
                                        )}
                                        className="mb-2"
                                    >
                                        <span className="px-3 py-2 text-sm hover:bg-accent bg-black text-white">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href={
                                    appTwoDetails?.domain?.startsWith('http')
                                        ? appTwoDetails?.domain
                                        : 'http://' + appTwoDetails?.domain
                                }
                            >
                                <LinkText children={'Learn More'} />
                            </Link>
                        </div>
                    </div>

                    <Footer footerData={footerData} />
                </div>
            </div>
        </div>
    );
}
