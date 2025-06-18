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
    theme = 'white',
    newTab = false,
    readMoreLink,
}) => {
    return (
        <div className="container">
            <div className={`cont border custom-border gap-2 p-12 ${theme === 'white' ? 'bg-white' : 'bg-black'}`}>
                <div className="cont gap-1">
                    <h2 className={`h2 text-left ${theme === 'white' ? 'text-black' : 'text-white'}`}>{title}</h2>

                    {subDescription && <p className={`text-2xl font-semibold text-accent`}>{subDescription}</p>}

                    {description && (
                        <h3 className={`sub__h1 ${theme === 'white' ? 'text-black' : 'text-white'}`}>{description}</h3>
                    )}
                </div>
                <Link href={buttonLink} target={newTab ? '_blank' : '_self'} className="w-fit mt-8">
                    <button
                        className={`btn ${theme === 'white' ? 'btn-accent' : 'bg-accent text-white hover:bg-white hover:text-black border-none'}`}
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
