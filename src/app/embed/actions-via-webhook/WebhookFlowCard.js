import { ArrowRight, Check } from 'lucide-react';

const routingItems = ['Create deal in HubSpot', 'Send welcome email via Gmail', 'Notify team in Slack'];

const executedActions = [
    { app: 'HubSpot', detail: 'Deal #5102 created — Pro plan' },
    { app: 'Gmail', detail: 'Welcome email sent to Acme Corp' },
    { app: 'Slack', detail: 'Posted to #new-customers' },
];

const actionAnimationClasses = ['animate-flowAction1', 'animate-flowAction2', 'animate-flowAction3'];

function StepIcon({ children, className }) {
    return (
        <div
            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold ${className}`}
        >
            {children}
        </div>
    );
}

export default function WebhookFlowCard() {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100 bg-white">
            {/* STEP 1: Webhook POST */}
            <div className="px-6 py-5 flex gap-4 items-start">
                <StepIcon className="bg-blue-50 text-blue-700">
                    <ArrowRight size={14} strokeWidth={2.5} />
                </StepIcon>
                <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-semibold tracking-[0.8px] uppercase text-gray-400 mb-1">
                        Webhook POST from your server
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Onboarding completed event</p>
                    <div className="bg-[#0d0d12] rounded-md py-3 px-3.5 font-mono text-[11px] leading-[1.7] text-gray-300 whitespace-pre">
                        {'{'}
                        {'\n  '}
                        <span className="text-[#86efac]">&quot;event&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;onboarding.completed&quot;</span>,{'\n  '}
                        <span className="text-[#86efac]">&quot;user_id&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;usr_8x21k&quot;</span>,{'\n  '}
                        <span className="text-[#86efac]">&quot;plan&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;pro&quot;</span>,{'\n  '}
                        <span className="text-[#86efac]">&quot;company&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;Acme Corp&quot;</span>
                        {'\n'}
                        {'}'}
                    </div>
                </div>
            </div>

            {/* STEP 2: Routing (Decision) */}
            <div className="px-6 py-5 flex gap-4 items-start min-h-[140px] relative mb-3">
                <StepIcon className="bg-orange-50 text-orange-600">
                    <ArrowRight size={14} strokeWidth={2.5} />
                </StepIcon>
                <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-semibold tracking-[0.8px] uppercase text-gray-400 mb-1">
                        viaSocket routing
                    </p>

                    {/* Loading dots */}
                    <div className="flex gap-1 mt-2 animate-flowDecisionDots">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]" />
                    </div>

                    {/* Decision content */}
                    <div className="absolute left-[4.5rem] right-6 top-[2.6rem] animate-flowDecisionText">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Three automations matched</p>
                        <div className="flex flex-col gap-1.5">
                            {routingItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-[13px] text-gray-700">
                                    <ArrowRight size={13} className="text-gray-400" strokeWidth={2} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* STEP 3: Executed */}
            <div className="px-6 py-5 flex gap-4 items-start min-h-[200px]">
                <StepIcon className="bg-green-50 text-green-600">
                    <Check size={14} strokeWidth={3} />
                </StepIcon>
                <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-semibold tracking-[0.8px] uppercase text-gray-400 mb-3">
                        Executed
                    </p>

                    {/* Loading dots before actions */}
                    <div className="flex gap-1 mt-1 animate-flowExecutedDots">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    </div>

                    {/* Action rows */}
                    <div className="flex flex-col gap-2">
                        {executedActions.map((a, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 py-2 px-3 bg-gray-50 border border-gray-200 text-xs opacity-0 ${actionAnimationClasses[i]}`}
                            >
                                <span className="font-semibold text-gray-900 min-w-[64px]">{a.app}</span>
                                <span className="flex-1 text-gray-500 text-[12px]">{a.detail}</span>
                                <span className="text-[10px] font-bold text-green-700 tracking-wider">DONE</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
