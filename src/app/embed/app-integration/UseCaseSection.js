import Link from 'next/link';
import AppIntegrationFlowCard from './AppIntegrationFlowCard';

export default function UseCaseSection({ appCount }) {
    return (
        <div className="container">
            <div className="grid md:grid-cols-[40%_40%] grid-cols-1 items-center justify-center gap-14 md:gap-20 bg-white border p-6 md:py-12 md:px-20">
                {/* Left */}
                <div>
                    <div className="inline-flex items-center gap-1.5 text-accent text-base font-bold py-1 rounded-full mb-4 tracking-wider uppercase">
                        See it in action
                    </div>
                    <h2 className="h2">User opens. User Connects User Automations.</h2>
                    <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
                        Embed a complete integrations and automation experience into your product. Users can connect
                        their apps and build workflows <strong>without ever leaving your platform.</strong> <br />
                        No redirects. No separate tools. No integration work for your team.
                    </p>
                    <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
                        In this example. a CRM user creates a workflow that triggers when a deal is won, sends an email
                        via Gmail, and posts an update to Slack.
                    </p>
                    <Link
                        href="https://viasocket.com/signup?utm_source=/embed/app-integration"
                        className="btn btn-accent mt-2"
                    >
                        Start building
                    </Link>
                </div>

                {/* Right Panel */}
                <AppIntegrationFlowCard appCount={appCount} />
            </div>
        </div>
    );
}
