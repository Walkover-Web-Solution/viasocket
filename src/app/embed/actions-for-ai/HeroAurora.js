'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AgentDiagram from './AgentDiagram';
import HeroContent from './HeroContent';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';

const AI_AGENTS = [
    {
        name: 'Claude',
        icon: (
            <Image
                src="https://stuff.thingsofbrand.com/claude.ai/images/img6_claude.png"
                alt="Claude"
                fill
                unoptimized
                className="object-cover rounded-full p-2"
            />
        ),
    },
    {
        name: 'ChatGPT',
        icon: (
            <Image
                src="https://stuff.thingsofbrand.com/openai.com/images/img6299ba7193_openai.jpg"
                alt="ChatGPT"
                fill
                unoptimized
                className="object-cover rounded-full p-2"
            />
        ),
    },
    {
        name: 'Gemini',
        icon: (
            <Image
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SparkIcon_.max-1440x810.png"
                alt="Gemini"
                fill
                unoptimized
                className="object-cover rounded-full p-2"
            />
        ),
    },
];

export default function HeroAurora({ appCount }) {
    const [agentIdx, setAgentIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setAgentIdx((i) => (i + 1) % AI_AGENTS.length), 2200);
        return () => clearInterval(id);
    }, []);

    const agent = AI_AGENTS[agentIdx];

    return (
        <>
            <section className="relative bg-transparent container">
                <EmbedBreadcrumbs currentPage="Action for AI" />
                <div className="relative flex items-center justify-center min-h-[520px] overflow-hidden border border-white/10 bg-[#1A0A3E]">
                    <div className="relative z-[2] w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 py-16 lg:px-12 lg:py-24">
                        <HeroContent agent={agent} appCount={appCount} />

                        <AgentDiagram agent={agent} />
                    </div>
                </div>
            </section>
        </>
    );
}
