import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './ops.css';

// The private website-ops area. Every page under here is a server component (no 'use client'),
// so internal content never lands in a public JS chunk; the middleware gates access and sends
// private/no-store/noindex/CSP headers. Contract and blockers: docs/ops/README.md.
export const metadata = {
    title: { default: 'Website ops', template: '%s · Website ops' },
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function InternalLayout({ children }) {
    return <div className={`ops ${GeistSans.variable} ${GeistMono.variable}`}>{children}</div>;
}
