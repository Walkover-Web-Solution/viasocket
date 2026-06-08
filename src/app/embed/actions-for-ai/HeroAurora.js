'use client';

import { useEffect, useState } from 'react';
import AgentDiagram from './AgentDiagram';
import HeroContent from './HeroContent';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';

const AI_AGENTS = [
    {
        name: 'Claude',
        icon: (
            <img
                src="https://stuff.thingsofbrand.com/claude.ai/images/img6_claude.png"
                alt="Claude"
                className="w-full h-full object-cover rounded-full"
            />
        ),
    },
    {
        name: 'ChatGPT',
        icon: (
            <img
                src="https://stuff.thingsofbrand.com/openai.com/images/img6299ba7193_openai.jpg"
                alt="ChatGPT"
                className="w-full h-full object-cover rounded-full"
            />
        ),
    },
    {
        name: 'Gemini',
        icon: (
            <img
                src="https://stuff.thingsofbrand.com/google.com/images/img6_googleaistudioicon.png"
                alt="Gemini"
                className="w-full h-full object-cover rounded-full"
            />
        ),
    },
    {
        name: 'Copilot',
        icon: (
            <img
                src="https://stuff.thingsofbrand.com/copilot.com/images/img6788164702_copilot.jpg"
                alt="Copilot"
                className="w-full h-full object-cover rounded-full"
            />
        ),
    },
];

export default function HeroAurora() {
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
                <div className="relative flex items-center justify-center min-h-[520px] overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_85%_60%,#3a2a7a_0%,#1f1454_30%,#150a3d_60%,#0f0830_100%)]">
                    <div className="pointer-events-none absolute -left-[8%] -top-[10%] w-[620px] h-[620px] rounded-full opacity-45 blur-[100px] bg-[#4a2fb8]" />
                    <div className="pointer-events-none absolute -right-[6%] top-[30%] w-[540px] h-[540px] rounded-full opacity-55 blur-[100px] bg-[#7a4ff5]" />
                    <div className="pointer-events-none absolute left-[40%] -bottom-[18%] w-[520px] h-[520px] rounded-full opacity-40 blur-[100px] bg-[#5b3fd9]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1.2px,transparent_1.6px)] bg-[length:22px_22px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.1)_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.1)_100%)]" />

                    <div className="relative z-[2] w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 py-16 lg:px-12 lg:py-24">
                        <HeroContent agent={agent} />

                        <AgentDiagram agent={agent} />
                    </div>
                </div>
            </section>
        </>
    );
}
