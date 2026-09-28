import { LangProvider } from './LangContext';
import { LangBlock } from './LangBlock';
import { CodeBlock } from './CodeBlock';
import { Callout, Endpoint, ClickSteps, DocTable, StepH2, Code } from './Bits';
import { Toc } from './Toc';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Integrations Quickstart · viaSocket',
        description: 'From an empty project to a working integration. Let your users connect Slack, Gmail, HubSpot, Google Sheets and 2,300+ other apps.',
    };
}

const h2 = 'text-[clamp(21px,2.8vw,27px)] leading-[1.2] font-semibold tracking-[-0.015em] mt-3.5 mb-0 [text-wrap:balance]';
const h3 = 'text-[17px] font-semibold mt-2.5 mb-0 tracking-[-0.005em]';
const h4 = 'font-docs-mono text-[12px] tracking-[0.08em] uppercase text-docs-muted font-medium mt-1.5 mb-0';
const p = 'm-0 max-w-[72ch]';
const ul = 'm-0 pl-5 flex flex-col gap-2 max-w-[72ch] list-disc marker:text-docs-muted';
const section = 'flex flex-col gap-3.5 scroll-mt-6';

export default function DocsPage() {
    return (
        <LangProvider>
            <div className="max-w-[1140px] mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-[238px_minmax(0,1fr)] gap-0 lg:gap-14 items-start">
                <header className="lg:col-span-2 border-b border-docs-rule py-[40px_0_32px] flex flex-col gap-3.5">
                    <div className="font-docs-mono text-[12px] tracking-[0.09em] uppercase text-docs-muted flex flex-wrap gap-2 items-center">
                        <span>viaSocket for developers</span><span className="text-docs-rule-strong">/</span><span>Apps API</span><span className="text-docs-rule-strong">/</span><span>Quickstart</span>
                    </div>
                    <h1 className="text-[clamp(28px,4.6vw,44px)] leading-[1.12] font-bold tracking-[-0.02em] m-0 [text-wrap:balance]">
                        Quickstart: add app integrations to your product
                    </h1>
                    <p className="font-docs-serif text-[clamp(17px,2.2vw,20px)] leading-[1.55] text-docs-muted max-w-[62ch] m-0">
                        From an empty project to a working integration. Let your users connect Slack, Gmail, HubSpot, Google Sheets and 2,300+ other apps — without building OAuth, storing third-party tokens, or writing one API client per app.
                    </p>
                    <div className="flex flex-wrap gap-2.5 mt-1">
                        {['10 steps', 'Node 20+ or any HTTP client', 'Slack as the example', 'Same for every app'].map((t) => (
                            <span key={t} className="font-docs-mono text-[12px] px-2.5 py-[3px] rounded bg-docs-surface border border-docs-rule text-docs-muted">{t}</span>
                        ))}
                    </div>
                </header>

                <Toc />

                <article className="py-10 min-w-0 flex flex-col gap-[34px]">
                    <section id="why" className={section}>
                        <h2 className={h2}>Why this exists</h2>
                        <p className={p}>Your customers are asking you to connect their tools. &quot;Can it post to our Slack?&quot; &quot;Can it sync to our HubSpot?&quot; &quot;Can it write to a Google Sheet?&quot; Every one of those is a reasonable request, and every one is a small project.</p>
                        <h3 className={h3}>What one integration actually costs</h3>
                        <p className={p}>Take Slack, on your own. Before a single message is sent you build:</p>
                        <ul className={ul}>
                            <li><strong>Slack OAuth app</strong> — registered, scoped, redirect URLs configured, kept valid as Slack changes its requirements.</li>
                            <li>An <strong>authorisation flow</strong> — a consent redirect, a callback route, state and PKCE handling, error paths for a user who declines.</li>
                            <li>A <strong>token store</strong> — encrypted at rest, one row per customer. You are now holding credentials that let you act as your customers inside their workspace. That is a breach surface you did not have yesterday.</li>
                            <li>A <strong>refresh job</strong> — tokens expire. Something has to renew them on schedule and handle the ones that fail.</li>
                            <li>An <strong>API client</strong> — Slack&apos;s own shapes, its rate limits, its pagination, its error codes. Rewritten whenever Slack changes.</li>
                            <li>A <strong>public endpoint</strong> to receive Slack events — with signature verification, replay protection, and retry handling.</li>
                            <li>A <strong>polling loop</strong>, for the apps that have no webhooks at all.</li>
                        </ul>
                        <p className={p}>Then a customer asks for HubSpot. Different OAuth quirks, different token lifetime, different pagination, different event model. You build most of it again.</p>
                        <Callout variant="warn" title="The real problem is the tenth app, not the first">
                            <p>One integration is a sprint. Ten is a permanent team. The cost is not the building — it is the maintenance that never ends, on code that is not your product.</p>
                        </Callout>
                    </section>

                    <section id="what" className={section}>
                        <h2 className={h2}>What viaSocket does instead</h2>
                        <p className={p}>viaSocket sits between your product and 2,300+ applications and gives you <strong>one contract</strong> for all of them: connect an account, list options, run an action, react to an event. Same four things whether your user picked Slack, Gmail, HubSpot or Notion.</p>
                        <DocTable
                            head={['The job', 'Without viaSocket', 'With viaSocket']}
                            rows={[
                                ["Getting the user's permission", 'You register an OAuth app per service and build the flow', 'One popup call. viaSocket owns the OAuth client and the consent screen.'],
                                ['Holding credentials', 'Your database, encrypted, your liability', 'viaSocket holds each grant encrypted and refreshes it. Your database never sees a token.'],
                                ['Talking to the app', 'An API client per app, maintained forever', "One call shape. viaSocket speaks each app's API."],
                                ['Reacting to events', 'A public endpoint, signatures, retries — or a polling loop', 'Subscribe. viaSocket polls the apps that need polling and handles de-duplication, renewal and retries.'],
                                ['Adding the next app', 'Most of the work again', 'Three ids change. Nothing else.'],
                            ]}
                        />
                        <p className={p}>This quickstart covers the <strong>Apps API</strong>: your screens, your design, your backend making the calls. The steps are identical for every app — only the ids change.</p>
                    </section>

                    <section id="benefits" className={section}>
                        <h2 className={h2}>Why use it</h2>
                        <h3 className={h3}>You ship integrations in hours, not sprints</h3>
                        <p className={p}>The first one takes an afternoon. The tenth takes twenty minutes, because it is the same ten steps with different ids. Your integration backlog stops being a roadmap item.</p>
                        <h3 className={h3}>You never hold your customers&apos; credentials</h3>
                        <p className={p}>This is the part worth pausing on. If you build integrations yourself, your database fills with access tokens for other people&apos;s Slack workspaces, inboxes and CRMs. A breach is no longer your data — it is theirs, across every customer at once. With viaSocket the grant lives with viaSocket, encrypted and refreshed. Your database holds an opaque id that is useless on its own.</p>
                        <h3 className={h3}>Your users never leave your product</h3>
                        <p className={p}>They click a button in your UI, approve in the app&apos;s own consent popup, and they are back. No redirect to a third-party site, no separate account to create, no other brand in the flow.</p>
                        <h3 className={h3}>It is your UI, not a widget</h3>
                        <p className={p}>The Apps API gives you data, not screens. The connect button, the app list, the channel dropdown — you build all of it, in your own design system. Nothing in your product has to look like someone else&apos;s.</p>
                        <h3 className={h3}>Integrations stop breaking silently</h3>
                        <p className={p}>Apps change their APIs, rotate their auth, deprecate endpoints. When that happens, viaSocket absorbs it. You find out because nothing broke.</p>
                        <h3 className={h3}>Your infrastructure gets simpler, not bigger</h3>
                        <p className={p}>No public webhook endpoint. No queue. No polling workers. No refresh cron. An event subscription carries a small handler that viaSocket runs in its own sandbox when the event fires — nothing in your product has to be reachable from the internet.</p>
                        <h3 className={h3}>One integration layer for your whole product</h3>
                        <p className={p}>The same connection your user made works for your app features, your automations and your AI agent. They authorise once.</p>
                    </section>

                    <section id="ways" className={section}>
                        <h2 className={h2}>Two ways to set up</h2>
                        <DocTable
                            head={['Option', 'What happens', 'Good for']}
                            rows={[
                                ['Set up with AI', 'Your dashboard generates a ready-made instruction file for your AI coding agent. The agent writes the integration code for you.', 'Fastest path. Available in the Apps API section of your project.'],
                                ['Set up manually', 'You follow the steps below yourself, in any language.', 'Full control, non-JavaScript stacks, or reviewing what the AI path produces.'],
                            ]}
                        />
                        <p className={p}>Both call exactly the same endpoints. This page is the manual path.</p>
                        <Callout title="Slack is the example, and the code says so">
                            <p>Every sample below uses <strong>Slack</strong>, posting a message to a channel. Slack is not special and nothing in these steps is Slack-specific — swap three ids and the same ten steps append a row to Google Sheets or create a deal in HubSpot.</p>
                            <p>Each code block says this in a comment on its own first line, so a snippet you copy — into your editor, or into an AI assistant — carries that context with it.</p>
                            <p>Code is shown as <strong>cURL</strong>, <strong>Node.js</strong> and <strong>Python</strong>. Pick a tab and the whole page follows. Working in Go, PHP or Ruby? Translate from the cURL tab — it is the language-neutral form, and there is nothing viaSocket-specific about the HTTP.</p>
                        </Callout>
                    </section>

                    <section id="s1" className={section}>
                        <StepH2 n={1}>Create an embed and get your three values</StepH2>
                        <p className={p}>Everything else on this page needs three values from your viaSocket project: an <strong>org id</strong>, a <strong>project id</strong> and a <strong>signing secret</strong>. You create them once.</p>
                        <ClickSteps
                            items={[
                                ['Sign in at viasocket.com', 'Create an account if you do not have one. Free to start.'],
                                ['Go to flow.viasocket.com/integrations', 'Pick your project, then open Configuration.'],
                                ['Click Create new embed', 'This generates the signing secret for this project.'],
                                ['Copy the org id, project id and secret', 'All three are shown on that screen. The secret is shown masked — reveal it to copy.'],
                            ]}
                        />
                        <p className={p}>Paste them into your environment file:</p>
                        <CodeBlock>{'VIASOCKET_ORG_ID=\nVIASOCKET_PROJECT_ID=\nVIASOCKET_EMBED_SECRET='}</CodeBlock>
                        <Callout variant="warn" title="The secret is not the token">
                            <p>Anyone holding the signing secret can act as any of your users. It stays on your server — never in your frontend bundle, never in the repo. A secret committed once survives in git history after you delete it from the file. Check <Code>.gitignore</Code> covers <Code>.env</Code> before you paste it in.</p>
                        </Callout>
                        <Callout title="Read them from the environment, every time">
                            <p>The project id in particular changes — you may move projects, or run one project for the Apps API and another for an embed. Hardcoding it means editing source to change environment.</p>
                        </Callout>
                    </section>

                    <section id="s2" className={section}>
                        <StepH2 n={2}>Install the SDK</StepH2>
                        <p className={p}>Pick your language once — the tabs below remember your choice for the whole page.</p>
                        <LangBlock
                            panes={{
                                curl: '# No install needed. Every step below has a plain HTTP form.\n# You will need a JWT tool for step 3 — see that step.',
                                node: 'npm install viasocket-apps\n# Node 20+, Bun, Deno, edge runtimes. Zero dependencies. MIT.',
                                python: '# There is no Python SDK. Use the HTTP endpoints directly.\npip install requests pyjwt',
                            }}
                        />
                        <p className={p}>The SDK is a convenience for Node, not a requirement. There is no Python SDK — the Python tab calls the HTTP endpoints directly, and every step below shows that raw call, so any language works.</p>
                        <h4 className={h4}>Base URLs</h4>
                        <ul className={ul}>
                            <li>API calls go to <Code>https://flow-api.viasocket.com</Code></li>
                            <li>Running an action goes to <Code>{'https://flow.sokt.io/func/<script_id>'}</Code></li>
                        </ul>
                    </section>

                    <section id="s3" className={section}>
                        <StepH2 n={3}>Sign an embed token</StepH2>
                        <p className={p}><strong>Why this step exists.</strong> viaSocket has to know two things on every call: that the request really came from your product, and which of your end users it is for. One short signed token answers both. You sign it yourself, so viaSocket never needs a list of your users and you never need an API key in the browser.</p>
                        <p className={p}>Every call below sends one header: <Code>{'authorization: <embed token>'}</Code>. It is a JWT you sign on your backend with the three values from step 1.</p>
                        <h4 className={h4}>The payload</h4>
                        <CodeBlock>{'{\n  "org_id": "<your org id>",\n  "project_id": "<your project id>",\n  "unique_identifier": "<your own id for this end user>"\n}'}</CodeBlock>
                        <p className={p}><Code>unique_identifier</Code> is your own id for the end user. Connections and subscriptions are isolated per identifier, so two of your users never see each other&apos;s data. Use one identifier per user, forever — change it and the user appears to have lost their connections.</p>
                        <h4 className={h4}>Sign it</h4>
                        <LangBlock
                            panes={{
                                curl: '# Signing is not a cURL job — it happens in your backend code.\n# Any HS256 JWT library works. With the jwt-cli tool:\n\njwt encode \\\n  --secret "$VIASOCKET_EMBED_SECRET" \\\n  --alg HS256 \\\n  \'{"org_id":"\'"$VIASOCKET_ORG_ID"\'","project_id":"\'"$VIASOCKET_PROJECT_ID"\'","unique_identifier":"user_1042"}\'\n\n# Use the result as the authorization header in later steps.',
                                node: "import { ViaSocket } from 'viasocket-apps'\n\nexport const viasocket = new ViaSocket({\n  orgId: process.env.VIASOCKET_ORG_ID,\n  projectId: process.env.VIASOCKET_PROJECT_ID,\n  secret: process.env.VIASOCKET_EMBED_SECRET // server-side only\n})\n\n// Everything is done for one of your end users, identified by an id you choose.\nconst user = viasocket.user('user_1042')\n\n// Your frontend needs this to open the connect popup.\n// Sign per request; never cache it in the browser.\nconst embedToken = await user.token()",
                                python: 'import os, jwt   # pip install pyjwt\n\ndef embed_token(unique_identifier):\n    return jwt.encode(\n        {\n            "org_id": os.environ["VIASOCKET_ORG_ID"],\n            "project_id": os.environ["VIASOCKET_PROJECT_ID"],\n            "unique_identifier": unique_identifier,   # your own user id\n        },\n        os.environ["VIASOCKET_EMBED_SECRET"],         # server-side only\n        algorithm="HS256",\n    )\n\ntoken = embed_token("user_1042")',
                            }}
                        />
                        <p className={p}>There is nothing viaSocket-specific about the signing itself. It is a standard HS256 JWT — any library in any language produces the same token.</p>
                    </section>

                    <section id="s4" className={section}>
                        <StepH2 n={4}>Find the app and get its service_id</StepH2>
                        <p className={p}>Every remaining step needs a <Code>service_id</Code> — viaSocket&apos;s id for the app. Fetch it from the app search. Public: no auth, no org id, no secret.</p>
                        <Endpoint verb="GET" url="https://flow.sokt.io/func/scri12BSufQM?key=<search term>" />
                        <CodeBlock>{'{\n  "success": true,\n  "message": "search successful",\n  "data": [\n    { "service_id": "rowbu58rc", "name": "Slack", "description": "..." }\n  ]\n}'}</CodeBlock>
                        <p className={p}><Code>service_id</Code> is what the connect popup takes and what every later call is built on. <Code>name</Code> is what you render.</p>
                        <ul className={ul}>
                            <li>It is a <strong>search, not a list-all</strong>. An empty <Code>key</Code> returns an empty array, so wire it to your own search box and query on input, debounced. Do not call it on mount expecting a full catalog.</li>
                            <li>It matches descriptions as well as names, so results can look loose. Pick by <Code>name</Code>.</li>
                            <li>Not in the SDK. Plain <Code>fetch</Code>, from your backend.</li>
                            <li>Never hardcode a <Code>service_id</Code> and never keep your own copy of the app list. Both go stale.</li>
                        </ul>
                        <LangBlock
                            panes={{
                                curl: '# EXAMPLE: searching for Slack. Change "slack" to any app name.\ncurl "https://flow.sokt.io/func/scri12BSufQM?key=slack"',
                                node: "// Backend route behind your own search box.\n// EXAMPLE: a request of ?q=slack returns Slack's service_id.\napp.get('/api/integrations/search', async (req, res) => {\n  const term = req.query.q\n  if (!term) return res.json([])   // an empty key returns nothing\n\n  const r = await fetch(\n    `https://flow.sokt.io/func/scri12BSufQM?key=${encodeURIComponent(term)}`\n  )\n  const { data } = await r.json()\n\n  // Send only what your UI needs.\n  res.json(data.map(a => ({ id: a.service_id, name: a.name, icon: a.iconurl })))\n})",
                                python: 'import requests\n\n# EXAMPLE: term="slack" returns Slack\'s service_id. Any app name works.\ndef search_apps(term):\n    if not term:\n        return []                      # an empty key returns nothing\n\n    r = requests.get(\n        "https://flow.sokt.io/func/scri12BSufQM",\n        params={"key": term},\n    )\n    data = r.json()["data"]\n\n    return [\n        {"id": a["service_id"], "name": a["name"], "icon": a["iconurl"]}\n        for a in data\n    ]',
                            }}
                        />
                        <p className={p}>Wire that to a search box in your product. The user types, picks an app, and you now have its <Code>service_id</Code> for the next step.</p>
                    </section>

                    <section id="s5" className={section}>
                        <StepH2 n={5}>Connect the app — your user authorises it</StepH2>
                        <p className={p}><strong>Why this step exists.</strong> viaSocket cannot touch your user&apos;s account until that user says yes. This step opens the app&apos;s own sign-in and consent screen in a popup. Your user approves there, on the app&apos;s real domain, and viaSocket receives and stores the grant. Your code never sees a password or a token.</p>
                        <p className={p}>This is the only step that runs in the browser.</p>
                        <h4 className={h4}>Your frontend — JavaScript only; this is the one step that runs in the browser</h4>
                        <CodeBlock>{"// EXAMPLE: connecting Slack. serviceId comes from step 4 — pass any app's id.\nimport { connect } from 'viasocket-apps/browser'\n\nasync function onConnectClick(serviceId) {   // e.g. Slack's 'rowbu58rc'\n  // 1. Ask your backend for a fresh token (step 3).\n  const embedToken = await fetch('/api/integrations/token').then(r => r.text())\n\n  try {\n    // 2. Popup opens. This waits until the user approves or closes it.\n    const { authId } = await connect({ embedToken, serviceId })\n\n    // 3. Hand the authId to your backend and save it.\n    await fetch('/api/integrations/connected', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ serviceId, authId })\n    })\n\n    showConnected()\n  } catch (error) {\n    if (error.code === 'closed') return    // user closed the popup — nothing happened\n    showError(error.message)\n  }\n}"}</CodeBlock>
                        <h4 className={h4}>Your backend — plain storage, nothing viaSocket-specific</h4>
                        <CodeBlock>{"// Receives the authId the popup produced. Nothing app-specific here.\napp.post('/api/integrations/connected', async (req, res) => {\n  const { serviceId, authId } = req.body\n\n  await db.connections.insert({\n    userId: req.session.userId,   // your user\n    serviceId,                    // which app — e.g. Slack's 'rowbu58rc'\n    authId                        // viaSocket's id for this connection\n  })\n\n  res.json({ ok: true })\n})"}</CodeBlock>
                        <p className={p}><Code>connect()</Code> rejects with a <Code>code</Code> you can branch on:</p>
                        <DocTable
                            head={['code', 'Meaning', 'What to do']}
                            rows={[
                                ["'closed'", 'The user closed the popup', 'Nothing. No connection was created. Do not show an error.'],
                                ["'rejected'", 'The app refused the authorisation', 'Show the message and let them retry.'],
                                ["'script'", 'The connect script did not load', "Network or content-blocker problem on the user's side."],
                            ]}
                        />
                        <Callout variant="good" title="Store this">
                            <p>Save the <Code>auth_id</Code> against your own user id and the <Code>service_id</Code>. That is the whole record. No tokens, no keys, no app credentials.</p>
                        </Callout>
                        <h3 className={h3}>Listing and disconnecting</h3>
                        <p className={p}>Two methods cover the rest of a connection&apos;s life. Build a settings screen with them — connected apps listed, each with a Disconnect button.</p>
                        <CodeBlock>{"// Node.js. Works for every connected app, not just the example one.\nconst connections = await user.listConnections()      // what has this user connected?\n\nawait user.revokeConnection(authId)                   // disconnect one\nawait db.connections.remove({ userId: req.session.userId, authId })"}</CodeBlock>
                        <p className={p}>After revoking, that <Code>auth_id</Code> and the <Code>script_id</Code> built from it both stop working. The user has to connect again from scratch.</p>
                    </section>

                    <section id="s6" className={section}>
                        <StepH2 n={6}>Enable the app — only if you will run actions</StepH2>
                        <Endpoint verb="POST" url="https://flow-api.viasocket.com/embed/enable/<service_id>/<auth_id>" />
                        <p className={p}><strong>Why this step exists.</strong> A connection proves your user said yes. It does not yet give you anything to call. Enabling turns that connection into a runnable endpoint — the <Code>script_id</Code> — so running an action later is a single POST with no lookup and no token exchange.</p>
                        <p className={p}>Do it once per connection and store the result next to the <Code>auth_id</Code>.</p>
                        <LangBlock
                            panes={{
                                curl: '# EXAMPLE: rowbu58rc is Slack\'s service_id. Use your own app\'s.\ncurl -X POST \\\n  "https://flow-api.viasocket.com/embed/enable/rowbu58rc/<auth_id>" \\\n  -H "authorization: <embed token>"\n\n# Returns the script_id. Store it.',
                                node: "// Run this right after you save the authId in step 5.\n// EXAMPLE: serviceId is Slack's 'rowbu58rc'. Any app's id works the same.\nconst user = viasocket.user(req.session.userId)\n\n// findEnabled first, so one connection never ends up with two script_ids.\nconst scriptId =\n  (await user.findEnabled(serviceId)) ??\n  (await user.enable(serviceId, authId))\n\nawait db.connections.update(\n  { userId: req.session.userId, serviceId },\n  { scriptId }\n)",
                                python: 'import requests\n\n# Run this right after you save the auth_id in step 5.\n# EXAMPLE: service_id is Slack\'s \'rowbu58rc\'. Any app\'s id works the same.\ndef enable_app(service_id, auth_id, token):\n    r = requests.post(\n        f"https://flow-api.viasocket.com/embed/enable/{service_id}/{auth_id}",\n        headers={"authorization": token},\n    )\n    r.raise_for_status()\n    return r.json()          # contains the script_id — store it\n\nresult = enable_app("rowbu58rc", auth_id, embed_token("user_1042"))',
                            }}
                        />
                        <p className={p}>From here on, that <Code>script_id</Code> is what you call to make the app do things. You will not need the <Code>auth_id</Code> again except for reading values in step 9 and disconnecting.</p>
                        <Callout title="Skip this if you only need events">
                            <p>Only actions need enabling. Subscribing to a trigger takes the <Code>auth_id</Code> and nothing else — if your integration just listens for events, go straight to the trigger you want.</p>
                        </Callout>
                    </section>

                    <section id="s7" className={section}>
                        <StepH2 n={7}>Choose an action or trigger</StepH2>
                        <p className={p}><strong>Why this step exists.</strong> &quot;Slack&quot; is not a thing you can run. <em>Send Message</em> is. Every app publishes a list of things it can do — <strong>actions</strong>, which your code makes happen, and <strong>triggers</strong>, which happen in the app and tell your code about it. Slack publishes 25 actions and 6 triggers. Each one has its own id, and you need the id of the one you want.</p>
                        <p className={p}>You pick this <strong>while you are writing the code</strong>, not at runtime. Your feature already knows what it does.</p>
                        <h3 className={h3}>Option A — find it in the dashboard</h3>
                        <p className={p}>The dashboard is the viaSocket web app where you manage your projects. You were already in it in step 1, on the Configuration screen.</p>
                        <ClickSteps
                            items={[
                                ['Go to flow.viasocket.com/integrations', 'Sign in if you are not already.'],
                                ['Open your project', 'The same one whose keys you copied in step 1.'],
                                ['Open Apps & API Reference in the left menu', 'Under Get Started.'],
                                ['Search for your app', 'Type "slack" and select it.'],
                                ['Read the list of actions and triggers', "Each row shows its type, its name, and its id on the right — for example rowj2u3wc8h5 for Slack's Send Message. Copy that id."],
                            ]}
                        />
                        <p className={p}>Below the list, the same screen shows the fields that action takes. That is what step 8 is about.</p>
                        <h3 className={h3}>Option B — fetch it as a document</h3>
                        <p className={p}>Same information, as an API call, using the <Code>service_id</Code> from step 4. Public, no auth. Useful if you want it in your editor rather than a browser tab.</p>
                        <Endpoint verb="GET" url="https://beta-flow.viasocket.com/documentation/<service_id>?format=http" />
                        <CodeBlock>{'# EXAMPLE: rowbu58rc is Slack\'s service_id, from step 4.\ncurl -H "Accept: text/markdown" \\\n  "https://beta-flow.viasocket.com/documentation/rowbu58rc?format=http"'}</CodeBlock>
                        <ul className={ul}>
                            <li><Code>format=http</Code> gives language-neutral instructions. <Code>format=sdk</Code> gives the <Code>viasocket-apps</Code> versions.</li>
                            <li>It lists every action and trigger with its id, every field with its type and dependencies, sample <Code>inputData</Code>, and a troubleshooting table.</li>
                            <li>A 404 means that app has no published actions or triggers.</li>
                            <li>It is generated from the live catalog, so refetch it rather than trusting a saved copy.</li>
                        </ul>
                        <Callout title="Read it while you build, not at runtime">
                            <p>This document is reference material for you as you write the code. Your product does not download it for each end user.</p>
                        </Callout>
                    </section>

                    <section id="s8" className={section}>
                        <StepH2 n={8}>Build inputData</StepH2>
                        <p className={p}><strong>What inputData is.</strong> It is the JSON body you send when you run the action — the answers to everything the action needs to know. For &quot;send a message&quot; that means: which channel, what text, send now or later. Every action defines its own set of keys.</p>
                        <p className={p}>The reference screen from step 7 lists those keys in a table. Each row tells you the key&apos;s name, its type, and where its value comes from. There are three cases, and telling them apart is the whole job of this step.</p>
                        <h3 className={h3}>Case 1 — you provide the value</h3>
                        <p className={p}>Plain values your code or your user already has. Text, a number, true or false. Nothing to fetch.</p>
                        <CodeBlock>{'// Slack example — "messageto" is a Slack key, not a viaSocket one.\n{ "messageto": "channel" }'}</CodeBlock>
                        <h3 className={h3}>Case 2 — the value has to be fetched from the app</h3>
                        <p className={p}>The reference marks these with a <strong>list-options</strong> badge. They hold ids that only the app knows — a channel id, a spreadsheet id, a pipeline id. You cannot type these and you cannot guess them. Step 9 fetches them.</p>
                        <CodeBlock>{'// Slack example — a channel id. Your app will have its own equivalent.\n{ "channel_id": ["C01ABCD2EFG"] }   // ← this id came from a list-options call'}</CodeBlock>
                        <h3 className={h3}>Case 3 — the key only applies sometimes</h3>
                        <p className={p}>Some keys are alternatives to each other. The reference shows the rule in orange, like <em>only when messageto = &quot;channel&quot;</em>.</p>
                        <p className={p}>These are not optional extras. They are branches. Send the ones whose condition is true and <strong>leave the others out of the JSON entirely</strong> — sending two alternatives together is an error, not a fallback.</p>
                        <CodeBlock>{'// messageto is "channel", so send channel_id and omit userId completely.\n{ "messageto": "channel", "channel_id": ["C01ABCD2EFG"] }\n\n// If messageto were "user", it would be the other way round.\n{ "messageto": "user", "userId": ["U04XYZ9PQRS"] }'}</CodeBlock>
                        <h3 className={h3}>Dotted keys mean nesting</h3>
                        <p className={p}>The reference writes nested keys with a dot. A key shown as <Code>destination.channel_id</Code> is not a key called &quot;destination.channel_id&quot; — it is <Code>channel_id</Code> inside an object called <Code>destination</Code>.</p>
                        <CodeBlock>{'// Reference shows:  destination.messageto\n//                   destination.channel_id\n// You send:\n{\n  "destination": {\n    "messageto": "channel",\n    "channel_id": ["C01ABCD2EFG"]\n  }\n}'}</CodeBlock>
                        <p className={p}>This matters twice: here, and again in step 9, where the same dotted path is how you name the field you are fetching values for.</p>
                        <h3 className={h3}>Putting it together</h3>
                        <p className={p}>Go down the reference table once and sort every key into one of three piles:</p>
                        <DocTable
                            head={['Pile', 'What you do']}
                            rows={[
                                ['Required, you provide', 'Fill it in now.'],
                                ['Required, list-options', 'Note it. Step 9 fetches it.'],
                                ['Conditional', 'Decide the branch your feature uses, then treat its keys as one of the two piles above. Ignore the other branch.'],
                            ]}
                        />
                        <p className={p}>Anything left over is optional. Leave it out until you need it.</p>
                    </section>

                    <section id="s9" className={section}>
                        <StepH2 n={9}>Get the values that only the app knows</StepH2>
                        <p className={p}>In step 8 you sorted the keys. This step fills in the ones marked <strong>list-options</strong>.</p>
                        <p className={p}><strong>Why this step exists.</strong> Slack does not accept <Code>#general</Code>. It accepts <Code>C01ABCD2EFG</Code>. That id exists only inside your user&apos;s Slack workspace — your code has no way to know it, and neither does your user. So you ask viaSocket for the real list, show your user the readable names, and send back the id they chose.</p>
                        <p className={p}>It is the same call for every such key. One call per key.</p>
                        <Endpoint verb="POST" url="https://flow-api.viasocket.com/embed/list-options/<action_id>" />
                        <LangBlock
                            panes={{
                                curl: '# EXAMPLE: Slack\'s Send Message action (rowj2u3wc8h5), fetching its channel list.\n# Your action id and fieldKey come from the reference in step 7.\ncurl -X POST \\\n  "https://flow-api.viasocket.com/embed/list-options/rowj2u3wc8h5" \\\n  -H "authorization: <embed token>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "fieldKey": "destination.channel_id",\n    "authId": "<auth_id>",\n    "existingFields": {}\n  }\'',
                                node: "// EXAMPLE: ACTION_ID is Slack's Send Message, the field is its channel list.\n// Swap both for your own app's values from step 7.\napp.get('/api/integrations/options', async (req, res) => {\n  const { authId } = await db.connections.find({\n    userId: req.session.userId,\n    serviceId: SERVICE_ID\n  })\n\n  const user = viasocket.user(req.session.userId)\n\n  const { options } = await user.listOptions(ACTION_ID, {\n    fieldKey: req.query.field,        // e.g. 'destination.channel_id'\n    authId,\n    existingFields: {}\n  })\n\n  res.json(options)\n})",
                                python: 'import requests\n\n# EXAMPLE: action_id is Slack\'s Send Message, field_key is its channel list.\n# Swap both for your own app\'s values from step 7.\ndef list_options(action_id, field_key, auth_id, token, existing=None):\n    r = requests.post(\n        f"https://flow-api.viasocket.com/embed/list-options/{action_id}",\n        headers={"authorization": token},\n        json={\n            "fieldKey": field_key,\n            "authId": auth_id,\n            "existingFields": existing or {},\n        },\n    )\n    r.raise_for_status()\n    return r.json()["options"]\n\noptions = list_options(\n    "rowj2u3wc8h5", "destination.channel_id", auth_id, embed_token("user_1042")\n)',
                            }}
                        />
                        <h4 className={h4}>What comes back — Slack channels, in this example</h4>
                        <CodeBlock>{'{\n  "options": [\n    { "label": "#general",     "value": "C01ABCD2EFG" },\n    { "label": "#engineering", "value": "C05HIJK6LMN" }\n  ]\n}'}</CodeBlock>
                        <p className={p}><strong>Show the <Code>label</Code>. Send the <Code>value</Code>.</strong> The value is what goes into <Code>inputData</Code> in step 10.</p>
                        <h3 className={h3}>The three inputs</h3>
                        <DocTable
                            head={['Input', 'What to send']}
                            rows={[
                                [<Code key="fk">fieldKey</Code>, <>The key&apos;s full dotted path, exactly as the reference writes it — <Code>destination.channel_id</Code>, not <Code>channel_id</Code>.</>],
                                [<Code key="ai">authId</Code>, 'The connection from step 5. This is how viaSocket knows whose channels to list.'],
                                [<Code key="ef">existingFields</Code>, <>Usually <Code>{'{}'}</Code>. Used when this field depends on an earlier one — see below.</>],
                            ]}
                        />
                        <h3 className={h3}>When one value depends on another</h3>
                        <p className={p}>Some values cannot be listed until an earlier choice is made. Slack cannot list the messages in a thread until it knows which channel. The reference marks these — <em>needs destination.thread_channel_id</em>.</p>
                        <p className={p}>Fetch the first one, then pass the chosen value into the second call inside <Code>existingFields</Code>, <strong>nested exactly the way <Code>inputData</Code> nests it</strong>:</p>
                        <CodeBlock>{"// 1. Get the channels.\nconst channels = await user.listOptions(ACTION_ID, {\n  fieldKey: 'destination.thread_channel_id',\n  authId,\n  existingFields: {}\n})\n\n// User picks one → 'C01ABCD2EFG'\n\n// 2. Now the messages in that channel become listable.\nconst messages = await user.listOptions(ACTION_ID, {\n  fieldKey: 'destination.thread_ts',\n  authId,\n  existingFields: {\n    destination: { thread_channel_id: 'C01ABCD2EFG' }\n  }\n})"}</CodeBlock>
                        <h3 className={h3}>When the list is long</h3>
                        <p className={p}>A workspace with hundreds of channels should not load all of them. Pass what your user typed as <Code>_searchText</Code> and the app filters server-side:</p>
                        <CodeBlock>{"existingFields: { _searchText: 'eng' }"}</CodeBlock>
                        <Callout variant="warn" title="Empty list?">
                            <p>Three usual causes: the app is not connected for that <Code>unique_identifier</Code>; the <Code>fieldKey</Code> is missing its parent path; or the field depends on an earlier value that is not in <Code>existingFields</Code>.</p>
                        </Callout>
                    </section>

                    <section id="s10" className={section}>
                        <StepH2 n={10}>Run the action</StepH2>
                        <Endpoint verb="POST" url="https://flow.sokt.io/func/<script_id>" />
                        <p className={p}>This is the call that actually makes something happen in your user&apos;s app. Everything before it was setup.</p>
                        <h3 className={h3}>What you send</h3>
                        <DocTable
                            head={['Part', 'Where it came from']}
                            rows={[
                                [<><Code>script_id</Code> — in the URL</>, 'Step 6, when you enabled the app. Identifies which connection to run against.'],
                                [<Code key="ai">action_id</Code>, 'Step 7, from the reference. Identifies what to do.'],
                                [<Code key="id">inputData</Code>, 'Step 8, with the fetched values from step 9 filled in. The details.'],
                            ]}
                        />
                        <p className={p}>There is <strong>no authorization header</strong> on this call. The <Code>script_id</Code> in the URL is itself the credential.</p>
                        <LangBlock
                            panes={{
                                curl: '# EXAMPLE: Slack\'s Send Message. The inputData shape is Slack\'s —\n# your app\'s keys come from its own reference (step 7).\ncurl -X POST "https://flow.sokt.io/func/<script_id>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "action_id": "rowj2u3wc8h5",\n    "inputData": {\n      "destination": {\n        "messageto": "channel",\n        "channel_id": ["C01ABCD2EFG"]\n      }\n    }\n  }\'',
                                node: "// EXAMPLE: posting to a Slack channel. The inputData keys below are Slack's —\n// your app's keys come from its own reference (step 7).\napp.post('/api/integrations/run', async (req, res) => {\n  const { scriptId } = await db.connections.find({\n    userId: req.session.userId,\n    serviceId: SERVICE_ID\n  })\n\n  try {\n    const result = await viasocket.runAction(scriptId, ACTION_ID, {\n      destination: {\n        messageto: 'channel',\n        channel_id: [req.body.channelId]   // the value your user picked in step 9\n      }\n    })\n\n    res.json(result)\n  } catch (error) {\n    // ViaSocketError carries the app's own message, status and body.\n    console.error(error.status, error.message, error.body)\n    res.status(502).json({ error: error.message })\n  }\n})",
                                python: 'import requests\n\n# EXAMPLE: posting to a Slack channel. The input_data keys below are Slack\'s —\n# your app\'s keys come from its own reference (step 7).\ndef run_action(script_id, action_id, input_data):\n    r = requests.post(\n        f"https://flow.sokt.io/func/{script_id}",    # no auth header — script_id is the credential\n        json={"action_id": action_id, "inputData": input_data},\n    )\n    r.raise_for_status()\n    return r.json()\n\nresult = run_action(script_id, "rowj2u3wc8h5", {\n    "destination": {\n        "messageto": "channel",\n        "channel_id": [chosen_channel_id],           # the value your user picked in step 9\n    }\n})',
                            }}
                        />
                        <h4 className={h4}>What comes back</h4>
                        <p className={p}>The app&apos;s own response, passed straight through. Slack returns Slack&apos;s JSON, HubSpot returns HubSpot&apos;s. Check it and store whatever your product needs — a message id, a record id — so you can reference it later.</p>
                        <Callout variant="warn" title="Treat script_id like a password">
                            <p>Anyone holding it can run that app as that user, with no token needed. Keep it in your database, server-side. It must never reach the browser, a log line, or an error you return to the client.</p>
                        </Callout>
                    </section>

                    <section id="example" className={section}>
                        <h2 className={h2}>Complete examples, one app at a time</h2>
                        <p className={p}>The ten steps above are the same for every app. If you would rather follow a full working build with the real ids already filled in — nothing to look up, nothing to substitute — start with one of these.</p>
                        <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                                ['Integrate Slack into your app', 'Connect a workspace, choose a channel, post a message'],
                                ['Integrate Gmail into your app', 'Connect an inbox, send and read mail'],
                                ['Integrate Google Sheets into your app', 'Connect an account, choose a sheet, append rows'],
                                ['Integrate HubSpot into your app', 'Connect a portal, create contacts and deals'],
                            ].map(([title, desc]) => (
                                <li key={title} className="border border-docs-rule rounded-md p-[11px_13px] text-[14px]">
                                    <a href="#" className="no-underline font-medium text-docs-accent hover:underline">{title}</a>
                                    <span className="block text-docs-muted text-[13px] mt-0.5">{desc}</span>
                                </li>
                            ))}
                        </ul>
                        <p className={p}>Each one is this quickstart with the ids resolved. Once you have done any of them, moving to another app is three ids.</p>
                    </section>

                    <section id="missing" className={section}>
                        <h2 className={h2}>The app you need is not in the catalog</h2>
                        <p className={p}>Search first — the catalog is wide and the search matches descriptions as well as names. If you mean your own product or a private internal API, build it once as a connector in Plug Builder, in the Developer section of the dashboard. After that it behaves like every other app: same connect flow, same actions, same events, same steps.</p>
                        <p className={p}>Do not hand-roll an HTTP client inside the integration instead. It would have none of the connection handling above, which was the reason to be here.</p>
                    </section>
                </article>

                <footer className="lg:col-span-2 border-t border-docs-rule py-[28px_0_0] text-docs-muted text-[14px] flex flex-col gap-2">
                    <p>viaSocket is built by Walkover. This quickstart covers the Apps API. Embed and MCP have their own guides.</p>
                </footer>
            </div>
        </LangProvider>
    );
}
