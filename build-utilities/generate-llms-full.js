// Builds public/llms-full.txt from markdown content in public/ (llms.txt, homepage.md, pricing.md, not-found.md)
// for AI agents that require full single-file context (read.llms-full).
// Runs during predev and prebuild (via generate-blogs.js or standalone):
//   node build-utilities/generate-llms-full.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LLMS_FILE = path.join(ROOT_DIR, 'public/llms.txt');
const HOMEPAGE_FILE = path.join(ROOT_DIR, 'public/homepage.md');
const PRICING_FILE = path.join(ROOT_DIR, 'public/pricing.md');
const AGENTS_FILE = path.join(ROOT_DIR, 'public/AGENTS.md');
const NOT_FOUND_FILE = path.join(ROOT_DIR, 'public/not-found.md');
const OUT_FILE = path.join(ROOT_DIR, 'public/llms-full.txt');

const MIN_CHARS = 5000;
const MAX_CHARS = 500000;

function demoteHeadings(markdown, levelOffset = 1) {
    const hashes = '#'.repeat(levelOffset);
    return markdown.replace(/^(#{2,5})\s+(.*)$/gm, `${hashes}$1 $2`);
}

function generateLlmsFull() {
    if (!fs.existsSync(LLMS_FILE)) {
        throw new Error(`Missing ${LLMS_FILE}`);
    }

    const llmsContent = fs.readFileSync(LLMS_FILE, 'utf8')
        .replace(/https:\/\/viasocket\.com\//g, '/')
        .replace(/https:\/\/viasocket\.com/g, 'viasocket.com');

    // Extract H1 and summary blockquote
    const headerMatch = llmsContent.match(/^# viaSocket\s*\n+> ([\s\S]*?)(?=\n+## )/);
    if (!headerMatch) {
        throw new Error('Could not parse H1 and summary blockquote from public/llms.txt');
    }
    const blockquote = headerMatch[1].trim();
    const llmsSections = llmsContent.slice(headerMatch[0].length).trim();

    const sections = [
        '# viaSocket',
        '',
        `> ${blockquote}`,
        '',
        llmsSections,
    ];

    // Developer docs reference
    sections.push(
        '',
        '## Developer documentation',
        '',
        'Developer documentation, SDK references, action schemas, and trigger guides are hosted on the flow app.',
        '- [Documentation index](https://flow.viasocket.com/llms.txt): entry point for plugs and the SDK.',
        '- [Full skill](https://flow.viasocket.com/documentation/skill.md): the map of every feature, with current URLs, keys and rules.',
        '- [Skill install](https://flow.viasocket.com/documentation/skill-install.md): pointer that fetches the current skill for coding agents.',
        '- [Developer portal](https://flow.viasocket.com/documentation): all guides, including plugs, triggers and actions.',
        '- [Quickstart](/developers/docs): install the SDK, sign a JWT for your user, and run your first Apps API call.',
        '- [Docs MCP server](/docs/mcp): public, read-only Model Context Protocol over `/docs` on this host.'
    );

    // Markdown homepage
    if (fs.existsSync(HOMEPAGE_FILE)) {
        let hpContent = fs.readFileSync(HOMEPAGE_FILE, 'utf8').trim();
        // Remove the top H1 "# viaSocket"
        hpContent = hpContent.replace(/^# viaSocket\s*\n+/, '');
        // Demote ## to ### and ### to ####
        hpContent = demoteHeadings(hpContent, 1);
        sections.push(
            '',
            '## Homepage (/homepage.md)',
            '',
            hpContent
        );
    }

    // Pricing markdown
    if (fs.existsSync(PRICING_FILE)) {
        let pricingContent = fs.readFileSync(PRICING_FILE, 'utf8').trim();
        // Remove top H1 "# viaSocket pricing"
        pricingContent = pricingContent.replace(/^# viaSocket pricing\s*\n+/, '');
        // Demote ## to ###
        pricingContent = demoteHeadings(pricingContent, 1);
        sections.push(
            '',
            '## Pricing (/pricing.md)',
            '',
            pricingContent
        );
    }

    // Coding agent instructions
    if (fs.existsSync(AGENTS_FILE)) {
        let agentsContent = fs.readFileSync(AGENTS_FILE, 'utf8').trim();
        agentsContent = agentsContent.replace(/^# viaSocket\s*\n+/, '');
        agentsContent = demoteHeadings(agentsContent, 1);
        sections.push(
            '',
            '## Coding agent instructions (/AGENTS.md)',
            '',
            agentsContent
        );
    }

    // Not found page
    if (fs.existsSync(NOT_FOUND_FILE)) {
        let nfContent = fs.readFileSync(NOT_FOUND_FILE, 'utf8').trim();
        nfContent = nfContent.replace(/^# Page not found\s*\n+/, '');
        nfContent = demoteHeadings(nfContent, 1);
        sections.push(
            '',
            '## Not found response (/not-found.md)',
            '',
            nfContent
        );
    }

    const fullText = sections.join('\n') + '\n';

    if (fullText.length < MIN_CHARS) {
        throw new Error(`Generated llms-full.txt too small (${fullText.length} chars < ${MIN_CHARS})`);
    }
    if (fullText.length > MAX_CHARS) {
        throw new Error(`Generated llms-full.txt too large (${fullText.length} chars > ${MAX_CHARS})`);
    }

    fs.writeFileSync(OUT_FILE, fullText, 'utf8');
    console.log(`[llms-full] ${fullText.length} characters written to public/llms-full.txt`);
    return fullText;
}

if (require.main === module) {
    try {
        generateLlmsFull();
    } catch (err) {
        console.error(`[llms-full] ${err.message}`);
        process.exit(1);
    }
}

module.exports = { generateLlmsFull };
