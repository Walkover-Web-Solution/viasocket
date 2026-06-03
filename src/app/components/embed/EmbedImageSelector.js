import { Lock, Box, FileText, Zap, Plus, Check } from 'lucide-react';

const FEATURES = [
    {
        icon: Lock,
        iconBg: 'bg-emerald-50 text-emerald-600',
        title: 'End-user auth inside your product',
        desc: 'Users connect via OAuth without leaving your product. Secure, isolated, and seamless.',
    },
    {
        icon: Box,
        iconBg: 'bg-indigo-50 text-indigo-600',
        title: 'Connect any app in minutes',
        desc: 'Pre-built connectors and OAuth flows to thousands of apps.',
    },
    {
        icon: FileText,
        iconBg: 'bg-amber-50 text-amber-600',
        title: 'Designed to feel built-in',
        desc: 'Match the embed to your brand identity. It renders natively inside your product.',
    },
    {
        icon: Zap,
        iconBg: 'bg-violet-50 text-violet-600',
        title: 'Built-in observability',
        desc: 'Per-action metrics, failure rates. See what\u2019s running, what\u2019s failing, and what to fix. No extra setup.',
    },
];

const STEPS = [
    { num: 1, color: 'text-rose-500', label: 'Create Contact' },
    { num: 2, color: 'text-red-500', label: 'Send Email' },
    { num: 3, color: 'text-green-500', label: 'Update Record' },
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
                                Give your users the access to build Multi-step flows
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Embed the visual builder and let your users chain triggers, actions and conditions
                                across {totalApps} apps.
                                <br />
                                No code, no support tickets, no waiting on your roadmap.
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
