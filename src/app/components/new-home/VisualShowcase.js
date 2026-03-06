"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import FlowRenderer from "@/components/flowComp/flowRenderer";
import { IoMdArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import ZoomableFlowContainer from "@/components/flowComp/zoomableFlowContainer";
import Link from "next/link";

// /* ── Per-category workflow definitions ───────────────────────── */

function TemplateFlowPreview({ template }) {
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);
  const flowContainerRef = useRef(null);
  const [flowRendererHeight, setFlowRendererHeight] = useState('550px');

  return (
    <div
      ref={flowContainerRef}
      className="w-full h-full rounded-xl overflow-hidden flex justify-center items-start border custom-border p-6 relative dotted-background"
    >

      <ZoomableFlowContainer
        setScale={setScale}
        contentRef={contentRef}
        flowContainerRef={flowContainerRef}
        setFlowRendererHeight={setFlowRendererHeight}
        positionX="right-2"
        positionY="top-2"
      />
      <div
        style={{ height: flowRendererHeight }}
      >
        <FlowRenderer
          flowJson={template?.metadata?.flowJson ||
            template?.flowJson ||
            'https://placehold.co/600x400'}
          scale={scale * 100}
        />
      </div>
    </div>
  )
}

function buildTemplateLink(template) {
  if (!template?.id || !template?.title) return "/automations";

  return `/automations/${template.title
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()}/${template.id}`;
}

export default function VisualShowcase({
  activeCategoryIndex: controlledIndex,
  onActiveIndexChange,
  categoryData = [],
  templateData = [],
}) {
  const [internalIndex, setInternalIndex] = useState(0); // Default to "Support"
  const [isHovered, setIsHovered] = useState(false);

  const templateMap = useMemo(() => {
    const map = {};
    templateData.forEach((template) => {
      map[template?.id] = template;
    });
    return map;
  }, [templateData]);

  const showcaseCategories = useMemo(() => {
    if (!categoryData?.length) {
      return null;
    }

    return categoryData
      .map((item, index) => {
        const scriptId = item?.scriptid ?? item?.scriptId;
        const template = scriptId ? templateMap[scriptId] : null;
        const bgColor = item?.bgcolor || "#d6b6ec";

        return {
          label: item?.name || `Category ${index + 1}`,
          bgColor,
          headline: template?.title || `${item?.name || "Category"} workflows`,
          description:
            template?.metadata?.description ||
            template?.description || "Explore automation templates for this category.",
          template,
        };
      })
      .filter((item) => Boolean(item?.label));
  }, [categoryData, templateMap]);

  const totalCategories = showcaseCategories.length || 1;
  const activeIndex = controlledIndex ?? internalIndex;
  const normalizedActiveIndex = ((activeIndex % totalCategories) + totalCategories) % totalCategories;
  const setActiveIndex = (i) => {
    setInternalIndex(i);
    onActiveIndexChange?.(i);
  };
  const n = totalCategories;
  const goPrev = useCallback(() => setActiveIndex((normalizedActiveIndex - 1 + n) % n), [normalizedActiveIndex, n]);
  const goNext = useCallback(() => setActiveIndex((normalizedActiveIndex + 1) % n), [normalizedActiveIndex, n]);

  /* Keyboard arrow navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  return (
    <section
      className="w-full overflow-hidden relative bg-white pt-12 pb-16"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] relative z-10">
        {/* Category pills — top-left aligned */}
        <div className="flex flex-wrap gap-2 mb-8 justify-start">
          {showcaseCategories.map((pill, i) => {
            const isActive = i === normalizedActiveIndex;
            return (
              <button
                key={pill.label}
                onClick={() => setActiveIndex(i)}
                className="px-5 py-2.5 rounded-full transition-all duration-200"
                style={{
                  fontSize: 14,
                  background: isActive
                    ? "var(--black-color)"
                    : "transparent",
                  border: `1.5px solid ${isActive
                    ? "var(--black-color)"
                    : "rgba(0,0,0,0.25)"}`,
                  color: isActive
                    ? "#ffffff"
                    : "rgba(0,0,0,0.7)",
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--rail-color)";
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
        className="relative w-full !h-[clamp(540px,44vw,840px)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showcaseCategories.map((cardCat, i) => {
          /* Circular offset: always in range [-n/2, n/2] for correct wrap direction */
          const rawOffset = i - normalizedActiveIndex;
          let offset = ((rawOffset % n) + n) % n;
          if (offset > n / 2) offset -= n;

          const isActive = offset === 0;
          const cardTemplate = cardCat.template;
          const cardTemplateLink = buildTemplateLink(cardTemplate);
          const cardHeading = cardTemplate?.title || cardCat.headline;
          const cardDescription =
            cardTemplate?.metadata?.description || cardTemplate?.description || cardCat.description;
          const cardBg = cardCat.bgColor;

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
              className="vs-showcase-card absolute top-0 rounded-3xl overflow-hidden cursor-pointer"
              style={{
                "--vs-card-width": `${activeWidth}vw`,
                "--vs-card-bg": cardBg,
                "--vs-card-z-index": zIndex,
                "--vs-card-opacity": opacity,
                "--vs-card-transform": `translateX(${translateX}) scale(${scale})`,
              }}
              onClick={() => !isActive && setActiveIndex(i)}
            >
              <div className="absolute top-6 right-6 z-20">
                <Link
                  href={cardTemplateLink}
                  target="_blank"
                  className="text-sm flex items-center gap-1.5 cursor-pointer transition duration-150 hover:opacity-70 hover:scale-[1.03] active:scale-[0.97] font-semibold"
                >
                  Use this template
                  <MdArrowOutward />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full px-8 md:px-12 py-10 md:py-14 relative z-10 items-center">
                {/* Left — text content */}
                <div className="flex flex-col justify-center">
                  <h2
                    className="heading2 mb-4 max-w-[520px] lowercase first-letter:uppercase"
                  >
                    {cardHeading}
                  </h2>
                  <p
                    className="leading-[1.6] max-w-[460px] mb-6 sub-heading2"
                  >
                    {cardDescription}
                  </p>
                  <Link
                    href="/automations"
                    className="new-primary-btn"
                  >
                    Browse all templates
                    <IoMdArrowForward />
                  </Link>
                </div>

                {/* Right — workflow mockup */}
                <div className="h-full min-h-[280px] lg:min-h-[340px]">
                  <TemplateFlowPreview template={cardTemplate} />
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
            background: "var(--rail-color)",
            border: `1px solid rgba(0,0,0,0.1)`,
            backdropFilter: "blur(8px)",
            color: "var(--black-color)",
            pointerEvents: isHovered ? "auto" : "none",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--rail-color)";
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
            background: "var(--rail-color)",
            border: `1px solid rgba(0,0,0,0.1)`,
            backdropFilter: "blur(8px)",
            color: "var(--black-color)",
            pointerEvents: isHovered ? "auto" : "none",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--rail-color)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}