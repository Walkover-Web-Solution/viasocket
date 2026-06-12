'use client';

import Link from 'next/link';
import WebhookFlowCard from './WebhookFlowCard';

export default function WebhookUseCase() {
    return (
        <div className="container">
            <div className="grid md:grid-cols-[40%_40%] grid-cols-1 justify-center gap-14 md:gap-20 items-start bg-white border p-6 md:py-12 md:px-20">
                {/* Left */}
                <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center gap-1.5 text-accent text-base font-bold py-1 rounded-full tracking-wider uppercase">
                        See it in action
                    </div>
                    <h2 className="h2">Event in. Actions out.</h2>
                    <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                        Other platforms require custom integrations for every action. With Actions via Webhook,{' '}
                        <strong>
                            a sigle event from your application can trigger workflow across your users connected apps.
                        </strong>{' '}
                        No custom integrations. No routing logic.
                        <br />
                        In this example. a user completes onboarding. One event creates a HubSpot deal, sends a welcome
                        email, and notigies the team in Slack.
                    </p>
                    <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                        Here's a real flow. A new customer just completed onboarding. Watch your server POST one event
                        and viaSocket execute three app actions in under two seconds.
                    </p>
                    <Link
                        href="https://viasocket.com/signup?utm_source=/embed/actions-via-webhook"
                        className="btn btn-accent"
                    >
                        Start building
                    </Link>
                </div>

                {/* Right - Panel */}
                <WebhookFlowCard />
            </div>
        </div>
    );
}
