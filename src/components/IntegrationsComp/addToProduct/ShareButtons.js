'use client';

import { useEffect, useRef, useState } from 'react';
import b from './blogs.module.scss';

// Share a post: plain share links (no third-party scripts) and a copy-link button.

const ICONS = {
    x: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={b.fill}>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    facebook: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    ),
    link: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    ),
};

export default function ShareButtons({ url, title, label = 'Share' }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef();
    useEffect(() => () => clearTimeout(timer.current), []);

    const u = encodeURIComponent(url);
    const links = [
        ['x', 'Share on X', `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}`],
        ['linkedin', 'Share on LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
        ['facebook', 'Share on Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            window.prompt('Copy this link:', url);
            return;
        }
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={b.share} role="group" aria-label={label}>
            <span className={b['share-k']}>{label}</span>
            {links.map(([icon, name, href]) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                    {ICONS[icon]}
                </a>
            ))}
            <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} title="Copy link" className={copied ? b.done : undefined}>
                {copied ? ICONS.check : ICONS.link}
            </button>
            <span className={b['share-toast']} aria-live="polite">
                {copied ? 'Link copied' : ''}
            </span>
        </div>
    );
}
