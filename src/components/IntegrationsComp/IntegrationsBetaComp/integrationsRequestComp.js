import { useState } from 'react';
import ReCaptchaProvider from './reCaptchaProvider';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Image from 'next/image';

export function RequestPlugin() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: '',
        app_name: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        window.signals.identify({
            email: formData.email,
            name: formData.name,
        });

        event.preventDefault();

        debugger;
        if (!formData.name || !formData.email) {
            alert('Name and Email are required.');
            return;
        }

        if (!executeRecaptcha) {
            console.error('Recaptcha not available');
            return;
        }

        try {
            const token = await executeRecaptcha('plugin_request');
            const recaptchaResponse = await fetch('/api/verify-recaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const recaptchaData = await recaptchaResponse.json();

            if (recaptchaData?.success) {
                setIsLoading(true);
                const pluginResponse = await fetch('https://flow.sokt.io/func/scriSOoxebkJ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const pluginData = await pluginResponse.json();

                if (pluginData?.data?.success) {
                    document.getElementById('plugin_request_form').close();
                }
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            document.getElementById('plugin_request_form').close();
        }
    };

    return (
        <>
            <div className="modal-box">
                <div className="flex flex-col gap-6">
                    <Image
                        src="/assets/brand/logo.svg"
                        width={1080}
                        height={1080}
                        alt="viasocket"
                        className="h-[36px] w-fit"
                    />
                    <div>
                        <h3 className="h2 font-bold">Request a New Plugin</h3>
                        <p className="">
                            Submit your plugin request to integrate new tools or services seamlessly into your workflow.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-col">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full focus:outline-none "
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="email"
                                placeholder="Enter your Email"
                                className="input input-bordered w-full s focus:outline-none "
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Plugin Name:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="app_name"
                                placeholder="Plugin Name"
                                className="input input-bordered w-full s focus:outline-none "
                                value={formData.app_name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Use Case:</span>
                            </div>
                            <textarea
                                required
                                name="useCase"
                                className="textarea textarea-bordered focus:outline-none min-h-[100px]"
                                placeholder="Please describe your usecase"
                                value={formData.useCase}
                                onChange={(event) => {
                                    handleInputChange(event);
                                    event.target.style.height = 'auto';
                                    event.target.style.height = `${event.target.scrollHeight}px`;
                                }}
                                rows="1"
                                style={{ overflow: 'hidden' }}
                            ></textarea>
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button disabled={isLoading} className="btn btn-md btn-accent" onClick={handleSubmit}>
                            {isLoading ? 'Submiting...' : 'Submit'}
                        </button>
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={() => document.getElementById('plugin_request_form').close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function integrationsRequestComp() {
    return (
        <dialog id="plugin_request_form" className="modal rounded-none">
            <ReCaptchaProvider>
                <RequestPlugin />
            </ReCaptchaProvider>
        </dialog>
    );
}
