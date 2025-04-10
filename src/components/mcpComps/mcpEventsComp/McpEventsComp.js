import Image from 'next/image';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function McpEventComp({ appOneDetails }) {
    const [visibleEvents, setVisibleEvents] = useState(6);
    const actions = [];

    const categorizeEvents = (events) => {
        events?.forEach((event) => {
            if (event.type === 'action') {
                actions.push(event);
            }
        });
    };

    categorizeEvents(appOneDetails?.events);

    function getIcons(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        if (appslugname === appOneSlug) {
            return appOneDetails?.iconurl || 'https://placehold.co/36x36';
        }
        return 'https://placehold.co/36x36';
    }

    const renderActionGrid = (events) => {
        const rows = [];
        for (let i = 0; i < events.length; i += 2) {
            const pair = events.slice(i, i + 2);
            rows.push(
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {pair.map((event, index) => (
                        <div
                            key={index}
                            className="p-4 border border-black flex gap-3 flex-col sm:flex-row items-start hover:bg-black hover:text-white cursor-pointer"
                        >
                            <Image
                                src={getIcons(event?.pluginslugname) || 'https://placehold.co/40x40'}
                                width={36}
                                height={36}
                                alt={appOneDetails?.name}
                                className="h-6 w-fit"
                            />
                            <div className="cont gap-1 w-full">
                                <h3 className="font-semibold">{event?.name}</h3>
                                <p className="text-sm">{event?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="cont items-start w-full gap-2">
            <div className="flex lg:flex-row flex-col w-full gap-2">
                {actions.length > 0 ? (
                    <div className="cont gap-4 w-full">{renderActionGrid(actions.slice(0, visibleEvents))}</div>
                ) : (
                    <div className="w-full text-center p-8">No actions available</div>
                )}
            </div>
            {actions.length > visibleEvents && (
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => {
                            setVisibleEvents(visibleEvents + 6);
                        }}
                        className="btn btn-outline -mt-1"
                    >
                        Load More <MdKeyboardArrowDown fontSize={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
