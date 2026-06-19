import { Lock, Box, FileText, Zap } from 'lucide-react';
import WorkflowIllustration from './WorkflowIllustration';

const EmbedImageSelector = ({ appCount }) => {
    const totalApps = appCount ? `${appCount + 300}+` : '2,200+';

    const FEATURES = [
        {
            icon: Lock,
            iconBg: 'bg-emerald-50 text-emerald-600',
            title: 'Build in User Authentication',
            desc: 'Users connect apps securely without leaving you product.',
        },
        {
            icon: Box,
            iconBg: 'bg-indigo-50 text-indigo-600',
            title: `${totalApps} Apps Integrations`,
            desc: 'Pre-build integrations and OAuth flows included.',
        },
        {
            icon: FileText,
            iconBg: 'bg-amber-50 text-amber-600',
            title: 'Work with any AI Model',
            desc: 'Compatible with OpenAI, Claude, Gemini, and more.',
        },
        {
            icon: Zap,
            iconBg: 'bg-violet-50 text-violet-600',
            title: 'AI Tool Calling',
            desc: 'Give AI access to connected apps with one endpoint',
        },
    ];
    return (
        <div className="container">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="h2">Built-In Capabilities for AI Agents</h2>
                    <p className="text-lg md:text-xl">
                        The building blocks that enable AI agents to securely connect, decide, and take action.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#EFEAFE] border border-[#d8ccf7] p-8 md:px-12 md:py-20 flex flex-col gap-8 justify-between">
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
                                    <h4 className="font-medium text-gray-900 text-lg sm:text-xl">{f.title}</h4>
                                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{f.desc}</p>
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
