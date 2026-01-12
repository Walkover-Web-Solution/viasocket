import Image from 'next/image';
import Link from 'next/link';
import { MdAdd, MdKeyboardArrowDown, MdOpenInNew } from 'react-icons/md';
import IntegrationsAppComp from '../integrationsAppComp/integrationsAppComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/app/components/blog/BlogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useState, useCallback, useEffect } from 'react';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import UseCaseList from '@/components/useCaseList/UseCaseList';
import GetStarted from '@/components/getStarted/getStarted';
import VideoGrid from '@/components/videoGrid/videoGrid';
import { handleRedirect } from '@/utils/handleRedirection';
import ExternalLink from '@/utils/ExternalLink';
import IntegrationSearchApps from '../integrationsAppComp/integrationSearchApps';
import { APPERPAGE } from '@/const/integrations';
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import TemplateContainer from '../templateContainer/templateContainer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import NavbarOptimized from '@/app/components/navbar/NavbarOptimized';

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
    navbarData,
    templateToShow,
    skipHeadComp,
}) {
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState(null);
    const [debounceValue, setDebounceValue] = useState('');
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev === 1 ? 2 : 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const showNext = apps?.length > 0 && APPERPAGE <= apps?.length;

    const goToNext = () => {
        if (integrationsInfo?.appone) {
            const url = `/integrations/${integrationsInfo?.appone}/page/${Number(integrationsInfo?.page) + 1}`;
            return url;
        } else {
            if (integrationsInfo?.category && !integrationsInfo?.page) {
                const url = `${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
                return url;
            } else {
                const url = `${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
                return url;
            }
        }
    };

    const goToPrev = () => {
        if (integrationsInfo?.category && !integrationsInfo?.page) {
            const url = `/${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        } else {
            const url = `/${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        }
    };

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

    const filteredCombos = combosData?.combinations?.filter(
        (combo) => combo?.description && !/^(List|Get)\b/i.test(combo.description.trim())
    );

    const selectedCombos = filteredCombos?.length > 0 ? filteredCombos : combosData?.combinations;

    return (
        <div>
            <NavbarOptimized navbarData={navbarData} utm={'/integrations/appone'} />

            {!skipHeadComp && (
                <IntegrationsHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugins={[appOneDetails]}
                    type={'appOne'}
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                />
            )}
            <div className="bg-[#f4f3f1] flex flex-col gap-8 md:gap-16 global-top-space pt-12">
                <div className="container flex flex-col justify-between gap-12">
                    <div className="cont md:flex-row flex gap-4 justify-between text-base py-4">
                        <Breadcrumb parent="Integrations" child1={appOneDetails?.name} parentLink={`/integrations`} />

                        <div className="text-xl gap-4 flex-wrap flex items-center">
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

                    {(combosData?.combinations?.length > 0 || appOneDetails?.events.length > 0) && (
                        <div className="flex flex-col gap-12">
                            <div className=" flex flex-col gap-2">
                                <h1 className="h1">Integrate {appOneDetails?.name} with your favorite apps</h1>
                                <p className="sub__h1">
                                    Easily connect {appOneDetails?.name} with the apps you use every day. Pick from
                                    thousands of available {appOneDetails?.name} integrations or customize{' '}
                                    <br className="hidden xl:block" /> new ones through our automation platform.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container flex flex-col gap-8">
                    {appOneDetails?.events.length > 0 && (
                        <div
                            className="cont gap-10 pt-12 border custom-border"
                            style={{ backgroundColor: appOneDetails?.brandcolor }}
                        >
                            <div className="cont gap-10">
                                <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4 pl-4 sm:pl-6 pr-4 sm:pr-0">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            className="h-12 w-fit border bg-white p-1"
                                            src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                            width={20}
                                            height={20}
                                            alt={appOneDetails?.name}
                                        />
                                        <MdAdd fontSize={30} color="white" />
                                    </div>
                                    <IntegrationSearchApps
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        onSearchResults={handleSearchResults}
                                        onCategoriesResults={handleCategoriesResults}
                                        onDebounceValueChange={handleDebounceValueChange}
                                        app={appOneDetails}
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

                    {!searchTerm && (combosData?.combinations?.length > 0 || appOneDetails?.events?.length > 0) && (
                        <div className="flex justify-end items-end gap-2 w-full">
                            {integrationsInfo?.page > 0 && (
                                <Link className="btn btn-outline gap-1 !px-5" href={createURL(goToPrev())}>
                                    <GrFormPreviousLink size={20} /> Prev
                                </Link>
                            )}
                            {showNext && (
                                <Link className="btn btn-outline gap-1 !px-5" href={createURL(goToNext())}>
                                    Next <GrFormNextLink size={20} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <div className={`py-8 ${combosData?.combinations?.length > 0 && 'dotted-background'}`}>
                    <div className="container flex flex-col gap-16">
                        <div className="flex flex-col gap-8">
                            {combosData?.combinations?.length > 0 ? (
                                <>
                                    <p className="h2">{`Ready to use ${appOneDetails?.name} automations`}</p>
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t custom-border">
                                            {selectedCombos?.slice(0, visibleCombos)?.map((combo, index) => {
                                                const integrations =
                                                    combosData?.plugins[combo?.trigger?.name]?.rowid +
                                                    ',' +
                                                    combosData?.plugins[combo?.actions[0]?.name]?.rowid;

                                                const triggerName = combosData?.plugins[
                                                    combo?.trigger?.name
                                                ]?.events?.find((event) => event?.rowid === combo?.trigger?.id)?.name;

                                                const actionName = combosData?.plugins[
                                                    combo?.actions[0]?.name
                                                ]?.events?.find(
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
                                                className="btn btn-outline mt-2 flex ml-auto"
                                            >
                                                Load More <MdKeyboardArrowDown fontSize={20} />
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {!appOneDetails?.events.length ? (
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

                        {/* Template Container */}
                        <TemplateContainer
                            selectedApps={[appOneDetails]}
                            templateToShow={templateToShow}
                            requireAllApps={true}
                        />
                    </div>
                </div>

                <div className="container">
                    <div className="cont">
                        {combosData?.combinations?.length > 0 && (
                            <div className="cont gap-8">
                                <div className="cont gap-2">
                                    <h2 className="h2">Triggers and Actions in {appOneDetails?.name} Automations</h2>
                                    <p className="sub__h1">
                                        viaSocket makes it simple to connect {appOneDetails?.name} and automate
                                        repetitive tasks.
                                    </p>
                                </div>
                                <IntegrationsEventsComp appOneDetails={appOneDetails} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="container">
                    <div className="cont gap-8">
                        <div className="bg-white p-6 md:p-12 flex flex-col gap-10 border custom-border">
                            <div className="flex md:flex-row flex-col gap-8">
                                <div className="w-full md:w-3/5 cont gap-8 md:gap-20 justify-start">
                                    <h2 className="h2">How to get started with {appOneDetails?.name} automations</h2>
                                    <div className="cont gap-8 h-full">
                                        <div className="cont gap-2">
                                            <p className="font-semibold sub__h1">
                                                Automate when something happens in {appOneDetails?.name}
                                            </p>
                                            <p className="sub__h1">{`Login -> Create new flow -> Select trigger -> Search ${appOneDetails?.name} -> Choose the trigger from the list`}</p>
                                        </div>
                                        <div className="cont gap-2">
                                            <p className="font-semibold sub__h1">
                                                Take action in {appOneDetails?.name} when something happens in an app or
                                                you want to add step in flow
                                            </p>
                                            <p className="sub__h1">{`Login -> Create new flow -> Select action -> Search ${appOneDetails?.name} -> Choose the action from the list`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-2/5 flex justify-center items-center py-20 bg-gradient-to-r from-blue-100 to-purple-100">
                                    <div className="cont items-center">
                                        <div
                                            className={`border custom-border text-black p-4 w-52 h3 bg-white flex items-center justify-center gap-4 `}
                                        >
                                            <p>Trigger</p>
                                            <Image
                                                className={`bg-white border p-1 transition-opacity duration-500 ${
                                                    activeStep === 1 ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={appOneDetails?.name}
                                            />
                                        </div>
                                        <div className="border-r border-black bg-black h-12"></div>
                                        <div
                                            className={`border custom-border text-black p-4 w-52 h3 bg-white flex items-center justify-center gap-4 `}
                                        >
                                            <p>Action</p>
                                            <Image
                                                className={`bg-white border p-1 transition-opacity duration-500 ${
                                                    activeStep === 2 ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={appOneDetails?.name}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {useCaseData?.length > 0 && <UseCaseList useCaseData={useCaseData} appname={appOneDetails.name} />}
                </div>

                <div className="container">
                    <GetStarted />
                </div>

                {videoData?.length > 0 && <VideoGrid videoData={videoData} appOneName={appOneDetails?.name} />}

                {blogsData?.length > 0 && (
                    <div className="container ">
                        {' '}
                        <BlogGrid posts={blogsData} />
                    </div>
                )}

                {faqData && <FAQSection faqData={faqData} />}

                <div className="container pb-4 cont">
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
                                viaSocket is an AI-powered, workflow automation platform that helps people and
                                businesses connect apps and automate repetitive tasks. With thousands of integrations,
                                anyone can build workflows to move data, cut manual work, and save time. Whether for
                                simple tasks or large-scale processes, viaSocket makes automation easy and helps teams
                                focus on what matters most.
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
        </div>
    );
}
