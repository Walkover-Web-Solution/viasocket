import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { useEffect, useState } from 'react';
import BlogGrid from '@/components/blogGrid/blogGrid';
import createURL from '@/utils/createURL';
import ErrorComp from '@/components/404/404Comp';
import FAQSection from '@/components/faqSection/faqSection';
import { FaBalanceScale, FaLayerGroup, FaNetworkWired, FaPlug, FaShieldAlt, FaTools } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import style from './McpIndexComp.module.scss';
import { APPERPAGE } from '@/const/integrations';
import McpSwitchComp from '../mcpSwitchComp/McpSwitchComp';
import Script from 'next/script';
import { handleRedirect } from '@/utils/handleRedirection';
import Cta from '@/components/CTA/Cta';
import searchApps from '@/utils/searchApps';


export default function McpIndexComp({
    pageInfo,
    integrationsInfo,
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
}) {
    if (!categoryData || Object.keys(categoryData).length === 0) {
        return <ErrorComp />;
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategoies, setSearchedCategoies] = useState([]);

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
        return (
            <div className="cont pb-4 lg:gap-12 md:gap-12 gap-12">
                <MetaHeadComp metaData={metaData} page={'/mcp'} />
                <Script id="twitter-conversion-tracking" strategy="afterInteractive">
                    {`
                        twq('event', 'tw-pnuam-pnugc', {
                            email_address: null,
                            phone_number: null
                        });
                    `}
                </Script>

                <Navbar footerData={footerData} utm={'/index'} />

                <div className="cont gap-8">
                    <McpSwitchComp />

                    <div className="container cont gap-2">
                        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                            <div className="cont gap-4 w-full text-left">
                                <div className="cont gap-1">
                                    <h1 className="h1">
                                        Give your <span className="text-accent">AI agent </span> the power to act
                                    </h1>
                                    <h2 className="sub__h1">
                                        Any action in<span className="text-accent"> 1500+</span> app - no complex
                                        setups. OR build your own, power users!
                                    </h2>
                                </div>

                                <button
                                    className="btn btn-accent"
                                    onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com/mcp?')}
                                >
                                    Get Your MCP URL
                                </button>
                            </div>
                            {/* <div className="flex justify-center items-center relative w-full md:w-3/5 h-full min-h-[300px] mx-auto">
                            <Image src="/assets/img/mcpHero.svg" layout="fill" alt="Selected Embed Image" />
                        </div> */}
                        </div>

                        <div className="flex flex-wrap gap-6">
                            {keyPointData.map((point, index) => (
                                <div key={index} className="flex gap-2 h6 items-center">
                                    <div className="h-3 w-3 bg-accent" />
                                    <p className="text-nowrap">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container cont">
                    <label className="input border max-w-[400px] custom-border flex items-center gap-2 focus-within:outline-none">
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
                        <div className=" border custom-border border-t-0 lg:block hidden bg-white">
                            <div className="cont max-w-[252px] min-w-[252px] ">
                                {debounceValue ? (
                                    searchedCategoies ? (
                                        searchedCategoies.map((category, index) => {
                                            if (!category?.hidden && category?.slug) {
                                                return (
                                                    <a
                                                        key={index}
                                                        className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 hover-bg-grey-100-text-black ${category?.slug === integrationsInfo?.category ? 'border-accent' : 'border-white hover:custom-border'}`}
                                                        href={createURL(`/mcp/category/${category?.slug}`)}
                                                    >
                                                        {category?.name}
                                                    </a>
                                                );
                                            }
                                        })
                                    ) : (
                                        <span className="p-8 text-3xl w-full col-span-3 border custom-border border-l-0 border-t-0 ">
                                            No category found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    filterPriorityCategories(categories)?.map((category, index) => {
                                        if (!category?.hidden && category?.slug) {
                                            return (
                                                <a
                                                    key={index}
                                                    className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 hover-bg-grey-100-text-black ${category?.slug === integrationsInfo?.category ? 'border-accent' : 'border-white hover:custom-border'}`}
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
                                        <h2 className="h1 text-accent">
                                            <span className="text-black italic">{categoryData?.appcount || 300}+</span>{' '}
                                            {integrationsInfo?.category === 'all'
                                                ? 'Apps'
                                                : decodeURIComponent(categoryData?.name)}
                                        </h2>
                                        <p>{categoryData?.subheading}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="h2 text-accent italic">
                                            {' '}
                                            1500+
                                            <span className="text-black not-italic"> MCP Servers</span>
                                        </h2>
                                        <p>
                                            Viasocket is your all-in-one solution, seamlessly integrating CRM,
                                            Marketing, E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and
                                            more for streamlined business success.
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className={`${style.appsgrid} custom-border`}>
                                {debounceValue ? (
                                    searchedApps?.length > 0 ? (
                                        searchedApps?.map((app, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={createURL(`/mcp/${app?.appslugname}`)}
                                                    className={style.app}
                                                >
                                                    <div className="flex items-center gap-2 ">
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
                                        <span className="p-8 text-3xl w-full col-span-3 border custom-border border-l-0 border-t-0 ">
                                            No Apps found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    apps?.map((app, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={createURL(`/mcp/${app?.appslugname}`)}
                                                className={`${style.app} hover-bg-grey-100-text-black custom-border`}
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

                <Cta
                    title="Build your app to be MCP-Ready"
                    description="List your app on the viaSocket Marketplace and connect it to AI assistants like Cursor, Claude, Windsurf, and many others—enabling your users to perform actions within your app directly through AI."
                    buttonLabel="Quick start guide"
                    buttonLink="https://viasocket.com/faq/developer-hub"
                />

                <FeaturesGrid featuresData={featuresData} />

                <div className="container cont">
                    <Table data={tableData} />
                </div>
                <div className="container cont">
                    <div className="cont__py p-12 h-fit border gap-12 flex flex-col  bg-black text-white">
                        <h2 className="h2 py-2">Ready, Set, MCP in 3 Simple Steps</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {mcpSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="max-w-[400px] lg:py-20 py-8 px-8 border-2 border-gray-200 flex flex-col gap-2 transition-transform transform hover:scale-110"
                                >
                                    <p className="text-accent text-2xl font-semibold">{`Step ${index + 1}`}</p>
                                    <h3 className="h3 font-bold">{step.title}</h3>
                                    <p className="sub__h2">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container cont">
                    <div className="flex gap-12 flex-col text-black p-12 border custom-border bg-white">
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="h2">Start getting work done with viaSocket MCP today</h2>
                            <p className="sub__h1">
                                Break free from isolation-connect your AI to real-world data for smarter, more impactful
                                results.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 text-black">
                            <div className="w-full md:w-1/2 py-20 px-8  flex flex-col justify-between gap-6 border custom-border">
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
                                    <button className="px-4 py-2 bg-accent text-lg text-white hover-bg-grey-100-text-black border-none group active:scale-95 transition-transform duration-75">
                                        Get Your MCP URL for Free
                                    </button>
                                </Link>
                            </div>
                            <div className="w-full md:w-1/2 py-20 px-8 cont justify-between gap-6 border custom-border">
                                <div className="cont gap-4">
                                    <h2 className="text-4xl font-bold">For Enterprises</h2>
                                    <h3 className="text-xl">
                                        viaSocket MCP for Enterprises empowers AI models to securely connect to
                                        thousands of apps in minutes
                                    </h3>
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
                                    <Link href="/support">
                                        <button className="px-4 py-2 bg-accent text-lg text-white hover-bg-grey-100-text-black border-none group w-48 active:scale-95 transition-transform duration-75">
                                            Self-Hosted MCP
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <BlogGrid posts={blogsData} />
                </div>

                <div className="">
                    {faqData?.length > 0 && (
                        <div className="container cont">
                            <FAQSection faqData={faqData} faqName={'/index'} />
                        </div>
                    )}
                    <div className="container">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
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
        <div className="container cont p-12 bg-black text-white">
            <div className="mb-20">
                <div className="flex gap-4">
                    <h2 className="h2 mb-4">Don't just chat, Put your AI to work</h2>
                    <BsStars size={42} />
                </div>
                <h2 className="sub__h1 text-gray-300 max-w-[800px]">
                    viaSocket MCP lets your AI connect to 1,000+ apps with no complex APIs needed. Your AI can now send
                    messages, manage data, schedule events, and update records, turning it from a chat tool into a real
                    action taker.
                </h2>
            </div>

            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-12">
                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-white cont max-w-[500px] mx-auto md:mx-0  lg:py-12 py-8 px-8 transition-transform duration-300 hover:scale-105"
                    >
                        <div className="text-accent mb-4">{getIconComponent(feature.iconName)}</div>
                        <h3 className="h3 font-bold mb-3">{feature.heading}</h3>
                        <p className="sub__h2 text-gray-300">{feature.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Table = ({ data }) => {
    return (
        <div className="border custom-border w-full h-full cont gap-8 bg-white py-8 px-0 lg:px-20">
            <div className="flex flex-col gap-0">
                <h2 className="h2">MCP vs Traditional APIs : The Paradigm Shift</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border custom-border">
                    <thead className="p-4 bg-accent text-white">
                        <tr>
                            <th className="p-4 text-left text-xl w-1/3">Aspects</th>
                            <th className="p-4 text-left text-xl w-1/3">Traditonal APIs</th>
                            <th className="p-4 text-left text-xl  w-1/3">MCP (viaSocket MCP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((conntent, index) => (
                            <tr key={index} className="">
                                <td className="p-4 text-lg font-semibold border custom-border">{conntent?.aspects}</td>
                                <td className="p-4 text-lg  border custom-border">{conntent?.api}</td>
                                <td className="p-4 text-lg  border custom-border">{conntent?.mcp}</td>
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
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 custom-border border border-r-0 border-b-0">
            {skeletonCards.map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col sm:py-9 py-6 sm:px-6 px-4 custom-border border border-l-0 border-t-0 gap-2 bg-[#FAFAFA]"
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
