import Image from 'next/image';

const STEPS = [
    {
        num: '1.',
        title: 'Connect your tools',
        desc: 'Connect Slack, Gmail, Notion, HubSpot, Stripe, and thousands more.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img0_image-19.png',
    },
    {
        num: '2.',
        title: 'Add the action apps',
        desc: 'Select the destination apps where you want the data to flow. Add as many steps as you need.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/imga_image-20.png',
    },
    {
        num: '3.',
        title: 'Automate at scale',
        desc: 'Run approvals, AI actions, notifications, and operations automatically.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_image-21.png',
    },
];

export default function HowItWorks() {
    return (
        <section id="howitworks" className="relative bg-white py-[100px] border-t border-black/5">
            <div className="container mx-auto px-8">
                <div className="mb-20 text-center">
                    <div className="inline-block text-accent text-[11.5px] font-bold tracking-[0.18em] uppercase mb-6">
                        HOW IT WORKS
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.1] tracking-[-1.3px]">
                        From manual work to automated workflows
                        <br />
                        <span className="text-accent mt-2 inline-block">in minutes.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 w-full justify-items-center gap-6 lg:gap-20">
                    {STEPS.map((s) => (
                        <div
                            key={s.num}
                            className="bg-[#F5F5F5] rounded-xl border border-black/5 p-5 flex flex-col items-center text-center gap-6 h-full w-[380px]"
                        >
                            <div className="flex-1 flex items-center justify-center min-h-[280px] max-h-[280px] mb-3 relative w-full">
                                <Image src={s.image} alt={s.title} fill className="object-contain h-full" />
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                                <p className="text-[14px] font-bold">
                                    <span className="text-accent">{s.num}</span>{' '}
                                    <span className="text-gray-900">{s.title}</span>
                                </p>
                                <p className="text-[12px] text-gray-500 leading-[1.5] max-w-[240px]">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
