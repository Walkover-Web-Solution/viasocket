import Image from 'next/image';
import React, { useState } from 'react';
import scriptRunner from '@/utils/scriptRunner';

const RequestMeeting = ({ agencyName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        datetime: '',
    });
    const [errors, setErrors] = useState({});

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.datetime) newErrors.datetime = 'Date and time is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);

            const payload = { ...formData };
            if (agencyName) {
                payload.agencyName = agencyName;
            }

            const response = await scriptRunner('REQUEST_MEETING', payload, 'GET');

            if (response) {
                alert('Meeting request submitted successfully!');
                document.getElementById('meeting_request_form').close();
            } else {
                throw new Error('Failed to submit meeting request');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit meeting request. Please try again.');
        } finally {
            setIsLoading(false);
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
                        alt="viaSocket"
                        className="h-[36px] w-fit"
                    />
                    <div>
                        <h3 className="h2 font-bold">Schedule a Meeting</h3>
                        <p className="">Please provide your details to schedule a meeting with us.</p>
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
                                className={`input input-bordered w-full focus:outline-none ${
                                    errors.name ? 'input-error' : ''
                                }`}
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && (
                                <div className="label">
                                    <span className="label-text-alt text-error">{errors.name}</span>
                                </div>
                            )}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className={`input input-bordered w-full focus:outline-none ${
                                    errors.email ? 'input-error' : ''
                                }`}
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <div className="label">
                                    <span className="label-text-alt text-error">{errors.email}</span>
                                </div>
                            )}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone Number:</span>
                            </div>
                            <input
                                required
                                type="tel"
                                name="phone"
                                placeholder="Enter your Phone Number"
                                className={`input input-bordered w-full focus:outline-none ${
                                    errors.phone ? 'input-error' : ''
                                }`}
                                value={formData.phone}
                                onChange={handleInputChange}
                                maxLength="10"
                            />
                            {errors.phone && (
                                <div className="label">
                                    <span className="label-text-alt text-error">{errors.phone}</span>
                                </div>
                            )}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Date & Time:</span>
                            </div>
                            <input
                                required
                                type="datetime-local"
                                name="datetime"
                                className={`input input-bordered w-full focus:outline-none ${
                                    errors.datetime ? 'input-error' : ''
                                }`}
                                value={formData.datetime}
                                onChange={handleInputChange}
                                min={new Date().toISOString().slice(0, 16)}
                            />
                            {errors.datetime && (
                                <div className="label">
                                    <span className="label-text-alt text-error">{errors.datetime}</span>
                                </div>
                            )}
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button disabled={isLoading} className="btn btn-md btn-accent" onClick={handleSubmit}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={() => document.getElementById('meeting_request_form').close()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const RequestMeetingComp = ({ agencyName }) => {
    return (
        <dialog id="meeting_request_form" className="modal rounded-none">
            <RequestMeeting agencyName={agencyName} />
        </dialog>
    );
};

export default RequestMeetingComp;
