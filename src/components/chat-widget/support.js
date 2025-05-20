import { useEffect, useRef } from 'react';
import { MdClose, MdCircle, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import CallBackModal from './callBackModal';

function NavList({ items }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2">
            {items.map((item, i) => (
                <li key={i} className="hover:bg-gray-100 text-black p-2">
                    <a href={item?.link} className="flex flex-col">
                        <span className="text-lg hover:text-accent hover:underline">{item?.names}</span>
                        <span className="text-sm text-gray-700 hover:underline">{item?.description}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Support({ open, onClose, navData }) {
    const panelRef = useRef();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    const handleOpenModal = () => {
        document.getElementById('callback_modal')?.showModal();
    };

    const toggleChatWidget = () => {
        window.chatWidget?.open();
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
            text: 'Chat on WhatsApp',
            href: 'https://wa.me/+13154442439',
            target: '_blank',
            icon: <FaWhatsapp className="h-5 w-5 text-green-600" />,
        },
        {
            text: 'Live Chat Now',
            onClick: () => {
                toggleChatWidget();
                onClose();
            },
            icon: <MdCircle className="text-green-600 h-5 w-5" />,
        },
    ];

    const Pricing = [{ link: '/pricing', names: 'Plans & Pricing', description: 'AI Automation plans and pricing' }];

    return (
        <div className={`fixed inset-0 z-50 pointer-events-${open ? 'auto' : 'none'}`}>
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
                ref={panelRef}
                className={`absolute top-0 right-0 h-full w-full md:max-w-[40%] bg-white border-l transparent-border-black shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-end p-2">
                    <button onClick={onClose} aria-label="Close" className="p-1">
                        <MdClose size={22} />
                    </button>
                </div>

                <div className="flex flex-col justify-between">
                    {navData && (
                        <div className="cont gap-4">
                            {navData
                                .filter((option) => option?.is_parent)
                                .map((option, index) => {
                                    const childItems = navData.filter(
                                        (child) => child?.is_child && child?.name === option?.names
                                    );
                                    return (
                                        <section key={index} className="border-b px-4 pb-4">
                                            <h3 className="text-xl font-semibold px-2 mb-2">
                                                {option?.names || option?.name}
                                            </h3>
                                            {childItems.length > 0 && <NavList items={childItems} />}
                                        </section>
                                    );
                                })}

                            <section className="border-b p-5">
                                <h3 className="text-xl font-semibold px-2 mb-2">Pricing</h3>
                                <NavList items={Pricing} />
                            </section>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold px-5 pt-5 mb-2">We'd Love to Hear From You!</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 border border-b-0">
                            {ContactListArray.map((item, index) => (
                                <li key={index} className="hover:bg-gray-100 transition border-b border-r">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.target}
                                            rel="noreferrer"
                                            className="flex items-center gap-2 py-2 px-5"
                                        >
                                            {item.icon}
                                            <span className="text-sm">{item.text}</span>
                                        </a>
                                    ) : (
                                        <button
                                            onClick={item.onClick}
                                            className="flex items-center gap-2 py-2 px-5 w-full text-left"
                                        >
                                            {item.icon}
                                            <span className="text-sm">{item.text}</span>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <CallBackModal />
            </div>
        </div>
    );
}
