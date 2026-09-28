import Header from '../Header';
import Footer from '../Footer';
import Faq from '../Faq';
import { H2, Lead, Scene } from '../Heading';
import AuthHero from './AuthHero';
import { Dash } from './Dash';
import StepsGrid from './StepsGrid';
import TenantTree from './TenantTree';
import TrustPanel from './TrustPanel';
import CompareTable from './CompareTable';
import AiRun from './AiRun';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Managed auth · viaSocket',
        description: 'Let your users connect their apps. We handle the authentication.',
    };
}

const CHIPS = ['OAuth flows', 'Access and refresh tokens', 'Different authentication methods', 'Token expiration', 'Reauthorization', 'Permissions and scopes', 'Multiple accounts', 'Connection failures', 'Security', 'Changes to authentication APIs'];

const HANDLED_STEPS = [
    { n: '01', icon: 'KeyRound', title: 'OAuth', copy: 'Handle OAuth flows across the apps your users connect.' },
    { n: '02', icon: 'Repeat', title: 'Token management', copy: 'Access and refresh tokens are managed for you.' },
    { n: '03', icon: 'RotateCw', title: 'Token refresh', copy: 'When a token expires, the connection can be refreshed without making your user reconnect.' },
    { n: '04', icon: 'ShieldAlert', title: 'Reauthorization', copy: 'If a connection needs user approval again, your application can detect it and send the user through the authorization flow.' },
    { n: '05', icon: 'Users', title: 'Multiple accounts', copy: 'Users can connect multiple accounts from the same app.' },
    { n: '06', icon: 'Fingerprint', title: 'Different auth methods', copy: 'Support the authentication method required by the app — OAuth, API keys, Basic Auth, and more.' },
    { n: '07', icon: 'ShieldCheck', title: 'Permissions', copy: 'Control the permissions and scopes your users grant.' },
    { n: '08', icon: 'Cable', title: 'Connection management', copy: 'Create, use, check, and revoke connections through your application.' },
];

const WRONG_STEPS = [
    { n: '01', pill: 'warn', title: 'Token expired?', copy: 'The connection can be refreshed.' },
    { n: '02', pill: 'bad', title: 'Refresh failed?', copy: 'Your application can know that the connection needs attention.' },
    { n: '03', pill: 'bad', title: 'User revoked access?', copy: 'The connection status reflects that it needs to be reauthorized.' },
    { n: '04', pill: 'warn', title: 'User denied permission?', copy: 'You can handle the failed authorization and ask them to connect again.' },
    { n: '05', pill: 'ok', title: "Something isn't working?", copy: 'Use connection and execution information to understand what happened.' },
];

const DASH_ROWS = [
    { app: 'Salesforce', who: 'Acme · Sales', status: 'bad', note: 'Token expired' },
    { app: 'HubSpot', who: 'Acme · Marketing', status: 'warn', note: 'Reauthorization needed' },
    { app: 'Gmail', who: 'Northwind', status: 'warn', note: 'Scope changed by app' },
    { app: 'Slack', who: 'Northwind', status: 'warn', note: 'Rate limited' },
    { app: 'Zendesk', who: 'Globex', status: 'bad', note: 'Access revoked by user' },
    { app: 'Notion', who: 'Globex', status: 'ok', note: 'Connected' },
];

const CHANGE_ROWS = [
    { app: 'Salesforce', who: 'OAuth scopes renamed', status: 'ok', note: 'Updated by viaSocket' },
    { app: 'HubSpot', who: 'Token lifetime shortened', status: 'ok', note: 'Updated by viaSocket' },
    { app: 'Gmail', who: 'New consent screen required', status: 'ok', note: 'Updated by viaSocket' },
    { app: 'Slack', who: 'API version deprecated', status: 'ok', note: 'Updated by viaSocket' },
];

const AUTH_FAQS = [
    ['Do I need to build OAuth myself?', 'No. viaSocket handles the authentication flow for supported integrations.'],
    ['Where are access and refresh tokens stored?', "viaSocket manages the connection credentials as part of the authentication layer. Your application doesn't need to build its own token-management infrastructure."],
    ['Do I get access to the raw tokens?', 'The exact token-access model depends on how you integrate. Your application can work with the connection without needing to manage the OAuth lifecycle itself.'],
    ['What happens when an access token expires?', 'viaSocket handles token refresh where the app supports refresh tokens. If the connection can no longer be refreshed, your application can detect that the user needs to reconnect.'],
    ['What happens if the user revokes access?', 'The connection becomes invalid and your application can handle the reauthorization flow.'],
    ['Can one user connect multiple accounts?', 'Yes. Connections can be managed separately, so a user can have multiple accounts where the integration supports it.'],
    ['Can multiple customers connect the same app?', 'Yes. Each customer can have their own connection to the same app.'],
    ["How do you prevent customers from using each other's connections?", 'Connections are associated with the relevant users and tenants. Your application determines which connection belongs to the customer making the request.'],
    ['Can I control what permissions my users grant?', 'Yes, where the integration supports configurable scopes and permissions.'],
    ['Do you only support OAuth?', 'No. Authentication requirements vary by app. viaSocket supports OAuth and other authentication methods such as API keys and Basic Auth.'],
    ['Can I use my own OAuth credentials?', "If you need to use your own OAuth application credentials, check the integration's configuration options or contact us for the supported setup."],
    ['Can I customize the authentication experience?', 'Yes. You can control how the connection experience fits into your product instead of sending users through a separate product experience.'],
    ['How do I know if a connection needs reauthorization?', 'Connection status and execution information can be used by your application to identify connections that need attention.'],
    ['What happens when an integration changes its OAuth requirements?', "viaSocket maintains the authentication layer for supported integrations, so you don't have to independently maintain authentication logic for every integration."],
    ['Can I revoke a connection?', 'Yes. Connections can be managed and revoked through the available connection APIs.'],
    ['Can I see what happened when authentication fails?', 'Yes. Connection and execution information helps you identify authentication and execution failures.'],
    ['What happens if I stop using viaSocket?', 'You should be able to manage and remove connections according to your account and integration setup. Your contract and data-retention requirements determine the exact deletion process.'],
];

