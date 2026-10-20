'use client';

import { useEffect, useState } from 'react';
import s from './addToProduct.module.scss';

// Small looping animations for the Build with AI cards on /features. Each steps through a few
// phases on a timer; every part is always laid out and only fades in, so cards keep their height.
// Visitors who prefer reduced motion see the last phase, still.

const HUBSPOT = 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg';

/** Runs `steps` (ms per phase) in a loop; returns the current phase. `last` is the still frame. */
function usePhases(steps, last = steps.length - 1) {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setPhase(last);
            return;
        }
        let i = 0;
        let id;
        const next = () => {
            id = setTimeout(() => {
                i = (i + 1) % steps.length;
                setPhase(i);
                next();
            }, steps[i]);
        };
        next();
        return () => clearTimeout(id);
    }, []);
    return phase;
}

const on = (cond) => (cond ? s['is-on'] : '');

// In-app chatbot: a question, a moment of thinking, then the answer with the record it read.
// Phases: 0 empty · 1 asked · 2 thinking · 3 answered
export function ChatbotDemo() {
    const phase = usePhases([700, 900, 1300, 4200]);
    return (
        <div className={`${s['auth-panel']} ${s['ad-chat']}`}>
            <div className={s['auth-head']}>
                <span>Assistant</span>
                <span>In your CRM</span>
            </div>
            <div className={s['ad-body']}>
                <p className={`${s['ad-me']} ${on(phase >= 1)}`}>What&apos;s the status of the Acme deal?</p>
                <div className={s['ad-reply']}>
                    <span className={`${s['ad-dots']} ${on(phase === 2)}`} aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                    <div className={`${s['ad-ans']} ${on(phase >= 3)}`}>
                        <p>Acme Inc. is in Negotiation, $24,000, closing Nov 12.</p>
                        <span className={s['ad-src']}>
                            <img className={s.appicon} src={HUBSPOT} alt="" width={14} height={14} /> Read from HubSpot
                        </span>
                    </div>
                </div>
            </div>
            <div className={s['fxv-input']}>
                <span>Ask about your deals…</span>
                <i />
            </div>
        </div>
    );
}

// Browser actions: a job board with no API. The agent checks each listing in turn (outlined, with
// the element it is reading), and what it reads lands in the list below.
// Phases: 0–2 reading listing n · 3 done
const JOBS = [
    ['Frontend Engineer', 'Acme · Remote'],
    ['Product Designer', 'Globex · Berlin'],
    ['Data Analyst', 'Initech · New York'],
];

export function BrowserDemo() {
    const phase = usePhases([1100, 1100, 1100, 3200]);
    const read = (i) => phase > i || phase === JOBS.length;
    return (
        <div className={`${s.win} ${s['ad-web']}`}>
            <div className={s['win-bar']}>
                <span className={s['win-dot']} />
                <span className={s['win-dot']} />
                <span className={s['win-dot']} />
                <span className={s['win-url']}>careers.example.com/jobs</span>
            </div>
            <div className={s['ad-site']}>
                <span className={s['ad-site-h']} />
                {JOBS.map(([title, meta], i) => (
                    <div key={title} className={`${s['ad-job']} ${phase === i ? s['is-scan'] : ''} ${read(i) ? s['is-read'] : ''}`}>
                        <span className={s['ad-tag']}>div.job-card</span>
                        <span className={s['ad-job-t']}>
                            <b>{title}</b>
                            <small>{meta}</small>
                        </span>
                        <span className={s['ad-apply']}>Apply</span>
                    </div>
                ))}
            </div>
            <div className={s['ad-out']}>
                <span className={s['ad-out-h']}>
                    {phase === JOBS.length ? `✓ ${JOBS.length} openings found` : 'Reading page…'}
                </span>
                {JOBS.map(([title, meta], i) => (
                    <span key={title} className={`${s['ad-out-l']} ${on(read(i))}`}>
                        {title} · {meta.split(' · ')[0]}
                    </span>
                ))}
            </div>
        </div>
    );
}
