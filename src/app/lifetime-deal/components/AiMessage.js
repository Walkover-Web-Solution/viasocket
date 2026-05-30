'use client';

export default function AiMessage({ showAiIntro, chatExiting, stepsVisible, aiIntro, aiSteps }) {
    return (
        showAiIntro && (
            <div
                className={`flex items-start gap-[9px] transition-all duration-[380ms] opacity-100 translate-y-0 ${
                    chatExiting ? '!opacity-0 !-translate-y-6' : ''
                }`}
            >
                <div className="w-[30px] h-[30px] rounded-full bg-accent text-white text-[9.5px] font-bold flex items-center justify-center shrink-0">
                    AI
                </div>
                <div className="bg-[#f8f8f8] border border-black/[0.07] rounded-[4px_14px_14px_14px] px-4 py-[14px] text-[13px] text-[#1a1a1a] leading-[1.56] max-w-[85%]">
                    <p>{aiIntro}</p>
                    <p className="font-semibold text-[12.5px] text-[#111] mt-[10px] mb-2">
                        Here&apos;s the plan:
                    </p>
                    <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                        {aiSteps.map((s, idx) => (
                            <li
                                key={s}
                                className={`flex items-center gap-2 text-[12.5px] text-[#1a1a1a] transition-all duration-300 ${
                                    idx < stepsVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-[5px]'
                                }`}
                            >
                                <span className="w-[18px] h-[18px] rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-2.5 h-2.5 fill-none stroke-accent [stroke-width:2.5] [stroke-linecap:round] [stroke-linejoin:round]"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                {s}
                            </li>
                        ))}
                    </ul>
                    {stepsVisible >= aiSteps.length && (
                        <p className="text-accent font-normal mt-2 text-[12.5px]">
                            ✓ Workflow ready.
                        </p>
                    )}
                </div>
            </div>
        )
    );
}
