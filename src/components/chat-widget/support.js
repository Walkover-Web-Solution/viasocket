import { useEffect, useRef } from 'react';
import { MdClose, MdCircle, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import CallBackModal from './callBackModal';

function NavList({ items }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2">
            {items.map(({ href, title, subtitle }, i) => (
                <li key={i} className="hover:bg-gray-100 text-black p-2">
                    <a href={href} className="flex flex-col">
                        <span className="text-lg hover:text-accent hover:underline">{title}</span>
                        <span className="text-sm text-gray-700 hover:underline">{subtitle}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Support({ open, onClose }) {
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

    const aiAutomationItems = [
        { href: '/integrations', title: 'Apps Integrations', subtitle: 'Explore 1,500+ app connections' },
        { href: '/features', title: 'Features', subtitle: 'Features to optimize your experience' },
        { href: 'https://cal.id/team/bring-your-app-on-viasocket-marketplace', title: 'List Your App', subtitle: 'Bring your app on viaSocket' },
        { href: '/templates', title: 'Templates', subtitle: 'Library of Automation Workflows' },
        { href: 'https://viasocket.com/discovery', title: 'Explore Apps', subtitle: 'Explore Top Apps by Category' },
        { href: '/embed', title: 'Embed', subtitle: 'Embed viaSocket in your SaaS/AI' },
    ];

    const mcpItems = [
        { href: '/mcp', title: 'MCP Marketplace', subtitle: 'Connect Your AI to 1500+ Apps' },
        { href: '/mcp/aiagent', title: 'MCP for AI Agent Builders', subtitle: 'Embed Actions for AI Agents' },
        { href: '/mcp/saas', title: 'MCP for SaaS', subtitle: 'Launch Your MCP Server on Your SaaS' },
    ];

    const partnersItems = [
        { href: '/experts', title: 'Find a Partner', subtitle: 'Find the perfect partner' },
        { href: 'https://viasocket.com/faq/partners/automation-experts', title: 'Become a Partner', subtitle: 'Help your customers to automate anything' },
    ];

    return (
        <div className={`fixed inset-0 z-50 pointer-events-${open ? 'auto' : 'none'}`}>
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
                ref={panelRef}
                className={`absolute top-0 right-0 h-full w-full md:max-w-[40%] bg-white border-l shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-end p-3">
                    <button onClick={onClose} aria-label="Close" className="p-1">
                        <MdClose size={22} />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[94%] overflow-y-auto">
                    <div className="flex flex-col">
                        <section className="border-b px-5 pb-5 pt-0">
                            <h3 className="text-xl font-semibold px-2 mb-2">AI & Automation</h3>
                            <NavList items={aiAutomationItems} />
                        </section>

                        <section className="border-b p-5">
                            <h3 className="text-xl font-semibold px-2 mb-2">MCP</h3>
                            <NavList items={mcpItems} />
                        </section>

                        <section className="border-b p-5">
                            <h3 className="text-xl font-semibold px-2 mb-2">Partners</h3>
                            <NavList items={partnersItems} />
                        </section>
                    </div>

                    <div className="p-5 space-y-4 border-t">
                        <h3 className="text-xl font-semibold px-2 mb-2">We'd Love to Hear From You!</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {ContactListArray.map((item, index) => (
                                <li
                                    key={index}
                                    className="border rounded hover:bg-gray-100 transition"
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.target}
                                            rel="noreferrer"
                                            className="flex items-center gap-2 p-2"
                                        >
                                            {item.icon}
                                            <span className="text-sm">{item.text}</span>
                                        </a>
                                    ) : (
                                        <button
                                            onClick={item.onClick}
                                            className="flex items-center gap-2 p-2 w-full text-left"
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

