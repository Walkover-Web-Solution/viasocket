"use client";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const theme = {
  nodeBg: "#ffffff",
  nodeBorderInactive: "rgba(0,0,0,0.08)",
  nodeBorderCompleted: "rgba(0,0,0,0.14)",
  nodeTextActive: "rgba(0,0,0,0.9)",
  nodeTextCompleted: "rgba(0,0,0,0.65)",
  nodeTextInactive: "rgba(0,0,0,0.45)",
  sectionLabel: "rgba(0,0,0,0.3)",
  branchLabel: "rgba(0,0,0,0.25)",
  branchGroupBorder: "var(--rail-color)",
  branchGroupBg: "rgba(0,0,0,0.015)",
  conditionLabelBg: "#f0f0f2",
  conditionLabelBorder: "rgba(0,0,0,0.08)",
  conditionLabelText: "rgba(0,0,0,0.3)",
  connectorLine: "rgba(0,0,0,0.08)",
  connectorLineGlow: "rgba(37,99,235,0.45)",
  branchLineInactive: "rgba(0,0,0,0.08)",
  addStepGhost: "rgba(0,0,0,0.12)",
  addCircleBorder: "rgba(0,0,0,0.1)",
  addCircleText: "rgba(0,0,0,0.15)",
  continueText: "rgba(0,0,0,0.25)",
  continueLine: "rgba(0,0,0,0.08)",
  dividerLine: "rgba(0,0,0,0.05)",
};

export const ACCENT_COLORS = ["#2563EB", "#8B5CF6", "#F59E0B"];

const FLOWS = [
  {
    trigger: { id: "t1", label: "New Email", app: "Gmail", type: "trigger", appColor: "#F97316" },
    steps: [
      { id: "s1", label: "fetch_email_metadata", app: "Code", type: "code", appColor: "#F59E0B" },
      { id: "s2", label: "parse_sender_info", app: "Code", type: "code", appColor: "#F59E0B" },
    ],
    condition: {
      label: "is_actionable",
      branches: [
        {
          label: "urgent_task",
          steps: [
            { id: "b1a", label: "AI Classify Priority", app: "GPT-4", type: "ai", appColor: "#2563EB" },
            { id: "b1b", label: "Create Issue", app: "Linear", type: "action", appColor: "#94A3B8" },
            { id: "b1c", label: "Send Alert", app: "Slack", type: "message", appColor: "#818CF8" },
          ],
        },
        {
          label: "reference_only",
          steps: [
            { id: "b2a", label: "Log to Docs", app: "Notion", type: "action", appColor: "#94A3B8" },
            { id: "b2b", label: "Update Sheet", app: "Sheets", type: "table", appColor: "#06B6D4" },
          ],
        },
      ],
    },
    postSteps: [
      { id: "p1", label: "Find Contact", app: "Apollo", type: "api", appColor: "#10B981" },
      { id: "p2", label: "Update CRM", app: "HubSpot", type: "table", appColor: "#06B6D4" },
    ],
  },
  {
    trigger: { id: "t1", label: "Form Submitted", app: "Typeform", type: "trigger", appColor: "#8B5CF6" },
    steps: [
      { id: "s1", label: "extract_form_fields", app: "Code", type: "code", appColor: "#F59E0B" },
      { id: "s2", label: "enrich_company", app: "Clearbit", type: "api", appColor: "#10B981" },
    ],
    condition: {
      label: "lead_score_check",
      branches: [
        {
          label: "high_intent",
          steps: [
            { id: "b1a", label: "AI Score Lead", app: "GPT-4", type: "ai", appColor: "#2563EB" },
            { id: "b1b", label: "Add to CRM", app: "HubSpot", type: "action", appColor: "#94A3B8" },
            { id: "b1c", label: "Notify Sales", app: "Slack", type: "message", appColor: "#818CF8" },
          ],
        },
        {
          label: "nurture_track",
          steps: [
            { id: "b2a", label: "Add to Sequence", app: "Mailchimp", type: "action", appColor: "#94A3B8" },
            { id: "b2b", label: "Schedule Follow-up", app: "Calendar", type: "action", appColor: "#94A3B8" },
          ],
        },
      ],
    },
    postSteps: [
      { id: "p1", label: "Log Activity", app: "Sheets", type: "table", appColor: "#06B6D4" },
      { id: "p2", label: "Sync Pipeline", app: "Salesforce", type: "api", appColor: "#10B981" },
    ],
  },
  {
    trigger: { id: "t1", label: "Payment Event", app: "Stripe", type: "trigger", appColor: "#8B5CF6" },
    steps: [
      { id: "s1", label: "validate_payload", app: "Code", type: "code", appColor: "#F59E0B" },
      { id: "s2", label: "fetch_customer_history", app: "API", type: "api", appColor: "#10B981" },
    ],
    condition: {
      label: "risk_assessment",
      branches: [
        {
          label: "approved",
          steps: [
            { id: "b1a", label: "Process Payment", app: "Stripe", type: "action", appColor: "#94A3B8" },
            { id: "b1b", label: "Send Receipt", app: "SendGrid", type: "message", appColor: "#818CF8" },
          ],
        },
        {
          label: "flagged",
          steps: [
            { id: "b2a", label: "AI Fraud Analysis", app: "GPT-4", type: "ai", appColor: "#2563EB" },
            { id: "b2b", label: "Alert Finance", app: "Slack", type: "message", appColor: "#818CF8" },
            { id: "b2c", label: "Hold Payment", app: "Stripe", type: "action", appColor: "#94A3B8" },
          ],
        },
      ],
    },
    postSteps: [
      { id: "p1", label: "Update Ledger", app: "Sheets", type: "table", appColor: "#06B6D4" },
      { id: "p2", label: "Sync Accounting", app: "Xero", type: "api", appColor: "#10B981" },
    ],
  },
];

