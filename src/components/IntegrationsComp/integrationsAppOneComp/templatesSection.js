'use client';
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import TemplateCard from "@/components/templateCard/templateCard";

// ─── Templates Section ───────────────────────────────────────────────
export default function TemplatesSection({ templateToShow, appOneDetails }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const appSlugs = useMemo(
    () => [appOneDetails].map((app) => app?.appslugname || app?.slugname || app?.slug).filter(Boolean),
    [appOneDetails]
  );

  const { filteredTemplates, handleFilterChange } = useTemplateFilters(templateToShow || []);

  useEffect(() => {
    if (appSlugs.length > 0) {
      handleFilterChange({ selectedApps: appSlugs, requireAllApps: true });
    }
  }, [appSlugs.join(','), handleFilterChange]);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateScrollState); ro.disconnect(); };
  }, [updateScrollState]);

  const onPointerDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const el = scrollRef.current;
    if (el) el.scrollLeft = dragScrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback((e) => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.scrollSnapType = "x mandatory";
      el.style.scrollBehavior = "smooth";
    }
  }, []);

  if (!filteredTemplates || filteredTemplates.length === 0) return null;

  return (
    <section className="section">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="heading2">
          Explore more automations built by businesses and experts
        </h2>
        <Link href="/automations" className="primary-button shrink-0 self-start sm:self-auto no-underline">
          Explore all templates
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden py-4 -my-4">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar select-none cursor-grab px-1 py-6"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {filteredTemplates.map((tmpl) => (
            <div key={tmpl.id || tmpl.title} className="template-card-slot shrink-0">
              <TemplateCard template={tmpl} preventClick={hasDragged} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: -400, behavior: "smooth" }); }}
          disabled={!canScrollLeft}
          className="carousel-arrow"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: 400, behavior: "smooth" }); }}
          disabled={!canScrollRight}
          className="carousel-arrow"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
