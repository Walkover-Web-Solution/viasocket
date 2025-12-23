import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const APPSONE = [
    {
        src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
        alt: 'slack icon',
        IconName: 'Slack',
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

const ShowAppsIndex = () => {
    return (
        <>
            <div className="flex flex-col gap-6 container py-8 px-4">
                <div className="flex items-center gap-8">
                    <p className="text-center text-gray-500 min-w-fit ms-4 uppercase">
                        Trusted by Teams Using These Apps
                    </p>
                    <Marquee
                        direction="left"
                        speed={40}
                        autoFill
                        gradient
                        gradientColor={[250, 249, 246]}
                        gradientWidth={96}
                        // pauseOnHover={true}
                    >
                        <div className="inline-flex py-4 gap-20">
                            {APPSONE.map((app, index) => (
                                <div className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`}>
                                    <Image
                                        key={app.src}
                                        src={app.src}
                                        alt={app.alt}
                                        width={30}
                                        height={30}
                                        className={`object-contain cursor-pointer ${app.className ?? ''}`}
                                    />
                                    <p className="text-center font-medium text-lg text-gray-500">{app.IconName}</p>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>
                <Marquee
                    direction="right"
                    speed={40}
                    autoFill
                    gradient
                    gradientColor={[250, 249, 246]}
                    gradientWidth={96}
                    // pauseOnHover={true}
                    className="ms-4"
                >
                    <div className="inline-flex py-4 gap-20">
                        {APPSTWO.map((app, index) => (
                            <div className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`}>
                                <Image
                                    key={app.src}
                                    src={app.src}
                                    alt={app.alt}
                                    width={30}
                                    height={30}
                                    className={`object-contain cursor-pointer ${app.className ?? ''}`}
                                />
                                <p className="text-center font-medium text-lg text-gray-500">{app.IconName}</p>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </>
    );
};

export default ShowAppsIndex;
