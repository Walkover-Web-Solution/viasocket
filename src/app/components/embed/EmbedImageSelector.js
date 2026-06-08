import { Lock, Box, FileText, Zap } from 'lucide-react';
import WorkflowIllustration from './WorkflowIllustration';

const FEATURES = [
    {
        icon: Lock,
        iconBg: 'bg-emerald-50 text-emerald-600',
        title: 'Emd-user auth inside your product',
        desc: 'Users connect via QAuth without leaving you product. Secure, isolated, and seamless.',
    },
    {
        icon: Box,
        iconBg: 'bg-indigo-50 text-indigo-600',
        title: 'Connect any app in minutes',
        desc: 'Pre-build connectors and OAuth flows to 2500+ apps. Your AI gets them as callable toold instantly.',
    },
    {
        icon: FileText,
        iconBg: 'bg-amber-50 text-amber-600',
        title: 'Works with any LLM',
        desc: 'Standard MCP spec. Drop into claude, GPT. Gemini, or your own model with one config block.',
    },
    {
        icon: Zap,
        iconBg: 'bg-violet-50 text-violet-600',
        title: 'AI tool calling out of the box',
        desc: 'One MCP endpoint gives your AI agent access to every connected app.',
    },
];

const EmbedImageSelector = ({ appCount }) => {
    // const totalApps = appCount ? `${+appCount + 300}+` : '2200+';
    return (
        <div className="container">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                    Everything you need to own the integration layer
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#EFEAFE] border p-8 md:px-12 md:py-20 flex flex-col gap-8 justify-between">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                                Multi-step flows as single AI tools
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Your AI calls the entire workflow as a one tool <br />
                                No complex chaining, no context switching.
                            </p>
                        </div>

                        <WorkflowIllustration />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="bg-white border border-gray-200 p-6 flex flex-col gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.iconBg}`}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="font-medium text-gray-900 text-xl">{f.title}</h4>
                                    <p className="text-lg text-gray-600 leading-relaxed">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbedImageSelector;
