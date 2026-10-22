// Builds src/data/blogs.json from the Markdown posts in _posts/blogs, for the /blogs pages.
// The pages run on the edge and can't read files, so the posts are bundled as JSON.
// Runs before `npm run dev` and `npm run build`; run it by hand after editing a post while the dev server is up:
//   node build-utilities/generate-blogs.js
// Files starting with "_" (like _template.md) and posts with `draft: true` are left out.
// The Markdown is turned into HTML here (GitHub-flavoured: tables, strikethrough, autolinks);
// raw HTML in a post is escaped, not rendered. A "## FAQ" section with "### question" headings
// becomes toggles, and the "##" headings become the quicklinks at the top of the post.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

const POSTS_DIR = path.resolve('_posts/blogs');
const OUT_FILE = path.resolve('src/data/blogs.json');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const AUTHORS_DIR = path.resolve('public/blogs/authors');

// A writer's photo is found by name: "Abhijeet Singh" → public/blogs/authors/abhijeet-singh.jpg (or .png / .webp).
function authorImage(name) {
    if (!name) return '';
    const base = name
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const ext = ['jpg', 'jpeg', 'png', 'webp'].find((e) => fs.existsSync(path.join(AUTHORS_DIR, `${base}.${e}`)));
    return ext ? `/blogs/authors/${base}.${ext}` : '';
}

// Links leaving viasocket.com open in a new tab; images load lazily.
function finishHtml(html) {
    return html
        .replace(/<a href="(https?:\/\/[^"]+)"/g, (tag, href) =>
            /^https?:\/\/([a-z0-9-]+\.)*viasocket\.com(\/|$)/i.test(href) ? tag : `${tag} target="_blank" rel="noopener noreferrer"`
        )
        .replace(/<img /g, '<img loading="lazy" ');
}

const FAQ_HEADING = /<h2>(?:FAQs?|Frequently asked questions)<\/h2>/i;
const stripTags = (html) =>
    html
        .replace(/<[^>]+>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

// A "## FAQ" section: each "### question" and the text under it becomes a toggle (<details>), and the
// questions are kept for the page's FAQPage structured data. The section ends at the next ## heading.
function faqToggles(html) {
    const head = html.match(FAQ_HEADING);
    if (!head) return { html, faqs: [] };
    const start = head.index + head[0].length;
    const next = html.slice(start).search(/<h2>/);
    const end = next === -1 ? html.length : start + next;
    const parts = html.slice(start, end).split(/<h3>([\s\S]*?)<\/h3>/);
    if (parts.length < 3) return { html, faqs: [] };

    const faqs = [];
    let section = parts[0].trim() ? `${parts[0].trim()}\n` : '';
    section += '<div class="faq">\n';
    for (let i = 1; i < parts.length; i += 2) {
        const question = parts[i];
        const answer = (parts[i + 1] || '').trim();
        faqs.push({ q: stripTags(question), a: stripTags(answer) });
        section += `<details${i === 1 ? ' open' : ''}><summary>${question}</summary>\n${answer}\n</details>\n`;
    }
    section += '</div>\n';
    return { html: html.slice(0, start) + '\n' + section + html.slice(end), faqs };
}

// Every "##" heading gets an id (from its text) so the quicklinks at the top of the post can jump to it.
function headingIds(html) {
    const toc = [];
    const used = new Set();
    const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
        const text = stripTags(inner);
        const base =
            text
                .toLowerCase()
                .replace(/['’]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') || 'section';
        let id = base;
        for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
        used.add(id);
        toc.push({ id, text });
        return `<h2 id="${id}">${inner}</h2>`;
    });
    return { html: out, toc };
}

function withSections(html) {
    const { html: withFaq, faqs } = faqToggles(html);
    const { html: out, toc } = headingIds(withFaq);
    return { html: out, toc, faqs };
}

function readPost(file, toHtml) {
    const slug = file.replace(/\.md$/, '');
    const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'), {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
    });
    const problems = [];
    if (!SLUG.test(slug)) problems.push('the file name must be lowercase words joined by hyphens, like my-first-post.md');
    if (!data.title) problems.push('missing "title"');
    if (!data.date || Number.isNaN(Date.parse(data.date))) problems.push('missing or invalid "date" (use YYYY-MM-DD)');
    if (problems.length) throw new Error(`_posts/blogs/${file}: ${problems.join('; ')}`);

    const words = content.split(/\s+/).filter(Boolean).length;
    return {
        slug,
        title: String(data.title),
        description: data.description ? String(data.description) : '',
        date: new Date(data.date).toISOString().slice(0, 10),
        author: data.author ? String(data.author) : '',
        authorImage: authorImage(data.author ? String(data.author) : ''),
        category: data.category ? String(data.category) : '',
        image: data.image ? String(data.image) : '',
        draft: data.draft === true,
        minutes: Math.max(1, Math.round(words / 220)),
        ...withSections(toHtml(content.trim())),
    };
}

async function generateBlogs() {
    const { micromark } = await import('micromark');
    const { gfm, gfmHtml } = await import('micromark-extension-gfm');
    const toHtml = (md) => finishHtml(micromark(md, { extensions: [gfm()], htmlExtensions: [gfmHtml()] }));

    const files = fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
    const posts = files
        .map((f) => readPost(f, toHtml))
        .filter((p) => !p.draft)
        .map(({ draft, ...p }) => p)
        .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, `${JSON.stringify({ _comment: 'Generated from _posts/blogs by build-utilities/generate-blogs.js. Edit the Markdown, not this file.', posts }, null, 2)}\n`);
    console.log(`[blogs] ${posts.length} post${posts.length === 1 ? '' : 's'} written to src/data/blogs.json`);
}

generateBlogs().catch((err) => {
    console.error(`[blogs] ${err.message}`);
    process.exit(1);
});
