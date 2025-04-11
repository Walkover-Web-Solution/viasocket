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
}) {
    if (!categoryData || Object.keys(categoryData).length === 0) {
        return <ErrorComp />;
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategoies, setSearchedCategoies] = useState();

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
                setSearchedCategoies();
                return;
            }

            const searchTerm = debounceValue.toLowerCase();

            const filteredCategories = categories?.categories?.filter((category) =>
                category?.toLowerCase()?.includes(searchTerm)
            );
            setSearchedCategoies(filteredCategories);

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
            <div className="w-full flex justify-center container">
                <div className="cont gap-4 text-center max-w-[1200px]">
                    <h3 className="text-accent text-4xl font-bold">MCP is now on viaSocket</h3>
                    <div className="cont text-center">
                        <h1 className="h1">Integrate Your AI with 1,000+ Apps Using viaSocket MCP</h1>
                        <h2 className="sub__h1">
                            With viaSocket MCP, turn your AI into a functional tool—send messages, manage data, schedule
                            events, update records, and more, all without complex API integration.
                        </h2>
                    </div>
                </div>
            </div>
            <div className="container cont">
                <div className="py-4 md:py-8 cont justify-center items-center text-center gap-2">
                    {integrationsInfo?.category && integrationsInfo?.category != 'all' ? (
                        <>
                            <h1 className="h1 text-accent">
                                <span className="text-black italic">{categoryData?.appcount || 300}+</span>{' '}
                                {integrationsInfo?.category === 'all' ? 'Apps' : decodeURIComponent(categoryData?.name)}{' '}
                                <span className="text-black not-italic">Apps Ready to Connect with viaSocket MCP</span>
                            </h1>
                            <p>{categoryData?.subheading}</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl text-accent italic">
                                {' '}
                                1000+
                                <span className="text-black not-italic"> Apps Ready to Connect with viaSocket MCP</span>
                            </h1>
                            <p>
                                Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for streamlined
                                business success.
                            </p>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 max-w-[800px] w-full mb-6">
                    <label className="input border flex-grow border-black flex items-center gap-2 focus-within:outline-none">
                        <MdSearch fontSize={20} />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className="grow py-2 px-3"
                            placeholder="Search your favorite tools"
                        />
                    </label>
                    <div className="relative">
                        <select
                            className="border border-black py-2 px-4 appearance-none bg-white cursor-pointer pr-10"
                            onChange={(e) => {
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
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-black border border-r-0 border-b-0 ">
                    {debounceValue ? (
                        searchedApps?.length > 0 ? (
                            searchedApps?.map((app, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={createURL(`/integrations/${app?.appslugname}`)}
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
                                    href={createURL(`/integrations/${app?.appslugname}`)}
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

            <div className="container cont cont__py gap-20 px-24  h-fit border  bg-[#F5FBFF]">
                <div className="flex flex-col justify-center items-center w-full max-w-[1000px] mx-auto">
                    <h2 className="h1">Ready, Set, MCP in 3 Simple Steps</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                    {mcpSteps.map((step, index) => (
                        <div
                            key={index}
                            className="max-w-[400px] lg:py-20 py-8 px-8 border-2 border-gray-200 bg-white flex flex-col gap-2 transition-transform transform hover:scale-110"
                        >
                            <h3 className="h2 font-bold">{step.title}</h3>
                            <p className="sub__h2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container cont cont__py border border-black  justify-center items-center text-center gap-12 ">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="h1  max-w-[1200px]">
                        Take the first step-Connect Your AI Assistant with viaSocket MCP
                    </h2>
                    <p className="sub__h1 max-w-[1000px]">
                        Break free from isolation-connect your AI to real-world data for smarter, more impactful
                        results.
                    </p>
                </div>
                <Link href="/signup?utm_source=mcp">
                    <button className="btn btn-accent">Get Started</button>
                </Link>
            </div>
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
