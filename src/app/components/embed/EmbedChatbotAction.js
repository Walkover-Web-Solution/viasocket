import Link from 'next/link';
import { Check, Sparkles, Bot } from 'lucide-react';

const actions = [
    { title: 'Create contact', app: 'HubSpot', letter: 'H', color: '#FF7A59' },
    { title: 'Send welcome email', app: 'Gmail', letter: 'M', color: '#EA4335' },
    { title: 'Notify team', app: 'Slack', letter: 'S', color: '#4A154B' },
    { title: 'Create onboarding page', app: 'Notion', letter: 'N', color: '#000000' },
    { title: 'Create invoice', app: 'Stripe', letter: 'S', color: '#635BFF' },
];

function ActionCard({ title, app, letter, color }) {
    return (
        <div className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 min-w-[200px] shadow-sm">
            <span
                className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: color }}
            >
                {letter}
            </span>
            <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-black leading-tight">{title}</span>
                <span className="text-xs text-gray-500">{app}</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
            </span>
        </div>
    );
}

export default function EmbedChatbotAction({ appCount }) {
    const totalApps = appCount ? `${+appCount + 300}+` : '2500+';

    return (
        <div className="container" id="ai_agent">
            <div className="bg-white border border-gray-200 md:p-12 p-6">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="w-full lg:w-1/2 flex flex-col gap-5">
                        <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                            Turn Your Chatbot Into
                            <br />
                            An Action-Taking AI
                        </h2>
                        <p className="text-gray-600 text-base">
                            Connect {totalApps} apps and enable your AI to execute workflows, automate tasks, and
                            interact with your tools through viaSocket.
                        </p>
                        <div>
                            <Link
                                href="https://viasocket.com/blog/give-power-to-your-llm-or-chatbot-of-5-000-apps-via-tool-call"
                                className="inline-block bg-[#B91C1C] hover:bg-[#991B1B] text-white px-6 py-2.5 text-sm font-medium rounded-full transition-colors"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="flex items-center gap-6 w-full">
                            <div className="flex flex-col items-center gap-3 shrink-0">
                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                                    <Sparkles size={14} className="text-black shrink-0" />
                                    <span className="text-xs font-medium text-black leading-tight">
                                        Onboard a new customer
                                        <br />
                                        and notify the team
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-gray-300" />
                                <div className="w-12 h-12 border-2 border-gray-300 bg-white flex items-center justify-center">
                                    <Bot size={24} className="text-black" />
                                </div>
                            </div>

                            <div className="relative flex-1 flex flex-col gap-3">
                                <span
                                    className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 w-6 border-t border-dashed border-gray-300"
                                    aria-hidden
                                />
                                {actions.map((a) => (
                                    <ActionCard key={a.title} {...a} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
