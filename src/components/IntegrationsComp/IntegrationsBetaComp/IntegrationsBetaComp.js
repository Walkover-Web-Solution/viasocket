import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexComp';

export default function IntegrationsBetaComp({ appOneDetails }) {
    return (
        <>
            <div className="cont gap-4">
                <h1 className="h1 mb-2">
                    Create integrations between <span className="text-accent">{appOneDetails?.name}</span> and your favorite Apps
                </h1>
                <h2 className="h2 mb-2 text-gray-700">
                    The app you are looking for is in <span className="font-bold text-accent">beta</span>, and we are awaiting verification from the app builders before making it accessible to end users.<br />
                    <span className="text-sm text-gray-500">This process may take 15 to 30 days.</span>
                </h2>
                <p className="sub__h1 mb-4 text-gray-600">
                    If you can’t wait, we can add the beta version to your viaSocket workspace within <span className="font-bold text-accent">24 hours</span>.
                </p>
                <RequestIntegrationPopupOpener showType="button" appInfo={appOneDetails} type="app" />
            </div>
        </>
    );
}
