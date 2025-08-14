import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestPlugin({ appInfo, secondAppInfo = null, type, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (event) => {
        window.signals.identify({
            email: formData.userEmail,
        });

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
        const formDataToSend = formData;
        delete formData.plug;
        formDataToSend.userNeed = `New ${type || 'App'}`;
        formDataToSend.category = appInfo?.category?.join(', ');

        try {
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
                handleClose();
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center">
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="modal-box">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                            {type && (
                                <Image
                                    src={formData?.plug?.iconurl || 'https://placehold.co/40x40'}
                                    height={36}
                                    width={36}
                                />
                            )}
                            <h3 className="h3 font-bold">
                                Request a new {type ? `${type} for ${formData?.plug?.name}` : 'Plugin'}
                            </h3>
                        </div>
                        <p>
                            {!type
                                ? 'Submit your plugin request to integrate new tools or services seamlessly into your workflow.'
                                : `
                                    Submit your new ${type} request and We’ll try to build it for you within 48 hours`}
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
                                        const selectedApp = selectedName === appInfo?.name ? appInfo : secondAppInfo;
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
                    <Link href="https://cal.id/team/viasocket/superheros" target="_blank">
                        <p className="text-lg text-accent hover:underline">Schedule a meeting</p>
                    </Link>
                    <div className="flex gap-3">
                        <button disabled={isLoading} className="btn btn-md btn-accent" onClick={handleSubmit}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button className="btn btn-primary btn-outline" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
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
