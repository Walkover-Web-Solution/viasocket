import { ArrowRight } from 'lucide-react';
import N8nSignupCTA from './N8nSignupCTA';

// "2,300+" also appears in N8nDifference and N8nComparisonTable.
// "100,000 tasks/month" also appears in N8nGetStarted and N8nCTABanner.
const HERO = {
    title: 'n8n Alternative for SaaS Builders: Why Teams Choose viaSocket',
    lede: "If you're evaluating n8n alternatives, the right answer depends on what you're actually trying to build. n8n is a workflow automation tool — powerful for internal ops teams running self-hosted pipelines. viaSocket is an Integration Layer: infrastructure that lets your SaaS product offer 2,300+ app integrations to your customers, without your team building or maintaining them.",
    sub: 'Those are different jobs. This page explains the distinction clearly, so you can make the right call.',
    cta: 'Get started free — 100,000 tasks/month',
};

export default function N8nHero() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center py-12 lg:py-20 container">
            <h1 className="h1 text-center max-w-4xl">{HERO.title}</h1>
            <p className="text-base md:text-lg text-center max-w-3xl">{HERO.lede}</p>
            <p className="text-base md:text-lg text-center max-w-3xl">{HERO.sub}</p>

            <N8nSignupCTA className="btn btn-accent flex items-center gap-1 justify-center w-full md:max-w-fit text-center">
                {HERO.cta} <ArrowRight size={14} />
            </N8nSignupCTA>
        </div>
    );
}
