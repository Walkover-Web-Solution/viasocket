const STEPS = [
    {
        num: '01.',
        title: 'Connect your tools',
        desc: 'Connect Slack, Gmail, Notion, HubSpot, Stripe, and thousands more.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="none" stroke="#A8200D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 13a5 5 0 0 0 7.07.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.07-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" />
            </svg>
        ),
    },
    {
        num: '02.',
        title: 'Add the action apps',
        desc: 'Select the destination apps where you want the data to flow. Add as many steps as you need.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="none" stroke="#A8200D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        num: '03.',
        title: 'Automate at scale',
        desc: 'Run approvals, AI actions, notifications, and operations automatically.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="none" stroke="#A8200D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="13 3, 5 14, 12 14, 11 21, 19 10, 12 10, 13 3" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <section id="howitworks" className="relative bg-[#FFFCF4] py-[100px] border-t border-black/5">
            <div className="container mx-auto px-8">
                <div className="mb-24 text-center">
                    <div className="inline-block text-accent text-[11.5px] font-bold tracking-[0.18em] uppercase mb-7">HOW IT WORKS</div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold leading-[1.08] tracking-[-1.3px]">
                        From manual work to automated workflows<br />
                        <span className="text-accent">in minutes.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-0">
                    {STEPS.map((s, i) => (
                        <div key={s.num} className="text-center">
                            <div className="relative w-[120px] h-[120px] mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-accent/30 ltd-ring-spin" style={{ animationDelay: `-${i * 20}s` }} />
                                <div className="relative w-[88px] h-[88px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_18px_40px_-10px_rgba(0,0,0,0.10)] flex items-center justify-center ltd-breath" style={{ animationDelay: `-${i * 1.3}s` }}>
                                    {s.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mt-9 mb-3 tracking-[-0.4px]">
                                <span className="text-accent mr-0.5">{s.num}</span> {s.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-[1.6] max-w-[250px] mx-auto">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
