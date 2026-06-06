import Image from 'next/image';

const STEPS = [
    {
        num: '1.',
        title: 'Connect your tools',
        desc: 'Connect Slack, Gmail, Notion, HubSpot, Stripe, and thousands more.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img4_connection.png',
    },
    {
        num: '2.',
        title: 'Add the action apps',
        desc: 'Select the destination apps where you want the data to flow. Add as many steps as you need.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img3_trigger-action.png',
    },
    {
        num: '3.',
        title: 'Automate at scale',
        desc: 'Run approvals, AI actions, notifications, and operations automatically.',
        image: '/assets/bg-img/3.svg',
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
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.3px]">
                        From manual work to automated workflows
                        <br />
                        <span className="text-accent mt-2 inline-block">in minutes.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {STEPS.map((s) => (
                        <div key={s.num} className="flex flex-col items-center text-center justify-between">
                            <div className="w-full relative aspect-[16/8]">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>
                            <h3 className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold">
                                    {s.num} {s.title}
                                </h3>
                                <p className="text-xs text-gray-500 leading-[1.55] max-w-[300px]">{s.desc}</p>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
