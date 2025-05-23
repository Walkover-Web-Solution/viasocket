import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import style from './IntegrationsIndexComp.module.scss';
import { APPERPAGE } from '@/const/integrations';
import { useEffect, useState } from 'react';
import searchApps from '@/utils/searchApps';
import BlogGrid from '@/components/blogGrid/blogGrid';
import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import createURL from '@/utils/createURL';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';
import ErrorComp from '@/components/404/404Comp';

export default function IntegrationsIndexComp({
    pageInfo,
    integrationsInfo,
    navData,
    footerData,
    apps,
    blogsData,
    categoryData,
    categories,
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
            <div className="sticky top-0 z-[100] border-b custom-border">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="container flex justify-center items-center">
                <div className="cont text-left">
                    <h1 className="h1">
                        Explore<span className="text-accent"> 1,500+ </span> Pre-Built App Integrations
                    </h1>
                    <h2 className="sub__h1">
                        Browse our extensive library of integrations to easily connect and automate workflows across
                        your most-used apps.
                    </h2>
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
                        placeholder="Search your favorite tools "
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
                    <div>
                        <div className="p-4 md:p-8 cont gap-2">
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
                                        1500+
                                        <span className="text-black not-italic"> Apps</span>
                                    </h2>
                                    <p>
                                        Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                        E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for
                                        streamlined business success.
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
                                    <span className="p-8 text-3xl w-full col-span-3 border custom-border border-l-0 border-t-0 ">
                                        No Apps found for Searched name{' '}
                                    </span>
                                )
                            ) : (
                                apps?.map((app, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={createURL(`/integrations/${app?.appslugname}`)}
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
            <div className='container'>
                <div className="cont gap-2 border custom-border p-12 bg-white">
                    <h2 className="h2 text-left">List your app on the viaSocket marketplace
                    </h2>
                    <p className="sub__h1">
                        viaSocket’s Free Developer Hub Platform connects your API to the web’s leading apps. Follow a step-by-step walkthrough in the Developer Hub to seamlessly list your app on the viaSocket Marketplace.
                    </p>
                    <Link
                        href="https://viasocket.com/faq/developer-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn btn-accent">Build viaSocket integration</button>
                    </Link>
                </div>
            </div>
            <div className="container my-6 bg-white">
                <div className="border custom-border p-12 cont cont__gap">
                    <div className="cont gap-2">
                        <h2 className="h2">Couldn't Find Your App? Don’t Worry, We’ll Build It For You</h2>
                        <p className="text-xl">
                            If your app isn’t available on viaSocket, simply request an integration, and our team will
                            build it for you, ensuring seamless connection and effortless automation of your workflows.
                        </p>
                    </div>
                    <button
                        onClick={() => document.getElementById('plugin_request_form').showModal()}
                        className="btn btn-accent "
                    >
                        Request your plugin now
                    </button>
                </div>
            </div>
            <div className="container my-6">
                <BlogGrid posts={blogsData} />
            </div>
            <div className="container my-6 bg-white">
                <Footer footerData={footerData} />
            </div>
            <IntegrationsRequestComp />
        </>
    );
}