const glassTheme = {
  edgeFade: "rgba(255,255,255,1)",
  vignetteColor: "rgba(255,255,255,0.55)",
  glassBackground: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.28) 100%)",
  glassBlur: "blur(20px) saturate(140%)",
  glassBorder: "rgba(255,255,255,0.45)",
  glassBoxShadow: "0 8px 50px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02)",
  glassHighlight: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 60%, transparent 90%)",
  glassInnerWash: "radial-gradient(ellipse 60% 40% at 30% 0%, rgba(255,255,255,0.25) 0%, transparent 70%)",
  glassTitleColor: "var(--black-color)",
  navBtnBg: "rgba(0,0,0,0.04)",
  navBtnBgHover: "rgba(0,0,0,0.08)",
  navBtnBorder: "rgba(0,0,0,0.08)",
  navBtnBorderHover: "rgba(0,0,0,0.18)",
  navIconColor: "rgba(0,0,0,0.55)",
};

function WorkflowAnimation({
  flow,
  isTransitioning,
  onAnimationComplete,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const t = theme;
  const onCompleteRef = useRef(onAnimationComplete);
  onCompleteRef.current = onAnimationComplete;

  /* Build flat animation sequence: trigger → steps → IF → left branch → postSteps */
  const animationSequence = useMemo(() => {
    const seq = [];
    seq.push(flow.trigger.id);
    flow.steps.forEach((s) => seq.push(s.id));
    if (flow.condition) {
      seq.push("__if__");
      flow.condition.branches[0].steps.forEach((s) => seq.push(s.id));
    }
    if (flow.postSteps) {
      seq.push("__continue__");
      flow.postSteps.forEach((s) => seq.push(s.id));
    }
    return seq;
  }, [flow]);

  /* Cycle animation through sequence */
  useEffect(() => {
    if (isTransitioning) {
      setActiveIndex(-1);
      return;
    }

    let idx = -1;
    const startTimeout = setTimeout(() => {
      idx = 0;
      setActiveIndex(0);
    }, 500);

    const interval = setInterval(() => {
      idx++;
      if (idx >= animationSequence.length) {
        setActiveIndex(-1);
        idx = -2;
        onCompleteRef.current?.();
      } else {
        setActiveIndex(idx);
      }
    }, 650);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [animationSequence, isTransitioning]);

  const getStepState = (stepId) => {
    if (activeIndex < 0) return "inactive";
    const idx = animationSequence.indexOf(stepId);
    if (idx < 0) return "inactive";
    if (idx === activeIndex) return "active";
    if (idx < activeIndex) return "completed";
    return "inactive";
  };

  const isIfActive =
    activeIndex >= 0 && animationSequence[activeIndex] === "__if__";
  const isIfCompleted =
    activeIndex >= 0 &&
    animationSequence.indexOf("__if__") >= 0 &&
    animationSequence.indexOf("__if__") < activeIndex;

  const isConnectorGlowing = (nextStepId) => {
    return getStepState(nextStepId) === "active";
  };

  return (
    <div
      className={`flex flex-col items-center w-full py-10 transition-all duration-500 ${
        isTransitioning
          ? "opacity-0 scale-[0.96]"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes nodeGlow {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.5); }
          50% { box-shadow: 0 0 24px 6px rgba(37,99,235,0.15); }
          100% { box-shadow: 0 0 16px 3px rgba(37,99,235,0.08); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes flowDot {
          0% { top: 0; opacity: 1; }
          100% { top: calc(100% - 4px); opacity: 0.3; }
        }
      `}</style>

      {/* ── When ── */}
      <SectionLabel text="When" theme={t} />
      <FlowNode step={flow.trigger} state={getStepState(flow.trigger.id)} theme={t} />
      <FlowConnector
        height={28}
        glowing={
          flow.steps.length > 0
            ? isConnectorGlowing(flow.steps[0].id)
            : false
        }
        theme={t}
      />

      {/* ── Do ── */}
      <SectionLabel text="Do" theme={t} />
      {flow.steps.map((step, i) => {
        const nextId =
          i < flow.steps.length - 1
            ? flow.steps[i + 1].id
            : flow.condition
              ? "__if__"
              : flow.postSteps?.[0]?.id;
        return (
          <div key={step.id} className="flex flex-col items-center">
            <FlowNode step={step} state={getStepState(step.id)} theme={t} />
            <FlowConnector height={28} glowing={nextId ? isConnectorGlowing(nextId) || (nextId === "__if__" && isIfActive) : false} theme={t} />
          </div>
        );
      })}

      {/* ── IF Condition ── */}
      {flow.condition && (
        <>
          <IfCircle active={isIfActive} completed={isIfCompleted} />
          <FlowConnector height={14} glowing={isIfCompleted && activeIndex === animationSequence.indexOf("__if__") + 1} theme={t} />

          {/* Branch Split Lines */}
          <BranchSplit glowing={isIfCompleted} theme={t} />

          {/* Branch Group Container */}
          <div
            className="relative rounded-xl px-6 pt-9 pb-5"
            style={{
              border: `1px solid ${t.branchGroupBorder}`,
              backgroundColor: t.branchGroupBg,
            }}
          >
            {/* Condition label */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center">
              <span
                className="border px-2.5 py-0.5 rounded text-[9px] tracking-wider uppercase whitespace-nowrap transition-colors duration-300"
                style={{
                  backgroundColor: t.conditionLabelBg,
                  borderColor: isIfCompleted ? "rgba(37,99,235,0.2)" : t.conditionLabelBorder,
                  color: isIfCompleted ? "rgba(37,99,235,0.6)" : t.conditionLabelText,
                }}
              >
                {flow.condition.label}
              </span>
            </div>

            <div className="flex gap-44">
              {flow.condition.branches.map((branch, branchIndex) => (
                <div
                  key={branchIndex}
                  className="flex flex-col items-center min-w-[200px] relative"
                >
                  {/* Branch label */}
                  <div
                    className="text-[9px] tracking-wide mb-3 truncate max-w-full px-1 transition-colors duration-300"
                    style={{
                      color: isIfCompleted && branchIndex === 0 ? "rgba(37,99,235,0.4)" : t.branchLabel,
                    }}
                  >
                    {branch.label}
                  </div>

                  {branch.steps.map((step, i) => (
                    <div
                      key={step.id}
                      className="flex flex-col items-center"
                    >
                      <FlowNode
                        step={step}
                        size="sm"
                        state={getStepState(step.id)}
                        theme={t}
                      />
                      {i < branch.steps.length - 1 && (
                        <FlowConnector
                          height={18}
                          glowing={isConnectorGlowing(
                            branch.steps[i + 1].id
                          )}
                          theme={t}
                        />
                      )}
                    </div>
                  ))}

                  {/* + Add Step ghost */}
                  <div
                    className="mt-3 text-[10px] flex items-center gap-0.5 cursor-default"
                    style={{ color: t.addStepGhost }}
                  >
                    <span className="text-[12px]">+</span> Add Step
                  </div>
                </div>
              ))}
            </div>

            {/* Center divider */}
            <div
              className="absolute top-9 bottom-5 left-1/2 w-px"
              style={{ backgroundColor: t.dividerLine }}
            />
          </div>

          {/* Branch Merge Lines */}
          <BranchMerge glowing={false} theme={t} />
          <FlowConnector
            height={20}
            glowing={
              flow.postSteps
                ? isConnectorGlowing(flow.postSteps[0]?.id)
                : false
            }
            theme={t}
          />
        </>
      )}

      {/* ── Continue From Here ── */}
      {flow.postSteps && flow.postSteps.length > 0 && (
        <>
          <div
            className="text-[9px] tracking-wider uppercase mb-3 flex items-center gap-2"
            style={{ color: t.continueText }}
          >
            <div className="w-5 h-px" style={{ backgroundColor: t.continueLine }} />
            Continue from here
            <div className="w-5 h-px" style={{ backgroundColor: t.continueLine }} />
          </div>
          {flow.postSteps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center">
              <FlowNode step={step} state={getStepState(step.id)} theme={t} />
              {i < flow.postSteps.length - 1 && (
                <FlowConnector
                  height={22}
                  glowing={isConnectorGlowing(
                    flow.postSteps[i + 1].id
                  )}
                  theme={t}
                />
              )}
            </div>
          ))}
          <FlowConnector height={20} glowing={false} theme={t} />
        </>
      )}

      {/* ── Bottom Add ── */}
      <div
        className="w-7 h-7 rounded-full border border-dashed flex items-center justify-center cursor-default"
        style={{ borderColor: t.addCircleBorder }}
      >
        <span className="text-[14px] leading-none" style={{ color: t.addCircleText }}>+</span>
      </div>
    </div>
  );
}

export function LiveWorkflowCanvas({ usecases, onActiveChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    onActiveChange?.(currentIndex);
  }, [currentIndex, onActiveChange]);

  const currentFlow = FLOWS[currentIndex % FLOWS.length];
  const currentAccentColor = ACCENT_COLORS[currentIndex % ACCENT_COLORS.length];
  const currentTitle = usecases?.[currentIndex % usecases.length]?.title;

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const len = usecases?.length || FLOWS.length;
      const next = (prev + 1) % len;
      return next;
    });
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, usecases?.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const len = usecases?.length || FLOWS.length;
      const next = (prev - 1 + len) % len;
      return next;
    });
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, usecases?.length]);

  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => {
      handleNext();
    }, 800);
  }, [handleNext]);

  const gt = glassTheme;

  return (
    <div className="relative min-h-[400px] md:min-h-[560px] lg:min-h-[740px]">
      {/* Layer 1: Workflow Canvas */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          className="w-full h-full transition-all duration-500"
          style={{
            filter: "blur(1.2px)",
            opacity: 0.85,
            transform: "translateX(30px)",
          }}
        >
          <WorkflowAnimation
            flow={currentFlow}
            isTransitioning={isTransitioning}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
        {/* Edge fade masks */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${gt.edgeFade} 0%, transparent 6%, transparent 88%, ${gt.edgeFade} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${gt.edgeFade} 0%, transparent 4%, transparent 90%, ${gt.edgeFade} 100%)`,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, ${gt.vignetteColor} 100%)`,
          }}
        />
      </div>

      {/* Layer 2: Floating Use Case Box */}
      <div className="relative z-20 flex items-center justify-center min-h-[740px] px-4">
        <div
          key={currentIndex}
          className={`transition-all duration-500 w-full max-w-[528px] ${isTransitioning ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"}`}
        >
          {/* Liquid Glass Container */}
          <div
            className="relative rounded-[18px] px-9 py-9 overflow-hidden flex flex-col justify-center min-h-[216px]"
            style={{
              background: gt.glassBackground,
              backdropFilter: gt.glassBlur,
              WebkitBackdropFilter: gt.glassBlur,
              boxShadow: gt.glassBoxShadow,
              border: `1px solid ${gt.glassBorder}`,
            }}
          >
            {/* Accent color wash — per use case */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[18px] transition-all duration-500"
              style={{
                background: `radial-gradient(ellipse 130% 110% at 15% 115%, ${currentAccentColor}60 0%, transparent 55%), radial-gradient(ellipse 90% 80% at 85% -15%, ${currentAccentColor}35 0%, transparent 50%)`,
              }}
            />
            {/* Glass highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: gt.glassHighlight }}
            />
            {/* Inner light wash */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[18px] transition-all duration-500"
              style={{ background: gt.glassInnerWash }}
            />

            {/* Title */}
            <h2
              className="relative text-[28px] md:text-[34px] lg:text-[38px] leading-[normal] font-semibold tracking-[-0.95px]"
              style={{ color: gt.glassTitleColor, fontFamily: "'Inter', sans-serif" }}
            >
              {currentTitle}
            </h2>

            {/* Navigation — arrows only */}
            <div className="relative flex items-center justify-end pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: gt.navBtnBg,
                    border: `1px solid ${gt.navBtnBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = gt.navBtnBgHover;
                    e.currentTarget.style.borderColor = gt.navBtnBorderHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = gt.navBtnBg;
                    e.currentTarget.style.borderColor = gt.navBtnBorder;
                  }}
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="w-3 h-3" style={{ color: gt.navIconColor }} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: gt.navBtnBg,
                    border: `1px solid ${gt.navBtnBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = gt.navBtnBgHover;
                    e.currentTarget.style.borderColor = gt.navBtnBorderHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = gt.navBtnBg;
                    e.currentTarget.style.borderColor = gt.navBtnBorder;
                  }}
                  disabled={isTransitioning}
                >
                  <ChevronRight className="w-3 h-3" style={{ color: gt.navIconColor }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Sub-Components
   ═══════════════════════════════════════════ */

function SectionLabel({ text, theme }) {
  return (
    <div
      className="text-[10px] tracking-[0.1em] uppercase font-medium mb-2.5"
      style={{ color: theme.sectionLabel }}
    >
      {text}
    </div>
  );
}

function FlowNode({
  step,
  size = "md",
  state = "inactive",
  theme,
}) {
  const isSmall = size === "sm";
  const isAI = step.type === "ai";
  const isActive = state === "active";
  const isCompleted = state === "completed";

  const borderColor = isActive
    ? "rgba(37,99,235,0.6)"
    : isCompleted
      ? isAI
        ? "rgba(37,99,235,0.35)"
        : theme.nodeBorderCompleted
      : isAI
        ? "rgba(37,99,235,0.25)"
        : theme.nodeBorderInactive;

  const bgColor = isActive
    ? "rgba(37,99,235,0.06)"
    : theme.nodeBg;

  const textColor = isActive
    ? theme.nodeTextActive
    : isCompleted
      ? theme.nodeTextCompleted
      : theme.nodeTextInactive;

  return (
    <div
      className={`
        relative flex items-center gap-2.5 rounded-lg cursor-pointer
        transition-all duration-300
        ${isSmall ? "px-3.5 py-[9px] min-w-[185px]" : "px-4 py-[11px] min-w-[220px]"}
      `}
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        ...(isActive ? { animation: "nodeGlow 0.6s ease-out forwards" } : {}),
      }}
    >
      {/* Pulse ring on active */}
      {isActive && (
        <div className="absolute -inset-[3px] rounded-lg border border-[#2563EB]/30 pointer-events-none"
          style={{ animation: "pulseRing 0.8s ease-out forwards" }}
        />
      )}

      {/* App icon square */}
      <div
        className={`${isSmall ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]"} rounded flex-shrink-0 flex items-center justify-center transition-all duration-300`}
        style={{
          backgroundColor:
            isActive
              ? step.appColor + "30"
              : isCompleted
                ? step.appColor + "20"
                : step.appColor + "12",
          border: `1px solid ${isActive ? step.appColor + "60" : step.appColor + "30"}`,
        }}
      >
        <div
          className={`${isSmall ? "w-[6px] h-[6px]" : "w-[7px] h-[7px]"} rounded-sm transition-opacity duration-300`}
          style={{
            backgroundColor: step.appColor,
            opacity: isActive ? 1 : isCompleted ? 0.8 : 0.6,
          }}
        />
      </div>

      {/* Label */}
      <span
        className={`${isSmall ? "text-[11.5px]" : "text-[13px]"} truncate transition-colors duration-300`}
        style={{ color: textColor }}
      >
        {step.label}
      </span>

      {/* AI badge */}
      {isAI && (
        <div
          className={`absolute -top-1.5 -right-1.5 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full tracking-wider transition-all duration-300 ${
            isActive
              ? "bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.5)]"
              : "bg-[#2563EB]/80"
          }`}
        >
          AI
        </div>
      )}
    </div>
  );
}

