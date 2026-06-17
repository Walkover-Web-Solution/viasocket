import Image from 'next/image';
import { Tag } from 'lucide-react';
import Section from './Section';

const CASE_STUDIES = [
    {
        tint: 'red',
        tag: 'Customer Support Automation',
        desc: 'Automated ticket routing across Gmail, Slack, and CRM.',
        metric: '99.9%',
        sub: 'Faster response time',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_image-4.png',
    },
    {
        tint: 'cream',
        tag: 'Lead Routing Automation',
        desc: 'Qualified and routed inbound leads automatically.',
        metric: '3x',
        sub: 'Faster lead assignment',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img7_image-10.png',
    },
    {
        tint: 'neutral',
        tag: 'Approval Workflow Automation',
        desc: 'Automated approvals with real-time status tracking.',
        metric: '85%',
        sub: 'Faster approval cycle',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img0_image-6.png',
    },
    {
        tint: 'blue',
        tag: 'Internal Operations Automation',
        desc: 'Reduced repetitive operational tasks across teams.',
        metric: '18hrs%',
        sub: 'Saved weekly',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/imgb_image-111.png',
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
            title="Workflows built for real operations"
            subtitle="Explore automation workflows designed to reduce manual effort, improve response times, and streamline operations."
        >
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {CASE_STUDIES.map((c) => (
                    <article
                        key={c.tag}
                        data-tint={c.tint}
                        className="bg-white border border-[#ececec] p-6 flex flex-col shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                    >
                        <span className="inline-flex items-center gap-2 text-[#A8200D] text-xs font-semibold tracking-wider uppercase mb-4">
                            <Tag className="w-3.5 h-3.5" /> {c.tag}
                        </span>
                        <div
                            className={`w-full mb-5 px-5 py-6 flex items-center justify-center min-h-[200px] border overflow-hidden ${TINTS[c.tint]}`}
                        >
                            <Image
                                src={c.image}
                                alt={c.tag}
                                width={500}
                                height={400}
                                className="max-w-full max-h-[220px] object-contain"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-sm text-[#6b7280] leading-[1.5] mb-6">{c.desc}</p>
                        <div className="flex items-baseline gap-2.5 mt-auto">
                            <span className="text-[52px] font-semibold text-[#1a1a1a] leading-none tracking-[-1.4px]">
                                {c.metric}
                            </span>
                            <span className="text-base font-medium">{c.sub}</span>
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}
