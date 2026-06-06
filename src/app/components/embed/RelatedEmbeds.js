import Link from 'next/link';

const ArrowIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 10L10 4M5 4h5v5" />
    </svg>
);

const ALL_ITEMS = [
    {
        slug: 'action-for-ai',
        href: '/embed/action-for-ai',
        title: 'Action for AI',
        description: 'Turn your product into an AI-ready platform.',
        tint: 'purple',
    },
    {
        slug: 'action-via-webhook',
        href: '/embed/action-via-webhook',
        title: 'Actions via Webhook',
        description: 'Need server-to-server automation?',
        tint: 'blue',
    },
    {
        slug: 'app-integrations',
        href: '/embed/app-integrations',
        title: 'App Integration',
        description: 'Want to make your SaaS AI-ready?',
        tint: 'teal',
    },
];

const TINTS = {
    blue: {
        background: 'linear-gradient(135deg, #0c1d3d 0%, #0a1632 60%, #08122a 100%)',
        glow: 'rgba(59, 130, 246, 0.3)',
    },
    teal: {
        background: 'linear-gradient(135deg, #0a2418 0%, #08291d 60%, #072719 100%)',
        glow: 'rgba(34, 197, 94, 0.24)',
    },
    purple: {
        background: 'linear-gradient(135deg, #1e1038 0%, #1a0d2e 60%, #160927 100%)',
        glow: 'rgba(168, 85, 247, 0.3)',
    },
};

export default function RelatedEmbeds({
    heading = 'Building something different?',
    subheading = 'Pick the right tool for the job.',
    currentPage,
}) {
    const items = ALL_ITEMS.filter((item) => item.slug !== currentPage);
    return (
        <section className="w-full container bg-white p-6">
            <div className="max-w-[1180px] mx-auto p-6">
                <div className="mb-10 text-center">
                    <h3 className="text-[26px] md:text-[34px] font-extrabold text-[#0a0a0a] tracking-[-0.7px] mb-2 leading-[1.2]">
                        {heading}
                    </h3>
                    <p className="text-[15px] text-gray-500 font-normal">{subheading}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {items.map((item) => {
                        const tint = TINTS[item.tint] || TINTS.blue;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative overflow-hidden no-underline text-white rounded-lg min-h-[150px] md:min-h-[180px] px-[30px] md:px-[42px] py-7 md:py-[38px] flex flex-col justify-between gap-[18px] transition-[transform,filter,box-shadow] duration-[250ms] ease hover:-translate-y-[3px] hover:brightness-[1.15] hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                                style={{ background: tint.background }}
                            >
                                <span
                                    className="absolute w-[520px] h-[520px] rounded-full -bottom-[280px] -right-[180px] pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${tint.glow} 0%, transparent 60%)`,
                                    }}
                                />
                                <span className="absolute top-[30px] right-[30px] md:top-[38px] md:right-[38px] w-[42px] h-[42px] rounded-full border-[1.5px] border-white/55 bg-transparent flex items-center justify-center text-white/90 transition-all duration-200 z-[2] group-hover:bg-white group-hover:text-[#0a0a0a] group-hover:border-white group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                                    <ArrowIcon />
                                </span>
                                <h4 className="relative z-[1] m-0 text-2xl md:text-[30px] font-semibold text-white leading-[1.2] tracking-[-0.6px] pr-[54px] md:pr-16">
                                    {item.title}
                                </h4>
                                <p className="relative z-[1] m-0 text-[15px] text-white/70 leading-[1.5] font-normal">
                                    {item.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
