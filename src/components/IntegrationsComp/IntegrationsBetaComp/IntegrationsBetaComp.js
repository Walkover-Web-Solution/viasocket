import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexClientComp';

export default function IntegrationsBetaComp({ appOneDetails, appTwoDetails }) {
    const isPair = Boolean(appTwoDetails);

    if (!isPair) {
        return (
            <div className="cont gap-8 justify-center items-center">
                <div className="flex flex-col gap-4">
                    <h1 className="h1 mb-2 text-center">
                        {`Integrate ${appOneDetails?.name} with your favorite apps`}
                    </h1>
                    <h2 className="sub__h1 text-center">
                        The app you are looking for is in <span className="font-bold text-accent">beta</span>, and we
                        are awaiting verification from the app builders <br /> before making it accessible to end
                        users.
                        <br /> <span className="text-sm text-gray-500">This process may take 15 to 30 days.</span>
                    </h2>
                    <p className="sub__h1 text-center">
                        If you can’t wait, we can add the beta version to your viaSocket workspace within{' '}
                        <span className="font-bold text-accent">24 hours</span>.
                    </p>
                </div>
                <RequestIntegrationPopupOpener showType="button" appInfo={appOneDetails} type="app" />
            </div>
        );
    }

    const appOneCapable = appOneDetails?.events?.length > 0;
    const appTwoCapable = appTwoDetails?.events?.length > 0;
    const onlyOneCapable = appOneCapable !== appTwoCapable;
    const capableApp = appOneCapable ? appOneDetails : appTwoDetails;
    const missingApp = appOneCapable ? appTwoDetails : appOneDetails;

    return (
        <div className="cont gap-8 justify-center items-center">
            <h1 className="h1 text-center lg:whitespace-nowrap">
                Integrate <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                <span className="text-accent">{appTwoDetails?.name}</span> with viaSocket
            </h1>
            <div className="cont__w flex flex-col gap-4">
                <h2 className="sub__h1 text-center">
                    {onlyOneCapable ? (
                        <>
                            {capableApp?.name} already connects with hundreds of apps.{' '}
                            {missingApp?.name}&apos;s automation is still on its way. Want to speed
                            that up?
                        </>
                    ) : (
                        <>
                            These apps are in <span className="font-bold text-accent">beta</span>, and we are
                            awaiting verification from the app builders <br /> before making them accessible to end
                            users.
                            <br /> <span className="text-sm text-gray-500">This process may take 15 to 30 days.</span>
                        </>
                    )}
                </h2>
                {!onlyOneCapable && (
                    <p className="sub__h1 text-center">
                        If you can’t wait, we can add the beta version to your viaSocket workspace within{' '}
                        <span className="font-bold text-accent">24 hours</span>.
                    </p>
                )}
            </div>
            <RequestIntegrationPopupOpener
                showType="button"
                appInfo={onlyOneCapable ? missingApp : appOneDetails}
                secondAppInfo={onlyOneCapable ? null : appTwoDetails}
                type="app"
            />
        </div>
    );
}
