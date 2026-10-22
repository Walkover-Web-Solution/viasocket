'use client';

import { useState } from 'react';
import s from './addToProduct.module.scss';

// /integrations/{app}: the use cases written for the app in the admin panel, one at a time. The
// active tab's bar fills and the next one shows; hovering or focusing pauses it. Every title and
// description is in the server HTML (the inactive ones hidden), so all of it is crawlable.

const cx = (...names) => names.filter(Boolean).map((n) => s[n]).join(' ');

export default function UseCaseTabs({ items, app }) {
    const [active, setActive] = useState(0);
    const [out, setOut] = useState(false);

    const show = (i) => {
        const next = (i + items.length) % items.length;
        if (next === active) return;
        setOut(true);
        setTimeout(() => {
            setActive(next);
            setOut(false);
        }, 200);
    };

    const onKeyDown = (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        const next = (active + step + items.length) % items.length;
        show(next);
        document.getElementById(`ucx-tab-${next}`)?.focus();
    };

    return (
        <div className={s.ucx}>
            <div className={s['ucx-tabs']} role="tablist" aria-label={`${app.name} use cases`} onKeyDown={onKeyDown}>
                {items.map(([title], i) => (
                    <button
                        key={title}
                        id={`ucx-tab-${i}`}
                        type="button"
                        role="tab"
                        className={s['ucx-tab']}
                        aria-selected={i === active}
                        aria-controls="ucx-panel"
                        tabIndex={i === active ? 0 : -1}
                        onClick={() => show(i)}
                    >
                        <span className={s['ucx-t']}>{title}</span>
                        {/* Re-keyed per change so its fill starts over */}
                        <span
                            key={i === active ? `on-${active}` : 'off'}
                            className={s['ucx-bar']}
                            onAnimationEnd={i === active && items.length > 1 ? () => show(active + 1) : undefined}
                        />
                    </button>
                ))}
            </div>
            <div className={cx('ucx-panel', out && 'is-out')} id="ucx-panel" role="tabpanel" aria-labelledby={`ucx-tab-${active}`} aria-live="polite">
                {items.map(([title, description], i) => (
                    <div key={title} className={s['ucx-swap']} hidden={i !== active}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                ))}
                <div className={s['ucx-flow']} aria-label={`Your product connects to ${app.name} through viaSocket`}>
                    <span className={s['ucx-node']}>
                        <span className={s['ucx-tile']}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="4" y="4" width="16" height="16" />
                                <path d="M4 9h16" />
                            </svg>
                        </span>
                        <span>Your product</span>
                    </span>
                    <span className={s['ucx-wire']} aria-hidden="true">
                        <i />
                    </span>
                    <span className={s['ucx-node']}>
                        <span className={s['ucx-tile']}>
                            <img className={s['ucx-vs-light']} src="/new-home/assets/favicon-black.png" alt="" width={18} height={18} />
                            <img className={s['ucx-vs-dark']} src="/new-home/assets/favicon-white.png" alt="" width={18} height={18} />
                        </span>
                        <span>viaSocket</span>
                    </span>
                    <span className={s['ucx-wire']} aria-hidden="true">
                        <i />
                    </span>
                    <span className={s['ucx-node']}>
                        {app.iconUrl && <img className={s.appicon} src={app.iconUrl} alt="" width={26} height={26} style={{ width: 26, height: 26 }} />}
                        <span>{app.name}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