function IfCircle({
  active,
  completed,
}) {
  return (
    <div
      className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${
        active
          ? "border-2 border-[#F59E0B]/70 bg-[#F59E0B]/[0.1] shadow-[0_0_16px_rgba(245,158,11,0.2)]"
          : completed
            ? "border-2 border-[#F59E0B]/50 bg-[#F59E0B]/[0.06]"
            : "border-[1.5px] border-[#F59E0B]/30 bg-[#F59E0B]/[0.03]"
      }`}
    >
      <span
        className={`text-[10px] font-bold tracking-wide transition-colors duration-300 ${
          active
            ? "text-[#F59E0B]/90"
            : completed
              ? "text-[#F59E0B]/70"
              : "text-[#F59E0B]/50"
        }`}
      >
        IF
      </span>
    </div>
  );
}

function BranchSplit({ glowing, theme }) {
  const lineColor = glowing
    ? "rgba(37,99,235,0.3)"
    : theme.branchLineInactive;
  return (
    <div className="relative w-[620px] h-[22px]">
      <div
        className="absolute left-1/2 top-0 w-px h-[10px] -translate-x-1/2 transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute top-[10px] left-[8%] right-[8%] h-px transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute left-[8%] top-[10px] w-px h-[12px] transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute right-[8%] top-[10px] w-px h-[12px] transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
}

function BranchMerge({ glowing, theme }) {
  const lineColor = glowing
    ? "rgba(37,99,235,0.3)"
    : theme.branchLineInactive;
  return (
    <div className="relative w-[620px] h-[22px]">
      <div
        className="absolute left-[8%] top-0 w-px h-[12px] transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute right-[8%] top-0 w-px h-[12px] transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute top-[12px] left-[8%] right-[8%] h-px transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
      <div
        className="absolute left-1/2 top-[12px] w-px h-[10px] -translate-x-1/2 transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
}

function FlowConnector({
  height = 20,
  glowing = false,
  theme,
}) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ height: `${height}px` }}
    >
      <div
        className="w-px h-full transition-colors duration-300"
        style={{ backgroundColor: glowing ? theme.connectorLineGlow : theme.connectorLine }}
      />
      {glowing && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.6)]"
          style={{
            animation: `flowDot ${height * 20}ms ease-out forwards`,
          }}
        />
      )}
    </div>
  );
}