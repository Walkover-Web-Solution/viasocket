'use client';
import {
  Sparkles,
  Workflow,
  LayoutGrid,
  Table2,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";

/* ── App logos (Figma assets) ─────────────────────────────────── */
const imgTypeform = "https://thingsofbrand.com/api/icon/typeform.io";
const imgSlack = "https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg";
const imgGmail = "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png";

/* ── Quadrant data ─────────────────────────────────────────── */
const quadrants = [
  {
    label: "AI Agents",
    accent: "#7c3aed",
    icon: Sparkles,
    headline: "Your workflow hits a decision. AI makes it. No human needed.",
    description:
      "AI steps score leads, classify tickets, draft emails — real decisions, not just triggers.",
  },
  {
    label: "No-Code Workflows",
    accent: "#0891b2",
    icon: Workflow,
    headline: "If this happens, do that. Runs forever. Zero maintenance.",
    description:
      "Drag triggers, conditions, and actions into flows that run 24/7 without writing a line of code.",
  },
  {
    label: "2,000+ Integrations",
    accent: "#059669",
    icon: LayoutGrid,
    headline: "Every app you use already works with ViaSocket. No setup.",
    description:
      "Slack, HubSpot, Stripe, Salesforce, Notion — 2,000+ apps ready out of the box.",
  },
  {
    label: "Tables",
    accent: "#e11d48",
    icon: Table2,
    headline: "Your automation needs somewhere to store data. It's built in.",
    description:
      "Store, filter, and act on structured data right inside your workflows.",
  },
];

/* ══════════════════════════════════════════════════════════════
   VISUALS — compact, right-aligned within each quadrant
   ═══════════════════════════════════════════════════════════════ */

/* ── AI Agents: AI Agent decision tile only ── */
function AIAgentVisual() {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[280px] items-center">
      {/* Ticket chip */}
      <span
        className="text-[12px] px-2.5 py-[3px] rounded-[3px]"
        style={{ color: "#ef4444", background: "#fef2f2", border: "1px solid rgba(239,68,68,0.15)", fontWeight: 600 }}
      >
        Ticket #4821
      </span>

      {/* Arrow down */}
      <div className="flex justify-center">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M7 0v14M2 11l5 5 5-5" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* AI Agent tile */}
      <div
        className="rounded-[4px] overflow-hidden w-full"
        style={{ border: "1px solid rgba(124,58,237,0.2)" }}
      >
        <div className="px-2.5 py-1" style={{ background: "#7c3aed" }}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[12px] text-white" style={{ fontWeight: 600 }}>
              AI Agent
            </span>
          </div>
        </div>
        <div className="px-2.5 py-1.5" style={{ background: "#faf8ff" }}>
          <span className="text-[11px] block" style={{ color: "#7c3aed", fontWeight: 500 }}>
            Priority: High · Sentiment: Frustrated
          </span>
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M7 0v14M2 11l5 5 5-5" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Escalate chip */}
      <span
        className="text-[12px] px-2.5 py-[3px] rounded-[3px]"
        style={{ color: "#059669", background: "#f0fdf4", border: "1px solid rgba(5,150,105,0.15)", fontWeight: 600 }}
      >
        Escalate to Senior Agent
      </span>
    </div>
  );
}

/* ── Workflows: WHEN Gmail → THEN Slack (simple 2-step) ── */
function WorkflowVisual() {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
      {/* Step 1: Trigger */}
      <div className="flex flex-col gap-1.5">
        <span
          className="text-[12px] uppercase tracking-wider"
          style={{ color: "#0a0a0a", fontWeight: 600 }}
        >
          When
        </span>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] min-w-0"
          style={{ background: "#f8fdfd", border: "1px solid rgba(8,145,178,0.12)" }}
        >
          <img
            src={imgGmail}
            alt="Gmail"
            className="w-7 h-7 rounded-[3px] object-contain shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[14px] block truncate" style={{ color: "#0a0a0a", fontWeight: 600 }}>
              New email received
            </span>
            <span className="text-[12px] block" style={{ color: "#6b7280" }}>
              Gmail
            </span>
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center">
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <path d="M9 0v22M3 18l6 7 6-7" stroke="#b2e0e8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Step 2: Action */}
      <div className="flex flex-col gap-1.5">
        <span
          className="text-[12px] uppercase tracking-wider"
          style={{ color: "#0a0a0a", fontWeight: 600 }}
        >
          Do
        </span>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] min-w-0"
          style={{ background: "#f8fdfd", border: "1px solid rgba(8,145,178,0.12)" }}
        >
          <img
            src={imgSlack}
            alt="Slack"
            className="w-7 h-7 rounded-[3px] object-contain shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[14px] block truncate" style={{ color: "#0a0a0a", fontWeight: 600 }}>
              Send message
            </span>
            <span className="text-[12px] block" style={{ color: "#6b7280" }}>
              #leads channel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Integrations: rotating logo grid with app icons ── */