export default function AuthPage() {
    return (
        <>
            <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)]">
                <Header />
            </div>
            <AuthHero />

            <Scene>
                <H2>Authentication gets complicated fast.</H2>
                <div className="grid lg:grid-cols-2 gap-[clamp(24px,4vw,56px)] items-center">
                    <div className="grid gap-4 content-start">
                        <Lead>You need to handle:</Lead>
                        <div className="flex flex-wrap gap-2 max-w-[820px]">
                            {CHIPS.map((c) => (
                                <span key={c} className="border border-dev-line bg-dev-surface rounded-full px-3.5 py-2 text-[14.5px] text-dev-ink-2">{c}</span>
                            ))}
                        </div>
                    </div>
                    <Dash barLeft="Connections · without managed auth" barRight="4 need attention" barRightClass="text-dev-warn font-medium" rows={DASH_ROWS} />
                </div>
                <p className="font-semibold tracking-[-0.03em] leading-[1.15] max-w-[24ch] text-[clamp(22px,2.6vw,34px)]">
                    Don&apos;t build another infrastructure layer just to let users connect their apps.
                </p>
            </Scene>

            <Scene id="handled">
                <H2>Everything around authentication is handled.</H2>
                <StepsGrid steps={HANDLED_STEPS} cols={4} />
            </Scene>

            <Scene>
                <H2>Every customer gets their own connections.</H2>
                <Lead>Your customers should never share authentication state.</Lead>
                <TenantTree />
                <div className="grid gap-2.5 text-[clamp(18px,1.8vw,22px)] font-medium tracking-[-0.01em] text-dev-ink-2">
                    <span>viaSocket keeps connections associated with the right customer and user.</span>
                    <span>You don&apos;t have to build this connection-management layer yourself.</span>
                </div>
            </Scene>

            <Scene>
                <H2>What happens when something goes wrong?</H2>
                <Lead>
                    <em className="not-italic font-medium">Authentication</em> will fail sometimes. The important thing is knowing why and what to do next.
                </Lead>
                <StepsGrid steps={WRONG_STEPS} cols={5} />
            </Scene>

            <Scene>
                <TrustPanel />
            </Scene>

            <Scene>
                <H2>What happens when an app changes its authentication?</H2>
                <div className="grid lg:grid-cols-2 gap-[clamp(24px,4vw,56px)] items-center">
                    <div className="grid gap-2.5 text-[clamp(18px,1.8vw,22px)] font-medium tracking-[-0.01em] text-dev-ink-2">
                        <span>You shouldn&apos;t have to rebuild your authentication system every time an app changes its requirements.</span>
                        <span>viaSocket maintains the integration and authentication layer across supported apps.</span>
                        <span>Your product continues to work through the same interface.</span>
                    </div>
                    <Dash barLeft="Auth changes · last 30 days" barRight="0 action needed from you" barRightClass="text-dev-ok font-medium" rows={CHANGE_ROWS} cols3 />
                </div>
            </Scene>

            <Scene>
                <H2>You build the AI. We handle the connections.</H2>
                <CompareTable />
            </Scene>

            <Scene>
                <H2>Built for AI products</H2>
                <div className="grid lg:grid-cols-2 gap-[clamp(24px,4vw,56px)] items-center">
                    <div className="grid gap-4 content-start">
                        <Lead>Your AI decides:</Lead>
                        <p className="font-semibold tracking-[-0.03em] leading-[1.15] max-w-[22ch] text-[clamp(24px,3vw,40px)]">&quot;Send this customer an email.&quot;</p>
                        <Lead>
                            Your product shouldn&apos;t have to worry about whether Gmail uses OAuth, whether the token expired, or which credentials belong to that customer. The action layer handles it.
                        </Lead>
                        <div className="grid gap-2.5 text-[clamp(18px,1.8vw,22px)] font-medium tracking-[-0.01em] text-dev-ink-2">
                            <span>Your AI gets to focus on <b className="text-dev-ink font-semibold">what to do</b>.</span>
                            <span>viaSocket handles <b className="text-dev-ink font-semibold">how it gets authorized to do it</b>.</span>
                        </div>
                    </div>
                    <AiRun />
                </div>
            </Scene>

            <Faq items={AUTH_FAQS} title="Frequently asked questions" />
            <Footer />
        </>
    );
}
