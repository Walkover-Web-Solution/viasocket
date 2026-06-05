'use client';

import { Star, Zap, Mail, User, MessageSquare, Check, Lock, TrendingUp, Code2, Package } from 'lucide-react';

const FEATURES = [
    { icon: Lock, title: 'Per-user isolation', desc: 'Scoped to a single user.' },
    { icon: TrendingUp, title: 'Reliable delivery', desc: 'Automatic retries.' },
    { icon: Code2, title: 'Any language', desc: 'Plain HTTP POST.' },
    { icon: Package, title: 'Any app', desc: '2500+ connectors.' },
];

export default function WebhookFeatureHighlights() {
    return (
        <section className="section sec-flush" id="why">
            <div className="wrap">
                <h2 className="sec-h2" style={{ maxWidth: 600, marginBottom: 32 }}>
                    Everything you need to trigger app actions from your server
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-[#e6f7f5] border border-[#b3e8e2] p-8 flex flex-col gap-3">
                        <span className="inline-flex items-center gap-1.5 bg-white border border-[#9de0d8] text-[#0d6e6e] text-xs font-medium py-1 px-3 rounded-full w-fit">
                            <Star size={13} className="text-[#0d9488]" />
                            Our Differentiator
                        </span>
                        <h3 className="text-xl font-bold">One webhook call. Unlimited automations.</h3>
                        <div className="flex items-center gap-3 pt-4">
                            <div className="w-12 h-12 bg-[#0d9488] flex items-center justify-center rounded-lg">
                                <Zap size={24} className="text-white" />
                            </div>
                            <div className="flex-1 bg-white border border-[#b3e8e2] p-3 rounded flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-xs">
                                    <Mail size={14} color="#ea4335" /> Send Email
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <User size={14} color="#ff7a59" /> Add to CRM
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <MessageSquare size={14} color="#4A154B" /> Notify Slack
                                </div>
                            </div>
                            <div className="w-7 h-7 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#d1d5db] bg-white">
                                <Check size={12} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {FEATURES.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="bg-white border border-[#e5e7eb] p-6">
                                    <Icon size={22} />
                                    <h4 className="text-sm font-bold mt-2">{f.title}</h4>
                                    <p className="text-xs text-gray-500">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
