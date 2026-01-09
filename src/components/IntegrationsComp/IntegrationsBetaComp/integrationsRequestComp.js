'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestPlugin({ appInfo, secondAppInfo = null, type, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        userEmail: '',
        userName: '',
        useCase: '',
        plugName: appInfo?.name,
        source: 'website',
        environment: process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT,
        plug: appInfo,
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
        if (onClose) onClose();
        else {
            console.error('onclose not found in RequestPlugin');
        }
    };

    const handleDone = async () => {
        setShowSuccessPopup(false);
        handleClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.userEmail) {
            alert('Email is required.');
            return;
        }

        if (!formData.userName) {
            alert('Name is required.');
            return;
        }

        if (!isValidEmail(formData.userEmail)) {
            setEmailError('Please enter a valid email address.');
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
            return;
        }

        if (!formData.useCase) {
            alert('Use case is required.');
            return;
        }

        await submitForm();
        setShowSuccessPopup(true);
    };

    const submitForm = async () => {
        window.signals.identify({
            email: formData.userEmail,
        });

        const formDataToSend = formData;
        const { plug, ...cleanedPayload } = formDataToSend;
        cleanedPayload.userNeed = `New ${type || 'App'}`;
        cleanedPayload.category = appInfo?.category?.join(', ');

        try {
            setIsLoading(true);
            const pluginResponse = await fetch('https://flow.sokt.io/func/scriPIvL7pBP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(cleanedPayload),
            });

            const pluginData = await pluginResponse.json();

            if (pluginData?.data?.success) {
                handleClose();
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center">
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {showSuccessPopup && (
                <div className="modal-box max-w-md">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="flex items-left gap-1">
                                <span className="text-sm">
                                    {' '}
                                    Got your request! We'll get back to you within 48 hours. 🚀
                                </span>{' '}
                            </p>
                            <p className="text-sm">
                                Have more queries? Feel free to{' '}
                                <Link
                                    className="underline hover:text-accent"
                                    href={'https://cal.id/team/viasocket/workflow-setup-discussion'}
                                    target="_blank"
                                >
                                    schedule a meeting
                                </Link>{' '}
                                with us.
                            </p>
                        </div>

                        <div className="flex gap-3 w-full px-5 pt-5">
                            <button
                                className="bg-accent py-1 px-3 text-white text-sm"
                                onClick={handleDone}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Submitting...' : 'Done'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!showSuccessPopup && (
                <div className="modal-box">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-center">
                                {type && (
                                    <Image
                                        src={formData?.plug?.iconurl || 'https://placehold.co/40x40'}
                                        height={36}
                                        width={36}
                                        alt={"plugin icon"}
                                    />
                                )}
                                <h3 className="h3 font-bold">
                                    Request a new{' '}
                                    {type
                                        ? `${type == 'trigger' ? 'Trigger' : 'Action'} for ${formData?.plug?.name}`
                                        : 'Integration'}
                                </h3>
                            </div>
                            <p className="flex items-center gap-1">
                                <span className="text-lg font-medium">
                                    Sit back and relax — we'll build your {type ? `${type}` : 'app'} in only 48 hours!
                                    🚀
                                </span>{' '}
                            </p>
                        </div>
                        <div className="flex gap-1 flex-col">
                            {secondAppInfo && (
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Select App</span>
                                    </div>
                                    <select
                                        className="select select-bordered w-full focus:outline-none"
                                        value={formData?.plug?.name}
                                        onChange={(e) => {
                                            const selectedName = e.target.value;
                                            const selectedApp =
                                                selectedName === appInfo?.name ? appInfo : secondAppInfo;
                                            setFormData((prev) => ({
                                                ...prev,
                                                plug: selectedApp,
                                                plugName: selectedApp?.name,
                                            }));
                                        }}
                                    >
                                        <option value={appInfo?.name}>{appInfo?.name}</option>
                                        <option value={secondAppInfo?.name}>{secondAppInfo?.name}</option>
                                    </select>
                                </label>
                            )}

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Name:</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="userName"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full focus:outline-none "
                                    value={formData.userName}
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
                            {!type && (
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Plugin Name:</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="plugName"
                                        placeholder="Plugin Name"
                                        className="input input-bordered w-full focus:outline-none"
                                        value={formData.plugName}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            )}
                            <label className="form-control w-full">
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
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </button>
                            <button disabled={isLoading} className="btn btn-primary btn-outline" onClick={handleClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function IntegrationsRequestComp({ appInfo, secondAppInfo, type, onClose }) {
    return (
        <dialog open className="modal rounded-none">
            <RequestPlugin appInfo={appInfo} secondAppInfo={secondAppInfo} type={type} onClose={onClose} />
        </dialog>
    );
}
