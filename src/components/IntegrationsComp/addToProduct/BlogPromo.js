'use client';

import { useEffect, useState } from 'react';
import s from './addToProduct.module.scss';
import b from './blogs.module.scss';
import { BLOGS_COPY as C, START_URL } from './copy';

// A "Start free" card that slides in on the right, centred in the screen (at the bottom on phones),
// once the reader is about a third of the way down /blogs or a post. It doesn't block the page. Closing it (× or Esc) keeps it
// closed for the rest of the visit; that's remembered in sessionStorage when the browser allows it.

const DISMISS_KEY = 'vs-blog-promo-dismissed';
const SHOW_AT = 0.3; // share of the page scrolled

function wasDismissed() {
    try {
        return sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
        return false;
    }
}

export default function BlogPromo() {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState(true); // until we've checked storage, on the client

    useEffect(() => {
        if (wasDismissed()) return undefined;
        setDismissed(false);
        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable > 0 && window.scrollY / scrollable >= SHOW_AT) {
                setOpen(true);
                window.removeEventListener('scroll', onScroll);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const close = () => {
        setOpen(false);
        setDismissed(true);
        try {
            sessionStorage.setItem(DISMISS_KEY, '1');
        } catch {
            // Storage blocked: it just stays closed until the page is reloaded.
        }
    };

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && close();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    if (dismissed) return null;
    return (
        <aside className={`${b.promo} ${open ? b['promo-open'] : ''}`} aria-labelledby="promo-title" aria-hidden={!open}>
            <button type="button" className={b['promo-x']} onClick={close} aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                </svg>
            </button>
            <p className={b['promo-h']} id="promo-title">
                {C.promoTitle}
            </p>
            <a className={`${s.btn} ${b['promo-cta']}`} href={START_URL}>
                {C.promoCta} <span aria-hidden="true">→</span>
            </a>
        </aside>
    );
}
