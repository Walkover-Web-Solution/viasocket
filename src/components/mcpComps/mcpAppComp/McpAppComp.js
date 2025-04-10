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
import searchApps from '@/utils/searchApps'; // Added import

const APPERPAGE = 16;

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

    // Search effect

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

            <div className="container cont cont__py justify-center items-center text-center gap-12 ">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[1200px]">Connect {appOneDetails?.name} MCP with any AI assistant</h2>
                    <p className="sub__h1 max-w-[1000px]">
                        viaSocket {appOneDetails?.name} MCP connects {appOneDetails?.name} actions with AI tools like
                        ChatGPT, Claude, and Cursor, without the need for complex integrations or coding.
                    </p>
                </div>
                <Link href={`/signup?utm_source=mcp/${appOneDetails?.appslugname}`}>
                    <button className="btn btn-accent">Get Started</button>
                </Link>
            </div>

            {combosData?.combinations?.length > 0 && (
                <div className="container cont gap-4">
                    <div className="flex items-baseline  gap-2">
                        <h2 className="h1">Actions</h2>
                        <IoMdCheckmarkCircleOutline fontSize={36} />
                    </div>
                    <McpEventComp appOneDetails={appOneDetails} />
                </div>
            )}

            <div className="container cont gap-4 mt-12">
                <div className="flex items-baseline gap-2 mb-6">
                    <h2 className="h1">All Compatible Apps</h2>
                </div>

                <div className="flex items-center max-w-[800px] w-full ">
                    <label className="input border flex-grow border-black flex items-center gap-2 focus-within:outline-none">
                        <MdSearch fontSize={20} />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className="grow py-2 px-3"
                            placeholder="Search compatible apps"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                    {debounceValue ? (
                        searchedApps?.length > 0 ? (
                            searchedApps?.map((app, index) => (
                                <Link
                                    key={index}
                                    href={createURL(`/mcp/${app?.appslugname}`)}
                                    className="group border border-black p-4 hover:bg-black transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                            <Image
                                                src={app?.iconurl || 'https://placehold.co/36x36'}
                                                width={36}
                                                height={36}
                                                alt={app?.name}
                                                className="h-5 w-fit"
                                            />
                                        </div>
                                        <h2 className="font-bold group-hover:text-white">{app?.name}</h2>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-3 group-hover:text-white">
                                        {app?.description}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <span className="p-8 text-xl col-span-4 border border-black text-center">
                                No apps found for searched term
                            </span>
                        )
                    ) : (
                        apps?.map((app, index) => (
                            <Link
                                key={index}
                                href={createURL(`/mcp/${app?.appslugname}`)}
                                className="group border border-black p-4 hover:bg-black transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="border flex items-center justify-center w-9 h-9 bg-white">
                                        <Image
                                            src={app?.iconurl || 'https://placehold.co/36x36'}
                                            width={36}
                                            height={36}
                                            alt={app?.name}
                                            className="h-5 w-fit"
                                        />
                                    </div>
                                    <h2 className="font-bold group-hover:text-white">{app?.name}</h2>
                                </div>
                                <p className="text-sm text-gray-700 line-clamp-3 group-hover:text-white">
                                    {app?.description}
                                </p>
                            </Link>
                        ))
                    )}
                </div>

                {!debounceValue && apps?.length > 0 && (
                    <div className="flex justify-end items-center w-full py-4">
                        <div className="flex gap-4">
                            {integrationsInfo?.page > 0 && (
                                <Link
                                    className="border border-black px-6 py-2 flex items-center gap-2 hover:bg-black hover:text-white transition-colors font-medium"
                                    href={createURL(goToPrev())}
                                >
                                    <MdChevronLeft size={18} />
                                    Prev
                                </Link>
                            )}
                            {showNext && (
                                <Link
                                    className="border border-black px-6 py-2 flex items-center gap-2 hover:bg-black hover:text-white transition-colors font-medium"
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
