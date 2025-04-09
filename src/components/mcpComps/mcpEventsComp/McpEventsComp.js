import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function McpEventComp({ combosData, appOneDetails, appTwoDetails }) {
    const [visibleEvents, setVisibleEvents] = useState(6);
    const [selectedAction, setSelectedAction] = useState();

    const actions = [];

    const categorizeEvents = (events) => {
        events?.forEach((event) => {
            if (event.type === 'action') {
                actions.push(event);
            }
        });
    };

    categorizeEvents(appOneDetails?.events);

    if (appTwoDetails) {
        categorizeEvents(appTwoDetails?.events);
    }

    function getIcons(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        const appTwoSlug = appTwoDetails?.appslugname;

        if (appslugname === appOneSlug) {
            return appOneDetails?.iconurl || 'https://placehold.co/36x36';
        } else if (appslugname === appTwoSlug) {
            return appTwoDetails?.iconurl || 'https://placehold.co/36x36';
        } else {
            return 'https://placehold.co/36x36';
        }
    }

    function getAppDetail(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        const appTwoSlug = appTwoDetails?.appslugname;

        if (appslugname === appOneSlug) {
            return appOneDetails;
        } else if (appslugname === appTwoSlug) {
            return appTwoDetails;
        } else {
            return {};
        }
    }

    return (
        <>
            {combosData ? (
                <>
                    <div className="cont items-start w-full gap-2">
                        <div className="flex lg:flex-row flex-col w-full gap-2">
                            {actions?.length > 0 && (
                                <div className="cont gap-2 w-full">
                                    <h3 className="h2">Actions</h3>
                                    {actions.slice(0, visibleEvents).map((event, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setSelectedAction(event);
                                                }}
                                                key={index}
                                                className="p-4 border max-w-[800px] border-black flex gap-3 flex-col sm:flex-row items-start hover:bg-black hover:text-white cursor-pointer"
                                            >
                                                <Image
                                                    src={
                                                        getIcons(event?.pluginslugname) || 'https://placehold.co/40x40'
                                                    }
                                                    width={36}
                                                    height={36}
                                                    alt={appOneDetails?.name}
                                                    className="h-6 w-fit"
                                                />
                                                <div className="cont gap-1 w-full">
                                                    <h3 className="font-semibold">{event?.name}</h3>
                                                    <p className="text-sm">{event?.description}</p>
                                                </div>
                                                {event.rowid === selectedAction?.rowid && (
                                                    <div className="text-green-600 flex h-full items-center justify-center">
                                                        <MdCheck fontSize={24} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {actions?.length > visibleEvents && (
                            <button
                                onClick={() => {
                                    setVisibleEvents(visibleEvents + 6);
                                }}
                                className="btn btn-outline -mt-2"
                            >
                                Load More <MdKeyboardArrowDown fontSize={20} />
                            </button>
                        )}
                    </div>
                    {selectedAction && (
                        <div className="fixed bottom-0 left-0 w-full z-[99999] bg-white border border-black p-4 ">
                            <div className="container flex flex-col lg:flex-row items-center gap-3 justify-between">
                                <div className="flex items-center gap-4 w-full flex-col md:flex-row ">
                                    <div className="flex items-center max-w-[800px] gap-2 border border-black p-2 w-full min-h-12 min-w-[220px]">
                                        {selectedAction && (
                                            <>
                                                <Image
                                                    src={
                                                        getIcons(selectedAction?.pluginslugname) ||
                                                        'https://placehold.co/40x40'
                                                    }
                                                    width={36}
                                                    height={36}
                                                    alt={'Selected Action'}
                                                    className="h-6 w-fit"
                                                />
                                                <span className="w-full">{selectedAction?.name}</span>
                                                <span
                                                    className="w-fit hover:bg-black rounded-full p-1 hover:text-white cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedAction();
                                                    }}
                                                >
                                                    <MdClose fontSize={20} />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link
                                        target="_blank"
                                        className={`btn btn-primary ${selectedAction ? '' : 'btn-disabled'}`}
                                        href={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/action?events=${selectedAction?.rowid}`}
                                        rel="nofollow"
                                    >
                                        Try It
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedAction();
                                        }}
                                        className="btn btn-outline "
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="cont items-start w-full gap-2">
                    <div className="flex lg:flex-row flex-col w-full gap-2">
                        {actions?.length > 0 && (
                            <div className="cont gap-2 w-full">
                                <h3 className="h2 flex items-center gap-2">
                                    <IoMdCheckmarkCircleOutline fontSize={20} />
                                    Do this
                                    <span className="bg-blue-100 text-blue-700 text-sm px-2 py-0.5 inline-flex items-center">
                                        Actions
                                    </span>
                                </h3>
                                {actions.slice(0, visibleEvents).map((event, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border max-w-[800px] border-black flex gap-3 flex-col sm:flex-row items-start"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname) || 'https://placehold.co/40x40'}
                                                width={36}
                                                height={36}
                                                alt={appOneDetails?.name}
                                                className="h-8 w-fit"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {actions?.length > visibleEvents && (
                        <button
                            onClick={() => {
                                setVisibleEvents(visibleEvents + 6);
                            }}
                            className="btn btn-outline -mt-2"
                        >
                            Load More <MdKeyboardArrowDown fontSize={20} />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
