import Link from 'next/link';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { handleRedirect } from '@/utils/handleRedirection';
import PopularUseCases from './popularUseCases';

export default function HeroSection({ appOneDetails, combosData, appData }) {
    const showContent = combosData?.combinations?.length > 0 || appOneDetails?.events?.length > 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center gap-12 lg:gap-28">
            {showContent && (
                <div className="flex flex-col gap-4 lg:gap-6">
                    <h1 className="h1">{appData?.headings?.h1 || `Automate ${appOneDetails?.name} with viaSocket`}</h1>
                    <p className="sub__h1">
                        {appData?.headings?.subheadline ||
                            `Eliminate repetitive tasks and manual data entry. Build automated workflows with viaSocket's AI agents and serverless logic — no code required.`}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link href="/signup" className="btn btn-accent">
                            Start your automation
                        </Link>
                        <button
                            onClick={(e) =>
                                handleRedirect(e, `https://flow.viasocket.com/connect/${appOneDetails?.rowid}?`)
                            }
                            className="btn btn-outline"
                            rel="nofollow"
                        >
                            Connect to {appOneDetails?.name} <ExternalLinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <PopularUseCases appName={appOneDetails?.name} />
        </div>
    );
}
