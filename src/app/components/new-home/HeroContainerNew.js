"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, Sparkles, Workflow } from "lucide-react";
import { LiveWorkflowCanvas } from "./LiveWorkflowCanvas";

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
  edgeFade: "rgba(255,255,255,1)",
  vignetteColor: "rgba(255,255,255,0.55)",
  glassBackground: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.28) 100%)",
  glassBlur: "blur(20px) saturate(140%)",
  glassBorder: "rgba(255,255,255,0.45)",
  glassBoxShadow: "0 8px 50px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02)",
  glassHighlight: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 60%, transparent 90%)",
  glassInnerWash: "radial-gradient(ellipse 60% 40% at 30% 0%, rgba(255,255,255,0.25) 0%, transparent 70%)",
  glassTitleColor: "var(--black-color)",
  glassSubtitleColor: "rgba(0,0,0,0.68)",
  dotInactive: "rgba(0,0,0,0.18)",
  navBtnBg: "rgba(0,0,0,0.04)",
  navBtnBgHover: "rgba(0,0,0,0.08)",
  navBtnBorder: "rgba(0,0,0,0.08)",
  navBtnBorderHover: "rgba(0,0,0,0.18)",
  navIconColor: "rgba(0,0,0,0.55)",
  navIconHover: "rgba(0,0,0,0.8)",
  tooltipHoverColor: "rgba(0,0,0,0.4)",
  iconBgForWhiteBrand: "rgba(0,0,0,0.04)",
  iconBorderForWhiteBrand: "rgba(0,0,0,0.1)",
};

