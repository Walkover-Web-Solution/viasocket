'use client';

import { Sparkles, Tag } from 'lucide-react';
import Section from './Section';

const CASE_STUDIES = [
    {
        tint: 'red',
        tag: 'SaaS · CRM SYNC',
        desc: 'Automated lead routing between HubSpot, Slack and Notion — replaced 4 spreadsheets and 2 weekly meetings.',
        metric: '92%',
        sub: 'manual work removed',
    },
    {
        tint: 'cream',
        tag: 'E-COMMERCE · OPS',
        desc: 'Shopify → ShipStation → Klaviyo flow that updates inventory, tags customers, and sends post-purchase emails.',
        metric: '3.4x',
        sub: 'fulfilment speed',
    },
    {
        tint: 'neutral',
        tag: 'AGENCY · REPORTING',
        desc: 'Client reporting pipeline pulling from Google Ads, Meta and GA4 into a single Airtable dashboard.',
        metric: '18h',
        sub: 'saved per week',
    },
    {
        tint: 'blue',
        tag: 'FINTECH · COMPLIANCE',
        desc: 'KYC documents auto-validated, routed to reviewers, and archived to S3 with full audit trail.',
        metric: '99.6%',
        sub: 'audit pass rate',
    },
];

const TINTS = {
    red: 'bg-[#fdf2f0] border-[#f7d4ce]',
    cream: 'bg-[#fdf8eb] border-[#f5e6c0]',
    neutral: 'bg-[#fafafa] border-[#ececec]',
    blue: 'bg-[#f0f6fc] border-[#d8e6f5]',
};

export default function CaseStudies() {
    return (
        <Section
            eyebrow="Case studies"
            title="Real outcomes from real teams"
            subtitle="A small sample of what our experts have shipped this quarter."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {CASE_STUDIES.map((c) => (
                    <div
                        key={c.tag}
                        className="bg-white border border-[#ececec] p-6 flex flex-col shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                    >
                        <span className="inline-flex items-center gap-2 text-[#A8200D] text-xs font-semibold tracking-wider uppercase mb-4">
                            <Tag className="w-3.5 h-3.5" /> {c.tag}
                        </span>
                        <div
                            className={`w-full mb-5 px-5 py-6 flex items-center justify-center min-h-[200px] border ${TINTS[c.tint]}`}
                        >
                            <Sparkles className="w-16 h-16 text-accent/30" />
                        </div>
                        <p className="text-sm text-[#6b7280] leading-[1.5] mb-6">{c.desc}</p>
                        <div className="flex items-baseline gap-2.5 mt-auto">
                            <span className="text-[52px] font-semibold text-[#1a1a1a] leading-none tracking-[-1.4px]">
                                {c.metric}
                            </span>
                            <span className="text-[15px] font-medium">{c.sub}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
