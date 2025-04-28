import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { IoMdStopwatch } from 'react-icons/io';
import { MdOutlineWebhook } from 'react-icons/md';
import { DiJsBadge } from 'react-icons/di';
import { IoGitNetworkSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setUtmInCookies, setUtmSource } from '@/utils/handleUtmSource';

const TemplateCard = ({ template }) => {
    const serviceNames = template?.published_json_script?.trigger?.serviceName?.split(' ') || [];
    const rootActions = template?.published_json_script?.order?.root || [];
    const blocks = template?.published_json_script?.blocks || {};

    let actionGroups = [];
    let currentGroup = [];

    rootActions.forEach((action) => {
        const block = blocks[action];
        if (block?.type === 'ifGroup') {
            if (currentGroup.length > 0) {
                actionGroups.push([...currentGroup]);
                currentGroup = [];
            }
            actionGroups.push([action]);
        } else {
            currentGroup.push(action);
        }
    });

    if (currentGroup.length > 0) {
        actionGroups.push([...currentGroup]);
    }

    const [defaultUtmSource, setDefaultUtmSource] = useState('');

    useEffect(() => {
        const utmData = setUtmSource({ source: `template/${template?.id}` });
        setDefaultUtmSource(utmData);
    }, []);

    return (
        <div className="border hover:shadow-xl mx-12">
            <div className="cont gap-4 pb-4">
                <div className="w-full h-[500px] border-black px-8 cont justify-center items-center bg-[#F6EFFC]">
                    <div className="bg-white w-3/4 border shadow-md rounded-md">
                        <div>
                            <div className="bg-[#E1F4FF] px-2 py-1 border-b">
                                <p>Trigger: </p>
                            </div>
                            <div className="px-2 py-1 flex items-center gap-2">
                                {template?.published_json_script?.trigger?.iconUrl ? (
                                    <Image
                                        src={
                                            template?.published_json_script?.trigger?.iconUrl ||
                                            'https://placehold.co/40x40'
                                        }
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <>
                                        {template?.published_json_script?.trigger?.triggerType === 'cron' ? (
                                            <IoMdStopwatch />
                                        ) : (
                                            <MdOutlineWebhook />
                                        )}
                                    </>
                                )}
                                <p>
                                    {template?.published_json_script?.trigger?.actionName ||
                                        template?.published_json_script?.trigger?.triggerType}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-black h-4 opacity-75"></div>

                    {actionGroups.map((group, groupIndex) => (
                        <>
                            <div
                                key={groupIndex}
                                className={`w-3/4 cont bg-[#E1F4FF] rounded-md shadow-md overflow-hidden ${
                                    group.some((action) => blocks[action]?.type === 'ifGroup') ? '' : 'p-2'
                                }`}
                            >
                                {group.map((action, actionIndex) => {
                                    const block = blocks[action];
                                    if (block?.type === 'ifGroup') {
                                        const block_id = block?.identifier;
                                        const ifsList = template?.published_json_script?.order?.[block_id] || [];
                                        const [selectedIndex, setSelectedIndex] = useState(0);
                                        return (
                                            <div key={actionIndex}>
                                                <div className="flex w-full">
                                                    {ifsList.map((ifPath, index) => (
                                                        <button
                                                            key={index}
                                                            className={`flex-grow px-4 py-2 border-gray-600 ${
                                                                selectedIndex === index ? ' rounded-t-md bg-white' : ' '
                                                            }`}
                                                            onClick={() => setSelectedIndex(index)}
                                                        >
                                                            Path {String.fromCharCode(65 + index)}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="bg-white w-full px-2 py-1 rounded-b-md flex justify-start items-center gap-2">
                                                    <IoGitNetworkSharp />
                                                    {ifsList[selectedIndex]}
                                                </div>
                                                <div className="p-4">
                                                    {template?.published_json_script?.order?.[
                                                        ifsList[selectedIndex]
                                                    ]?.map((steps, stepIndex) => {
                                                        const stepBlock = blocks[steps];
                                                        if (stepBlock?.type === 'comment') return null;

                                                        return (
                                                            <div
                                                                key={stepIndex}
                                                                className="px-2 flex gap-4 items-center mb-2"
                                                            >
                                                                <HiArrowRight color="black" size={16} />
                                                                <DiJsBadge color="black" size={16} />
                                                                <p>{steps}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (
                                        block?.type !== 'comment' && (
                                            <div key={actionIndex} className="px-2 flex gap-4 items-center mb-2">
                                                <HiArrowRight color="black" size={16} />
                                                {block?.iconUrl ? (
                                                    <Image
                                                        src={block?.iconUrl || 'https://placehold.co/40x40'}
                                                        alt={action}
                                                        width={20}
                                                        height={20}
                                                    />
                                                ) : (
                                                    <DiJsBadge color="black" size={16} />
                                                )}
                                                <p>{action}</p>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                            <div className="border border-black h-4 opacity-75"></div>
                        </>
                    ))}

                    <div className="border border-black p-1 rounded-sm opacity-75">
                        <FiPlus size={16} />
                    </div>
                </div>

                <div className="min-h-[200px] h-fit cont justify-between gap-2 px-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl">{template?.title}</h1>
                        <h2 className="text-lg">{template?.metadata?.description}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-center">
                            {(() => {
                                const uniqueIcons = new Set();
                                const iconsToRender = [];

                                // Add the trigger icon to the set
                                const trigger = template?.published_json_script?.trigger;
                                const triggerIconUrl = trigger?.iconUrl;

                                if (triggerIconUrl && !uniqueIcons.has(triggerIconUrl)) {
                                    uniqueIcons.add(triggerIconUrl);
                                    iconsToRender.push(
                                        <div key="trigger" className="border border-black p-1">
                                            <Image
                                                src={triggerIconUrl || 'https://placehold.co/40x40'}
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                    );
                                } else if (!triggerIconUrl && !uniqueIcons.has('trigger-default')) {
                                    uniqueIcons.add('trigger-default');
                                    iconsToRender.push(
                                        <div key="trigger-default" className="border border-black p-1">
                                            {trigger?.triggerType === 'cron' ? (
                                                <IoMdStopwatch size={24} />
                                            ) : (
                                                <MdOutlineWebhook size={24} />
                                            )}
                                        </div>
                                    );
                                }

                                rootActions.forEach((action) => {
                                    const block = blocks[action];
                                    const iconUrl = block?.iconUrl;

                                    if (iconUrl && !uniqueIcons.has(iconUrl)) {
                                        uniqueIcons.add(iconUrl);
                                        iconsToRender.push(
                                            <div key={iconUrl} className="border border-black p-1">
                                                <Image
                                                    src={iconUrl || 'https://placehold.co/40x40'}
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                        );
                                    } else if (!iconUrl && !uniqueIcons.has('default-js')) {
                                        uniqueIcons.add('default-js');
                                        iconsToRender.push(
                                            <div key={action} className="border border-black p-1">
                                                <DiJsBadge size={24} />
                                            </div>
                                        );
                                    }
                                });

                                return iconsToRender;
                            })()}
                        </div>
                        <Link
                            href={`https://flow.viasocket.com/template/${template?.id}?state=${defaultUtmSource}`}
                            onClick={() => setUtmInCookies({ source: `mcp/${appOneDetails.appslugname}` })}
                        >
                            <button className="btn btn-accent">Use This Template</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;
