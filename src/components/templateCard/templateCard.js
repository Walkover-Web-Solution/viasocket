import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { IoMdStopwatch } from 'react-icons/io';
import { MdOutlineWebhook } from 'react-icons/md';
import { DiJsBadge } from 'react-icons/di';
import { IoGitNetworkSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TemplateCard = ({ template, backgroundColor }) => {
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

    return (
        <div className="group cont gap-4 pb-4 relative" style={backgroundColor}>
            <div className="flex flex-col gap-1 px-8 mt-4">
                <h1 className="h3 text-white">{template?.title}</h1>
                <h2 className="sub__h2 text-white">{template?.metadata?.description}</h2>
            </div>

            <div className="w-full h-[350px] transparent-border-black px-8 cont items-center mt-8">
                <div className="bg-white w-full shadow-md">
                    <div>
                        <div className="bg-white px-2 py-1 border-b flex gap-1 items-center justify-start border transparent-border-black shadow-xl">
                            <p className="text-base font-semibold">Trigger: </p>
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
                                <p className="text-base font-semibold">
                                    {template?.published_json_script?.trigger?.actionName ||
                                        template?.published_json_script?.trigger?.triggerType}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border transparent-border-black h-4 opacity-75 shadow-xl"></div>

                {actionGroups.map((group, groupIndex) => (
                    <>
                        <div
                            key={groupIndex}
                            className={`w-full cont bg-white border transparent-border-black shadow-xl overflow-hidden ${
                                group.some((action) => blocks[action]?.type === 'ifGroup') ? '' : 'p-2 pb-0'
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
                                            <div className="flex w-full bg-gray-500">
                                                {ifsList.map((ifPath, index) => (
                                                    <button
                                                        key={index}
                                                        className={`flex-grow px-4 py-2 text-black text-base font-semibold ${
                                                            selectedIndex === index && 'bg-white'
                                                        }`}
                                                        onClick={() => setSelectedIndex(index)}
                                                    >
                                                        Path {String.fromCharCode(65 + index)}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="bg-white w-full px-2 py-1  flex justify-start items-center gap-2">
                                                <IoGitNetworkSharp />
                                                <p className="text-base font-semibold">{ifsList[selectedIndex]}</p>
                                            </div>
                                            <div className="p-4 pb-0">
                                                {template?.published_json_script?.order?.[ifsList[selectedIndex]]?.map(
                                                    (steps, stepIndex) => {
                                                        const stepBlock = blocks[steps];
                                                        if (stepBlock?.type === 'comment') return null;

                                                        return (
                                                            <div
                                                                key={stepIndex}
                                                                className="px-2 flex gap-4 items-center mb-2"
                                                            >
                                                                <HiArrowRight color="black" size={16} />
                                                                <DiJsBadge color="black" size={16} />
                                                                <p className="text-base font-semibold">{steps}</p>
                                                            </div>
                                                        );
                                                    }
                                                )}
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
                                            <p className="text-base font-semibold">{action}</p>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                        <div className="border transparent-border-black h-4 shadow-xl"></div>
                    </>
                ))}

                <div className="border transparent-border-black p-1 shadow-xl">
                    <FiPlus size={16} color="black" />
                </div>
            </div>

            {/* Use This Template button - now absolutely positioned and on top */}
            <div
                className="cont justify-between gap-2 px-8 transition-opacity opacity-0 group-hover:opacity-100"
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '1.5rem',
                    zIndex: 20,
                    pointerEvents: 'none', // Prevent accidental hover/click when not visible
                }}
            >
                <div className="flex flex-wrap gap-2 items-center justify-end" style={{ pointerEvents: 'auto' }}>
                    <Link href={`/template/${template?.id}`}>
                        <button className="btn bg-black border-0 text-white hover:bg-accent">Use This Template</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;
