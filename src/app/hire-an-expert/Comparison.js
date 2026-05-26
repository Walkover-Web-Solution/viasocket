'use client';

import { ArrowRight, Check } from 'lucide-react';
import Section from './Section';

const COMPARISON = [
    { feature: 'Vetted automation experts', freelancer: 'Hit or miss', viasocket: 'Top 3% only' },
    { feature: 'Fixed, upfront pricing', freelancer: 'Hourly creep', viasocket: 'AI-scoped quote' },
    { feature: 'Time to delivery', freelancer: '3–6 weeks', viasocket: '3–7 days' },
    { feature: 'Money-back guarantee', freelancer: 'Rarely', viasocket: '14 days' },
    { feature: 'Ongoing monitoring', freelancer: 'Extra cost', viasocket: 'Optional add-on' },
];

export default function Comparison({ onHire }) {
    return (
        <Section
            eyebrow="Why viaSocket"
            title="Most platforms give you tools. We deliver solutions."
            subtitle=""
            align="left"
        >
            <div>
                <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm font-semibold text-gray-800">
                    <div className="px-5 py-3.5">Feature</div>
                    <div className="px-5 py-3.5">Freelancer</div>
                    <div className="px-5 py-3.5 bg-[#F5F5F5]">viaSocket Expert</div>
                </div>
                {COMPARISON.map((row, i) => (
                    <div
                        key={row.feature}
                        className={`grid grid-cols-[1.4fr_1fr_1fr] items-stretch border-t border-[#ececec] ${
                            i === COMPARISON.length - 1 ? 'border-b' : ''
                        }`}
                    >
                        <div className="px-5 py-5 flex items-center gap-3 font-medium text-[#6F6F6F]">
                            <Check className="w-[18px] h-[18px] text-[#6F6F6F] flex-shrink-0" strokeWidth={2.5} />
                            {row.feature}
                        </div>
                        <div className="px-5 py-5 text-[#A8A8A8] flex items-center">{row.freelancer}</div>
                        <div className="px-5 py-5 bg-[#F5F5F5] text-gray-800 font-medium flex items-center">
                            {row.viasocket}
                        </div>
                    </div>
                ))}

                <div className="mt-10 flex items-center gap-5 flex-wrap">
                    <p className="text-base font-medium m-0">Ready to skip the freelancer roulette?</p>
                    <button
                        onClick={onHire}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-black text-white text-sm font-semibold rounded-full transition-colors group"
                    >
                        Hire an expert
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </Section>
    );
}
