import Link from 'next/link';

// "2,300+" also appears in N8nHero and N8nComparisonTable.
const LINK_CLASS = 'text-accent underline underline-offset-4';

const INTRO =
    'viaSocket is built for SaaS companies and developers who need to deliver app integrations inside their own product. The architecture is different from the ground up.';

const CLOSE =
    'n8n has no equivalent to any of these three models for embedded, multi-tenant use inside a third-party SaaS product.';

export default function N8nDifference() {
    return (
        <div className="bg-white border-y">
            <div className="container py-12 lg:py-16 flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h2 className="h2">What viaSocket Does Differently</h2>
                    <p className="text-gray-700 max-w-3xl">{INTRO}</p>
                </div>

                <div className="flex flex-col gap-3 max-w-3xl">
                    <h3 className="h3">Managed Auth — per customer, not per instance</h3>
                    <p className="text-gray-700">
                        viaSocket's{' '}
                        <Link href="/developers/auth" className={LINK_CLASS}>
                            Managed Auth
                        </Link>{' '}
                        handles OAuth, token refresh, reauthorization, and multi-account connections on a per-customer
                        basis. When your user connects their Salesforce account, viaSocket stores and manages that
                        credential on their behalf — not yours. You don't build OAuth flows. You don't manage token
                        expiry. You don't handle reauthorization prompts.
                    </p>
                    <p className="text-gray-700">
                        This is table-stakes infrastructure for any SaaS product offering integrations. It's not
                        something you want to build in-house.
                    </p>
                </div>

                <div className="flex flex-col gap-3 max-w-3xl">
                    <h3 className="h3">2,300+ app integrations, pre-built</h3>
                    <p className="text-gray-700">
                        Rather than building connectors one at a time or maintaining a fork of n8n nodes, viaSocket
                        provides access to 2,300+ pre-built app integrations via its Integration Layer. Each integration
                        handles auth, actions, and triggers. You add them to your product; you don't maintain them. The
                        capability set is listed on{' '}
                        <Link href="/features" className={LINK_CLASS}>
                            Integration Layer / Features
                        </Link>
                        .
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-w-3xl">
                    <h3 className="h3">Three embed models — pick what fits your product</h3>
                    <p className="text-gray-700">
                        viaSocket's Embed product line gives you three ways to surface integrations inside your SaaS:
                    </p>
                    <ol className="flex flex-col gap-4 list-decimal pl-5 text-gray-700">
                        <li>
                            <Link href="/embed/app-integration" className={LINK_CLASS}>
                                Embed — App Integration
                            </Link>{' '}
                            — a white-labeled visual workflow builder your customers use inside your product. They build
                            their own automations connecting their own apps. You own the experience; viaSocket runs the
                            infrastructure.
                        </li>
                        <li>
                            <Link href="/embed/actions-for-ai" className={LINK_CLASS}>
                                Actions for AI
                            </Link>{' '}
                            — if you're building an AI agent or copilot, this gives your agent the ability to act on
                            2,300+ apps as tool calls. Your AI can send a Slack message, create a HubSpot contact, or
                            update a Google Sheet — without you writing API integrations for each.
                        </li>
                        <li>
                            <Link href="/embed/actions-via-webhook" className={LINK_CLASS}>
                                Actions via Webhook
                            </Link>{' '}
                            — a backend-first approach. Your system fires a webhook; viaSocket routes it into multi-app
                            actions. No UI required.
                        </li>
                    </ol>
                    <p className="text-gray-700">{CLOSE}</p>
                </div>
            </div>
        </div>
    );
}
