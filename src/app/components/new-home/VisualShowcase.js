"use client";

import { useState, useEffect, useCallback } from "react";
import { categories } from "./WorkflowCategories";

/* ── Per-category workflow definitions ───────────────────────── */

const c = {
  blue: "#2563EB",
  purple: "#8B5CF6",
  green: "#10B981",
  amber: "#F59E0B",
  cyan: "#06B6D4",
  lavender: "#CA7AFF",
  slate: "#94A3B8",
  red: "#EF4444",
};

const workflows = {
  Marketing: {
    title: "Lead Qualification — viaSocket Editor",
    nodes: [
      { id: 1, label: "New form submission", type: "trigger", color: c.purple, x: 120, y: 48 },
      { id: 2, label: "AI: Enrich lead", type: "ai", color: c.blue, x: 120, y: 140 },
      { id: 3, label: "High score?", type: "condition", color: c.amber, x: 120, y: 232 },
      { id: 4, label: "Add to HubSpot", type: "action", color: c.green, x: 40, y: 324 },
      { id: 5, label: "Send drip email", type: "action", color: c.slate, x: 200, y: 324 },
    ],
    lines: [
      { x1: 200, y1: 82, x2: 200, y2: 126, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 174, x2: 200, y2: 218, color: "rgba(255,255,255,0.08)" },
      { x1: 175, y1: 266, x2: 120, y2: 310, color: "rgba(16,185,129,0.2)" },
      { x1: 225, y1: 266, x2: 280, y2: 310, color: "rgba(148,163,184,0.15)" },
    ],
    conditionLabels: [
      { text: "Yes", left: 80, top: 296, color: "rgba(16,185,129,0.5)" },
      { text: "No", left: 278, top: 296, color: "rgba(148,163,184,0.35)" },
    ],
    properties: ["CRM Field", "Scoring Model", "Threshold", "Audience →"],
  },
  Sales: {
    title: "Deal Pipeline — viaSocket Editor",
    nodes: [
      { id: 1, label: "New lead received", type: "trigger", color: c.purple, x: 120, y: 48 },
      { id: 2, label: "AI: Score intent", type: "ai", color: c.blue, x: 120, y: 140 },
      { id: 3, label: "Qualified?", type: "condition", color: c.amber, x: 120, y: 232 },
      { id: 4, label: "Route to rep", type: "action", color: c.green, x: 40, y: 324 },
      { id: 5, label: "Add to nurture", type: "action", color: c.slate, x: 200, y: 324 },
    ],
    lines: [
      { x1: 200, y1: 82, x2: 200, y2: 126, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 174, x2: 200, y2: 218, color: "rgba(255,255,255,0.08)" },
      { x1: 175, y1: 266, x2: 120, y2: 310, color: "rgba(16,185,129,0.2)" },
      { x1: 225, y1: 266, x2: 280, y2: 310, color: "rgba(148,163,184,0.15)" },
    ],
    conditionLabels: [
      { text: "Yes", left: 80, top: 296, color: "rgba(16,185,129,0.5)" },
      { text: "No", left: 278, top: 296, color: "rgba(148,163,184,0.35)" },
    ],
    properties: ["Model", "Prompt", "Score ≥", "Rep Assignment →"],
  },
  Support: {
    title: "Ticket Triage — viaSocket Editor",
    nodes: [
      { id: 1, label: "Ticket created", type: "trigger", color: c.green, x: 120, y: 48 },
      { id: 2, label: "AI: Classify priority", type: "ai", color: c.blue, x: 120, y: 140 },
      { id: 3, label: "Urgent?", type: "condition", color: c.amber, x: 120, y: 232 },
      { id: 4, label: "Assign senior agent", type: "action", color: c.green, x: 24, y: 324 },
      { id: 5, label: "Auto-respond", type: "action", color: c.slate, x: 200, y: 324 },
    ],
    lines: [
      { x1: 200, y1: 82, x2: 200, y2: 126, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 174, x2: 200, y2: 218, color: "rgba(255,255,255,0.08)" },
      { x1: 175, y1: 266, x2: 110, y2: 310, color: "rgba(16,185,129,0.2)" },
      { x1: 225, y1: 266, x2: 280, y2: 310, color: "rgba(148,163,184,0.15)" },
    ],
    conditionLabels: [
      { text: "Yes", left: 68, top: 296, color: "rgba(16,185,129,0.5)" },
      { text: "No", left: 278, top: 296, color: "rgba(148,163,184,0.35)" },
    ],
    properties: ["Classifier", "SLA Rules", "Priority Map", "Routing →"],
  },
  HR: {
    title: "Employee Onboarding — viaSocket Editor",
    nodes: [
      { id: 1, label: "Offer accepted", type: "trigger", color: c.amber, x: 120, y: 36 },
      { id: 2, label: "Create accounts", type: "action", color: c.blue, x: 120, y: 116 },
      { id: 3, label: "Provision Slack", type: "action", color: c.green, x: 120, y: 196 },
      { id: 4, label: "Send welcome email", type: "action", color: c.purple, x: 120, y: 276 },
      { id: 5, label: "Schedule onboarding", type: "action", color: c.cyan, x: 120, y: 356 },
    ],
    lines: [
      { x1: 200, y1: 70, x2: 200, y2: 102, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 150, x2: 200, y2: 182, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 230, x2: 200, y2: 262, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 310, x2: 200, y2: 342, color: "rgba(255,255,255,0.08)" },
    ],
    properties: ["HRIS Source", "Workspace", "Template", "Calendar →"],
  },
  Finance: {
    title: "Invoice Approval — viaSocket Editor",
    nodes: [
      { id: 1, label: "Invoice received", type: "trigger", color: c.cyan, x: 120, y: 48 },
      { id: 2, label: "Match PO", type: "action", color: c.blue, x: 120, y: 140 },
      { id: 3, label: "Approved?", type: "condition", color: c.amber, x: 120, y: 232 },
      { id: 4, label: "Book to ledger", type: "action", color: c.green, x: 40, y: 324 },
      { id: 5, label: "Flag for review", type: "action", color: c.red, x: 200, y: 324 },
    ],
    lines: [
      { x1: 200, y1: 82, x2: 200, y2: 126, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 174, x2: 200, y2: 218, color: "rgba(255,255,255,0.08)" },
      { x1: 175, y1: 266, x2: 120, y2: 310, color: "rgba(16,185,129,0.2)" },
      { x1: 225, y1: 266, x2: 280, y2: 310, color: "rgba(239,68,68,0.2)" },
    ],
    conditionLabels: [
      { text: "Yes", left: 80, top: 296, color: "rgba(16,185,129,0.5)" },
      { text: "No", left: 278, top: 296, color: "rgba(239,68,68,0.4)" },
    ],
    properties: ["PO Source", "Match Rules", "Threshold", "GL Code →"],
  },
  Engineering: {
    title: "CI/CD Pipeline — viaSocket Editor",
    nodes: [
      { id: 1, label: "PR merged", type: "trigger", color: c.lavender, x: 120, y: 48 },
      { id: 2, label: "Run CI tests", type: "action", color: c.blue, x: 120, y: 140 },
      { id: 3, label: "Tests pass?", type: "condition", color: c.amber, x: 120, y: 232 },
      { id: 4, label: "Deploy to prod", type: "action", color: c.green, x: 40, y: 324 },
      { id: 5, label: "Notify author", type: "action", color: c.slate, x: 200, y: 324 },
    ],
    lines: [
      { x1: 200, y1: 82, x2: 200, y2: 126, color: "rgba(255,255,255,0.08)" },
      { x1: 200, y1: 174, x2: 200, y2: 218, color: "rgba(255,255,255,0.08)" },
      { x1: 175, y1: 266, x2: 120, y2: 310, color: "rgba(16,185,129,0.2)" },
      { x1: 225, y1: 266, x2: 280, y2: 310, color: "rgba(148,163,184,0.15)" },
    ],
    conditionLabels: [
      { text: "Pass", left: 72, top: 296, color: "rgba(16,185,129,0.5)" },
      { text: "Fail", left: 274, top: 296, color: "rgba(148,163,184,0.35)" },
    ],
    properties: ["Repo", "Branch", "Env", "Slack Channel →"],
  },
};

