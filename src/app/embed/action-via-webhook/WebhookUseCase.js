'use client';

import styles from './WebhookUseCase.module.css';

export default function WebhookUseCase() {
    return (
        <section className="py-20 bg-[#f8f9fc] container border" id="use-case">
            <div className="px-12 mx-auto max-[768px]:px-6 max-[480px]:px-4">
                <div className="grid grid-cols-[1fr_1.05fr] gap-14 items-start">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-[#fef2f1] border border-[#f5cac5] text-[#b4534a] text-[10.5px] font-bold py-1 px-3 rounded-full mb-4 uppercase tracking-wider">
                            See it in action
                        </div>
                        <h2 className="text-[32px] font-extrabold tracking-[-0.6px] leading-[1.2] text-[#111827] mb-3">
                            Event in. Actions out.
                        </h2>
                        <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                            Other platforms require you to build separate integrations for each action. With Actions via Webhook, one POST from your server{' '}
                            <strong className="text-[#111827] font-bold">triggers every automation your user has set up</strong> — across all their apps, in parallel.
                        </p>
                        <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                            Here's a real flow. A new customer just completed onboarding. Watch your server POST one event and viaSocket execute three app actions in under two seconds.
                        </p>
                        <a
                            href="https://viasocket.com/signup?utm_source=/embed/actions-via-webhook"
                            className="btn btn-accent"
                            style={{ marginTop: '8px' }}
                        >
                            Start building
                        </a>
                    </div>

                    {/* Right - Panel */}
                    <div className="bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]">
                        {/* Step 1: Webhook POST */}
                        <div className={`${styles.ucStep} py-5 px-6 border-b border-gray-200 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-blue-50 text-blue-700`}>
                                →
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    Webhook POST from your server
                                </div>
                                <div className="text-sm font-semibold text-[#111827] leading-[1.5] mb-2">
                                    Onboarding completed event
                                </div>
                                <div className="bg-[#0d0d12] rounded-md py-3 px-3.5 mt-2 font-mono text-[11px] leading-[1.7] text-gray-300 whitespace-pre-wrap">
                                    <span className="text-[#86efac]">&quot;event&quot;</span>:{' '}
                                    <span className="text-[#fbbf24]">&quot;onboarding.completed&quot;</span>,{'\n'}
                                    <span className="text-[#86efac]">&quot;user_id&quot;</span>:{' '}
                                    <span className="text-[#fbbf24]">&quot;usr_8x21k&quot;</span>,{'\n'}
                                    <span className="text-[#86efac]">&quot;plan&quot;</span>:{' '}
                                    <span className="text-[#fbbf24]">&quot;pro&quot;</span>,{'\n'}
                                    <span className="text-[#86efac]">&quot;company&quot;</span>:{' '}
                                    <span className="text-[#fbbf24]">&quot;Acme Corp&quot;</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: viaSocket routing */}
                        <div className={`${styles.ucStep} py-5 px-6 border-b border-gray-200 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-[#fef2f1] text-[#b4534a]`}>
                                ↗
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    viaSocket routing
                                </div>
                                <div className="text-sm font-semibold text-[#111827] leading-[1.5] mb-2">
                                    Three automations matched
                                </div>
                                <div className="flex flex-col gap-[5px] mt-2">
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-[#b4534a] font-bold">→</span>
                                        Create deal in HubSpot
                                    </div>
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-[#b4534a] font-bold">→</span>
                                        Send welcome email via Gmail
                                    </div>
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-[#b4534a] font-bold">→</span>
                                        Notify team in Slack
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Executed */}
                        <div className={`${styles.ucStep} py-5 px-6 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-green-50 text-green-700`}>
                                ✓
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    Executed
                                </div>
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">HubSpot</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Deal #5102 created — Pro plan</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">Gmail</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Welcome email sent to Acme Corp</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">Slack</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Posted to #new-customers</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
