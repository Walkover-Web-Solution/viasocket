import Link from 'next/link';

const CARDS = [
    {
        title: 'Actions for AI',
        desc: 'Building an AI Agent or Chatbot?',
        bg: 'bg-gradient-to-br from-[#1a0b3d] to-[#2d0f5e]',
        href: '#ai_agent',
    },
    {
        title: 'Actions via Webhook',
        desc: 'Need server-to-server automations?',
        bg: 'bg-gradient-to-br from-[#0a1733] to-[#0f2a4d]',
        href: '#pricing',
    },
    {
        title: 'App Integrations',
        desc: 'Enable your users to build automatons?',
        bg: 'bg-gradient-to-br from-[#0a2419] to-[#0f3d2a]',
        href: '#pricing',
    },
];

export default function EmbedFeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {CARDS.map((card, i) => (
                <Link
                    key={i}
                    href={card.href}
                    className={`${card.bg} text-white p-8 flex flex-col gap-4 min-h-[180px] relative group`}
                >
                    {/* <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-transparent text-white flex items-center justify-center text-lg border border-white/30 group-hover:bg-white group-hover:text-gray-900 group-hover:border-white transition-colors duration-300">
                        ↗
                    </div> */}
                    <h3 className="text-3xl font-medium pr-12">{card.title}</h3>
                    <p className="text-lg text-white/80">{card.desc}</p>
                </Link>
            ))}
        </div>
    );
}
