import styles from '../action-via-webhook/WebhookUseCase.module.css';

export default function UseCaseSection() {
    return (
        <section id="use-case" className="bg-white border p-6 md:py-12 md:px-20 container">
            <div className="grid md:grid-cols-[1fr_1.05fr] grid-cols-1 gap-14 md:gap-20 items-start">
                {/* Left */}
                <div>
                    <div className="inline-flex items-center gap-1.5 text-accent text-base font-bold py-1 rounded-full mb-4 tracking-wider uppercase">
                        See it in action
                    </div>
                    <h2 className="text-[32px] font-medium tracking-tight leading-tight text-[#0a0a0a] mb-3">
                        Context in. Action out.
                    </h2>
                    <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
                        Other platforms require you to define every step upfront. With Actions for AI ,{' '}
                        <strong>your agent understands the context and chooses the right actions automatically</strong>
                        <br /> No rigid workflows. No manual tool routing.
                    </p>
                    <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
                        Here&apos;s a real example: a new lead submits a form. The agent analyzes the information,
                        selects the required actions, and executes them across multiple apps in seconds
                    </p>
                    <a href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-accent">
                        Start building
                    </a>
                </div>

                {/* Right Panel */}
                <div className="bg-white border border-gray-200 shadow-sm">
                    {/* Step 1 */}
                    <div className={`${styles.ucStep} flex gap-4 items-start px-6 py-5 border-b border-gray-200`}>
                        <div
                            className={`${styles.ucStepIco} w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-blue-50 text-blue-700`}
                        >
                            →
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10.5px] font-bold tracking-wider uppercase text-gray-500 mb-[5px]">
                                Input
                            </div>
                            <div className="text-sm font-semibold text-[#0a0a0a] leading-[1.5] mb-2">
                                New lead from website form
                            </div>
                            <div className="text-[12.5px] text-gray-500 leading-[1.65]">
                                Acme Corp · enterprise plan · submitted by Sarah Chen, VP Ops
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`${styles.ucStep} flex gap-4 items-start px-6 py-5 border-b border-gray-200`}>
                        <div
                            className={`${styles.ucStepIco} w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-[#fef2f1] text-accent`}
                        >
                            AI
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10.5px] font-bold tracking-wider uppercase text-gray-500 mb-[5px]">
                                Agent decision
                            </div>
                            <div className="text-sm font-semibold text-[#0a0a0a] leading-[1.5] mb-2">
                                Three actions selected
                            </div>
                            <div className="flex flex-col gap-[5px] mt-2">
                                {[
                                    'Log lead in HubSpot',
                                    'Notify sales lead in Slack',
                                    'Hold a demo slot in Google Calendar',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className={`${styles.ucDecisionItem} flex items-center gap-2 text-xs text-gray-700 font-medium`}
                                    >
                                        <span className="text-accent font-bold">→</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`${styles.ucStep} flex gap-4 items-start px-6 py-5`}>
                        <div
                            className={`${styles.ucStepIco} w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-green-100 text-green-700`}
                        >
                            ✓
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10.5px] font-bold tracking-wider uppercase text-gray-500 mb-[5px]">
                                Executed
                            </div>
                            <div className="flex flex-col gap-1.5 mt-2">
                                {[
                                    { app: 'HubSpot', detail: 'Deal #4821 created' },
                                    { app: 'Slack', detail: 'Posted to #enterprise-deals' },
                                    { app: 'Calendar', detail: 'Thursday 2pm · invite drafted' },
                                ].map(({ app, detail }) => (
                                    <div
                                        key={app}
                                        className={`${styles.ucAction} flex items-center gap-2.5 px-[11px] py-[7px] bg-gray-50 border border-gray-200 text-xs flex-wrap`}
                                    >
                                        <span className="font-bold text-[#0a0a0a] min-w-[70px]">{app}</span>
                                        <span className="flex-1 text-gray-500 text-[11.5px]">{detail}</span>
                                        <span
                                            className={`${styles.ucActionStatus} text-[9.5px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full tracking-wide`}
                                        >
                                            DONE
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
