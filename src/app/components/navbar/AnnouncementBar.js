'use client';

import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Rules (the admin checks them too, viasocket-admin lib/announcements.js): "*" is every page, "/path"
// only that page, "/path/*" /path and everything under it; "exclude" wins over "pages"; the most
// specific match wins (exact, then the longest /path/*, then "*"), then the newest (the list comes
// newest first).
function score(pattern, path) {
    if (pattern === '*') return 0;
    if (pattern.endsWith('/*')) {
        const base = pattern.slice(0, -2) || '/';
        return path === base || path.startsWith(base === '/' ? '/' : `${base}/`) ? base.length + 1 : -1;
    }
    return path === pattern ? 100000 : -1;
}

export function pickAnnouncement(list, rawPath) {
    const path = rawPath && rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : '/';
    let best = null;
    let bestScore = -1;
    for (const a of list) {
        if (a.exclude.some((p) => score(p, path) >= 0)) continue;
        const s = Math.max(-1, ...a.pages.map((p) => score(p, path)));
        if (s > bestScore) {
            best = a;
            bestScore = s;
        }
    }
    return best;
}

// The classic navbar's 30px strip, shown on wide screens only; the homepage-design header passes its own class.
const CLASSIC =
    'hidden lg:flex w-full min-w-0 h-[30px] items-center justify-center gap-2 px-4 bg-accent text-sm text-white backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]';

export default function AnnouncementBar({ announcements, className = CLASSIC }) {
    const announcement = pickAnnouncement(announcements || [], usePathname());
    if (!announcement) return null;

    const content = (
        <>
            <span className="truncate">{announcement.text}</span>
            {announcement.link && <MoveRight className="shrink-0" />}
        </>
    );
    return (
        <div className={className}>
            {announcement.link ? (
                <Link
                    href={announcement.link}
                    target={announcement.newTab ? '_blank' : undefined}
                    rel={announcement.newTab ? 'noopener' : undefined}
                    className="flex min-w-0 items-center gap-2 tracking-[0.06em]"
                >
                    {content}
                </Link>
            ) : (
                <span className="flex min-w-0 items-center gap-2 tracking-[0.06em]">{content}</span>
            )}
        </div>
    );
}
