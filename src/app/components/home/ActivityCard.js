import Image from 'next/image';

const APP_ICONS = {
    Gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    Slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',

    'Google Sheets': 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    Shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
    Notion: 'https://thingsofbrand.com/api/icon/notion.com',
    WhatsApp: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_whatsapp.svg'
};

const TAG_STYLES = {
    Sales: 'bg-[#16a34a] text-white',
    Finance: 'bg-[#f59e0b] text-white',
    Ops: 'bg-[#4b5563] text-white',
    Outbound: 'bg-[#a78bfa] text-white',
    Marketing: "bg-[#ec4899] text-white",
    HR: "bg-[#ef4444] text-white"
};

// Horizontal inset per side, used only by the floating (xl+) layout. Tighter
// below 2xl so the cards stay clear of the centred column; from 2xl there is
// room to bring them in, as in the design.
const SIDE_POSITION = {
    left: 'left-[1%] 2xl:left-[7%]',
    right: 'right-[1%] 2xl:right-[7%]',
};

export const ACTIVITY_CARDS = [
    {
        app: 'WhatsApp',
        tag: 'Sales',
        text: 'Order received. WhatsApp confirmation sent.',
        side: 'left',
        position: 'top-[4%] -rotate-2',
    },
    {
        app: 'Slack',
        tag: 'Ops',
        text: 'Shopify order paid, team notified on Slack.',
        side: 'right',
        position: 'top-[1%] rotate-2',
    },
    {
        app: 'Google Sheets',
        tag: 'Sales',
        text: 'New Facebook lead added to Google Sheets.',
        side: 'left',
        position: 'top-[28%] -rotate-1',
    },
    {
        app: 'Gmail',
        tag: 'Marketing',
        text: 'Instagram comment received, reply drafted in Gmail.',
        side: 'right',
        position: 'top-[34%] rotate-1',
    },
    {
        app: 'Notion',
        tag: 'HR',
        text: 'Applicant scored and added to Notion.',
        side: 'left',
        position: 'top-[55%] -rotate-1',
    },
    {
        app: 'Shopify',
        tag: 'Finance',
        text: 'Reconciled 38 transactions from Stripe',
        side: 'right',
        position: 'top-[64%] rotate-2',
    },
];

// floating: scattered around the hero (xl+). Otherwise the card sits in normal
// flow — a swipeable row on phones, a grid on tablets — so it is never hidden.
export default function ActivityCard({ app, tag, text, side, position, floating = false }) {
    const layout = floating
        ? `absolute w-[210px] 2xl:w-[265px] ${SIDE_POSITION[side]} ${position}`
        : 'w-[240px] shrink-0 sm:w-auto';

    return (
        <div
            className={`bg-white border border-black/[0.07] shadow-[0_4px_18px_rgba(0,0,0,0.07)] px-3.5 py-2.5 ${layout}`}
        >
            <div className="flex items-center gap-2">
                <Image
                    src={APP_ICONS[app]}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain rounded shrink-0"
                />
                <span className="text-sm font-semibold text-gray-900">{app}</span>
                <span className={`text-[10px] font-semibold leading-none px-1.5 py-1 rounded ${TAG_STYLES[tag]}`}>
                    {tag}
                </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-gray-500">{text}</p>
        </div>
    );
}
