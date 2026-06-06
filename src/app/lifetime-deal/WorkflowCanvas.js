'use client';

export default function WorkflowCanvas({ canvasOn, nodesVisible, publishOn, nodes }) {
    return (
        <div
            aria-hidden={!canvasOn}
            className={`absolute inset-0 flex flex-col bg-[#f9f9f9] transition-opacity duration-[450ms] z-10 ${
                canvasOn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div className="flex items-center gap-2.5 px-[22px] py-[14px] pb-3 border-b border-black/[0.07] bg-white shrink-0">
                <span className="w-[9px] h-[9px] rounded-full bg-[#22c55e] shrink-0 shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
                <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] font-bold text-[#111] tracking-[-0.1px]">
                        Workflow Generated Successfully
                    </span>
                    <span className="text-[11.5px] text-[#999]">
                        Your automation is ready to deploy.
                    </span>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-stretch px-5 pt-3.5 pb-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {nodes.map((n, i) => {
                    const nodeIdx = i * 2; // 0,2,4,6
                    const connIdx = nodeIdx + 1;
                    const nodeOn = nodesVisible > nodeIdx;
                    const connOn = nodesVisible > connIdx;
                    return (
                        <div key={n.id}>
                            <div
                                className={`flex items-center gap-[13px] w-full bg-white border border-black/[0.07] rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ${
                                    nodeOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}
                            >
                                <div className="w-5 h-5 rounded-full bg-[#F2F2F2] text-[#888] text-[9.5px] font-bold flex items-center justify-center shrink-0">
                                    {n.id}
                                </div>
                                <div
                                    className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center shrink-0 [&_svg]:w-[14px] [&_svg]:h-[14px] [&_svg]:fill-none [&_svg]:[stroke-width:2] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
                                    style={{ background: n.bg, color: n.typeColor }}
                                >
                                    <span className="contents [&_svg]:stroke-[currentColor]">
                                        {n.icon}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-[2px]">
                                        <span
                                            className="text-[9px] font-bold tracking-[0.12em] uppercase"
                                            style={{ color: n.typeColor }}
                                        >
                                            {n.type}
                                        </span>
                                        <span className="text-[#D1D5DB] text-[10px]">·</span>
                                        <span className="text-[12.5px] font-semibold text-[#111] tracking-[-0.1px] truncate">
                                            {n.label}
                                        </span>
                                    </div>
                                    <div className="text-[10.5px] text-[#999] truncate">
                                        {n.detail}
                                    </div>
                                </div>
                                <div className="flex items-center gap-[5px] bg-[rgba(34,197,94,0.09)] rounded-full pl-1.5 pr-[9px] py-[3px] shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                                    <span className="text-[9.5px] font-semibold text-[#16a34a] tracking-[0.02em]">
                                        Ready
                                    </span>
                                </div>
                            </div>
                            {i < nodes.length - 1 && (
                                <div
                                    className={`flex items-center h-[26px] pl-[53px] transition-opacity duration-[400ms] ${
                                        connOn ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <svg className="w-4 h-[26px] overflow-visible" viewBox="0 0 16 26">
                                        <line
                                            x1="8"
                                            y1="0"
                                            x2="8"
                                            y2="18"
                                            stroke="#D1D5DB"
                                            strokeWidth="1.5"
                                            strokeDasharray="18"
                                            strokeDashoffset={connOn ? 0 : 18}
                                            style={{ transition: 'stroke-dashoffset 450ms ease' }}
                                        />
                                        <polyline
                                            points="3,13 8,20 13,13"
                                            fill="none"
                                            stroke="#D1D5DB"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="flex justify-center pt-[18px] pb-1">
                    <button
                        type="button"
                        className={`inline-flex items-center gap-2 bg-[#1A1A1A] text-white/90 border border-white/10 rounded-[10px] pl-3.5 pr-4 py-[9px] text-[13px] font-semibold tracking-[-0.1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_12px_rgba(10,10,10,0.18)] hover:bg-[#262626] hover:border-white/[0.16] transition-all duration-[400ms] ${
                            publishOn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1.5'
                        }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.4,0.64,1)' }}
                    >
                        <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] fill-[#4ADE80]">
                            <polygon points="13 2 3 14 11 14 9 22 21 10 13 10 15 2" />
                        </svg>
                        Publish Flow
                    </button>
                </div>
            </div>
        </div>
    );
}
