import Link from 'next/link';
import Image from 'next/image';
import categories from '@/data/categories.json';
import style from './IntegrationsAppComp.module.scss';
import createURL from '@/utils/createURL';
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/integrationsIndexClientComp';

export default function IntegrationsAppComp({
    pageInfo,
    integrationsInfo,
    apps,
    appCategories,
    appCount,
    searchTerm,
    searchedCategories,
}) {

    return (
        <>
            <div className="bg-white flex flex-col border-t custom-border">
                <div className="flex">
                    {!integrationsInfo?.appone && (
                        <div className="border custom-border border-t-0 lg:block hidden bg-white overflow-hidden">
                            <div className="cont max-w-[252px] min-w-[252px] ">
                                {searchTerm ? (
                                    searchedCategories ? (
                                        searchedCategories?.map((category, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 custom-styles ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:custom-border'}`}
                                                    href={`/integrations/category/${category}`}
                                                >
                                                    {category}
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <span className="p-4 sm:p-8 text-lg sm:text-2xl lg:text-3xl w-full col-span-3 border custom-border border-l-0 border-t-0 break-words">
                                            No Apps found for Searched name{' '}
                                        </span>
                                    )
                                ) : (
                                    categories?.categories.map((category, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                className={`border-r-0 border-y-0 border-8  text-sm font-medium tracking-wider px-3 py-2 custom-styles ${category === decodeURIComponent(integrationsInfo?.category) ? 'border-accent' : 'border-white hover:custom-border'}`}
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
                                    viaSocket is your all-in-one solution, seamlessly integrating CRM, Marketing,
                                    E-Commerce, Helpdesk, Payments, Web forms, Collaboration, and more for streamlined
                                    business success.
                                </p>
                            </div>
                        )}

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4"
                            style={{ gridAutoRows: (searchTerm && !apps?.length) ? 'minmax(80px, auto)' : '75px' }}
                        >
                            {searchTerm ? (
                                apps?.length > 0 ? (
                                    apps?.map((app, index) => (
                                        <Link
                                            key={index}
                                            href={createURL(
                                                `/integrations/${integrationsInfo?.appone}/${app?.appslugname}`
                                            )}
                                            className={`${style.app} bg-white border custom-border flex justify-center`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={app?.iconurl || 'https://placehold.co/40x40'}
                                                    width={40}
                                                    height={40}
                                                    alt={app?.name}
                                                    className="border h-10 p-1"
                                                />

                                                <h2 className="text-sm sm:text-base break-words">{app?.name}</h2>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full row-span-1 md:row-span-2 min-h-[200px] md:min-h-[150px]">
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
                                                    className={`${style.app} bg-white border custom-border flex justify-center`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={app?.iconurl || 'https://placehold.co/40x40'}
                                                            width={40}
                                                            height={40}
                                                            alt={app?.name}
                                                            className="border h-10 p-1"
                                                        />

                                                        <h2 className="text-sm sm:text-base break-words">{app?.name}</h2>
                                                    </div>
                                                </Link>
                                            );
                                        }
                                    })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
