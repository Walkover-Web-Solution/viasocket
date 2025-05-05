import { useEffect, useState, useRef } from 'react';
import { MdClose, MdAutoAwesome, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

export default function Support({ open, onClose }) {
    useEffect(() => {
        console.log('Support component loaded');
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const [integration, setIntegration] = useState('')
    const [loading, setLoading] = useState({ improvement: false, bug: false })
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    const ContactListArray = [
        {
            text: 'Chat with Us on WhatsApp',
            href: 'https://wa.me/+13154442439',
            target: '_blank',
            icon: <FaWhatsapp className="h-5 w-5 text-green-600" />
        },
        {
            text: 'Send Us an Email',
            onClick: () => (window.location.href = 'mailto:sales@viasocket.com'),
            icon: <MdEmail className="h-5 w-5 text-blue-500" />
        }
    ];
    const GalleryMediaArray = [
        {
            ytLink: {
                link: 'https://www.youtube.com/embed/eXDESTon83Y?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&cc_load_policy=0&start=0&end=20&loop=1&playlist=eXDESTon83Y',
                onClickLink: 'https://www.youtube.com/watch?v=eXDESTon83Y&list=PLFC2nhlwaR8wQqKIdNpFUJHRBqUrxH7A9'
            },
            heading: 'Video Gallery',
            subHeading: 'Watch tutorials and see usecases in action.'
        },
        {
            ytLink: {
                onClickLink: 'https://viasocket.com/templates'
            },
            heading: 'Templates',
            subHeading: 'Quick start with our curated templates.',
            CardMedia: {
                image: '/template_image.png',
                alt: 'Template Preview'
            }
        },
        {
            ytLink: {
                onClickLink: 'https://viasocket.com/faq'
            },
            heading: 'Knowledge Base',
            subHeading: 'Browse through our FAQs for quick help.',
            CardMedia: {
                image: '/faq_image.png',
                alt: 'FAQ Preview'
            }
        }
    ];
    
    const submitIntegrationOrBug = async (category) => {
        if (!integration.trim()) {
          return;
        }
      
        // Ensure category is one of the expected values
        const normalizedCategory = category.toLowerCase();
        if (!['improvement', 'bug'].includes(normalizedCategory)) {
          console.error('Invalid category');
          return;
        }
      
        setLoading((prev) => ({ ...prev, [normalizedCategory]: true }));
        const payload = {
          name,
          email,
          comment: integration,
          category: normalizedCategory
        };
      
        try {
          const response = await fetch('https://flow.sokt.io/func/scribcDzCIyV', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
      
          if (response.ok) {
            successToast('Your feedback has been submitted successfully!');
            setIntegration(''); // Reset the input field
          } else {
            console.error('Failed to hit webhook');
            errorToast('Failed to submit feedback. Please try again later.');
          }
        } catch (error) {
          console.error('Error hitting webhook:', error);
          errorToast('An error occurred. Please try again later.');
        } finally {
          setLoading((prev) => ({ ...prev, [normalizedCategory]: false }));
        }
      }
      

    return (
        <div className={`support-slider ${open ? 'open' : ''}`}>
            {/* Header */}
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
                    <input
                        type="text"
                        placeholder="Search for assistance..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border rounded-md p-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute left-3 top-2.5 text-indigo-500">
                        <MdAutoAwesome className="h-5 w-5" />
                    </span>
                </div>

                {/* Quick Questions */}
                <div className="flex flex-wrap gap-2 w-full mb-4">
                    {[
                        'How do I use delay?',
                        'How to apply promocode?',
                        'How can I check my billing details?',
                        'Can you guide me on setting up Embed?'
                    ].map((text) => (
                        <div
                            key={text}
                            onClick={() => {
                                setSearchQuery(text);
                                openChatBotCustom(text);
                                setSearchQuery('');
                            }}
                            className="p-2 bg-white rounded border border-gray-200 hover:bg-gray-100 cursor-pointer text-sm shadow-sm"
                        >
                            {text}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200" />

                {/* Contact Section */}
                <div className="mt-2 mb-4 px-4 space-y-4">
                    <h2 className="text-lg font-semibold">We'd Love to Hear From You! Reach out via:</h2>
                    <ul className="space-y-2">
                        {ContactListArray.map((item, index) => (
                            <li key={index}>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target={item.target}
                                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </a>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="flex items-center gap-2 p-2 rounded w-full text-left hover:bg-gray-100 transition"
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
                <div className="px-4 space-y-2">
                    <h5 className="mb-2 mt-2 text-xl font-semibold">Discover More</h5>
                    <div className="relative w-full mt-2 mb-4">
                        {/* Previous Arrow */}
                        {showLeftButton && (
                            <div className="absolute h-full top-0 -left-3 z-10" onClick={scrollLeft}>
                                <button className="p-2 bg-white shadow-lg rounded-full">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {/* Right Arrow */}
                        {showRightButton && (
                            <div className="absolute h-full top-0 -right-3 z-10" onClick={scrollRight}>
                                <button className="p-2 bg-white shadow-lg rounded-full">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Cards Container with Horizontal Scroll */}
                        <div className="flex overflow-x-scroll gap-2" ref={scrollContainerRef}>
                            {GalleryMediaArray.map((gallaryItem, index) => (
                                <div key={index} className="min-w-[180px] max-w-[200px] max-h-[300px] bg-white rounded-md shadow-md overflow-hidden">
                                    <a href={gallaryItem.ytLink?.onClickLink || "#"} target="_blank" rel="noopener noreferrer">
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
                        <div className="mt-2 px-4 space-y-2">
                            <h5 className="mb-2 text-xl font-semibold">We Value Your Feedback!</h5>
                            <p className="mb-2 text-sm text-gray-600">
                                Suggest a feature or report an issue.
                            </p>

                            {/* Feedback Textarea */}
                            <textarea
                                required
                                rows={3}
                                placeholder="Share your thoughts..."
                                value={integration}
                                onChange={(e) => setIntegration(e.target.value)}
                                className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="flex gap-2">
                                {/* Request a Feature Button */}
                                <button
                                    disabled={!integration}
                                    onClick={() => submitIntegrationOrBug('improvement')}
                                    className={`px-4 py-2 rounded border border-indigo-500 ${loading.improvement
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-indigo-500 hover:bg-indigo-50'
                                        }`}
                                >
                                    {loading.improvement ? 'Submitting...' : 'Request a Feature'}
                                </button>

                                {/* Report a Bug Button */}
                                <button
                                    disabled={!integration}
                                    onClick={() => submitIntegrationOrBug('bug')}
                                    className={`px-4 py-2 rounded bg-indigo-500 text-white ${loading.bug ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-indigo-600'
                                        }`}
                                >
                                    {loading.bug ? 'Submitting...' : 'Report a Bug'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
