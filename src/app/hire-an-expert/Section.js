export default function Section({ eyebrow, title, subtitle, align = 'center', children }) {
    return (
        <section className="container py-24">
            <div className={`mb-14 ${align === 'center' ? 'text-center' : ''}`}>
                {eyebrow && (
                    <span className="inline-block text-accent text-xs font-semibold uppercase tracking-wider mb-3.5">
                        {eyebrow}
                    </span>
                )}
                <h2 className="text-4xl font-bold mb-3">{title}</h2>
                {subtitle && <p className="text-[17px] text-[#555] leading-[1.5]">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}
