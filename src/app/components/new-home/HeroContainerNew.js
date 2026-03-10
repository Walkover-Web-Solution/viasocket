"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Play, Sparkles, Workflow } from "lucide-react";
import { LiveWorkflowCanvas, ACCENT_COLORS } from "./LiveWorkflowCanvas";

const heroTheme = {
  bg: "#ffffff",
  gridLineColor: "#000",
  gridLeftOpacity: 0.025,
  gridRightOpacity: 0.06,
  logoFilter: "brightness(0)",
  headlineAccentColor: "#2563EB",
  subtitleColor: "rgba(0,0,0,0.7)",
  ctaShadow: "0 0 30px rgba(37,99,235,0.2)",
  ctaShadowHover: "0 0 40px rgba(37,99,235,0.35)",
  watchTextColor: "rgba(0,0,0,0.65)",
  watchTextHover: "rgba(0,0,0,0.8)",
  playBtnBg: "rgba(0,0,0,0.04)",
  playBtnBorder: "rgba(0,0,0,0.08)",
  playBtnBgHover: "rgba(0,0,0,0.08)",
  playBtnBorderHover: "rgba(0,0,0,0.15)",
  playIconFill: "rgba(0,0,0,0.5)",
  playIconFillHover: "rgba(0,0,0,0.8)",
  trustLabel: "rgba(0,0,0,0.55)",
  starInactive: "rgba(0,0,0,0.12)",
  reviewText: "rgba(0,0,0,0.6)",
  reviewHighlight: "rgba(0,0,0,0.78)",
  reviewCount: "rgba(0,0,0,0.45)",
};

const useCases = [
  { title: "Turn emails into actionable tasks.", description: "AI reads your inbox, classifies intent, and routes tasks to the right tool." },
  { title: "Qualify inbound leads automatically.", description: "AI scores every submission and routes high-intent leads to sales instantly." },
  { title: "Never lose a sale to a failed payment.", description: "Every transaction triggers instant validation. Failed payments get retried, customers get notified, revenue gets recovered — all on autopilot." },
];

