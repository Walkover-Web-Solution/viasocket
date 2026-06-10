'use client';

import styles from '@/app/embed/action-via-webhook/WebhookUseCase.module.css';

export default function UseCaseSection({ appCount }) {
    return (
        <section className="py-20 bg-[#f8f9fc] container border px-12 max-[768px]:px-6 max-[480px]:px-4" id="use-case">
            <div className="grid grid-cols-[1fr_1.05fr] gap-14 items-start">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-[#fef2f1] border border-[#f5cac5] text-[#b4534a] text-[10.5px] font-bold py-1 px-3 rounded-full mb-4 uppercase tracking-wider">
                            See it in action
                        </div>
                        <h2 className="text-[32px] font-medium tracking-[-0.6px] leading-[1.2] text-[#111827] mb-3">
                            User opens. User builds. User ships.
                        </h2>
                        <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                            Other platforms ship you a wrapper around their own product. With App Integration, your users{' '}
                            <strong className="text-[#111827] font-bold">build workflows inside your UI</strong> — using your app as a first-class trigger and action.
                        </p>
                        <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                            Here's a real flow. A user inside your CRM wants to automate post-deal-won. They click "Add Workflow", pick
                            a trigger, drop two actions — done in under a minute, never left your product.
                        </p>
                        <a
                            href="https://viasocket.com/signup?utm_source=/embed/app-integration"
                            className="btn btn-accent"
                            style={{ marginTop: '8px' }}
                        >
                            Start building
                        </a>
                    </div>

                    {/* Right Panel */}
                    <div className="bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]">
                        {/* Step 1 */}
                        <div className={`${styles.ucStep} py-5 px-6 border-b border-gray-200 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-blue-50 text-blue-700`}>
                                →
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    User clicks inside your product
                                </div>
                                <div className="text-sm font-semibold text-[#111827] leading-[1.5] mb-2">
                                    "Add Workflow" → Choose trigger
                                </div>
                                <div className="text-[12.5px] text-gray-500 leading-[1.65] font-normal">
                                    Embed slider opens ·  {appCount + 300}+ apps  your app shown as native option
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className={`${styles.ucStep} py-5 px-6 border-b border-gray-200 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-[#fef2f1] text-[#b4534a]`}>
                                ⚙
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    User builds the flow
                                </div>
                                <div className="text-sm font-semibold text-[#111827] leading-[1.5] mb-2">
                                    Drag-and-drop · three steps
                                </div>
                                <div className="flex flex-col gap-[5px] mt-2">
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-emerald-600 font-bold">→</span>
                                        Trigger: Deal status = Won (your CRM)
                                    </div>
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-emerald-600 font-bold">→</span>
                                        Action: Send congrats email via Gmail
                                    </div>
                                    <div className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-[#111827] font-medium`}>
                                        <span className="text-emerald-600 font-bold">→</span>
                                        Action: Post to Slack #wins
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className={`${styles.ucStep} py-5 px-6 flex gap-4 items-start transition-colors duration-150 hover:bg-gray-50/50`}>
                            <div className={`${styles.ucStepIco} w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold bg-green-50 text-green-700`}>
                                ✓
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10.5px] font-bold tracking-[0.8px] uppercase text-gray-400 mb-[5px]">
                                    Live · running on every event
                                </div>
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">Your CRM</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Deal #4821 won — flow triggered</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">Gmail</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Congrats email sent to deal owner</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                    <div className={`${styles.ucAction} flex items-center gap-2.5 py-[7px] px-[11px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}>
                                        <span className="font-bold text-[#111827] min-w-[70px]">Slack</span>
                                        <span className="flex-1 text-gray-500 font-normal text-[11.5px]">Posted to #wins channel</span>
                                        <span className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-50 py-0.5 px-2 rounded-full tracking-wide`}>DONE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}
