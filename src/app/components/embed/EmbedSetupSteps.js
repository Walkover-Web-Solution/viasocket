const jwtPayload = `// Sign this payload with your secret key
// (generate JWT on your backend)

{
  "org_id":            "your_org_id",
  "project_id":        "your_project_id",
  "unique_identifier": "<unique_id_to_isolate_flows>"
}`;

const embedScript = `<!-- Paste into your frontend -->

<script
  id="viasocket-embed"
  src="https://embed.viasocket.com/embed.js"
  embedToken="YOUR_EMBED_TOKEN">
</script>`;

function CodeBlock({ code, label, tokens }) {
    const highlight = (line) => {
        if (line.trim().startsWith('//')) {
            return <span className="text-gray-500">{line}</span>;
        }
        // Simple token-based coloring
        const parts = [];
        let remaining = line;
        const regex = /("[^"]*"|<\/?[a-zA-Z][^>\s]*|[a-zA-Z_-]+=|[{}\[\],:]|<!--[\s\S]*?-->)/g;
        let lastIdx = 0;
        let m;
        while ((m = regex.exec(line)) !== null) {
            if (m.index > lastIdx) parts.push(<span key={parts.length}>{line.slice(lastIdx, m.index)}</span>);
            const tok = m[0];
            let cls = 'text-gray-200';
            if (tok.startsWith('<!--')) cls = 'text-gray-500';
            else if (tok.startsWith('"')) cls = 'text-orange-300';
            else if (tok.startsWith('</') || tok.startsWith('<')) cls = 'text-red-400';
            else if (tok.endsWith('=')) cls = 'text-green-400';
            else if (/^[{}\[\],:]$/.test(tok)) cls = 'text-gray-400';
            parts.push(
                <span key={parts.length} className={cls}>
                    {tok}
                </span>
            );
            lastIdx = m.index + tok.length;
        }
        if (lastIdx < line.length) parts.push(<span key={parts.length}>{line.slice(lastIdx)}</span>);
        return parts;
    };

    return (
        <div className="bg-[#0B1220] overflow-hidden flex flex-col flex-1 mt-auto">
            <pre className="px-6 py-5 text-[12px] leading-6 font-mono overflow-x-auto text-gray-200 flex-1">
                {code.split('\n').map((line, i) => (
                    <div key={i}>{line ? highlight(line) : '\u00A0'}</div>
                ))}
            </pre>
            <div className="px-6 py-2 text-sm tracking-wider text-gray-500 border-t border-white/5">{label}</div>
        </div>
    );
}

export default function EmbedSetupSteps() {
    return (
        <div className="container">
            <div className="border bg-white p-8 md:p-12">
                <h2 className="h2">Set up the embed in two steps</h2>
                <p className="sub__h1 mt-6">
                    Add integrations to your product in minutes - no OAuth or webhook infrastructure required.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 01</span>
                        <h3 className="text-xl md:text-2xl font-medium">Generate the embed token</h3>
                        <p className="text-gray-600 mb-4">Generate a secure token for each user.</p>
                        <CodeBlock code={jwtPayload} label="JSON PAYLOAD" />
                    </div>

                    <div className="border p-6 flex flex-col h-full bg-[#FAFAFA]">
                        <span className="text-xs font-bold tracking-wider text-accent mb-3">STEP 02</span>
                        <h3 className="text-xl md:text-2xl font-medium">Add the embed script</h3>
                        <p className="text-gray-600 mb-4">Generate a secure token for each user.</p>
                        <CodeBlock code={embedScript} label="HTML" />
                    </div>
                </div>
            </div>
        </div>
    );
}
