// The hero picture on a tool's page: that tool's own example, what goes in and what comes back
// (toolContent.js `demo`), in the site's window style. Server-rendered and static.

const label = 'font-[family-name:var(--mono)] text-[11px] uppercase tracking-[0.08em] text-[color:var(--ink-3)]';
const mono = 'font-[family-name:var(--mono)] text-[12.5px] leading-[1.6]';

function Waveform() {
    const bars = [6, 14, 9, 20, 12, 24, 16, 8, 18, 26, 14, 10, 22, 12, 6, 16, 24, 10, 18, 8, 14, 20, 9, 12];
    return (
        <svg viewBox={`0 0 ${bars.length * 6} 28`} className="h-7 w-full max-w-[220px]" aria-hidden="true">
            {bars.map((h, i) => (
                <rect key={i} x={i * 6} y={(28 - h) / 2} width="3" height={h} fill="currentColor" />
            ))}
        </svg>
    );
}

/** A generated illustration: a sunset city with a rocket, drawn in SVG. */
function Illustration() {
    return (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="block h-[200px] w-full" role="img" aria-label="Generated illustration: a rocket over a city at sunset">
            <defs>
                <linearGradient id="tv-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3b2a6b" />
                    <stop offset="0.55" stopColor="#d9617a" />
                    <stop offset="1" stopColor="#f6b26b" />
                </linearGradient>
            </defs>
            <rect width="320" height="180" fill="url(#tv-sky)" />
            <circle cx="232" cy="122" r="30" fill="#ffd48a" opacity="0.9" />
            <path d="M210 30c0-14 8-24 14-28 6 4 14 14 14 28l-4 30h-20z" fill="#f1efe9" />
            <circle cx="224" cy="36" r="5" fill="#3b2a6b" />
            <path d="M214 56l-10 12 12-2zM234 56l10 12-12-2z" fill="#f1efe9" />
            <path d="M218 62h12l-6 26z" fill="#ffb347" />
            <path d="M0 180V130h22v-18h18v26h16v-40h24v40h14v-22h20v38h18v-56h26v56h12v-30h22v34h16v-20h20v42h18v-28h24v36h20v-18h12v48z" fill="#1d1730" />
        </svg>
    );
}

/** One side of the example: what goes in, or what comes back. */
function Part({ p }) {
    if (!p) return null;
    switch (p.kind) {
        case 'code':
            return <pre className={`m-0 overflow-x-auto whitespace-pre ${mono} text-[color:var(--ink-2)]`}>{p.value}</pre>;
        case 'url':
            return (
                <div className={`flex items-center gap-2 border border-[color:var(--line-2)] bg-[var(--s2)] px-3 py-2 ${mono}`}>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[color:var(--ink-3)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span className="truncate">{p.value}</span>
                </div>
            );
        case 'audio':
            return (
                <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-[var(--btn-bg)] text-[color:var(--btn-ink)]" aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span className="min-w-0 flex-1 text-[color:var(--ink-2)]">
                        <Waveform />
                    </span>
                    <span className={`${mono} text-[color:var(--ink-3)]`}>{p.value}</span>
                </div>
            );
        case 'rows':
            return (
                <dl className="m-0 grid gap-2">
                    {p.rows.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[96px_1fr] gap-3 text-[13.5px]">
                            <dt className="text-[color:var(--ink-3)]">{k}</dt>
                            <dd className="m-0 font-medium">{v}</dd>
                        </div>
                    ))}
                </dl>
            );
        case 'bullets':
            return (
                <ul className="m-0 grid list-none gap-2 p-0 text-[14px]">
                    {p.items.map((x) => (
                        <li key={x} className="flex gap-2.5">
                            <span className="mt-[9px] h-1 w-1 shrink-0 bg-[var(--ink)]" aria-hidden="true" />
                            {x}
                        </li>
                    ))}
                </ul>
            );
        case 'pdf':
            return (
                <div className="flex justify-center bg-[var(--s2)] px-6 py-5">
                    <div className="w-full max-w-[230px] bg-white p-5 text-[#111113] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)]">
                        <div className="flex items-center justify-between">
                            <b className="text-[14px]">{p.title}</b>
                            <span className="bg-[#111113] px-1.5 py-0.5 font-[family-name:var(--mono)] text-[9px] text-white">PDF</span>
                        </div>
                        <div className="mt-3 grid gap-1.5 font-[family-name:var(--mono)] text-[10px] text-[#4a4946]">
                            {p.lines.map((l, i) => (
                                <div key={i} className={`whitespace-pre ${i === p.lines.length - 1 ? 'border-t border-[#e5e5e2] pt-1.5 font-semibold text-[#111113]' : ''}`}>
                                    {l}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 grid gap-1" aria-hidden="true">
                            <span className="h-1 w-full bg-[#ececea]" />
                            <span className="h-1 w-4/5 bg-[#ececea]" />
                        </div>
                    </div>
                </div>
            );
        case 'image':
            return <Illustration />;
        case 'chat':
            return (
                <div className="bg-[#e7ded3] px-4 py-5">
                    <div className="ml-auto max-w-[88%] bg-[#d9fdd3] px-3 py-2 text-[13.5px] leading-snug text-[#111b21] shadow-sm">
                        {p.value}
                        <div className="mt-1 text-right text-[11px] text-[#667781]">{p.meta}</div>
                    </div>
                </div>
            );
        case 'big':
            return (
                <div>
                    <div className="text-[34px] font-semibold tracking-[-0.02em]">{p.value}</div>
                    {p.note && <div className="mt-1 text-[12.5px] text-[color:var(--ink-3)]">{p.note}</div>}
                </div>
            );
        default:
            return <p className="m-0 text-[14px] leading-relaxed text-[color:var(--ink-2)]">{p.value}</p>;
    }
}

// Parts drawn edge to edge in their box (no padding of their own).
const BLEED = new Set(['pdf', 'image', 'chat']);

export default function ToolVisual({ tool, demo, action }) {
    const { in: input, out } = demo;
    return (
        <figure className="m-0 w-full border border-[color:var(--line-2)] bg-[var(--s1)] shadow-[var(--sh-win)]" aria-label={`${tool.name}: an example input and its result`}>
            <div className="flex items-center gap-3 border-b border-[color:var(--line)] px-5 py-3.5">
                <img src={tool.icon} alt="" width={26} height={26} style={{ width: 26, height: 26 }} className="shrink-0 object-contain" />
                <b className="min-w-0 flex-1 truncate text-[14.5px] font-semibold">{tool.name}</b>
                <span className={label}>Example</span>
            </div>

            <div className="px-5 py-4">
                <div className={`mb-2.5 ${label}`}>{input.label || 'Input'}</div>
                <Part p={input} />
            </div>

            <div className="flex items-center gap-3 border-y border-[color:var(--line)] bg-[var(--s2)] px-5 py-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
                <span className={`min-w-0 flex-1 truncate ${mono}`}>{action || tool.name}</span>
                <span className={`${mono} text-[color:var(--ink-3)]`}>200</span>
            </div>

            <div className={BLEED.has(out.kind) ? '' : 'px-5 py-4'}>
                <div className={`${BLEED.has(out.kind) ? 'px-5 pb-2.5 pt-4' : 'mb-2.5'} ${label}`}>{out.label || 'Result'}</div>
                <Part p={out} />
            </div>
        </figure>
    );
}
