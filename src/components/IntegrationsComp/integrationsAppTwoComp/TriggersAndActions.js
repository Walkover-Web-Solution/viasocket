'use client';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';

export default function TriggersAndActions({ appOneDetails, appTwoDetails }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Full list</span>
                <h2 className="h2">Supported Triggers &amp; Actions</h2>
                <p className="text-gray-500 text-base">
                    Everything you can automate between {appOneDetails?.name} and {appTwoDetails?.name}.
                </p>
            </div>

            <IntegrationsEventsComp appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} />
        </div>
    );
}
