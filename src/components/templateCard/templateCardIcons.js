import { cloneElement } from 'react';
import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';

const TemplateCardIcons = ({ template, rounded = true, maxIcons = 4, overlap = true }) => {
    const triggerIcon = template?.triggerIcon;
    const triggerType = template?.triggerType;
    const appIcons = Array.isArray(template?.appsIcons) ? template.appsIcons : [];

    const shownIcons = new Set();
    const elements = [];
    const roundedClass = rounded ? ' rounded-full' : '';

    // Trigger Icon
    if (triggerIcon && !shownIcons.has(triggerIcon)) {
        shownIcons.add(triggerIcon);
        elements.push(
            <div key="trigger" className={`w-10 h-10 relative bg-gray-50 border${roundedClass}`}>
                <Image
                    src={triggerIcon}
                    alt="trigger"
                    width={20}
                    height={20}
                    className="object-contain p-1"
                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
                />
            </div>
        );
    } else if (!triggerIcon) {
        if (triggerType === 'webhook') {
            elements.push(
                <div key="webhook" className={`w-10 h-10 relative bg-gray-50 border${roundedClass}`}>
                    <Webhook
                        size={16}
                        className="object-contain p-1"
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }}
                    />
                </div>
            );
        } else if (triggerType === 'cron') {
            elements.push(
                <div key="cron" className={`w-10 h-10 relative bg-gray-50 border${roundedClass}`}>
                    <Timer
                        size={16}
                        className="object-contain p-1"
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }}
                    />
                </div>
            );
        }
    }

    // App Icons (deduplicated)
    for (let i = 0; i < appIcons.length; i++) {
        const icon = appIcons[i];
        if (icon && !shownIcons.has(icon)) {
            shownIcons.add(icon);
            if (i < maxIcons) {
                elements.push(
                    <div
                        key={`app-icon-wrapper-${i}`}
                        className={`h-10 w-10 relative bg-gray-50 border${roundedClass}`}
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
            } else {
                elements.push(
                    <div
                        key="app-icon-wrapper-more"
                        className={`text-black w-10 h-10 bg-gray-50 flex items-center justify-center border${roundedClass}`}
                    >
                        <span>+{appIcons.length - maxIcons}</span>
                    </div>
                );
                break;
            }
        }
    }

    if (overlap) {
        const stacked = elements.map((el, idx) =>
            cloneElement(el, {
                className: `${el.props.className} ring-2 ring-white${idx > 0 ? ' -ml-3' : ''}`,
                style: { ...(el.props.style || {}), zIndex: elements.length - idx },
            })
        );
        return <div className="flex items-center">{stacked}</div>;
    }

    return <div className="flex items-center gap-2">{elements}</div>;
};

export default TemplateCardIcons;
