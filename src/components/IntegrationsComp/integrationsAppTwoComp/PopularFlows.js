'use client';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function PopularFlows({
    combosData,
    appOneDetails,
    appTwoDetails,
    visibleCombos,
    setVisibleCombos,
    showMore,
    setShowMore,
}) {
    const hasCombinations = combosData?.combinations?.length > 0;

    if (!hasCombinations) return null;

    return (
        <div className="container flex flex-col gap-8 mt-12">
            <div className="flex flex-col gap-3">
                <h2 className="h2">
                    Popular {appOneDetails?.name} + {appTwoDetails?.name} flows
                </h2>
                <p className="text-gray-600 max-w-xl">Start from a real workflow other teams are already running.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {combosData?.combinations
                    ?.filter((combo) => combo?.description && !/^(List|Get)\b/i.test(combo.description.trim()))
                    ?.slice(0, visibleCombos)
                    ?.map((combo, index) => {
                        const integrations =
                            combosData?.plugins[combo?.trigger?.name]?.rowid +
                            ',' +
                            combosData?.plugins[combo?.actions[0]?.name]?.rowid;
                        const triggerIconUrl =
                            combosData?.plugins[combo?.trigger?.name]?.iconurl || 'https://placehold.co/36x36';
                        const actionIconUrl =
                            combosData?.plugins[combo?.actions[0]?.name]?.iconurl || 'https://placehold.co/36x36';
                        const triggerAppName = combosData?.plugins[combo?.trigger?.name]?.name || 'App';
                        const actionAppName = combosData?.plugins[combo?.actions[0]?.name]?.name || 'App';
                        const link = `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions
                            ?.map((action) => action?.id)
                            .join(',')}&integrations=${integrations}&action&`;
                        return (
                            <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-xl border custom-border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                                        <Image
                                            src={triggerIconUrl}
                                            width={28}
                                            height={28}
                                            alt={`${triggerAppName} logo`}
                                            className="w-6 h-6 object-contain"
                                        />
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
                                    <div className="w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                                        <Image
                                            src={actionIconUrl}
                                            width={28}
                                            height={28}
                                            alt={`${actionAppName} logo`}
                                            className="w-6 h-6 object-contain"
                                        />
                                    </div>
                                </div>
                                <p className="font-medium text-gray-900 text-base leading-snug flex-1">
                                    {combo.description}
                                </p>
                                <span className="text-accent font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Use this flow <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </span>
                            </a>
                        );
                    })}
            </div>
            {showMore && (
                <button
                    onClick={() => {
                        setVisibleCombos(visibleCombos + 6);
                        if (combosData?.combinations?.length <= visibleCombos + 6) setShowMore(false);
                    }}
                    className="btn btn-outline self-start"
                >
                    Load more <ChevronDown className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
