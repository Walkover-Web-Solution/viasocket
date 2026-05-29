const TESTIMONIALS = [
    {
        body: 'viaSocket has transformed how we run our operations. The automations are powerful, easy to set up, and save us countless hours every week.',
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        name: 'Karan Patel',
        role: 'Operations Manager, Dokan.co',
    },
    {
        body: 'The best part is the one-time payment. No recurring costs, no surprises — just powerful automation that grows with our business.',
        img: 'https://randomuser.me/api/portraits/women/63.jpg',
        name: 'Catherine J.',
        role: 'Head of Growth, LaunchPad',
    },
    {
        body: 'We replaced 6 different tools with viaSocket. Our workflows are faster, our team is happier, and our operating costs are way down.',
        img: 'https://randomuser.me/api/portraits/men/76.jpg',
        name: 'Rohit Sharma',
        role: 'Founder, TaskHive',
    },
    {
        body: 'Finally, an automation platform that’s simple, flexible, and built for serious growth. viaSocket is a game changer for our business.',
        img: 'https://randomuser.me/api/portraits/women/89.jpg',
        name: 'Neha Verma',
        role: 'COO, Verma & Co.',
    },
];

function Card({ item, hidden }) {
    return (
        <article
            className="flex-[0_0_260px] sm:flex-[0_0_290px] lg:flex-[0_0_320px] bg-white rounded-[20px] border border-black/[0.05] hover:border-[#a8200d]/30 px-[22px] py-[26px] lg:px-[26px] lg:pt-[30px] lg:pb-[26px] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_24px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03),0_0_0_1px_rgba(168,32,13,0.12),0_14px_32px_-10px_rgba(0,0,0,0.11)] hover:-translate-y-[3px] transition-all duration-[280ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] flex flex-col motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            aria-hidden={hidden || undefined}
        >
            <div className="font-serif text-[48px] leading-[0.5] font-bold text-[#fbb5a4] mb-[22px] h-[22px] tracking-[-0.02em]" aria-hidden="true">
                &ldquo;
            </div>
            <p className="text-[14.5px] text-[#1a1a1a] leading-[1.6] tracking-[-0.05px] mb-6 flex-grow">
                {item.body}
            </p>
            <div className="text-[#f5b400] tracking-[2px] text-[15px] mb-[22px] leading-none" aria-label="5 out of 5 stars">
                ★★★★★
            </div>
            <div className="h-px bg-black/[0.08] mb-[22px]"></div>
            <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-[#f3f3f3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.img}
                        alt={hidden ? '' : `${item.name} headshot`}
                        loading="lazy"
                        width="44"
                        height="44"
                        className="w-full h-full object-cover block"
                    />
                </div>
                <div>
                    <p className="text-[14.5px] font-bold text-[#1a1a1a] tracking-[-0.1px] mb-0.5">{item.name}</p>
                    <p className="text-[12.5px] text-[#6b6b6b] leading-[1.4] tracking-[-0.05px] m-0">{item.role}</p>
                </div>
            </div>
        </article>
    );
}

export default function Testimonials() {
    // Repeat 4x for seamless marquee (track translates -25%)
    const sets = [0, 1, 2, 3];

    return (
        <section className="relative bg-[#fffcf4] py-[72px] md:py-[110px] overflow-hidden" id="testimonials">
            <div className="relative z-[1] max-w-[1240px] mx-auto px-8">
                <div className="text-center mb-14 md:mb-[72px]">
                    <span className="inline-block text-[#a8200d] text-[11.5px] font-bold tracking-[0.18em] uppercase mb-6">
                        LOVED BY TEAMS
                    </span>
                    <h2 className="text-[34px] md:text-[44px] lg:text-[60px] font-extrabold leading-[1.06] tracking-[-0.6px] md:tracking-[-1px] lg:tracking-[-1.6px] text-[#1a1a1a] mx-auto max-w-[1100px] m-0">
                        Real teams. Real results.
                        <br />
                        Real <span className="text-[#a8200d]">automation impact.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-6 md:gap-8 lg:gap-12 items-start">
                    <aside className="text-center md:text-left">
                        <div className="font-serif text-[88px] lg:text-[120px] leading-[0.7] text-[#a8200d]/[0.18] font-bold mb-3 tracking-[-0.02em]" aria-hidden="true">
                            &ldquo;
                        </div>
                        <h3 className="text-2xl lg:text-[30px] font-extrabold tracking-[-0.6px] leading-[1.15] text-[#1a1a1a] mb-7 lg:mb-10">
                            What our customers
                            <br />
                            are <span className="text-[#a8200d]">saying</span>
                        </h3>
                    </aside>

                    <div className="relative overflow-hidden">
                        <div className="flex gap-4 w-max pt-1 pb-[18px] testimonials-marquee motion-reduce:animate-none">
                            {sets.map((s) =>
                                TESTIMONIALS.map((t, i) => (
                                    <Card key={`${s}-${i}`} item={t} hidden={s !== 0} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
