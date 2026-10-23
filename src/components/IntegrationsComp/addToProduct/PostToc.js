'use client';

import { useEffect, useState } from 'react';
import b from './blogs.module.scss';

// The post's sections as quicklinks. "side": the sticky sidebar beside the article on wide screens,
// with the section being read highlighted. "inline": a collapsed toggle above the article on
// screens too narrow for the sidebar.

function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const headings = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!headings.length) return undefined;
        // The current section is the last heading that has scrolled past the top third of the screen.
        const update = () => {
            const line = window.innerHeight / 3;
            let current = headings[0].id;
            for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id;
            setActive(current);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [ids]);
    return active;
}

function Links({ toc, active }) {
    return (
        <ol>
            {toc.map(({ id, text }) => (
                <li key={id}>
                    <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                        {text}
                    </a>
                </li>
            ))}
        </ol>
    );
}

export default function PostToc({ toc, title, variant }) {
    const [ids] = useState(() => toc.map((t) => t.id));
    const active = useActiveSection(variant === 'side' ? ids : []);

    if (variant === 'inline') {
        return (
            <details className={b['toc-m']}>
                <summary>{title}</summary>
                <Links toc={toc} />
            </details>
        );
    }
    return (
        <nav className={b.toc} aria-label={title}>
            <p className={b['toc-h']}>{title}</p>
            <Links toc={toc} active={active} />
        </nav>
    );
}
