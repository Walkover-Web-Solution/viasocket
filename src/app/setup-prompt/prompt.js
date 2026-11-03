// Prompt text for /setup-prompt. The page never fetches this and never reads
// VIASOCKET_* from the environment: org and project arrive in the query string
// and are substituted here in the browser.

export const DEFAULT_NAME = 'your project';

const SETUP_URL = 'https://flow.viasocket.com/documentation/skill/setup.md?format=http';
const TEST_URL = 'https://flow.viasocket.com/documentation/skill/test-connection.md?format=http';
const MCP_URL = 'https://connect.viasocket.com/mcp';

const ORG_RE = /^\d+$/;
const PROJECT_RE = /^[A-Za-z0-9_-]+$/;

const KEYS_LEDE =
    'Your AI agent can add your keys and finish the setup itself. Copy the prompt and paste it into your agent.';
const RUN_LEDE =
    'Your AI agent can find what stopped the first run, fix it and run it. Copy the prompt and paste it into your agent.';

const MISSING_IDS = 'VIASOCKET_ORG_ID and VIASOCKET_PROJECT_ID, using the ids from the viaSocket setup prompt';

function cleanName(raw) {
    if (typeof raw !== 'string') return DEFAULT_NAME;
    const cleaned = raw
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80)
        .trim();
    return cleaned || DEFAULT_NAME;
}

/** org and project are used only when both match their patterns. Anything else is ignored. */
export function parseSetupQuery(search) {
    const params = new URLSearchParams(typeof search === 'string' ? search : '');
    const orgRaw = (params.get('org') || '').trim();
    const projectRaw = (params.get('project') || '').trim();
    const orgOk = ORG_RE.test(orgRaw);
    const projectOk = PROJECT_RE.test(projectRaw);
    const idsReady = orgOk && projectOk;

    return {
        mode: params.get('for') === 'run' ? 'run' : 'keys',
        org: idsReady ? orgRaw : '',
        project: idsReady ? projectRaw : '',
        name: cleanName(params.get('name')),
    };
}

function idsPhrase(org, project) {
    if (org && project) return `VIASOCKET_ORG_ID=${org} and VIASOCKET_PROJECT_ID=${project}`;
    return MISSING_IDS;
}

function keysLines(org, project) {
    return [
        'Finish the viaSocket setup in this project: add the keys to .env and run the setup check.',
        `1. Put these in .env: ${idsPhrase(org, project)}.`,
        `2. Check whether you have the viaSocket MCP tools. If you do, get VIASOCKET_EMBED_SECRET with get_viasocket_embed_secret and add it to .env. If you don't, stop and tell me to connect the viaSocket MCP server at ${MCP_URL} in my agent's MCP settings, then continue once it is connected.`,
        '3. Keep the secret on the server only, never in client code, a committed file or a log.',
        `4. Follow ${SETUP_URL} and run its check. Tell me the result.`,
    ];
}

function runLines(org, project) {
    const where = org && project ? ` (org ${org}, project ${project})` : '';
    return [
        `viaSocket is set up in this project${where} but no run has reached viaSocket yet. Find out why, fix it and make the first run:`,
        '1. Check .env has VIASOCKET_ORG_ID, VIASOCKET_PROJECT_ID and VIASOCKET_EMBED_SECRET, and that the secret is only used on the server.',
        '2. Make sure the running app has loaded them (restart it if .env changed).',
        `3. Run the check from ${SETUP_URL}. A list means setup is right; a 401 means the secret or ids are wrong.`,
        `4. Then run one real action once with a test connection, as ${TEST_URL} says.`,
        'Tell me what you found and what you fixed.',
    ];
}

export function buildSetupPrompt(query) {
    const { mode, org, project, name } = query;
    const lines = mode === 'run' ? runLines(org, project) : keysLines(org, project);
    const title = mode === 'run' ? `Get ${name} running` : `Finish setting up ${name}`;
    const lede = mode === 'run' ? RUN_LEDE : KEYS_LEDE;

    return {
        title,
        lede,
        lines,
        prompt: lines.join('\n'),
    };
}
