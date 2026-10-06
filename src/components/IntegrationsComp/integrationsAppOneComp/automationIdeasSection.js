'use client';
import Link from 'next/link';
import { LinkText } from '@/components/uiComponents/buttons';

const AutomationIdeaCard = ({ idea }) => (
    <Link
        href={`https://viasocket.com/automation-ideas/usecase/${idea?.slug}`}
        target="_blank"
        className="border custom-border card rounded-none bg-white LinkButtonCard"
    >
        <div className="flex flex-col gap-3 h-full p-4">
            <div className="flex-grow">
                <h3 className="font-semibold text-sm line-clamp-2">{idea?.title}</h3>
                {idea?.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-3">{idea?.description}</p>
                )}
            </div>
            <div className="mt-auto text-sm">
                <LinkText>Read automation ideas</LinkText>
            </div>
        </div>
    </Link>
);

export default function AutomationIdeasSection({ automationIdeasData, appName }) {
    if (!automationIdeasData?.length) return null;

    return (
        <div className="container">
            <div className="cont gap-8">
                <div className="cont gap-2">
                    <h2 className="h2">Automation ideas for {appName}</h2>
                    <p className="sub__h1">
                        Explore ready-made workflow guides that show you how to automate {appName} with the tools you
                        already use.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {automationIdeasData.map((idea) => (
                        <AutomationIdeaCard key={idea?.id || idea?.slug} idea={idea} />
                    ))}
                </div>
            </div>
        </div>
    );
}
