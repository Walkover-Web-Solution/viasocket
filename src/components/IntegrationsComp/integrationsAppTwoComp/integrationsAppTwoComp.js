import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import FAQSection from '@/components/faqSection/faqSection';
import { LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import createURL from '@/utils/createURL';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import GetStarted from '@/components/getStarted/getStarted';
import VideoGrid from '@/components/videoGrid/videoGrid';
import { handleRedirect } from '@/utils/handleRedirection';
import Navbar from '@/components/navbar/navbar';
import ExternalLink from '@/utils/ExternalLink';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { GoArrowSwitch } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexComp';
import generateIntegrationFAQ from './generateIntegrationFAQ';
import TemplateContainer from '../templateContainer/templateContainer';

function TriggerOrActionCard({
    title,
    appDetails,
    placeholder,
    list,
    isOpen,
    onToggle,
    onSelect,
    type,
    resetEvent
}) {

    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (resetEvent) {
            setSelectedEvent(null);
        }
    }, [resetEvent]);

    const filteredList = list?.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (event) => {
        setSelectedEvent(event);
        setSearch("");
        onSelect(event);
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="flex flex-col w-full md:w-1/2 gap-2 relative">
            <h2 className="text-sm font-semibold text-gray-500">{title}</h2>

            <div
                className="w-full border custom-border flex bg-white cursor-pointer relative"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
            >
                <div className="custom-border border-r flex items-center justify-center p-2">
                    <Image
                        src={appDetails?.iconurl || "https://placehold.co/36x36"}
                        width={100}
                        height={100}
                        alt={appDetails?.name || "App"}
                    />
                </div>

                <div className="w-full min-h-[64px] flex flex-col items-center justify-center text-center px-2 pr-10">
                    {selectedEvent ? (
                        <>
                            <p className="font-semibold text-gray-800 text-md">
                                {selectedEvent.name}
                            </p>
                            {selectedEvent.description && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {selectedEvent.description}
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-600 text-lg">
                            {title.includes("Trigger")
                                ? "When this happens..."
                                : "Automatically do this!"}
                        </p>
                    )}
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {isOpen ? (
                        <RiArrowDropUpLine size={36} />
                    ) : (
                        <RiArrowDropDownLine size={36} />
                    )}
                </div>
            </div>

            <div
                className={`absolute top-full left-0 mt-2 w-full border custom-border bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-20
                ${isOpen ? "opacity-100 visible max-h-72" : "opacity-0 invisible max-h-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b flex items-center gap-2 p-2 z-30">
                    <IoMdSearch className="text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="w-full outline-none text-sm p-1"
                    />
                </div>

                <ul className="divide-y overflow-y-auto max-h-60">
                    {filteredList?.length > 0 ? (
                        filteredList.map((event, index) => (
                            <li
                                key={index}
                                className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleSelect(event)}
                            >
                                <div className='flex flex-row items-center gap-2'>
                                    <div className="border flex items-center justify-center p-2">
                                        <Image
                                            src={appDetails?.iconurl || "https://placehold.co/36x36"}
                                            width={20}
                                            height={20}
                                            alt={appDetails?.name || "App"}
                                        />
                                    </div>
                                    <p className="text-lg">{event?.name}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-center">
                            <div className='flex flex-row items-center gap-2'>
                                <RequestIntegrationPopupOpener
                                    type={type}
                                    showType="dotted"
                                    appInfo={appDetails}
                                />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default function IntegrationsAppTwoComp({
    combosData,
    pageInfo,
    footerData,
    appOneDetails,
    appTwoDetails,
    blogsData,
    metaData,
    videoData,
    getDoFollowUrlStatusArray,
    navbarData,
}) {
    const router = useRouter();
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(false);
    const faqData = generateIntegrationFAQ(appOneDetails?.name, appTwoDetails?.name);

    const categorizeEvents = (events = []) => {
        const triggers = [];
        const actions = [];

        events.forEach((event) => {
            if (event?.type === 'trigger') triggers.push(event);
            else if (event?.type === 'action') actions.push(event);
        });

        return { triggers, actions };
    };

    const [currentAppOne, setCurrentAppOne] = useState(appOneDetails);
    const [currentAppTwo, setCurrentAppTwo] = useState(appTwoDetails);

    const [appOneEvents, setAppOneEvents] = useState(categorizeEvents(currentAppOne?.events));
    const [appTwoEvents, setAppTwoEvents] = useState(categorizeEvents(currentAppTwo?.events));

    useEffect(() => {
        const handleClickOutside = () => {
            if (openDropdown) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openDropdown]);

    const handleSwapApps = () => {
        const tempApp = currentAppOne;
        setCurrentAppOne(currentAppTwo);
        setCurrentAppTwo(tempApp);

        setSelectedTrigger(null);
        setSelectedAction(null);
        setResetTrigger(!resetTrigger);

        setAppOneEvents(categorizeEvents(currentAppTwo?.events));
        setAppTwoEvents(categorizeEvents(currentAppOne?.events));

        const newURL = `/integrations/${currentAppTwo?.appslugname}/${currentAppOne?.appslugname}`;
        router.push(newURL, undefined, { shallow: true });
    };

    return (
        <div
            style={{ borderLeftColor: appOneDetails?.brandcolor, borderLeftWidth: '10px' }}
            className="cont gap-12 md:gap-16 lg:gap-20"
        >
            <Navbar navbarData={navbarData} utm={'/integrations/apptwo'} />

            <IntegrationsHeadComp
                metaData={metaData}
                page={'/integrations/AppOne'}
                plugins={[appOneDetails, appTwoDetails]}
                type={'appTwo'}
                pageInfo={pageInfo}
            />
            <div className="cont -mt-10 global-top-space pt-12 gap-12 md:gap-16 lg:gap-20">
                <div className="container flex flex-wrap items-center text-base md:text-lg mt-1 text-gray-700">
                    <Link
                        href={createURL(`/integrations`)}
                        className="flex items-center gap-1 hover:text-accent transition-colors duration-200"
                    >
                        <span className="underline underline-offset-2">Integrations</span>
                    </Link>

                    <MdChevronRight className="mx-1 text-gray-400" fontSize={20} />

                    <Link
                        href={createURL(`/integrations/${appOneDetails?.appslugname}`)}
                        className="flex items-center gap-1 hover:text-accent transition-colors duration-200"
                    >
                        <span className="underline underline-offset-2">{appOneDetails?.name}</span>
                    </Link>

                    <MdChevronRight className="mx-1 text-gray-400" fontSize={20} />

                    <Link
                        href={createURL(`/integrations/${appTwoDetails?.appslugname}`)}
                        className="flex items-center gap-1 hover:text-accent transition-colors duration-200"
                    >
                        <span className="underline underline-offset-2">{appTwoDetails?.name}</span>
                    </Link>

                    <MdChevronRight className="mx-1 text-gray-400" fontSize={20} />

                    <div className="flex items-center gap-1">
                        <span>{appOneDetails?.name} + {appTwoDetails?.name}</span>
                    </div>

                </div>
                <div className="container">
                    <div className="cont flex justify-center items-center p-4 mt-8">
                        <h1 className="h1 items-center text-center md:w-2/3">
                            Connect <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                            <span className="text-accent">{appTwoDetails?.name}</span> to Build Intelligent Automations
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center px-4 my-12">
                        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl gap-4">
                            <TriggerOrActionCard
                                title="Choose a Trigger"
                                appDetails={currentAppOne}
                                placeholder="Search Triggers..."
                                list={appOneEvents.triggers}
                                isOpen={openDropdown === 'trigger'}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === 'trigger' ? null : 'trigger')
                                }
                                onSelect={(event) => setSelectedTrigger(event)}
                                type="trigger"
                                resetEvent={resetTrigger}
                            />

                            <div className="flex flex-col items-center justify-center py-4 md:py-0">
                                <button
                                    onClick={handleSwapApps}
                                    className="btn btn-outline px-4 py-2 flex items-center gap-2 md:hidden"
                                >
                                    Swap Apps
                                </button>
                                <div className="hidden md:flex items-center justify-center mt-6">
                                    <div className="w-16 border-t-2 border-dashed custom-border"></div>
                                    <button
                                        onClick={handleSwapApps}
                                        className="btn btn-outline rounded-full p-3 mx-4"
                                    >
                                        <GoArrowSwitch className='text-xl font-medium' />
                                    </button>
                                    <div className="w-16 border-t-2 border-dashed custom-border"></div>
                                </div>
                            </div>

                            <TriggerOrActionCard
                                title="Choose an Action"
                                appDetails={currentAppTwo}
                                placeholder="Search Actions..."
                                list={appTwoEvents.actions}
                                isOpen={openDropdown === 'action'}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === 'action' ? null : 'action')
                                }
                                onSelect={(event) => setSelectedAction(event)}
                                type="action"
                                resetEvent={resetTrigger}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={(e) => {
                                    if (selectedTrigger && selectedAction) {
                                        handleRedirect(
                                            e,
                                            `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${selectedTrigger.rowid}/action?events=${selectedAction.rowid}&integrations=${selectedTrigger.pluginrecordid},${selectedAction.pluginrecordid}&action&`
                                        );
                                    } else {
                                        handleRedirect(e, '/signup?', router);
                                    }
                                }}
                                className="btn btn-accent mt-10 px-8 py-3"
                            >
                                {selectedTrigger && selectedAction ? 'Connect these apps' : 'Get Started'}
                            </button>

                            {/* {!selectedTrigger || !selectedAction ? (
                                <p className="text-sm text-gray-500 mt-2">
                                    Select both trigger and action above, or get start to explore all integrations
                                </p>
                            ) : null} */}
                        </div>
                    </div>
                </div>
                <div className="dotted-background">
                    <div className="container py-8 flex flex-col gap-16">
                        {/* Combinations Section */}
                        {combosData?.combinations?.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                <h2 className="h2">Use the Built-in Integrations</h2>

                                <div
                                    className={`grid grid-cols-1 md:grid-cols-2 border-l custom-border ${combosData?.combinations?.length > 1 ? 'border-t' : ''
                                        }`}
                                >
                                    {combosData?.combinations
                                        ?.filter(
                                            (combo) =>
                                                combo?.description &&
                                                !/^(List|Get)\b/i.test(combo.description.trim())
                                        )
                                        ?.slice(0, visibleCombos)
                                        ?.map((combo, index) => {
                                            const isSingle = combosData?.combinations?.length === 1;
                                            const integrations =
                                                combosData?.plugins[combo?.trigger?.name]?.rowid +
                                                ',' +
                                                combosData?.plugins[combo?.actions[0]?.name]?.rowid;

                                            const triggerName = combosData?.plugins[
                                                combo?.trigger?.name
                                            ]?.events?.find(
                                                (event) => event?.rowid === combo?.trigger?.id
                                            )?.name;

                                            const actionName = combosData?.plugins[
                                                combo?.actions[0]?.name
                                            ]?.events?.find(
                                                (event) => event?.rowid === combo?.actions[0]?.id
                                            )?.name;

                                            return (
                                                <CombinationCardComp
                                                    key={index}
                                                    showTopBorder={isSingle}
                                                    trigger={{
                                                        name: triggerName,
                                                        iconurl:
                                                            combosData?.plugins[
                                                                combo?.trigger?.name
                                                            ]?.iconurl || 'https://placehold.co/40x40',
                                                    }}
                                                    action={{
                                                        name: actionName,
                                                        iconurl:
                                                            combosData?.plugins[
                                                                combo?.actions[0]?.name
                                                            ]?.iconurl || 'https://placehold.co/40x40',
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
                                        className="btn btn-outline border-t-0 border-2 border-gray-400"
                                    >
                                        Load More <MdKeyboardArrowDown fontSize={20} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {!appOneDetails?.events?.length &&
                                    !appTwoDetails?.events?.length && (
                                        <IntegrationsBetaComp appOneDetails={appOneDetails} />
                                    )}

                                {((!combosData?.combinations?.length && appOneDetails?.events?.length) ||
                                    (!combosData?.combinations?.length && appTwoDetails?.events?.length)) && (
                                        <div className="cont gap-6">
                                            <div className="cont gap-2">
                                                <h2 className="h2">
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
                            </>
                        )}

                        {/* Template Container */}
                        <TemplateContainer selectedApps={[currentAppOne, currentAppTwo]} />
                    </div>
                </div>
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
                <GetStarted />
            </div>

            {blogsData?.length > 0 && (
                <div className="container">
                    {' '}
                    <BlogGrid posts={blogsData} />
                </div>
            )}

            {videoData?.length > 0 && (
                <div className="container">
                    <VideoGrid videoData={videoData} />
                </div>
            )}


            <div className="container pb-4">
                <div className="cont">
                    {faqData && <FAQSection faqData={faqData} />}
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 custom-border bg-white">
                        <div className="cont gap-4 w-full p-6 md:p-12 border border-t-0 md:border-b-0  custom-border">
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
                                        <span className="btn btn-outline">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <ExternalLink
                                href={
                                    appOneDetails?.domain?.startsWith('http')
                                        ? appOneDetails?.domain
                                        : 'http://' + appOneDetails?.domain
                                }
                                appSlugName={appOneDetails?.appslugname}
                                doFollowArray={getDoFollowUrlStatusArray}
                            >
                                <LinkText children={'Learn More'} />
                            </ExternalLink>
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
                                        <span className="btn btn-outline">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <ExternalLink
                                href={
                                    appTwoDetails?.domain?.startsWith('http')
                                        ? appTwoDetails?.domain
                                        : 'http://' + appTwoDetails?.domain
                                }
                                appSlugName={appTwoDetails?.appslugname}
                                doFollowArray={getDoFollowUrlStatusArray}
                            >
                                <LinkText children={'Learn More'} />
                            </ExternalLink>
                        </div>
                    </div>

                    <Footer footerData={footerData} />
                </div>
            </div>
        </div>
    );
}
