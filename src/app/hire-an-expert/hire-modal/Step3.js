'use client';

import { useState } from 'react';
import { Check, CheckCircle2, ChevronDown, Clock, FileText, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { ADDONS } from './addons';

export default function Step3({ selectedAddons, toggleAddon, basePrice, total }) {
    const [openCard, setOpenCard] = useState('scope');

    const cards = [
        {
            id: 'scope',
            icon: FileText,
            title: 'Proposed scope',
            body: 'Build a 2-step Zap-style flow: trigger on HubSpot deal stage change → Slack channel post + Notion page creation + Mailchimp tag. Includes error handling and a 7-day warranty.',
        },
        {
            id: 'timeline',
            icon: Clock,
            title: 'Estimated timeline',
            body: '3–5 business days. Kickoff call within 24 hours of payment. Daily progress updates via Slack.',
        },
        {
            id: 'guarantee',
            icon: ShieldCheck,
            title: "What's included",
            body: 'Live workflow, documentation, 14-day money-back guarantee, and one round of revisions after handover.',
        },
    ];

    return (
        <div className="animate-[hireStepFade_0.32s_cubic-bezier(0.2,0.7,0.2,1)]">
            <div className="flex items-center gap-2.5 mb-2">
                <Sparkles className="w-[22px] h-[22px] text-accent" />
                <h3 className="text-[17px] font-bold text-[#111] tracking-[-0.2px]">Match found · Senior Expert</h3>
            </div>
            <p className="text-[13.5px] text-[#555] mb-4 leading-[1.55]">
                Based on your description, we recommend a fixed-price engagement with a vetted senior expert.
            </p>

            <div className="flex flex-wrap gap-2 mb-[22px]">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] font-semibold bg-green-50 border border-green-200 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 14-day guarantee
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] font-medium bg-[#faf9f4] border border-[#ececec] text-[#222]">
                    HubSpot · Slack · Notion · Mailchimp
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] font-medium bg-[#faf9f4] border border-[#ececec] text-[#222]">
                    Senior tier
                </span>
            </div>

            {/* Pricing card */}
            <div className="border border-[#ececec] rounded-xl mb-3">
                <div className="flex items-center justify-between p-4 border-b border-[#ececec]">
                    <div className="flex items-center gap-2.5 text-sm font-bold text-[#111]">
                        <Tag className="w-4 h-4 text-accent" /> Fixed project price
                    </div>
                    <div className="text-[22px] font-bold text-accent tracking-[-0.5px]">${total}</div>
                </div>
                <div className="px-4 py-3.5">
                    <div className="flex justify-between items-center py-1.5 text-[13.5px] text-[#555]">
                        <span>Base scope</span>
                        <strong className="text-[#111] font-semibold">${basePrice}</strong>
                    </div>
                    {selectedAddons.map((id) => {
                        const a = ADDONS.find((x) => x.id === id);
                        return (
                            <div
                                key={id}
                                className="flex justify-between items-center py-1.5 text-[13.5px] text-[#555]"
                            >
                                <span>{a.title}</span>
                                <strong className="text-[#111] font-semibold">{a.price}</strong>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Collapsible cards */}
            {cards.map((c) => {
                const open = openCard === c.id;
                return (
                    <div key={c.id} className={`border border-[#ececec] rounded-xl mb-3 overflow-hidden`}>
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer select-none gap-3"
                            onClick={() => setOpenCard(open ? null : c.id)}
                        >
                            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111]">
                                <c.icon className="w-4 h-4 text-[#555] flex-shrink-0" /> {c.title}
                            </div>
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-[#555] transition-transform ${open ? 'rotate-180' : ''}`}
                            />
                        </div>
                        {open && <div className="px-4 pb-4 text-[13.5px] text-[#555] leading-[1.6]">{c.body}</div>}
                    </div>
                );
            })}

            {/* Add-ons */}
            <h4 className="text-[15px] font-bold text-[#111] mt-6 mb-3.5 tracking-[-0.2px]">Optional add-ons</h4>
            {ADDONS.map((a) => {
                const on = selectedAddons.includes(a.id);
                return (
                    <div
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={`border rounded-xl p-4 mb-1.5 cursor-pointer transition-all ${
                            on
                                ? 'border-accent bg-[rgba(168,32,13,0.03)]'
                                : 'border-[#ececec] hover:border-[#e2e2e2] hover:bg-[#faf9f4]'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex-shrink-0 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-colors ${
                                    on ? 'bg-accent border-accent' : 'border-[#e2e2e2]'
                                }`}
                            >
                                {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                            <div className="text-sm font-semibold text-[#111] flex-1">{a.title}</div>
                            <span className="text-[13px] font-semibold text-accent bg-[rgba(168,32,13,0.08)] px-2.5 py-0.5 rounded-full">
                                {a.price}
                            </span>
                        </div>
                        <div className="ml-[30px] mt-2.5 flex flex-wrap gap-x-[18px] gap-y-1 text-[12.5px] text-[#555]">
                            {a.features.map((f) => (
                                <span key={f}>
                                    <span className="text-accent font-bold mr-1.5">✓</span>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
