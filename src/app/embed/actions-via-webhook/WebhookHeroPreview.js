'use client';

export default function WebhookHeroPreview({ scenario, fade }) {
    return (
        <div className="relative flex items-center justify-center">
            <div className="flex items-stretch w-full h-[420px] mx-auto rounded-xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.1)] max-[768px]:max-w-[380px]">
                {/* Left: POST request card */}
                <div className="bg-[#0d0d14] w-[196px] shrink-0 flex flex-col border-r border-white/[0.09] max-[768px]:w-[155px]">
                    <div className="flex items-center gap-[7px] py-[11px] px-[13px] border-b border-white/[0.08] shrink-0">
                        <span className="bg-[#059669] text-white text-[8.5px] font-medium tracking-[0.6px] py-[3px] px-[7px] rounded font-sans shrink-0">
                            POST
                        </span>
                        <span className="font-mono text-[8.5px] text-white/[0.32] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                            flow.viasocket.com/wh/…
                        </span>
                    </div>
                    <div
                        className={`py-[13px] px-[13px] flex-1 font-mono text-[11px] leading-[1.9] text-[#e2e8f0] transition-opacity duration-[250ms] whitespace-pre-wrap max-[768px]:text-[9.5px] max-[768px]:p-[10px] ${fade ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <span className="text-[#86efac]">&quot;event&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;{scenario.event}&quot;</span>,{'\n'}
                        <span className="text-[#86efac]">&quot;user_id&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">&quot;usr_92k&quot;</span>,{'\n'}
                        <span className="text-[#86efac]">&quot;amount&quot;</span>:{' '}
                        <span className="text-[#fbbf24]">{scenario.value}</span>
                    </div>
                    <div className="py-[9px] px-[13px] border-t border-white/[0.08] flex items-center gap-[7px] shrink-0">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#059669] shrink-0 animate-[whDot_1.5s_ease-in-out_infinite]" />
                        <span className="text-[9.5px] font-semibold text-white/[0.38] font-sans tracking-[0.1px]">
                            Sending…
                        </span>
                    </div>
                </div>

                {/* Right: Execution log */}
                <div className="bg-white flex-1 flex flex-col">
                    <div className="flex items-center justify-between py-[11px] px-[13px] border-b border-black/[0.07] shrink-0">
                        <span className="text-[10px] font-bold text-[#111] font-sans tracking-[-0.1px]">
                            Actions executed
                        </span>
                        <span
                            className={`text-[8px] font-bold py-0.5 px-2 rounded-full font-sans tracking-[0.3px] transition-colors duration-300 ${fade ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-[#dcfce7] text-[#15803d]'}`}
                        >
                            {scenario.pill}
                        </span>
                    </div>
                    {scenario.rows.map((row, i) => (
                        <div
                            className="flex items-center gap-[9px] py-[9px] px-[13px] border-b border-black/[0.06] flex-1 last:border-b-0"
                            key={i}
                        >
                            <div className="w-[27px] h-[27px] rounded-[7px] bg-[#f4f4f5] border border-black/[0.07] flex items-center justify-center shrink-0 overflow-hidden">
                                <img className="w-4 h-4 object-contain" src={row.img} alt="" loading="lazy" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-bold text-[#111] font-sans whitespace-nowrap overflow-hidden text-ellipsis leading-[1.2]">
                                    {row.name}
                                </div>
                                <div className="text-[9.5px] text-[#9ca3af] font-sans whitespace-nowrap overflow-hidden text-ellipsis mt-px leading-[1.2]">
                                    {row.sub}
                                </div>
                            </div>
                            <span
                                className={`text-[7.5px] font-medium py-0.5 px-1.5 rounded-full font-sans tracking-[0.4px] shrink-0 transition-colors duration-300 ${fade ? 'bg-[#f3f4f6] text-[#9ca3af]' : 'bg-[#dcfce7] text-[#16a34a]'}`}
                            >
                                {fade ? 'WAIT' : 'DONE'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
