'use client';
import { useState, useId, useEffect, useRef } from 'react';

const linkedinLogo = 'https://thingsofbrand.com/api/icon/linkedin.com';
const xLogo = 'https://thingsofbrand.com/api/icon/twitter.com';
const g2Logo = 'https://thingsofbrand.com/api/icon/g2.com';
const capterraLogo = 'https://thingsofbrand.com/api/icon/capterra.com';

const sourceAccent = {
  LinkedIn: "#0A66C2",
  Twitter: "#1DA1F2",
  G2: "#FF492C",
  Capterra: "#044D80",
};

const sourceLogo = {
  LinkedIn: linkedinLogo,
  Twitter: xLogo,
  G2: g2Logo,
  Capterra: capterraLogo,
};

const SOURCE_ORDER = ["LinkedIn", "Twitter", "G2", "Capterra"];

const reviews = [
  {
    id: 1,
    name: "Hamza Bin Zia",
    subtitle: "Building custom wordpress",
    text: "Stop paying for automation tools. You no longer need to pay for n8n or Make.com to build automations. There is a platform called viaSocket where you can: \u2192 Create new flows or pick from templates \u2192 Connect with 1,500+ apps \u2192 Automate tasks in minutes The best part is if you sign u...",
    date: "Aug 27, 2025",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/hamza-bin-zia-1234567890-stop-paying-for-automation-tools-activity-7890123456789012345/",
  },
  {
    id: 2,
    name: "Disha Sheth",
    subtitle: "@Disha6392",
    text: "Shoutout to @viaSocket for making automation feel like magic. One integration at a time, they're changing the game! \ud83c\udf89 \ud83d\udd25 If you haven't tried the platform yet, you're missing out on the simplest way to power your apps with realtime events. Go check them out! \u2728",
    date: "Jun 29, 2025",
    source: "Twitter",
    url: "https://twitter.com/Disha6392/status/1234567890123456789",
  },
  {
    id: 3,
    name: "Thai V.",
    subtitle: '"Easy To Build Automation"',
    text: "Yes just like others, it build automation, but more simple and easy. With more than 1500+ app it easy to integration with the necessary app and easy to implementation in the workflow. The customer support is fast and very helpful. I'm testing it now but with no doubt will be my daily use tool",
    date: "Aug 16, 2025",
    source: "G2",
    url: "https://www.g2.com/reviews/viasocket/1234567890",
  },
  {
    id: 4,
    name: "Ahmed D.",
    subtitle: "CTO (Computer & Network Security)",
    text: "Easy to use platform with very powerful tools that replace both n8n and zapier and other tools as well.",
    date: "Aug 28, 2025",
    source: "LinkedIn",
    avatar: "A",
    url: "https://www.linkedin.com/posts/ahmed-d-1234567890-easy-to-use-platform-with-very-powerful-activity-7890123456789012345/",
  },
  {
    id: 5,
    name: "Dip Desai",
    subtitle: "Sanchay CRM Partner",
    text: "Excited to share that we're using viaSocket for our automation workflows, and it's been working exceptionally well! \ud83d\ude80 It's making our processes smoother, faster, and more efficient\u2014definitely a game-changer for our team.",
    date: "Aug 13, 2025",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/dip-desai-1234567890-excited-to-share-that-were-using-viasocket-activity-7890123456789012345/",
  },
  {
    id: 6,
    name: "Wesley B.",
    subtitle: '"Finally, a source of MCP service to automate all my..."',
    text: "The fact that had most of the apps I use and was really struggling to find MCP servers that contained a good mix of apps from my research. This one was the best for the app that I use so was well worth it.",
    date: "Oct 01, 2025",
    source: "Capterra",
    url: "https://www.capterra.com/reviews/viasocket/1234567890",
  },
  {
    id: 7,
    name: "Raid D.",
    subtitle: "Consultant (Automotive)",
    text: "A promising platform that gonna change the automation landscape",
    date: "Sep 05, 2025",
    source: "G2",
    url: "https://www.g2.com/reviews/viasocket/1234567890",
  },
  {
    id: 8,
    name: "Jatinder Grewal",
    subtitle: "@JGGrewal828",
    text: "1000+ MCP servers | AI-powered #workflowautomation Automation using @viasocket cannot beat it",
    date: "Sep 12, 2025",
    source: "Twitter",
    url: "https://twitter.com/JGGrewal828/status/1234567890123456789",
  },
  {
    id: 9,
    name: "Aditya R.",
    subtitle: '"reliable automation platform that saves us hours e..."',
    text: "ViaSocket has been an amazing platform for automations and integrations. We started using it to connect several apps and reduce our manual work. Within a short time, we saw real improvements in our team's efficiency.",
    date: "Sep 18, 2025",
    source: "Capterra",
    url: "https://www.capterra.com/reviews/viasocket/1234567890",
  },
];

const CARD_H = 260;
const GAP = 16;

