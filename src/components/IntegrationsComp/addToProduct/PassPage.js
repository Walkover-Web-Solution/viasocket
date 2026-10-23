import s from './addToProduct.module.scss';
import p from './pricing.module.scss';
import { PASS_COPY as C, START_URL } from './copy';
import { FeatureIcon } from './icons';
import { Faq, Head, PageFrame } from './PricingParts';

// /pass: the viaSocket Pass in the homepage design: what it is (beside an example balance), its rates
// (#rates) and tools, one Pass against separate subscriptions, how you stay in control, and its FAQs.

function Wallet() {
    const card = C.passCard;
    return (
        <figure className={p.wallet}>
            <div className={p['wallet-h']}>
                <b>{card.title}</b>
                <span className={p.live}>{card.status}</span>
            </div>
            <div className={p['wallet-bal']}>
                <span className={s.eyebrow}>{card.label}</span>
                <b>{card.balance}</b>
                <small>{card.sub}</small>
            </div>
            <ul>
                {card.rows.map(([k, v]) => (
                    <li key={k}>
                        <span>{k}</span>
                        <span>{v}</span>
                    </li>
                ))}
            </ul>
            <figcaption>{card.note}</figcaption>
        </figure>
    );
}

function Rates() {
    return (
        <section className={`${s.sec} ${p.anchor}`} id="rates" aria-labelledby="h-rates">
            <div className={s.wrap}>
                <Head title={C.ratesTitle} id="h-rates" />
                <div className={p.table}>
                    <table>
                        <thead>
                            <tr>
                                {C.ratesCols.map((c, i) => (
                                    <th key={c} scope="col" className={i === 3 ? p.hi : undefined}>
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {C.ratesRows.map(([label, ...cells]) => (
                                <tr key={label}>
                                    <th scope="row">{label}</th>
                                    {cells.map((v, j) => (
                                        <td key={j} className={j === 2 ? p.hi : j === 3 ? p.alt : undefined}>
                                            {v}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className={p.fine}>{C.ratesNote}</p>

                <div className={p.sub}>
                    <h3>{C.toolsTitle}</h3>
                    <p>{C.toolsLead}</p>
                </div>
                <div className={p.table}>
                    <table>
                        <thead>
                            <tr>
                                {C.toolsCols.map((c, i) => (
                                    <th key={c} scope="col" className={i === 4 ? p.hi : undefined}>
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {C.toolsGroups.map(([group, rows]) => (
                            <tbody key={group}>
                                <tr className={p.group}>
                                    <th scope="colgroup" colSpan={C.toolsCols.length}>
                                        {group}
                                    </th>
                                </tr>
                                {rows.map(([tool, per, ...cells]) => (
                                    <tr key={tool}>
                                        <th scope="row">{tool}</th>
                                        <td>{per}</td>
                                        {cells.map((v, j) => (
                                            <td key={j} className={`${j === 2 ? p.hi : ''} ${v === 'To be set' ? p.tbd : ''}`}>
                                                {v}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        ))}
                    </table>
                </div>
                <p className={p.fine}>{C.toolsNote}</p>
            </div>
        </section>
    );
}

function VersusCol({ col, pass }) {
    return (
        <div className={`${p['vs-col']} ${pass ? p['vs-pass'] : ''}`}>
            <p className={s.eyebrow}>{col.title}</p>
            <ul>
                {col.rows.map(([k, v]) => (
                    <li key={k}>
                        <span>{k}</span>
                        <span>{v}</span>
                    </li>
                ))}
            </ul>
            <p className={p['vs-total']}>
                <span>{col.total[0]}</span>
                <b>{col.total[1]}</b>
            </p>
        </div>
    );
}

/** Separate subscriptions against paying per call from the Pass. */
function Versus() {
    return (
        <section className={s.sec} aria-labelledby="h-vs">
            <div className={s.wrap}>
                <Head title={C.vsTitle} lead={C.vsLead} id="h-vs" />
                <div className={p.vs}>
                    <VersusCol col={C.vsSubs} />
                    <span className={p['vs-mid']} aria-hidden="true">
                        vs
                    </span>
                    <VersusCol col={C.vsPass} pass />
                </div>
                <p className={p.fine}>{C.vsNote}</p>
            </div>
        </section>
    );
}

function Control() {
    return (
        <section className={s.sec} aria-labelledby="h-control">
            <div className={s.wrap}>
                <Head title={C.controlTitle} id="h-control" />
                <div className={s.feats}>
                    {C.control.map(([title, text, icon]) => (
                        <div key={title} className={s.feat}>
                            <span className={s['feat-ico']}>
                                <FeatureIcon name={icon} />
                            </span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
                <div className={p.notes}>
                    {C.controlNotes.map(([title, lead, points]) => (
                        <div key={title}>
                            <p className={s.eyebrow}>{title}</p>
                            <h3>{lead}</h3>
                            <ul>
                                {points.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function PassPage() {
    return (
        <PageFrame>
            <section className={`${s.hero} ${p.hero} ${p['pass-hero']}`}>
                <div className={`${s['hero-grid']} ${p['hero-grid']}`} aria-hidden="true" />
                <div className={`${s.wrap} ${p['pass-in']}`}>
                    <div>
                        <span className={s.eyebrow}>{C.passEyebrow}</span>
                        <h1>{C.passTitle}</h1>
                        <p className={s['hero-sub']}>{C.passLead}</p>
                        <div className={s['hero-cta']}>
                            <a className={s.btn} href={START_URL}>
                                {C.passCta} <span aria-hidden="true">→</span>
                            </a>
                            <a className={s.ulink} href={C.pricingLink[1]}>
                                {C.pricingLink[0]}
                            </a>
                        </div>
                        <p className={p['pass-note']}>{C.passNote}</p>
                    </div>
                    <Wallet />
                </div>
            </section>

            <Rates />
            <Versus />
            <Control />
            <Faq eyebrow={C.faqEyebrow} title={C.faqTitle} faqs={C.faqs} />
        </PageFrame>
    );
}
