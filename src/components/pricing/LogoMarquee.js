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

    return (
        <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-accent uppercase tracking-widest">
                Trusted by businesses worldwide
            </p>
            <div className="marquee-container max-w-[46ch]">
                <div className="marquee-track flex gap-8 w-fit">
                    {[...logos, ...logos].map((logo, index) => (
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
