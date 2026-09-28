'use client';

import { useLang } from './LangContext';
import { CodeBlock } from './CodeBlock';

const LABELS = { curl: 'cURL', node: 'Node.js', python: 'Python' };

export function LangBlock({ panes }) {
    const [lang, setLang] = useLang();
    const available = Object.keys(panes);
    const pick = available.includes(lang) ? lang : available[0];

    return (
        <div className="border border-docs-rule rounded-md overflow-hidden">
            <div role="tablist" className="flex flex-wrap bg-docs-surface border-b border-docs-rule">
                {available.map((key) => (
                    <button
                        key={key}
                        role="tab"
                        type="button"
                        aria-selected={pick === key}
                        onClick={() => setLang(key)}
                        className={`appearance-none bg-transparent border-0 border-b-2 font-docs-mono text-[12.5px] px-3.5 py-[9px] cursor-pointer leading-[1.4] ${
                            pick === key ? 'text-docs-accent border-docs-accent font-medium' : 'text-docs-muted border-transparent hover:text-docs-ink'
                        }`}
                    >
                        {LABELS[key]}
                    </button>
                ))}
            </div>
            <div className="[&_pre]:border-0 [&_pre]:rounded-none">
                <CodeBlock>{panes[pick]}</CodeBlock>
            </div>
        </div>
    );
}
