import { Lock, Box, FileText, Zap } from 'lucide-react';
import WorkflowIllustration from './WorkflowIllustration';

const FEATURES = [
    {
        icon: Lock,
        iconBg: 'bg-emerald-50 text-emerald-600',
        title: 'Built-in app authentication',
        desc: 'Let users securely connect their apps without leaving your platform.',
    },
    {
        icon: Box,
        iconBg: 'bg-indigo-50 text-indigo-600',
        title: 'Connect any app in minutes',
        desc: 'Connect to thousands of apps using pre-built connectors and built-in authentication.',
    },
    {
        icon: FileText,
        iconBg: 'bg-amber-50 text-amber-600',
        title: 'Make automation feel native',
        desc: 'Embed automation directly into your product with a fully customizable experience.',
    },
    {
        icon: Zap,
        iconBg: 'bg-violet-50 text-violet-600',
        title: 'Built-in monitoring',
        desc: 'Track every action in one place. See what\u2019s working, what\u2019s failing, and what needs attention.',
    },
];

const EmbedImageSelector = ({ appCount }) => {
    const totalApps = appCount ? `${+appCount + 300}+` : '2200+';
    return (
        <div className="container">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                        Everything you need to own the integration layer
                    </h2>
                    <p className="text-gray-600 text-xl leading-relaxed">
                        Your users connect their apps, and automate across them, all inside your product.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#EFEAFE] p-8 md:px-12 md:py-20 flex flex-col gap-8 justify-between">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                                Enable your users to build multi-step workflows
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Embed a visual automation builder that enables users to create multi-step workflows
                                using triggers, actions, and conditions across {totalApps} apps.
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
