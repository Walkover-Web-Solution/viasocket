import { useState, useRef } from 'react';
import ReCaptchaProvider from './reCaptchaProvider';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { MdKeyboardArrowRight } from 'react-icons/md';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestPlugin({ type, searchTerm }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        userEmail: '',
        useCase: '',
        plugName: '',
        source: 'website',
        environment: process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT,
    });
    const [emailError, setEmailError] = useState('');
    const emailInputRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'userEmail') {
            if (value === '' || isValidEmail(value)) {
                setEmailError('');
            } else {
                setEmailError('Please enter a valid email address.');
            }
        }
    };

    const handleSubmit = async (event) => {
        window.signals.identify({
            email: formData.userEmail,
            name: formData.userId,
        });

        event.preventDefault();

        if (!formData.userId || !formData.userEmail) {
            alert('Name and Email are required.');
            return;
        }

        if (!isValidEmail(formData.userEmail)) {
            setEmailError('Please enter a valid email address.');
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
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
                // const pluginResponse = await fetch('https://flow.sokt.io/func/scriPIvL7pBP', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formData),
                // });

                // const pluginData = await pluginResponse.json();

                // if (pluginData?.data?.success) {
                //     document.getElementById('plugin_request_form').close();
                // }
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            document.getElementById('plugin_request_form').close();
        }
    };

    const renderRequestComponent = () => {
        switch (type) {
            case 'app':
                return <RequestApp searchTerm={searchTerm} />;
            case 'action':
                return <RequestAction />;
            case 'combination':
                return <RequestCombination />;
            default:
                return null;
        }
    };

    const RequestApp = () => {
        return (
            <div>
                <h6 className="h6">request app</h6>
                <input
                    type="text"
                    name="userId"
                    placeholder="Enter app name"
                    className="input input-bordered border custom-border focus:outline-none w-48"
                />
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Use Case:</span>
                    </div>
                    <textarea
                        required
                        name="useCase"
                        className="textarea textarea-bordered border custom-border focus:outline-none min-h-[250px]"
                        placeholder="Please describe your usecase"
                        // value={formData.useCase}
                        // onChange={(event) => {
                        //     handleInputChange(event);
                        //     event.target.style.height = 'auto';
                        //     event.target.style.height = `${event.target.scrollHeight}px`;
                        // }}
                        rows="1"
                        style={{ overflow: 'hidden' }}
                    ></textarea>
                </label>
            </div>
        );
    };

    const RequestAction = () => {
        return <div>request action</div>;
    };
    const RequestCombination = () => {
        return <div>request combination</div>;
    };

    const SubmitDetails = () => {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex gap-3 flex-col">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name:</span>
                        </div>
                        <input
                            required
                            type="text"
                            name="userId"
                            placeholder="Enter your name"
                            className="input input-bordered w-full focus:outline-none "
                            value={formData.userId}
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
                            name="userEmail"
                            placeholder="Enter your Email"
                            className={`input input-bordered w-full focus:outline-none ${emailError ? 'input-error' : ''}`}
                            value={formData.userEmail}
                            onChange={handleInputChange}
                            ref={emailInputRef}
                        />
                        {emailError && <span className="text-error text-sm mt-1">{emailError}</span>}
                    </label>
                </div>
                {/* <Link href="https://cal.id/team/viasocket/superheros" target="_blank">
            <p className="text-lg text-accent hover:underline">Schedule a meeting</p>
        </Link> */}
                <div className="flex gap-3">
                    <button disabled={isLoading} className="btn btn-md btn-accent" onClick={handleSubmit}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="modal-box !p-0 w-4/5">
                <div className="flex items-center p-4 justify-between border-b custom-border">
                    <h2 className="h3">Request Integraion</h2>
                    <X onClick={() => document.getElementById('plugin_request_form').close()} />
                </div>
                <div className="p-4">{renderRequestComponent()}</div>
                <div className=" p-4">
                    <button className="btn btn-outlined border custom-border">
                        Next <MdKeyboardArrowRight fontSize={28} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default function IntegrationsRequestComp({ type, searchTerm }) {
    return (
        <dialog id="plugin_request_form" className="modal modal-top rounded-none flex justify-center">
            <ReCaptchaProvider>
                <RequestPlugin type={type} searchTerm={searchTerm} />
            </ReCaptchaProvider>
        </dialog>
    );
}
