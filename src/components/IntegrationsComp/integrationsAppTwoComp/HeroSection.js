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
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10 px-4">
                <div className="cont items-start text-left gap-6 w-full lg:w-1/2">
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
                    <div className="w-full lg:w-[620px] shrink-0 self-center" style={{ position: 'relative' }}>
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: -50,
                                left: 20,
                                width: 180,
                                height: 180,
                                borderRadius: '50%',
                                background: '#C41230',
                                filter: 'blur(90px)',
                                opacity: 0.12,
                                zIndex: 0,
                            }}
                        ></div>
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                bottom: -40,
                                right: 10,
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                background: '#9CA3AF',
                                filter: 'blur(90px)',
                                opacity: 0.15,
                                zIndex: 0,
                            }}
                        ></div>
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: -30,
                                right: -30,
                                bottom: 0,
                                background: 'rgba(90,90,90,0.1)',
                                filter: 'blur(60px)',
                                zIndex: 0,
                            }}
                        ></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
                                <span
                                    className="w-1 bg-accent rounded-full shrink-0"
                                    style={{ height: 22, backgroundColor: '#C41230' }}
                                    aria-hidden="true"
                                ></span>
                                <h3 className="font-bold text-black" style={{ fontSize: 20 }}>
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
                                        className="flex items-center gap-3 rounded-2xl px-[18px] py-4"
                                        style={{
                                            position: 'relative',
                                            zIndex: 1,
                                            background: 'rgba(255, 255, 255, 0.5)',
                                            border: '1px solid rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(28px) saturate(180%)',
                                            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                            boxShadow:
                                                '0 12px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 0 10px rgba(120,120,120,0.05)',
                                        }}
                                    >
                                        <Zap className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                                        <p className="text-[15px] text-[#1F2430] truncate">{combo?.description}</p>
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
