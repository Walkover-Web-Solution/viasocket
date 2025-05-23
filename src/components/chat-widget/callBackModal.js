import React, { useState } from 'react';

function CallBackModal() {
    const [query, setQuery] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

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

    const isEmailValid = email === '' || email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const isPhoneValid = phone === '' || phone.trim().length === 10;

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
                    <div className="flex gap-6 flex-col">
                        <div>
                            <label className="block text-sm mb-1">Enter your email here*</label>
                            <input
                                type="email"
                                className={`input input-bordered custom-border w-full focus:outline-none form-control ${!isEmailValid ? 'border-red-500' : ''}`}
                                value={email}
                                onChange={(e) => {
                                    const value = e.target.value.trim();
                                    if (value === '' || value.match(/^[a-zA-Z0-9._-]+@?[a-zA-Z0-9.-]*\.?[a-zA-Z]*$/)) {
                                        setEmail(value);
                                    }
                                }}
                                placeholder="Example: example@email.com"
                            />
                            {!isEmailValid && (
                                <small className="text-red-500">Please enter a valid email address</small>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Enter mobile number here*</label>
                            <input
                                type="text"
                                className={`input input-bordered custom-border w-full focus:outline-none form-control ${!isPhoneValid ? 'border-red-500' : ''}`}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                placeholder="Example: 9876543210"
                            />
                            {!isPhoneValid && phone !== '' && (
                                <small className="text-red-500">Please enter a valid 10-digit mobile number</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm mb-1">Specify your query here (optional)</label>
                            <textarea
                                className="textarea textarea-bordered custom-border focus:outline-none min-h-[100px] w-full form-control"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Specify your query here"
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            disabled={
                                phone.trim().length < 10 ||
                                !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                            }
                            className="btn btn-accent min-w-[120px] xl:min-w-[130px]"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-primary min-w-[120px] xl:min-w-[130px]"
                            onClick={() => document.getElementById('callback_modal').close()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default CallBackModal;
