/**
 * Runs generate-agent-skills only when Agent Skills Discovery routes are present.
 * On main before those routes ship, the version/digest helpers stay in the repo
 * without rewriting src/utils/agentSkills.js during prebuild.
 */
const fs = require('node:fs');
const path = require('node:path');

const route = path.join(__dirname, '../src/app/.well-known/agent-skills/index.json/route.js');

if (!fs.existsSync(route)) {
    console.log('prebuild-agent-skills: skipped (no /.well-known/agent-skills routes in this tree)');
    process.exit(0);
}

// eslint-disable-next-line import/no-dynamic-require, global-require
require('./generate-agent-skills.js');