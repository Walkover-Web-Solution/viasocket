import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useState, useCallback } from 'react';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import UseCaseList from '@/components/useCaseList/UseCaseList';
import GetStarted from '@/components/getStarted/getStarted';
import VideoGrid from '@/components/videoGrid/videoGrid';
import { handleRedirect } from '@/utils/handleRedirection';
import Navbar from '@/components/navbar/navbar';
import ExternalLink from '@/utils/ExternalLink';
import IntegrationSearchApps from '../integrationsAppComp/integrationSearchApps';

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
    useCaseData,
    videoData,
    appCount,
    getDoFollowUrlStatusArray,
    hasProd,
}) {
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState(null);
    const [debounceValue, setDebounceValue] = useState('');

    // Search callbacks - IntegrationSearchApps will handle all the logic
    const handleSearchResults = useCallback((results) => {
        setSearchedApps(results);
    }, []);

    const handleCategoriesResults = useCallback((categories) => {
        setSearchedCategories(categories);
    }, []);

    const handleDebounceValueChange = useCallback((value) => {
        setDebounceValue(value);
    }, []);

    return (
        <div
            style={{
                borderLeftColor: appOneDetails?.brandcolor,
                borderLeftWidth: '10px',
            }}
            className="cont gap-12 md:gap-16"
        >
            <Navbar footerData={footerData} utm={'/integrations/appone'} hasProd={hasProd} />

            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appOneDetails]}
                type={'appOne'}
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
            />
            <div className="container">
                <div className="flex items-center gap-2 text-base mb-2">
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
                <div className="flex justify-between gap-1 flex-wrap items-center">
                    <div className="flex md:h-28 items-center gap-4 px-5 py-3 bg-white max-w-auto border custom-border">
                        <Image
                            className="h-8 md:h-[72px] w-fit"
                            src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={36}
                            height={36}
                            alt={appOneDetails?.name}
                        />
                        <h2 className="text-4xl font-semibold">{appOneDetails?.name}</h2>
                    </div>
                    <button
                        onClick={(e) =>
                            handleRedirect(e, `https://flow.viasocket.com/connect/${appOneDetails?.rowid}?`)
                        }
                        className="btn btn-outline"
                        rel="nofollow"
                    >
                        Connect to {appOneDetails?.name} <MdOpenInNew />
                    </button>
                </div>
            </div>

            {/* Only show main heading if not showing beta component */}
            {(combosData?.combinations?.length > 0 || appOneDetails?.events.length > 0) && (
                <div className="container flex flex-col justify-center items-center gap-2">
                    <h1 className="h1 text-center">
                        Connect <span className="text-accent">{appOneDetails?.name}</span> integrations <br /> with your
                        favorite apps
                    </h1>
                    <p className="sub__h1 text-center">
                        Easily connect <span>{appOneDetails?.name}</span> with the apps you use every day. Build and
                        manage <span>{appOneDetails?.name}</span> automations <br /> to simplify work and streamline
                        communication. Pick from thousands of available <span>{appOneDetails?.name}</span> integrations{' '}
                        <br /> or customize new ones through our automation platform.
                    </p>
                </div>
            )}

            {combosData?.combinations?.length > 0 && (
                <div className="text-xl gap-4 justify-center flex-wrap flex items-center">
                    <Link href="https://viasocket.com/signup" target="_blank" className="btn btn-accent">
                        Build from scratch
                    </Link>
                    <Link href="https://tally.so/r/wzVdKZ" target="_blank" className="btn btn-outline">
                        Take help from human experts
                    </Link>
                </div>
            )}

            {appOneDetails?.events.length > 0 && (
                <div className="cont cont__gap container bg-[#FAF9F6] p-6 border custom-border">
                    <div className="container cont gap-10">
                        <h2 className="h2">{`Select Any App to connect with ${appOneDetails?.name}`}</h2>
                        <div className="flex items-center gap-4">
                            <Image
                                className="h-16 w-fit border bg-white p-2"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={20}
                                height={20}
                                alt={appOneDetails?.name}
                            />
                            <MdAdd fontSize={60} />
                            <IntegrationSearchApps
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onSearchResults={handleSearchResults}
                                onCategoriesResults={handleCategoriesResults}
                                onDebounceValueChange={handleDebounceValueChange}
                            />
                        </div>
                    </div>
                    <IntegrationsAppComp
                        pageInfo={pageInfo}
                        integrationsInfo={integrationsInfo}
                        apps={debounceValue ? searchedApps : apps}
                        appCategories={appOneDetails?.category}
                        appCount={appCount}
                        searchTerm={debounceValue}
                        searchedCategories={searchedCategories}
                    />
                </div>
            )}

            <div className="container cont cont__gap">
                {combosData?.combinations?.length > 0 && (
                    <>
                        <p className="h2">{`Ready to use ${appOneDetails?.name} automations`}</p>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2  border-l border-t custom-border">
                                {combosData?.combinations
                                    ?.filter(
                                        (combo) =>
                                            combo?.description && !/^(List|Get)\b/i.test(combo.description.trim())
                                    )
                                    ?.slice(0, visibleCombos)
                                    ?.map((combo, index) => {
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
                                                key={index}
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
                                                link={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions
                                                    ?.map((action) => action?.id)
                                                    .join(',')}&integrations=${integrations}&action&`}
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
                                    className="btn btn-outline border-t-0 flex ml-auto"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </>
                )}

                {!combosData?.combinations?.length > 0 && (
                    <>
                        {!appOneDetails?.events.length > 0 ? (
                            <IntegrationsBetaComp appOneDetails={appOneDetails} />
                        ) : (
                            <div className="cont gap-4">
                                <div className="cont gap-2">
                                    <h2 className="h2">Available Events and Actions</h2>
                                    <p className="sub__h1">
                                        {`Enable Integrations or automations with these events of ${appOneDetails?.name}`}
                                    </p>
                                </div>

                                <IntegrationsEventsComp appOneDetails={appOneDetails} />
                            </div>
                        )}
                    </>
                )}
            </div>

            {combosData?.combinations?.length > 0 && (
                <div className="container cont gap-8">
                    <div className="cont gap-2">
                        <h2 className="h2">
                            Triggers and Actions in <span className="text-accent">{appOneDetails?.name} </span>
                            Automations
                        </h2>
                        <p className="sub__h1">
                            viaSocket makes it simple to connect{appOneDetails?.name} integrations and automate
                            repetitive tasks.
                        </p>
                    </div>
                    <IntegrationsEventsComp appOneDetails={appOneDetails} />
                </div>
            )}

            {useCaseData?.length > 0 && <UseCaseList useCaseData={useCaseData} appname={appOneDetails.name} />}

            <div className="container">
                <GetStarted />
            </div>

            {videoData?.length > 0 && (
                <div className="container">
                    <VideoGrid videoData={videoData} />
                </div>
            )}

            {blogsData?.length > 0 && (
                <div className="container ">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}
            <div className="container pb-4 cont">
                {faqData && <FAQSection faqData={faqData} />}

                <div className="flex flex-col md:flex-row border border-x-0 border-b-0 custom-border bg-white">
                    <div className="cont gap-4 p-12 border-x custom-border w-full md:border-b-0 border-b">
                        <div>
                            <Image
                                className="h-10 w-fit border p-1"
                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={36}
                                height={36}
                                alt={appOneDetails?.name}
                            />
                            <h3 className="h3 font-bold pt-5">About {appOneDetails?.name}</h3>
                        </div>
                        <p className="text-sm sm:text-lg text-black h-full">{appOneDetails?.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {appOneDetails?.category?.slice(0, 2).map((cat, index) => (
                                <Link
                                    key={index}
                                    href={createURL(`/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                                    className="mb-2"
                                >
                                    <span className="btn btn-outline">{cat}</span>
                                </Link>
                            ))}
                        </div>
                        <ExternalLink
                            href={
                                appOneDetails?.domain.startsWith('http')
                                    ? appOneDetails?.domain
                                    : 'http://' + appOneDetails?.domain
                            }
                            appSlugName={appOneDetails?.appslugname}
                            doFollowArray={getDoFollowUrlStatusArray}
                        >
                            <LinkText children={'Learn More'} />
                        </ExternalLink>
                    </div>
                    <div className="w-full cont gap-4 p-12 border-x md:border-l-0 custom-border">
                        <div>
                            <Image
                                className="h-10 w-fit border p-1"
                                src={'/assets/brand/fav_ico.svg'}
                                width={36}
                                height={36}
                                alt="viaSocket"
                            />
                            <h3 className="h3 font-bold pt-5">About viaSocket</h3>
                        </div>
                        <p className="text-sm sm:text-lg text-black h-full">
                            viaSocket is an AI-powered, workflow automation platform that helps people and businesses
                            connect apps and automate repetitive tasks. With thousands of integrations, anyone can build
                            workflows to move data, cut manual work, and save time. Whether for simple tasks or
                            large-scale processes, viaSocket makes automation easy and helps teams focus on what matters
                            most.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/" className="mb-2">
                                <span className="btn btn-outline">Workflow Automation</span>
                            </Link>
                            <Link href="/integrations" className="mb-2">
                                <span className="btn btn-outline">Integration</span>
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
    );
}
