import { useEffect, useRef } from "react";
import { X } from 'lucide-react';

function NavList({ items }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 list-none">
            {items?.map((item, i) => (
                <li key={i} className="hover:bg-gray-100 text-black p-2">
                    <a href={item?.link} className="flex flex-col">
                        <span className="text-lg hover:text-accent hover:underline">{item?.name}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Menubar({ open, onClose, navbarData }) {
    const panelRef = useRef();

    let groups = [];

    if (navbarData && Array.isArray(navbarData)) {
        // Get all unique group names
        const uniqueGroups = [...new Set(navbarData.map(item => item.group_name))];

        // For each unique group, collect its items
        groups = uniqueGroups.map(groupName => {
            const groupItems = navbarData.filter(item => item.group_name === groupName);
            return {
                group_name: groupName,
                items: groupItems
            };
        });
    }

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
                aria-modal="true" aria-label="Menubar"
            >
                <div className="md:hidden flex justify-end p-4">
                    <X className="h-8 w-8" onClick={onClose} />
                </div>
                <div className="cont justify-between h-full pt-0 md:pt-8">
                    {groups && (
                        <div className="cont gap-4">
                            {groups?.map((row, index) => {
                                return (
                                    <div key={index} className="border-b px-4 pb-4">
                                        <h3 className="text-xl font-semibold px-2 mb-2">{row?.group_name}</h3>
                                        {row?.items?.length > 0 && <NavList items={row?.items} />}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}