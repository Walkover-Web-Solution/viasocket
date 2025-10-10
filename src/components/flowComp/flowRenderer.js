import IconWrapper from './iconWrapper.js';
import { MdApi, MdAutoAwesome, MdOutlineWebhook } from 'react-icons/md';
import Image from 'next/image';
import { LuAlarmClock } from 'react-icons/lu';
import { FaJs } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { FaArrowDownLong } from 'react-icons/fa6';
import { BlockTypes } from '@/enums.js';

const Fab = ({ children }) => (
    <div className="bg-[#5f5e5b] text-white rounded-full shadow-lg px-5 py-3">{children}</div>
);

// const Chip = ({ label }) => (
//     <div className="bg-gray-200 text-gray-700 px-2 py-0.5 text-xs">
//         {label}
//     </div>
// );

function replaceUnderscoreWithSpace(str) {
    if (!str) return '';
    return str.trim().split('_').join(' ');
}

function findDepthAndIndex(order, target) {
    function dfs(node, depth) {
        if (!order[node]) return null;
        for (let i = 0; i < order[node]?.length; i++) {
            const child = order[node][i];
            if (child === target) return { depth: depth + 1, index: i };
            const result = dfs(child, depth + 1);
            if (result) return result;
        }
        return null;
    }

    for (let i = 0; i < order.root?.length; i++) {
        const node = order.root[i];
        if (node === target) return { depth: 1, index: i };
        const result = dfs(node, 1);
        if (result) return result;
    }

    return null;
}

const baseHues = [200, 260, 150, 20, 50, 340, 180, 275, 10, 220];

