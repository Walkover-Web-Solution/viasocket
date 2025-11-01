import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import FlowRenderer from '../flowComp/flowRenderer';

const TemplateCard = ({ template, index }) => {
    return (
        <Link
            key={template?.id}
            href={`/automations/${template?.title?.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${template?.id}`}
            className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
        >
            <div className="p-4 md:p-6 h-32 md:h-36 flex flex-col">
                <h4 className="h4 font-semibold text-xl">
                    {template?.title}
                </h4>

                <div className="flex items-center gap-2 mt-auto">
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
                                <div key="trigger" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                    <Image src={triggerIcon} alt="trigger" width={16} height={16} className="w-3 h-3 md:w-5 md:h-5" />
                                </div>
                            );
                        } else if (!triggerIcon) {
                            if (triggerType === 'webhook') {
                                elements.push(
                                    <div key="webhook" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                        <Webhook size={12} className="md:w-4 md:h-4" />
                                    </div>
                                );
                            } else if (triggerType === 'cron') {
                                elements.push(
                                    <div key="cron" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                        <Timer size={12} className="md:w-4 md:h-4" />
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
                                        className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border"
                                    >
                                        <Image
                                            key={`app-icon-${i}`}
                                            src={icon}
                                            alt={`app icon`}
                                            width={16}
                                            height={16}
                                            className="w-3 h-3 md:w-5 md:h-5"
                                        />
                                    </div>
                                );
                            }
                        }

                        return elements;
                    })()}
                </div>
            </div>

            <div className="max-h-[400px] bg-white border-t border-gray-100 p-2 md:p-4 flex items-center justify-center overflow-hidden flex-1">
                <div className="max-h-[360px] max-w-full overflow-hidden">
                    <FlowRenderer
                        flowJson={template?.metadata?.flowJson ||
                            template?.flowJson ||
                            'https://placehold.co/600x400'}
                        scale={60}
                    />
                </div>
            </div>
            <div className="p-4 md:p-6 pt-3 md:pt-4 border-t border-gray-100 bg-white">
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm">
                        <span>View Template</span>
                        <FiExternalLink className="text-base" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TemplateCard;
