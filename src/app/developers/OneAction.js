'use client';

import { useReveal, revealClass } from './useReveal';
import { H2, Scene } from './Heading';
import styles from './OneAction.module.scss';

const STEPS = [
    'Authenticate the user',
    'Find the right account',
    'Give the AI the right permission',
    'Find the right action',
    'Map the data',
    'Execute',
    'Handle failure',
    'Verify the result',
    'Monitor what happened',
];

export default function OneAction() {
    const [pathwayRef, pathwayVisible] = useReveal(0.4);
    const [quoteRef, quoteVisible] = useReveal();
    const [afterRef, afterVisible] = useReveal();

    const x0 = 190;
    const x1 = 930;

    return (
        <Scene id="problem">
            <H2>The action is simple. The infrastructure isn&apos;t.</H2>
            <p ref={quoteRef} className={`font-semibold tracking-[-0.03em] leading-[1.15] max-w-[22ch] text-[clamp(24px,3vw,40px)] ${revealClass(quoteVisible)}`}>
                &quot;Update this customer&apos;s Salesforce record.&quot;
            </p>
            <div
                ref={pathwayRef}
                className={`${styles.pathway} bg-dev-surface border border-dev-line rounded-[20px] shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] py-[clamp(18px,3vw,36px)] px-[clamp(12px,2vw,24px)] ${revealClass(pathwayVisible)}`}
            >
                <svg
                    viewBox="0 0 1100 220"
                    role="img"
                    aria-label="One pathway from your AI to Salesforce with nine steps along it: authenticate the user, find the right account, give the AI the right permission, find the right action, map the data, execute, handle failure, verify the result, monitor what happened"
                >
                    <text className={styles.endLbl} x="18" y="115">Your AI</text>
                    <circle className={styles.end} cx="110" cy="110" r="7" />
                    <path className={styles.line} d="M117 110 H 1002" />
                    <circle className={styles.end} cx="1009" cy="110" r="7" />
                    <text className={styles.endLbl} x="1024" y="115">Salesforce</text>
                    {STEPS.map((name, i) => {
                        const x = x0 + ((x1 - x0) * i) / (STEPS.length - 1);
                        const up = i % 2 === 0;
                        return (
                            <g key={name} className={pathwayVisible ? styles.on : ''}>
                                <line className={styles.line} x1={x} y1="110" x2={x} y2={up ? 84 : 136} />
                                <circle className={styles.node} cx={x} cy="110" r="7" />
                                <text className={styles.num} x={x} y={up ? 52 : 176} textAnchor="middle">{`0${i + 1}`}</text>
                                <text className={styles.name} x={x} y={up ? 72 : 158} textAnchor="middle">{name}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
            <p ref={afterRef} className={`font-semibold tracking-[-0.03em] text-[clamp(22px,2.6vw,34px)] ${revealClass(afterVisible)}`}>
                And that&apos;s just one app.
            </p>
        </Scene>
    );
}
