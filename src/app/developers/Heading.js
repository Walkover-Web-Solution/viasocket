'use client';

import { useReveal, revealClass } from './useReveal';

export function Label({ children }) {
    const [ref, visible] = useReveal();
    return (
        <span ref={ref} className={`block font-dev-mono text-[11.5px] tracking-[0.14em] uppercase text-dev-ink-3 -mb-2 ${revealClass(visible)}`}>
            {children}
        </span>
    );
}

export function H2({ children, className = '', style }) {
    const [ref, visible] = useReveal();
    return (
        <h2 ref={ref} style={style} className={`font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(32px,4.8vw,64px)] ${revealClass(visible)} ${className}`}>
            {children}
        </h2>
    );
}

export function Lead({ children, className = '' }) {
    const [ref, visible] = useReveal();
    return (
        <p ref={ref} className={`text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 max-w-[46ch] ${revealClass(visible)} ${className}`}>
            {children}
        </p>
    );
}

export function Scene({ id, children, className = '' }) {
    return (
        <section id={id} className={`max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(56px,8vw,112px)] grid gap-[clamp(20px,3vw,36px)] ${className}`}>
            {children}
        </section>
    );
}
