'use client';
import Image from 'next/image';
import { Plug, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';

export default function HeroSection({
    appOneDetails,
    appTwoDetails,
    selectedTrigger,
    selectedAction,
    popularUseCases,
    getComboLink,
    hasToken,
    utm,
    appCount,
}) {
    return (
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start justify-between">
                <div className="cont items-start text-left gap-6">
                    <div className="flex items-center gap-3">
                        <Image
                            className="h-10 w-fit"
                            src={appOneDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={36}
                            height={36}
                            alt={`${appOneDetails?.name} logo`}
                        />
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
                        <Image
                            className="h-10 w-fit"
                            src={appTwoDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={36}
                            height={36}
                            alt={`${appTwoDetails?.name} logo`}
                        />
                    </div>
                    <h1 className="h1">
                        Connect <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                        <span className="text-accent">{appTwoDetails?.name}</span>
                    </h1>

                    <p>
                        Integrate {appOneDetails?.name} with {appTwoDetails?.name} to automate workflows, sync data
                        between apps, and eliminate repetitive tasks with AI-powered automation.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-gray-900 text-sm font-bold">
                        <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-accent" /> AI Powered
                        </span>
                        <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-accent" /> Built to Scale
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Plug className="w-4 h-4 text-accent" /> {appCount + 300}+ Integrations
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        {selectedTrigger && selectedAction ? (
                            <button
                                onClick={(e) => {
                                    handleRedirect(
                                        e,
                                        `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${selectedTrigger.rowid}/action?events=${selectedAction.rowid}&integrations=${selectedTrigger.pluginrecordid},${selectedAction.pluginrecordid}&action&`
                                    );
                                }}
                                className="btn btn-accent px-8 py-3"
                            >
                                Connect these apps for free
                            </button>
                        ) : (
                            <button
                                className="btn btn-accent px-8 py-3"
                                onClick={(e) =>
                                    handleRedirect(e, hasToken ? `https://flow.viasocket.com?` : `/signup?`, null, utm)
                                }
                            >
                                Create your flow
                            </button>
                        )}
                        <a
                            href="https://cal.id/team/viasocket/workflow-setup-discussion"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline px-8 py-3 flex items-center gap-2"
                        >
                            Book a demo
                        </a>
                    </div>
                </div>

                {popularUseCases.length > 0 && (
                    <div className="w-full shrink-0 self-center relative">
                        <div
                            aria-hidden="true"
                            className="absolute -top-20 left-10 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-accent/40 to-accent/10 blur-[120px] opacity-30 z-0 animate-pulse"
                        ></div>
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-16 right-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tl from-accent/30 to-transparent blur-[140px] opacity-25 z-0"
                        ></div>
                        <div
                            aria-hidden="true"
                            className="absolute top-1/2 -left-[50px] -right-[50px] w-full h-[400px] bg-gradient-to-r from-accent/20 via-accent/5 to-accent/20 blur-[100px] opacity-20 z-0"
                        ></div>
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-[80px] z-0"
                        ></div>

                        <div className="relative z-10">
                            <div className="flex flex-col gap-8">
                                {popularUseCases.slice(0, 5).map((combo, i) => {
                                    const isRight = i % 2 === 0;
                                    return (
                                        <a
                                            key={i}
                                            href={getComboLink(combo)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group flex items-center rounded-2xl px-3 py-4 relative z-10 w-fit max-w-[90%] transition-all duration-300 hover:-translate-y-1 backdrop-blur-[32px] border border-white/90 shadow-md ${
                                                isRight
                                                    ? 'ml-auto bg-gradient-to-br from-white/80 to-white/50 hover:from-white/90 hover:to-white/60'
                                                    : 'ml-auto !mr-28 bg-gradient-to-br from-gray-50/80 to-white/50 hover:from-gray-50/90 hover:to-white/60'
                                            }`}
                                        >
                                            <p className="text-sm text-[#1F2430]">{combo?.description}</p>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
