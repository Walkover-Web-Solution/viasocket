'use client';

import { useEffect, useRef, useState } from 'react';
import s from './addToProduct.module.scss';

// The hero visual: in "your product", a cursor clicks Connect {app}, the app's consent popup opens,
// the cursor clicks Allow, and the account shows as connected with a few log lines. Loops.
// Visitors who prefer reduced motion see the connected state, still.
const cx = (...names) => names.filter(Boolean).map((n) => s[n]).join(' ');

function AppIcon({ src, size }) {
    if (!src) return null;
    return <img className={s.appicon} src={src} alt="" width={size} height={size} style={{ width: size, height: size }} />;
}

export default function OAuthDemo({ app }) {
    const stageRef = useRef(null);
    const cursorRef = useRef(null);
    const connRef = useRef(null);
    const allowRef = useRef(null);
    const [state, setState] = useState([]); // modifiers: is-press, is-pop, is-press-allow, is-wait, is-on
    const [cursor, setCursor] = useState({ x: '105%', y: '105%', tap: 0 });

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setState(['is-on']);
            return;
        }
        let alive = true;
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const moveTo = (el) => {
            const a = stage.getBoundingClientRect();
            const b = el.getBoundingClientRect();
            setCursor((c) => ({ ...c, x: `${b.left - a.left + b.width * 0.55}px`, y: `${b.top - a.top + b.height * 0.45}px` }));
        };
        const park = () => setCursor((c) => ({ ...c, x: `${stage.clientWidth * 0.86}px`, y: `${stage.clientHeight * 0.92}px` }));
        const tap = () => setCursor((c) => ({ ...c, tap: c.tap + 1 }));

        (async () => {
            while (alive) {
                setState([]);
                park();
                await wait(900); if (!alive) return;
                moveTo(connRef.current);
                await wait(1000); if (!alive) return;
                tap(); setState(['is-press']);
                await wait(250); if (!alive) return;
                setState(['is-pop']);
                await wait(1100); if (!alive) return;
                moveTo(allowRef.current);
                await wait(1100); if (!alive) return;
                tap(); setState(['is-pop', 'is-press-allow']);
                await wait(300); if (!alive) return;
                setState(['is-wait']);
                park();
                await wait(1100); if (!alive) return;
                setState(['is-on']);
                await wait(3800);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    // Restart the tap animation on each click by remounting its class.
    const [tapping, setTapping] = useState(false);
    useEffect(() => {
        if (!cursor.tap) return;
        setTapping(false);
        const id = requestAnimationFrame(() => setTapping(true));
        return () => cancelAnimationFrame(id);
    }, [cursor.tap]);

    const { name, slug, domain, iconUrl, actions, triggers } = app;
    const firstAction = actions[0]?.name || 'Run action';
    const firstTrigger = triggers[0]?.name || 'New event';
    const fnName = firstAction.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const perms = [...actions.slice(0, 2).map((a) => a.name), ...(triggers[0] ? [`Get notified: ${triggers[0].name}`] : [])];

    return (
        <div
            ref={stageRef}
            className={cx('stage', ...state)}
            role="img"
            aria-label={`Animation: a customer clicks Connect ${name} in your product, allows access in the ${name} sign-in window, and the account shows as connected.`}
        >
            <div className={s.win}>
                <div className={s['win-bar']}>
                    <span className={s['win-dot']} />
                    <span className={s['win-dot']} />
                    <span className={s['win-dot']} />
                    <span className={s['win-url']}>app.yourproduct.com/settings/integrations</span>
                </div>
                <div className={s['win-body']}>
                    <div className={s['win-h']}>
                        <strong>Integrations</strong>
                        <span>Acme Corp workspace</span>
                    </div>
                    <div className={cx('conn', 'is-focus')}>
                        <AppIcon src={iconUrl} size={36} />
                        <div className={s['conn-text']}>
                            <b>{name}</b>
                            <small className={s['st-off']}>Not connected</small>
                            <small className={s['st-on']}>Connected by maya@acme.co</small>
                        </div>
                        <span className={s['conn-act']}>
                            <span ref={connRef} className={cx('btn', 'sm', 'st-off', 'connBtn')}>
                                Connect
                            </span>
                            <span className={cx('spin', 'st-wait')} aria-hidden="true" />
                            <span className={cx('gtag', 'st-on')}>
                                <span className={s.dot} />
                                Connected
                            </span>
                        </span>
                    </div>
                    <div className={s.log}>
                        <div className={s['log-idle']}>Waiting for a connection…</div>
                        <div className={cx('log-l', 'l1')}>
                            <span className={s.ok}>auth</span> {slug} · token stored for maya@acme.co
                        </div>
                        <div className={cx('log-l', 'l2')}>
                            <span className={s.ok}>200</span> {slug}.{fnName} · 312ms
                        </div>
                        <div className={cx('log-l', 'l3')}>
                            <span className={s.ok}>evt</span> {firstTrigger} → webhook delivered
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.pop} aria-hidden="true">
                <div className={s['win-bar']}>
                    <span className={s['win-dot']} />
                    <span className={s['win-dot']} />
                    <span className={s['win-dot']} />
                    <span className={s['win-url']}>
                        <span className={s.lock} />
                        {domain || `${slug}.com`}/oauth/authorize?client_id=vs_8f2c…
                    </span>
                </div>
                <div className={s['pop-body']}>
                    <div className={s['pop-marks']}>
                        <span className={s.appmark} style={{ width: 36, height: 36, background: '#5b5a56', fontSize: 14 }}>
                            YP
                        </span>
                        <span className={s['pop-link']}>
                            <i />
                            <i />
                            <i />
                        </span>
                        <AppIcon src={iconUrl} size={36} />
                    </div>
                    <p className={s['pop-title']}>
                        <b>Your Product</b> wants to access your <b>{name}</b> account
                    </p>
                    <p className={s['pop-who']}>Signed in as maya@acme.co</p>
                    {perms.length > 0 && (
                        <ul className={s['pop-perms']}>
                            {perms.map((p) => (
                                <li key={p}>{p}</li>
                            ))}
                        </ul>
                    )}
                    <div className={s['pop-btns']}>
                        <span className={s['btn-o']}>Cancel</span>
                        <span ref={allowRef} className={cx('btn', 'sm', 'allowBtn')}>
                            Allow
                        </span>
                    </div>
                </div>
            </div>

            <svg
                ref={cursorRef}
                className={cx('cursor', tapping && 'tap')}
                style={{ '--cx': cursor.x, '--cy': cursor.y }}
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M5 3l14 8-6.2 1.6L10 19z" />
            </svg>
        </div>
    );
}
