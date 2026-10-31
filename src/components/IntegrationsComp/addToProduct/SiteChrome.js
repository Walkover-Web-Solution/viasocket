import Link from 'next/link';
import s from './addToProduct.module.scss';
import { FOOTER_GROUPS, NAV, START_URL } from './copy';
import { Logo, SOCIAL } from './icons';
import { CopyPromptButton } from './CopyPrompt';
import AnnouncementBar from '@/app/components/navbar/AnnouncementBar';
import { getAnnouncements } from '@/app/lib/admin-announcements';

// The homepage's header and footer, shared by the integration pages that use its design
// (/integrations, /integrations/category/*, /integrations/{app}). Render inside CopyPromptProvider.

export async function SiteHeader() {
    // The announcement bar managed in the admin panel (Pages → Announcements); nothing when none
    // fits the page or the admin can't be reached.
    const announcements = await getAnnouncements();
    return (
        <>
            {announcements && <AnnouncementBar announcements={announcements} className={s.ann} />}
            <header className={s.top}>
                <div className={s.wrap}>
                    <Link className={s.logo} href="/" aria-label="viaSocket home">
                        <Logo height={22} />
                    </Link>
                    <nav className={s['top-nav']} aria-label="Main">
                        {NAV.map(([label, href]) => (
                            <a key={label} href={href} {...(href.startsWith('https://cal.id') && { target: '_blank', rel: 'noopener' })}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <a className={s.start} href={START_URL}>
                        Start free <span aria-hidden="true">→</span>
                    </a>
                </div>
            </header>
        </>
    );
}

export function SiteFooter() {
    return (
        <footer className={s.ft} aria-label="viaSocket">
            <div className={`${s.wrap} ${s['ft-in']}`}>
                <div className={s['ft-top']}>
                    <div className={s['ft-brand']}>
                        <Link className={s.logo} href="/" aria-label="viaSocket home">
                            <Logo height={49} />
                        </Link>
                        <p className={s['ft-tag']}>Integration Layer for your products &amp; agents.</p>
                        <p className={s['ft-sub']}>You build the app or agent. viaSocket handles the connections and actions.</p>
                        <CopyPromptButton />
                    </div>
                    <nav className={s['ft-links']} aria-label="Footer">
                        {FOOTER_GROUPS.map(([heading, links]) => (
                            <div key={heading}>
                                <p className={s['ft-gh']}>{heading}</p>
                                <ul>
                                    {links.map(([label, href]) => (
                                        <li key={label}>
                                            <a href={href}>{label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
                <div className={s['ft-bar']}>
                    <div className={s['ft-legal']}>
                        <p>
                            © {new Date().getFullYear()} viaSocket<i aria-hidden="true">·</i>
                            <a href="/privacy">Privacy</a>
                            <i aria-hidden="true">·</i>
                            <a href="/terms">Terms</a>
                            <i aria-hidden="true">·</i>
                            <a href="/data-retention-deletion">Data retention &amp; deletion</a>
                        </p>
                        <p>Walkover Web Solutions Pvt Ltd. All rights reserved.</p>
                    </div>
                    <div className={s['ft-trust']}>
                        <div className={s['ft-badges']}>
                            <a href="https://www.capterra.com/p/10020406/viaSocket/" target="_blank" rel="noopener noreferrer" aria-label="viaSocket on Capterra">
                                <img src="/new-home/assets/badge-capterra.svg" alt="" width={44} height={34} loading="lazy" />
                            </a>
                            <a href="https://www.g2.com/products/viasocket/reviews" target="_blank" rel="noopener noreferrer" aria-label="viaSocket reviews on G2">
                                <img src="/new-home/assets/badge-g2.svg" alt="" width={50} height={60} loading="lazy" />
                            </a>
                        </div>
                        <div className={s['ft-social']}>
                            {SOCIAL.map((x) => (
                                <a key={x.href} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.label} className={x.fill ? s.fill : undefined}>
                                    {x.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={s['ft-mark']} aria-hidden="true">
                viaSocket
            </div>
        </footer>
    );
}

/**
 * "Learn more": a row of blog posts. By default the Action Layer posts, as on the app pages; pass `Card`
 * (BlogsPage.js PostCard) to show /blogs posts as they look on /blogs. Renders nothing when there are none.
 */
export function BlogPosts({ title, lead, posts, viewAllUrl, Card }) {
    if (!posts?.length) return null;
    const fmtDate = (d) => {
        const t = Date.parse(d);
        return Number.isNaN(t) ? '' : new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    };
    return (
        <section className={s.sec}>
            <div className={s.wrap}>
                <div className={s['sh-row']}>
                    <div className={s.sh}>
                        <h2 className={s.h2}>{title}</h2>
                        {lead && <p className={s.lead}>{lead}</p>}
                    </div>
                    <a className={s['btn-o']} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }} href={viewAllUrl}>
                        View all articles
                    </a>
                </div>
                <div className={s.posts}>
                    {Card && posts.map((p) => <Card key={p.slug} post={p} />)}
                    {!Card && posts.map((b) => (
                        <a key={b.link} className={s.post} href={b.link}>
                            {b.image && <img className={s['post-img']} src={b.image} alt="" loading="lazy" />}
                            <span className={s['post-body']}>
                                <span className={s['post-meta']}>{fmtDate(b.date)}</span>
                                <h3>{b.title}</h3>
                                <span className={s.go}>Read article →</span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** FAQs: the sticky heading on the left, the questions on the right. */
export function FaqSection({ eyebrow, title, lead, faqs }) {
    return (
        <section className={s.sec} id="faq">
            <div className={`${s.wrap} ${s['faq-grid']}`}>
                <div className={s.sh}>
                    <span className={s.eyebrow}>{eyebrow}</span>
                    <h2 className={s.h2}>{title}</h2>
                    {lead && <p className={s.lead}>{lead}</p>}
                </div>
                <div className={s.faq}>
                    {faqs.map(([q, a], i) => (
                        <details key={q} open={i === 0}>
                            <summary>{q}</summary>
                            <p>{a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
