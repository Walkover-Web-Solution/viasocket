import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { PRICING_COPY as C } from './copy';
import { Faq, Head, PageFrame } from './PricingParts';
import PricingPlans, { FreeAndContact, PlanFinder } from './PricingPlans';

// /pricing in the homepage design. For now the Free plan and a "Contact us" card, what every plan gets, links
// to /features and /use-cases, and FAQs on the Free plan and viaSocket; the paid plans and the plan finder (PricingPlans, Calculator) are kept for
// when they come back.

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
                    <p className={s['hero-sub']}>{C.contactSub}</p>
                    <FreeAndContact />
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

            <section className={s.sec} aria-labelledby="h-explore">
                <div className={s.wrap}>
                    <Head title={C.exploreTitle} id="h-explore" />
                    <ul className={p.explore}>
                        {C.explore.map(([title, text, href, cta]) => (
                            <li key={href}>
                                <a href={href}>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                    <span className={p['explore-go']}>
                                        {cta} <span aria-hidden="true">→</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Faq eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.contactFaqs} />
        </PageFrame>
    );
}
