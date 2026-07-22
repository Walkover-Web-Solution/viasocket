import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RelayHero() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center py-12 lg:py-20 container">
            <div className="border py-1 px-3 bg-white w-fit text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Relay.app shuts down Sep 14
            </div>

            <h1 className="h1 text-center">
                The Relay.app Alternative With <br className="hidden lg:inline" /> a Free Migration Path
            </h1>
            <p className="text-base md:text-lg">
                Relay shuts down Sep 14. Paste your Relay export data into viaSocket's AI and watch
                <br className="hidden lg:inline" /> your workflows come back to life. Migration is free, and your first
                year is on us.
            </p>

            <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-2 w-full sm:w-auto">
                <Link href="/signup?import=true" className="btn btn-accent flex items-center gap-1 justify-center w-full md:max-w-fit">
                    Import my Relay workflows <ArrowRight size={14} />{' '}
                </Link>
                <Link
                    href="https://cal.id/team/viasocket/workflow-setup-discussion"
                    className="btn btn-outline flex items-center justify-center w-full md:max-w-fit"
                >
                    Book a free migration call <ArrowRight />{' '}
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <span className="text-xs text-gray-500 font-medium">4.6/5 on G2 (90+ Reviews)</span>
                <span className="text-xs text-gray-500 font-medium">10,000+ businesses</span>
                <span className="text-xs text-gray-500 font-medium">SOC 2 Type II</span>
            </div>
        </div>
    );
}
