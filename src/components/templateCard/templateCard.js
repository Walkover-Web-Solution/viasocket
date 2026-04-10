import { Timer, Webhook, ArrowRight, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TemplateCard = ({ template, preventClick }) => {
    const bgcolor = template?.flowJson?.trigger?.brandcolor || '#ffffff';
    const isLightBg = bgcolor.toLowerCase().startsWith('#fff');
    return (
        <Link
            key={template?.id}
            href={`/automations/${template?.title?.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${template?.id}`}
            className="group shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            style={{ backgroundColor: bgcolor || 'white' }}
            onClick={(e) => { if (preventClick?.current) e.preventDefault(); }}
        >
            <div className={`p-4 md:p-6 flex flex-col gap-4 h-[290px] ${isLightBg ? 'text-black' : 'text-white'}`}>
                <div className="flex items-center gap-2">
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
                                <div key="trigger" className="w-10 h-10 relative bg-gray-50 border">
                                    <Image src={triggerIcon} alt="trigger" width={20} height={20} className="object-contain p-1"
                                        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }} />
                                </div>
                            );
                        } else if (!triggerIcon) {
                            if (triggerType === 'webhook') {
                                elements.push(
                                    <div key="webhook" className="w-10 h-10 relative bg-gray-50 border">
                                        <Webhook size={16} className="object-contain p-1"
                                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }} />
                                    </div>
                                );
                            } else if (triggerType === 'cron') {
                                elements.push(
                                    <div key="cron" className="w-10 h-10 relative bg-gray-50 border">
                                        <Timer size={16} className="object-contain p-1"
                                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }} />
                                    </div>
                                );
                            }
                        }

                        // App Icons (deduplicated)
                        for (let i = 0; i < appIcons.length; i++) {
                            const icon = appIcons[i];
                            if (icon && !shownIcons.has(icon)) {
                                shownIcons.add(icon);
                                if (i <= 3) {
                                    elements.push(
                                        <div
                                            key={`app-icon-wrapper-${i}`}
                                            className="h-10 w-10 relative bg-gray-50 border"
                                        >
                                            <Image
                                                key={`app-icon-${i}`}
                                                src={icon}
                                                alt={`app icon`}
                                                width={20}
                                                height={20}
                                                className="object-contain p-1"
                                                style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }}
                                            />
                                        </div>
                                    );
                                }
                                else {
                                    elements.push(
                                        <div key="app-icon-wrapper-more" className="text-black w-10 h-10 bg-gray-50 flex items-center justify-center border">
                                            <span>+{appIcons.length - 4}</span>
                                        </div>
                                    );
                                    break;
                                }
                            }
                        }
                        return elements;
                    })()}
                </div>

                <div className="flex-1 flex items-center">
                    <h4 className={`line-clamp-3 font-[Inter,sans-serif] text-[30px] font-[720] leading-[38px] tracking-[-0.5px] m-0`}>{template?.title}</h4>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs ${isLightBg ? 'text-[#00000099]' : 'text-white/60'}`}>{template?.userName}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${isLightBg ? 'text-[#000000cc]' : 'text-white/70'}`}>
                        Preview template
                        <ArrowRight size={13} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default TemplateCard;
