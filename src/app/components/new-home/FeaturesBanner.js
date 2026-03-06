'use client';
import {
  Sparkles,
  Workflow,
  LayoutGrid,
  Table2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const imgSlack = "https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg";
const imgGmail = "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png";

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

function AIAgentVisual() {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[280px] items-center">
      {/* Ticket chip */}
      <span
        className="text-xs px-2.5 py-[3px] rounded-[3px] font-semibold text-[#ef4444] bg-[#fef2f2] border border-[rgba(239,68,68,0.15)]"
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
        className="rounded overflow-hidden w-full border border-[rgba(124,58,237,0.2)]"
      >
        <div className="px-2.5 py-1 bg-[#7c3aed]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-white font-semibold">
              AI Agent
            </span>
          </div>
        </div>
        <div className="px-2.5 py-1.5 bg-[#faf8ff]">
          <span className="text-[11px] block text-[#7c3aed] font-medium">
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
        className="text-xs px-2.5 py-[3px] rounded-[3px] font-semibold text-[#059669] bg-[#f0fdf4] border border-[rgba(5,150,105,0.15)]"
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
          className="text-xs uppercase tracking-wider font-semibold"
        >
          When
        </span>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] min-w-0 bg-[#f8fdfd] border border-[#0891b21f]"
        >
          <Image
            src={imgGmail}
            alt="Gmail"
            className="w-7 h-7 rounded-[3px] object-contain shrink-0"
            width={28}
            height={28}
          />
          <div className="min-w-0">
            <span className="text-sm block truncate font-semibold">
              New email received
            </span>
            <span className="text-xs block text-[#6b7280]">
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
          className="text-[12px] uppercase tracking-wider font-semibold"
        >
          Do
        </span>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-[4px] min-w-0 bg-[#f8fdfd] border border-[#0891b21f]"
        >
          <Image
            src={imgSlack}
            alt="Slack"
            className="w-7 h-7 rounded-[3px] object-contain shrink-0"
            width={28}
            height={28}
          />
          <div className="min-w-0">
            <span className="text-sm block truncate font-semibold">
              Send message
            </span>
            <span className="text-xs block text-[#6b7280]">
              #leads channel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const allAppLogos = [
  { name: "Slack", src: "https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg" },
  { name: "Whatsapp", src: "https://thingsofbrand.com/api/icon/whatsapp.com" },
  { name: "Zoom", src: "https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg" },
  { name: "Airtable", src: "https://thingsofbrand.com/api/icon/airtable.com" },
  { name: "GoogleSheets", src: "https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png" },
  { name: "Hubspot", src: "https://thingsofbrand.com/api/icon/hubspot.com" },
  { name: "Figma", src: "https://thingsofbrand.com/api/icon/figma.com" },
  { name: "Pipedrive", src: "https://thingsofbrand.com/api/icon/pipedrive.com" },
  { name: "Quickbooks", src: "https://thingsofbrand.com/api/icon/quickbooks.com" },
  { name: "Xero", src: "https://thingsofbrand.com/api/icon/xero.com" },
  { name: "MSG91", src: "https://thingsofbrand.com/api/icon/msg91.com" },
  { name: "Mailchimp", src: "https://thingsofbrand.com/api/icon/mailchimp.com" },
  { name: "ActiveCampaign", src: "https://thingsofbrand.com/api/icon/activecampaign.com" },
  { name: "Zendesk", src: "https://thingsofbrand.com/api/icon/zendesk.com" },
  { name: "Shopify", src: "https://thingsofbrand.com/api/icon/shopify.com" },
  { name: "Trello", src: "https://thingsofbrand.com/api/icon/trello.com" },
  { name: "Asana", src: "https://thingsofbrand.com/api/icon/asana.com" },
  { name: "Clickup", src: "https://thingsofbrand.com/api/icon/clickup.com" },
  { name: "Notion", src: "https://thingsofbrand.com/api/icon/notion.com" },
  { name: "Github", src: "https://thingsofbrand.com/api/icon/github.com" },
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
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((app) => (
          <motion.div
            key={app.name}
            layout
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="w-[52px] h-[52px] rounded flex items-center justify-center relative bg-white border border-[var(--rail-color)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div
                className="relative shrink-0 overflow-hidden w-[26px] h-[26px]"
              >
                <Image
                  alt={app.name}
                  src={app.src}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  width={26}
                  height={26}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Tables: compact data table ── */
function TablesVisual() {
  const tableRows = [
    { name: "Acme Corp", email: "john@acme.co", status: "Qualified", statusClass: "text-white bg-[#10B981]" },
    { name: "Globex Inc", email: "sara@globex.io", status: "Nurture", statusClass: "text-[#92400e] bg-[#fde68a]" },
    { name: "Initech Ltd", email: "mike@init.dev", status: "New", statusClass: "text-white bg-[#2563EB]" },
    { name: "Wayne Ent", email: "bruce@wayne.co", status: "Qualified", statusClass: "text-white bg-[#10B981]" },
  ];

  return (
    <div
      className="rounded-[4px] overflow-hidden w-full max-w-[260px] bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
    >
      <div
        className="grid px-2.5 py-1.5 [grid-template-columns:1.2fr_1.2fr_0.8fr] border-b border-[rgba(0,0,0,0.08)]"
      >
        {["Company", "Email", "Status"].map((h) => (
          <span
            key={h}
            className="text-[10px] uppercase truncate text-[#a3a3a3] font-semibold tracking-[0.4px]"
          >
            {h}
          </span>
        ))}
      </div>
      {tableRows.map((r, idx, arr) => (
        <div
          key={r.name}
          className={`grid px-2.5 py-1.5 items-center [grid-template-columns:1.2fr_1.2fr_0.8fr] ${idx < arr.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : ""
            }`}
        >
          <span className="text-[11px] truncate pr-2 text-[#1f2937] font-semibold">
            {r.name}
          </span>
          <span className="text-[10px] truncate pr-2 text-[#6b7280]">
            {r.email}
          </span>
          <span
            className={`text-[9px] px-1.5 py-[1px] rounded-[3px] w-fit truncate font-semibold ${r.statusClass || "text-white bg-[#2563EB]"
              }`}
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
      className="w-full py-12 md:py-16 overflow-visible bg-white z-[1] relative"
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
                "linear-gradient(to bottom, var(--rail-color) 80%, transparent 100%)",
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
                "linear-gradient(to bottom, var(--rail-color) 80%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-[2]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-16 text-center"
          >
            <h2
              className="heading2"
            >
              Four Building Blocks.{" "}
              <span style={{ color: "#a3a3a3" }}>Infinite Automations.</span>
            </h2>
          </motion.div>

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
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={q.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
                            className="text-[20px] md:text-[22px] lg:text-[24px] tracking-[-0.4px] font-semibold"
                            style={{
                              color: q.accent,
                            }}
                          >
                            {q.label}
                          </span>
                        </div>

                        {/* Bold headline */}
                        <p
                          className="leading-[1.2] tracking-[-0.4px] text-[22px] -mt-1 font-bold"
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
                  </motion.div>
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
                border: "1px solid var(--rail-color)",
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