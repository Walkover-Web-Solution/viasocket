import Image from 'next/image';
import { useState } from 'react';
import { MdAdd, MdAdsClick, MdCheck, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { handleRedirect } from '@/utils/handleRedirection';
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsRequestComp from '../IntegrationsBetaComp/integrationsRequestComp';

export default function IntegrationsEventsComp({ combosData, appOneDetails, appTwoDetails }) {
    const [visibleTriggers, setVisibleTriggers] = useState(6);
    const [visibleActions, setVisibleActions] = useState(6);
    const [selectedTrigger, setSelectedTrigger] = useState();
    const [selectedAction, setSelectedAction] = useState();

    const actions = [];
    const trigger = [];

    const categorizeEvents = (events) => {
        events?.forEach((event) => {
            if (event.type === 'action') {
                actions.push(event);
            } else if (event.type === 'trigger') {
                trigger.push(event);
            }
        });
    };

    categorizeEvents(appOneDetails?.events);
    if (appTwoDetails) categorizeEvents(appTwoDetails?.events);

    function getIcons(appslugname) {
        const appOneSlug = appOneDetails?.appslugname;
        const appTwoSlug = appTwoDetails?.appslugname;

        if (appslugname === appOneSlug) return appOneDetails?.iconurl || 'https://placehold.co/36x36';
        if (appslugname === appTwoSlug) return appTwoDetails?.iconurl || 'https://placehold.co/36x36';
        return 'https://placehold.co/36x36';
    }

    return (
        <>
            {combosData ? (
                <>
                    <div className="cont items-start w-full gap-2">
                        <div className="flex lg:flex-row flex-col w-full gap-2">
                            {trigger?.length > 0 && (
                                <div className="cont gap-2 w-full">
                                    <h3 className="h3">Triggers</h3>
                                    {trigger.slice(0, visibleTriggers).map((event, index) => (
                                        <div
                                            onClick={() => setSelectedTrigger(event)}
                                            key={index}
                                            className="p-4 border custom-border flex gap-3 flex-col sm:flex-row items-start hover-bg-grey-100-text-black cursor-pointer bg-white"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={event?.name}
                                                className="h-6 w-fit"
                                            />
                                            <div className="cont gap-1 w-full">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                            {event.rowid === selectedTrigger?.rowid && (
                                                <div className="text-green-600 flex h-full items-center justify-center">
                                                    <MdCheck fontSize={24} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {trigger.length > visibleTriggers ? (
                                        <button
                                            onClick={() => setVisibleTriggers(visibleTriggers + 6)}
                                            className="btn btn-outline custom-border"
                                        >
                                            Load More <MdKeyboardArrowDown fontSize={20} />
                                        </button>
                                    ) : (
                                        <RequestIntegrationPopupOpener
                                            appInfo={appOneDetails}
                                            secondAppInfo={appTwoDetails}
                                            showType="dotted"
                                            type="trigger"
                                        />
                                    )}
                                </div>
                            )}

                            {actions?.length > 0 && (
                                <div className="cont gap-2 w-full">
                                    <h3 className="h3">Actions</h3>
                                    {actions.slice(0, visibleActions).map((event, index) => (
                                        <div
                                            onClick={() => setSelectedAction(event)}
                                            key={index}
                                            className="bg-white p-4 border max-w-[800px] custom-border flex gap-3 flex-col sm:flex-row items-start hover-bg-grey-100-text-black cursor-pointer"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={event?.name}
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
                                    ))}
                                    {actions.length > visibleActions ? (
                                        <button
                                            onClick={() => setVisibleActions(visibleActions + 6)}
                                            className="btn btn-outline custom-border"
                                        >
                                            Load More <MdKeyboardArrowDown fontSize={20} />
                                        </button>
                                    ) : (
                                        <RequestIntegrationPopupOpener
                                            appInfo={appOneDetails}
                                            secondAppInfo={appTwoDetails}
                                            className="lg:ml-auto"
                                            showType="dotted"
                                            type="action"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {(selectedTrigger || selectedAction) && (
                        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border custom-border p-4">
                            <div className="container flex flex-col lg:flex-row items-center gap-3 justify-between">
                                <div className="flex items-center gap-4 w-full flex-col md:flex-row ">
                                    <div className="flex items-center gap-2 max-w-[800px] border custom-border p-2 w-full min-h-12 min-w-[220px]">
                                        {selectedTrigger && (
                                            <>
                                                <Image
                                                    src={getIcons(selectedTrigger?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt="Selected Trigger"
                                                    className="h-6 w-fit"
                                                />
                                                <span className="w-full">{selectedTrigger?.name}</span>
                                                <span
                                                    className="w-fit hover:bg-black rounded-full p-1 hover:text-white cursor-pointer"
                                                    onClick={() => setSelectedTrigger()}
                                                >
                                                    <MdClose fontSize={20} />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <MdAdd fontSize={30} />
                                    <div className="flex items-center max-w-[800px] gap-2 border custom-border p-2 w-full min-h-12 min-w-[220px]">
                                        {selectedAction && (
                                            <>
                                                <Image
                                                    src={getIcons(selectedAction?.pluginslugname)}
                                                    width={36}
                                                    height={36}
                                                    alt="Selected Action"
                                                    className="h-6 w-fit"
                                                />
                                                <span className="w-full">{selectedAction?.name}</span>
                                                <span
                                                    className="w-fit hover:bg-black rounded-full p-1 hover:text-white cursor-pointer"
                                                    onClick={() => setSelectedAction()}
                                                >
                                                    <MdClose fontSize={20} />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        className={`btn btn-primary ${
                                            selectedAction && selectedTrigger ? '' : 'btn-disabled'
                                        }`}
                                        onClick={(e) =>
                                            handleRedirect(
                                                e,
                                                `https://flow.viasocket.com/makeflow/trigger/${selectedTrigger?.rowid}/action?events=${selectedAction?.rowid}?`
                                            )
                                        }
                                        rel="nofollow"
                                    >
                                        Try It
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedAction();
                                            setSelectedTrigger();
                                        }}
                                        className="btn btn-outline"
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
                    <div
                        className={`flex lg:flex-row flex-col w-full lg:gap-2 gap-8 ${(!trigger?.length || !actions?.length) && 'lg:flex-row-reverse'}`}
                    >
                        {trigger?.length > 0 ? (
                            <div className="cont gap-2 w-full">
                                <h3 className="h3 flex flex-col gap-1">
                                    <p className="flex items-center gap-1">
                                        <MdAdsClick fontSize={20} />
                                        When this happens
                                        <span className="bg-red-100 text-red-700 text-sm px-2 py-0.5 inline-flex items-center">
                                            Triggers
                                        </span>
                                    </p>
                                    <p className="text-sm">A trigger is an event that starts a workflow.</p>
                                </h3>

                                <div className="flex flex-col gap-2 mt-4">
                                    {trigger.slice(0, visibleTriggers).map((event, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border max-w-[800px] custom-border flex gap-3 flex-col sm:flex-row items-start bg-white"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={event?.name}
                                                className="h-10 w-fit border p-1"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {trigger.length > visibleTriggers ? (
                                    <button
                                        onClick={() => setVisibleTriggers(visibleTriggers + 6)}
                                        className="btn btn-outline custom-border"
                                    >
                                        Load More <MdKeyboardArrowDown fontSize={20} />
                                    </button>
                                ) : (
                                    <RequestIntegrationPopupOpener
                                        appInfo={appOneDetails}
                                        showType="dotted"
                                        type="trigger"
                                    />
                                )}
                            </div>
                        ) : (
                            <NotFound type="trigger" appInfo={appOneDetails} />
                        )}
                        {actions?.length > 0 ? (
                            <div className="cont gap-2 w-full">
                                <h3 className="h3 flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <IoMdCheckmarkCircleOutline fontSize={20} />
                                        Do this
                                        <span className="bg-blue-100 text-blue-700 text-sm px-2 py-0.5 inline-flex items-center">
                                            Actions
                                        </span>
                                    </div>
                                    <p className="text-sm">
                                        Action is the task that follows automatically within your {appOneDetails?.name}{' '}
                                        app integrations.
                                    </p>
                                </h3>

                                <div className="flex flex-col gap-2 mt-4">
                                    {actions.slice(0, visibleActions).map((event, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border max-w-[800px] custom-border flex gap-3 flex-col sm:flex-row items-start bg-white"
                                        >
                                            <Image
                                                src={getIcons(event?.pluginslugname)}
                                                width={36}
                                                height={36}
                                                alt={event?.name}
                                                className="h-10 w-fit border p-1"
                                            />
                                            <div className="cont gap-1">
                                                <h3 className="font-semibold">{event?.name}</h3>
                                                <p className="text-sm">{event?.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {actions.length > visibleActions ? (
                                    <button
                                        onClick={() => setVisibleActions(visibleActions + 6)}
                                        className="btn btn-outline custom-border self-end"
                                    >
                                        Load More <MdKeyboardArrowDown fontSize={20} />
                                    </button>
                                ) : (
                                    <RequestIntegrationPopupOpener
                                        showType="dotted"
                                        type="action"
                                        className="lg:ml-auto"
                                        appInfo={appOneDetails}
                                    />
                                )}
                            </div>
                        ) : (
                            <NotFound type="action" appInfo={appOneDetails} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function NotFound({ type, appInfo }) {
    const showHeading = (
        <span className="bg-red-100 text-red-700 text-sm px-2 py-0.5 inline-flex items-center">
            {type === 'trigger' ? 'Trigger' : 'Action'}
        </span>
    );
    return (
        <div className="cont w-full gap-2">
            <h3 className="h3 flex items-center gap-2">
                {type === 'trigger' ? (
                    <>
                        <MdAdsClick fontSize={20} />
                        When this happens
                        {showHeading}
                    </>
                ) : (
                    <>
                        <IoMdCheckmarkCircleOutline fontSize={20} />
                        Do this
                        {showHeading}
                    </>
                )}
            </h3>
            <div className="p-2 flex flex-col gap-3">
                <p className="text-2xl">No {type} available</p>
                <RequestIntegrationPopupOpener type={type} showType="button" appInfo={appInfo} />
            </div>
        </div>
    );
}
