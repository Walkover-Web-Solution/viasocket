// components/IntegrationIcons.jsx
import Image from 'next/image';
import Link from 'next/link';
import { Webhook, Timer } from 'lucide-react';

export default function TemplateIcons({ template }) {
    const triggerIcon = template?.triggerIcon;
    const triggerType = template?.triggerType;
    const pluginData = Array.isArray(template?.pluginData) ? template.pluginData : [];
    const appIcons = Array.isArray(template?.appsIcons) ? template.appsIcons : [];

    const shownIcons = new Set();
    const elements = [];

    // 1) Trigger handling
    if (triggerType === 'webhook') {
        elements.push(
            <div
                key="trigger-webhook"
                className="flex items-center justify-center w-8 h-8 border custom-border bg-white"
            >
                <Webhook size={24} />
            </div>
        );
    } else if (triggerType === 'cron') {
        elements.push(
            <div key="trigger-cron" className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                <Timer size={24} />
            </div>
        );
    } else if (triggerIcon && !shownIcons.has(triggerIcon)) {
        const triggerPlugin = pluginData.find((p) => p.iconurl === triggerIcon);
        shownIcons.add(triggerIcon);

        if (triggerPlugin?.pluginslugname) {
            elements.push(
                <Link
                    key={`trigger-plugin-${triggerPlugin.pluginrecordid}`}
                    href={`/integrations/${triggerPlugin.pluginslugname}`}
                    className="flex items-center justify-center w-8 h-8 border custom-border bg-white hover:bg-gray-50"
                >
                    <Image
                        src={triggerIcon}
                        alt={triggerPlugin.pluginname || 'trigger icon'}
                        width={36}
                        height={36}
                        className="h-5 w-fit"
                    />
                </Link>
            );
        } else {
            elements.push(
                <div
                    key="trigger-icon"
                    className="flex items-center justify-center w-8 h-8 border custom-border bg-white"
                >
                    <Image src={triggerIcon} alt="trigger icon" width={36} height={36} className="h-5 w-fit" />
                </div>
            );
        }
    }

    // 2) pluginData icons
    for (const plugin of pluginData) {
        const icon = plugin.iconurl;
        if (!icon || shownIcons.has(icon)) continue;
        shownIcons.add(icon);

        const href = plugin.pluginslugname ? `/integrations/${plugin.pluginslugname}` : null;

        if (href) {
            elements.push(
                <Link
                    key={`plugin-${plugin.pluginrecordid}`}
                    href={href}
                    className="flex items-center justify-center w-8 h-8 border custom-border bg-white hover:bg-gray-50"
                >
                    <Image
                        src={icon}
                        alt={plugin.pluginname || 'app icon'}
                        width={36}
                        height={36}
                        className="h-5 w-fit"
                    />
                </Link>
            );
        } else {
            elements.push(
                <div
                    key={`plugin-${plugin.pluginrecordid}`}
                    className="flex items-center justify-center w-8 h-8 border custom-border bg-white"
                >
                    <Image
                        src={icon}
                        alt={plugin.pluginname || 'app icon'}
                        width={36}
                        height={36}
                        className="h-5 w-fit"
                    />
                </div>
            );
        }
    }

    // 3) Fallback appIcons
    appIcons.forEach((icon, i) => {
        if (!icon || shownIcons.has(icon)) return;
        shownIcons.add(icon);

        elements.push(
            <div
                key={`app-icon-fallback-${i}`}
                className="flex items-center justify-center w-8 h-8 border custom-border bg-white"
            >
                <Image src={icon} alt={`app icon ${i}`} width={36} height={36} className="h-5 w-fit" />
            </div>
        );
    });

    return <div className="flex gap-4 items-center">{elements}</div>;
}
