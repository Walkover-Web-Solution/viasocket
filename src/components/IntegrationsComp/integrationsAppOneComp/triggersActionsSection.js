'use client';
import { useState } from "react";
import { ArrowRight, ChevronDown, Zap, Layers, Sparkles } from "lucide-react";
import { hexToRgb, SectionHeading } from "./shared";
import IntegrationsRequestComp from "../IntegrationsBetaComp/integrationsRequestComp";

// ─── TA Row ──────────────────────────────────────────────────────────
function TARow({ name, desc, color, isTrigger }) {
  const cRgb = hexToRgb(color);
  return (
    <div
      className="ta-row flex items-start gap-4 "
      style={{ "--row-rgb": cRgb }}
    >
      <div className="ta-icon-box flex items-center justify-center shrink-0">
        {isTrigger ? <Zap size={16} style={{ color }} /> : <Layers size={16} style={{ color }} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs mt-1 line-clamp-1">{desc}</p>
      </div>
    </div>
  );
}

// ─── TA Column ───────────────────────────────────────────────────────
function TAColumn({ type, color, items, appName, appOneDetails }) {
  const isTrigger = type === "trigger";
  const label = isTrigger ? "Triggers" : "Actions";
  const headerText = isTrigger ? "When this happens\u2026" : "Then do this\u2026";
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [requestModal, setRequestModal] = useState(false);
  const cRgb = hexToRgb(color);
  const visibleItems = items.slice(0, visibleCount);
  const showMore = visibleCount < items.length;

  return (
    <div
      className="flex flex-col"
      style={{ "--row-color": color, "--row-rgb": cRgb }}
    >
      {/* Header */}
      <div className="ta-column-header">
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="flex items-center" style={{ color }}>
            {isTrigger ? <Zap size={16} strokeWidth={2.2} /> : <Layers size={16} strokeWidth={2.2} />}
          </span>
          <span className="font-bold text-lg">{headerText}</span>
          <span
            className="label-text ta-badge "
            style={{ color, backgroundColor: `rgba(${cRgb},0.13)` }}
          >
            {label}
          </span>
        </div>
        <p className="font-semibold text-gray-500 text-sm">
          {isTrigger ? "A trigger is an event that starts a workflow." : `Action is the task that follows automatically within your ${appName || 'app'} integrations.`}
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2.5">
        {visibleItems.map((item, i) => (
          <TARow key={item.name} name={item.name} desc={item.desc} index={i} color={color} isTrigger={isTrigger} />
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 mt-3.5">
        <button
          onClick={() => setRequestModal(true)}
          className="ta-request-btn flex items-center gap-2 cursor-pointer rounded-md"
        >
          <Sparkles size={14} />
          Request a {isTrigger ? "Trigger" : "Action"}
          <ArrowRight size={14} />
        </button>

        {requestModal && (
          <IntegrationsRequestComp
            appInfo={appOneDetails}
            type={isTrigger ? "trigger" : "action"}
            onClose={() => setRequestModal(false)}
          />
        )}

        {showMore && (
          <button
            onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
            className="outline-button"
          >
            Load More
            <ChevronDown size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Triggers & Actions Section ──────────────────────────────────────
export default function TriggersActionsSection({ brandColor, appOneDetails, combosData }) {
  const hasCombos = combosData?.combinations?.length > 0;

  // Categorize events from appOneDetails
  const triggers = [];
  const actions = [];
  appOneDetails?.events?.forEach((event) => {
    const item = { name: event.name, desc: event.description || "" };
    if (event.type === "trigger") triggers.push(item);
    else if (event.type === "action") actions.push(item);
  });

  const appName = appOneDetails?.name || "App";
  const triggerColor = "#059669";
  const actionColor = "#1d4ed8";

  if (!hasCombos) return null;

  return (
    <section className="section">
      <SectionHeading
        title={`Available Triggers & Actions for ${appName}`}
        subtitle={`These are the triggers and actions you can use to build automations with ${appName} on viaSocket.`}
        brandColor={brandColor}
        highlightText={appName}
      />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 tracking-wide">
          {triggers.length > 0 && (
            <div className="p-6 sm:p-7 max-md:border-b md:border-r primary-border">
              <TAColumn type="trigger" color={triggerColor} items={triggers} appOneDetails={appOneDetails} />
            </div>
          )}
          {actions.length > 0 && (
            <div className="p-6 sm:p-7">
              <TAColumn type="action" color={actionColor} items={actions} appName={appName} appOneDetails={appOneDetails} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

