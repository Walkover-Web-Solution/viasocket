import React, { useEffect, useState } from 'react';
import { formatCurrency, convertCurrency } from '@/utils/currencyConverter';

const MoreCreditComp = ({ selectedCountryData}) => {
    const [credits, setCredits] = useState(40000); // initial credits
    const [formattedPrice, setFormattedPrice] = useState();
    const [discountedPrice, setDiscountedPrice] = useState();

    const handleIncrement = () => {
        setCredits(prev => prev + 10000);
    };

    const handleDecrement = () => {
        setCredits(prev => (prev > 10000 ? prev - 10000 : prev));
    };

    useEffect(() => {
        async function updatePricing() {
            try {
                if (selectedCountryData) {
                    // Fetch base price per 10k credits for the selected country
                    const { creditPricing } = await convertCurrency(selectedCountryData.codes);
                    console.log(creditPricing)
                    // Calculate current price based on credits
                    const currentPrice = (credits / 10000) * creditPricing;

                    const formatted = await formatCurrency(currentPrice, selectedCountryData.symbol);
                    const discounted = await formatCurrency(currentPrice * 0.5, selectedCountryData.symbol);

                    setFormattedPrice(formatted);
                    setDiscountedPrice(discounted);
                } else {
                    // fallback to USD pricing if no country data
                    const currentPrice = (credits / 10000) * 25;
                    setFormattedPrice(`$${currentPrice}`);
                    setDiscountedPrice(`$${currentPrice * 0.8}`);
                }
            } catch (error) {
                console.error('Error updating pricing:', error);
                // fallback in case of error
                const currentPrice = (credits / 10000) * 25;
                setFormattedPrice(`$${currentPrice}`);
                setDiscountedPrice(`$${currentPrice * 0.8}`);
            }
        }

        updatePricing();
    }, [credits, selectedCountryData]);

    return (
        <div className="cont border custom-border p-10 bg-white w-full">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="h2">Buy More Credits</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* LEFT: Credit Selector */}
                <div className="flex flex-col items-center gap-6">
                    <p className="text-lg text-gray-600">Select your credits</p>

                    <div className="flex items-center gap-6">
                        <button
                            className="btn h-14 w-14 text-2xl font-bold bg-gray-100 hover:bg-gray-200 transition"
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="px-8 py-4 border custom-border text-3xl font-semibold text-center w-[200px] bg-gray-50">
                            {credits.toLocaleString()}
                        </div>

                        <button
                            className="btn h-14 w-14 text-2xl font-bold bg-gray-100 hover:bg-gray-200 transition"
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* RIGHT: Price + Features */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        {selectedCountryData?.isdeveloping && (
                            <p className="text-lg line-through text-gray-400">{formattedPrice}</p>
                        )}
                        <p className="text-3xl font-bold text-accent">
                            {selectedCountryData?.isdeveloping ? discountedPrice : formattedPrice}
                        </p>
                        {selectedCountryData?.isdeveloping && (
                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-semibold">
                                50% OFF
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn btn-accent px-6 py-3 text-lg font-medium transition">
                            Buy Credits
                        </button>
                        <button className="btn btn-outline px-6 py-3 text-lg font-medium">
                            Start Free
                        </button>
                    </div>

                    <p className="text-gray-600 text-sm">
                        Buy credits now or start with our free plan and top up later.
                    </p>

                    <ul className="space-y-3 text-md text-gray-700">
                        <li className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 bg-accent" />
                            Used in paid built-in plugs
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 bg-accent" />
                            1 credit = 2 tasks
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 bg-accent" />
                            Use credits as tasks, When your tasks are consumed
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MoreCreditComp;