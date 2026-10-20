'use client';

import { useEffect, useState } from 'react';
import s from './addToProduct.module.scss';

// The AI Agents card: the user types a request, the agent calls HubSpot then Slack (each lights up
// on the bus to its app below), then replies. Loops. Every element is always laid out and only
// fades in, so the card never changes height. Reduced motion shows the finished chat, still.

const ICON = {
    gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    hubspot: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
};
const APPS = ['gmail', 'hubspot', 'slack', 'shopify'];
const ASK = "Find this week's new leads and post the top 5 to #sales.";
const STEPS = [
    ['hubspot', 'Searching HubSpot…', 'Searched HubSpot · 48 leads'],
    ['slack', 'Posting to Slack…', 'Posted to Slack · #sales'],
];
// Phases: 0 typing · 1 sent · 2 HubSpot running · 3 Slack running · 4 replied
const DONE = 4;

function AppIcon({ app, size }) {
    return <img className={s.appicon} src={ICON[app]} alt="" width={size} height={size} style={{ width: size, height: size }} loading="lazy" />;
}

export default function AgentDemo() {
    const [phase, setPhase] = useState(0);
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setPhase(DONE);
            return;
        }
        let alive = true;
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        (async () => {
            while (alive) {
                setPhase(0);
                setTyped(0);
                await wait(700);
                for (let i = 1; i <= ASK.length && alive; i++) {
                    setTyped(i);
                    await wait(32);
                }
                await wait(350); if (!alive) return;
                setPhase(1);
                await wait(700); if (!alive) return;
                setPhase(2);
                await wait(1400); if (!alive) return;
                setPhase(3);
                await wait(1400); if (!alive) return;
                setPhase(DONE);
                await wait(4200);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const active = phase === 2 ? 'hubspot' : phase === 3 ? 'slack' : null;
    const on = (cond) => (cond ? s['is-on'] : '');

    return (
        <div className={s['fxv-agent']} role="img" aria-label="Animation: a user asks the sales agent to post this week's top leads to Slack; the agent searches HubSpot, posts to Slack and replies.">
            <div className={s['auth-panel']}>
                <div className={s['auth-head']}>
                    <span>Sales agent</span>
                    <span className={s.gtag}>
                        <span className={s.dot} />
                        Online
                    </span>
                </div>
                <div className={s['fxv-chat']}>
                    <p className={`${s['fxv-me']} ${on(phase >= 1)}`}>{ASK}</p>
                    <div className={`${s['fxv-bot']} ${on(phase >= 2)}`}>
                        {STEPS.map(([app, running, done], i) => {
                            const at = 2 + i;
                            return (
                                <span key={app} className={`${s['fxv-used']} ${on(phase >= at)}`}>
                                    <AppIcon app={app} size={16} />
                                    {phase > at ? done : running}
                                    {phase > at && <span className={s['fxv-tick']}>✓</span>}
                                </span>
                            );
                        })}
                        <p className={on(phase >= DONE)}>Done. I scored 48 new leads and posted the top 5 to #sales.</p>
                    </div>
                </div>
                <div className={s['fxv-input']}>
                    <span className={phase === 0 && typed ? s['fxv-typing'] : undefined}>{phase === 0 && typed ? ASK.slice(0, typed) : 'Ask the agent…'}</span>
                    <i className={phase === 0 && typed === ASK.length ? s['is-on'] : undefined} />
                </div>
            </div>
            <div className={`${s['fxv-bus']} ${active ? s['is-live'] : ''}`}>
                {APPS.map((a) => (
                    <span key={a} className={on(active === a)}>
                        <AppIcon app={a} size={30} />
                    </span>
                ))}
                <span>
                    <b>2,300+</b>
                </span>
            </div>
        </div>
    );
}
