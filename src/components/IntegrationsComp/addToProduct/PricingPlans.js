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
                <h3>{plan.name}</h3>
                {plan.badge && <span className={p.badge}>{plan.badge}</span>}
            </div>
            <p className={p.tagline}>{plan.tagline}</p>
            <div className={p['price-box']}>
                {plan.launch && <span className={p.launchTag}>{C.launchLabel}</span>}
                <p className={p.price}>
                    <b>{yearly ? plan.y : plan.m}</b>
                    {plan.per && <small>{plan.per[i]}</small>}
                </p>
                {plan.note && <p className={p.desc}>{plan.note}</p>}
            </div>
            <ul className={p.perks}>
                {plan.perks.map((x) =>
                    typeof x === 'string' ? (
                        <li key={x}>{x}</li>
                    ) : (
                        <li key={x.text} className={x.limit ? p.limit : undefined}>
                            {x.text}
                        </li>
                    )
                )}
            </ul>
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
            </div>
            <ul className={p.plans}>
                {C.plans.map((plan) => (
                    <Plan key={plan.name} plan={plan} yearly={yearly} />
                ))}
            </ul>
        </>
    );
}

/** For now: the Free plan beside a "Contact us" card, without the billing switch. */
export function FreeAndContact() {
    return (
        <ul className={`${p.plans} ${p['plans-2']}`}>
            {[C.plans[0], C.contactPlan].map((plan) => (
                <Plan key={plan.name} plan={plan} yearly={false} />
            ))}
        </ul>
    );
}

// The plan finder: the cheapest plan whose included tasks and AI credits (each plan's `limits` in copy.js,
// the same numbers as its card) cover the usage on the sliders. Past the largest, Enterprise.
const fmtCount = (n) => (n >= 1e6 ? `${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })}M` : n >= 1e3 ? `${(n / 1e3).toLocaleString('en-US', { maximumFractionDigits: 1 })}K` : String(n));

function bestPlan(tasks, credits) {
    const fits = C.plans.find((pl) => pl.limits && tasks <= pl.limits.tasks && credits <= pl.limits.credits);
    return fits || C.plans.find((pl) => !pl.limits);
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

export function PlanFinder() {
    const { tasks, credits, tasksStart, creditsStart } = C.calcSteps;
    const [ti, setTi] = useState(tasksStart);
    const [ci, setCi] = useState(creditsStart);
    const plan = bestPlan(tasks[ti], credits[ci]);
    const l = plan.limits;
    return (
        <div className={p.calc}>
            <div className={p['calc-in']}>
                <Slider id="calc-tasks" label={C.calcTasks} steps={tasks} value={ti} onChange={setTi} />
                <Slider id="calc-credits" label={C.calcCredits} steps={credits} value={ci} onChange={setCi} />
            </div>
            <dl className={p['calc-out']} aria-live="polite">
                <div className={p['calc-save']}>
                    <dt>{C.calcPlan}</dt>
                    <dd>{plan.name}</dd>
                </div>
                <div>
                    <dt>{C.calcPrice}</dt>
                    <dd>{l ? `$${l.price}` : C.calcCustom}</dd>
                </div>
                <div>
                    <dt>{C.calcTasksIncl}</dt>
                    <dd>{l ? fmtCount(l.tasks) : C.calcCustom}</dd>
                </div>
                <div>
                    <dt>{C.calcCreditsIncl}</dt>
                    <dd>{l ? l.credits.toLocaleString('en-US') : C.calcCustom}</dd>
                </div>
            </dl>
        </div>
    );
}
