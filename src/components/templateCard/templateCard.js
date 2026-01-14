import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const TemplateCard = ({ template, index }) => {
    const bgcolor = template?.flowJson?.trigger?.brandcolor;
    return (
        <Link
            key={template?.id}
            href={`/automations/${template?.title?.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${template?.id}`}
            className="group shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            style={{ backgroundColor: bgcolor || 'white' }}
        >
            <div className={`p-4 md:p-6 flex flex-col gap-4 ${bgcolor ? bgcolor.toLowerCase().startsWith('#fff') ? 'text-black' : 'text-white' : 'text-black'}`}>
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
                                if(i<=6)
                                {
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
                                else{
                                    elements.push(
                                        <div key="app-icon-wrapper-more" className="text-black w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                            <span>+{appIcons.length - 5}</span>
                                        </div>
                                    );
                                    break;
                                }
                            }
                        }

                        return elements;
                    })()}
                </div>

                <h4 className="h4 font-semibold text-2xl line-clamp-3 min-h-[90px]">
                    {template?.title}
                </h4>

                <div className="flex items-center justify-between gap-4 line-clamp-2">
                    <div className='line-clamp-1'>By {template?.userName}</div>
                    <div className='flex gap-2 items-center'> <FiUsers /><span>{template?.usedCount}</span></div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Template</span>
                    <FaArrowRight/>
                </div>
            </div>
        </Link>
    );
};

export default TemplateCard;
