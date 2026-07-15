'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import ExternalLink from '@/utils/ExternalLink';
import { LinkText } from '@/components/uiComponents/buttons';
import createURL from '@/utils/createURL';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';

const SIMILAR_APPS_PAGE_SIZE = 3;

function SimilarAppsSidebar({ appDetails, similarApps }) {
    const [visibleCount, setVisibleCount] = useState(SIMILAR_APPS_PAGE_SIZE);

    if (!similarApps?.length) return null;

    const visibleApps = similarApps.slice(0, visibleCount);
    const hasMore = visibleCount < similarApps.length;

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-3">
                <span
                    className="w-1 h-[22px] rounded-full shrink-0 bg-accent"
                    aria-hidden="true"
                ></span>
                <h4 className="font-bold text-black text-xl">Similar apps</h4>
            </div>
            <div className="flex flex-col gap-2">
                {visibleApps.map((app, index) => (
                    <Link
                        key={index}
                        href={createURL(`/integrations/${appDetails?.appslugname}/${app?.appslugname}`)}
                        className="flex items-center gap-3 p-3 border custom-border rounded-xl bg-white hover:border-accent hover:bg-accent/5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors w-full"
                    >
                        <div className="w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                            <Image
                                src={app?.iconurl || 'https://placehold.co/32x32'}
                                width={24}
                                height={24}
                                alt={`${app?.name} logo`}
                                className="w-6 h-6 object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-gray-900 truncate">{app?.name}</span>
                            {app?.category?.length > 0 && (
                                <span className="block text-xs text-gray-500 truncate">
                                    {app.category.slice(0, 2).join(', ')}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            {hasMore && (
                <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + SIMILAR_APPS_PAGE_SIZE)}
                    className="btn btn-outline fit-content ml-auto"
                >
                    Load More <ChevronDown className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

function AppRow({ appDetails, otherApp, similarApps, getDoFollowUrlStatusArray }) {
    return (
        <div className="flex flex-col p-6 md:p-12 border custom-border bg-white">
            <div className="text-xs sm:text-sm text-gray-600 mb-4">
                <Breadcrumb
                    parent="Integrations"
                    child1={appDetails?.name}
                    child2={`${appDetails?.name} + ${otherApp?.name}`}
                    parentLink="/integrations"
                    child1Link={`/integrations/${appDetails?.appslugname}`}
                />
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="cont gap-4 md:flex-1 min-w-0">
                    <div className="cont gap-2">
                        <div className="w-14 h-14 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                            <Image
                                src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                width={32}
                                height={32}
                                alt={`${appDetails?.name} logo`}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <h3 className="h3 font-bold pt-5">About {appDetails?.name}</h3>
                    </div>
                    <p className="max-w-4xl">{appDetails?.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {appDetails?.category?.slice(0, 2).map((cat, index) => (
                            <Link
                                key={index}
                                href={createURL(`/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                                className="mb-2"
                            >
                                <span className="btn btn-outline">{cat}</span>
                            </Link>
                        ))}
                    </div>
                    <ExternalLink
                        href={(() => {
                            const baseUrl = appDetails?.domain?.startsWith('http')
                                ? appDetails?.domain
                                : 'http://' + appDetails?.domain;
                            const separator = baseUrl.includes('?') ? '&' : '?';
                            return `${baseUrl}${separator}utm_source=viasocket`;
                        })()}
                        appSlugName={appDetails?.appslugname}
                        doFollowArray={getDoFollowUrlStatusArray}
                    >
                        <LinkText children={'Learn more'} />
                    </ExternalLink>
                </div>

                <div className="md:w-[340px] md:shrink-0 md:ml-auto">
                    <SimilarAppsSidebar appDetails={appDetails} similarApps={similarApps} />
                </div>
            </div>
        </div>
    );
}

export default function AboutApps({
    appOneDetails,
    appTwoDetails,
    similarAppsOne,
    similarAppsTwo,
    getDoFollowUrlStatusArray,
}) {
    return (
        <div className="container pb-4">
            <div className="cont gap-6">
                <AppRow
                    appDetails={appOneDetails}
                    otherApp={appTwoDetails}
                    similarApps={similarAppsOne}
                    getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                />
                <AppRow
                    appDetails={appTwoDetails}
                    otherApp={appOneDetails}
                    similarApps={similarAppsTwo}
                    getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                />
            </div>
        </div>
    );
}
