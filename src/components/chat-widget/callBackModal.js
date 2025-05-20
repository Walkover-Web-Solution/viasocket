import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

function CallBackModal() {
    const [query, setQuery] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingMobile, setIsEditingMobile] = useState(false);

    const handleEditEmailClick = () => {
        setIsEditingEmail(true);
    };

    const handleEditMobileClick = () => {
        setIsEditingMobile(true);
    };

    const handleSubmit = async () => {
        if (phone.trim().length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert('Please enter a valid email address');
            return;
        }

        const payload = {
            phone: phone.trim(),
            email: email.trim(),
            query: query.trim(),
        };

        setQuery('');

        try {
            const response = await fetch('https://flow.sokt.io/func/scriOw4adAVk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Request submitted successfully!');
                document.getElementById('callback_modal').close();
            } else {
                console.error('Failed to submit response');
                alert('There was an error submitting your request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <dialog id="callback_modal" className="modal rounded-none">
            <div className="modal-box">
                <div className="flex flex-col gap-6">
                    <div>
                        <p>
                            We are here to assist you! Our dedicated team will reach out to you in approximately 10
                            minutes
                        </p>
                    </div>
                    <div className="flex gap-3 flex-col">
                        <div>
                            {isEditingEmail ? (
                                <input
                                    type="email"
                                    className="input input-bordered w-full focus:outline-none form-control"
                                    value={email}
                                    onChange={(e) => {
                                        const value = e.target.value.trim();
                                        if (value === '' || value.match(/^[a-zA-Z0-9._-]+@?[a-zA-Z0-9.-]*\.?[a-zA-Z]*$/)) {
                                            setEmail(value);
                                        }
                                    }}
                                    onBlur={() => setIsEditingEmail(false)}
                                    placeholder="Enter your email here"
                                />
                            ) : (
                                <div className="d-flex align-items-center">
                                    <span className="me-2">{email || 'Enter your email here*'}</span>
                                    <button type="button" className="btn btn-link p-0 outline-none" onClick={handleEditEmailClick}>
                                        <MdEdit />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            {isEditingMobile ? (
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-none form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    onBlur={() => setIsEditingMobile(false)}
                                    placeholder="Enter mobile number here"
                                />
                            ) : (
                                <div className="d-flex align-items-center">
                                    <span className="me-2">{phone || 'Enter mobile number here*'}</span>
                                    <button type="button" className="btn btn-link p-0 outline-none" onClick={handleEditMobileClick}>
                                        <MdEdit />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <textarea
                                className="textarea textarea-bordered focus:outline-none min-h-[100px] w-full form-control"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Specify your query here (optional)"
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="btn btn-accent min-w-[120px] xl:min-w-[130px]"
                            onClick={() => document.getElementById('callback_modal').close()}
                        >
                            Close
                        </button>
                        <button
                            disabled={phone.trim().length < 10 || !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)}
                            className="btn btn-primary min-w-[120px] xl:min-w-[130px]"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default CallBackModal;
