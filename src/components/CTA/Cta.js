import React from 'react';
import Link from 'next/link';

const Cta = ({ title, subDescription, description, buttonLabel, buttonLink, theme = 'white', newTab = false }) => {
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
            </div>
        </div>
    );
};

export default Cta;
