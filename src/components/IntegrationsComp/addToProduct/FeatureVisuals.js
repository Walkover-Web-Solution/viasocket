import s from './addToProduct.module.scss';
import OAuthDemo from './OAuthDemo';
import AgentDemo from './AgentDemo';

// Small illustrations for the large cards on /features. Decorative: each is aria-hidden.

const ICON = {
    gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    hubspot: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    shopify: 'https://stuff.thingsofbrand.com/shopify.com/images/img6fb21a1332_shopify.jpg',
};

function AppIcon({ app, size = 26 }) {
    return <img className={s.appicon} src={ICON[app]} alt="" width={size} height={size} style={{ width: size, height: size }} loading="lazy" />;
}

// The /integrations/{app} hero animation (Connect → consent popup → Allow → connected), with Gmail.
const GMAIL = {
    name: 'Gmail',
    slug: 'gmail',
    domain: 'accounts.google.com',
    iconUrl: ICON.gmail,
    actions: [{ name: 'Send Email' }, { name: 'Create Draft' }],
    triggers: [{ name: 'New Email' }],
};

function AuthVisual() {
    return <OAuthDemo app={GMAIL} />;
}

function TenantVisual() {
    const rows = [
        ['Acme Inc.', 'acme-prod', ['gmail', 'slack', 'hubspot']],
        ['Globex', 'globex-eu', ['shopify', 'slack']],
        ['Initech', 'initech-us', ['gmail', 'hubspot', 'shopify', 'slack']],
    ];
    return (
        <div className={s['auth-panel']}>
            <div className={s['auth-head']}>
                <span>Customers</span>
                <span>Connections</span>
            </div>
            {rows.map(([name, id, apps]) => (
                <div key={name} className={s['auth-row']}>
                    <span className={s['fxv-av']}>{name[0]}</span>
                    <span className={s['auth-who']}>
                        <b>{name}</b>
                        <small>{id}</small>
                    </span>
                    <span className={s['fxv-stack']}>
                        {apps.map((a) => (
                            <AppIcon key={a} app={a} size={22} />
                        ))}
                    </span>
                    <span className={s['fxv-count']}>{apps.length}</span>
                </div>
            ))}
        </div>
    );
}

export const VISUALS = { auth: AuthVisual, tenant: TenantVisual, agent: AgentDemo };
