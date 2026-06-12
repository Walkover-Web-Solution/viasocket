import Link from 'next/link';
import { Sparkles, Webhook, Puzzle } from 'lucide-react';

const ALL_ITEMS = [
    {
        slug: 'actions-for-ai',
        href: '/embed/actions-for-ai',
        title: 'Actions for AI',
        description: 'Enable AI agents to trigger workflows and complete tasks across your connected apps.',
        bg: 'bg-gradient-to-br from-[#1a0b3d] to-[#2d0f5e]',
        iconBg: 'bg-white/10 text-white',
        icon: Sparkles,
    },
    {
        slug: 'actions-via-webhook',
        href: '/embed/actions-via-webhook',
        title: 'Actions via Webhook',
        description: 'Trigger workflows instantly from webhook events and automate backend processes.',
        bg: 'bg-gradient-to-br from-[#0a1733] to-[#0f2a4d]',
        iconBg: 'bg-white/10 text-white',
        icon: Webhook,
    },
    {
        slug: 'app-integrations',
        href: '/embed/app-integrations',
        title: 'App Integrations',
        description: 'Give users access to 2,200+ apps and powerful workflow automation.',
        bg: 'bg-gradient-to-br from-[#0a2419] to-[#0f3d2a]',
        iconBg: 'bg-white/10 text-white',
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
        <section className="container p-6 md:p-12 bg-white">
            <div className="mb-10 text-center">
                <h3 className="text-[26px] md:text-[34px] font-medium text-[#0a0a0a] tracking-[-0.7px] mb-2 leading-[1.2]">
                    {heading}
                </h3>
                <p className="text-[15px] text-gray-500 font-normal">{subheading}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${item.bg} text-white p-6 py-9 flex items-start gap-5 relative group rounded-lg no-underline`}
                            target="_blank"
                        >
                            <div
                                className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}
                            >
                                <Icon size={26} />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <h3 className="text-2xl font-semibold">{item.title}</h3>
                                <p className="text-base text-white/70">{item.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
