import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import ZapierSignupCTA from './ZapierSignupCTA';

export default function ZapierCTABanner() {
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
                <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
                    Automate like the bill isn't watching.
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                    10,000 free tasks a month, 500 AI credits, and no task meter to ration.
                    <br />
                    Migration is free, and so is the rebuild of your top three workflows.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <ZapierSignupCTA className="btn btn-outline">
                        Import my Zaps <MoveRight className="w-4 h-4" />
                    </ZapierSignupCTA>
                    <Link
                        href="https://cal.id/team/viasocket/workflow-setup-discussion"
                        target="_blank"
                        className="inline-flex items-center gap-2 border border-white text-white hover:bg-white/10 text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                    >
                        Book a free migration call
                    </Link>
                </div>
            </div>
        </div>
    );
}
