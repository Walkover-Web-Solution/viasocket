import Image from 'next/image';

const CARDS = [
    {
        title: 'No Monthly Fees',
        desc: 'Replace expensive automation subscriptions with a single lifetime payment for your workflows.',
        bg: '#F4F7FB',
        bgHover: '#EAF1F9',
        border: 'rgba(47,108,176,0.12)',
        borderHover: 'rgba(47,108,176,0.22)',
        rule: '#2F6CB0',
    },
    {
        title: 'Unified Integrations',
        desc: 'Connect your tools and move data across apps without manual work or disconnected systems.',
        bg: '#FBF8EF',
        bgHover: '#FAF4E2',
        border: 'rgba(190,145,30,0.12)',
        borderHover: 'rgba(190,145,30,0.22)',
        rule: '#C99428',
    },
    {
        title: 'Faster Automation',
        desc: 'Launch workflows in minutes using triggers, actions, routers, delays, and reusable templates.',
        bg: '#F2F7F1',
        bgHover: '#EAF3E8',
        border: 'rgba(76,145,76,0.12)',
        borderHover: 'rgba(76,145,76,0.22)',
        rule: '#4A8A4A',
    },
    {
        title: 'Team Ready',
        desc: 'Automate operations across sales, support, marketing, finance, and internal team processes.',
        bg: '#F6F3FB',
        bgHover: '#EFEAF7',
        border: 'rgba(115,85,165,0.12)',
        borderHover: 'rgba(115,85,165,0.22)',
        rule: '#7355A8',
    },
];

export default function Unlock() {
    return (
        <section id="unlock" className="unlock-section relative bg-[#FFFCFC] py-[110px] border-t border-black/5 overflow-hidden">
            <div className="relative z-10 container mx-auto px-8">
                <div className="text-center mb-14">
                    <span className="inline-block text-accent text-[11.5px] font-bold tracking-[0.18em] uppercase mb-6">
                        WHAT YOU&rsquo;LL UNLOCK
                    </span>
                    <h2 className="text-[34px] sm:text-[42px] lg:text-[52px] font-medium leading-[1.1] tracking-[-1.3px] text-[var(--text,#0A0A0A)] m-0">
                        Effortless Process, <span className="text-accent">Continuous Supply.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
                    {CARDS.map((c) => (
                        <article
                            key={c.title}
                            className="group relative rounded-[20px] px-7 py-8 border bg-[var(--bg)] border-[color:var(--bd)] hover:bg-[var(--bg-hover)] hover:border-[color:var(--bd-hover)] hover:-translate-y-[3px] hover:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.10)] transition-all duration-[280ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            style={{
                                ['--bg']: c.bg,
                                ['--bd']: c.border,
                                ['--bg-hover']: c.bgHover,
                                ['--bd-hover']: c.borderHover,
                            }}
                        >
                            <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.5px] text-[var(--text,#0A0A0A)] m-0 mb-6">
                                {c.title}
                            </h3>
                            <div
                                className="rounded-[2px] mb-[22px] h-[3px] w-8 group-hover:w-full transition-[width] duration-[360ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                                style={{ background: c.rule }}
                            />
                            <p className="text-[14.5px] leading-[1.6] text-[var(--muted,#5A5A5A)] m-0 tracking-[-0.05px]">
                                {c.desc}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex flex-shrink-0">
                            {[
                                'https://cdn.simpleicons.org/g2/FF492C',
                                'https://gdm-localsites-assets-gfprod.imgix.net/images/capterra/og_logo-e5a8c001ed0bd1bb922639230fcea71a.png?auto=format%2Cenhance%2Ccompress',
                            ].map((src, i) => (
                                <div
                                    key={src}
                                    className="w-12 border h-12 rounded-full overflow-hidden bg-white relative flex items-center justify-center p-1.5"
                                    style={{ marginLeft: i === 0 ? 0 : -14 }}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-contain block"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1.5 text-center sm:text-left">
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[12px] font-semibold text-black/75 border border-black/5">
                                    G2
                                    <span className="inline-flex items-center">
                                        {[1,2,3,4].map((s) => (
                                            <svg key={s} className="w-3 h-3 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                        <span className="relative inline-block w-3 h-3">
                                            <svg className="w-3 h-3 text-gray-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <span className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: '60%' }}>
                                                <svg className="w-3 h-3 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[12px] font-semibold text-black/75 border border-black/5">
                                    Capterra
                                    <span className="inline-flex items-center">
                                        {[1,2,3,4].map((s) => (
                                            <svg key={s} className="w-3 h-3 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                        <span className="relative inline-block w-3 h-3">
                                            <svg className="w-3 h-3 text-gray-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <span className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: '80%' }}>
                                                <svg className="w-3 h-3 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <p className="text-[13.5px] text-[var(--muted,#5A5A5A)] m-0 leading-[1.4]">
                                Trusted by 2,000+ growing teams
                            </p>
                            <div className="flex gap-2 mt-1.5 flex-wrap justify-center sm:justify-start">
                                {['Reliable', 'Scalable', 'AI-powered'].map((t) => (
                                    <span
                                        key={t}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[11.5px] font-semibold text-black/75 border border-black/5"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Choose a plan"
                        className="btn btn-accent"
                    >
                        Choose a plan
                        <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-[220ms] group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="13 6, 19 12, 13 18" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
