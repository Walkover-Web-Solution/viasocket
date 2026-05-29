const COMPETITORS = [
    { name: 'Zapier Team', brand: 'zapier', plan: '15,000 tasks/month', metric: 'no AI credits in plan', logo: 'zapier.com', price: '$7,488' },
    { name: 'n8n Cloud Pro', brand: 'n8n', plan: '10,000 executions/month', metric: 'no native AI credits', logo: 'n8n.io', price: '$2,160' },
];

export default function Comparison() {
    return (
        <section id="comparison" className="relative bg-[#EFF3F8] py-[120px] overflow-hidden border-t border-black/5">
            <div className="max-w-[1120px] mx-auto px-10">
                <span className="block text-center text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-[22px]">THE MATH IS THE PITCH</span>
                <h2 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-2px] leading-[1.06] text-center mb-16">
                    Automation should scale your work.<br />
                    Not your <span className="text-accent">bills.</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-6 items-stretch max-w-[540px] lg:max-w-none mx-auto">
                    {/* Left dark card */}
                    <div className="flex flex-col">
                        <div className="bg-[#111] rounded-[22px] border border-white/10 p-7 pb-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2.5 mb-7">
                                <img src="/assets/brand/viasocket.svg" alt="viaSocket" className="h-[22px]" style={{ filter: 'invert(1) brightness(1.7)' }} />
                            </div>
                            <div className="text-[26px] font-extrabold text-white tracking-[-0.7px] mb-2">Team Plan Lifetime</div>
                            <div className="text-[13.5px] text-white/60 mb-5">Pay once. Use forever.</div>
                            <div className="h-px bg-white/15 mb-5" />
                            <div className="text-6xl font-extrabold text-[#D71C1C] tracking-[-3px] leading-none mb-1">$799</div>
                            <div className="text-[13px] text-white/60">one-time · no renewals</div>
                            <div className="mt-2.5 text-xs text-white/55">3-year cost · <strong className="text-white/90 font-bold">$799</strong></div>
                            <div className="mt-auto pt-5 flex justify-end">
                                <a href="#pricing" className="w-10 h-10 rounded-full border-[1.5px] border-white/25 bg-transparent hover:bg-accent hover:border-accent flex items-center justify-center group" aria-label="See pricing">
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-white/70 group-hover:stroke-white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="9 7 17 7 17 15" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right competitor cards */}
                    <div className="bg-white rounded-[22px] border border-black/5 p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_12px_40px_-12px_rgba(0,0,0,0.07)] flex flex-col">
                        <div className="text-xl font-bold tracking-[-0.4px] mb-1">Other automation tools keep charging you.</div>
                        <div className="text-[13.5px] text-gray-500 mb-5">Comparable plans &mdash; billed annually, every year.</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
                            {COMPETITORS.map((c) => (
                                <div key={c.name} className="bg-gray-100 rounded-[14px] border border-black/5 p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <img className="object-contain rounded-md" src={`https://logo.clearbit.com/${c.logo}`} alt={c.name} loading="lazy" style={{ width: 26, height: 26 }} />
                                        <span className="text-[13px] font-semibold text-gray-500">{c.brand}</span>
                                    </div>
                                    <div className="text-[15.5px] font-bold tracking-[-0.3px] mb-1">{c.name}</div>
                                    <div className="text-xs text-gray-500">{c.plan}</div>
                                    <div className="text-xs text-gray-500 flex-1">{c.metric}</div>
                                    <div className="h-px bg-black/5 mt-4 mb-3.5" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[26px] font-extrabold tracking-[-0.8px]">{c.price}</span>
                                    </div>
                                    <div className="mt-1 text-[11px] font-semibold tracking-wider uppercase text-gray-500">3-year cost</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
