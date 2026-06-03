import { Lock, Box, FileText, Zap, Plus, Check } from 'lucide-react';

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

const STEPS = [
    { num: 1, color: 'text-rose-500', label: 'Create Contact' },
    { num: 2, color: 'text-red-500', label: 'Send Email' },
    { num: 3, color: 'text-green-500', label: 'Update Record' },
];

const EmbedImageSelector = () => {
    return (
        <div className="container">
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                    Everything you need to own the integration layer
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#EFEAFE] p-8 md:px-12 md:py-20 flex flex-col gap-8 justify-between">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                                Enable your users to build multi-step workflows
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Embed a visual automation builder that enables users to create multi-step workflows
                                using triggers, actions, and conditions across 2,500+ apps.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shrink-0">
                                <Plus className="text-white" size={28} strokeWidth={2.5} />
                            </div>
                            <div className="border-t border-dashed border-gray-400 w-6 shrink-0" />
                            <div className="bg-white rounded-lg shadow-md px-4 py-3 flex-1">
                                {STEPS.map((s) => (
                                    <div key={s.num} className="flex items-center gap-3 py-1 text-sm">
                                        <span className="text-gray-400">{s.num}.</span>
                                        <span className={`${s.color}`}>●</span>
                                        <span className="text-gray-800">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="w-9 h-9 p-1 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                <Check className="text-white" size={16} strokeWidth={3} />
                            </div>
                        </div>
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
                                    <h4 className="font-medium text-gray-900 text-lg">{f.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
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
