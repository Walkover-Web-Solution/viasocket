import Image from 'next/image';

const ROW1 = [['Notion','notion.so'],['WhatsApp','whatsapp.com'],['Google Sheets','sheets.google.com'],['Stripe','stripe.com'],['Gmail','gmail.com'],['Slack','slack.com'],['Shopify','shopify.com'],['HubSpot','hubspot.com'],['Salesforce','salesforce.com'],['Twilio','twilio.com'],['Calendly','calendly.com'],['Google Drive','drive.google.com'],['Mailchimp','mailchimp.com'],['ChatGPT','openai.com'],['Razorpay','razorpay.com']];
const ROW2 = [['Facebook','facebook.com'],['Dropbox','dropbox.com'],['Asana','asana.com'],['Airtable','airtable.com'],['ClickUp','clickup.com'],['Linear','linear.app'],['Trello','trello.com'],['Discord','discord.com'],['X','x.com'],['Monday.com','monday.com'],['Zoho CRM','zoho.com'],['Jira','atlassian.com'],['Outlook','outlook.com'],['GitHub','github.com'],['Pipedrive','pipedrive.com']];

function Strip({ apps, dir }) {
    const items = [...apps, ...apps];
    return (
        <div className={`flex gap-2.5 w-max will-change-transform hover:[animation-play-state:paused] ${dir === 'left' ? 'ltd-marquee-left' : 'ltd-marquee-right'}`}>
            {items.map(([name, domain], i) => (
                <div key={`${name}-${i}`} className="flex items-center gap-2.5 pl-3 pr-5 py-2.5 bg-white/[0.055] border border-white/10 rounded-[13px] whitespace-nowrap shrink-0" aria-hidden={i >= apps.length}>
                    <Image className="w-7 h-7 rounded-md object-contain shrink-0" src={`https://thingsofbrand.com/api/icon/${domain}`} alt={i >= apps.length ? '' : name} width={28} height={28} loading="lazy" />
                    <span className="text-[13.5px] font-medium text-white/80">{name}</span>
                </div>
            ))}
        </div>
    );
}

export default function Integrations() {
    return (
        <section id="integrations" className="relative bg-[#080808] text-white py-28 lg:py-[140px] overflow-hidden text-center">
            <div aria-hidden className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,black_10%,transparent_100%)]" />
            <div aria-hidden className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_55%_45%_at_50%_60%,rgba(168,32,13,0.22)_0%,transparent_70%)]" />
            <div className="relative z-10 px-5 lg:px-20 container mx-auto">
                <div className="inline-block text-accent text-[11px] font-bold tracking-[0.17em] uppercase mb-[22px]">2,200+ APP INTEGRATIONS</div>
                <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-[-1.4px] mb-5 text-white">
                    One Platform. Endless Connections.<br />
                    Power Every Workflow with viaSocket.
                </h2>
                <p className="text-base text-white/45 max-w-[580px] mx-auto mb-14 leading-[1.7]">
                    Connect viaSocket with the apps your team already uses and automate everything from notifications to approvals, syncs, and operations.
                </p>

                <div className="relative flex flex-col gap-3 overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]">
                    <Strip apps={ROW1} dir="left" />
                    <Strip apps={ROW2} dir="right" />
                </div>
            </div>
        </section>
    );
}
