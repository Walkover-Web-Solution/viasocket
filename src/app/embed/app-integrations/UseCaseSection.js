import Link from 'next/link';
import AppIntegrationFlowCard from './AppIntegrationFlowCard';

export default function UseCaseSection({ appCount }) {
    return (
        <div className="container">
            <div className="grid md:grid-cols-[40%_40%] grid-cols-1 justify-center gap-14 md:gap-20 items-start bg-white border p-6 md:py-12 md:px-20">
                {/* Left */}
                <div>
                    <div className="inline-flex items-center gap-1.5 text-accent text-base font-bold py-1 rounded-full mb-4 tracking-wider uppercase">
                        See it in action
                    </div>
                    <h2 className="text-[32px] font-medium tracking-[-0.6px] leading-[1.2] text-[#111827] mb-3">
                        User opens. User builds. User ships.
                    </h2>
                    <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                        Other platforms ship you a wrapper around their own product. With App Integration, your users{' '}
                        <strong>build workflows inside your UI</strong> — using
                        your app as a first-class trigger and action.
                    </p>
                    <p className="text-[14.5px] text-gray-500 leading-[1.75] mb-[18px] font-normal">
                        Here's a real flow. A user inside your CRM wants to automate post-deal-won. They click "Add
                        Workflow", pick a trigger, drop two actions — done in under a minute, never left your product.
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
