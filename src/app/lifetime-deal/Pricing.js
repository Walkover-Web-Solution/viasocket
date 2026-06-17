import Link from 'next/link';
import { Check as CheckIcon, X, ArrowUpRight } from 'lucide-react';

const Check = () => (
    <span
        className="w-5 h-5 rounded-full border-[1.4px] border-accent flex items-center justify-center shrink-0"
        aria-hidden
    >
        <CheckIcon size={10} strokeWidth={2.2} className="text-[#A8200D]" />
    </span>
);
const Cross = () => (
    <span
        className="w-5 h-5 rounded-full border-[1.4px] border-gray-500 flex items-center justify-center shrink-0"
        aria-hidden
    >
        <X size={10} strokeWidth={2} className="text-[#6b7280]" />
    </span>
);
const Arrow = () => (
    <ArrowUpRight
        size={14}
        strokeWidth={2}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
    />
);

function Card({ eyebrow, oldPrice, price, features, support, cta, href, featured = false }) {
    return (
        <article
            className={`relative bg-white rounded-[20px] p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${featured ? 'border border-accent/20 shadow-[0_8px_28px_-8px_rgba(168,32,13,0.10),0_24px_56px_-16px_rgba(168,32,13,0.10)]' : 'border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_6px_20px_-6px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.10)]'}`}
        >
            {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-accent text-white rounded-full text-[10px] font-bold tracking-[0.1em] uppercase whitespace-nowrap shadow-[0_2px_6px_rgba(168,32,13,0.32)]">
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white/90" aria-hidden>
                        <path d="M6 1l1.18 2.39 2.64.38-1.91 1.86.45 2.63L6 7.05l-2.36 1.21.45-2.63L2.18 3.77l2.64-.38z" />
                    </svg>
                    Most Popular
                </div>
            )}
            <span className="block text-[11.5px] font-bold tracking-[0.16em] uppercase text-gray-500 mb-4">
                {eyebrow}
            </span>
            <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg text-gray-500 line-through font-medium">{oldPrice}</span>
                    <span className="text-[44px] font-medium tracking-[-1.6px] leading-none">{price}</span>
                </div>
            </div>
            <div className="h-px bg-black/5 my-4" />
            <ul className="list-none p-0 m-0 flex flex-col gap-[11px]">
                {features.map((f, i) => (
                    <li
                        key={i}
                        className={`flex items-center gap-2.5 text-[13.5px] leading-[1.4] ${f.excluded ? 'text-gray-500' : ''}`}
                    >
                        {f.excluded ? <Cross /> : <Check />}
                        <span className={f.excluded ? 'line-through' : ''}>{f.label}</span>
                    </li>
                ))}
            </ul>
            <div className="mb-8 mt-4">
                <ul className="list-none p-0 m-0 flex flex-col gap-[11px]">
                    <li className="flex items-center gap-2.5 text-[13.5px]">
                        <Check />
                        <span>{support}</span>
                    </li>
                </ul>
            </div>
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={cta}
                className={`btn w-full ${featured ? 'btn-accent' : 'btn-outline'}`}
            >
                <span>{cta}</span>
                <Arrow />
            </Link>
        </article>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="relative bg-[#FAFAFA] py-[110px] overflow-hidden border-t border-accent/10">
            <div className="container px-8">
                <div className="text-center mb-13">
                    <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium leading-[1.05] tracking-[-1.4px] mb-12">
                        Flexible pricing. <span className="text-accent">Built to scale.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        eyebrow="BASIC PLAN"
                        oldPrice="$599"
                        price="$390"
                        cta="Get Basic Plan"
                        features={[
                            { label: '5,000 tasks/month' },
                            { label: '2,000 AI credits' },
                            { label: '2,200+ integrations' },
                            { label: '1 team member' },
                            { label: 'Advanced AI models', excluded: true },
                            { label: '15-min polling interval' },
                        ]}
                        support="Standard ticket support"
                        href="https://buy.stripe.com/14AfZhad66qD6JjfM72go12"
                    />
                    <Card
                        eyebrow="TEAM PLAN"
                        oldPrice="$1,099"
                        price="$790"
                        cta="Get Team Plan"
                        featured
                        features={[
                            {
                                label: (
                                    <>
                                        <span className="font-medium text-accent">3× Solo</span> tasks{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (15,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            {
                                label: (
                                    <>
                                        <span className="font-medium text-accent">2.5× Solo</span> AI credits{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (6,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            { label: '2,200+ integrations' },
                            { label: 'Unlimited team members' },
                            { label: 'Advanced AI models' },
                            { label: '5-min polling interval' },
                        ]}
                        support="Priority ticket support"
                        href="https://buy.stripe.com/fZuaEXfxqg1daZz8jF2go13"
                    />
                    <Card
                        eyebrow="PREMIUM PLAN"
                        oldPrice="$1,399"
                        price="$990"
                        cta="Get Premium Plan"
                        features={[
                            {
                                label: (
                                    <>
                                        <span className="font-medium text-accent">5× Solo</span> tasks{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (25,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            {
                                label: (
                                    <>
                                        <span className="font-medium text-accent">5× Solo</span> AI credits{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (10,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            { label: '2,200+ integrations' },
                            { label: 'Unlimited team members' },
                            { label: 'Advanced AI models' },
                            { label: '1-min polling (real-time)' },
                        ]}
                        support="1-on-1 live expert support"
                        href="https://buy.stripe.com/cNi14n992dT55Ff6bx2go14"
                    />
                </div>

                <div
                    role="note"
                    className="flex flex-col sm:flex-row items-center gap-5 max-w-[800px] mx-auto mt-10 p-6 sm:px-8 bg-white border border-black/10 rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_14px_38px_-16px_rgba(10,10,10,0.10)] text-center sm:text-left"
                >
                    <div
                        className="hidden sm:flex shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-green-600 flex-col items-center justify-center text-green-600 leading-none"
                        aria-hidden
                    >
                        <span className="text-xl font-medium">30</span>
                        <span className="text-[9px] font-bold tracking-[0.16em] mt-0.5">DAYS</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[17px] font-bold mb-1 tracking-[-0.3px]">30-day money-back guarantee</h3>
                        <p className="text-[13.5px] text-gray-500 leading-[1.55] m-0">
                            Try viaSocket risk-free. If it’s not right for your team, email us within 30 days for a full
                            refund
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
