import React, { useMemo, useCallback } from 'react';
import Image from 'next/image';
import '../../../scss/realworldusecase.scss';

const USE_CASES = [
    'Sync form responses automatically to a spreadsheet for instant data capture',
    'Send Slack notifications whenever a new row is added or updated in Sheets',
    'Trigger email campaigns in Mailchimp when a new contact is added to a sheet',
    'Create CRM contacts in HubSpot directly from new Google Sheets entries',
    'Generate and save PDF reports to Google Drive from spreadsheet data',
    'Automatically back up database records to a Google Sheet on a daily schedule',
];

const INTEGRATION_APPS = [
    {
        name: 'Slack',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
        fallback: 'https://placehold.co/52x52/4A154B/white?text=SL',
        delay: '0ms',
    },
    {
        name: 'Gmail',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        fallback: 'https://placehold.co/52x52/EA4335/white?text=GM',
        delay: '60ms',
    },
    {
        name: 'HubSpot',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hubspot/hubspot-original.svg',
        fallback: 'https://placehold.co/52x52/FF7A59/white?text=HB',
        delay: '120ms',
    },
    {
        name: 'Notion',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
        fallback: 'https://placehold.co/52x52/000000/white?text=NT',
        delay: '180ms',
    },
    {
        name: 'Shopify',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg',
        fallback: 'https://placehold.co/52x52/96BF48/white?text=SP',
        delay: '240ms',
    },
    {
        name: 'Airtable',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/airtable/airtable-original.svg',
        fallback: 'https://placehold.co/52x52/18BFFF/white?text=AT',
        delay: '300ms',
    },
];

const DEFAULT_ICON = 'https://placehold.co/120x120/0F9D58/white?text=GS';

const UseCaseCard = ({ text }) => (
    <div className="bg-white border border-gray-200 px-[18px] py-4 flex items-center [&:last-child:nth-child(odd)]:col-span-2">
        <p className="text-[1.1rem] font-medium text-[#1a1a1a] leading-[1.5] m-0">{text}</p>
    </div>
);

const AppTile = ({ app, onError }) => (
    <div
        className="border border-gray-300 bg-white p-2.5 flex items-center justify-center transition-all duration-180 ease-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.09)] hover:-translate-y-[1px] app-tile"
        style={{ animationDelay: app.delay }}
    >
        <Image
            className="w-[52px] h-[52px] object-contain block"
            src={app.icon}
            alt={app.name}
            width={52}
            height={52}
            loading="lazy"
            onError={(e) => onError(e, app.fallback)}
        />
    </div>
);

const AnimatedDot = ({ delay }) => (
    <div
        className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#0f9d58] opacity-0 dot"
        style={{ animationDelay: delay }}
    />
);

const RealWorldUseCase = ({ appOneDetails, combosData, appCount }) => {
    const handleImageError = useCallback((e, fallbackSrc) => {
        e.currentTarget.src = fallbackSrc;
        e.currentTarget.onerror = null;
    }, []);

    const appIcon = useMemo(() => appOneDetails?.iconurl || DEFAULT_ICON, [appOneDetails?.iconurl]);
    const appName = useMemo(() => appOneDetails?.name || 'App', [appOneDetails?.name]);

    // Get dynamic app icons from combosData
    const dynamicApps = useMemo(() => {
        if (!combosData?.plugins) return INTEGRATION_APPS;

        const plugins = Object.values(combosData.plugins)
            .filter((plugin) => plugin?.appslugname !== appOneDetails?.appslugname) // Exclude current app
            .slice(0, 6) // Get top 6 apps
            .map((plugin, index) => ({
                name: plugin?.name || 'App',
                icon:
                    plugin?.iconurl || `https://placehold.co/52x52/0F9D58/white?text=${plugin?.name?.charAt(0) || 'A'}`,
                fallback: `https://placehold.co/52x52/0F9D58/white?text=${plugin?.name?.charAt(0) || 'A'}`,
                delay: `${index * 60}ms`,
            }));

        // If we have less than 6 apps, fill with static ones
        if (plugins.length < 6) {
            const remaining = INTEGRATION_APPS.slice(0, 6 - plugins.length);
            return [...plugins, ...remaining];
        }

        return plugins;
    }, [combosData, appOneDetails]);
    return (
        <section className="flex flex-col gap-6 mx-auto container">
            <div className="flex flex-col gap-1">
                <h2 className="h2">Real-world use cases of {appName} integrations</h2>
                <p className="sub-h1">
                    See how {appName} integrates with popular apps to automate tasks and streamline your workflow.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row border border-gray-300 overflow-hidden">
                <div className="w-full lg:w-1/2 bg-[#fafaf9] p-5 border-b lg:border-b-0 lg:border-r border-gray-300">
                    <div className="grid grid-cols-2 gap-4 h-full">
                        {USE_CASES.map((useCase, index) => (
                            <UseCaseCard key={index} text={useCase} />
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-[#fafaf9] relative overflow-hidden min-h-[320px] lg:min-h-[420px] self-stretch">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_center,rgba(15,157,88,0.13)_0%,transparent_68%)]"></div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 pr-[34%]">
                        <div className="absolute rounded-full border border-[#0f9d58]/20 pulse-ring w-[210px] h-[210px]"></div>
                        <div className="absolute rounded-full border border-[#0f9d58]/20 pulse-ring w-[300px] h-[300px] [animation-delay:0.65s]"></div>
                    </div>

                    <div className="relative h-full flex items-center justify-center gap-8 lg:gap-14 p-8 lg:p-12 z-10">
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <div className="border-2 border-[#0f9d58] bg-white p-4 lg:p-6 shadow-sm">
                                <Image
                                    className="object-contain"
                                    src={appIcon}
                                    alt={appName}
                                    width={100}
                                    height={100}
                                    onError={(e) => handleImageError(e, DEFAULT_ICON)}
                                />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 text-center">{appName}</span>
                        </div>

                        <div className="w-[80px] shrink-0 relative">
                            <div className="w-full h-[1px] bg-[#0f9d58]/40 relative">
                                <AnimatedDot delay="0s" />
                                <AnimatedDot delay="0.65s" />
                                <AnimatedDot delay="0.98s" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <div className="grid grid-cols-2 gap-3">
                                {dynamicApps.map((app, index) => (
                                    <AppTile key={index} app={app} onError={handleImageError} />
                                ))}
                            </div>
                            <span className="text-[0.8125rem] text-gray-500 text-center">
                                {appCount + 300}+ more apps
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealWorldUseCase;