function generatePrettyColor(level, siblingIndex) {
    const baseHue = baseHues[siblingIndex % baseHues.length];
    const hueShift = (level * 12 + siblingIndex * 5) % 360;
    const hue = (baseHue + hueShift) % 360;

    let saturation = 60;
    let lightnessBase = 85;

    if (typeof window !== 'undefined' && window.document) {
        const rootStyles = getComputedStyle(document.documentElement);
        saturation = parseInt(rootStyles.getPropertyValue('--saturation').trim(), 10) || saturation;
        lightnessBase = parseInt(rootStyles.getPropertyValue('--lightness-base').trim(), 10) || lightnessBase;
    }

    // const rootStyles = getComputedStyle(document.documentElement);
    // const saturation = parseInt(rootStyles.getPropertyValue('--saturation').trim(), 10);
    // const lightnessBase = parseInt(rootStyles.getPropertyValue('--lightness-base').trim(), 10);
    const lightness = lightnessBase - Math.min(level * 1.5, 12);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function FlowRenderer({ flowJson, scale = 100 }) {
    return (
        <div className="flex flex-col items-center gap-4 overflow-hidden origin-top h-full transform">
            <FlowHeader trigger={flowJson?.trigger} />
            <div className="font-semibold text-base">Do</div>
            <FlowSteps block={flowJson?.blocks} order={flowJson?.order} />
        </div>
    );
}

function FlowHeader({ trigger }) {
    return (
        <div className="flex flex-col items-center">
            <div className="font-semibold text-base">When</div>

            <div className="flex flex-col justify-start items-center gap-2 w-full mt-2">
                <div className="py-1 px-2 flex w-full max-w-[300px] border show-block] bg-white">
                    <div className="py-1">
                        <IconWrapper
                            component={
                                trigger?.triggerType === 'webhook' ? (
                                    <MdOutlineWebhook size={20} />
                                ) : trigger?.triggerType === 'cron' ? (
                                    <LuAlarmClock size={20} />
                                ) : (
                                    <IconWrapper
                                        iconUrl={
                                            trigger?.iconUrl || 'https://cdn-icons-png.flaticon.com/512/380/380127.png'
                                        }
                                        size={24}
                                    />
                                )
                            }
                        />
                    </div>

                    <div className="flex justify-start items-center w-full px-2">
                        {trigger?.triggerType === 'webhook' ? (
                            <div className="text-base">
                                {trigger?.triggerType === 'webhook'
                                    ? 'Webhook'
                                    : trigger?.triggerType === 'email'
                                      ? 'Email To Flow'
                                      : trigger?.serviceName}
                            </div>
                        ) : trigger?.triggerType === 'cron' ? (
                            <div className="text-base">{trigger?.meaning}</div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <div className="text-base">{trigger?.serviceName} ragini</div>
                                {/* <Chip
                                    label={
                                        trigger?.triggerType === 'hook'
                                            ? 'Instant Trigger'
                                            : trigger?.triggerType === 'manual_webhook'
                                                ? 'Manual Trigger'
                                                : `Runs Every ${trigger?.selectedValues?.inputData?.scheduledTime || '15'} Minutes`
                                    }
                                /> */}
                            </div>
                        )}
                    </div>
                </div>

                {trigger?.preCondition?.conditionEnabled && (
                    <div className="flex flex-col justify-center items-center mt-2">
                        <Fab>IF</Fab>
                        <FaArrowDownLong />
                    </div>
                )}
            </div>
        </div>
    );
}

function FlowSteps({ block, order, root = 'root' }) {
    const stepOrder = order?.[root] || [];

    return (
        <div className="flex flex-col items-center w-full">
            {stepOrder.map((step, index) => {
                const iconOfBlock = () => {
                    if (block?.[step]?.iconUrl) {
                        return (
                            <IconWrapper
                                component={
                                    <Image
                                        alt={`${block[step]?.name || 'Workflow step'} icon`}
                                        src={block[step].iconUrl}
                                        className="h-6 w-6 object-contain"
                                        width={24}
                                        height={24}
                                    />
                                }
                            />
                        );
                    } else if (block?.[step]?.type === 'api') {
                        return <IconWrapper component={<MdApi className="h-6 w-6 text-blue-500" />} />;
                    } else if (block?.[step]?.aistep) {
                        return <IconWrapper component={<MdAutoAwesome className="h-6 w-6 text-green-500" />} />;
                    } else {
                        return <IconWrapper component={<FaJs className="h-6 w-6 text-yellow-500" />} />;
                    }
                };

                return (
                    <div key={step} className="flex flex-col items-center w-full">
                        {block?.[step]?.type === 'ifGroup' ? (
                            <IfGroup block={block} order={order} step={step} index={index} />
                        ) : (
                            <>
                                {index > 0 && <VerticalStick />}
                                {/* <div className="flex items-center p-2 w-full max-w-[300px] border border-[2px] show-block"> */}
                                <div className="flex items-center p-2 w-auto border show-block bg-white">
                                    {iconOfBlock()}
                                    <div className="flex justify-start items-center px-2">
                                        <span className="font-400">
                                            {block[step]?.type === BlockTypes.PLUG
                                                ? replaceUnderscoreWithSpace(step)
                                                : step}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            {root === 'root' ? (
                <div className="flex flex-col items-center ">
                    <VerticalStick />
                    <div className="p-1 w-full flex justify-center border show-block bg-white">
                        <IoMdAdd className="w-6 h-6 text-gray-500" />
                    </div>
                </div>
            ) : (
                <div className="w-full flex items-center justify-center mt-2 gap-2 border show-block bg-white">
                    <IoMdAdd className="w-4 h-4 text-gray-500" />
                    <span className="whitespace-nowrap text-sm">Add Step</span>
                </div>
            )}
        </div>
    );
}

function IfGroup({ block, order, step, index = 0 }) {
    const childs = order?.[step] || [];

    return (
        <div className="flex flex-col items-center">
            {index > 0 && <VerticalStick />}
            <Fab>IF</Fab>
            <VerticalStick />
            <div className="tree w-full flex flex-col items-center">
                <ul className="w-full">
                    <li>
                        <ul>
                            {childs.map((child) => {
                                const depthandindex = findDepthAndIndex(order, child);
                                return (
                                    <li key={child}>
                                        <div
                                            className="py-2 w-full border show-block"
                                            style={{
                                                backgroundColor: generatePrettyColor(
                                                    depthandindex?.depth,
                                                    depthandindex?.index
                                                ),
                                            }}
                                        >
                                            <div className="p-2 border-b">{replaceUnderscoreWithSpace(child)}</div>
                                            <div className="p-2 w-full">
                                                <FlowSteps block={block} order={order} root={child} />
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="custom-flow-border mt-4 w-full text-center">Continue from here</div>
        </div>
    );
}

function VerticalStick() {
    return <div className="border-l" style={{ height: 'calc(5 * var(--u-base))' }} />;
}

export default FlowRenderer;
