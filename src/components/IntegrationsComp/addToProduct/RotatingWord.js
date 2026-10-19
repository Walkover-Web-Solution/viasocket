'use client';

import { useEffect, useState } from 'react';
import s from './addToProduct.module.scss';

// The H1's last words rotate like the homepage hero ("AI agent." → "CRM." …): the word slides up
// and out, the next slides in from below, the underline fades back in. The first word is what
// the server renders, so search engines and reduced-motion visitors read "Product".
export default function RotatingWord({ words }) {
    const [i, setI] = useState(0);
    const [phase, setPhase] = useState(''); // '' | 'out' | 'in'

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) return;
        let swap, settle;
        const id = setInterval(() => {
            setPhase('out');
            swap = setTimeout(() => {
                setI((n) => (n + 1) % words.length);
                setPhase('in');
                settle = setTimeout(() => setPhase(''), 30);
            }, 150);
        }, 2600);
        return () => {
            clearInterval(id);
            clearTimeout(swap);
            clearTimeout(settle);
        };
    }, [words.length]);

    return <em className={[s.rotw, phase && s[phase]].filter(Boolean).join(' ')}>{words[i]}</em>;
}
