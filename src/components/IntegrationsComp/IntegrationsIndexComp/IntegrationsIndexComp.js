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
import Cta from '@/components/CTA/Cta';
import searchApps from '@/utils/searchApps';
import FAQSection from '@/components/faqSection/faqSection';

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
            <Navbar footerData={footerData} utm={'/index'} />

            <div className="container flex items-center">
                <div className="cont text-left">
                    <h1 className="h1">
                        <span className="text-accent">Automate</span> Anything Anywhere
                    </h1>
                    <h2 className="sub__h1">
                        Connect with  {+appCount + 300}+ ready-made integrations - from CRM and Marketing to E-Commerce, Helpdesk, Payments, and more.
                    </h2>
                </div>
            </div>
            <div className="container cont">
                <label className="input border min-w-[345px] max-w-[400px] ml-auto custom-border flex items-center gap-2 focus-within:outline-none border-b-0">
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
                <div className="flex">
                    <div className=" border custom-border lg:block hidden bg-white">
                        <div className="cont max-w-[252px] min-w-[252px] ">
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
                    {/* <div> */}
                    {/* <div className="p-4 md:p-8 cont gap-2">
                            {integrationsInfo?.category && integrationsInfo?.category != 'all' ? (
                                <>
                                    <h2 className="h2 text-accent ">
                                        <span className="text-black italic">{categoryData?.appcount || 300}+</span>{' '}
                                        {integrationsInfo?.category === 'all'
                                            ? 'Apps'
                                            : decodeURIComponent(categoryData?.name)}
                                    </h2>
                                    <p>{categoryData?.subheading}</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="h2 !text-accent italic ">
                                        {' '}
                                        {+appCount + 300}+<span className="text-black not-italic"> Apps</span>
                                    </h2>
                                    <p>
                                        Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                        E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for
                                        streamlined business success.
                                    </p>
                                </>
                            )}
                        </div> */}

                    <div className={`${style.appsgrid} custom-border`}>
                        {debounceValue ? (
                            searchedApps?.length > 0 ? (
                                searchedApps?.map((app, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={createURL(`/integrations/${app?.appslugname}`)}
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
                    {/* </div> */}
                </div>
                {!debounceValue && (
                    <div className="flex justify-end items-end w-full">
                        {integrationsInfo?.page > 0 && (
                            <Link className="btn btn-outline !px-5" href={createURL(goToPrev())}>
                                Prev
                            </Link>
                        )}
                        {showNext && (
                            <Link className="btn btn-outline !px-5" href={createURL(goToNext())}>
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <Cta
                title="List your app on the viaSocket marketplace"
                description="viaSocket’s Free Developer Hub Platform connects your API to the web’s leading apps. Follow a step-by-step walkthrough in the Developer Hub to seamlessly list your app on the viaSocket Marketplace."
                buttonLabel="Build viaSocket integration"
                buttonLink="https://viasocket.com/faq/developer-hub"
            />
            <div className="container">
                <RequestIntegrationPopupOpener />
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
    ) : (
        <div className={`${style.app}  border-2 hover-bg-grey-100-text-black border-dashed custom-border`}>
            <div className="  flex items-center gap-2">
                <h2 className="font-bold">
                    <span className="h3">💡</span> Request an App
                </h2>
            </div>
            <p className={`${style?.app__des}`}>
                Can’t find the App you’re looking for? We’ll try to build it for you within 48 hours
            </p>
            <RequestIntegrationPopupOpener showType="button" title="Request Now" />
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

    const label = title || `Request a new ${type || 'App'}`;

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
                    💡 Can’t find the {type || 'App'} you’re looking for? We’ll try to build it for you within 48 hours
                </h2>
            </div>
            <div className="mt-8">{showButton}</div>
        </div>
    );
    const SearchView = (
        <div className={`w-full bg-white custom-border md:border grid grid-cols-1 md:grid-cols-2 ${className}`}>
            <div className=" custom-border border-r p-12 cont gap-8">
                <h2 className="h3">
                    💡 Can’t find the {type || 'App'} you’re looking for? We’ll try to build it for you within 48 hours
                </h2>
                <div>{showButton}</div>
            </div>
            <div className="p-12 cont gap-8 border custom-border md:border-none border-l-0">
                <h2 className="h3">🚀 Do you own this app? Why not build its plug and make it live today?</h2>
                <Link href="https://viasocket.com/faq/developer-hub" target="_blank" className="max-w-max">
                    <button className="btn text-nowrap btn-accent">Read our playbook</button>
                </Link>
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
