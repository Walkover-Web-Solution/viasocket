import { useState } from 'react';
import { MdClose, MdAutoAwesome, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { MdSupportAgent } from 'react-icons/md';
import { IoSendSharp } from 'react-icons/io5';
import CallBackModal from './callBackModal';

export default function Support({ open, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [integration, setIntegration] = useState('');
    const [loading, setLoading] = useState({ improvement: false, bug: false });

    const handleOpenModal = () => {
        document.getElementById('callback_modal').showModal();
    };

    const [launcher, setLauncher] = useState(false);
    const toggleChatWidget = () => {
        if (launcher) {
            window.chatWidget.close();
        } else {
            window.chatWidget.open();
        }
        setLauncher(!launcher);
    };
    const ContactListArray = [
        {
            text: 'Request a Callback Now',
            onClick: handleOpenModal,
            icon: <IoCall className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Chat with Us on WhatsApp',
            href: 'https://wa.me/+13154442439',
            target: '_blank',
            icon: <FaWhatsapp className="h-5 w-5 text-green-600" />,
        },
        {
            text: 'Send Us an Email',
            onClick: () => (window.location.href = 'mailto:sales@viasocket.com'),
            icon: <MdEmail className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Live chat now',
            onClick: () => {
                toggleChatWidget();
                onClose();
            },
            icon: <MdSupportAgent className="h-5 w-5" />,
        },
    ];
    const GalleryMediaArray = [
        {
            ytLink: {
                link: 'https://www.youtube.com/embed/eXDESTon83Y?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&cc_load_policy=0&start=0&end=20&loop=1&playlist=eXDESTon83Y',
                onClickLink: 'https://www.youtube.com/watch?v=eXDESTon83Y&list=PLFC2nhlwaR8wQqKIdNpFUJHRBqUrxH7A9'
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

    const submitIntegrationOrBug = async (category) => {
        if (!integration.trim()) {
            return;
        }
        setLoading((prev) => ({ ...prev, [category.toLowerCase()]: true }));
        const payload = {
            name,
            email,
            comment: integration,
            category,
        };

        try {
            const response = await fetch('https://flow.sokt.io/func/scribcDzCIyV', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                successToast('Your feedback has been submitted successfully!');
                setIntegration('');
            } else {
                console.error('Failed to hit webhook');
                errorToast('Failed to submit feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error hitting webhook:', error);
            errorToast('An error occurred. Please try again later.');
        } finally {
            setLoading((prev) => ({ ...prev, [category.toLowerCase()]: false }));
        }
    };

    return (
        <div className={`support-slider pb-24 ${open ? 'open' : ''}`}>
            <div className="flex justify-between items-center mb-2 p-4 border-b">
                <h2 className="text-2xl font-bold">Support & Feedback</h2>
                <button onClick={onClose} aria-label="Close">
                    <MdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Quick Help Section */}
            <div className="px-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">Ask Our Bot</h3>
                    <MdAutoAwesome className="h-5 w-5 text-indigo-500" />
                </div>

                {/* Search Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2  -translate-y-1/2">
                        <MdAutoAwesome className="h-5 w-5 text-indigo-500" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search for assistance..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border p-2 px-10"
                    />

                    {searchQuery && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            <IoSendSharp className="h-5 w-5" />
                        </span>
                    )}
                </div>

                {/* Quick Questions */}
                <div className="flex flex-wrap gap-2 w-full mb-4">
                    {[
                        'How do I use delay?',
                        'How to apply promocode?',
                        'How can I check my billing details?',
                        'Can you guide me on setting up Embed?',
                    ].map((text) => (
                        <div
                            key={text}
                            onClick={() => {
                                setSearchQuery(text);
                                openChatBotCustom(text);
                                setSearchQuery('');
                            }}
                            className="p-2 bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {text}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200" />

                {/* Contact Section */}
                <div className="mt-2 mb-4 space-y-4">
                    <h2 className="text-lg font-semibold">We'd Love to Hear From You! Reach out via:</h2>
                    <ul className="space-y-2">
                        {ContactListArray.map((item, index) => (
                            <li key={index}>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target={item.target}
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-100 transition"
                                    >
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200" />
                <div className="space-y-2">
                    <h5 className="mb-2 mt-2 text-xl font-semibold">Discover More</h5>
                    <div className="relative w-full mt-2 mb-4">
                        <div className="flex overflow-x-scroll gap-2">
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
                                            <iframe
                                                className="w-[200px] h-[140px]"
                                                src={gallaryItem.ytLink.link}
                                                title="YouTube video"
                                                allow="autoplay; encrypted-media"
                                            />
                                        ) : (
                                            <img
                                                className="w-full h-[140px] object-cover"
                                                src={gallaryItem.CardMedia?.image}
                                                alt={gallaryItem.CardMedia?.alt}
                                            />
                                        )}
                                        <div className="p-2">
                                            <h6 className="text-md font-medium">{gallaryItem.heading}</h6>
                                            <p className="text-sm text-gray-500">{gallaryItem.subHeading}</p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 space-y-2">
                            <h5 className="mb-2 text-xl font-semibold">We Value Your Feedback!</h5>
                            <p className="mb-2 text-sm text-gray-600">Suggest a feature or report an issue.</p>

                            {/* Feedback Textarea */}
                            <textarea
                                required
                                rows={3}
                                placeholder="Share your thoughts..."
                                value={integration}
                                onChange={(e) => setIntegration(e.target.value)}
                                className="w-full p-2 border"
                            />

                            <div className="flex gap-2">
                                {/* Request a Feature Button */}
                                <button
                                    disabled={!integration}
                                    onClick={() => submitIntegrationOrBug('Improvement')}
                                    className="btn btn-primary btn-outline"
                                >
                                    {loading.improvement ? 'Submitting...' : 'Request a Feature'}
                                </button>

                                {/* Report a Bug Button */}
                                <button
                                    disabled={!integration}
                                    onClick={() => submitIntegrationOrBug('Bug')}
                                    className="btn btn-md btn-accent"
                                >
                                    {loading.bug ? 'Submitting...' : 'Report a Bug'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CallBackModal />
        </div>
    );
}
