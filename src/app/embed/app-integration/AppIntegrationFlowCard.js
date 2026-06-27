import { ArrowRight, Settings, Check, CheckCircle2 } from 'lucide-react';

const buildSteps = [
    'Trigger: Deal status = Won (your CRM)',
    'Action: Send congrats email via Gmail',
    'Action: Post to Slack #wins',
];

const executedActions = [
    { app: 'Your CRM', detail: 'Deal #4821 won — flow triggered' },
    { app: 'Gmail', detail: 'Congrats email sent to deal owner' },
    { app: 'Slack', detail: 'Posted to #wins channel' },
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

export default function AppIntegrationFlowCard({ appCount }) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100 bg-white">
            {/* STEP 1: Input */}
            <div className="px-6 py-5 flex gap-4 items-start">
                <StepIcon className="bg-blue-50 text-blue-700">
                    <ArrowRight size={14} strokeWidth={2.5} />
                </StepIcon>
                <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-semibold tracking-[0.8px] uppercase text-gray-400 mb-1">
                        User clicks inside your product
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                        &quot;Add Workflow&quot; → Choose trigger
                    </p>
                    <p className="text-[12.5px] text-gray-500 leading-[1.65]">
                        Embed slider opens · {appCount + 300}+ apps, your app shown as native option
                    </p>
                </div>
            </div>

            {/* STEP 2: Decision (animated) */}
            <div className="px-6 py-5 flex gap-4 items-start min-h-[160px] relative">
                <StepIcon className="bg-orange-50 text-orange-600">
                    <Settings size={14} strokeWidth={2.5} />
                </StepIcon>
                <div className="flex-1 min-w-0">
                    <p className="text-[10.5px] font-semibold tracking-[0.8px] uppercase text-gray-400 mb-1">
                        User builds the flow
                    </p>

                    {/* Loading dots */}
                    <div className="flex gap-1 mt-2 animate-flowDecisionDots">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]" />
                    </div>

                    {/* Decision content */}
                    <div className="absolute left-[4.5rem] right-6 top-[2.6rem] animate-flowDecisionText">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-semibold text-gray-900">Drag-and-drop · three steps</p>
                            <CheckCircle2 className="w-4 h-4 text-green-500 animate-flowCheckmark" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            {buildSteps.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-[13px] text-gray-700">
                                    <ArrowRight size={13} className="text-emerald-600" strokeWidth={2} />
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
                        Live · running on every event
                    </p>

                    {/* Loading dots */}
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
                                <span className="font-semibold text-gray-900 min-w-[72px]">{a.app}</span>
                                <span className="flex-1 text-gray-500 text-sm">{a.detail}</span>
                                <span className="text-[10px] font-bold text-green-700 tracking-wider">DONE</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
