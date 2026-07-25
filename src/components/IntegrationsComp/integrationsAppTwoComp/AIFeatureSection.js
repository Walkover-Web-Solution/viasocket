'use client';
import { ArrowRight, CheckCircle } from 'lucide-react';
import AiWorkflowDemo from '@/components/AiWorkflowDemo/AiWorkflowDemo';

export default function AIFeatureSection() {
    const features = ['No coding required', 'Review before publishing', 'Works with 2,000+ apps'];

    return (
        <div className="container">
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-20">
                {/* Left: live AI workflow builder demo */}
                <div className="w-full md:w-[50%] shrink-0">
                    <AiWorkflowDemo compact />
                </div>

                {/* Right: content on light background */}
                <div className="flex flex-col justify-center gap-6 w-full md:w-[50%]">
                    <span className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest">
                        <span>&#9670;</span>
                        AI Workflow Builder
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                        From idea to automation.<br />
                        <span className="text-accent">AI will build it for you</span>
                    </h2>

                    <p className="text-gray-500 text-base leading-relaxed">
                        Just describe the task in plain English. viaSocket AI selects the right apps, builds the workflow, maps the fields, and prepares everything for review before you publish.
                    </p>

                    <div className="flex flex-wrap items-center">
                        {features.map((label, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-gray-600 text-sm">
                                {i > 0 && <span className="mx-3 text-gray-300">|</span>}
                                <CheckCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                {label}
                            </span>
                        ))}
                    </div>

                    <a
                        href={`${process.env.NEXT_PUBLIC_FLOW_URL || 'https://app.viasocket.com'}/ai`}
                        className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors self-start mt-2"
                    >
                        Create with AI
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}
