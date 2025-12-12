import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const APPS = [
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
    // {
    //     src: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    //     alt: 'google sheet icon',
    // },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Google_Sheets_2020_Logo.svg/1489px-Google_Sheets_2020_Logo.svg.png',
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
];

const ShowAppsIndex = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <p className="text-center text-gray-500">Trusted by Teams Using These Apps</p>
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
                        {APPS.map((app, index) => (
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
            <section className="mt-16 container">
                <div className="">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8">
                        Discover our AI-based
                        <br className="hidden sm:block" />
                        <span className="block mt-1">Demo Automation suite</span>
                    </h2>
                </div>

                <div className="mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-gray-200 divide-y sm:divide-y-0 sm:divide-x overflow-hidden bg-white">
                        <div className="p-8 flex flex-col gap-3 !hover:bg-gray-500">
                            <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <span className="h-5 w-5 border border-dashed border-gray-300 rounded-sm" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900">Interactive demo</h3>
                            <p className="text-sm text-gray-500">Create guided demos in seconds</p>
                        </div>

                        <div className="p-8 flex flex-col gap-3 !hover:bg-gray-500">
                            <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <span className="h-5 w-5 border border-dashed border-gray-300 rounded-sm" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900">Sandbox</h3>
                            <p className="text-sm text-gray-500">Build clickable demo environment</p>
                        </div>

                        <div className="p-8 flex flex-col gap-3 !hover:bg-gray-500">
                            <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <span className="h-5 w-5 border border-dashed border-gray-300 rounded-sm" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900">Demo center</h3>
                            <p className="text-sm text-gray-500">Centralize everything in one branded demo hub</p>
                        </div>

                        <div className="p-8 flex flex-col gap-3 !hover:bg-gray-500">
                            <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <span className="h-5 w-5 border border-dashed border-gray-300 rounded-sm" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900">Mobile demo</h3>
                            <p className="text-sm text-gray-500">Mobile-first demos that feel like your app</p>
                        </div>

                        <div className="p-8 flex flex-col gap-3 !hover:bg-gray-500">
                            <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <span className="h-5 w-5 border border-dashed border-gray-300 rounded-sm" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900">Live demo</h3>
                            <p className="text-sm text-gray-500">Product cloning with emulated data</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShowAppsIndex;
