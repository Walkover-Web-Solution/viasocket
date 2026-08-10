'use client';

import './logo-marquee.scss';

export default function LogoMarquee() {
    const logos = [
        'SaaSBoomi',
        'OneHash',
        'NUTRABAY',
        'RackBank',
        'MSG91',
    ];

    // Duplicate enough times so the track is always wider than any viewport
    const allLogos = [...Array(10)].flatMap(() => logos);

    return (
        <div className="flex flex-col gap-6 items-center">
            <p className="text-xs font-bold uppercase tracking-widest">
                Trusted by businesses worldwide
            </p>
            <div className="marquee-container">
                <div className="marquee-track flex gap-8 w-fit">
                    {allLogos.map((logo, index) => (
                        <span
                            key={index}
                            className={`text-sm text-gray-500 whitespace-nowrap flex items-center ${
                                logo === 'NUTRABAY' ? 'italic' : ''
                            }`}
                        >
                            {logo}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
