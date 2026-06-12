import { Fragment } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const StepLabel = ({ children }) => (
    <div className="text-center text-xs font-semibold tracking-[0.2em] text-rose-600 mb-4">{children}</div>
);

const StepCard = ({ children }) => <div className="flex-1 w-full flex flex-col">{children}</div>;

const Arrow = () => (
    <div className="hidden lg:flex items-center justify-center px-2 text-gray-400">
        <ArrowRight size={24} />
    </div>
);

const STEPS = [
    {
        label: 'STEP 01',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img0_image-22.png',
        alt: 'Add the builder',
        title: 'Add the builder',
        desc: 'Embed a visual workflow builder directly inside your product.',
    },
    {
        label: 'STEP 02',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/img5_image-23.png',
        alt: 'Build workflows',
        title: 'Build workflows',
        desc: 'Usets connect your app with tools they already use.',
    },
    {
        label: 'STEP 03',
        image: 'https://stuff.thingsofbrand.com/viasocket.com/images/imge_image-24.png',
        alt: 'Run automations',
        title: 'Run automations',
        desc: 'Workflows run automatically across your app and connected tools',
    },
];

export default function HowAppIntegrationBecomes() {
    return (
        <section className="container">
            <div className="border border-gray-200 p-8 md:p-12 bg-white">
                <div className="text-center mb-10">
                    <div className="text-xs font-semibold tracking-[0.2em] text-rose-600 mb-3">HOW IT WORKS</div>
                    <h2 className="h2">How an App Integration becomes an integration</h2>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-6 justify-between">
                    {STEPS.map((step, i) => (
                        <Fragment key={i}>
                            {i > 0 && <Arrow />}
                            <div className="flex-1 flex flex-col justify-between max-w-[360px]">
                                <StepLabel>{step.label}</StepLabel>
                                <StepCard>
                                    <Image
                                        src={step.image}
                                        alt={step.alt}
                                        width={300}
                                        height={200}
                                        className="w-full h-auto object-contain mx-auto"
                                    />
                                    <div className="mt-5">
                                        <h3 className="font-medium text-lg">{step.title}</h3>
                                        <p className="text-sm">{step.desc}</p>
                                    </div>
                                </StepCard>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