/* ── Single review card ── */
function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  const accent = sourceAccent[review.source];
  const initials =
    review.avatar ??
    review.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-none flex-shrink-0 relative overflow-hidden no-underline"
      style={{
        display: "flex",
        flexDirection: "column",
        height: CARD_H,
        marginBottom: GAP,
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered
          ? `0 8px 36px rgba(0,0,0,0.12), 0 0 0 1px ${accent}22`
          : "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        borderColor: hovered
          ? "rgba(0,0,0,0.12)"
          : "rgba(0,0,0,0.08)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        zIndex: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle accent gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accent}0a 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.25s ease",
        }}
      />

      <div className="flex flex-col flex-1 p-5 min-h-0 relative">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-none flex items-center justify-center text-[11px] flex-shrink-0"
            style={{
              background: `${accent}18`,
              color: accent,
              fontWeight: 700,
              border: `1.5px solid ${accent}30`,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-[13.5px] truncate"
              style={{
                color: "#0a0a0a",
                fontWeight: 700,
              }}
            >
              {review.name}
            </p>
            <p
              className="text-[11px] truncate"
              style={{
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {review.subtitle}
            </p>
          </div>
          <img
            src={sourceLogo[review.source]}
            alt={review.source}
            className="flex-shrink-0 rounded-none object-contain"
            style={{
              width: review.source === "Capterra" ? 28 : 24,
              height: review.source === "Capterra" ? 28 : 24,
              opacity: 0.9,
              filter: undefined,
            }}
          />
        </div>

        {/* Review body */}
        <p
          className="text-[13px] leading-[1.75] flex-1 overflow-hidden"
          style={{
            color: "rgba(0,0,0,0.72)",
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
          }}
        >
          {review.text}
        </p>

        {/* Footer: date + read more */}
        <div className="flex items-center justify-between mt-3" style={{ flexShrink: 0 }}>
          <p
            className="text-[10px]"
            style={{
              color: "rgba(0,0,0,0.32)",
            }}
          >
            {review.date}
          </p>
          <span
            className="text-[11.5px] flex items-center gap-1"
            style={{
              color: accent,
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(6px)",
              transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Read more
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── Vertical marquee column ── */
function MarqueeColumn({
  cards,
  durationPerCard = 6,
  reverse = false,
}) {
  const trackRef = useRef(null);
  const uid = useId().replace(/:/g, "");

  const setHeight = cards.length * (CARD_H + GAP);
  const duration = cards.length * durationPerCard;
  const animName = `vmarquee-${uid}`;

  const fadeBg = "#ffffff";

  useEffect(() => {
    const existing = document.getElementById(animName);
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = animName;
    if (reverse) {
      style.textContent = `
        @keyframes ${animName} {
          0% { transform: translateY(-${setHeight}px); }
          100% { transform: translateY(0); }
        }
      `;
    } else {
      style.textContent = `
        @keyframes ${animName} {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${setHeight}px); }
        }
      `;
    }
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(animName);
      if (el) el.remove();
    };
  }, [animName, setHeight, reverse]);

  return (
    <div
      className="flex-1 relative"
      style={{ height: 820, overflowX: "visible", overflowY: "hidden" }}
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running";
      }}
    >
      {/* Animated track */}
      <div
        ref={trackRef}
        className="flex flex-col relative"
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* Set A */}
        {cards.map((review) => (
          <ReviewCard key={`a-${review.id}`} review={review} />
        ))}
        {/* Set B (duplicate for seamless loop) */}
        {cards.map((review) => (
          <ReviewCard key={`b-${review.id}`} review={review} />
        ))}
      </div>

      {/* Top fade — inside column, above track, pointer-transparent */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 48,
          zIndex: 2,
          background: `linear-gradient(to bottom, ${fadeBg}, transparent)`,
        }}
      />
      {/* Bottom fade — inside column, above track, pointer-transparent */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 48,
          zIndex: 2,
          background: `linear-gradient(to top, ${fadeBg}, transparent)`,
        }}
      />
    </div>
  );
}

/* ── Main export ── */
export function ReviewsGrid() {
  // Split reviews into two columns
  const col1 = reviews.filter((_, i) => i % 2 === 0);
  const col2 = reviews.filter((_, i) => i % 2 === 1);

  return (
    <section
      className="w-full py-10 md:py-14 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px]">
        {/* Desktop: columns left + header right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — 2-column vertical marquee */}
          <div
            className="flex gap-4 flex-shrink-0 w-full lg:w-[56%] relative overflow-hidden"
          >
            <MarqueeColumn cards={col1} durationPerCard={7} />
            <MarqueeColumn
              cards={col2}
              durationPerCard={8}
              reverse
            />
          </div>

          {/* Right — Header content, sticky on desktop */}
          <div className="flex-1 flex flex-col justify-center lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
            <div style={{ animation: "reviewsFadeUp 420ms ease both" }}>
              
              <h2
                className="text-[28px] md:text-[36px] lg:text-[42px] tracking-[-0.8px] lg:tracking-[-1.2px] leading-[1.1]"
                style={{
                  color: "#0a0a0a",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                }}
              >
                Trusted by teams{" "}
                <span style={{ color: "#888888" }}>
                  who ship faster
                </span>
              </h2>
              <p
                className="mt-5 text-[17px] leading-[1.75] max-w-[420px]"
                style={{
                  color: "rgba(0,0,0,0.65)",
                  fontWeight: 500,
                  letterSpacing: "-0.2px",
                }}
              >
                Real feedback from teams automating with viaSocket — across
                LinkedIn, G2, Capterra, and X.
              </p>

              {/* Source logos row */}
              <div className="flex items-center gap-4 mt-8">
                {SOURCE_ORDER.map(
                  (src) => (
                    <img
                      key={src}
                      src={sourceLogo[src]}
                      alt={src}
                      className="object-contain"
                      style={{
                        width: src === "Capterra" ? 28 : 24,
                        height: src === "Capterra" ? 28 : 24,
                        opacity: 0.8,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes reviewsFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default ReviewsGrid;