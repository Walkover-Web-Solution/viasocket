'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexClientComp';

export default function TriggerOrActionCard({ title, appDetails, placeholder, list, isOpen, onToggle, onSelect, type, resetEvent }) {
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (resetEvent) {
            setSelectedEvent(null);
        }
    }, [resetEvent]);

    const filteredList = list?.filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (event) => {
        setSelectedEvent(event);
        setSearch('');
        onSelect(event);
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="flex flex-col w-full md:w-1/2 gap-2 relative">
            <h2 className="text-sm font-medium text-gray-500 text-left">{title}</h2>

            <div
                className="w-full rounded-xl p-[2px] transition-colors"
                style={{ backgroundColor: appDetails?.brandcolor || '#E5E7EB' }}
            >
                <div
                    className="w-full rounded-[10px] flex items-center bg-white cursor-pointer px-4 py-3 relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <div className="mr-4 shrink-0 w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center">
                        <Image
                            src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={28}
                            height={28}
                            alt={`${appDetails?.name || 'App'} logo`}
                            className="w-6 h-6 object-contain"
                        />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center pr-8 text-left">
                        <p className="font-bold text-gray-900 text-base truncate">{appDetails?.name || 'Select app'}</p>
                        <p className="text-sm text-gray-500 truncate">
                            {selectedEvent ? selectedEvent.name : (type === 'trigger' ? 'When this happens...' : 'Automatically do this!')}
                        </p>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-full left-0 mt-2 w-full border custom-border bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-20
                ${isOpen ? 'opacity-100 visible max-h-72' : 'opacity-0 invisible max-h-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b flex items-center gap-2 p-2 z-30">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="w-full outline-none text-sm p-1"
                    />
                </div>

                <ul className="divide-y overflow-y-auto max-h-60">
                    {filteredList?.length > 0 ? (
                        filteredList.map((event, index) => (
                            <li
                                key={index}
                                className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleSelect(event)}
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <div className="border flex items-center justify-center p-2">
                                        <Image
                                            src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                            width={20}
                                            height={20}
                                            alt={`${appDetails?.name || 'App'} logo`}
                                        />
                                    </div>
                                    <p className="text-lg">{event?.name}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-center">
                            <div className="flex flex-row items-center gap-2">
                                <RequestIntegrationPopupOpener type={type} showType="dotted" appInfo={appDetails} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
