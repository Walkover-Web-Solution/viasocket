import s from './addToProduct.module.scss';
import { FeatureIcon } from './icons';
import { featurePage } from './featurePages';

// /features (and "Related features" on a feature page): every feature as a same-size tile with just its
// icon and title. A tile is a link ending in "→" when its feature has a page (its `slug` in featurePages.js)
// or an `href` (`cta` becomes the link's tooltip).

/** One feature tile; a link with "→" when the feature has a page. */
function FeatureCard({ feature }) {
    const [title, , icon, { slug, cta, ai, ...o } = {}] = feature;
    const href = featurePage(slug) ? `/features/${slug}` : o.href;
    const Tag = href ? 'a' : 'div';
    return (
        <li>
            <Tag className={`${s['fx-card']} ${href ? s['fx-linked'] : ''} ${ai ? s['fx-ai'] : ''}`} {...(href && { href, title: cta })}>
                <span className={s['feat-ico']}>
                    <FeatureIcon name={icon} gradient={ai} />
                </span>
                <h3 className={s['fx-t']}>{title}</h3>
                {href && (
                    <span className={s['fx-go']} aria-hidden="true">
                        →
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
