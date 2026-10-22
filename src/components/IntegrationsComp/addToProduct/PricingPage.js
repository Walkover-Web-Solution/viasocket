import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { PRICING_COPY as C } from './copy';
import { Faq, Head, PageFrame } from './PricingParts';
import PricingPlans, { SavingsCalculator } from './PricingPlans';

// /pricing in the homepage design: the plans, a savings calculator and the pricing FAQs.
// The viaSocket Pass (its rates, tools and how it works) has its own page, /pass.

function Calculator() {
    return (
        <section className={s.sec} aria-labelledby="h-calc">
            <div className={s.wrap}>
                <Head title={C.calcTitle} lead={C.calcLead} id="h-calc" />
                <SavingsCalculator />
                <p className={p.fine}>{C.calcNote}</p>
            </div>
        </section>
    );
}

export default function PricingPage() {
    return (
        <PageFrame>
            <section className={`${s.hero} ${p.hero}`}>
                <div className={`${s['hero-grid']} ${p['hero-grid']}`} aria-hidden="true" />
                <div className={`${s.wrap} ${p['hero-in']}`}>
                    <h1>{C.h1}</h1>
                    <p className={s['hero-sub']}>{C.sub}</p>
                    <p className={p.launch}>
                        <span aria-hidden="true">▲</span>
                        {C.launch}
                    </p>
                    <PricingPlans />
                    <div className={p.every}>
                        <p>
                            <b>{C.everyPlanLabel}</b>
                            {C.everyPlan.map((x) => (
                                <span key={x}>{x}</span>
                            ))}
                        </p>
                        <p className={p['pass-link']}>
                            {C.passLinkLead}
                            <a href="/pass">{C.passLink}</a>
                        </p>
                    </div>
                </div>
            </section>

            <Calculator />
            <Faq eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />
        </PageFrame>
    );
}
