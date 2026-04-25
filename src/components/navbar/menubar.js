'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

function NavList({ navItems }) {
    return (
        <ul className="grid grid-cols-1 list-none">
            {navItems?.map((item, i) => (
                <li key={i} className="hover:bg-gray-100 text-black p-2">
                    <Link href={item?.link} className="flex flex-col">
                        <span className="text-lg hover:text-accent hover:underline">{item?.name}</span>
                    </Link>
                </li>
            ))}
            <li className="hover:bg-gray-100 text-black p-2">
                <Link href={'/support'} className="flex flex-col">
                    <span className="text-lg hover:text-accent hover:underline">support</span>
                </Link>
            </li>
            <li className="hover:bg-gray-100 text-black p-2">
                <Link href="https://cal.id/team/viasocket/sales-team" target="_blank" rel="nofollow noopener noreferrer" className="flex flex-col">
                    <span className="text-lg hover:text-accent hover:underline">Contact Sales</span>
                </Link>
            </li>
            <li className="hover:bg-gray-100 text-black p-2">
                <Link href="https://cal.id/team/viasocket/hire-an-expert" target="_blank" rel="nofollow noopener noreferrer" className="flex flex-col">
                    <span className="text-lg hover:text-accent hover:underline">Hire an expert</span>
                </Link>
            </li>
        </ul>
    );
}

export default function Menubar({ open, onClose, navItems }) {
    const panelRef = useRef();

    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.relatedTarget)) {
                onClose();
            }
        };

        if (open) {
            panelRef.current?.addEventListener('mouseleave', handleMouseLeave);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            panelRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <div className={`fixed inset-0 z-[9999] pointer-events-${open ? 'auto' : 'none'}`}>
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
                ref={panelRef}
                className={`absolute top-0 right-0 h-full w-full md:max-w-[40%] bg-white border-l custom-border shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Menubar"
            >
                <div className="flex justify-end p-4 border-b">
                    <X className="h-8 w-8" onClick={onClose} />
                </div>

                {/* MCP Banner for Mobile */}
                <div className="!bg-[#5CD2A2] py-2 px-4 text-lg">
                    <div className="flex sm:flex-row flex-col items-center justify-center gap-2">
                       <div className="flex items-center gap-1 justify-center whitespace-nowrap">
                         <span>MCP is now</span>
                        <Image src={`/assets/img/mushrooms-text.svg`} alt="explore mcp" width={100} height={100} />
                       </div>
                        <Link href={'https://mushrooms.viasocket.com'} target='_blank' rel="nofollow noopener noreferrer">
                            <div className='whitespace-nowrap bg-white rounded-full px-4 py-1 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors text-sm'>
                                Explore More <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="cont justify-between h-full pt-0 md:pt-8 px-4 gap-4">
                    <NavList navItems={navItems} />
                </div>
            </div>
        </div>
    );
}
