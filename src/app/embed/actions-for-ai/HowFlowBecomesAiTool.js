import { Zap, Check, ArrowRight } from 'lucide-react';

const StepLabel = ({ children }) => (
    <div className="text-center text-xs font-semibold tracking-[0.2em] text-accent mb-4">{children}</div>
);

const StepCard = ({ children }) => (
    <div className="flex-1 w-full flex flex-col">
        <div className="bg-white border border-gray-200 rounded-md p-6 flex items-center justify-center min-h-[260px] max-h-[260px]">
            {children}
        </div>
    </div>
);

const Arrow = () => (
    <div className="hidden lg:flex items-center justify-center px-2 text-gray-400">
        <ArrowRight size={24} />
    </div>
);

const AppIcon = ({ src, alt, bg = 'bg-white' }) => (
    <div className={`w-12 h-12 rounded-lg border border-gray-200 ${bg} flex items-center justify-center shadow-sm`}>
        <img src={src} alt={alt} className="w-7 h-7 object-contain" />
    </div>
);

export default function HowFlowBecomesAiTool() {
    return (
        <section className="container">
            <div className="border border-gray-200 p-8 md:p-12 bg-white">
                <div className="text-center mb-10">
                    <div className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">HOW IT WORKS</div>
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-900">How a flow becomes an AI tool</h2>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-2">
                    {/* Step 1 */}
                    <div className="flex-1 flex flex-col justify-between">
                        <StepLabel>STEP 01</StepLabel>
                        <StepCard>
                            <div className="flex flex-wrap items-start justify-center gap-3 md:gap-4">
                                {[
                                    {
                                        icon: (
                                            <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center">
                                                <Zap size={22} className="text-gray-700" fill="currentColor" />
                                            </div>
                                        ),
                                        title: 'Trigger',
                                    },
                                    {
                                        icon: (
                                            <AppIcon
                                                src="https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg"
                                                alt="HubSpot"
                                            />
                                        ),
                                        title: 'Create contact',
                                    },
                                    {
                                        icon: (
                                            <AppIcon
                                                src="https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg"
                                                alt="Gmail"
                                            />
                                        ),
                                        title: 'Send welcome',
                                    },
                                    {
                                        icon: (
                                            <AppIcon
                                                src="https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg"
                                                alt="Slack"
                                            />
                                        ),
                                        title: 'Notify team',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center w-[72px] gap-2">
                                        {item.icon}
                                        <div className="text-[11px] font-semibold text-gray-800 mt-2 leading-tight">
                                            {item.title}
                                        </div>
                                        <div className="text-[10px] text-gray-500 leading-tight">{item.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </StepCard>
                        <div className="mt-5">
                            <h3 className="font-medium text-lg">Build Your workflow</h3>
                            <p className="text-sm text-gray-600">
                                Connect apps and define the actions you want to automate.{' '}
                            </p>
                        </div>
                    </div>

                    <Arrow />

                    {/* Step 2 */}
                    <div className="flex-1 flex flex-col justify-between">
                        <StepLabel>STEP 02</StepLabel>
                        <StepCard>
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Zap size={14} className="text-gray-700" fill="currentColor" />
                                    </div>
                                    <span className="text-xs text-gray-500">/mcp</span>
                                </div>
                                <div className="flex items-start gap-2 mb-3">
                                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        Tool
                                    </span>
                                    <span className="text-sm font-mono text-gray-800">create_new_customer</span>
                                </div>
                                <pre className="text-xs font-mono text-gray-700 bg-transparent leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                                    {`{
  "name": "string",
  "email": "string",
  "company": "string",
  "source": "string"
}`}
                                </pre>
                            </div>
                        </StepCard>
                        <div className="mt-5">
                            <h3 className="font-medium text-lg">viaSocket turns it into a tool</h3>
                            <p className="text-sm text-gray-600">
                                We handle authentication, schemas, and orchestration behind the scenes.
                            </p>
                        </div>
                    </div>

                    <Arrow />

                    {/* Step 3 */}
                    <div className="flex-1 flex flex-col justify-between">
                        <StepLabel>STEP 03</StepLabel>
                        <StepCard>
                            <div className="w-full space-y-3">
                                <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-700">
                                    Add a new customer and send a welcome email.
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-md bg-gray-900 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✦</span>
                                    </div>
                                    <div className="flex-1 bg-white border border-gray-200 rounded-md p-3">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-xs text-gray-700 break-words">
                                                Calling tool: <span className="font-mono">create_new_customer</span>
                                            </span>
                                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                                <Check size={10} className="text-white" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <div className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                                            <Check size={11} strokeWidth={3} /> Completed
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-0.5">
                                            All steps executed successfully.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </StepCard>
                        <div className="mt-5">
                            <h3 className="font-medium text-lg">Call it from your AI</h3>
                            <p className="text-sm text-gray-600">
                                Your AI calls one tool and the entire workflow runs automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
