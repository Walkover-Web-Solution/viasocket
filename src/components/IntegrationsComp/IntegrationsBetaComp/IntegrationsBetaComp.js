import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

export default function IntegrationsBetaComp({ appOneDetails, appTwoDetails }) {

    return (
        <>
            <div className="cont gap-2 ">
                <h1 className="h1 ">
                    Create integrations between <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                    <span className="text-accent">{appTwoDetails?.name || 'your favorite App'}</span>
                </h1>
                {appTwoDetails ? (
                    <>
                        <h2 className="h2">
                            The app you are looking for is in beta, and we are awaiting verification from the app
                            builders before making it accessible to end users. This process may take 15 to 30 days.
                        </h2>
                        <p className="sub__h1">
                            If you can’t wait, we can add the beta version to your viaSocket workspace within 24 hours.
                        </p>
                        <button
                            className="btn btn-accent"
                            onClick={() => document.getElementById('plugin_request_form').showModal()}
                        >
                            Request Combination
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="h2">
                            The app you are looking for is in beta, and we are awaiting verification from the app
                            builders before making it accessible to end users. This process may take 15 to 30 days.
                        </h2>
                        <p className="sub__h1">
                            If you can’t wait, we can add the beta version to your viaSocket workspace within 24 hours.
                        </p>
                        <button
                            className="btn btn-accent"
                            onClick={() => document.getElementById('plugin_request_form').showModal()}
                        >
                            Request Beta Access
                        </button>
                    </>
                )}
            </div>

            <IntegrationsRequestComp />
        </>
    );
}
