'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import CopyPromptButton from './CopyPromptButton';
import { BrandIcon, brandColor, AGENT_NAMES, APP_NAMES } from './BrandIcon';
import styles from './Hero.module.scss';

const FL_LIST = ['2,300+ pre-built actions', 'Authentication and credential management', 'Permissions, monitoring and security'];

export default function Hero() {
    const [litApp, setLitApp] = useState(0);
    const [onItem, setOnItem] = useState(0);
    const [litAgent, setLitAgent] = useState(0);
    const lastApp = useRef(-1);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        let k = 0;
        const id = setInterval(() => {
            let i;
            do {
                i = Math.floor(Math.random() * APP_NAMES.length);
            } while (i === lastApp.current);
            lastApp.current = i;
            setLitApp(i);
            setOnItem(k % FL_LIST.length);
            k += 1;
        }, 1600);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        let k = 0;
        const id = setInterval(() => {
            k += 1;
            setLitAgent(k % AGENT_NAMES.length);
        }, 1400);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="pt-[clamp(32px,5vw,64px)] pb-[clamp(64px,8vw,120px)] px-[clamp(20px,5vw,64px)] grid gap-[clamp(40px,5vw,64px)]">
            <div className="grid gap-[clamp(40px,5vw,64px)] justify-items-center">
                <div className="grid gap-[22px] text-center justify-items-center max-w-[760px]">
                    <span className={`inline-flex items-center gap-[8px] text-dev-accent bg-dev-accent-soft border border-dev-accent/25 rounded-full px-[14px] py-[7px] font-medium ${styles.beat}`}>
                        <i className="w-[6px] h-[6px] rounded-full bg-dev-accent inline-block" />
                        The action layer for AI products
                    </span>
                    <h1 className="font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(38px,5.6vw,72px)]">
                        Give your AI the ability to act.
                    </h1>
                    <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 max-w-[46ch]">
                        Connect your AI to the apps your users already use and let it take real actions across 2,300+ apps.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap mt-2">
                        <CopyPromptButton />
                        <Button href="/developers/docs" quiet>Read docs</Button>
                        <span className="text-[14px] text-dev-ink-3">Live in under 15 minutes</span>
                    </div>
                    <div className="grid gap-[14px] mt-5" aria-label="Works with every agent">
                        <span className="font-dev-mono text-[11.5px] tracking-[0.14em] uppercase text-dev-ink-3">Works with every agent</span>
                        <div className="flex flex-wrap items-center justify-center gap-[22px]">
                            {AGENT_NAMES.map((name, i) => (
                                <span
                                    key={name}
                                    title={name}
                                    style={{ '--d': `${(-(i * 0.53) % 4.6).toFixed(2)}s` }}
                                    className={`grid place-items-center w-[22px] h-[22px] transition-colors duration-300 ${styles.agentIcon} ${
                                        litAgent === i ? '-translate-y-[2px] text-dev-ink' : 'text-dev-ink-3'
                                    }`}
                                >
                                    <BrandIcon name={name} size={22} />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.flow} aria-label="Your AI product connects through viaSocket to the apps your users use">
                    <div className="grid justify-items-center gap-[14px] text-center">
                        <div className={`w-24 h-24 rounded-full grid place-items-center relative ${styles.orb}`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-11 h-11 fill-none stroke-dev-accent stroke-[1.4] [stroke-linejoin:round]">
                                <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
                                <path d="M12 2.5v9M4 7l8 4.5L20 7M12 11.5l-8 5.5M12 11.5l8 5.5M12 11.5v10" />
                            </svg>
                        </div>
                        <b className="text-[14.5px] font-semibold leading-tight">
                            Your
                            <br />
                            AI product
                        </b>
                    </div>

                    <div className={styles.flLink}>
                        <i />
                        <i />
                    </div>

                    <div className={`relative bg-dev-surface border border-dev-line rounded-[20px] shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] px-[30px] py-[28px] grid gap-[6px] min-w-[280px] max-w-[360px] ${styles.flCard}`}>
                        <div className="flex items-center gap-[10px] font-bold text-2xl tracking-[-0.02em]">
                            <i className={`w-3 h-3 rounded-full bg-dev-accent inline-block ${styles.beat}`} />
                            viaSocket
                        </div>
                        <span className="text-[15px] text-dev-ink-2 ml-[22px]">Action layer</span>
                        <ul className="list-none m-0 p-0 grid mt-[14px]">
                            {FL_LIST.map((item, i) => (
                                <li
                                    key={item}
                                    className={`relative text-[15px] py-[11px] border-t border-dev-line before:content-[''] before:absolute before:-left-[14px] before:top-1/2 before:w-[5px] before:h-[5px] before:-mt-[2.5px] before:rounded-full before:bg-dev-accent before:transition-opacity before:duration-300 ${
                                        onItem === i ? 'text-dev-ink before:opacity-100' : 'text-dev-ink-2 before:opacity-0'
                                    }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.flLink}>
                        <i />
                        <i />
                    </div>

                    <div className="grid grid-cols-5 gap-3 [grid-template-columns:repeat(5,52px)] max-[360px]:grid-cols-4">
                        {APP_NAMES.map((name, i) => {
                            const lit = litApp === i;
                            return (
                                <span
                                    key={name}
                                    title={name}
                                    style={{ '--d': `${(-(i * 0.37) % 4.2).toFixed(2)}s`, '--c': brandColor(name) }}
                                    className={`w-[52px] h-[52px] rounded-xl bg-dev-ink grid place-items-center relative transition-all duration-[450ms] ${styles.appTile} ${lit ? styles.lit : ''}`}
                                >
                                    <BrandIcon name={name} size={24} forceColor={lit ? '#fff' : '#F7F7F8'} />
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
