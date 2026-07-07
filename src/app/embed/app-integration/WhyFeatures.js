'use client';

import { FileText, Check, LayoutTemplate, Package, Lock, LayoutGrid } from 'lucide-react';

export default function WhyFeatures({ appCount }) {
    const features = [
        {
            icon: LayoutTemplate,
            iconBg: 'bg-[#d1fae5] text-[#059669]',
            title: 'Visual Workflows Builder',
            desc: 'A drag-and-drop builder for creating workflows without code.',
        },
        {
            icon: Package,
            iconBg: 'bg-[#dbeafe] text-[#2563eb]',
            title: `${appCount + 300}+ apps ready to use`,
            desc: 'Connect popular apps instantly with pre-built integrations.',
        },
        {
            icon: Lock,
            iconBg: 'bg-[#dcfce7] text-[#16a34a]',
            title: 'Built-In user Authentication',
            desc: 'Users securely connect their own accounts without leaving your product.',
        },
        {
            icon: LayoutGrid,
            iconBg: 'bg-[#fef3c7] text-[#d97706]',
            title: 'Plugin Builder',
            desc: 'Add your app as a trigger or action in user workflows.',
        },
    ];
    return (
        <div className="container flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h2 className="h2">Built-In Capabilities for Embedded Integrations</h2>
                <p className="text-lg md:text-xl">
                    The Building blocks that enable users to connect apps, build workflows, and automate your product.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: differentiator hero card */}
                <div className="bg-[#ecfdf5] border border-[#a7f3d0] p-8 md:px-12 md:py-20 flex flex-col gap-8 justify-between">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                            Users build automations inside your product
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            Let users connect their apps and build workflows without leaving your product.
                        </p>
                    </div>

                    <div className="mt-auto flex items-center gap-4 pt-8">
                        <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#059669] via-[#10b981] to-[#34d399] flex items-center justify-center shrink-0 rounded-[10px] relative animate-feat-spark-glow">
                            <div className="absolute -inset-1.5 rounded-[14px] bg-[radial-gradient(circle,rgba(5,150,105,0.35)_0%,transparent_70%)] z-0 animate-feat-spark-halo pointer-events-none" />
                            <FileText
                                className="w-7 h-7 text-white relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] animate-feat-spark-float"
                                strokeWidth={2}
                            />
                        </div>
                        <div
                            className="shrink-0 w-[30px] h-1.5 animate-feat-connector-flow"
                            style={{
                                backgroundImage:
                                    'linear-gradient(90deg, #10b981 0%, #10b981 50%, transparent 50%, transparent 100%)',
                                backgroundSize: '6px 2px',
                                backgroundRepeat: 'repeat-x',
                                backgroundPosition: '0 50%',
                            }}
                        />
                        <div className="flex-1 bg-white border border-[#a7f3d0] p-4 flex flex-col gap-2 rounded-md shadow-[0_4px_14px_rgba(5,150,105,0.1)]">
                            <div className="flex items-center gap-2 text-base text-gray-700 font-medium leading-none animate-feat-item-pulse">
                                <span className="text-gray-500 font-normal text-sm min-w-[14px]">1.</span>
                                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#059669">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="12" cy="12" r="4" fill="#fff" />
                                    </svg>
                                </span>
                                Trigger: New record
                            </div>
                            <div className="flex items-center gap-2 text-base text-gray-700 font-medium leading-none animate-feat-item-pulse animate-feat-item-pulse-delay-1">
                                <span className="text-gray-500 font-normal text-sm min-w-[14px]">2.</span>
                                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ea4335">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </span>
                                Send via Gmail
                            </div>
                            <div className="flex items-center gap-2 text-base text-gray-700 font-medium leading-none animate-feat-item-pulse animate-feat-item-pulse-delay-2">
                                <span className="text-gray-500 font-normal text-sm min-w-[14px]">3.</span>
                                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#4A154B">
                                        <path d="M5 15a2.5 2.5 0 11-2.5-2.5H5V15zm1.25 0a2.5 2.5 0 115 0v6.5a2.5 2.5 0 11-5 0V15zM8.75 5a2.5 2.5 0 11-2.5 2.5V5h2.5zM8.75 6.25a2.5 2.5 0 110 5h-6.25a2.5 2.5 0 110-5h6.25z" />
                                    </svg>
                                </span>
                                Post to Slack
                            </div>
                        </div>
                        <div className="w-7 h-7 rounded-full border border-[#059669] flex items-center justify-center text-white shrink-0 bg-[#059669] animate-feat-check-cycle">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* RIGHT: 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 p-[28px_26px] flex flex-col gap-2.5 transition-all duration-150 hover:border-black/[0.14] hover:shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
                            >
                                <div
                                    className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-2 shrink-0 ${f.iconBg}`}
                                >
                                    <Icon className="w-[22px] h-[22px]" strokeWidth={2} />
                                </div>
                                <h4 className="font-medium text-gray-900 text-lg sm:text-xl">{f.title}</h4>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
