const VARIANT = {
    default: 'border-docs-accent bg-docs-accent-soft',
    warn: 'border-docs-warn bg-docs-warn-soft',
    good: 'border-docs-good bg-docs-good-soft',
};

export function Callout({ variant = 'default', title, children }) {
    return (
        <div className={`border-l-[3px] rounded-r-[5px] p-[14px_16px] grid gap-2 ${VARIANT[variant]}`}>
            {title && <h4 className="font-docs-mono text-[12px] tracking-[0.08em] uppercase font-medium m-0 opacity-75">{title}</h4>}
            <div className="grid gap-2 text-[15px] leading-[1.6] [&_p]:m-0">{children}</div>
        </div>
    );
}

export function Endpoint({ verb, url }) {
    return (
        <div className="flex flex-wrap items-baseline gap-1 font-docs-mono text-[13.5px] bg-docs-surface border border-docs-rule rounded-md px-3 py-2.5 [overflow-wrap:anywhere]">
            <span className="font-docs-mono text-[11px] font-medium tracking-[0.06em] px-[7px] py-0.5 rounded bg-docs-good-soft text-docs-good border border-docs-good mr-2 align-[2px]">{verb}</span>
            {url}
        </div>
    );
}

export function ClickSteps({ items }) {
    return (
        <ol className="m-0 p-0 list-none flex flex-col border border-docs-rule rounded-md overflow-hidden">
            {items.map(([title, note], i) => (
                <li key={title} className={`flex gap-3 p-[12px_15px] items-start ${i < items.length - 1 ? 'border-b border-docs-rule' : ''}`}>
                    <span className="font-docs-mono text-[12px] text-docs-muted bg-docs-surface border border-docs-rule rounded min-w-[22px] h-[22px] inline-flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div className="grid gap-[3px] min-w-0">
                        <strong className="font-semibold">{title}</strong>
                        <em className="not-italic text-docs-muted text-[14px]">{note}</em>
                    </div>
                </li>
            ))}
        </ol>
    );
}

export function DocTable({ head, rows }) {
    return (
        <div className="overflow-x-auto border border-docs-rule rounded-md">
            <table className="border-collapse w-full text-[14.5px] min-w-[560px]">
                <thead>
                    <tr>
                        {head.map((h) => (
                            <th key={h} className="text-left px-3.5 py-2.5 border-b border-docs-rule bg-docs-surface font-semibold text-[13px]">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className={`text-left px-3.5 py-2.5 align-top ${i < rows.length - 1 ? 'border-b border-docs-rule' : ''}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function StepH2({ n, children }) {
    return (
        <h2 className="flex items-center gap-0 text-[clamp(21px,2.8vw,27px)] leading-[1.2] font-semibold tracking-[-0.015em] mt-3.5">
            <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-docs-accent text-white font-docs-mono text-[13px] font-medium mr-2.5 shrink-0">{n}</span>
            {children}
        </h2>
    );
}

export function Code({ children }) {
    return <code className="font-docs-mono text-[0.88em] bg-docs-surface border border-docs-rule rounded px-1 py-px [overflow-wrap:break-word]">{children}</code>;
}
