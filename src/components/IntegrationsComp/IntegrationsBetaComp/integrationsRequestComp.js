import { useState, useRef } from 'react';
import ReCaptchaProvider from './reCaptchaProvider';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Image from 'next/image';
import Link from 'next/link';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestPlugin({ appInfo, type, onClose }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        userEmail: '',
        useCase: '',
        plugName: appInfo?.name,
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
    const handleClose = () => {
        if (onClose) 
            onClose();
        else {
            console.error('onclose not found in RequestPlugin')
        }
    }

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
            const formDataToSend = formData
            formDataToSend.category = appInfo?.category?.join(', ');
            if (recaptchaData?.success) {
                setIsLoading(true);
                const pluginResponse = await fetch('https://flow.sokt.io/func/scriPIvL7pBP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataToSend),
                });

                const pluginData = await pluginResponse.json();

                if (pluginData?.data?.success) {
                    handleClose()
                }
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    return (
        <div className='fixed inset-0 z-50 grid place-items-center'>
            <div className='absolute inset-0 bg-black bg-opacity-40' />
            <div className="modal-box">
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-1'>
                        <div className="flex gap-3 items-center">
                            {type && <Image src={appInfo?.iconurl || 'https://placehold.co/40x40'} height={36} width={36} />}
                            <h3 className="h3 font-bold">
                                Request a new {type ? `${type} for ${appInfo?.name}` : 'Plugin'}
                            </h3>
                        </div>
                            <p>
                                {
                                    !type ? 'Submit your plugin request to integrate new tools or services seamlessly into your workflow.' : `
                                    Submit your new ${type} request and We’ll try to build it for you within 48 hours`
                                }
                            </p>
                    </div>
                    <div className="flex gap-1 flex-col">
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
                        {!type && <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Plugin Name:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="plugName"
                                placeholder="Plugin Name"
                                className="input input-bordered w-full s focus:outline-none "
                                value={formData.plugName}
                                onChange={handleInputChange}
                            />
                        </label>
                        }
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
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function IntegrationsRequestComp({ appInfo, type, onClose }) {
    return (
        <dialog open className="modal rounded-none">
            <ReCaptchaProvider>
                <RequestPlugin appInfo={appInfo} type={type} onClose={onClose} />
            </ReCaptchaProvider>
        </dialog>
    );
}
