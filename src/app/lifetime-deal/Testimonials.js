import Image from 'next/image';

const hasReviewContent = (item) =>
    !!item &&
    (!!item.user_name?.trim() || !!item.subtitle?.trim() || !!item.description?.trim());

const mapReviewToCard = (item) => ({
    body: item.description || '',
    img: item.user_profile?.[0]?.trim() || '',
    name: item.user_name || '',
    role: item.subtitle || '',
});

function Card({ item, hidden }) {
    return (
        <article
            className="flex-[0_0_260px] sm:flex-[0_0_290px] lg:flex-[0_0_320px] bg-white rounded-[16px] border border-black/[0.05] hover:border-[#a8200d]/30 px-[18px] py-[10px] lg:px-[22px] lg:pt-[14px] lg:pb-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_24px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03),0_0_0_1px_rgba(168,32,13,0.12),0_14px_32px_-10px_rgba(0,0,0,0.11)] hover:-translate-y-[3px] transition-all duration-[280ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] flex flex-col motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            aria-hidden={hidden || undefined}
        >
            <div className="font-serif text-2xl leading-[0.5] font-bold text-[#fbb5a4] mb-[6px] h-[12px] tracking-[-0.02em]" aria-hidden="true">
                &ldquo;
            </div>
            <p className="text-xs text-[#1a1a1a] leading-[1.45] line-clamp-6 tracking-[-0.05px] mb-2 flex-grow">
                {item.body}
            </p>
            <div className="text-[#f5b400] tracking-[2px] text-sm mb-[6px] leading-none" aria-label="5 out of 5 stars">
                ★★★★★
            </div>
            <div className="h-px bg-black/[0.08] mb-[6px]"></div>
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#f3f3f3]">
                    {item.img && (
                        <Image
                            src={item.img}
                            alt={hidden ? '' : `${item.name} headshot`}
                            loading="lazy"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover block"
                        />
                    )}
                </div>
                <div>
                    <p className="text-[13px] font-bold text-[#1a1a1a] tracking-[-0.1px] mb-0">{item.name}</p>
                    <p className="text-[11.5px] text-[#6b6b6b] leading-[1.3] tracking-[-0.05px] m-0">{item.role}</p>
                </div>
            </div>
        </article>
    );
}

export default function Testimonials({ reviewData = [] }) {
    const testimonials = (reviewData || []).filter(hasReviewContent).map(mapReviewToCard);

    // Repeat 4x for seamless marquee (track translates -25%)
    const sets = [0, 1, 2, 3];

    if (testimonials.length === 0) return null;

    return (
        <section className="relative bg-[#fffcf4] py-[72px] md:py-[110px] overflow-hidden" id="testimonials">
            <div className="relative z-[1] container mx-auto px-8">
                <div className="text-center mb-14 md:mb-[72px]">
                    <span className="inline-block text-[#a8200d] text-[11.5px] font-bold tracking-[0.18em] uppercase mb-6">
                        LOVED BY TEAMS
                    </span>
                    <h2 className="h2">
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
                        <h3 className="text-2xl lg:text-3xl font-medium tracking-[-0.6px] leading-[1.15] text-[#1a1a1a] mb-7 lg:mb-10">
                            What our customers
                            <br />
                            are <span className="text-[#a8200d]">saying</span>
                        </h3>
                    </aside>

                    <div className="relative overflow-hidden">
                        <div className="flex gap-4 w-max pt-1 pb-[18px] testimonials-marquee motion-reduce:animate-none">
                            {sets.map((s) =>
                                testimonials.map((t, i) => (
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
