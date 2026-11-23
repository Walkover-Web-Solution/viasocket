/**
 * Publish step: derive the Agent Skills Discovery digest from the install markdown
 * so metadata.version and the reinstall line stay tied to one bump point.
 *
 * An ES module (.mjs), like the builder it imports: a CommonJS require() of an ES module only
 * works on Node 22.12+, and the Cloudflare Pages build runs an older Node.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { buildViasocketIntegrationsSkillInstallMd } from '../src/utils/buildViasocketIntegrationsSkillInstall.mjs';

const agentSkillsPath = fileURLToPath(new URL('../src/utils/agentSkills.js', import.meta.url));
const md = buildViasocketIntegrationsSkillInstallMd();
const digest = `sha256:${createHash('sha256').update(md).digest('hex')}`;

let agentSkillsSource = readFileSync(agentSkillsPath, 'utf8');
const digestPattern = /export const VIASOCKET_INTEGRATIONS_DIGEST =\s*\n?\s*'sha256:[a-f0-9A-FPLACEHOLDER]+';/;
if (!digestPattern.test(agentSkillsSource)) {
    console.error('generate-agent-skills: could not find VIASOCKET_INTEGRATIONS_DIGEST in agentSkills.js');
    process.exit(1);
}
agentSkillsSource = agentSkillsSource.replace(
    digestPattern,
    `export const VIASOCKET_INTEGRATIONS_DIGEST =\n    '${digest}';`,
);
writeFileSync(agentSkillsPath, agentSkillsSource);
console.log(`generate-agent-skills: digest ${digest}`);