const useCases = [
  {
    id: 1,
    category: "Inbox Operations",
    title: "Turn emails into actionable tasks.",
    subtitle: "AI reads your inbox, classifies intent, and routes tasks to the right tool.",
    accentColor: "#2563EB",
    flow: {
      trigger: { id: "t1", label: "New Email", app: "Gmail", type: "trigger", appColor: "#F97316" },
      steps: [
        { id: "s1", label: "fetch_email_metadata", app: "Code", type: "code", appColor: "#F59E0B" },
        { id: "s2", label: "parse_sender_info", app: "Code", type: "code", appColor: "#F59E0B" },
      ],
      condition: {
        label: "is_actionable",
        branches: [
          {
            label: "urgent_task",
            steps: [
              { id: "b1a", label: "AI Classify Priority", app: "GPT-4", type: "ai", appColor: "#2563EB" },
              { id: "b1b", label: "Create Issue", app: "Linear", type: "action", appColor: "#94A3B8" },
              { id: "b1c", label: "Send Alert", app: "Slack", type: "message", appColor: "#818CF8" },
            ],
          },
          {
            label: "reference_only",
            steps: [
              { id: "b2a", label: "Log to Docs", app: "Notion", type: "action", appColor: "#94A3B8" },
              { id: "b2b", label: "Update Sheet", app: "Sheets", type: "table", appColor: "#06B6D4" },
            ],
          },
        ],
      },
      postSteps: [
        { id: "p1", label: "Find Contact", app: "Apollo", type: "api", appColor: "#10B981" },
        { id: "p2", label: "Update CRM", app: "HubSpot", type: "table", appColor: "#06B6D4" },
      ],
    },
  },
  {
    id: 2,
    category: "Sales Operations",
    title: "Qualify inbound leads automatically.",
    subtitle: "AI scores every submission and routes high-intent leads to sales instantly.",
    accentColor: "#8B5CF6",
    flow: {
      trigger: { id: "t1", label: "Form Submitted", app: "Typeform", type: "trigger", appColor: "#8B5CF6" },
      steps: [
        { id: "s1", label: "extract_form_fields", app: "Code", type: "code", appColor: "#F59E0B" },
        { id: "s2", label: "enrich_company", app: "Clearbit", type: "api", appColor: "#10B981" },
      ],
      condition: {
        label: "lead_score_check",
        branches: [
          {
            label: "high_intent",
            steps: [
              { id: "b1a", label: "AI Score Lead", app: "GPT-4", type: "ai", appColor: "#2563EB" },
              { id: "b1b", label: "Add to CRM", app: "HubSpot", type: "action", appColor: "#94A3B8" },
              { id: "b1c", label: "Notify Sales", app: "Slack", type: "message", appColor: "#818CF8" },
            ],
          },
          {
            label: "nurture_track",
            steps: [
              { id: "b2a", label: "Add to Sequence", app: "Mailchimp", type: "action", appColor: "#94A3B8" },
              { id: "b2b", label: "Schedule Follow-up", app: "Calendar", type: "action", appColor: "#94A3B8" },
            ],
          },
        ],
      },
      postSteps: [
        { id: "p1", label: "Log Activity", app: "Sheets", type: "table", appColor: "#06B6D4" },
        { id: "p2", label: "Sync Pipeline", app: "Salesforce", type: "api", appColor: "#10B981" },
      ],
    },
  },
  {
    id: 3,
    category: "Revenue Protection",
    title: "Never lose a sale to a failed payment.",
    subtitle: "Every transaction triggers instant validation. Failed payments get retried, customers get notified, revenue gets recovered — all on autopilot.",
    accentColor: "#F59E0B",
    flow: {
      trigger: { id: "t1", label: "Payment Event", app: "Stripe", type: "trigger", appColor: "#8B5CF6" },
      steps: [
        { id: "s1", label: "validate_payload", app: "Code", type: "code", appColor: "#F59E0B" },
        { id: "s2", label: "fetch_customer_history", app: "API", type: "api", appColor: "#10B981" },
      ],
      condition: {
        label: "risk_assessment",
        branches: [
          {
            label: "approved",
            steps: [
              { id: "b1a", label: "Process Payment", app: "Stripe", type: "action", appColor: "#94A3B8" },
              { id: "b1b", label: "Send Receipt", app: "SendGrid", type: "message", appColor: "#818CF8" },
            ],
          },
          {
            label: "flagged",
            steps: [
              { id: "b2a", label: "AI Fraud Analysis", app: "GPT-4", type: "ai", appColor: "#2563EB" },
              { id: "b2b", label: "Alert Finance", app: "Slack", type: "message", appColor: "#818CF8" },
              { id: "b2c", label: "Hold Payment", app: "Stripe", type: "action", appColor: "#94A3B8" },
            ],
          },
        ],
      },
      postSteps: [
        { id: "p1", label: "Update Ledger", app: "Sheets", type: "table", appColor: "#06B6D4" },
        { id: "p2", label: "Sync Accounting", app: "Xero", type: "api", appColor: "#10B981" },
      ],
    },
  },
];

