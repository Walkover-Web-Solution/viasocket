import s from './addToProduct.module.scss';
import { APP_ICONS } from './copy';
import { FeatureIcon } from './icons';

// /features: every feature as a tile: icon and title (a hint on a few), the description, and a small
// example on a few. Tiles with a feature page are links and show "→"; the rest become links once their
// page exists (add `href` and `cta` to the feature in copy.js).

const APP_NAMES = { gmail: 'Gmail', slack: 'Slack', hubspot: 'HubSpot', salesforce: 'Salesforce', sheets: 'Google Sheets', notion: 'Notion', shopify: 'Shopify', airtable: 'Airtable' };

/** The small example on the few cards that have one. */
function FeatureExample({ ex }) {
    switch (ex.kind) {
        case 'apps':
            return (
                <div className={s['fe-apps']}>
                    {ex.apps.map((k) => (
                        <img key={k} className={s.appicon} src={APP_ICONS[k]} alt={APP_NAMES[k] || k} title={APP_NAMES[k] || k} width={28} height={28} loading="lazy" />
                    ))}
                    {ex.more && <span className={s['fe-more']}>{ex.more}</span>}
                </div>
            );
        case 'code':
            return (
                <code className={s['fe-code']}>
                    <b>{ex.method}</b> {ex.text}
                </code>
            );
        case 'map':
            return (
                <div className={s['fe-map']}>
                    <code>{ex.from}</code>
                    <span aria-hidden="true">→</span>
                    <code>{ex.to}</code>
                </div>
            );
        case 'chat':
            return (
                <div className={s['fe-chat']}>
                    <span className={s['fe-me']}>{ex.me}</span>
                    <span className={s['fe-bot']}>{ex.bot}</span>
                </div>
            );
        case 'status':
            // A strip of recent runs: filled succeeded, hollow failed
            return (
                <div className={s['fe-status']}>
                    {[...ex.runs].map((r, i) => (
                        <i key={i} className={r === 'x' ? s['fe-x'] : undefined} />
                    ))}
                </div>
            );
        default:
            return null;
    }
}

/** One feature tile; a link with "→" when the feature has a page. */
function FeatureCard({ feature }) {
    const [title, desc, icon, { href, cta, ex, hint, ai } = {}] = feature;
    const Tag = href ? 'a' : 'div';
    return (
        <li>
            <Tag className={`${s['fx-card']} ${href ? s['fx-linked'] : ''} ${ai ? s['fx-ai'] : ''}`} {...(href && { href })}>
                <h3 className={s['fx-h']}>
                    <span className={`${s['feat-ico']} ${hint === 'check' ? s['fe-check'] : ''}`}>
                        <FeatureIcon name={icon} />
                    </span>
                    <span className={s['fx-t']}>{title}</span>
                    {hint === 'live' && <span className={s['fe-live']} aria-hidden="true" />}
                </h3>
                <div className={s['fx-pre']}>
                    <p>{desc}</p>
                    {ex && (
                        <div className={s.fe} aria-hidden={ex.kind === 'apps' ? undefined : 'true'}>
                            <FeatureExample ex={ex} />
                        </div>
                    )}
                </div>
                {href && (
                    <span className={s['fx-go']}>
                        {cta} <span aria-hidden="true">→</span>
                    </span>
                )}
            </Tag>
        </li>
    );
}

export default function FeatureGrid({ features }) {
    return (
        <ul className={`${s.fx} ${s['fx-flat']}`}>
            {features.map((f) => (
                <FeatureCard key={f[0]} feature={f} />
            ))}
        </ul>
    );
}
