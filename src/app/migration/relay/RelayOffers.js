import Link from 'next/link';

// "2,300+" also appears in RelayHero and RelayComparisonTable.
// Free-plan and Pro figures match the pricing copy in src/components/IntegrationsComp/addToProduct/copy.js.
const OFFERS = [
    {
        title: '2,300+ integrations',
        body: (
            <p>
                viaSocket connects to 2,300+ apps across CRM, support, payments, communication, and data tools. If
                Relay supported an integration you relied on, the odds are high it is already available here.
            </p>
        ),
    },
    {
        title: 'A generous free plan',
        body: (
            <p>
                The free plan includes 100,000 tasks per month and 1,000 AI credits per month — enough to run real
                automations without hitting a ceiling on day one. Paid plans start at $19/month.
            </p>
        ),
    },
    {
        title: 'Workflow automation',
        body: (
            <p>
                Build multi-step workflows with conditional logic, filters, custom JavaScript transforms,
                human-in-the-loop approval steps, and AI agents that can analyze, decide, and act. Workflows run on
                event triggers or schedules.
            </p>
        ),
    },
    {
        title: 'Integration Layer for SaaS products',
        body: (
            <p>
                If you are a developer or SaaS builder, viaSocket goes beyond personal automation. The{' '}
                <Link href="/embed/app-integration" className="text-accent underline underline-offset-4">
                    Embed product
                </Link>{' '}
                lets you add an integration layer — an{' '}
                <Link href="/embed/app-integration" className="text-accent underline underline-offset-4">
                    embedded iPaaS
                </Link>
                , including a white-label workflow builder — directly inside your own SaaS product. Your users connect
                their own accounts; you do not manage OAuth or token storage. See{' '}
                <Link href="/use-cases" className="text-accent underline underline-offset-4">
                    integration use cases
                </Link>{' '}
                for examples.
            </p>
        ),
    },
    {
        title: 'AI agent tool-calling',
        body: (
            <p>
                The Actions for AI embed gives AI agents structured access to 2,300+ apps via a secure endpoint. No
                per-app API wrangling required.
            </p>
        ),
    },
    {
        title: 'Human-in-the-loop approvals',
        body: (
            <p>
                Pause any workflow step to wait for a human decision by email, then resume automatically when approval
                is given. This was a standout feature of Relay — viaSocket supports the same pattern.
            </p>
        ),
    },
];

export default function RelayOffers() {
    return (
        <div className="bg-white px-4 lg:px-12 py-12 lg:py-16 border-y">
            <div className="container flex flex-col gap-8">
                <h2 className="h2 text-center lg:text-left">What viaSocket offers</h2>
                <div className="flex flex-col border">
                    {OFFERS.map((offer, index) => (
                        <div
                            key={offer.title}
                            className={`py-6 px-6 lg:p-12 flex flex-col gap-3 ${
                                index !== OFFERS.length - 1 ? 'border-b' : ''
                            }`}
                        >
                            <h3 className="h3">{offer.title}</h3>
                            <div className="text-gray-700">{offer.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
