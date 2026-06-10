'use client';

import { Star, Phone, Mail, User, MessageSquare, Check, Lock, TrendingUp, Code2, Package } from 'lucide-react';

const FEATURES = [
    {
        icon: Lock,
        iconBg: 'bg-green-100 text-green-600',
        title: 'Per-user isolation',
        desc: "Each webhook URL is scoped to a single users connected apps. Your POST to user A never touches user B's data.",
    },
    {
        icon: TrendingUp,
        iconBg: 'bg-blue-100 text-blue-600',
        title: 'Reliable delivery with retries',
        desc: 'Automatic retries with exponential backoff ensure every event reaches its destination, even when downstream apps are slow.',
    },
    {
        icon: Code2,
        iconBg: 'bg-amber-100 text-amber-600',
        title: 'Work with any backend or language',
        desc: 'A plain HTTP POST, use cURL Python, Node.js, Go or any language that can make HTTP requests.',
    },
    {
        icon: Package,
        iconBg: 'bg-purple-100 text-purple-600',
        title: 'Connect any app in minutes',
        desc: 'Pre-build connectors to 2500+ apps. Your webhook payload maps to any action across every connected app.',
    },
];

export default function WebhookFeatureHighlights({ appCount }) {
    const features = FEATURES.map((f) =>
        f.title === 'Connect any app in minutes'
            ? { ...f, desc: `Pre-build connectors to ${appCount + 300}+ apps. Your webhook payload maps to any action across every connected app.` }
            : f
    );

    return (
        <div className="container flex flex-col gap-6">
            <h2 className="h2">Everything you need to trigger app actions from your server</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-[#eff6ff] border border-[#dbeafe] p-8 flex flex-col gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-white border border-[#bfdbfe] text-[#1d4ed8] text-xs font-medium py-1 px-3 rounded-full w-fit">
                        <Star size={13} className="text-[#0d9488]" />
                        Our Differentiator
                    </span>
                    <h3 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                        One webhook call. Unlimited automations.
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        POST a single event and viaSocket fans it out across every automation your user has configured.{' '}
                        <br /> across any app, any step count.
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] via-[#34d399] to-[#6ee7b7] flex items-center justify-center rounded-lg animate-feat-spark-glow relative z-10">
                                <Phone
                                    size={24}
                                    className="text-white relative z-10 animate-feat-spark-float drop-shadow-sm"
                                />
                            </div>
                            <div className="absolute inset-[-6px] rounded-[14px] bg-[radial-gradient(circle,rgba(13,148,136,.35)_0%,transparent_70%)] animate-feat-spark-halo pointer-events-none z-0" />
                        </div>
                        <div className="w-[30px] h-[6px] bg-[linear-gradient(90deg,#5eead4_0%,#5eead4_50%,transparent_50%,transparent_100%)] bg-[length:6px_2px] bg-repeat-x bg-[position:0_50%] animate-feat-connector-flow flex-shrink-0" />
                        <div className="flex-1 bg-white border border-[#bfdbfe] p-4 rounded flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-base animate-feat-item-pulse">
                                <Mail size={14} color="#ea4335" /> Send Email
                            </div>
                            <div className="flex items-center gap-2 text-base animate-feat-item-pulse animate-feat-item-pulse-delay-1">
                                <User size={14} color="#ff7a59" /> Add to CRM
                            </div>
                            <div className="flex items-center gap-2 text-base animate-feat-item-pulse animate-feat-item-pulse-delay-2">
                                <MessageSquare size={14} color="#4A154B" /> Notify Slack
                            </div>
                        </div>
                        <div className="w-7 h-7 rounded-full border border-[#22c55e] flex items-center justify-center text-white bg-[#22c55e] animate-feat-check-cycle">
                            <Check size={12} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div key={i} className="bg-white border border-gray-200 p-6 flex flex-col gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.iconBg}`}>
                                    <Icon size={22} />
                                </div>
                                <h4 className="font-medium text-gray-900 text-xl">{f.title}</h4>
                                <p className="text-lg text-gray-600 leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
