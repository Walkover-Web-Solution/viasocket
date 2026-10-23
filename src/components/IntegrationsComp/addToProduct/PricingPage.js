import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { PRICING_COPY as C } from './copy';
import { Faq, Head, PageFrame } from './PricingParts';
import PricingPlans, { PlanFinder } from './PricingPlans';

// /pricing in the homepage design: the plans, a plan finder and the pricing FAQs.

function Calculator() {
    return (
        <section className={`${s.sec} ${p.anchor}`} id="plan-finder" aria-labelledby="h-calc">
            <div className={s.wrap}>
                <Head title={C.calcTitle} lead={C.calcLead} id="h-calc" />
                <PlanFinder />
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
                    <PricingPlans />
                    <div className={p.every}>
                        <p>
                            {C.everyPlan.map((x) =>
                                Array.isArray(x) ? (
                                    <a key={x[0]} href={x[1]}>
                                        {x[0]}
                                    </a>
                                ) : (
                                    x
                                )
                            )}
                        </p>
                        <p>{C.taskNote}</p>
                    </div>
                </div>
            </section>

            <Calculator />
            <Faq eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />
        </PageFrame>
    );
}
