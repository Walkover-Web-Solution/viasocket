'use client';
import { useEffect, useRef, useState } from 'react';

const USER_PROMPT = 'Auto close inactive connections';
const AI_INTRO = "I'll build that workflow for you. Setting it up now...";
const AI_STEPS = [
    'Detect inactive connections (7+ days)',
    'Send a warning email to the owner',
    'Wait 24 hours for response',
    'Auto-close if still inactive',
];

const NODES = [
    {
        id: 1,
        type: 'Trigger',
        typeColor: '#A8200D',
        bg: 'rgba(168,32,13,0.10)',
        label: 'Inactive for 7 Days',
        detail: 'No activity detected · 7-day threshold',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        id: 2,
        type: 'Action',
        typeColor: '#1a73e8',
        bg: 'rgba(26,115,232,0.10)',
        label: 'Send Warning Email',
        detail: 'viaSocket Email · to connection owner',
        icon: (
            <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <polyline points="2,4 12,13 22,4" />
            </svg>
        ),
    },
    {
        id: 3,
        type: 'Delay',
        typeColor: '#d97706',
        bg: 'rgba(245,158,11,0.12)',
        label: 'Wait 24 Hours',
        detail: 'Pause execution · 24-hour window',
        icon: (
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12,7 12,12 15.5,15.5" />
            </svg>
        ),
    },
    {
        id: 4,
        type: 'Action',
        typeColor: '#1a73e8',
        bg: 'rgba(26,115,232,0.10)',
        label: 'Close Connection',
        detail: 'API call · viaSocket platform',
        icon: (
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
        ),
    },
];

const CHIPS = [
    'Auto close inactive connections',
    'Notify on connection errors',
    'Daily connection summary',
    'Payment retry on failure',
];

