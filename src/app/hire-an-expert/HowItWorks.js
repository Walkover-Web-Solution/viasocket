import Section from './Section';

const HOW_STEPS = [
    {
        step: '01',
        title: 'Describe your workflow',
        desc: 'Tell us what you want to automate and the tools involved.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img9_image-11.png',
    },
    {
        step: '02',
        title: 'AI analysis & call booking',
        desc: 'Get an instant workflow assessment and schedule a consultation.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img6_image-1.png',
    },
    {
        step: '03',
        title: 'Talk to a Viasocket expert',
        desc: 'Review the workflow, implementation scope, and delivery plan together.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img8_image-2.png',
    },
    {
        step: '04',
        title: 'Approve & get it built',
        desc: 'Confirm pricing and let our experts handle the automation setup.',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img8_image-3.png',
    },
];

export default function HowItWorks() {
    return (
        <Section
            eyebrow="How it works"
            title="Your workflow, handled step by step"
            subtitle="Get your workflows planned, reviewed, and implemented by Viasocket experts."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {HOW_STEPS.map((s) => (
                    <div
                        key={s.step}
                        className="bg-white border border-[#ececec] p-[18px] pb-6 flex flex-col shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    >
                        <span className="self-start text-accent text-sm font-semibold tracking-wide mb-3.5">
                            {s.step}
                        </span>
                        <div className="w-full aspect-[3/2] mb-[18px] bg-[#faf9f4] overflow-hidden">
                            <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <h3 className="text-[17px] font-semibold leading-tight mb-2 tracking-[-0.2px]">{s.title}</h3>
                        <p className="text-xs text-gray-500 leading-[1.5]">{s.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
