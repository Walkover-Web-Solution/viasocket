import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import categories from '@/data/categories.json';
import style from './IntegrationsAppComp.module.scss';
import { APPERPAGE } from '@/const/integrations';
import { useEffect, useState } from 'react';
import createURL from '@/utils/createURL';
import searchApps from '@/utils/searchApps';
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexComp';

export default function IntegrationsAppComp({ pageInfo, integrationsInfo, apps, appCategories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [searchedApps, setSearchedApps] = useState([]);
    const [searchedCategoies, setSearchedCategoies] = useState();

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
        if (integrationsInfo?.appone) {
            const url = `/integrations/${integrationsInfo?.appone}/page/${Number(integrationsInfo?.page) + 1}`;
            return url;
        } else {
            if (integrationsInfo?.category && !integrationsInfo?.page) {
                const url = `${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
                return url;
            } else {
                const url = `${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
                return url;
            }
        }
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
            <div className="container cont gap-4">
                <label className="input border max-w-[400px] custom-border flex items-center gap-2 focus-within:outline-none bg-white">
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
                    {!integrationsInfo?.appone && (
                        <div className=" border custom-border border-t-0 lg:block hidden bg-white">
                            <div className="cont max-w-[252px] min-w-[252px] ">
                                {debounceValue ? (
                                    searchedCategoies ? (
                                        searchedCategoies?.map((category, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 hover-bg-grey-100-text-black ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:custom-border'}`}
                                                    href={`/integrations/category/${category}`}
                                                >
                                                    {category}
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <span className="p-8 text-3xl w-full col-span-3 border custom-border border-l-0 border-t-0 ">
                                            No Apps found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    categories?.categories.map((category, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 hover-bg-grey-100-text-black ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:custom-border'}`}
                                                href={`/integrations/category/${category}`}
                                            >
                                                {category}
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                    <div className="integration-app-one-component w-full">
                        {!integrationsInfo?.appone && (
                            <div className="p-4 md:p-8 cont gap-2">
                                {integrationsInfo?.category && integrationsInfo?.category != 'All' ? (
                                    <h1 className="h1 text-accent  ">
                                        <span className="text-black italic">300+</span>{' '}
                                        {decodeURIComponent(integrationsInfo?.category)}
                                    </h1>
                                ) : (
                                    <h2 className="h2 text-accent italic">
                                        {' '}
                                        {+appCount + 300}+
                                        <span className="text-black not-italic"> viaSocket Integrations</span>
                                    </h2>
                                )}

                                <p>
                                    Viasocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                    E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for streamlined
                                    business success.
                                </p>
                            </div>
                        )}

                        <div
                            className="border-t custom-border border-l grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4"
                            style={{ gridAutoRows: '75px' }}
                        >
                            {debounceValue ? (
                                searchedApps?.length > 0 ? (
                                    searchedApps?.map((app, index) => (
                                        <Link
                                            key={index}
                                            href={createURL(
                                                `/integrations/${integrationsInfo?.appone}/${app?.appslugname}`
                                            )}
                                            className={`${style.app} hover-bg-grey-100-text-black justify-center`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={app?.iconurl || 'https://placehold.co/40x40'}
                                                    width={40}
                                                    height={40}
                                                    alt={app?.name}
                                                />

                                                <h2 className="font-bold">{app?.name}</h2>
                                            </div>
                                            {/* <p className={style?.app__des}>{app?.description}</p> */}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full">
                                        <RequestIntegrationPopupOpener
                                            showType="searchView"
                                            className="md:border-t-0 md:border-l-0"
                                        />
                                    </div>
                                )
                            ) : (
                                apps
                                    ?.filter((app) => !app?.category?.some((cat) => appCategories?.includes(cat)))
                                    ?.slice(0, 12)
                                    ?.map((app, index) => {
                                        if (app?.appslugname != integrationsInfo?.appone) {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={createURL(
                                                        `/integrations/${integrationsInfo?.appone}/${app?.appslugname}`
                                                    )}
                                                    className={`${style.app} hover-bg-grey-100-text-black custom-border bg-white flex justify-center`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={app?.iconurl || 'https://placehold.co/40x40'}
                                                            width={40}
                                                            height={40}
                                                            alt={app?.name}
                                                        />

                                                        <h2>{app?.name}</h2>
                                                    </div>
                                                    {/* <p className={style?.app__des}>{app?.description}</p> */}
                                                </Link>
                                            );
                                        }
                                    })
                            )}
                        </div>
                    </div>
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
        </>
    );
}
