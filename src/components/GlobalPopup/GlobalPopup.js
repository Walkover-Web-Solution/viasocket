import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

const POPUP_DELAY_MS = 5000; // 5 seconds

const GlobalPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, POPUP_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-[#faf9f6] p-6 shadow-lg border custom-border">
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close popup"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
                >
                    ×
                </button>
                <div className="space-y-4 pt-2">
                    <div className="h3 text-center uppercase tracking-tight">
                        <p className="text-3xl sm:text-4xl font-semibold">BLACK FRIDAY</p>
                        <p className="text-3xl sm:text-4xl font-semibold text-accent">SALE 2025</p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl text-center max-w-xs mx-auto">
                            Top AI & SaaS tools
                            <br />
                            on discount
                        </h2>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Link href="/black-friday-sale" target="_blank" className="btn btn-accent gap-1" onClick={handleClose}>
                            Grab deals now<MdOutlineArrowRightAlt size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalPopup;
