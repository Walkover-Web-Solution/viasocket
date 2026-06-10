import Link from 'next/link';
import { Sparkles, Webhook, Puzzle, ArrowUpRight } from 'lucide-react';

const ALL_ITEMS = [
    {
        slug: 'actions-for-ai',
        href: '/embed/actions-for-ai',
        title: 'Actions for AI',
        description: 'Turn your product into an AI-ready platform.',
        bg: 'bg-gradient-to-br from-[#1a0b3d] to-[#2d0f5e]',
        icon: Sparkles,
    },
    {
        slug: 'action-via-webhook',
        href: '/embed/action-via-webhook',
        title: 'Actions via Webhook',
        description: 'Need server-to-server automation?',
        bg: 'bg-gradient-to-br from-[#0a1733] to-[#0f2a4d]',
        icon: Webhook,
    },
    {
        slug: 'app-integrations',
        href: '/embed/app-integrations',
        title: 'App Integration',
        description: 'Want to make your SaaS AI-ready?',
        bg: 'bg-gradient-to-br from-[#0a2419] to-[#0f3d2a]',
        icon: Puzzle,
    },
];

export default function RelatedEmbeds({
    heading = 'Building something different?',
    subheading = 'Pick the right tool for the job.',
    currentPage,
}) {
    const items = ALL_ITEMS.filter((item) => item.slug !== currentPage);
    return (
        <section className="w-full container bg-white p-6">
            <div className="max-w-[1180px] mx-auto p-6">
                <div className="mb-10 text-center">
                    <h3 className="text-[26px] md:text-[34px] font-medium text-[#0a0a0a] tracking-[-0.7px] mb-2 leading-[1.2]">
                        {heading}
                    </h3>
                    <p className="text-[15px] text-gray-500 font-normal">{subheading}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${item.bg} text-white p-6 py-9 flex items-start gap-5 relative group rounded-lg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] overflow-hidden`}
                                target="_blank"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <Icon size={26} className="text-white" />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <h4 className="text-2xl font-semibold text-white">{item.title}</h4>
                                    <p className="text-base text-white/70">{item.description}</p>
                                </div>
                                <div className="absolute top-6 right-6 transition-all bg-white p-2 rounded-full duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-[#0a0a0a]">
                                    <ArrowUpRight size={20} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
