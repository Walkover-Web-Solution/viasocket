import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const TemplateCard = ({ template, index }) => {
    return (
        <Link
            href={`/templates/${template?.title?.trim().replace(/\s+/g, '-').toLowerCase()}`}
            className="group cont justify-between bg-white border custom-border cursor-pointer hover:bg-gray-100 group relative"
        >
            <div className="cont gap-2 px-8 py-4">
                <div className="cont gap-1">
                    <h1 className="h3">{template?.title}</h1>
                    <h2 className="h6 leading-none">{template?.metadata?.description || template?.description}</h2>
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
                                <div className="flex items-center justify-center w-8 h-8 border custom-border">
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
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Webhook size={24} />
                                    </div>
                                );
                            } else if (triggerType === 'cron') {
                                elements.push(
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
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
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border">
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

            <div className="h-[400px] w-full overflow-hidden flex justify-center items-start relative">
                <img
                    src={template?.templateUrl || 'https://placehold.co/600x400'}
                    alt={template?.title}
                    className="block"
                />
                <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </div>
            <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 text-xl" />
        </Link>
    );
};

export default TemplateCard;
