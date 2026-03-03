"use client";
import { useEffect, useState, useMemo, useRef } from "react";

const theme = {
  nodeBg: "#ffffff",
  nodeBorderInactive: "rgba(0,0,0,0.08)",
  nodeBorderCompleted: "rgba(0,0,0,0.14)",
  nodeTextActive: "rgba(0,0,0,0.9)",
  nodeTextCompleted: "rgba(0,0,0,0.65)",
  nodeTextInactive: "rgba(0,0,0,0.45)",
  sectionLabel: "rgba(0,0,0,0.3)",
  branchLabel: "rgba(0,0,0,0.25)",
  branchGroupBorder: "rgba(0,0,0,0.06)",
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

export function LiveWorkflowCanvas({
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