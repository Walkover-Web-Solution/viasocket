'use client';
import AiWorkflowDemo from '@/components/AiWorkflowDemo/AiWorkflowDemo';

export default function AIWorkflows() {
    return (
        <section
            id="ai-workflows"
            className="relative bg-white text-[#111] py-[120px] lg:py-[130px] overflow-hidden container"
        >
            {/* Grid bg */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(0,0,0,0.042)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.042)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)]"
            />
            {/* Glow */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none aiwf-glow-pulse"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(168,32,13,0.13) 0%, transparent 68%), radial-gradient(ellipse 40% 35% at 50% 50%, rgba(168,32,13,0.07) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 px-5 lg:px-10 text-center">
                <div className="inline-block text-accent text-sm font-bold tracking-[0.16em] uppercase mb-5">
                    AI WORKFLOWS
                </div>
                <h2 className="h2 mb-6">
                    Build powerful workflows.
                    In seconds, <br /> <span className="text-accent">with AI.</span>
                </h2>

                <AiWorkflowDemo />
            </div>
        </section>
    );
}
