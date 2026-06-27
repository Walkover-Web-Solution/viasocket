'use client';
import { useEffect, useRef, useState } from 'react';
import AiMessage from './AiMessage';
import WorkflowCanvas from './WorkflowCanvas';
import InputArea from './InputArea';

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
                <div className="inline-block text-accent text-sm font-bold tracking-[0.16em] uppercase mb-5">
                    AI WORKFLOWS
                </div>
                <h2 className="h2">
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
                        <div className="flex-1 flex items-center justify-center gap-[7px] text-sm font-medium text-[#555] truncate">
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
                            <AiMessage
                                showAiIntro={showAiIntro}
                                chatExiting={chatExiting}
                                stepsVisible={stepsVisible}
                                aiIntro={AI_INTRO}
                                aiSteps={AI_STEPS}
                            />
                        </div>

                        {/* Canvas overlay */}
                        <WorkflowCanvas
                            canvasOn={canvasOn}
                            nodesVisible={nodesVisible}
                            publishOn={publishOn}
                            nodes={NODES}
                        />

                        {/* Input area */}
                        <InputArea chips={CHIPS} />
                    </div>
                </div>
            </div>

        </section>
    );
}
