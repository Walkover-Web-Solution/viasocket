'use client';

import { useState } from 'react';
import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { PRICING_COPY as C } from './copy';

const external = (href) => (href.startsWith('http') && !href.includes('viasocket.com') ? { target: '_blank', rel: 'noopener' } : {});

/** Monthly / annual switch, as a square segmented control. */
function BillingSwitch({ yearly, onChange }) {
    return (
        <div className={p.switch} role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => onChange(false)}>
                Monthly
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => onChange(true)}>
                Annual <span className={p.save}>{C.yearlyNote}</span>
            </button>
        </div>
    );
}

function Plan({ plan, yearly }) {
    const i = yearly ? 1 : 0;
    return (
        <li className={plan.popular ? p.pop : undefined}>
            <div className={p['plan-h']}>
                <span className={s.eyebrow}>{plan.name}</span>
                {plan.tag && <span className={p.tag}>{plan.tag}</span>}
                {plan.badge && <span className={p.badge}>{plan.badge}</span>}
            </div>
            <p className={p.price}>
                <b>{yearly ? plan.y : plan.m}</b>
                {plan.per && <small>{plan.per[i]}</small>}
            </p>
            <p className={p.desc}>{plan.note ? plan.note[i] : plan.desc}</p>
            <ul className={p.perks}>
                {plan.perks.map((x) => (
                    <li key={x}>{x}</li>
                ))}
            </ul>
            {plan.foot && <p className={p.foot}>{plan.foot}</p>}
            <a className={p['rate-link']} href="/pass#rates">
                {C.rateCard}
            </a>
            <a className={plan.popular ? s.btn : `${s['btn-o']} ${p['btn-o']}`} href={plan.href} {...external(plan.href)}>
                {plan.cta} <span aria-hidden="true">→</span>
            </a>
        </li>
    );
}

export default function PricingPlans() {
    const [yearly, setYearly] = useState(false);
    return (
        <>
            <div className={p.billing}>
                <BillingSwitch yearly={yearly} onChange={setYearly} />
                <span className={p.currency}>{C.currency}</span>
            </div>
            <ul className={p.plans}>
                {C.plans.map((plan) => (
                    <Plan key={plan.name} plan={plan} yearly={yearly} />
                ))}
            </ul>
        </>
    );
}

// The savings calculator. The free amounts (100K calls, 50K trigger events) cost nothing; above them the
// cheaper of Pro and Business wins (each at least its monthly price). Typical alternatives charge
// $0.0003 a call and $0.003 a trigger event, at least $29 a month once anything is used.
const fmtCount = (n) => (n >= 1e6 ? `${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n));
const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

function estimate(calls, triggers) {
    const overCalls = Math.max(0, calls - 100e3);
    const overTriggers = Math.max(0, triggers - 50e3);
    let plan = 'Free';
    let us = 0;
    if (overCalls > 0 || overTriggers > 0) {
        const pro = Math.max(19, overCalls * 0.00015 + overTriggers * 0.0015);
        const business = Math.max(99, overCalls * 0.0001 + overTriggers * 0.001);
        [plan, us] = pro <= business ? ['Pro', pro] : ['Business', business];
    }
    const altUsage = overCalls * 0.0003 + overTriggers * 0.003;
    const alt = altUsage > 0 ? Math.max(29, altUsage) : 0;
    return { plan, us, alt, save: Math.max(0, (alt - us) * 12) };
}

function Slider({ label, steps, value, onChange, id }) {
    const pct = (value / (steps.length - 1)) * 100;
    return (
        <div className={p.slider}>
            <div className={p['slider-h']}>
                <label htmlFor={id}>{label}</label>
                <output htmlFor={id}>{fmtCount(steps[value])}</output>
            </div>
            <input
                id={id}
                type="range"
                min={0}
                max={steps.length - 1}
                step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-valuetext={fmtCount(steps[value])}
                className={p.range}
                style={{ '--pct': `${pct}%` }}
            />
        </div>
    );
}

export function SavingsCalculator() {
    const { calls, triggers, callsStart, triggersStart } = C.calcSteps;
    const [ci, setCi] = useState(callsStart);
    const [ti, setTi] = useState(triggersStart);
    const r = estimate(calls[ci], triggers[ti]);
    return (
        <div className={p.calc}>
            <div className={p['calc-in']}>
                <Slider id="calc-calls" label={C.calcCalls} steps={calls} value={ci} onChange={setCi} />
                <Slider id="calc-triggers" label={C.calcTriggers} steps={triggers} value={ti} onChange={setTi} />
            </div>
            <dl className={p['calc-out']} aria-live="polite">
                <div>
                    <dt>{C.calcPlan}</dt>
                    <dd>{r.plan}</dd>
                </div>
                <div>
                    <dt>{C.calcUs}</dt>
                    <dd>{usd(r.us)}</dd>
                </div>
                <div>
                    <dt>{C.calcAlt}</dt>
                    <dd>{usd(r.alt)}</dd>
                </div>
                <div className={p['calc-save']}>
                    <dt>{C.calcSave}</dt>
                    <dd>{usd(r.save)}</dd>
                </div>
            </dl>
        </div>
    );
}