const allAppLogos = [
  { name: "Slack", src: "https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg", direct: true },
  { name: "Microsoft", src: "https://thingsofbrand.com/api/icon/teams.microsoft.com", direct: true },
  { name: "Zoom", src: "https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg", direct: true },
  { name: "Gmail", src: "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png", direct: true },
  { name: "GoogleSheets", src: "https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png", direct: true },
  { name: "Hubspot", src: "https://thingsofbrand.com/api/icon/hubspot.com", direct: true },
  { name: "Salesforce", src: "https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png", direct: true },
  { name: "Pipedrive", src: "https://thingsofbrand.com/api/icon/pipedrive.com", direct: true },
  { name: "Quickbooks", src: "https://thingsofbrand.com/api/icon/quickbooks.com", direct: true },
  { name: "Xero", src: "https://thingsofbrand.com/api/icon/xero.com", direct: true },
  { name: "MSG91", src: "https://thingsofbrand.com/api/icon/msg91.com", direct: true },
  { name: "Mailchimp", src: "https://thingsofbrand.com/api/icon/mailchimp.com", direct: true },
  { name: "ActiveCampaign", src: "https://thingsofbrand.com/api/icon/activecampaign.com", direct: true },
  { name: "Zendesk", src: "https://thingsofbrand.com/api/icon/zendesk.com", direct: true },
  { name: "Freshdesk", src: "https://thingsofbrand.com/api/icon/freshdesk.com", direct: true },
  { name: "Trello", src: "https://thingsofbrand.com/api/icon/trello.com", direct: true },
  { name: "Asana", src: "https://thingsofbrand.com/api/icon/asana.com", direct: true },
  { name: "Clickup", src: "https://thingsofbrand.com/api/icon/clickup.com", direct: true },
  { name: "Notion", src: "https://thingsofbrand.com/api/icon/notion.com", direct: true },
  { name: "Fireflies", src: "https://thingsofbrand.com/api/icon/fireflies.ai", direct: true },
];

const VISIBLE_COUNT = 6;

function IntegrationsVisual() {
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % allAppLogos.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const visible = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    visible.push(allAppLogos[(startIdx + i) % allAppLogos.length]);
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[180px]">
      {visible.map((app) => (
          <div key={app.name} className="relative">
            <div
              className="w-[52px] h-[52px] rounded-[4px] flex items-center justify-center relative"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: app.direct ? 26 : (app.w ?? 24) * 1.2,
                  height: app.direct ? 26 : (app.h ?? 24) * 1.2,
                }}
              >
                {app.direct ? (
                  <img
                    alt=""
                    src={app.src}
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  />
                ) : (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      src={app.src}
                      className={`absolute max-w-none pointer-events-none ${app.imgClass}`}
                    />
                  </div>
                )}
              </div>
              {/* Green active dot */}
              {/* removed */}
            </div>
          </div>
        ))}
    </div>
  );
}

