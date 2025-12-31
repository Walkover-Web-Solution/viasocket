import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

const arrowIcon = (
    <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
        <g className="arrow-head">
            <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="arrow-body">
            <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>
);

//Link button
export function LinkButton({ href, content, customClasses }) {
    return (
        <>
            <Link href={href || '/'} className={`link-btn ${customClasses || ''}`}>
                {content}
                {arrowIcon}
            </Link>
        </>
    );
}

//Button content with icon
export function BtnContWithIcon({ title }) {
    return (
        <>
            <span className="flex items-center gap-0 hover:gap-3 transition-all  ease-in-out w-fit">
                {title} <MdChevronRight fontSize={22} />{' '}
            </span>
        </>
    );
}

export function LinkText({ children, customClasses, ...props }) {
    return (
        <span className={`link-btn ${customClasses || ''}`} {...props}>
            {children}
            {arrowIcon}
        </span>
    );
}

export function BtnWithHideIco({ children, customClasses }) {
    return (
        <>
            <span className={`link-btn hide-ico ${customClasses || ''}`}>
                {children}
                {arrowIcon}
            </span>
        </>
    );
}
