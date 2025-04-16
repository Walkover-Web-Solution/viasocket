import Image from 'next/image';
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight, MdOpenInNew, MdSearch } from 'react-icons/md';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '@/components/IntegrationsComp/integrationsHeadComp/integrationsHeadComp';
import { LinkText } from '@/components/uiComponents/buttons';
import { useEffect, useState } from 'react';
import createURL from '@/utils/createURL';
import { setUtmSource } from '@/utils/handleUtmSource';
import McpEventComp from '../mcpEventsComp/McpEventsComp';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import searchApps from '@/utils/searchApps';
import { IoPersonOutline } from 'react-icons/io5';
import { VscSend } from 'react-icons/vsc';

const APPERPAGE = 9;

export default function McpAppComp({
    appOneDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    faqData,
    footerData,
    blogsData,
    metaData,
    apps,
    mcpAppSteps,
    mcpPromptData,
    mcpAIIntegrationData,
}) {
    const utm = pageInfo?.url;
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
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

    useEffect(() => {
        const search = async () => {
            if (!debounceValue) {
                setSearchedApps([]);
                return;
            }

            const searchTerm = debounceValue.toLowerCase();

            const fetchedApps = await searchApps(debounceValue);
            if (!fetchedApps) {
                setSearchedApps([]);
                return;
            }

            const sortedApps = fetchedApps.sort((a, b) => {
                const aName = a?.name?.toLowerCase() || '';
                const bName = b?.name?.toLowerCase() || '';

                const aStarts = aName.startsWith(searchTerm);
                const bStarts = bName.startsWith(searchTerm);

                if (aStarts !== bStarts) return aStarts ? -1 : 1;

                const aContains = aName.includes(searchTerm);
                const bContains = bName.includes(searchTerm);

                if (aContains !== bContains) return aContains ? -1 : 1;

                return aName.localeCompare(bName);
            });

            setSearchedApps(sortedApps);
        };

        search();
    }, [debounceValue]);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const showNext = apps?.length > 0 && APPERPAGE <= apps?.length;

    const goToNext = () => {
        const url = `/mcp/${integrationsInfo?.category ? 'category/' + integrationsInfo?.category : ''}/page/${Number(integrationsInfo?.page) + 1}`;
        return url;
    };

    const goToPrev = () => {
        if (integrationsInfo?.category && !integrationsInfo?.page) {
            const url = `${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        } else {
            const url = `${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
            return url;
        }
    };

    return (
        <div className="bg-black text-white cont md:gap-24 sm:gap-16 gap-12">
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
                                <button className="bg-black flex border border-white items-center gap-2 px-5 py-3 hover:bg-white hover:text-black transition-all">
                                    Login to viaSocket <MdOpenInNew />{' '}
                                </button>
                            </Link>
                        </div>
                        <div className="flex  gap-2 items-center w-full justify-start">
                            <div className="flex md:h-28 items-center gap-4 px-5 py-3 bg-black w-full max-w-[400px] border border-black">
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
                <div className="w-full flex justify-start items-start text-start">
                    <div className="container">
                        <Link
                            target="_blank"
                            href={`${process.env.NEXT_PUBLIC_FLOW_URL}/connect/${appOneDetails?.rowid}?utm_source=${utm}`}
                            className="flex items-center gap-2 hover:text-blue-600 w-fit"
                            rel="nofollow"
                        >
                            Connect to {appOneDetails?.name} <MdOpenInNew />
                        </Link>
                    </div>
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
            </div>

            <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 text-black">
                <div className="cont cont__py justify-center gap-12 w-full lg:w-1/2">
                    <div className="flex flex-col justify-center">
                        <h2 className="h1 text-white">Connect {appOneDetails?.name} MCP with any AI assistant</h2>
                        <p className="sub__h1 text-white">
                            Connect {appOneDetails?.name} actions with AI tools like ChatGPT, Claude, and Cursor using
                            the viaSocket MCP Server.
                        </p>
                    </div>
                    <Link href={`/signup?utm_source=mcp/${appOneDetails?.appslugname}`}>
                        <button className="btn border-0 bg-accent text-white hover:bg-white hover:text-black">
                            Get the URL
                        </button>
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 py-0 lg:py-12 px-0 sm:px-20 lg:px-0 xl:px-20">
                    <div className="border bg-white shadow-lg h-full cont gap-4 md:gap-12 py-2 md:py-8 px-2 sm:px-12">
                        <div className="flex gap-4">
                            <Image src="/assets/brand/smileyLogo.svg" width={50} height={50} className="pb-4" />
                            <div className="cont justify-between gap-2">
                                <h2 className="text-2xl font-semibold">viaSocket Agent</h2>
                                <h3 className="text-xl text-gray-500">What can I help you with?</h3>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-gray-300 p-2 h-fit">
                                <IoPersonOutline size={40} />
                            </div>
                            <div className="cont justify-between gap-2">
                                <h2 className="text-2xl font-semibold">You</h2>
                                <h3 className="text-xl text-gray-500">
                                    {mcpPromptData[0]?.prompt ||
                                        `I want to perform an action in ${appOneDetails?.name}`}
                                </h3>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <Image src="/assets/brand/smileyLogo.svg" width={50} height={50} className="pb-4" />
                            </div>
                            <div className="cont justify-between gap-2">
                                <h2 className="text-2xl font-semibold">viaSocket Agent</h2>
                                <div className="cont gap-1">
                                    <h3 className="text-xl">MCP Tool Calling...</h3>
                                    <div className="border border-black bg-gray-200 px-4 py-2 shadow-md cont gap-2">
                                        <div className="flex gap-4 items-center">
                                            <Image src={appOneDetails.iconurl} width={40} height={40} />
                                            <h2 className="text-xl text-gray-500">Action in Progress...</h2>
                                        </div>
                                        {mcpPromptData[0]?.action && (
                                            <p className="text-xl">{mcpPromptData[0]?.action}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-black px-8 py-4 flex justify-between">
                            <p className="text-gray-300 text-xl">Message your agent</p>
                            <VscSend size={30} />
                        </div>
                    </div>
                </div>
            </div>

            {combosData?.combinations?.length > 0 && (
                <div className="container cont gap-4">
                    <div className="flex items-baseline  gap-2">
                        <h2 className="h1">Supported Actions</h2>
                        <IoMdCheckmarkCircleOutline fontSize={36} />
                    </div>
                    <McpEventComp appOneDetails={appOneDetails} />
                </div>
            )}

            <div className="container cont cont__py gap-20 px-24  h-fit border  bg-black text-white">
                <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto">
                    <h2 className="h1 text-center">
                        Connect {appOneDetails?.name} to Any AI Assistant in 3 Easy Steps
                    </h2>
                    <h3 className="sub__h1 text-center">
                        viaSocket MCP Server lets you easily connect {appOneDetails?.name} actions with AI tools like
                        ChatGPT, Claude, and Cursor, all with built-in authentication. No need to manage integrations or
                        deal with a bulky setup.
                    </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                    {mcpAppSteps.map((step, index) => (
                        <div
                            key={index}
                            className="max-w-[400px] lg:py-20 py-8 px-8 border-2 border-gray-200 flex flex-col gap-2 transition-transform transform hover:scale-110"
                        >
                            <p className="text-accent text-2xl font-semibold">{`Step ${index + 1}`}</p>
                            <h3 className="h2 font-bold">{step.title}</h3>
                            <p className="sub__h2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container cont gap-20 py-20 px-12 border border-white">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[900px] text-center">Start getting work done with viaSocket MCP today</h2>
                    <p className="sub__h1 max-w-[1000px]">
                        Break free from isolation-connect your AI to real-world data for smarter, more impactful
                        results.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 text-white">
                    <div className="w-full md:w-1/2 py-20 px-8  flex flex-col justify-between gap-6 border border-white">
                        <div className="cont gap-4">
                            <h2 className="text-4xl font-bold">Free for Lifetime</h2>
                            <h3 className="text-xl">
                                viaSocket MCP is free to use for lifetime under a{' '}
                                <span className="underline font-semibold">
                                    <Link href="https://viasocket.com/faq/viaSocket-MCP/Fair-Usage-Policy">
                                        {' '}
                                        fair usage policy
                                    </Link>{' '}
                                </span>{' '}
                                without rate limits
                            </h3>
                        </div>
                        <Link href="/signup?utm_source=mcp">
                            <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-white hover:text-black border-none group active:scale-95 transition-transform duration-75">
                                Get Your MCP URL for Free
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 py-20 px-8 cont justify-between gap-6 border border-white">
                        <div className="cont gap-4">
                            <h2 className="text-4xl font-bold">For Enterprises</h2>
                            <h3 className="text-xl">
                                viaSocket MCP for Enterprises empowers AI models to securely connect to thousands of
                                apps in minutes
                            </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
                            <Link href="/signup?utm_source=mcp">
                                <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-white hover:text-black border-none group w-48 active:scale-95 transition-transform duration-75">
                                    <span className="block group-hover:hidden">Cloud MCP</span>
                                    <span className="hidden group-hover:block">Sign Up</span>
                                </button>
                            </Link>
                            <Link href="/support">
                                <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-white hover:text-black border-none group w-48 active:scale-95 transition-transform duration-75">
                                    <span className="block group-hover:hidden">Self-Hosted MCP</span>
                                    <span className="hidden group-hover:block">Contact Sales</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cont gap-12">
                <div>
                    <h1 className="h1">AI-to-App Integration Made Easy with viaSocket MCP</h1>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-center items-center pb-20 gap-4">
                    <Image
                        src="/assets/brand/mcpAiIntegration.svg"
                        alt="Selected Embed Image"
                        width={600}
                        height={600}
                        className="border border-white"
                    />
                    {/* </div> */}
                    <div className="cont gap-4 justify-center w-full lg:w-1/2">
                        {mcpAIIntegrationData.map((steps, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-2xl text-green-600">✔ </span>
                                <p className="text-2xl">{steps}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container cont cont__py border border-white bg-black text-white  justify-center items-center text-center gap-12">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[1200px]">Discover More About viaSocket MCP</h2>
                    <p className="sub__h1 max-w-[1000px]">
                        Check out our easy-to-follow documentation and start exploring all the cool things you can do
                        with viaSocket MCP.
                    </p>
                </div>
                <Link href="https://viasocket.com/blog/how-viasocket-works-a-complete-guide">
                    <button className="btn bg-accent text-white hover:bg-white hover:text-black border-none">
                        Explore The Documentation
                    </button>
                </Link>
            </div>

            <div className="container cont gap-4 mt-12">
                <div className="flex items-baseline gap-2 mb-6">
                    <h2 className="h1">Explore other apps that work with viaSocket MCP</h2>
                </div>

                <div className="flex items-center max-w-[800px] w-full ">
                    <label className="input border flex-grow border-black flex items-center gap-2 focus-within:outline-none">
                        <MdSearch fontSize={20} color="black" />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className="grow py-2 px-3 text-black"
                            placeholder="Search compatible apps"
                        />
                    </label>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-white border border-r-0 border-b-0 ">
                    {debounceValue ? (
                        searchedApps?.length > 0 ? (
                            searchedApps?.map((app, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={createURL(`/integrations/${app?.appslugname}`)}
                                        className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 border-white border border-l-0 border-t-0 gap-2 bg-black hover:text-black hover:bg-whte"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                                <Image
                                                    src={app?.iconurl || 'https://placehold.co/36x36'}
                                                    width={36}
                                                    height={36}
                                                    alt={app?.name}
                                                    className="h-5 w-fit"
                                                />
                                            </div>
                                            <h2 className="font-bold">{app?.name}</h2>
                                        </div>
                                        <p className="overflow-hidden text-sm line-clamp-3 after:content-['...']">
                                            {app?.description}
                                        </p>
                                    </Link>
                                );
                            })
                        ) : (
                            <span className="p-8 text-3xl w-full col-span-3 border border-white border-l-0 border-t-0">
                                No Apps found for Searched name{' '}
                            </span>
                        )
                    ) : (
                        apps?.map((app, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={createURL(`/integrations/${app?.appslugname}`)}
                                    className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 border-white border border-l-0 border-t-0 gap-2 bg-black hover:text-black hover:bg-white"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="border flex items-center justify-center w-9 h-9 bg-black">
                                            <Image
                                                src={app?.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={app?.name}
                                                className="h-5 w-fit"
                                            />
                                        </div>
                                        <h2 className="font-bold">{app?.name}</h2>
                                    </div>
                                    <p className="overflow-hidden text-sm line-clamp-3 after:content-['...']">
                                        {app?.description}
                                    </p>
                                </Link>
                            );
                        })
                    )}
                </div>

                {!debounceValue && apps?.length > 0 && (
                    <div className="flex justify-end items-center w-full py-4">
                        <div className="flex gap-4">
                            {integrationsInfo?.page > 0 && (
                                <Link
                                    className="border border-white px-6 py-2 flex items-center gap-2 hover:bg-white hover:text-black transition-colors font-medium"
                                    href={createURL(goToPrev())}
                                >
                                    <MdChevronLeft size={18} />
                                    Prev
                                </Link>
                            )}
                            {showNext && (
                                <Link
                                    className="border border-white px-6 py-2 flex items-center gap-2 hover:bg-white hover:text-black transition-colors font-medium"
                                    href={createURL(goToNext())}
                                >
                                    Next
                                    <MdChevronRight size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {blogsData?.length > 0 && (
                <div className="container">
                    {' '}
                    <BlogGrid posts={blogsData} isBlack={true} />
                </div>
            )}
            <div className="container cont__py">
                <div className="cont">
                    <div className="p-12 border border-white border-b-0">
                        {faqData && <FAQSection faqData={faqData} isBlack={true} />}
                    </div>
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 border-white">
                        <div className="cont gap-4 p-12 border-x border-white w-full md:border-b-0 border-b">
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
                            <p className="text-sm sm:text-lg text-white h-full">{appOneDetails?.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {appOneDetails?.category?.slice(0, 2).map((cat, index) => (
                                    <Link
                                        key={index}
                                        href={createURL(
                                            `/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`
                                        )}
                                        className="mb-2"
                                    >
                                        <span className="px-3 text-sm py-2 hover:bg-white hover:text-black bg-accent text-white">
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="w-full cont gap-4 p-12 border-x md:border-l-0 border-white">
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
                            <p className="text-sm sm:text-lg text-whte h-full font-medium">
                                viaSocket MCP (Model Context Protocol) lets AI connect with thousands of apps through
                                viaSocket's platform, enabling seamless communication, data exchange, and enhanced
                                automation.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/mcp" className="mb-2">
                                    <span className="px-3 py-2 text-sm hover:bg-white hover:text-black bg-accent text-white">
                                        viaSocket MCP
                                    </span>
                                </Link>
                                <Link href="/integrations" className="mb-2">
                                    <span className="px-3 py-2 text-sm hover:bg-white hover:text-black bg-accent text-white">
                                        Integration
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer footerData={footerData} isBlack={true} />
                </div>
            </div>
        </div>
    );
}
