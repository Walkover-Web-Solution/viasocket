'use client';

import { openAIProvider } from '@/utils/aiProviderUtils';
import Image from 'next/image';

const ChatGPTIcon = ({ className }) => (
    <Image
        src="https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg"
        alt="ChatGPT"
        width={16}
        height={16}
        className={className}
    />
);

const ClaudeIcon = ({ className }) => (
    <Image
        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg"
        alt="Claude AI"
        width={16}
        height={16}
        className={className}
    />
);

const PerplexityIcon = ({ className }) => (
    <Image
        src="https://ico.hugeicons.com/perplexity-ai-stroke-rounded@3x.webp?x=276356447"
        alt="Perplexity AI"
        width={16}
        height={16}
        className={className}
    />
);

const XAIIcon = ({ className }) => (
    <Image
        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/grok-ai-icon.png"
        alt="xAI (Grok)"
        width={16}
        height={16}
        className={className}
    />
);

const AI_PROVIDERS = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        icon: ChatGPTIcon,
    },
    {
        id: 'claude',
        name: 'Claude AI',
        icon: ClaudeIcon,
    },
    {
        id: 'perplexity',
        name: 'Perplexity AI',
        icon: PerplexityIcon,
    },
    {
        id: 'xai',
        name: 'xAI (Grok)',
        icon: XAIIcon,
    },
];

export default function ExploreWithAIButton() {
    const handleProviderClick = (providerId) => {
        openAIProvider(providerId);
    };

    return (
        <div className="flex items-center gap-2 justify-between w-full flex-wrap">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-2 whitespace-nowrap">Explore with AI</p>
            <div className="flex gap-1 items-center md:gap-2">
                {AI_PROVIDERS.map((provider) => {
                    const IconComponent = provider.icon;
                    return (
                        <div key={provider.id} className="group relative flex shrink-0">
                            <button
                                onClick={() => handleProviderClick(provider.id)}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
                                title={provider.name}
                                aria-label={provider.name}
                            >
                                <IconComponent className="w-3.5 h-3.5" />
                            </button>
                            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                                {provider.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