/* ── Tables: compact data table ── */
function TablesVisual() {
  const tableRows = [
    { name: "Acme Corp", email: "john@acme.co", status: "Qualified", sc: "white", bg: "#10B981" },
    { name: "Globex Inc", email: "sara@globex.io", status: "Nurture", sc: "#92400e", bg: "#fde68a" },
    { name: "Initech Ltd", email: "mike@init.dev", status: "New", sc: "white", bg: "#2563EB" },
    { name: "Wayne Ent", email: "bruce@wayne.co", status: "Qualified", sc: "white", bg: "#10B981" },
  ];

  return (
    <div
      className="rounded-[4px] overflow-hidden w-full max-w-[260px]"
      style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <div
        className="grid px-2.5 py-1.5"
        style={{
          gridTemplateColumns: "1.2fr 1.2fr 0.8fr",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {["Company", "Email", "Status"].map((h) => (
          <span
            key={h}
            className="text-[10px] uppercase truncate"
            style={{ color: "#a3a3a3", fontWeight: 600, letterSpacing: "0.4px" }}
          >
            {h}
          </span>
        ))}
      </div>
      {tableRows.map((r, idx, arr) => (
        <div
          key={r.name}
          className="grid px-2.5 py-1.5 items-center"
          style={{
            gridTemplateColumns: "1.2fr 1.2fr 0.8fr",
            borderBottom: idx < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
          }}
        >
          <span className="text-[11px] truncate pr-2" style={{ color: "#1f2937", fontWeight: 600 }}>
            {r.name}
          </span>
          <span className="text-[10px] truncate pr-2" style={{ color: "#6b7280" }}>
            {r.email}
          </span>
          <span
            className="text-[9px] px-1.5 py-[1px] rounded-[3px] w-fit truncate"
            style={{ color: r.sc, background: r.bg, fontWeight: 600 }}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

const visualComponents = [AIAgentVisual, WorkflowVisual, IntegrationsVisual, TablesVisual];

export function CoreCapabilities() {
  return (
    <section
      className="w-full py-12 md:py-16 overflow-visible"
      style={{ background: "#ffffff", zIndex: 1, position: "relative" }}
    >
      <div className="relative max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px]">
        {/* Decorative grid rails */}
        <div
          className="absolute -top-12 -bottom-12 left-0 right-0 pointer-events-none hidden lg:block z-[1]"
          aria-hidden="true"
        >
          <div
            className="absolute"
            style={{
              top: -16,
              bottom: 0,
              left: 115,
              width: 2,
              borderRadius: 1,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.06) 80%, transparent 100%)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: -16,
              bottom: 0,
              right: 115,
              width: 2,
              borderRadius: 1,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.06) 80%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-[2]">
          {/* Centered headline */}
          <div className="mb-14 md:mb-16 text-center">
            <h2
              className="text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] tracking-[-0.8px] lg:tracking-[-1.2px]"
              style={{
                color: "#0a0a0a",
                fontWeight: 700,
              }}
            >
              Four Building Blocks.{" "}
              <span style={{ color: "#a3a3a3" }}>Infinite Automations.</span>
            </h2>
          </div>

          {/* 2x2 editorial grid with divider lines */}
          <div className="relative">
            {/* Horizontal divider — between rows (desktop) */}
            <div
              className="hidden md:block absolute left-0 right-0 pointer-events-none"
              style={{
                top: "50%",
                height: 1,
                background: "rgba(0,0,0,0.08)",
              }}
            />
            {/* Vertical divider — between columns (desktop) */}
            <div
              className="hidden md:block absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: "50%",
                width: 1,
                background: "rgba(0,0,0,0.08)",
              }}
            />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {quadrants.map((q, i) => {
                const Visual = visualComponents[i];
                const Icon = q.icon;
                const isTop = i < 2;
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={q.label}
                    className="flex flex-col md:flex-row items-start gap-6 md:gap-8"
                    style={{
                      padding: "40px 0",
                      minHeight: 280,
                      paddingLeft: isLeft ? 0 : undefined,
                      paddingRight: isLeft ? undefined : 0,
                    }}
                  >
                    {/* Inner padding wrapper */}
                    <div
                      className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 w-full"
                      style={{
                        paddingLeft: !isLeft ? 32 : 0,
                        paddingRight: isLeft ? 32 : 0,
                      }}
                    >
                      {/* Text side */}
                      <div className="flex-1 min-w-0">
                        {/* Colored label with icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                            style={{ background: `${q.accent}18` }}
                          >
                            <Icon
                              className="w-[18px] h-[18px]"
                              style={{ color: q.accent }}
                            />
                          </div>
                          <span
                            className="text-[20px] md:text-[22px] lg:text-[24px] tracking-[-0.4px]"
                            style={{
                              color: q.accent,
                              fontWeight: 600,
                            }}
                          >
                            {q.label}
                          </span>
                        </div>

                        {/* Bold headline */}
                        <p
                          className="leading-[1.2] tracking-[-0.4px] text-[22px] -mt-1"
                          style={{
                            color: "#0a0a0a",
                            fontWeight: 700,
                          }}
                        >
                          {(() => {
                            const lastDot = q.headline.lastIndexOf(". ", q.headline.length - 2);
                            if (lastDot === -1) return q.headline;
                            const main = q.headline.slice(0, lastDot + 1);
                            const last = q.headline.slice(lastDot + 2);
                            return (
                              <>
                                {main}
                                <br />
                                {last}
                              </>
                            );
                          })()}
                        </p>
                      </div>

                      {/* Compact visual — right-aligned */}
                      <div
                        className="shrink-0 flex items-start justify-end mt-1 p-4 rounded-[6px]"
                        style={{
                          border: "1px solid rgba(0,0,0,0.07)",
                          background: "rgba(0,0,0,0.015)",
                        }}
                      >
                        <Visual />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Intersection dots at divider crossing (desktop) */}
            <div
              className="hidden md:block absolute w-[8px] h-[8px] rounded-full pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#f0f0f0",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            />
          </div>

          {/* Mobile dividers between stacked quadrants */}
          <style>{`
            @media (max-width: 767px) {
              .grid > div:not(:last-child) {
                border-bottom: 1px solid rgba(0,0,0,0.08);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}