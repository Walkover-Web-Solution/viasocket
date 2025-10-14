import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexComp';

export default function IntegrationsBetaComp({ appOneDetails }) {
    return (
        <>
            <div className="cont gap-6 justify-center items-center">
                <h1 className="h1 mb-2 text-center">
                    Connect <span className="text-accent">{appOneDetails?.name}</span> integrations <br /> with your
                    favorite apps
                </h1>
                <h2 className="sub__h1 text-center">
                    The app you are looking for is in <span className="font-bold text-accent">beta</span>, and we are{' '}
                    awaiting verification from the app builders <br /> before making it accessible to end users.
                    <br /> <span className="text-sm text-gray-500">This process may take 15 to 30 days.</span>
                </h2>
                <p className="sub__h1 text-center">
                    If you can’t wait, we can add the beta version to your viaSocket workspace within{' '}
                    <span className="font-bold text-accent">24 hours</span>.
                </p>
                <RequestIntegrationPopupOpener showType="button" appInfo={appOneDetails} type="app" />
            </div>
        </>
    );
}
