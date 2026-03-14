'use client';

import { shiftColor } from "./shared";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function TutorialsSection({ brandColor, appName, videoData }) {
  const accent = brandColor || "#000000";
  const barFrom = brandColor || "#000000";
  const barTo = brandColor ? shiftColor(brandColor, 60) : "#000000";

  const videos = videoData || [];
  const isScrollable = videos.length > 1;

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollByAmount = (dir = 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.6, 260) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const updateActiveByCenter = () => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(childCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });
    setActiveIndex(closest);
    updateScrollState();
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateActiveByCenter();
    el.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    updateActiveByCenter();
  }, [videoData]);

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[idx];
    if (!child) return;
    const left = child.offsetLeft + child.clientWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (videos.length > 2) {
      requestAnimationFrame(() => scrollToIndex(1));
    }
  }, []);

  if (!videos.length) return null;

  return (
    <section className="section">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div
            className="accent-bar rounded-sm mb-4"
            style={{ background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }}
          />
          <h2 className="heading2">
            Learn how to automate <span style={{ color: brandColor || "#34A853" }}>{appName || 'App'}</span>
          </h2>
          <p className="sub-heading2 mt-2 max-w-lg">
            Video tutorials to help you set up workflows in minutes.
          </p>
        </div>
        <Link href="https://www.youtube.com/@viasocket" target="_blank" className="primary-button shrink-0 self-start sm:self-auto no-underline">
          All tutorials
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          {isScrollable && (
            <button
              aria-label="Previous video"
              onClick={() => scrollByAmount(-1)}
              className={`hidden sm:flex items-center justify-center shrink-0 h-8 w-8 rounded-full bg-white border shadow-sm transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <div
            ref={scrollRef}
            className={`flex items-stretch gap-0 flex-1 min-w-0 ${isScrollable ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory' : ''}`}
            style={isScrollable ? { scrollbarWidth: 'none' } : undefined}
          >
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={video.rowid || index}
                  className="snap-center shrink-0 px-1 sm:px-2 transition-transform duration-300 ease-out"
                  style={{ minWidth: videos.length === 1 ? '100%' : '60%' }}
                >
                  <div className={`overflow-hidden border primary-border transition-all duration-300 ${isActive ? 'scale-100' : 'scale-[0.92] opacity-70'}`}>
                    <iframe
                      className="w-full aspect-video border-0"
                      src={video.links}
                      title={`Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {isScrollable && (
            <button
              aria-label="Next video"
              onClick={() => scrollByAmount(1)}
              className={`hidden sm:flex items-center justify-center shrink-0 h-8 w-8 rounded-full bg-white border shadow-sm transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {isScrollable && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {videos.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to video ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className="h-2 w-2 rounded-full cursor-pointer border-none transition-colors duration-200"
                style={{ backgroundColor: i === activeIndex ? accent : '#00000026' }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}