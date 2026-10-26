import { MoveRight } from 'lucide-react';
import N8nSignupCTA from './N8nSignupCTA';

// "100,000 tasks/month" also appears in N8nHero and N8nGetStarted.
const CTA = 'Get started free — 100,000 tasks/month';

export default function N8nCTABanner() {
    return (
        <div className="bg-accent relative overflow-hidden">
            <svg
                className="absolute left-4 md:left-12 bottom-4 md:bottom-8 w-24 h-24 md:w-40 md:h-40 text-white/30 pointer-events-none"
                viewBox="0 0 100 100"
                fill="currentColor"
            >
                <path d="M50 0 C55 35, 65 45, 100 50 C65 55, 55 65, 50 100 C45 65, 35 55, 0 50 C35 45, 45 35, 50 0 Z" />
            </svg>
            <svg
                className="absolute right-2 md:right-8 top-4 md:top-8 w-32 h-32 md:w-56 md:h-56 text-white/30 pointer-events-none"
                viewBox="0 0 100 100"
                fill="currentColor"
            >
                <path d="M50 0 C55 35, 65 45, 100 50 C65 55, 55 65, 50 100 C45 65, 35 55, 0 50 C35 45, 45 35, 50 0 Z" />
            </svg>

            <div className="container py-20 flex flex-col items-center text-center gap-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">{CTA}</h2>
                <p className="text-white/80 text-sm max-w-xl">
                    The free plan includes 100,000 tasks/month. The Embed Sandbox is $0/month for up to 25 active users
                    and 25,000 tasks.
                </p>

                <N8nSignupCTA className="btn btn-outline">
                    {CTA} <MoveRight className="w-4 h-4" />
                </N8nSignupCTA>
            </div>
        </div>
    );
}
