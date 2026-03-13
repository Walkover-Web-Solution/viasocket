'use client';
import Image from "next/image";

// ─── Utility: hex to RGB string ──────────────────────────────────────
export function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "0,0,0";
}

// ─── Utility: shift hex color ────────────────────────────────────────
export function shiftColor(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── GlassCard ───────────────────────────────────────────────────────
export function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
}

// ─── AppIconBox ──────────────────────────────────────────────────────
export function AppIconBox({ src, size = 40 }) {
  return (
    <div className="app-icon-box" style={{ width: size, height: size }}>
      <Image alt="" src={src} width={size} height={size} />
    </div>
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────
export function SectionHeading({ title, subtitle, brandColor, highlightText }) {
  const barFrom = brandColor || theme.accent;
  const barTo = brandColor ? shiftColor(brandColor, 60) : theme.ambientGlow;

  const renderTitle = () => {
    if (!highlightText || !brandColor || !title.includes(highlightText)) {
      return title;
    }
    const idx = title.indexOf(highlightText);
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlightText.length);
    return (
      <>
        {before}
        <span style={{ color: brandColor }}>{highlightText}</span>
        {after}
      </>
    );
  };

  return (
    <div className="section-heading">
      <div
        className="accent-bar"
        style={{ background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }}
      />
      <h2 className="heading2">{renderTitle()}</h2>
      <p className="sub-heading2 max-w-lg">{subtitle}</p>
    </div>
  );
}

// ─── alternate sections will use this SectionBand component
export function SectionBand({ children }) {
  return (
    <div className="bg-section">
      <div className="relative">{children}</div>
    </div>
  );
} 

// ─── SectionDivider ──────────────────────────────────────────────────
export function SectionDivider() {
  return <div className="border-b primary-border" />;
}

