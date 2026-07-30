import Link from 'next/link';
import { Check, MoveRight } from 'lucide-react';

export default function RelayRescueDeal() {
    return (
        <div className="container py-12">
            <div
                className="bg-white rounded-2xl border-2 border-black p-10 md:p-14 max-w-4xl mx-auto"
                style={{ boxShadow: '8px 8px 0 0 #B91C1C' }}
            >
                <span className="inline-block bg-accent text-white text-[10px] font-medium uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-6">
                    Relay Users Only
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">The Relay Rescue Deal</h2>
                <p className="text-gray-700 mb-1">Two promises for anyone coming from Relay.app</p>
                <p className="text-gray-500 text-sm mb-8">Valid until Sep 14, 2026.</p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-gray-800 text-sm">Free assisted migration by real people</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-gray-800 text-sm">viaSocket&apos;s team plan free for 1 year</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Link href="/signup?import=true&utm_source=relay-switch-google-ads" className="btn btn-accent">
                        Claim my free year <MoveRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="https://cal.id/team/viasocket/workflow-setup-discussion"
                        target="_blank"
                        className="inline-flex items-center gap-1 text-accent hover:text-[#991B1B] text-sm font-semibold underline underline-offset-4 transition-colors"
                    >
                        or book a migration call instead <MoveRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