/* ── Workflow builder mockup component ───────────────────────── */
function WorkflowMockup({ workflow }) {
  const triggerNode = workflow.nodes.find((n) => n.type === "trigger");
  const actionNodes = workflow.nodes.filter((n) => n.type !== "trigger");

  const borderColor = "rgba(0,0,0,0.08)";
  const textPrimary = "rgba(0,0,0,0.82)";
  const textSecondary = "rgba(0,0,0,0.4)";
  const textTertiary = "rgba(0,0,0,0.28)";
  const nodeBg = "#ffffff";
  const lineColor = "rgba(0,0,0,0.12)";

  return (
    <div
      className="w-full rounded-xl relative overflow-hidden"
      style={{
        height: "100%",
        minHeight: 360,
        background: "#fafaf9",
        border: `1px solid rgba(0,0,0,0.08)`,
      }}
    >
      {/* Title bar */}
      <div
        className="px-5 py-3.5"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <p
          className="text-[13px] mb-0.5"
          style={{ color: textPrimary, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {workflow.title.replace(" — viaSocket Editor", "")}
        </p>
        <p className="text-[10px]" style={{ color: textSecondary }}>
          {workflow.properties.join(" · ")}
        </p>
      </div>

      {/* Centered vertical flow */}
      <div className="flex flex-col items-center py-5 px-4">
        {/* When section */}
        <p
          className="text-[12px] mb-3"
          style={{ color: textSecondary, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          When
        </p>

        {triggerNode && (
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
            style={{
              background: nodeBg,
              border: `1px solid ${triggerNode.color}30`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              animation: "vsFadeUp 420ms ease 0.1s both",
            }}
          >
            <div
              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-[9px]"
              style={{
                background: triggerNode.color,
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
              }}
            >
              {triggerNode.label.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[12px] block" style={{ color: textPrimary }}>
                {triggerNode.label}
              </span>
              <span className="text-[9px] block" style={{ color: textTertiary }}>
                Runs Every 5 Minutes
              </span>
            </div>
          </div>
        )}

        {/* Connector line */}
        <div className="w-px h-5" style={{ background: lineColor }} />

        {/* Do section */}
        <p
          className="text-[12px] mb-3"
          style={{ color: textSecondary, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          Do
        </p>

        {actionNodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            <div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              style={{
                background: nodeBg,
                border: `1px solid ${node.color}30`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                animation: `vsFadeUp 420ms ease ${0.15 + i * 0.08}s both`,
              }}
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-[9px]"
                style={{
                  background: node.color,
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                }}
              >
                {node.type === "ai" ? "AI" : node.type === "condition" ? "?" : node.label.charAt(0).toUpperCase()}
              </div>
              <span className="text-[12px] whitespace-nowrap" style={{ color: textPrimary }}>
                {node.label}
              </span>
              {node.type === "ai" && (
                <span
                  className="text-[7px] tracking-[0.3px] px-1.5 py-0.5 rounded-full ml-1"
                  style={{
                    background: `${c.blue}22`,
                    color: c.blue,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  AI
                </span>
              )}
            </div>
            {/* Connector line between action nodes */}
            {i < actionNodes.length - 1 && (
              <div className="w-px h-5" style={{ background: lineColor }} />
            )}
          </div>
        ))}

        {/* Add button */}
        <div className="w-px h-4" style={{ background: lineColor }} />
        <div
          className="w-7 h-7 rounded border flex items-center justify-center text-[14px]"
          style={{
            borderColor: "rgba(0,0,0,0.12)",
            color: textTertiary,
          }}
        >
          +
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: `linear-gradient(to top, #fafaf9, transparent)` }}
      />
    </div>
  );
}

export default function VisualShowcase({ activeCategoryIndex: controlledIndex, onActiveIndexChange }) {
  const [internalIndex, setInternalIndex] = useState(2); // Default to "Support"
  const [isHovered, setIsHovered] = useState(false);
  const activeIndex = controlledIndex ?? internalIndex;
  const setActiveIndex = (i) => {
    setInternalIndex(i);
    onActiveIndexChange?.(i);
  };
  const n = categories.length;
  const goPrev = useCallback(() => setActiveIndex((activeIndex - 1 + n) % n), [activeIndex, n]);
  const goNext = useCallback(() => setActiveIndex((activeIndex + 1) % n), [activeIndex, n]);

  /* Keyboard arrow navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  const cat = categories[activeIndex];

  /* Solid background colors per category — light only */
  const solidBgMap = {
    "#2563EB": "#bfdbfe",   // Marketing — blue
    "#8B5CF6": "#ddd6fe",   // Sales — violet
    "#10B981": "#a7f3d0",   // Support — emerald
    "#F59E0B": "#fde68a",   // HR — amber
    "#06B6D4": "#a5f3fc",   // Finance — cyan
    "#CA7AFF": "#e9d5ff",   // Engineering — purple
  };

  /* Build bg colors for all categories so peeking cards show their color */
  const allBgs = categories.map((item) => solidBgMap[item.color] ?? "#e5e7eb");

  return (
    <section
      className="w-full overflow-hidden relative"
      style={{
        background: "#ffffff",
        paddingTop: 40,
        paddingBottom: 56,
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] relative z-10">
        {/* Category pills — top-left aligned */}
        <div className="flex flex-wrap gap-2 mb-8 justify-start" style={{ animation: "vsFadeUp 450ms ease both" }}>
          {categories.map((pill, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={pill.label}
                onClick={() => setActiveIndex(i)}
                className="px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
                style={{
                  fontSize: 14,
                  background: isActive
                    ? "#0a0a0a"
                    : "transparent",
                  border: `1.5px solid ${isActive
                    ? "#0a0a0a"
                    : "rgba(0,0,0,0.25)"}`,
                  color: isActive
                    ? "#ffffff"
                    : "rgba(0,0,0,0.7)",
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.45)";
                    e.currentTarget.style.color = "rgba(0,0,0,0.95)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.25)";
                    e.currentTarget.style.color = "rgba(0,0,0,0.7)";
                  }
                }}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Carousel: peeking cards layout ── */}
      <div
        className="relative w-full"
        style={{ height: "clamp(540px, 44vw, 840px)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {categories.map((cardCat, i) => {
          /* Circular offset: always in range [-n/2, n/2] for correct wrap direction */
          const rawOffset = i - activeIndex;
          let offset = ((rawOffset % n) + n) % n;
          if (offset > n / 2) offset -= n;

          const isActive = offset === 0;
          const cardWorkflow = workflows[cardCat.label] ?? workflows["Marketing"];
          const cardBg = allBgs[i];

          /* Position: active card ~82vw centered, side cards sit flush outside with a gap — no overlap */
          const activeWidth = 82; // vw
          const sideGap = 16; // px between cards
          const centerLeft = (100 - activeWidth) / 2;

          let translateX;
          let zIndex;
          let scale;
          let opacity;

          if (isActive) {
            translateX = `${centerLeft}vw`;
            zIndex = 10;
            scale = 1;
            opacity = 1;
          } else if (offset === -1) {
            // left card — sits entirely to the left with just a sliver peeking
            translateX = `calc(${centerLeft}vw - ${activeWidth}vw - ${sideGap}px)`;
            zIndex = 5;
            scale = 1;
            opacity = 0.6;
          } else if (offset === 1) {
            // right card — sits entirely to the right with just a sliver peeking
            translateX = `calc(${centerLeft}vw + ${activeWidth}vw + ${sideGap}px)`;
            zIndex = 5;
            scale = 1;
            opacity = 0.6;
          } else if (offset < -1) {
            translateX = `calc(${centerLeft}vw - ${activeWidth * 2}vw - ${sideGap * 2}px)`;
            zIndex = 1;
            scale = 1;
            opacity = 0;
          } else {
            translateX = `calc(${centerLeft}vw + ${activeWidth * 2}vw + ${sideGap * 2}px)`;
            zIndex = 1;
            scale = 1;
            opacity = 0;
          }

          return (
            <div
              key={cardCat.label}
              className="absolute top-0 rounded-3xl overflow-hidden cursor-pointer"
              style={{
                width: `${activeWidth}vw`,
                height: "100%",
                background: cardBg,
                zIndex,
                opacity,
                transform: `translateX(${translateX}) scale(${scale})`,
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease",
              }}
              onClick={() => !isActive && setActiveIndex(i)}
            >
              {/* "Use this template →" button — top right */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  className="px-0 py-0 text-[13px] flex items-center gap-1.5 cursor-pointer transition duration-150 hover:opacity-70 hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: "none",
                    color: "#0a0a0a",
                    border: "none",
                    fontWeight: 600,
                    letterSpacing: "-0.1px",
                  }}
                >
                  Use this template
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5.5 4H12V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Card content — side-by-side: text left, workflow right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full px-8 md:px-12 py-10 md:py-14 relative z-10 items-center">
                {/* Left — text content */}
                <div className="flex flex-col justify-center">
                  <h2
                    className="text-[26px] md:text-[34px] lg:text-[44px] leading-[1.12] tracking-[-0.8px] lg:tracking-[-1.2px] mb-4 max-w-[520px]"
                    style={{
                      color: "#0a0a0a",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {cardCat.headline}
                  </h2>
                  <p
                    className="text-[15px] md:text-[18px] leading-[1.6] max-w-[460px] mb-6"
                    style={{ color: "rgba(0,0,0,0.65)" }}
                  >
                    {cardCat.description}
                  </p>
                  <a
                    href="#"
                    className="text-[14px] flex items-center gap-2 w-fit cursor-pointer px-5 py-2.5 rounded-full transition duration-150 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "#0a0a0a",
                      color: "#ffffff",
                      fontWeight: 600,
                      border: "1.5px solid #0a0a0a",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0a0a0a";
                    }}
                  >
                    Browse all templates
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33 8H12.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8.67 4L12.67 8L8.67 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* Right — workflow mockup */}
                <div className="h-full min-h-[280px] lg:min-h-[340px]">
                  <WorkflowMockup workflow={cardWorkflow} />
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Arrow navigation buttons (appear on hover) ── */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95"
          style={{
            left: "calc(9vw - 44px)",
            background: "rgba(0,0,0,0.06)",
            border: `1px solid rgba(0,0,0,0.1)`,
            backdropFilter: "blur(8px)",
            color: "#0a0a0a",
            pointerEvents: isHovered ? "auto" : "none",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.06)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={goNext}
          className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95"
          style={{
            right: "calc(9vw - 44px)",
            background: "rgba(0,0,0,0.06)",
            border: `1px solid rgba(0,0,0,0.1)`,
            backdropFilter: "blur(8px)",
            color: "#0a0a0a",
            pointerEvents: isHovered ? "auto" : "none",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.06)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <style>{`
          @keyframes vsFadeUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}