import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import style from './IntegrationsIndexComp.module.scss';
import { APPERPAGE } from '@/const/integrations';
import { useEffect, useState } from 'react';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import createURL from '@/utils/createURL';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';
import ErrorComp from '@/components/404/404Comp';
import { GoArrowUpRight } from 'react-icons/go';
import searchApps from '@/utils/searchApps';
import FAQSection from '@/components/faqSection/faqSection';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';

export default function IntegrationsIndexComp({
    pageInfo,
    integrationsInfo,
    footerData,
    apps,
    blogsData,
    categoryData,
    categories,
    faqData,
    appCount,
    navbarData,
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
        if (debounceValue) {
            const filteredCategories = categories?.filter((category) =>
                category?.name?.toLowerCase()?.includes(debounceValue.toLowerCase())
            );
            setSearchedCategoies(filterPriorityCategories(filteredCategories));
            const loadApps = async () => {
                const fetchedApps = await searchApps(debounceValue);
                setSearchedApps(fetchedApps || []);
            };
            loadApps();
        } else {
            setSearchedApps([]);
            setSearchedCategoies();
        }
    }, [debounceValue]);

    const showNext = apps?.length > 0 && APPERPAGE <= apps?.length;

    const goToNext = () => {
        const url = `/integrations/${integrationsInfo?.category ? 'category/' + integrationsInfo?.category : ''}/page/${Number(integrationsInfo?.page) + 1}`;
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
            <Navbar navbarData={navbarData} utm={'/index'} />

            <div className="container integrations-page-hero global-top-space pt-12">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <h1 className="h1">
                        <span className="text-accent">Automate</span> Anything. Anywhere.
                    </h1>

                    <p className="min-w-fit">
                        <span className="text-base">Want to list your app?</span>
                        <Link
                            href="https://viasocket.com/help/plugin-builder"
                            target="_blank"
                            className="text-accent text-xs flex items-center gap-1"
                        >
                            Build viaSocket integration <GoArrowUpRight />
                        </Link>
                    </p>
                </div>
            </div>
            <div className="container cont gap-3">
                <div className="flex-col flex md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="cont gap-2">
                        {integrationsInfo?.category && integrationsInfo?.category != 'all' ? (
                            <>
                                <h2 className="h2">
                                    <span className="text-accent italic">{categoryData?.appcount || 300}+</span>{' '}
                                    {integrationsInfo?.category === 'all'
                                        ? 'Apps'
                                        : decodeURIComponent(categoryData?.name)}
                                </h2>
                                <p className="text-black">{categoryData?.subheading}</p>
                            </>
                        ) : (
                            <>
                                <h2 className="h2 !text-accent italic ">
                                    {' '}
                                    <span>{+appCount + 300}+</span>
                                    <span className="text-black not-italic"> Apps</span>
                                </h2>
                                <p>
                                    viaSocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                    E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for streamlined
                                    business success.
                                </p>
                            </>
                        )}
                    </div>
                    <label className="input border lg:min-w-[345px] lg:max-w-[400px] w-full  custom-border flex items-center gap-2 focus-within:outline-none">
                        <MdSearch fontSize={20} />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            type="text"
                            className={`${style.input} grow`}
                            placeholder="Search your favorite tools "
                        />
                    </label>
                </div>

                <div className="flex">
                    <div className="border custom-border lg:block hidden bg-white overflow-y-auto scrollbar-thin max-w-[252px] min-w-[252px] lg:h-[1201px] xl:h-[901px] h-[78.125vw]">
                        <div className="cont">
                            {debounceValue ? (
                                searchedCategoies ? (
                                    searchedCategoies.map((category, index) => {
                                        if (!category?.hidden && category?.slug) {
                                            return (
                                                <a
                                                    key={index}
                                                    className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 hover-bg-grey-100-text-black ${category?.slug === integrationsInfo?.category ? 'border-accent' : 'border-white hover:custom-border'}`}
                                                    href={createURL(`/integrations/category/${category?.slug}`)}
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
                                                href={createURL(`/integrations/category/${category?.slug}`)}
                                            >
                                                {category?.name}
                                            </a>
                                        );
                                    }
                                })
                            )}
                        </div>
                    </div>
                    <div
                        className="custom-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l lg:border-l-0 w-full"
                        style={{ gridAutoRows: '75px' }}
                    >
                        {debounceValue ? (
                            searchedApps?.length > 0 ? (
                                <>
                                    {searchedApps?.map((app, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={createURL(`/integrations/${app?.appslugname}`)}
                                                className={`${style.app} flex justify-center hover-bg-grey-100-text-black`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-[40px] h-[40px] relative border">
                                                        <Image
                                                            className="object-contain"
                                                            src={app?.iconurl || 'https://placehold.co/36x36'}
                                                            alt={app?.name}
                                                            fill
                                                        />
                                                    </div>
                                                    <h2>{app?.name}</h2>
                                                </div>
                                                <p className={style?.app__des}>{app?.description}</p>
                                            </Link>
                                        );
                                    })}
                                    <div
                                        className={`${style.app} border-2 hover-bg-grey-100-text-black border-dashed custom-border flex justify-center`}
                                    >
                                        <div className="flex items-center gap-2 justify-between">
                                            <h2 className="flex items-center gap-2">
                                                <span className="text-xl"><span aria-label="lightbulb">💡</span></span>
                                                <span>Request an App</span>
                                            </h2>
                                            <RequestIntegrationPopupOpener showType="button" title="Request" />
                                        </div>
                                        <p className={`${style?.app__des}`}>
                                            Can’t find the App you’re looking for? We’ll try to build it for you within
                                            48 hours
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full col-span-full">
                                    <RequestIntegrationPopupOpener
                                        showType="searchView"
                                        className="md:border-t-0 md:border-l-0"
                                    />
                                </div>
                            )
                        ) : (
                            <>
                                {apps?.map((app, index) => (
                                    <AppVisual redirectPart="integrations" app={app} index={index} />
                                ))}
                                <AppVisual
                                    redirectPart="integrations"
                                    app={{
                                        rowid: 'request-new-app',
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
                {!debounceValue && (
                    <div className="flex justify-end items-end w-full">
                        {integrationsInfo?.page > 0 && (
                            <Link className="btn btn-outline !px-5 gap-1" href={createURL(goToPrev())}>
                                <GrFormPreviousLink size={20} /> Prev
                            </Link>
                        )}
                        {showNext && (
                            <Link className="btn btn-outline !px-5 gap-1" href={createURL(goToNext())}>
                                Next <GrFormNextLink size={20} />
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className="container my-6">
                <BlogGrid posts={blogsData} />
            </div>
            <div className="pb-4">
                {faqData?.length > 0 && (
                    <div className="container cont">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                <div className="container cont">
                    <AlphabeticalComponent />
                </div>
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
}

export function AppVisual({ app, index, redirectPart }) {
    // mcp, integrations
    return app.rowid !== 'request-new-app' ? (
        <Link
            key={index || app?.rowid}
            href={createURL(`/${redirectPart}/${app?.appslugname}`)}
            className={`${style.app} hover-bg-grey-100-text-black custom-border flex align-center justify-center`}
        >
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 relative border">
                    <Image
                        className="object-contain p-1"
                        src={app?.iconurl || 'https://placehold.co/36x36'}
                        alt={app?.name}
                        fill
                    />
                </div>
                <h2>{app?.name}</h2>
            </div>
        </Link>
    ) : (
        <div
            className={`${style.app} border-2 hover-bg-grey-100-text-black border-dashed custom-border flex justify-center`}
        >
            <div className="flex items-center gap-2 justify-between">
                <h2 className="flex items-center gap-2">
                    <span className="text-xl"><span aria-label="lightbulb">💡</span></span>
                    <span>Request an App</span>
                </h2>

                <RequestIntegrationPopupOpener showType="button" title="Request" />
            </div>
            <p className={`${style?.app__des}`}>
                Can’t find the App you’re looking for? We’ll try to build it for you within 48 hours
            </p>
        </div>
    );
}

export function RequestIntegrationPopupOpener({
    className = '',
    showType = 'fullView',
    appInfo,
    type,
    title,
    secondAppInfo = null,
}) {
    const [modalData, setModalData] = useState({ isOpen: false, appInfo: null, type: null });

    const openModal = () => {
        setModalData({ isOpen: true, appInfo, type });
    };

    const closeModal = () => {
        setModalData((prev) => ({ ...prev, isOpen: false }));
    };

    const label =
        title ||
        `Request a new ${type ? `${type == 'trigger' ? 'Trigger' : 'Action'} for ${appInfo?.name}` : 'Integration'}`;

    const showButton = (
        <button onClick={openModal} className={`btn text-nowrap btn-accent ${className}`}>
            {label}
        </button>
    );

    const dottedText = (
        <span
            onClick={openModal}
            className={`block cursor-pointer text-lg text-accent hover:underline w-fit ${className}`}
        >
            {label}
        </span>
    );

    const fullView = (
        <div className={`bg-white border custom-border p-12 cont gap-2 w-full ${className}`}>
            <div className="cont gap-1">
                <h2 className="h2">
                    <span aria-label="lightbulb">💡</span> Can’t find the {type || 'App'} you’re looking for? We’ll try to build it for you within 48 hours
                </h2>
            </div>
            <div className="mt-8">{showButton}</div>
        </div>
    );
    const SearchView = (
        <div className={`w-full bg-white grid grid-cols-1 lg:grid-cols-2 ${className}`}>
            {/* Left Section */}
            <div className="cont gap-4 custom-border lg:border-r p-4 justify-between">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <h2 className="h3">
                        Can’t find the <span className="text-primary-600">{type || 'App'}</span> you’re looking for?
                        <br/>
                        We’ll build it for you within <span className="font-bold text-primary-700">48 hours</span>.
                    </h2>
                </div>
                <div className='ml-8'>
                    {showButton}
                </div>
            </div>

            {/* Right Section */}
            <div className="cont custom-border border-t lg:border-t-0 p-4 gap-4 justify-between">
                <div className="flex flex-col jusitfy-between gap-6">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🚀</span>
                        <h2 className="h3">
                            Own this app? 
                            <br/>
                            Build its plug and make it live today!
                        </h2>
                    </div>
                    <Link
                        href="https://viasocket.com/help/developer-hub"
                        target="_blank"
                        className="max-w-max"
                    >
                        <button className="ml-8 btn text-xs sm:text-sm text-wrap btn-accent">
                            Read our playbook
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );

    const showFooter = (
        <span
            className="text-sm cursor-pointer hover:underline transition-all duration-300 text-left"
            onClick={openModal}
        >
            Request an Integration
        </span>
    );

    const getUi = () => {
        switch (showType) {
            case 'fullView':
                return fullView;
            case 'dotted':
                return dottedText;
            case 'button':
                return showButton;
            case 'footer':
                return showFooter;
            case 'searchView':
                return SearchView;
            default:
                return fullView;
        }
    };

    return (
        <>
            {getUi()}
            {modalData.isOpen && (
                <IntegrationsRequestComp
                    appInfo={modalData.appInfo}
                    secondAppInfo={secondAppInfo}
                    type={modalData.type}
                    onClose={closeModal}
                />
            )}
        </>
    );
}
