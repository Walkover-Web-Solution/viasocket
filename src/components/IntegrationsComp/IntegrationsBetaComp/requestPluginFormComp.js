import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from './reCaptchaProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function RequestPluginFormComp({ appOneDetails }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
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
    const handleSubmit = async (event) => {
        window.signals.identify({
            email: formData.email,
            name: formData.name,
        });

        event.preventDefault();

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
                const pluginResponse = await fetch('https://flow.sokt.io/func/scrioitLgnvb', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const pluginData = await pluginResponse.json();

                if (pluginData?.data?.success) {
                    document.getElementById('beta_request').close();
                }
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            document.getElementById('beta_request').close();
        }
    };

    return (
        <>
            <div className="modal-box">
                {/* <form>
                    <button
                        onClick={() => document.getElementById('beta_request').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form> */}
                <div className="flex flex-col gap-6">
                    <Image
                        src="/assets/brand/logo.svg"
                        width={1080}
                        height={1080}
                        alt="viasocket"
                        className="h-[36px] w-fit"
                    />
                    <div>
                        <h3 className="h3 font-bold">Request a New Plugin</h3>
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
                    <Link href="https://cal.id/team/viasocket/superheros" target="_blank">
                        <p className="text-lg text-accent hover:underline">Schedule a meeting</p>
                    </Link>
                    <div className="flex gap-3">
                        <button disabled={isLoading} className="btn btn-md btn-accent" onClick={handleSubmit}>
                            {isLoading ? 'Submiting...' : 'Submit'}
                        </button>
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={() => document.getElementById('beta_request').close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