export default function HeroContainerNew() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const t = heroTheme;

  const currentUseCase = useCases[currentIndex];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-advance when workflow animation completes
  const handleAnimationComplete = useCallback(() => {
    // Small delay after animation ends before transitioning
    setTimeout(() => {
      handleNext();
    }, 800);
  }, [handleNext]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: t.bg }}>
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
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] py-12 md:py-20 relative">
          {/* Decorative grid rails — vertical boundary lines + intersection dots (matches footer grid) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-[1]" aria-hidden="true">
            {/* Top horizontal rail — full width */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: 55,
                height: 2,
                borderRadius: 1,
                background: "var(--rail-color)",
              }}
            />
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
            {/* Bottom horizontal rail — full width, connecting bottom dots */}
            <div
              className="absolute left-0 right-0"
              style={{
                bottom: 9,
                height: 2,
                borderRadius: 1,
                background: "var(--rail-color)",
              }}
            />
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
                    style={{ color: currentUseCase.accentColor }}
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
                    href="/signup"
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
                    rel="noopener noreferrer"
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
                <div className="flex items-center gap-6 pt-2">
                  <ReviewBadge platform="G2" rating={4.7} reviews={342} theme={t} />
                  <ReviewBadge platform="Capterra" rating={4.8} reviews={189} theme={t} />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Live Possibility Canvas */}
            <div className="relative pt-4 lg:pt-8 hidden lg:block">
              <div className="relative min-h-[400px] md:min-h-[560px] lg:min-h-[740px]">

                {/* Layer 1: Workflow Canvas */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                  <div
                    className="w-full h-full transition-all duration-500"
                    style={{
                      filter: "blur(1.2px)",
                      opacity: 0.85,
                      transform: "translateX(30px)",
                    }}
                  >
                    <LiveWorkflowCanvas
                      flow={currentUseCase.flow}
                      isTransitioning={isTransitioning}
                      onAnimationComplete={handleAnimationComplete}
                    />
                  </div>
                  {/* Edge fade masks */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, ${t.edgeFade} 0%, transparent 6%, transparent 88%, ${t.edgeFade} 100%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, ${t.edgeFade} 0%, transparent 4%, transparent 90%, ${t.edgeFade} 100%)`,
                    }}
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, ${t.vignetteColor} 100%)`,
                    }}
                  />
                </div>

                {/* Layer 2: Floating Use Case Box */}
                <div className="relative z-20 flex items-center justify-center min-h-[740px] px-4">
                  <div
                    key={currentUseCase.id}
                    className={`transition-all duration-500 w-full max-w-[528px] ${isTransitioning ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"}`}
                  >
                    {/* Liquid Glass Container */}
                    <div
                      className="relative rounded-[18px] px-9 py-9 overflow-hidden flex flex-col justify-center min-h-[216px]"
                      style={{
                        background: t.glassBackground,
                        backdropFilter: t.glassBlur,
                        WebkitBackdropFilter: t.glassBlur,
                        boxShadow: t.glassBoxShadow,
                        border: `1px solid ${t.glassBorder}`,
                      }}
                    >
                      {/* Accent color wash — per use case */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-[18px] transition-all duration-500"
                        style={{
                          background: `radial-gradient(ellipse 130% 110% at 15% 115%, ${currentUseCase.accentColor}60 0%, transparent 55%), radial-gradient(ellipse 90% 80% at 85% -15%, ${currentUseCase.accentColor}35 0%, transparent 50%)`,
                        }}
                      />
                      {/* Glass highlight */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                        style={{ background: t.glassHighlight }}
                      />
                      {/* Inner light wash */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-[18px] transition-all duration-500"
                        style={{ background: t.glassInnerWash }}
                      />

                      {/* Title */}
                      <h2
                        className="relative text-[28px] md:text-[34px] lg:text-[38px] leading-[normal] font-semibold tracking-[-0.95px]"
                        style={{ color: t.glassTitleColor, fontFamily: "'Inter', sans-serif" }}
                      >
                        {currentUseCase.title}
                      </h2>

                      {/* Navigation — arrows only */}
                      <div className="relative flex items-center justify-end pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrev}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{
                              backgroundColor: t.navBtnBg,
                              border: `1px solid ${t.navBtnBorder}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = t.navBtnBgHover;
                              e.currentTarget.style.borderColor = t.navBtnBorderHover;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = t.navBtnBg;
                              e.currentTarget.style.borderColor = t.navBtnBorder;
                            }}
                            disabled={isTransitioning}
                          >
                            <ChevronLeft className="w-3 h-3" style={{ color: t.navIconColor }} />
                          </button>
                          <button
                            onClick={handleNext}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{
                              backgroundColor: t.navBtnBg,
                              border: `1px solid ${t.navBtnBorder}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = t.navBtnBgHover;
                              e.currentTarget.style.borderColor = t.navBtnBorderHover;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = t.navBtnBg;
                              e.currentTarget.style.borderColor = t.navBtnBorder;
                            }}
                            disabled={isTransitioning}
                          >
                            <ChevronRight className="w-3 h-3" style={{ color: t.navIconColor }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          <Star
            key={i}
            className="w-3.5 h-3.5"
            style={{
              color: i < Math.floor(rating) ? "#2563EB" : theme.starInactive,
              fill: i < Math.floor(rating) ? "#2563EB" : "transparent",
            }}
          />
        ))}
      </div>
      <div className="text-[12px]" style={{ color: theme.reviewText }}>
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