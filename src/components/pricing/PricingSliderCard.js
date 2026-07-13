'use client';

import { useState, useEffect } from 'react';

export default function PricingSliderCard({ hasToken }) {
    const [tasksValue, setTasksValue] = useState(2000);
    const [creditsValue, setCreditsValue] = useState(500);
    const [isExceeded, setIsExceeded] = useState(false);

    useEffect(() => {
        const exceeds = tasksValue > 2000 || creditsValue > 500;
        setIsExceeded(exceeds);
    }, [tasksValue, creditsValue]);

    const handleTasksChange = (e) => {
        setTasksValue(Number(e.target.value));
    };

    const handleCreditsChange = (e) => {
        setCreditsValue(Number(e.target.value));
    };

    return (
        <div className="relative bg-white border border-gray-200 rounded-xl p-6 w-full lg:max-w-lg">
            {/* Badge */}
            <span
                className={`absolute top-0 right-6 px-3.5 py-1.5 text-xs font-bold rounded-b-lg transition-all ${
                    isExceeded
                        ? 'bg-red-700 text-white'
                        : 'bg-red-50 text-red-700'
                }`}
            >
                {isExceeded ? 'Upgrade plan' : 'Free plan'}
            </span>

            {/* Mac Dots */}
            <div className="flex gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">Estimate your usage</h3>
            <p className="text-sm text-gray-600 mb-6">Drag the sliders to see what fits your team.</p>

            {/* Tasks Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2.5">
                    <span className="text-xs font-semibold text-gray-900">Tasks / month</span>
                    <span className="text-base font-bold text-red-700">{tasksValue.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={tasksValue}
                    onChange={handleTasksChange}
                    className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-red-700"
                />
            </div>

            {/* Credits Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2.5">
                    <span className="text-xs font-semibold text-gray-900">AI credits / month</span>
                    <span className="text-base font-bold text-red-700">{creditsValue.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={creditsValue}
                    onChange={handleCreditsChange}
                    className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-red-700"
                />
            </div>

            {/* Status Message */}
            {!isExceeded ? (
                <div className="flex flex-col gap-4 bg-green-50 rounded-lg p-5 mt-1">
                    <p className="text-xs font-semibold text-green-700">
                        You're within the free plan. Sign up and create your first automation for free.
                    </p>
                    <button
                        className="w-full h-10 px-4 py-2 border border-black rounded-full font-semibold text-sm hover:bg-black hover:text-white transition-all"
                        onClick={() => (window.location.href = '/signup')}
                    >
                        Sign up to view your plan →
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 bg-red-50 rounded-lg p-5 mt-1">
                    <p className="text-xs font-semibold text-gray-900">
                        You're ready to scale. Sign up for a plan matched to your usage.
                    </p>
                    <button
                        className="w-full h-10 px-4 py-2 border border-black rounded-full font-semibold text-sm hover:bg-black hover:text-white transition-all"
                        onClick={() => (window.location.href = '/signup')}
                    >
                        Sign up to view your plan →
                    </button>
                </div>
            )}
        </div>
    );
}
