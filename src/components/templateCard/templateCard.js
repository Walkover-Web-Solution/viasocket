import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const TemplateCard = ({ template }) => {
    return (
        <Link
            href={`/templates/${template?.id}`}
            className="group cont justify-between bg-white border custom-border cursor-pointer hover:bg-gray-100 group relative"
        >
            <div className="flex flex-col gap-1 px-8 py-4">
                <h1 className="h3">{template?.title}</h1>
                <h2 className="h6 leading-none">{template?.metadata?.description || template?.description}</h2>
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
                                <Image key="trigger-icon" src={triggerIcon} alt="trigger icon" width={32} height={32} />
                            );
                        } else if (!triggerIcon) {
                            if (triggerType === 'webhook') {
                                elements.push(<Webhook size={32} />);
                            } else if (triggerType === 'cron') {
                                elements.push(<Timer size={32} />);
                            }
                        }

                        // App Icons (deduplicated)
                        for (let i = 0; i < appIcons.length; i++) {
                            const icon = appIcons[i];
                            if (icon && !shownIcons.has(icon)) {
                                shownIcons.add(icon);
                                elements.push(
                                    <Image key={`app-icon-${i}`} src={icon} alt={`app icon`} width={32} height={32} />
                                );
                            }
                        }

                        return elements;
                    })()}
                </div>
            </div>

            <div className="h-[400px] w-full relative overflow-x-hidden overflow-y-hidden">
                <Image
                    src={template?.metadata?.templateUrl || template?.templateUrl || 'https://placehold.co/600x400'}
                    layout="fill"
                    className="object-top"
                    style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                    alt="template image"
                />
            </div>
            <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 text-xl" />
        </Link>
    );
};

export default TemplateCard;
