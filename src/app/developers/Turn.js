'use client';

import { H2, Scene } from './Heading';
import { useReveal, revealClass } from './useReveal';
import styles from './Turn.module.scss';

const APPS = ['Salesforce', 'Gmail', 'HubSpot', 'Slack', 'Zendesk', 'Stripe', 'Greenhouse', 'Calendar', 'Notion', 'Jira', 'Shopify', 'Asana'];

export default function Turn() {
    const [mapRef, mapVisible] = useReveal(0.2);
    const H = 380;
    const ox = 90;
    const oy = H / 2;
    const hx = 430;
    const hy = H / 2;
    const x = 900;

    return (
        <Scene id="turn">
            <H2>Build your AI. Not the action layer.</H2>
            <div ref={mapRef} className={`bg-dev-surface border border-dev-line rounded-[20px] overflow-hidden shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] ${revealClass(mapVisible)}`}>
                <div className="overflow-x-auto">
                    <svg
                        viewBox={`0 0 1100 ${H}`}
                        className={styles.map}
                        role="img"
                        aria-label="Your AI at the left, the viaSocket action layer in the middle, your users' apps fanning out on the right"
                    >
                        <circle cx={ox} cy={oy} r="9" fill="#0B0D10" />
                        <text className={styles.lbl} x={ox} y={oy - 26} textAnchor="middle">ORIGIN</text>
                        <text className={styles.name} x={ox} y={oy + 34} textAnchor="middle">Your AI</text>

                        <path className={styles.spine} d={`M${ox + 9} ${oy} H ${hx - 52}`} />

                        <circle className={styles.ring} cx={hx} cy={hy} r="52" />
                        <circle className={styles.ring} cx={hx} cy={hy} r="40" style={{ strokeOpacity: 0.5 }} />
                        <circle className={styles.hub} cx={hx} cy={hy} r="12" />
                        <text className={styles.lbl} x={hx} y={hy - 70} textAnchor="middle">ACTION LAYER</text>
                        <text className={styles.name} x={hx} y={hy + 82} textAnchor="middle">viaSocket</text>
                        <text className={styles.verbs} x={hx} y={hy + 102} textAnchor="middle">
                            AUTHENTICATE · DISCOVER · MAP · EXECUTE · VERIFY · MONITOR
                        </text>

                        {APPS.map((app, i) => {
                            const y = 30 + ((H - 60) * i) / (APPS.length - 1);
                            const d = `M${hx + 52} ${hy} C ${hx + 230} ${hy}, ${x - 200} ${y}, ${x - 8} ${y}`;
                            return (
                                <g key={app}>
                                    <path className={styles.route} d={d} style={{ animationDelay: `${i * 0.45}s` }} />
                                    <circle className={styles.dot} cx={x} cy={y} r="5" />
                                    <text className={styles.name} x={x + 14} y={y + 4.5}>{app}</text>
                                </g>
                            );
                        })}
                        <text className={styles.lbl} x={x} y="14" textAnchor="middle">DESTINATIONS · 12 OF 2,300+</text>
                    </svg>
                </div>
            </div>
        </Scene>
    );
}