export default function AIWorkflows() {
    const sectionRef = useRef(null);
    const chatRef = useRef(null);
    const [started, setStarted] = useState(false);
    const [typed, setTyped] = useState('');
    const [showAiIntro, setShowAiIntro] = useState(false);
    const [stepsVisible, setStepsVisible] = useState(0);
    const [chatExiting, setChatExiting] = useState(false);
    const [canvasOn, setCanvasOn] = useState(false);
    const [nodesVisible, setNodesVisible] = useState(0); // counts nodes + connectors interleaved
    const [publishOn, setPublishOn] = useState(false);
    const [repeatTrigger, setRepeatTrigger] = useState(0);

    // Start animation when section enters viewport
    useEffect(() => {
        if (!sectionRef.current) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !started) {
                        setStarted(true);
                        obs.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, [started]);

    // Animation timeline
    useEffect(() => {
        if (!started) return;
        const timers = [];
        // 1) Type user prompt
        let i = 0;
        const typeStep = () => {
            i += 1;
            setTyped(USER_PROMPT.slice(0, i));
            if (i < USER_PROMPT.length) {
                timers.push(setTimeout(typeStep, 45));
            } else {
                // 2) Show AI intro
                timers.push(
                    setTimeout(() => {
                        setShowAiIntro(true);
                        // 3) Reveal steps
                        AI_STEPS.forEach((_, idx) => {
                            timers.push(setTimeout(() => setStepsVisible(idx + 1), 700 + idx * 450));
                        });
                        // 4) Exit chat → enter canvas
                        const totalStepsTime = 700 + AI_STEPS.length * 450 + 700;
                        timers.push(setTimeout(() => setChatExiting(true), totalStepsTime));
                        timers.push(setTimeout(() => setCanvasOn(true), totalStepsTime + 450));
                        // 5) Reveal nodes one by one
                        const items = NODES.length * 2 - 1; // nodes + connectors
                        for (let k = 1; k <= items; k++) {
                            timers.push(setTimeout(() => setNodesVisible(k), totalStepsTime + 700 + k * 360));
                        }
                        // 6) Publish button
                        timers.push(setTimeout(() => setPublishOn(true), totalStepsTime + 700 + items * 360 + 300));
                        // 7) Loop
                        timers.push(
                            setTimeout(() => {
                                setTyped('');
                                setShowAiIntro(false);
                                setStepsVisible(0);
                                setChatExiting(false);
                                setCanvasOn(false);
                                setNodesVisible(0);
                                setPublishOn(false);
                                setRepeatTrigger((t) => t + 1);
                            }, totalStepsTime + 700 + items * 360 + 300 + 3500)
                        );
                    }, 450)
                );
            }
        };
        timers.push(setTimeout(typeStep, 600));
        return () => timers.forEach(clearTimeout);
    }, [started, repeatTrigger]);

    // Auto scroll chat
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [typed, showAiIntro, stepsVisible]);

    return (
        <section
            ref={sectionRef}
            id="ai-workflows"
            className="relative bg-white text-[#111] py-[120px] lg:py-[130px] overflow-hidden container"
        >
            {/* Grid bg */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(0,0,0,0.042)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.042)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)]"
            />
            {/* Glow */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none aiwf-glow-pulse"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(168,32,13,0.13) 0%, transparent 68%), radial-gradient(ellipse 40% 35% at 50% 50%, rgba(168,32,13,0.07) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 px-5 lg:px-10 text-center">
                <div className="inline-block text-accent text-[11px] font-bold tracking-[0.16em] uppercase mb-5">
                    AI WORKFLOWS
                </div>
                <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-extrabold leading-[1.1] tracking-[-1.4px] mb-[52px]">
                    Build powerful workflows.
                    In seconds, <br /> <span className="text-accent">with AI.</span>
                </h2>

                {/* Window */}
                <div className="bg-white rounded-[18px] border border-black/[0.08] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_10px_36px_rgba(0,0,0,0.08),0_28px_72px_rgba(0,0,0,0.05)] overflow-hidden text-left flex flex-col aiwf-float">
                    {/* Chrome */}
                    <div className="flex items-center px-5 py-[13px] bg-[#f3f3f3] border-b border-black/[0.07] gap-3">
                        <div className="flex gap-1.5 w-[54px] shrink-0" aria-hidden>
                            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-[7px] text-[12px] font-medium text-[#555] truncate">
                            <span
                                className={`w-[7px] h-[7px] rounded-full shrink-0 ${
                                    canvasOn ? 'bg-[#22c55e]' : 'bg-accent aiwf-dot-pulse'
                                }`}
                            />
                            Workflow: Auto Close Inactive viaSocket Connections
                        </div>
                        <div className="w-[54px] shrink-0" aria-hidden />
                    </div>

                    {/* Body wrap */}
                    <div className="relative flex-1 flex flex-col overflow-hidden">
                        {/* Chat */}
                        <div
                            ref={chatRef}
                            className="h-[390px] max-md:h-[260px] overflow-y-auto p-[22px_22px_6px] flex flex-col gap-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            aria-live="polite"
                        >
                            {/* User msg */}
                            <div
                                className={`flex flex-row-reverse items-start gap-[9px] transition-all duration-[380ms] ${
                                    typed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                } ${chatExiting ? '!opacity-0 !-translate-y-6' : ''}`}
                            >
                                <div className="w-[30px] h-[30px] rounded-full bg-accent text-white text-[9.5px] font-bold flex items-center justify-center shrink-0">
                                    YOU
                                </div>
                                <div className="relative bg-[#111] text-white text-[13px] leading-[1.56] px-[15px] py-[11px] rounded-[14px_4px_14px_14px] max-w-[74%]">
                                    {typed}
                                    {typed.length < USER_PROMPT.length && (
                                        <span className="inline-block w-[1.5px] h-[1em] bg-white/80 ml-[1px] align-text-bottom aiwf-blink" />
                                    )}
                                </div>
                            </div>

                            {/* AI msg */}
                            {showAiIntro && (
                                <div
                                    className={`flex items-start gap-[9px] transition-all duration-[380ms] opacity-100 translate-y-0 ${
                                        chatExiting ? '!opacity-0 !-translate-y-6' : ''
                                    }`}
                                >
                                    <div className="w-[30px] h-[30px] rounded-full bg-accent text-white text-[9.5px] font-bold flex items-center justify-center shrink-0">
                                        AI
                                    </div>
                                    <div className="bg-[#f8f8f8] border border-black/[0.07] rounded-[4px_14px_14px_14px] px-4 py-[14px] text-[13px] text-[#1a1a1a] leading-[1.56] max-w-[85%]">
                                        <p>{AI_INTRO}</p>
                                        <p className="font-semibold text-[12.5px] text-[#111] mt-[10px] mb-2">
                                            Here&apos;s the plan:
                                        </p>
                                        <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                                            {AI_STEPS.map((s, idx) => (
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
                                        {stepsVisible >= AI_STEPS.length && (
                                            <p className="text-accent font-normal mt-2 text-[12.5px]">
                                                ✓ Workflow ready.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Canvas overlay */}
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
                                {NODES.map((n, i) => {
                                    const nodeIdx = i * 2; // 0,2,4,6
                                    const connIdx = nodeIdx + 1;
                                    const nodeOn = nodesVisible > nodeIdx;
                                    const connOn = nodesVisible > connIdx;
                                    return (
                                        <div key={n.id}>
                                            <div
                                                className={`flex items-center gap-[13px] w-full bg-white border-[1.5px] border-black/[0.07] rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ${
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
                                                    <span
                                                        className="contents [&_svg]:stroke-[currentColor]"
                                                    >
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
                                            {i < NODES.length - 1 && (
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

                        {/* Input area */}
                        <div className="border-t border-black/[0.07] px-[18px] pt-[14px] pb-4 bg-white">
                            <div className="flex flex-wrap gap-[7px] mb-2.5">
                                {CHIPS.map((c) => (
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
                    </div>
                </div>
            </div>

        </section>
    );
}
