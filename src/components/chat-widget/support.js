import { useEffect, useState } from 'react';
import { MdClose, MdCircle, MdEmail, MdKeyboardArrowRight } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import CallBackModal from './callBackModal';
import { setUtmSource } from '@/utils/handleUtmSource';
import Link from 'next/link';

export default function Support({ open, onClose }) {
    const [defaultUtmSource, setDefaultUtmSource] = useState('');
    const source = typeof window !== 'undefined' ? window.location.pathname : '';

    useEffect(() => {
        const utmData = setUtmSource({ source: source });
        setDefaultUtmSource(utmData);
    }, []);

    const handleOpenModal = () => {
        document.getElementById('callback_modal').showModal();
    };

    const toggleChatWidget = () => {
        window.chatWidget.open();
    };
    const ContactListArray = [
        {
            text: 'Request a Callback Now',
            onClick: handleOpenModal,
            icon: <IoCall className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Send Us an Email',
            onClick: () => (window.location.href = 'mailto:sales@viasocket.com'),
            icon: <MdEmail className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Chat on whatsapp',
            href: 'https://wa.me/+13154442439',
            target: '_blank',
            icon: <FaWhatsapp className="h-5 w-5 text-green-600" />,
        },
        {
            text: 'Live chat now',
            onClick: () => {
                toggleChatWidget();
                onClose();
            },
            icon: <MdCircle color="#16a24a" />,
        },
    ];
    const GalleryMediaArray = [
        {
            ytLink: {
                link: 'https://www.youtube.com/embed/jatLtH-EIhQ?autoplay=1&mute=1&rel=0&controls=0&cc_load_policy=0&start=0&end=20&loop=1&playlist=jatLtH-EIhQ',
                onClickLink: 'https://www.youtube.com/playlist?list=PLFC2nhlwaR8wQqKIdNpFUJHRBqUrxH7A9',
            },
            heading: 'Video Gallery',
            subHeading: 'Watch tutorials and see usecases in action.',
        },
        {
            ytLink: {
                onClickLink: 'https://viasocket.com/templates',
            },
            heading: 'Templates',
            subHeading: 'Quick start with our curated templates.',
            CardMedia: {
                image: '/assets/img/template_image.png',
                alt: 'Template Preview',
            },
        },
        {
            ytLink: {
                onClickLink: 'https://viasocket.com/faq',
            },
            heading: 'Knowledge Base',
            subHeading: 'Browse through our FAQs for quick help.',
            CardMedia: {
                image: '/assets/img/faq_image.png',
                alt: 'FAQ Preview',
            },
        },
    ];
    const MCPListArray = [
        {
            text: '1. For <link>MCP</link>',
            onClick: () => {
                window.location.href = '/mcp';
            },
        },
        {
            text: '2. Make it available as <link>plug</link> and play in flow',
            onClick: () => {
                window.location.href = '/embed';
            },
        },
        {
            text: '3. To be visible in our <link>explorer/discovery</link>',
            onClick: () => {
                window.location.href = '/discovery';
            },
        },
    ];

    const navOptions = [
        {
            text: 'Explore Apps',
            border: false,
            onClick: () => {
                window.location.href = '/discovery';
            },
        },
        {
            text: 'Features',
            border: false,
            onClick: () => {
                window.location.href = '/features';
            },
        },
        {
            text: 'Pricing',
            border: false,
            onClick: () => {
                window.location.href = '/pricing';
            },
        },
        {
            text: 'Login',
            border: true,
            onClick: () => {
                window.location.href = `https://flow.viasocket.com?state=${defaultUtmSource}`;
            },
        },
        {
            text: 'Sign Up',
            border: true,
            onClick: () => {
                window.location.href = `/signup?state=${defaultUtmSource}`;
            },
        },
    ];

    return (
        <div className={`support-slider pb-24 ${open ? 'open' : ''}`}>
            <Link href="/mcp">
                <div className="w-full flex items-center gap-1 py-2 px-3 transparent-border-black bg-accent border-b border-b-black">
                    <p className="!text-base text-white hover:underline">Connect your AI agent with MCP</p>
                    <MdKeyboardArrowRight className="text-white h-5 w-5" />
                </div>
            </Link>

            {/* Connection Section */}
            <div className="flex flex-col gap-4 p-4 bg-gray-100">
                <h3 className="h3">1,000+ Apps Ready to Connect</h3>
                <button
                    onClick={() =>
                        (window.location.href = 'https://cal.id/team/bring-your-app-on-viasocket-marketplace')
                    }
                    className="btn btn-primary btn-outline !px-4 min-w-[120px] xl:min-w-[130px]"
                >
                    <span>Bring your app</span>
                </button>
                <ol className="list-ordered !mt-1">
                    {MCPListArray.map((item, index) => (
                        <li key={index} className="px-2 py-1 !mt-0">
                            {item.text.split('<link>').map((part, partIndex) => {
                                if (partIndex === 0) {
                                    return <span key={partIndex}>{part}</span>;
                                } else {
                                    return (
                                        <span key={partIndex}>
                                            <a
                                                onClick={item.onClick}
                                                className="text-blue-500 underline cursor-pointer"
                                            >
                                                {part.split('</link>')[0]}
                                            </a>
                                            {part.split('</link>')[1]}
                                        </span>
                                    );
                                }
                            })}
                        </li>
                    ))}
                </ol>
            </div>
            {/* Divider */}
            <div className="mb-4 border-t border-gray-200" />

            <div className="space-y-4">
                <div className="space-y-2">
                    <h5 className="px-4 my-2 h3">Discover More</h5>
                    <div className="relative w-full mt-2 mb-4">
                        <div className="px-4 flex overflow-x-scroll gap-2">
                            {GalleryMediaArray.map((gallaryItem, index) => (
                                <div
                                    key={index}
                                    className="min-w-[180px] max-w-[200px] max-h-[300px] bg-white overflow-hidden"
                                >
                                    <a
                                        href={gallaryItem.ytLink?.onClickLink || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {gallaryItem.ytLink?.link ? (
                                            <div className="relative w-[200px] h-[140px]">
                                                <iframe
                                                    className="w-[200px] h-[140px] !pointer-events-none"
                                                    src={gallaryItem.ytLink.link}
                                                    title="YouTube video"
                                                    allow="autoplay; encrypted-media"
                                                />
                                                <div
                                                    onClick={() =>
                                                        window.open(gallaryItem.ytLink.onClickLink, '_blank')
                                                    }
                                                    className="absolute top-0 left-0 w-full h-full cursor-pointer bg-transparent"
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                className="w-full h-[140px] object-cover"
                                                src={gallaryItem.CardMedia?.image}
                                                alt={gallaryItem.CardMedia?.alt}
                                            />
                                        )}
                                        <div className="p-2">
                                            <h6 className="text-lg font-medium">{gallaryItem.heading}</h6>
                                            <p className="text-sm text-gray-500">{gallaryItem.subHeading}</p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="my-4 border-t border-gray-200" />
                    </div>
                </div>

                <div className="px-4 mt-2 mb-4 space-y-4">
                    <h3 className="h3">We'd Love to Hear From You! Reach out via:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ContactListArray.map((item, index) => (
                            <li key={index} className="">
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target={item.target}
                                        className="flex items-center gap-2 p-2 transition cursor-pointer"
                                    >
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="flex items-center gap-2 p-2 w-full text-left transition"
                                    >
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <CallBackModal />
        </div>
    );
}