export default function HeroContainerNew() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = heroTheme;

  return (
    <div className="min-h-[92vh] relative overflow-hidden" style={{ backgroundColor: t.bg }}>
      {/* Unified Grid Background with Gradient Density */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[45%]"
          style={{
            backgroundImage: `radial-gradient(circle, ${t.gridLineColor} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: t.gridLeftOpacity,
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.35)), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3))",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.35)), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3))",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Right side */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[55%]"
          style={{
            backgroundImage: `radial-gradient(circle, ${t.gridLineColor} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: t.gridRightOpacity,
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,1)), radial-gradient(ellipse 800px 250px at 50% 80px, rgba(0,0,0,0.3), rgba(0,0,0,1))",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,1)), radial-gradient(ellipse 800px 250px at 50% 80px, rgba(0,0,0,0.3), rgba(0,0,0,1))",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>

      {/* Main Activation Surface */}
      <div className="relative z-10 min-h-[92vh] flex items-center">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] py-12 md:py-20 relative">
          {/* Decorative grid rails — vertical boundary lines + intersection dots (matches footer grid) */}
          {/* Top horizontal rail — full width, breaks out of container */}
          <div
            className="absolute pointer-events-none hidden lg:block z-[1]"
            style={{
              top: 55,
              left: "calc(-50vw + 50%)",
              right: "calc(-50vw + 50%)",
              height: 2,
              borderRadius: 1,
              background: "var(--rail-color)",
            }}
          />
          {/* Bottom horizontal rail — full width, visible on all screens */}
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              bottom: 9,
              left: "calc(-50vw + 50%)",
              right: "calc(-50vw + 50%)",
              height: 2,
              borderRadius: 1,
              background: "var(--rail-color)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-[1]" aria-hidden="true">
            {/* Left vertical rail — full height */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: 115,
                width: 2,
                borderRadius: 1,
                background: "var(--rail-color)",
              }}
            />
            {/* Right vertical rail — full height */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                right: 115,
                width: 2,
                borderRadius: 1,
                background: "var(--rail-color)",
              }}
            />
            {/* Top-left dot (intersection of horizontal + left vertical) */}
            <svg className="absolute" style={{ left: 116, top: 55, width: 10, height: 10, transform: "translate(-50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
            {/* Top-right dot (intersection of horizontal + right vertical) */}
            <svg className="absolute" style={{ right: 116, top: 55, width: 10, height: 10, transform: "translate(50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
            {/* Bottom-left dot */}
            <svg className="absolute" style={{ left: 116, bottom: 0, width: 10, height: 10, transform: "translate(-50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
            {/* Bottom-right dot */}
            <svg className="absolute" style={{ right: 116, bottom: 0, width: 10, height: 10, transform: "translate(50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-10 lg:gap-20 items-start relative z-[2]">
            {/* LEFT SIDE - Document Style */}
            <div className="space-y-7 pt-4 lg:pt-12">
              {/* Logo */}
              <div>
                <Image
                  src="/assets/brand/logo.svg"
                  alt="viaSocket"
                  width={160}
                  height={36}
                  className="h-9 w-auto opacity-90"
                  style={{ filter: t.logoFilter }}
                />
              </div>

              {/* Feature Chips — above headline */}
              <FeatureChips />

              {/* Main Headline */}
              <div className="space-y-5">
                <h1
                  className="heading1"
                >
                  Stop repetitive work.
                  <br />
                  Build flows that
                  <br />
                  <span
                    className="font-semibold transition-colors duration-500"
                    style={{ color: ACCENT_COLORS[activeIndex] }}
                  >
                    think.
                  </span>
                </h1>

                <p className="sub-heading2">
                  Create reliable workflows. Add AI when you need decisions, not just triggers. No code required.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-5">
                  <Link
                    href="/signup?utm_source=/hero"
                    className="new-primary-btn"
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,0,0,0.25)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 30px rgba(0,0,0,0.15)")}
                  >
                    Start Automating
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="https://youtu.be/iXeq8A5u988?si=umoNftFnExlruzi3"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="group flex items-center gap-2.5 text-[14px] transition-colors cursor-pointer"
                    style={{ color: t.watchTextColor, fontWeight: 500 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = t.watchTextHover;
                      const circle = e.currentTarget.querySelector('[data-play-circle]');
                      if (circle) {
                        circle.style.backgroundColor = t.playBtnBgHover;
                        circle.style.borderColor = t.playBtnBorderHover;
                        circle.style.transform = 'scale(1.1)';
                      }
                      const icon = e.currentTarget.querySelector('[data-play-icon]');
                      if (icon) icon.style.fill = t.playIconFillHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = t.watchTextColor;
                      const circle = e.currentTarget.querySelector('[data-play-circle]');
                      if (circle) {
                        circle.style.backgroundColor = t.playBtnBg;
                        circle.style.borderColor = t.playBtnBorder;
                        circle.style.transform = 'scale(1)';
                      }
                      const icon = e.currentTarget.querySelector('[data-play-icon]');
                      if (icon) icon.style.fill = t.playIconFill;
                    }}
                  >
                    <div
                      data-play-circle
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{ backgroundColor: t.playBtnBg, border: `1px solid ${t.playBtnBorder}` }}
                    >
                      <Play data-play-icon className="w-3 h-3 ml-0.5 transition-all duration-200" style={{ fill: t.playIconFill }} />
                    </div>
                    Watch 2-minute overview
                  </Link>
                </div>
              </div>

              {/* Social Proof */}
              <div className="pt-8 space-y-4">
                <p
                  className="text-[13px] uppercase tracking-[0.08em]"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  Trusted by Teams Using
                </p>
                <ShufflingAppIcons />

                {/* Reviews */}
                <div className="flex items-center sm:gap-6 gap-4 pt-2 sm:flex-row flex-col">
                  <Link href="https://www.g2.com/products/viasocket/reviews" target="_blank" rel="nofollow noopener noreferrer">
                    <ReviewBadge platform="G2" rating={4.7} reviews={342} theme={t} />
                  </Link>
                  <Link href="https://www.capterra.com/p/10020406/viaSocket/" target="_blank" rel="nofollow noopener noreferrer">
                    <ReviewBadge platform="Capterra" rating={4.8} reviews={189} theme={t} />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Live Possibility Canvas */}
            <div className="relative pt-4 lg:pt-8 hidden lg:block">
              <LiveWorkflowCanvas usecases={useCases} onActiveChange={setActiveIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewBadge({
  platform,
  rating,
  reviews,
  theme,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-3.5 h-3.5">
            <Star
              className="absolute inset-0 w-3.5 h-3.5"
              style={{
                color: theme.starInactive,
                fill: "transparent",
              }}
            />
            <Star
              className="absolute inset-0 w-3.5 h-3.5"
              style={{
                color: "#2563EB",
                fill: "#2563EB",
                clipPath: `inset(0 ${Math.max(0, 100 - Math.min(1, Math.max(0, rating - i)) * 100)}% 0 0)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="text-[12px] text-nowrap" style={{ color: theme.reviewText }}>
        <span className="font-medium" style={{ color: theme.reviewHighlight }}>{rating}</span> on {platform}
      </div>
      <div className="text-[11px]" style={{ color: theme.reviewCount }}>({reviews})</div>
    </div>
  );
}

const allLogos = [
  { id: 0, src: "https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg", alt: "slack icon", iconName: "Slack" },
  { id: 1, src: "https://thingsofbrand.com/api/icon/teams.microsoft.com", alt: "microsoft icon", iconName: "Microsoft" },
  { id: 2, src: "https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg", alt: "zoom icon", iconName: "Zoom" },
  { id: 3, src: "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png", alt: "gmail icon", iconName: "Gmail" },
  { id: 4, src: "https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png", alt: "google sheet icon", iconName: "Google Sheets" },
  { id: 5, src: "https://thingsofbrand.com/api/icon/hubspot.com", alt: "hubspot icon", iconName: "Hubspot" },
  { id: 6, src: "https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png", alt: "salesforce icon", iconName: "Salesforce" },
  { id: 7, src: "https://thingsofbrand.com/api/icon/pipedrive.com", alt: "pipedrive icon", iconName: "Pipedrive" },
  { id: 8, src: "https://thingsofbrand.com/api/icon/quickbooks.com", alt: "quickbooks icon", iconName: "Quickbooks" },
  { id: 9, src: "https://thingsofbrand.com/api/icon/xero.com", alt: "xero icon", iconName: "Xero" },
  { id: 10, src: "https://thingsofbrand.com/api/icon/msg91.com", alt: "msg91 icon", iconName: "MSG91" },
  { id: 11, src: "https://thingsofbrand.com/api/icon/mailchimp.com", alt: "mailchimp icon", iconName: "Mailchimp" },
  { id: 12, src: "https://thingsofbrand.com/api/icon/activecampaign.com", alt: "activecampaign icon", iconName: "ActiveCampaign" },
  { id: 13, src: "https://thingsofbrand.com/api/icon/zendesk.com", alt: "zendesk icon", iconName: "Zendesk" },
  { id: 14, src: "https://thingsofbrand.com/api/icon/freshdesk.com", alt: "freshdesk icon", iconName: "Freshdesk" },
  { id: 15, src: "https://thingsofbrand.com/api/icon/trello.com", alt: "trello icon", iconName: "Trello" },
  { id: 16, src: "https://thingsofbrand.com/api/icon/asana.com", alt: "asana icon", iconName: "Asana" },
  { id: 17, src: "https://thingsofbrand.com/api/icon/clickup.com", alt: "clickup icon", iconName: "Clickup" },
  { id: 18, src: "https://thingsofbrand.com/api/icon/notion.com", alt: "notion icon", iconName: "Notion" },
  { id: 19, src: "https://thingsofbrand.com/api/icon/fireflies.ai", alt: "fireflies icon", iconName: "Fireflies" },
];

const VISIBLE_COUNT = 7;

function FigmaLogoIcon({ logo }) {
  return (
    <div
      className="w-10 h-10 rounded-[10px] flex items-center justify-center"
      style={{
        background: "#ffffff",
        border: `1px solid rgba(0,0,0,0.08)`,
        boxShadow: "0 1px 3px var(--rail-color)",
      }}
    >
      <Image
        alt={logo.alt}
        src={logo.src}
        width={24}
        height={24}
        className="w-6 h-6 object-contain pointer-events-none"
      />
    </div>
  );
}

function ShufflingAppIcons() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: `${VISIBLE_COUNT * 50}px` }}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #ffffff, transparent)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #ffffff, transparent)",
        }}
      />

      <div
        className="flex items-center gap-2.5"
        style={{
          animation: "marqueeScroll 25s linear infinite",
          width: "max-content",
        }}
      >
        {/* First set */}
        {allLogos.map((logo) => (
          <div key={`a-${logo.id}`} className="shrink-0">
            <FigmaLogoIcon logo={logo} />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {allLogos.map((logo) => (
          <div key={`b-${logo.id}`} className="shrink-0">
            <FigmaLogoIcon logo={logo} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Feature Chips
   ═════════════════════════════════════════ */

function FeatureChips() {
  const chips = [
    { label: "AI Agents", icon: <Sparkles className="w-3.5 h-3.5" />, ai: true },
    { label: "No-Code Workflows", icon: <Workflow className="w-3.5 h-3.5" />, color: "#10B981", ai: false },
  ];

  return (
    <div className="flex items-center gap-3">
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold overflow-hidden"
          style={chip.ai ? {
            background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.1) 50%, rgba(59,130,246,0.08) 100%)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#7c3aed",
            boxShadow: "0 2px 12px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
          } : {
            background: `linear-gradient(135deg, ${chip.color}18 0%, ${chip.color}10 100%)`,
            border: `1px solid ${chip.color}40`,
            color: chip.color,
            boxShadow: `0 2px 12px ${chip.color}10, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        >
          {/* Glass shimmer highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: chip.ai
                ? "linear-gradient(90deg, transparent 10%, rgba(168,85,247,0.3) 50%, transparent 90%)"
                : `linear-gradient(90deg, transparent 10%, ${chip.color}28 50%, transparent 90%)`,
            }}
          />
          <span style={chip.ai ? {
            color: "#8b5cf6",
          } : {
            color: chip.color,
            opacity: 0.85,
          }}>
            {chip.icon}
          </span>
          {chip.label}
        </div>
      ))}
    </div>
  );
}