import Link from 'next/link';

const BASE =
    'inline-flex items-center gap-[10px] no-underline rounded-full font-semibold cursor-pointer border-0 transition-transform hover:-translate-y-px';

export default function Button({ href, quiet = false, sm = false, className = '', children, ...rest }) {
    const variant = quiet ? 'bg-transparent text-dev-ink border border-dev-line-2' : 'bg-dev-ink text-dev-ink-inv';
    const size = sm ? 'px-[16px] py-[9px] text-[14px]' : 'px-[22px] py-[14px] text-[15.5px]';
    return (
        <Link href={href} className={`${BASE} ${variant} ${size} ${className}`} {...rest}>
            {children}
        </Link>
    );
}
