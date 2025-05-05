import Image from 'next/image';
import { useState } from 'react';
import RequestPluginFormComp from './requestPluginFormComp';
import ReCaptchaProvider from './reCaptchaProvider';

export default function IntegrationsBetaComp({ appOneDetails, appTwoDetails }) {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: '',
        app_name: currentUrl || ' ',
        plugin: appOneDetails?.name,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            alert('Name and Email are required.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('https://flow.sokt.io/func/scrioitLgnvb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data?.data?.success) {
                document.getElementById('beta_request').close();
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="cont cont__w gap-4 ">
                <h1 className="h1  ">
                    {`Create integrations between ${appOneDetails?.name} and ${appTwoDetails?.name || 'your favorite App'}`}
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
                            onClick={() => document.getElementById('beta_request').showModal()}
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
                            onClick={() => document.getElementById('beta_request').showModal()}
                        >
                            Request Beta Access
                        </button>
                    </>
                )}
            </div>

            <dialog id="beta_request" className="modal rounded-none">
                <ReCaptchaProvider>
                    <RequestPluginFormComp appOneDetails={appOneDetails} />
                </ReCaptchaProvider>
            </dialog>
        </>
    );
}
