'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { BrandIcon, AGENT_NAMES } from '../BrandIcon';
import CopyPromptButton from '../CopyPromptButton';
import styles from './AuthHero.module.scss';

const SCOPES = ['Read & write leads', 'Read opportunities & pipelines', 'Manage contacts'];

export default function AuthHero() {
    const [popupState, setPopupState] = useState('idle'); // idle | pressing | connected
    const [litAgent, setLitAgent] = useState(0);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        let timeouts = [];
        function cycle() {
            setPopupState('pressing');
            timeouts.push(setTimeout(() => setPopupState('connected'), 350));
            timeouts.push(setTimeout(() => setPopupState('idle'), 3400));
        }
        timeouts.push(setTimeout(cycle, 2200));
        const id = setInterval(cycle, 6500);
        return () => {
            clearInterval(id);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        const id = setInterval(() => setLitAgent((i) => (i + 1) % AGENT_NAMES.length), 1400);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,6vw,72px)] grid gap-[clamp(20px,3vw,36px)] justify-items-center text-center">
            <span className={`inline-flex items-center gap-2 text-dev-accent bg-dev-accent-soft border border-dev-accent/25 rounded-full px-3.5 py-1.5 font-medium ${styles.beat}`}>
                <i className="w-1.5 h-1.5 rounded-full bg-dev-accent inline-block" />
                Managed auth
            </span>
            <h1 className="font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(38px,5.6vw,72px)] mx-auto max-w-[20ch]">
                Let your users connect their apps. We handle the authentication.
            </h1>
            <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 mx-auto max-w-[56ch]">
                Your users can connect{' '}
                <BrandIcon name="Gmail" size={18} className="inline-block align-[-3px] mx-1" />
                Gmail,{' '}
                <BrandIcon name="Salesforce" size={18} className="inline-block align-[-3px] mx-1" />
                Salesforce,{' '}
                <BrandIcon name="HubSpot" size={18} className="inline-block align-[-3px] mx-1" />
                HubSpot,{' '}
                <BrandIcon name="Slack" size={18} className="inline-block align-[-3px] mx-1" />
                Slack, and 2,300+ apps without you building and maintaining authentication infrastructure.
            </p>
            <p className="text-[14px] text-dev-ink-3">OAuth · tokens · refresh · reauthorization · connection management — handled by viaSocket.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <CopyPromptButton />
                <Link href="#handled" className="inline-flex items-center gap-[10px] bg-transparent text-dev-ink border border-dev-line-2 no-underline rounded-full font-semibold text-[15.5px] px-[22px] py-[14px] transition-transform hover:-translate-y-px">
                    See how it works
                </Link>
            </div>
            <div className="grid gap-3.5 justify-items-center mt-1.5">
                <span className="font-dev-mono text-[11.5px] tracking-[0.14em] uppercase text-dev-ink-3">Works with every agent</span>
                <div className="flex flex-wrap items-center justify-center gap-[22px]">
                    {AGENT_NAMES.map((name, i) => (
                        <span key={name} title={name} className={`grid place-items-center w-[22px] h-[22px] transition-colors ${litAgent === i ? '-translate-y-0.5 text-dev-ink' : 'text-dev-ink-3'}`}>
                            <BrandIcon name={name} size={22} />
                        </span>
                    ))}
                </div>
            </div>
            <div className="w-full grid justify-items-center mt-[clamp(24px,4vw,48px)]">
                <div className={`relative w-full max-w-[380px] rounded-[14px] border border-dev-line bg-dev-surface shadow-[0_30px_60px_-30px_rgba(11,13,16,.35),0_2px_6px_rgba(11,13,16,.06)] overflow-hidden ${styles.popup} ${popupState === 'connected' ? styles.ok : ''}`}>
                    <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-dev-line text-[13px] text-dev-ink-2 bg-dev-surface-2">
                        <span className="flex gap-[5px]">
                            <i className="w-2 h-2 rounded-full bg-[#FF5F57] inline-block" />
                            <i className="w-2 h-2 rounded-full bg-[#FEBC2E] inline-block" />
                            <i className="w-2 h-2 rounded-full bg-[#28C840] inline-block" />
                        </span>
                        <span>Sign in with Salesforce</span>
                    </div>
                    <div className="p-[22px_22px_20px] grid gap-3.5 justify-items-center text-center">
                        <div className="flex items-center gap-2 font-bold text-[18px] tracking-[-0.02em]">
                            <BrandIcon name="Salesforce" size={26} />
                            Salesforce
                        </div>
                        <p className="text-[14px] text-dev-ink-2 m-0">Acme wants to access your Salesforce account</p>
                        <ul className="list-none m-0 p-3 w-full border border-dev-line rounded-[10px] grid gap-2.5 text-left text-[13.5px]">
                            {SCOPES.map((s) => (
                                <li key={s} className="flex items-center gap-2.5">
                                    <Check size={15} className="text-dev-accent shrink-0" strokeWidth={2.2} />
                                    {s}
                                </li>
                            ))}
                        </ul>
                        <div className="grid grid-cols-2 gap-2.5 w-full">
                            <span className="p-2.5 rounded-lg text-center font-semibold text-[13.5px] border border-dev-line-2">Cancel</span>
                            <span className={`p-2.5 rounded-lg text-center font-semibold text-[13.5px] border border-transparent bg-[#00A1E0] text-white transition-transform ${styles.allow} ${popupState === 'pressing' ? styles.press : ''}`}>
                                Allow
                            </span>
                        </div>
                    </div>
                    <div className={`absolute inset-0 bg-dev-surface flex items-center justify-center gap-2.5 font-semibold text-[15px] ${styles.done}`}>
                        <i className="w-2.5 h-2.5 rounded-full bg-dev-ok shadow-[0_0_0_4px_var(--tw-shadow-color)] shadow-dev-ok-soft inline-block" />
                        Connected · Salesforce
                    </div>
                </div>
            </div>
        </section>
    );
}
