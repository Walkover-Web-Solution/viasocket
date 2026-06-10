import Image from 'next/image';

const COMPETITORS = [
    {
        name: 'Zapier - Team',
        plan: '10,000 tasks / month',
        price: '$6,084',
    },
    {
        name: 'n8n Cloud - Pro',
        plan: '10,000 executions / month',
        price: '$1,800',
    },
    {
        name: 'Gumloop - Pro',
        plan: '10,000 credits / month',
        price: '$1,332',
    },
];

export default function Comparison() {
    return (
        <section id="comparison" className="relative bg-[#EFF3F8] py-[120px] overflow-hidden border-t border-black/5">
            <div className="container px-10">
                
                <h2 className="text-3xl sm:text-5xl lg:text-[58px] font-medium tracking-[-2px] leading-[1.06] text-center mb-4">
                    Why keep paying every year?
                </h2>
                <p className="text-center text-gray-500 text-lg mb-16">
                    Comparable automation platforms require ongoing annual subscriptions.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 items-stretch max-w-[540px] lg:max-w-none mx-auto">
                    {/* Left dark card */}
                    <div className="bg-[#111] rounded-[22px] border border-white/10 p-7 pb-6 flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:border-white/20">
                        <div className="flex items-center gap-2.5 mb-5">
                            <Image
                                src="/assets/brand/socketIcon.svg"
                                alt="viaSocket"
                                width={22}
                                height={22}
                                className="h-[22px] w-auto"
                                style={{ filter: 'invert(1) brightness(1.7)' }}
                            />
                            <span className="text-white text-[13px] font-semibold tracking-wide">SOCKET</span>
                        </div>
                        <div className="text-[26px] font-medium text-white tracking-[-0.7px] mb-2">
                            Team Plan Lifetime
                        </div>
                        <div className="text-[13.5px] text-white/60 mb-5">Pay once. Use forever.</div>
                        <div className="h-px bg-white/15 mb-5" />
                        <div className="flex items-baseline gap-2 mb-5">
                            <span className="text-[56px] font-medium text-green-500 tracking-[-3px] leading-none">
                                $790
                            </span>
                            <span className="text-[13px] text-white/60">/ one-time · no renewals</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-[13px] text-white/60 space-y-1">
                                <div>15,000 tasks/month</div>
                                <div>2,200+ integrations</div>
                                <div>Unlimited team members</div>
                            </div>
                            <a
                                href="#pricing"
                                className="w-10 h-10 rounded-full border border-white/25 bg-transparent group-hover:bg-accent group-hover:border-accent flex items-center justify-center shrink-0"
                                aria-label="See pricing"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[15px] h-[15px] stroke-white/70 group-hover:stroke-white"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="9 7 17 7 17 15" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col justify-center gap-3.5 max-w-2xl">
                        <div className="text-lg text-gray-900">
                            Other automation tools keep charging you — billed annually, every year:
                        </div>
                        {COMPETITORS.map((c) => (
                            <div
                                key={c.name}
                                className="bg-[#E5E5E5] rounded-[14px] p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div>
                                    <div className="text-lg font-bold tracking-[-0.3px] text-gray-900 mb-1">
                                        {c.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{c.plan}</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-medium tracking-[-0.8px] block text-gray-900">
                                        {c.price}
                                    </span>
                                    <div className="mt-1 text-xs font-semibold tracking-wider uppercase text-gray-500">
                                        3-year cost
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
