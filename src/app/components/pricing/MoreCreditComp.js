import React, { useEffect, useState } from 'react';
import { formatCurrency, convertCurrency } from '@/utils/currencyConverter';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { GiCheckMark } from 'react-icons/gi';

const MoreCreditComp = ({ selectedCountryData }) => {
    const [credits, setCredits] = useState(40000); // initial credits
    const [formattedPrice, setFormattedPrice] = useState();
    const [discountedPrice, setDiscountedPrice] = useState();

    const handleIncrement = () => {
        setCredits((prev) => prev + 10000);
    };

    const handleDecrement = () => {
        setCredits((prev) => (prev > 10000 ? prev - 10000 : prev));
    };

    useEffect(() => {
        async function updatePricing() {
            try {
                if (selectedCountryData) {
                    // Fetch base price per 10k credits for the selected country
                    const { creditPricing } = await convertCurrency(selectedCountryData.codes);
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
        <div className="cont  w-full">
            <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 2px solid black;
                    cursor: pointer;
                }
                input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 2px solid black;
                    cursor: pointer;
                }
            `}</style>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="h2">Buy More Credits</h2>
            </div>
            <div className="border custom-border p-10 bg-white w-full">
                <div className="flex flex-col items-center gap-16">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg mb-2">Total Price</p>
                        <p className="text-3xl font-bold text-accent mb-1">{formattedPrice}</p>
                        <p className="text-gray-500">for {credits.toLocaleString()} credits</p>
                    </div>

                    <div className="w-full max-w-3xl">
                        <div className="text-center mb-4">
                            <span className="text-2xl font-semibold">{credits.toLocaleString()}</span>
                            <span className="text-gray-500 ml-2">credits</span>
                        </div>
                        
                        <div className="relative">
                            <input
                                type="range"
                                min="10000"
                                max="200000"
                                step="10000"
                                value={credits}
                                onChange={(e) => setCredits(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, black 0%, black ${((credits - 10000) / (200000 - 10000)) * 100}%, #e5e7eb ${((credits - 10000) / (200000 - 10000)) * 100}%, #e5e7eb 100%)`
                                }}
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>10,000</span>
                                <span>200,000</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-3 w-full max-w-2xl">
                        <div className="flex items-center gap-3">
                            <GiCheckMark className="text-accent flex-shrink-0" />
                            <span className="text-gray-700">Used in paid built-in plugs</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <GiCheckMark className="text-accent flex-shrink-0" />
                            <span className="text-gray-700">Credits consumed as tasks run</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <GiCheckMark className="text-accent flex-shrink-0" />
                            <span className="text-gray-700">1 credit = 2 tasks</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <GiCheckMark className="text-accent flex-shrink-0" />
                            <span className="text-gray-700">No expiration date</span>
                        </div>
                    </div>

                    <button className="btn btn-accent text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                        Purchase {credits.toLocaleString()} Credits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoreCreditComp;
