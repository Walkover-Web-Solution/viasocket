import Link from 'next/link';
import Image from 'next/image';
import { MdChevronLeft, MdChevronRight, MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
// import { APPERPAGE } from '@/const/integrations';
import { useEffect, useState } from 'react';
import searchApps from '@/utils/searchApps';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '@/components/IntegrationsComp/integrationsHeadComp/integrationsHeadComp';
import createURL from '@/utils/createURL';
import ErrorComp from '@/components/404/404Comp';
import FAQSection from '@/components/faqSection/faqSection';
import { FaBalanceScale, FaLayerGroup, FaNetworkWired, FaPlug, FaShieldAlt, FaTools } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

const APPERPAGE = 9;

export default function McpIndexComp({
    pageInfo,
    integrationsInfo,
    navData,
    footerData,
    apps,
    blogsData,
    categoryData,
    categories,
    mcpSteps,
    faqData,
    tableData,
    featuresData,
    keyPointData,
}) {
    if (!categoryData || Object.keys(categoryData).length === 0) {
        return <ErrorComp />;
    }
    console.log(keyPointData);
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const filterPriorityCategories = (cats) => {
        if (!Array.isArray(cats)) return [];
        return cats.sort((a, b) => {
            const priorityA = Number(a.priority) || Infinity;
            const priorityB = Number(b.priority) || Infinity;
            return priorityA - priorityB || a.name.localeCompare(b.name);
        });
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

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
            <IntegrationsHeadComp metaData={categoryData} integrationsInfo={integrationsInfo} pageInfo={pageInfo} />
            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="container cont">
                <div className="w-full flex flex-col md:flex-row justify-center pb-20 gap-4">
                    <div className="cont gap-4 justify-center w-full md:w-2/5">
                        <h1 className="h1 ">
                            Connect Your AI with<span className="text-accent"> 1,000+</span> MCPs
                        </h1>
                        <h2 className="sub__h1">
                            Easily connect your AI to thousands of apps with just a URL . No complex API integrations
                            required.
                        </h2>
                        <Link href="/signup">
                            <button className="btn btn-accent">Get Your MCP URL</button>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center relative w-full md:w-3/5 h-full min-h-[300px] mx-auto">
                        <Image src="/assets/img/mcpHero.svg" layout="fill" alt="Selected Embed Image" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center">
                    {keyPointData.map((point, index) => (
                        <div
                            key={index}
                            className={`font-semibold py-4 px-1 border-black w-full sm:w-1/2 lg:w-1/4 text-center flex items-center justify-center transition-transform transform hover:bg-black hover:text-white min-h-[80px]`}
                        >
                            <div className="flex gap-1 text-lg">
                                <p className="text-accent">✔ </p>
                                {point}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=""></div>
            <FeaturesGrid featuresData={featuresData} />

            <div className="container border border-black">
                <Table data={tableData} />
            </div>

            <div className="container cont cont__py gap-20 px-24  h-fit border  bg-black text-white">
                <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto">
                    <h2 className="h1">Ready, Set, MCP in 3 Simple Steps</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                    {mcpSteps.map((step, index) => (
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

            <div className="container cont">
                <div className="w-full py-4">
                    <h1 className="h1">
                        Let your<span className="text-accent"> AI</span> tap into thousands of Apps
                    </h1>
                </div>
                <div className="flex items-center gap-4 max-w-[800px] w-full mb-6">
                    <label className="input border flex-grow border-black flex items-center gap-2 focus-within:outline-none h-[42px]">
                        <MdSearch fontSize={20} />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className="grow py-2 px-3 h-full"
                            placeholder="Search your favorite tools"
                        />
                    </label>
                    {/* <div className="relative h-[42px]">
                        <select
                            className="border border-black py-2 px-4 appearance-none bg-white cursor-pointer pr-10 h-full"
                            onChange={(e) => {
                                setIsLoading(true);
                                window.location.href = createURL(`/mcp/category/${e.target.value}`);
                            }}
                            value={integrationsInfo?.category || 'all'}
                        >
                            <option value="all">All Categories</option>
                            {filterPriorityCategories(categories)?.map((category, index) => {
                                if (!category?.hidden && category?.slug && category?.slug !== 'all') {
                                    return (
                                        <option key={index} value={category?.slug}>
                                            {category?.name}
                                        </option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <MdKeyboardArrowDown size={20} />
                        </div>
                    </div> */}
                </div>
                {isLoading ? (
                    <AppGridSkeleton />
                ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-black border border-r-0 border-b-0 ">
                        {debounceValue ? (
                            searchedApps?.length > 0 ? (
                                searchedApps?.map((app, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={createURL(`/mcp/${app?.appslugname}`)}
                                            className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 border-black border border-l-0 border-t-0 gap-2 bg-[#FAFAFA] hover:text-white hover:bg-black"
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
                                <span className="p-8 text-3xl w-full col-span-3 border border-black border-l-0 border-t-0">
                                    No Apps found for Searched name{' '}
                                </span>
                            )
                        ) : (
                            apps?.map((app, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={createURL(`/mcp/${app?.appslugname}`)}
                                        className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 border-black border border-l-0 border-t-0 gap-2 bg-[#FAFAFA] hover:text-white hover:bg-black"
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
                        )}
                    </div>
                )}
                {!debounceValue && (
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

            <div className="container cont gap-20 bg-black text-white py-20 px-12">
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
                        <Link href="/signup">
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
                            <Link href="/signup">
                                <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-white hover:text-black border-none group w-48 active:scale-95 transition-transform duration-75">
                                    <span className="block group-hover:hidden">Cloud MCP</span>
                                    <span className="hidden group-hover:block">signup</span>
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

            {/* <div className="container cont py-20 px-8 bg-black text-white">
                <div>
                    <h1 className="h1">See Your LLMs in Action with viaSocket MCP Servers</h1>
                    <h2 className="sub__h1">With just instant connections, your LLM can take real-world actions.</h2>
                </div>
            </div> */}

            <div className="container">
                <BlogGrid posts={blogsData} />
            </div>

            <div className="pb-4">
                {faqData?.length > 0 && (
                    <div className="container border border-black p-20 border-b-0">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
}

const FeaturesGrid = ({ featuresData }) => {
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'network':
                return <FaNetworkWired size={36} />;
            case 'scale':
                return <FaBalanceScale size={36} />;
            case 'shield':
                return <FaShieldAlt size={36} />;
            case 'layers':
                return <FaLayerGroup size={36} />;
            case 'plug':
                return <FaPlug size={48} />;
            case 'tools':
                return <FaTools size={48} />;
            default:
                return <FaNetworkWired size={36} />;
        }
    };
    return (
        <div className="container p-12 py-20 bg-black text-white">
            <div className="mb-20">
                <div className="flex gap-4">
                    <h1 className="h1 mb-4">Don't just chat, Put your AI to work</h1>
                    <BsStars size={42} />
                </div>
                <h2 className="sub__h1 text-gray-300 max-w-[800px]">
                    viaSocket MCP lets your AI connect to 1,000+ apps with no complex APIs needed. Your AI can now send
                    messages, manage data, schedule events, and update records, turning it from a chat tool into a real
                    action taker.
                </h2>
            </div>

            {/* <div className="flex justify-center items-center"> */}
            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-12">
                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-white cont max-w-[500px] mx-auto md:mx-0  lg:py-12 py-8 px-8 transition-transform duration-300 hover:scale-105"
                    >
                        <div className="text-accent mb-4">{getIconComponent(feature.iconName)}</div>
                        <h2 className="h2 font-bold mb-3">{feature.heading}</h2>
                        <p className="sub__h2 text-gray-300">{feature.content}</p>
                    </div>
                ))}
            </div>
            {/* </div> */}
        </div>
    );
};

const Table = ({ data }) => {
    return (
        <div className=" w-full h-full cont gap-12  bg-white py-8 px-0 lg:px-20">
            <div className="flex flex-col gap-0">
                <h1 className="h1 ">MCP vs Traditional APIs :</h1>
                <h1 className="h1">The Paradigm Shift</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-black">
                    <thead className="p-4 bg-accent text-white">
                        <tr>
                            <th className="p-4 text-left text-xl w-1/3">Aspects</th>
                            <th className="p-4 text-left text-xl w-1/3">Traditonal APIs</th>
                            <th className="p-4 text-left text-xl  w-1/3">MCP (viaSocket MCP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((conntent, index) => (
                            <tr key={index} className=" hover:bg-gray-200">
                                <td className="p-4 text-lg font-semibold ">{conntent?.aspects}</td>
                                <td className="p-4 text-lg ">{conntent?.api}</td>
                                <td className="p-4 text-lg ">{conntent?.mcp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AppGridSkeleton = () => {
    const skeletonCards = Array(9).fill(null);

    return (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-black border border-r-0 border-b-0">
            {skeletonCards.map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 border-black border border-l-0 border-t-0 gap-2 bg-[#FAFAFA]"
                >
                    <div className="flex items-center gap-2">
                        {/* Better icon placeholder with a subtle icon-like shape */}
                        <div className="border flex items-center justify-center w-9 h-9 bg-white overflow-hidden">
                            <div className="relative w-5 h-5 bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                        {/* App name placeholder */}
                        <div className="h-5 w-24 bg-gray-200 relative overflow-hidden">
                            {/* Custom ripple effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                    {/* Description placeholder with multiple lines */}
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-full bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-3 w-full bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                        <div className="h-3 w-2/3 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
