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
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="h2">Buy More Credits</h2>
            </div>
            <div className="border custom-border p-10 bg-white w-full">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* LEFT: Credit Selector */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center h-14">
                            <button
                                className="btn h-14 w-14 text-2xl font-bold hover:bg-black hover:text-white transition border-0"
                                onClick={handleDecrement}
                                aria-label="Decrement credits"
                            >
                                <FiMinus />
                            </button>

                            <div className="px-8 h-11 flex items-center justify-center border custom-border text-2xl font-semibold text-center w-[200px]">
                                {credits.toLocaleString()}
                            </div>

                            <button
                                className="btn h-14 w-14 text-2xl font-bold hover:bg-black hover:text-white transition border-0"
                                onClick={handleIncrement}
                                aria-label="Increment credits"
                            >
                                <FiPlus />
                            </button>
                        </div>
                        <p className="text-lg text-gray-600">Select your credits</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-accent">{formattedPrice}</p>
                        </div>
                        <ul className="space-y-3 text-md text-gray-700">
                            <li className="flex items-center gap-3">
                                <GiCheckMark className="text-accent" />
                                Used in paid built-in plugs
                            </li>
                            <li className="flex items-center gap-3">
                                <GiCheckMark className="text-accent" />1 credit = 2 tasks
                            </li>
                            <li className="flex items-center gap-3 ml-6">
                                Use credits as tasks, When your tasks are consumed
                            </li>
                            <li className="flex items-center gap-3">
                                <GiCheckMark className="text-accent" />
                                <Link
                                    href="https://viasocket.com/help/plans-and-pricing/what-are-credits"
                                    target="_blank"
                                    className="text-accent hover:underline w-fit"
                                >
                                    Know more
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreCreditComp;
