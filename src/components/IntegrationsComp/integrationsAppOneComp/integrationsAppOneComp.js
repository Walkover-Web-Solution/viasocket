import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdArrowOutward, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useEffect, useState } from 'react';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';

export default function IntegrationsAppOneComp({
    appOneDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    apps,
    faqData,
    footerData,
    blogsData,
    metaData,
    integrations,
}) {
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const utm = pageInfo?.url;
    const [utmSource, setUtmSource] = useState('');
    useEffect(() => {
        const storedUtm = sessionStorage.getItem('utmData');

        if (storedUtm) {
            try {
                const parsedUtm = JSON.parse(storedUtm);

                if (parsedUtm && typeof parsedUtm === 'object') {
                    const queryString = new URLSearchParams(parsedUtm).toString();
                    setUtmSource(queryString);
                }
            } catch (error) {
                console.error('Error parsing UTM data:', error);
            }
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
                            <Link target="_blank" href={`https://flow.viasocket.com?${utmSource}`}>
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
                >
                    Connect to {appOneDetails?.name} <MdOpenInNew />
                </Link>
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
                {combosData?.combinations?.length > 0 && (
                    <>
                        <div className="cont cont__w ">
                            <h1 className="h1">{`Create integrations between ${appOneDetails?.name} and your favorite App`}</h1>
                            <p className="sub__h1">
                                {`  Create effective ${appOneDetails?.name} automations in minutes by using pre-made templates that are customized for your needs`}
                            </p>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 border-gray-400  md:grid-cols-2 border-b-0 border-r-0 border-2">
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
                                            link={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions?.map((action) => action?.id).join(',')}&integrations=${integrations}&action&utm_source=${utm}`}
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

                {!combosData?.combinations?.length > 0 && !appOneDetails?.events.length > 0 && (
                    <IntegrationsBetaComp appOneDetails={appOneDetails} />
                )}
                {!combosData?.combinations?.length > 0 && appOneDetails?.events.length > 0 && (
                    <div className="cont gap-4">
                        <div className="cont cont__w gap-2">
                            <h1 className="h1">
                                {`Create integrations between ${appOneDetails?.name} and your favorite App`}
                            </h1>
                            <p className="sub__h1">
                                {`Enable Integrations or automations with these events of ${appOneDetails?.name}`}
                            </p>
                        </div>

                        <IntegrationsEventsComp appOneDetails={appOneDetails} />
                    </div>
                )}
            </div>
            {appOneDetails?.events.length > 0 && (
                <div className="cont cont__gap ">
                    <div className="container cont gap-6">
                        <h2 className="h1">{`Connect Any App with ${appOneDetails?.name}`}</h2>
                        <div className="flex items-center gap-4 ">
                            <Image
                                className="h-10 w-fit"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt="Slack"
                            />
                            <h2 className="text-2xl font-bold">{appOneDetails?.name}</h2>
                        </div>
                        <MdAdd fontSize={36} />
                    </div>
                    <IntegrationsAppComp pageInfo={pageInfo} integrationsInfo={integrationsInfo} apps={apps} />
                </div>
            )}

            {combosData?.combinations?.length > 0 && (
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
