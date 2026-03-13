'use client';
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hexToRgb, shiftColor } from "./shared";
import IntegrationsBetaComp from "../IntegrationsBetaComp/IntegrationsBetaComp";
import IntegrationsEventsComp from "../integrationsEventsComp/integrationsEventsComp";

// ─── ReadyToUse Card ─────────────────────────────────────────────────
function ReadyToUseCard({ item }) {
  const Wrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper {...wrapperProps} className="rtu-card cursor-pointer flex flex-col lg:flex-row lg:items-center relative  no-underline">
      {/* Icon pair with connector */}
      <div className="flex items-center shrink-0 gap-1.5">
        <div className="w-11 h-11 bg-white border primary-border shadow-sm flex items-center justify-center shrink-0">
          <Image src={item.icon1} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
        </div>
        <svg width="32" height="14" viewBox="0 0 32 14" fill="none" className="rtu-connector shrink-0">
          <line x1="2" y1="7" x2="22" y2="7" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 3 L28 7 L20 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div className="w-11 h-11 bg-white border primary-border shadow-sm flex items-center justify-center shrink-0">
          <Image src={item.icon2} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 mt-3 lg:mt-0 lg:ml-5">
        <p className="text-base font-semibold leading-6 text-gray-950 m-0">{item.desc}</p>
      </div>

      {/* Arrow CTA */}
      <div className="rtu-arrow-btn flex items-center justify-center shrink-0  mt-3 lg:mt-0 lg:ml-4">
        <ArrowRight size={15} />
      </div>
    </Wrapper>
  );
}

// ─── Ready-to-Use Section ────────────────────────────────────────────
export default function ReadyToUseSection({ brandColor, combosData, appOneDetails }) {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const bcRgb = hexToRgb(brandColor);

  const filteredCombos = combosData?.combinations?.filter(
    (combo) => combo?.description && !/^(List|Get)\b/i.test(combo.description.trim())
  );
  const combinations = (filteredCombos?.length > 0 ? filteredCombos : combosData?.combinations) || [];
  const hasCombos = combinations.length > 0;
  const isBeta = !hasCombos && !appOneDetails?.events?.length;

  // Map combo data to card items
  const automations = combinations.map((combo) => {
    const triggerPlugin = combosData?.plugins?.[combo?.trigger?.name];
    const actionPlugin = combosData?.plugins?.[combo?.actions?.[0]?.name];
    const integrations = triggerPlugin?.rowid + ',' + actionPlugin?.rowid;

    return {
      icon1: triggerPlugin?.iconurl || 'https://placehold.co/40x40',
      icon2: actionPlugin?.iconurl || 'https://placehold.co/40x40',
      desc: combo?.description,
      link: `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions?.map((a) => a?.id).join(',')}&integrations=${integrations}&action&`,
    };
  });

  const visible = automations.slice(0, visibleCount);
  const showMore = visibleCount < automations.length;

  return (
    <section
      className="section"
      style={{ "--bc": brandColor, "--bc-rgb": bcRgb }}
    >
      {/* Header */}
      {combosData?.combinations?.length > 0 &&
        (
          <div className="mb-10">
            <div
              className="accent-bar rounded-sm mb-4"
              style={{ background: `linear-gradient(90deg, ${brandColor}, ${shiftColor(brandColor, 60)})` }}
            />
            <h2 className="heading2 mb-2.5">
              Ready-to-use <span style={{ color: brandColor }}>{appOneDetails?.name}</span> automations
            </h2>
            <p className="sub-heading2 max-w-lg">
              Pre-built workflows you can activate in one click — no setup required.
            </p>
          </div>
        )
      }
      {hasCombos ? (
        <>
          {/* Card grid */}
          <div className="section-container p-5">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {visible.map((item, i) => (
                <ReadyToUseCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Show more */}
          {showMore && (
            <div className="flex justify-center mt-7">
              <button
                onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
                className="outline-button"
              >
                Load More
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      ) : isBeta ? (
        <IntegrationsBetaComp appOneDetails={appOneDetails} />
      ) : (
        <IntegrationsEventsComp appOneDetails={appOneDetails} />
      )}
    </section>
  );
}
