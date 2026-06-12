import Link from 'next/link';
import { Sparkles, Webhook, Puzzle, ArrowUpRight } from 'lucide-react';

const CARDS = [
    {
        title: 'Actions for AI',
        desc: 'Enable AI agents to trigger workflows and complete tasks across your connected apps.',
        bg: 'bg-gradient-to-br from-[#1a0b3d] to-[#2d0f5e]',
        iconBg: 'bg-white/10 text-white',
        icon: Sparkles,
        href: '/embed/actions-for-ai',
    },
    {
        title: 'Actions via Webhook',
        desc: 'Trigger workflows instantly from webhook events and automate backend processes.',
        bg: 'bg-gradient-to-br from-[#0a1733] to-[#0f2a4d]',
        iconBg: 'bg-white/10 text-white',
        icon: Webhook,
        href: '/embed/actions-via-webhook',
    },
    {
        title: 'App Integrations',
        desc: 'Give users access to 2,200+ apps and powerful workflow automation.',
        bg: 'bg-gradient-to-br from-[#0a2419] to-[#0f3d2a]',
        iconBg: 'bg-white/10 text-white',
        icon: Puzzle,
        href: '/embed/app-integrations',
    },
];

export default function EmbedFeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                    <Link
                        key={i}
                        href={card.href}
                        className={`${card.bg} text-white p-6 py-9 flex items-start gap-5 relative group rounded-lg overflow-hidden`}
                    >
                        <div
                            className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}
                        >
                            <Icon size={26} />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <h3 className="text-2xl font-semibold">{card.title}</h3>
                            <p className="text-base text-white/70">{card.desc}</p>
                        </div>
                        <span className="absolute top-4 right-4 w-8 h-8 p-2 rounded-full bg-white text-gray-900 flex items-center justify-center opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200">
                            <ArrowUpRight size={16} strokeWidth={2.2} />
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
