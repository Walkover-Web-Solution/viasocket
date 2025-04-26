import Link from 'next/link';
import Image from 'next/image';
import { MdChevronLeft, MdChevronRight, MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { useEffect, useState } from 'react';
import searchApps from '@/utils/searchApps';
import BlogGrid from '@/components/blogGrid/blogGrid';
import createURL from '@/utils/createURL';
import ErrorComp from '@/components/404/404Comp';
import FAQSection from '@/components/faqSection/faqSection';
import { FaBalanceScale, FaLayerGroup, FaNetworkWired, FaPlug, FaShieldAlt, FaTools } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { setUtmInCookies, setUtmSource } from '@/utils/handleUtmSource';
import { useRouter } from 'next/router';
import style from './McpIndexComp.module.scss';
import { APPERPAGE } from '@/const/integrations';


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
    metaData,
    appOneDetails
}) {
    if (!categoryData || Object.keys(categoryData).length === 0) {
        return <ErrorComp />;
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [defaultUtmSource, setDefaultUtmSource] = useState('');
    const [searchedCategoies, setSearchedCategoies] = useState([]);

    useEffect(() => {
        const utmData = setUtmSource({ source: `mcp` });
        setDefaultUtmSource(utmData);
    }, []);

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

    {
        const router = useRouter(); // Get current route
        const currentRoute = router.pathname;

        console.log('Current route:', currentRoute);

        return (
            <>
                <MetaHeadComp metaData={metaData} page={'/mcp'} />
                <div className="sticky top-0 z-[100]">
                    <Navbar navData={navData} utm={'/index'} />
                </div>

                <div className="container cont">
                    <div className="w-full flex justify-center items-center">
                        <div className="flex flex-row text-center max-w-4xl flex-wrap items-center justify-center category-btn">
                            <Link href="/mcp">
                                <button
                                    className={`btn btn-accent ${router.pathname.startsWith('/mcp') ? 'bg-black text-white' : ''}`}
                                >
                                    Users
                                </button>
                            </Link>
                            <Link href="/mcp/developers">
                                <button
                                    className={`btn btn-accent ${router.pathname.startsWith('/mcp/developers') ? 'bg-black text-white' : ''}`}
                                >
                                    Developers
                                </button>
                            </Link>
                            <Link href="/mcp/saas">
                                <button
                                    className={`btn btn-accent ${router.pathname.startsWith('/mcp/developers') ? 'bg-black text-white' : ''}`}
                                >
                                    SaaS
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container cont">
                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className="cont gap-4 justify-center w-full text-center max-w-4xl">
                            <h1 className="h1 ">
                                Instantly Connect Your AI to <span className="text-accent">1,000+ MCP Servers</span>
                            </h1>
                            <h2 className="sub__h1">
                                Easily integrate your AI with thousands of fully managed Model Context Protocol (MCP) servers through a unique, dynamic MCP server URL.
                            </h2>
                            <Link
                                href={`https://flow.viasocket.com/mcp?state=${defaultUtmSource}`}
                                onClick={() => setUtmInCookies({ source: `mcp/${appOneDetails.appslugname}` })}
                            >
                                <button className="btn btn-accent">Get Your MCP URL</button>
                            </Link>
                        </div>
                        {/* <div className="flex justify-center items-center relative w-full md:w-3/5 h-full min-h-[300px] mx-auto">
        <Image src="/assets/img/mcpHero.svg" layout="fill" alt="Selected Embed Image" />
    </div> */}
                    </div>


                    {/* <div className="flex flex-wrap justify-center">
                    {keyPointData.map((point, index) => (
                        <div
                            key={index}
                            className={`font-semibold py-4 px-1 border-black w-full sm:w-1/2 lg:w-1/4 text-center flex items-center justify-center transition-transform transform hover:bg-black hover:text-white min-h-[80px]`}
                        >
                            <div className="flex gap-1 text-lg items-center">
                                <p className="text-accent">✔ </p>
                                <p>{point}</p>
                            </div>
                        </div>
                    ))}
                </div> */}
                </div>

                <div className="container cont">
                    <label className="input border max-w-[400px] border-black flex items-center gap-2 focus-within:outline-none">
                        <MdSearch fontSize={20} />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className={`${style.input} grow`}
                            placeholder="Search your favorite MCP Servers"
                        />
                    </label>
                    <div className="flex">
                        <div className=" border border-black border-t-0 lg:block hidden">
                            <div className="cont max-w-[252px] min-w-[252px] ">
                                {debounceValue ? (
                                    searchedCategoies ? (
                                        searchedCategoies.map((category, index) => {
                                            if (!category?.hidden && category?.slug) {
                                                return (
                                                    <a
                                                        key={index}
                                                        className={`border-r-0 border-y-0 border-8 uppercase text-sm font-medium tracking-wider px-3 py-2 hover:bg-black hover:text-white ${category?.slug === integrationsInfo?.category ? 'border-accent' : 'border-white hover:border-black'}`}
                                                        href={createURL(`/mcp/category/${category?.slug}`)}
                                                    >
                                                        {category?.name}
                                                    </a>
                                                );
                                            }
                                        })
                                    ) : (
                                        <span className="p-8 text-3xl w-full col-span-3 border border-black border-l-0 border-t-0 ">
                                            No category found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    filterPriorityCategories(categories)?.map((category, index) => {
                                        if (!category?.hidden && category?.slug) {
                                            return (
                                                <a
                                                    key={index}
                                                    className={`border-r-0 border-y-0 border-8 uppercase text-sm font-medium tracking-wider px-3 py-2 hover:bg-black hover:text-white ${category?.slug === integrationsInfo?.category ? 'border-accent' : 'border-white hover:border-black'}`}
                                                    href={createURL(`/mcp/category/${category?.slug}`)}
                                                >
                                                    {category?.name}
                                                </a>
                                            );
                                        }
                                    })
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="p-4 md:p-8 cont gap-2">
                                {integrationsInfo?.category && integrationsInfo?.category != 'all' ? (
                                    <>
                                        <h1 className="h1 text-accent">
                                            <span className="text-black italic">{categoryData?.appcount || 300}+</span>{' '}
                                            {integrationsInfo?.category === 'all'
                                                ? 'Apps'
                                                : decodeURIComponent(categoryData?.name)}
                                        </h1>
                                        <p>{categoryData?.subheading}</p>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="h1  text-accent italic">
                                            {' '}
                                            1000+
                                            <span className="text-black not-italic"> Apps</span>
                                        </h1>
                                        <p>
                                            Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                            E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for
                                            streamlined business success.
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className={style.appsgrid}>
                                {debounceValue ? (
                                    searchedApps?.length > 0 ? (
                                        searchedApps?.map((app, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={createURL(`/mcp/${app?.appslugname}`)}
                                                    className={style.app}
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
                                                    <p className={style?.app__des}>{app?.description}</p>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <span className="p-8 text-3xl w-full col-span-3 border border-black border-l-0 border-t-0 ">
                                            No Apps found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    apps?.map((app, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={createURL(`/mcp/${app?.appslugname}`)}
                                                className={style.app}
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
                                                <p className={style?.app__des}>{app?.description}</p>
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    {!debounceValue && (
                        <div className="flex justify-end items-end w-full">
                            {integrationsInfo?.page > 0 && (
                                <Link className="btn btn-ghost" href={createURL(goToPrev())}>
                                    Prev
                                </Link>
                            )}
                            {showNext && (
                                <Link className="btn btn-ghost" href={createURL(goToNext())}>
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
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



                <div className="container cont gap-20 text-black py-20 px-12 border border-black">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="h1  max-w-[900px] text-center">Start getting work done with viaSocket MCP today</h2>
                        <p className="sub__h1 max-w-[1000px]">
                            Break free from isolation-connect your AI to real-world data for smarter, more impactful
                            results.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 text-black">
                        <div className="w-full md:w-1/2 py-20 px-8  flex flex-col justify-between gap-6 border border-black">
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
                                <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-black hover:text-white border-none group active:scale-95 transition-transform duration-75">
                                    Get Your MCP URL for Free
                                </button>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 py-20 px-8 cont justify-between gap-6 border border-black">
                            <div className="cont gap-4">
                                <h2 className="text-4xl font-bold">For Enterprises</h2>
                                <h3 className="text-xl">
                                    viaSocket MCP for Enterprises empowers AI models to securely connect to thousands of
                                    apps in minutes
                                </h3>
                            </div>
                            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
                                {/* <Link href="/signup?utm_source=mcp">
                                <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-white hover:text-black border-none group w-48 active:scale-95 transition-transform duration-75">
                                     <span className="block group-hover:hidden">Cloud MCP</span>
                                    <span className="hidden group-hover:block">Sign Up</span> 
                                </button>
                            </Link> */}
                                <Link href="/support">
                                    <button className="px-4 py-2 bg-accent text-lg text-white hover:bg-black hover:text-white border-none group w-48 active:scale-95 transition-transform duration-75">
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
