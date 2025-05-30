import { useEffect, useRef } from 'react';
import { MdCircle, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import CallBackModal from './callBackModal';
import { X } from 'lucide-react';

function NavList({ items }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 list-none">
            {items?.map((item, i) => (
                <li key={i} className="hover:bg-gray-100 text-black p-2">
                    <a href={item?.link} className="flex flex-col">
                        <span className="text-lg hover:text-accent hover:underline">{item?.name}</span>
                        <span className="text-sm text-gray-700 hover:underline">{item?.description}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Support({ open, onClose, footerData }) {
    const panelRef = useRef();

    let groups = [];
    if (footerData?.length) {
        const prioritizedItems = footerData?.filter((item) => item?.priority);
        groups = prioritizedItems
            ?.sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
            ?.map((item) => item.group_name);
    }

    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.relatedTarget)) {
                onClose();
            }
        };

        if (open) {
            panelRef.current?.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            panelRef.current?.removeEventListener('mouseleave', handleMouseLeave);
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
            text: 'Request a callback now',
            onClick: handleOpenModal,
            icon: <IoCall className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Send us an email',
            onClick: () => (window.location.href = 'mailto:sales@viasocket.com'),
            icon: <MdEmail className="h-5 w-5 text-blue-500" />,
        },
        {
            text: 'Chat on whatsApp',
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
            icon: <MdCircle className="text-green-600 h-5 w-5" />,
        },
    ];

    const Pricing = [{ link: '/pricing', name: 'Plans & Pricing', description: 'AI Automation plans and pricing' }];

    return (
        <div className={`fixed inset-0 z-[9999] pointer-events-${open ? 'auto' : 'none'}`}>
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
                ref={panelRef}
                className={`absolute top-0 right-0 h-full w-full md:max-w-[40%] bg-white border-l custom-border shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="sm:hidden flex justify-end p-4">
                    <X className="h-8 w-8" onClick={onClose} />
                </div>
                <div className="cont justify-between h-full pt-0 sm:pt-8">
                    {footerData && (
                        <div className="cont gap-4">
                            {groups?.map((group, index) => {
                                const groupItems = footerData.filter((item) => group === item?.group_name);
                                return (
                                    <div key={index} className="border-b px-4 pb-4">
                                        <h3 className="text-xl font-semibold px-2 mb-2">{group}</h3>
                                        {groupItems?.length > 0 && <NavList items={groupItems} />}
                                    </div>
                                );
                            })}
                            <section className="border-b p-5">
                                <h3 className="text-xl font-semibold px-2 mb-2">Pricing</h3>
                                <NavList items={Pricing} />
                            </section>
                        </div>
                    )}

                    <div className="">
                        <h3 className="text-xl font-semibold px-5 pt-5 mb-2">We'd love to hear from you!</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 border border-b-0 list-none">
                            {ContactListArray.map((item, index) => (
                                <li key={index} className="hover:bg-gray-100 transition border-b border-r">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.target}
                                            rel="noreferrer"
                                            className="flex items-center gap-2 py-4 px-6"
                                        >
                                            {item.icon}
                                            <span className="text-lg">{item.text}</span>
                                        </a>
                                    ) : (
                                        <button
                                            onClick={item.onClick}
                                            className="flex items-center gap-2 py-4 px-6 w-full text-left"
                                        >
                                            {item.icon}
                                            <span className="text-lg">{item.text}</span>
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
