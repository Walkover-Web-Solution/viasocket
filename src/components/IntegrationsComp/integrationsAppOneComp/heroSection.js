'use client';
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Plug, Sparkles, Workflow, Layers } from "lucide-react";
import { handleRedirect } from "@/utils/handleRedirection";
import FeatureChips from "@/components/featureChips/featureChips";
import { LiveWorkflowCanvas, ACCENT_COLORS } from "@/app/components/new-home/LiveWorkflowCanvas";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

// ─── Hero Section ────────────────────────────────────────────────────
export default function HeroSection({ appOneDetails, useCasesCardsData, headings, appName }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const usecases = useCasesCardsData || [
        { title: "AI-Powered Data Processing", description: "Use AI to classify, enrich, and transform incoming data before routing it to the right destination." },
        { title: "Automated Report Generation", description: "Pull data from multiple sources, compile insights, and deliver reports on a schedule — hands-free." },
        { title: "Multi-Step Task Automation", description: "Chain actions across apps with conditional logic to handle complex business processes end to end." },
    ];

    return (
        <section className="section pt-8 lg:pt-4 pb-40">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center justify-between">
                <div className="flex flex-col gap-12 lg:gap-20">
                    <Breadcrumb parent="Integrations" child1={appOneDetails?.name} parentLink={`/integrations`} />

                    <div className="flex-1 min-w-0">
                        {/* App icon + label */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="app-icon-box w-14 h-14 border primary-border bg-[var(--vs-surface)]">
                                <Image alt={appOneDetails?.name || 'App'} src={appOneDetails?.iconurl || 'https://placehold.co/40x40'} width={32} height={32} />
                            </div>
                            <div className="label-text-xs flex items-center gap-2">
                                <Plug size={12} />
                                INTEGRATION
                            </div>
                        </div>

                        {/* Feature Chips */}
                        <div className="mb-6">
                            <FeatureChips chips={[
                                { icon: <Sparkles size={12} />, label: "AI-Powered Logic", color: "#2563eb" },
                                { icon: <Workflow size={12} />, label: "Serverless Workflows", color: "#8b5cf6" },
                                { icon: <Layers size={12} />, label: "Multi-Step Automation", color: "#10b981" },
                            ]} />
                        </div>

                        {/* Headline */}
                        <h1 className="heading1 mb-2.5 font-semibold">
                            {(() => {
                                const appname = appName || appOneDetails?.name;
                                const h1 = headings?.h1;
                                if (!h1) {
                                    return (
                                        <>
                                            <span>Automate </span>
                                            <span className="font-semibold transition-colors duration-[600ms] ease-in-out" style={{ color: ACCENT_COLORS[activeIndex % ACCENT_COLORS.length] }}>{appname || 'App'}</span>
                                            <br />
                                            <span> Workflows with AI Logic</span>
                                        </>
                                    );
                                }
                                if (!appname || !h1.toLowerCase().includes(appname.toLowerCase())) {
                                    return <span>{h1}</span>;
                                }
                                const regex = new RegExp(`(${appname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
                                const parts = h1.split(regex);
                                return parts.map((part, i) =>
                                    regex.test(part)
                                        ? <span key={i} className="font-semibold transition-colors duration-[600ms] ease-in-out" style={{ color: ACCENT_COLORS[activeIndex % ACCENT_COLORS.length] }}>{part}</span>
                                        : <span key={i}>{part}</span>
                                );
                            })()}
                        </h1>

                        {/* Subtitle */}
                        <p className="sub-heading1 max-w-2xl mb-8">
                            {headings?.subheadline || `Eliminate repetitive tasks and manual data entry. Build automated workflows with viaSocket's AI agents and serverless logic — no code required.`}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={(e) => handleRedirect(e, `https://flow.viasocket.com/connect/${appOneDetails?.rowid}?`)}
                                className="primary-button"
                                rel="nofollow"
                            >
                                Connect to {appOneDetails?.name || 'App'}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <LiveWorkflowCanvas usecases={usecases} onActiveChange={setActiveIndex} />
                </div>
            </div>
        </section>
    );
}
