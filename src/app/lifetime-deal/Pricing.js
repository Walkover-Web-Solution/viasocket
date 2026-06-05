import { Check as CheckIcon, X } from 'lucide-react';

const Check = () => <CheckIcon size={15} strokeWidth={2.5} className="text-green-500 shrink-0" aria-hidden />;
const Cross = () => <X size={14} strokeWidth={2} className="text-gray-300 shrink-0" aria-hidden />;

function Card({ eyebrow, oldPrice, price, features, support, cta, featured = false }) {
    return (
        <article className="relative bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
            <span className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
                {eyebrow}
            </span>
            <div className="mb-4">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-black">{price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">{oldPrice}</span>
                </div>
                <span className="text-xs text-accent font-medium">one-time payment</span>
            </div>
            <div className="h-px bg-gray-100 mb-4" />
            <ul className="flex flex-col gap-3 flex-1">
                {features.map((f, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${f.excluded ? 'text-gray-300' : 'text-gray-700'}`}>
                        {f.excluded ? <Cross /> : <Check />}
                        <span className={f.excluded ? 'line-through' : ''}>{f.label}</span>
                    </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-gray-700">
                    <Check />
                    <span>{support}</span>
                </li>
            </ul>
            <button
                type="button"
                aria-label={cta}
                className="mt-6 w-full py-3 px-4 rounded-full border border-gray-300 text-sm font-bold text-black bg-white hover:bg-gray-50 transition-colors"
            >
                {cta}
            </button>
        </article>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="relative bg-[#FAFAFA] py-[110px] overflow-hidden border-t border-accent/10">
            <div className="container px-8">
                <div className="text-center mb-13">
                    <div className="inline-block text-accent text-[11.5px] font-bold tracking-[0.18em] uppercase mb-7">
                        PRICING
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.05] tracking-[-1.4px] mb-12">
                        Flexible pricing. <span className="text-accent">Built to scale.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        eyebrow="SOLO PLAN"
                        oldPrice="$599"
                        price="$390"
                        cta="Get Solo Plan"
                        features={[
                            { label: '5,000 tasks/month' },
                            { label: '2,000 AI credits' },
                            { label: '2,200+ integrations' },
                            { label: '1 team member' },
                            { label: 'Advanced AI models', excluded: true },
                            { label: '15-min polling interval' },
                        ]}
                        support="Standard ticket support"
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
                                        <span className="font-extrabold text-accent">3× Solo</span> tasks{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (15,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            {
                                label: (
                                    <>
                                        <span className="font-extrabold text-accent">2.5× Solo</span> AI credits{' '}
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
                                        <span className="font-extrabold text-accent">5× Solo</span> tasks{' '}
                                        <span className="text-gray-500 font-medium text-xs ml-0.5 whitespace-nowrap">
                                            (25,000/mo)
                                        </span>
                                    </>
                                ),
                            },
                            {
                                label: (
                                    <>
                                        <span className="font-extrabold text-accent">5× Solo</span> AI credits{' '}
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
                    />
                </div>

                <div
                    role="note"
                    className="flex flex-col sm:flex-row items-center gap-5 max-w-[840px] mx-auto mt-10 p-6 sm:px-8 bg-white border border-black/10 rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_14px_38px_-16px_rgba(10,10,10,0.10)] text-center sm:text-left"
                >
                    <div
                        className="w-13 h-13 rounded-2xl bg-green-100 flex items-center justify-center shrink-0"
                        aria-hidden
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                            fill="none"
                            stroke="#16A34A"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
                            <polyline points="9 12 11.2 14.2 15 10.4" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[17px] font-bold mb-1 tracking-[-0.3px]">30-day money-back guarantee</h3>
                        <p className="text-[13.5px] text-gray-500 leading-[1.55] m-0">
                            Try viaSocket risk-free. If it’s not right for your team, email us within 30 days for a full
                            refund
                        </p>
                    </div>
                    <div
                        className="hidden sm:flex shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-green-600 flex-col items-center justify-center text-green-600 leading-none"
                        aria-hidden
                    >
                        <span className="text-[22px] font-extrabold">30</span>
                        <span className="text-[9px] font-bold tracking-[0.16em] mt-0.5">DAYS</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
