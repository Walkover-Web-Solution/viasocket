'use client';
import { useState } from 'react';
import { Code2, Sparkles, RefreshCcw, Zap } from 'lucide-react';
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
}) {
    return (
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start justify-between">
                <div className="cont items-start text-left gap-6">
                    <h1 className="h1">
                        Connect <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                        <span className="text-accent">{appTwoDetails?.name}</span>
                    </h1>

                    <p>
                        Save hours every week with {appOneDetails?.name} + {appTwoDetails?.name} automations. Stop
                        doing things manually and let viaSocket handle the repetitive tasks between your apps
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-gray-900 text-sm font-bold">
                        <span className="flex items-center gap-1.5">
                            <Code2 className="w-4 h-4 text-accent" /> No Code
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-accent" /> AI Powered
                        </span>
                        <span className="flex items-center gap-1.5">
                            <RefreshCcw className="w-4 h-4 text-accent" /> Real-time Sync
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
                                    handleRedirect(
                                        e,
                                        hasToken ? `https://flow.viasocket.com?` : `/signup?`,
                                        null,
                                        utm
                                    )
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
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="w-1.5 h-[22px] rounded-full shrink-0 bg-gradient-to-b from-accent to-accent/60"
                                    aria-hidden="true"
                                ></span>
                                <h3 className="font-bold text-black text-xl">
                                    Popular Use Cases
                                </h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {popularUseCases.slice(0, 5).map((combo, i) => (
                                    <a
                                        key={i}
                                        href={getComboLink(combo)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 rounded-2xl px-[18px] py-4 relative z-10 bg-gradient-to-br from-white/70 to-white/40 border border-white/90 backdrop-blur-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_15px_rgba(120,120,120,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_20px_rgba(120,120,120,0.08)] transition-all duration-300 hover:-translate-y-1 hover:from-white/85 hover:to-white/60 hover:border-white/95"
                                    >
                                        <Zap className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                                        <p className="text-sm text-[#1F2430]">{combo?.description}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
