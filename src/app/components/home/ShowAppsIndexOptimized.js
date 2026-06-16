import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const APPSONE = [
    {
        src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
        alt: 'slack icon',
        IconName: 'Slack',
        className: '!ml-8',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/teams.microsoft.com',
        alt: 'microsoft icon',
        IconName: 'Microsoft',
    },
    {
        src: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg',
        alt: 'zoom icon',
        IconName: 'Zoom',
    },
    {
        src: 'https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png',
        alt: 'gmail icon',
        IconName: 'Gmail',
    },
    {
        src: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
        alt: 'google sheet icon',
        IconName: 'Google Sheets',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/hubspot.com',
        alt: 'hubspot icon',
        IconName: 'Hubspot',
    },
    {
        src: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png',
        alt: 'salesforce icon',
        IconName: 'Salesforce',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/pipedrive.com',
        alt: 'pipedrive icon',
        IconName: 'Pipedrive',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/quickbooks.com',
        alt: 'quickbooks icon',
        IconName: 'Quickbooks',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/xero.com',
        alt: 'xero icon',
        IconName: 'Xero',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/msg91.com',
        alt: 'MSG91',
        IconName: 'MSG91',
    },
];

const APPSTWO = [
    {
        src: 'https://thingsofbrand.com/api/icon/mailchimp.com',
        alt: 'mailchimp icon',
        IconName: 'Mailchimp',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/activecampaign.com',
        alt: 'activecampaign icon',
        IconName: 'ActiveCampaign',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/zendesk.com',
        alt: 'zendesk icon',
        IconName: 'Zendesk',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/freshdesk.com',
        alt: 'freshdesk icon',
        IconName: 'Freshdesk',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/trello.com',
        alt: 'trello icon',
        IconName: 'Trello',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/asana.com',
        alt: 'asana icon',
        IconName: 'Asana',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/clickup.com',
        alt: 'clickup icon',
        IconName: 'Clickup',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/notion.com',
        alt: 'notion icon',
        IconName: 'Notion',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/fireflies.ai',
        alt: 'Fireflies',
        IconName: 'Fireflies',
    },
];

export default function ShowAppsIndexOptimized({
    isHomePage = false,
    isTrustMarquee = false,
    apps,
    appCount,
}) {
    const fallback = [...APPSONE, ...APPSTWO].map((a) => ({ iconurl: a.src, name: a.alt, className: a.className }));
    const list = (apps && apps.length ? apps : fallback).filter((a) => a?.iconurl).slice(0, 40);

    const renderMarquee = (items, direction = 'left') => (
        <Marquee
            direction={direction}
            speed={40}
            autoFill
            gradient
            gradientColor={[245, 245, 240]}
            gradientWidth={120}
        >
            <div className="inline-flex py-4 gap-4">
                {items.map((app, i) => (
                    <div
                        key={`${app.iconurl}-${i}`}
                        className={`flex items-center bg-white border border-[#e8e8e8] rounded-xl px-3 py-2.5 whitespace-nowrap shadow-[0_1px_4px_rgba(0,0,0,0.05)] shrink-0 ml-4 ${app.className || ''}`}
                    >
                        <Image
                            src={app.iconurl}
                            alt={app.name || 'app icon'}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain rounded"
                        />
                    </div>
                ))}
            </div>
        </Marquee>
    );

    return (
        <div className="flex flex-col gap-6">
            {isHomePage || isTrustMarquee ? (
                <div className={`flex flex-col items-center justify-center ${isHomePage ? 'gap-2 my-12' : 'gap-8 mb-8 mt-2'}`}>
                    {appCount ? (
                        <p className="text-center text-[13px] font-semibold tracking-[0.1em] text-[#999] uppercase">
                            <strong className="text-[#555] font-medium">{appCount + 300}+</strong> applications integrated
                        </p>
                    ) : (
                        isHomePage && <h2 className="h2">Trusted by Teams Using These Apps</h2>
                    )}
                    {renderMarquee(list, 'left')}
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-8">
                        <p className="text-center text-gray-500 min-w-fit ms-4 uppercase">
                            Trusted by Teams Using These Apps
                        </p>
                        {renderMarquee(list.slice(0, Math.ceil(list.length / 2)), 'left')}
                    </div>
                    {renderMarquee(list.slice(Math.ceil(list.length / 2)), 'right')}
                </>
            )}
        </div>
    );
}
