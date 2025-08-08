import { Webhook, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TemplateDetails({ template }) {
    const { pluginData = [], category = [], triggerIcon, triggerType } = template;

    const triggerApp = pluginData.find((plugin) => plugin.iconurl === triggerIcon);

    let triggerName = 'Trigger';
    let triggerSlug = null;

    if (triggerType === 'webhook') {
        triggerName = 'Webhook';
    } else if (triggerType === 'cron') {
        triggerName = 'Cron';
    } else if (triggerApp) {
        triggerName = triggerApp.pluginname;
        triggerSlug = triggerApp.pluginslugname;
    }

    const triggerItem = {
        isTrigger: true,
        pluginname: triggerName,
        pluginslugname: triggerSlug,
        iconurl: triggerIcon,
        triggerType,
    };

    const restApps = pluginData.filter((plugin) => plugin.iconurl !== triggerIcon);

    const seen = new Set();
    const uniqueApps = restApps.filter((plugin) => {
        const key = plugin.pluginslugname || plugin.iconurl;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    const apps = [triggerItem, ...uniqueApps];

    return (
        <div className="cont gap-4">
            <div className="cont gap-2">
                <h2 className="h3">App Used</h2>
                <div className="flex flex-wrap gap-2">
                    {apps.map((plugin, idx) => {
                        const isTrigger = plugin.isTrigger;
                        const type = plugin.triggerType;
                        const clickable =
                            plugin.pluginslugname && !(isTrigger && (type === 'webhook' || type === 'cron'));

                        return clickable ? (
                            <Link
                                key={plugin.pluginslugname || plugin.iconurl || `trigger-${idx}`}
                                {...(clickable && {
                                    href: `/integrations/${plugin.pluginslugname}`,
                                })}
                                className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-gray-100`}
                            >
                                {isTrigger && type === 'webhook' ? (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Webhook size={24} />
                                    </div>
                                ) : isTrigger && type === 'cron' ? (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Timer size={24} />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Image
                                            src={plugin.iconurl}
                                            alt={plugin.pluginname}
                                            width={36}
                                            height={36}
                                            className="h-5 w-fit"
                                        />
                                    </div>
                                )}

                                <span className="text-lg">{plugin.pluginname}</span>
                            </Link>
                        ) : (
                            <span
                                key={plugin.pluginslugname || plugin.iconurl || `trigger-${idx}`}
                                className="flex items-center gap-1 px-2 py-1 cursor-default"
                            >
                                {isTrigger && type === 'webhook' ? (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Webhook size={24} />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                        <Timer size={24} />
                                    </div>
                                )}
                                <span className="text-lg">{plugin.pluginname}</span>
                            </span>
                        );
                    })}
                </div>
            </div>

            {category.length > 0 && (
                <div className="cont gap-2">
                    <h2 className="h3">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {category.map((cat, idx) => (
                            <Link
                                key={idx}
                                href={`/integrations/category/${encodeURIComponent(
                                    cat.toLowerCase().replace(/\s+/g, '-')
                                )}`}
                                className="cursor-pointer px-2 py-1 border custom-border hover:bg-gray-100"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
