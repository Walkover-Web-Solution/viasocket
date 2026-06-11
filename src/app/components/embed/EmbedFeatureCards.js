import { Sparkles, Webhook, Puzzle } from 'lucide-react';

const CARDS = [
    {
        title: 'Actions for AI',
        desc: 'Enable AI agents to trigger workflows and complete tasks across your connected apps.',
        bg: 'bg-gradient-to-br from-[#1a0b3d] to-[#2d0f5e]',
        iconBg: 'bg-white/10 text-white',
        icon: Sparkles,
    },
    {
        title: 'Actions via Webhook',
        desc: 'Trigger workflows instantly from webhook events and automate backend processes.',
        bg: 'bg-gradient-to-br from-[#0a1733] to-[#0f2a4d]',
        iconBg: 'bg-white/10 text-white',
        icon: Webhook,
    },
    {
        title: 'App Integrations',
        desc: 'Give users access to 2,200+ apps and powerful workflow automation.',
        bg: 'bg-gradient-to-br from-[#0a2419] to-[#0f3d2a]',
        iconBg: 'bg-white/10 text-white',
        icon: Puzzle,
    },
];

export default function EmbedFeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                    <div
                        key={i}
                        className={`${card.bg} text-white p-6 py-9 flex items-start gap-5 relative group rounded-lg`}
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
                    </div>
                );
            })}
        </div>
    );
}
