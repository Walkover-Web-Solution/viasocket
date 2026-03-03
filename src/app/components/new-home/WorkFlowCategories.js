"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export const categories = [
  {
    label: "Marketing",
    color: "#2563EB",
    headline: "Run campaigns on autopilot",
    description: "Sync leads from forms to your CRM, trigger personalized email sequences, and update ad audiences — all without touching a spreadsheet.",
    examples: ["Form → HubSpot enrichment", "Webinar signup → drip sequence", "Lead score → ad audience sync"],
  },
  {
    label: "Sales",
    color: "#8B5CF6",
    headline: "Close faster with AI-scored leads",
    description: "Every inbound lead gets scored, enriched, and routed to the right rep instantly. AI drafts the follow-up email before your team finishes coffee.",
    examples: ["Lead form → AI scoring → CRM", "Deal stage change → Slack alert", "Meeting booked → prep doc generated"],
  },
  {
    label: "Support",
    color: "#10B981",
    headline: "Resolve tickets before they escalate",
    description: "AI classifies incoming tickets, routes them to the right agent, and drafts initial responses. Average resolution time drops from hours to minutes.",
    examples: ["Ticket created → AI classify → route", "SLA breach → escalation workflow", "Resolution → satisfaction survey"],
  },
  {
    label: "HR",
    color: "#F59E0B",
    headline: "Onboard new hires without the busywork",
    description: "New employee in your HRIS triggers account creation across Slack, Google Workspace, Notion, and 1Password — automatically, on day one.",
    examples: ["Offer accepted → provision accounts", "Start date → welcome workflow", "90-day check-in → manager nudge"],
  },
  {
    label: "Finance",
    color: "#06B6D4",
    headline: "Automate approvals and reconciliation",
    description: "Expense reports get auto-checked against policy, invoices sync between tools, and anomalies surface before they become problems.",
    examples: ["Invoice received → match PO → approve", "Expense submitted → policy check", "Payment complete → book to ledger"],
  },
  {
    label: "Engineering",
    color: "#CA7AFF",
    headline: "Ship faster with CI/CD + ops automation",
    description: "Connect GitHub, Jira, and PagerDuty into workflows that auto-triage incidents, update status pages, and keep everyone in the loop.",
    examples: ["PR merged → deploy → Slack notify", "Alert fired → incident ticket created", "Sprint end → changelog generated"],
  },
];

export function WorkflowCategories({ activeIndex: controlledIndex, onActiveIndexChange }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;
  const setActiveIndex = (i) => {
    setInternalIndex(i);
    onActiveIndexChange?.(i);
  };

  const current = categories[activeIndex];  

  return (
    <section
      className="w-full pt-24 pb-6 relative overflow-hidden transition-colors duration-500"
    >
      {/* Dynamic radial glow that follows active category color */}
      <div
        key={current.color}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 120% at 50% 75%, ${current.color}28 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }}
      />
      <div className="max-w-[1540px] mx-auto px-8 relative z-10">
        {/* Section label */}
        <p
          className="text-xs tracking-[0.1em] uppercase mb-5"
          style={{ color: "#2563EB" }}
        >
          Built for every team
        </p>

        {/* Category pills — Hick's Law: all visible, one selected */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveIndex(i)}
              className="px-5 py-2.5 rounded-full transition-all duration-250 cursor-pointer"
              style={{
                fontSize: 15.6,
                background: i === activeIndex
                  ? `${cat.color}20`
                  : "rgba(235,235,235,0.23)",
                border: `1.2px solid ${i === activeIndex
                  ? `${cat.color}60`
                  : "rgba(0,0,0,0.13)"}`,
                color: i === activeIndex
                  ? cat.color
                  : "rgba(0,0,0,0.55)",
                fontWeight: i === activeIndex ? 500 : 400,
                boxShadow: i === activeIndex
                  ? `0 2.4px 9.6px ${cat.color}17`
                  : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content area — animated per category */}
        <div className="min-h-[260px]">
            <div
              key={current.label}
              className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start"
              style={{ animation: "wfFadeSlide 260ms ease" }}
            >
              {/* Left — headline + description */}
              <div>
                <h2
                  className="text-[42px] leading-[1.15] tracking-[-1.2px] mb-4"
                  style={{ color: "#0a0a0a", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  {current.headline}
                </h2>
                <p
                  className="text-[16px] leading-[1.65] mb-6 max-w-[520px]"
                  style={{ color: "rgba(0,0,0,0.68)" }}
                >
                  {current.description}
                </p>
                <button
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 flex items-center gap-2"
                  style={{ boxShadow: "0 0 20px rgba(37,99,235,0.15)" }}
                >
                  Explore {current.label} Workflows
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right — example workflows (3 items) */}
              <div
                className="rounded-2xl p-6 space-y-4"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                }}
              >
                <p
                  className="text-[11px] tracking-[0.06em] uppercase mb-2"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                >
                  Example automations
                </p>
                {current.examples.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `${current.color}12`,
                        border: `1px solid ${current.color}25`,
                      }}
                    >
                      <Check className="w-3 h-3" style={{ color: current.color }} />
                    </div>
                    <span
                      className="text-[14px] leading-[1.5]"
                      style={{ color: "rgba(0,0,0,0.68)" }}
                    >
                      {ex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes wfFadeSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}