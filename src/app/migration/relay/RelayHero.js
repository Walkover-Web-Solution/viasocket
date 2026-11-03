import { ArrowRight } from 'lucide-react';
import RelaySignupCTA from './RelaySignupCTA';

// "2,300+" also appears in RelayOffers and RelayComparisonTable.
const HERO = {
    title: 'The Relay.app Alternative for Developers and SaaS Builders',
    lede: 'Relay.app has shut down. If you were using Relay for workflow automation or are researching what to use instead, this page covers what viaSocket offers and how it compares.',
    sub: 'viaSocket is an Integration Layer for developers and SaaS builders. You can use it to run personal or team automations, or embed 2,300+ app integrations directly into your own product without building OAuth, token storage, or API clients yourself.',
    cta: 'Get started free — 100,000 tasks/month, no credit card required',
};

export default function RelayHero() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center py-12 lg:py-20 container">
            <h1 className="h1 text-center max-w-4xl">{HERO.title}</h1>
            <p className="text-base md:text-lg text-center max-w-3xl">{HERO.lede}</p>
            <p className="text-base md:text-lg text-center max-w-3xl">{HERO.sub}</p>

            <RelaySignupCTA className="btn btn-accent flex items-center gap-1 justify-center w-full md:max-w-fit text-center">
                {HERO.cta} <ArrowRight size={14} />
            </RelaySignupCTA>
        </div>
    );
}
