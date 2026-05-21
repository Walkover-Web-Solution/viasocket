import Image from 'next/image';
import { Webhook, Timer } from 'lucide-react';

function FlowAppIcons({ template }) {
    const { trigger = {}, blocks = {} } = template?.flowJson || {};
    const icons = [];
    const seen = new Set();

    if (trigger?.triggerType === 'webhook') {
        icons.push({ key: 'webhook', node: <Webhook className="w-5 h-5" /> });
    } else if (trigger?.triggerType === 'cron') {
        icons.push({ key: 'cron', node: <Timer className="w-5 h-5" /> });
    } else if (trigger?.iconUrl) {
        seen.add(trigger.iconUrl);
        icons.push({ key: trigger.iconUrl, src: trigger.iconUrl });
    }

    Object.values(blocks).forEach((block) => {
        const url = block?.iconUrl;
        if (!url || seen.has(url)) return;
        seen.add(url);
        icons.push({ key: url, src: url });
    });

    if (!icons.length) return null;

    const MAX_ICONS = 8;
    const visibleIcons = icons.slice(0, MAX_ICONS);
    const extraCount = icons.length - visibleIcons.length;

    return (
        <div className="flex items-center">
            {visibleIcons.map(({ key, src, node }, idx) => (
                <div
                    key={key}
                    className="h-10 w-10 p-2 flex items-center justify-center border bg-white rounded-full overflow-hidden shadow-sm -ml-3 first:ml-0"
                    style={{ zIndex: idx + 2 }}
                >
                    {src ? (
                        <Image src={src} alt="app icon" width={40} height={40} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">{node}</div>
                    )}
                </div>
            ))}
            {extraCount > 0 && (
                <div
                    className="h-10 w-10 flex items-center justify-center border bg-gray-100 text-gray-700 text-xs font-medium rounded-full shadow-sm -ml-3"
                    style={{ zIndex: visibleIcons.length + 2 }}
                >
                    +{extraCount}
                </div>
            )}
        </div>
    );
}

export default FlowAppIcons;
