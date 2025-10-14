import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import FlowRenderer from '../flowComp/flowRenderer';

const TemplateCard = ({ template, index }) => {
    return (
        <Link
            key={template?.id}
            href={`/automations/${template?.title
                ?.trim()
                .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
                .replace(/\s+/g, '-') // replace spaces with '-'
                .toLowerCase()}/${template?.id}`}
            className="group cont justify-between bg-white border custom-border cursor-pointer group relative"
        >
            <div className="cont gap-2 px-8 py-4">
                <div className="cont gap-1">
                    <p className="text-xl mr-2">{template?.title}</p>

                </div>
                <div className="flex gap-4 items-center">
                    {(() => {
                        const triggerIcon = template?.triggerIcon;
                        const triggerType = template?.triggerType;
                        const appIcons = Array.isArray(template?.appsIcons) ? template.appsIcons : [];

                        const shownIcons = new Set();
                        const elements = [];

                        // Trigger Icon
                        if (triggerIcon && !shownIcons.has(triggerIcon)) {
                            shownIcons.add(triggerIcon);
                            elements.push(
                                <div
                                    key="trigger"
                                    className="flex items-center justify-center w-10 h-10 border bg-white p-2"
                                >
                                    <Image
                                        key="trigger-icon"
                                        src={triggerIcon}
                                        alt="trigger icon"
                                        width={36}
                                        height={36}
                                        className="h-5 w-fit"
                                    />
                                </div>
                            );
                        } else if (!triggerIcon) {
                            if (triggerType === 'webhook') {
                                elements.push(
                                    <div
                                        key="trigger-webhook"
                                        className="flex items-center justify-center w-10 h-10 border bg-white p-2"
                                    >
                                        <Webhook size={24} />
                                    </div>
                                );
                            } else if (triggerType === 'cron') {
                                elements.push(
                                    <div
                                        key="trigger-cron"
                                        className="flex items-center justify-center w-10 h-10 border bg-white p-2"
                                    >
                                        <Timer size={24} />
                                    </div>
                                );
                            }
                        }

                        // App Icons (deduplicated)
                        for (let i = 0; i < appIcons.length; i++) {
                            const icon = appIcons[i];
                            if (icon && !shownIcons.has(icon)) {
                                shownIcons.add(icon);
                                elements.push(
                                    <div
                                        key={`app-icon-wrapper-${i}`}
                                        className="flex items-center justify-center w-10 h-10 border bg-white p-2"
                                    >
                                        <Image
                                            key={`app-icon-${i}`}
                                            src={icon}
                                            alt={`app icon`}
                                            width={36}
                                            height={36}
                                            className="h-5 w-fit"
                                        />
                                    </div>
                                );
                            }
                        }

                        return elements;
                    })()}
                </div>
            </div>

            <div className="h-[400px] w-full overflow-hidden flex justify-center relative bg-white">
                <div className="block m-0 max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-90">
                    <FlowRenderer
                        flowJson={template?.metadata?.flowJson ||
                            template?.flowJson ||
                            'https://placehold.co/600x400'}
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 flex justify-center items-center  opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <button className="btn btn-primary">
                        <span>View Template</span>
                        <FiExternalLink className="text-xl" /> 
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default TemplateCard;
