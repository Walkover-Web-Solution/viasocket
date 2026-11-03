import Link from 'next/link';

// "100,000 tasks/month" also appears in N8nHero and N8nCTABanner.
// Embed Sandbox figures ($0, 25 active users, 25,000 tasks) are only stated here.
const LINK_CLASS = 'text-accent underline underline-offset-4';

const PLAN =
    "viaSocket's Free plan includes 100,000 tasks/month at no cost. The Embed Sandbox is $0/month for up to 25 active users and 25,000 tasks — enough to prototype a complete embedded integration experience before committing.";

export default function N8nGetStarted() {
    return (
        <div className="bg-white border-b">
            <div className="container py-12 lg:py-16 flex flex-col gap-4">
                <h2 className="h2 mb-2">Getting Started</h2>
                <p className="text-gray-700 max-w-3xl">{PLAN}</p>
                <p className="text-gray-700 max-w-3xl">
                    <Link href="/developers/docs" className={LINK_CLASS}>
                        Developer Documentation
                    </Link>{' '}
                    covers the API reference and the SDK. The full list of supported integrations and{' '}
                    <Link href="/use-cases" className={LINK_CLASS}>
                        Use Cases
                    </Link>{' '}
                    shows where teams put the layer to work. Prototype that experience with{' '}
                    <Link href="/embed/app-integration" className={LINK_CLASS}>
                        Embed — App Integration
                    </Link>{' '}
                    before you commit.
                </p>
            </div>
        </div>
    );
}
