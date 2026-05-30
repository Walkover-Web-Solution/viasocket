'use client';

export default function InputArea({ chips }) {
    return (
        <div className="border-t border-black/[0.07] px-[18px] pt-[14px] pb-4 bg-white">
            <div className="flex flex-wrap gap-[7px] mb-2.5">
                {chips.map((c) => (
                    <button
                        key={c}
                        type="button"
                        className="text-[11.5px] font-medium text-[#666] bg-white border border-black/[0.11] rounded-full px-[13px] py-[5px] hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent hover:shadow-[0_3px_10px_rgba(168,32,13,0.10)] transition-all duration-150"
                    >
                        {c}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2.5 bg-[#f7f7f7] border border-black/[0.09] rounded-[11px] pl-[13px] pr-2.5 py-[9px]">
                <div className="w-[22px] h-[22px] rounded-md bg-accent flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
                <input
                    className="flex-1 bg-transparent border-none outline-none text-[12.5px] text-[#999] cursor-default"
                    type="text"
                    placeholder="Describe your workflow, paste a webhook URL, or ask anything..."
                    readOnly
                    tabIndex={-1}
                    aria-hidden
                />
                <button
                    type="button"
                    aria-label="Send"
                    className="w-[29px] h-[29px] rounded-full bg-accent flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-[0_4px_12px_rgba(168,32,13,0.28)] transition-all duration-150"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 fill-none stroke-white [stroke-width:2.2] translate-x-[1px]"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
