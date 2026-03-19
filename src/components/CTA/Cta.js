import React from 'react';
import Link from 'next/link';

const arrowIcon = (
    <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
        <g className="arrow-head">
            <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="arrow-body">
            <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>
);

const Cta = ({
    title,
    subDescription,
    description,
    buttonLabel,
    buttonLink,
    theme = 'dark',
    newTab = false,
    readMoreLink,
}) => {
    return (
        <div className="container">
            <div className={`cont border border-gray-700 gap-2 p-6 md:p-12 ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#1a1a1a]'}`}>
                <div className="cont gap-1">
                    <h2 className={`h2 text-left text-white`}>{title}</h2>

                    {subDescription && <p className={`text-2xl font-semibold text-accent`}>{subDescription}</p>}

                    {description && (
                        <h2 className={`sub__h1 text-gray-300 mt-2`}>{description}</h2>
                    )}
                </div>
                <Link href={buttonLink} target={newTab ? '_blank' : '_self'} className="w-fit mt-8">
                    <button
                        className={`btn bg-accent text-white hover:bg-[#ff8577] border-none`}
                    >
                        {buttonLabel}
                    </button>
                </Link>

                {readMoreLink && (
                    <Link href={readMoreLink} className="text-accent hover:underline w-fit flex items-center link-btn">
                        <span>Read more</span>
                        {arrowIcon}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Cta;
