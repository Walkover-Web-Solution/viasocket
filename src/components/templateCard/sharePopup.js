import { useState } from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaCopy } from 'react-icons/fa';

const SharePopup = ({ title }) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const encodedTitle = encodeURIComponent(title || '');
    const encodedUrl = encodeURIComponent(url);

    const [copied, setCopied] = useState(false);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: <FaTwitter size={20} />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: 'Facebook',
            icon: <FaFacebookF size={20} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedinIn size={20} />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp size={20} />,
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedUrl}`,
        },
    ];

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="p-4 w-full h-fit border custom-border bg-white">
            <div className="cont gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="h3">Share this template</h3>
                </div>

                <div className="flex gap-2 justify-start items-center">
                    <div className="border custom-border transition flex items-center justify-center cursor-pointer bg-white h-[38px] relative">
                        <button onClick={handleCopy} className="flex items-center gap-2 p-2">
                            <FaCopy fontSize={20} /> Copy
                        </button>
                        {copied && (
                            <span className="absolute -bottom-7 right-0 bg-black text-white text-xs px-2 py-1 shadow">
                                Copied
                            </span>
                        )}
                    </div>
                    {shareLinks.map((link) => (
                        <div
                            key={link.name}
                            title={link.name}
                            onClick={() => {
                                window.open(link.url, '_blank', 'noopener,noreferrer');
                            }}
                            className="border custom-border p-2 transition flex items-center justify-center cursor-pointer bg-white"
                        >
                            {link.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SharePopup;
