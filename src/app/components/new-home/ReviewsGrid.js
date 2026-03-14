'use client';
import { useState, useId, useEffect, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';

const sourceAccent = {
  linkedin: "#0A66C2",
  twitter: "#1DA1F2",
  g2: "#FF492C",
  capterra: "#044D80",
};

const SOURCES = [
  { name: "linkedin", image: "https://thingsofbrand.com/api/icon/linkedin.com", url: "https://in.linkedin.com/company/viasocket-walkover" },
  { name: "twitter", image: "https://thingsofbrand.com/api/icon/twitter.com", url: "https://x.com/viasocket" },
  { name: "g2", image: "https://thingsofbrand.com/api/icon/g2.com", url: "https://www.g2.com/products/viasocket/reviews" },
  { name: "capterra", image: "https://thingsofbrand.com/api/icon/capterra.com", url: "https://www.capterra.com/p/10020406/viaSocket/" },
];
const CARD_H = 260;
const GAP = 16;

/* ── Single review card ── */
function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);
  const accent = sourceAccent[review.name];
  const initials =
    review?.user_name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <Link
      href={review?.link || "#"}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="flex flex-col bg-white border border-gray-200 rounded-none flex-shrink-0 relative overflow-hidden no-underline relative z-1 cursor-pointer"
      style={{
        height: CARD_H,
        marginBottom: GAP,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered
          ? `0 8px 36px rgba(0,0,0,0.12), 0 0 0 1px ${accent}22`
          : "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",

        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        borderColor: hovered
          ? "rgba(0,0,0,0.12)"
          : "rgba(0,0,0,0.08)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle accent gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.25s ease",
          background: `radial-gradient(ellipse at top left, ${accent}0a 0%, transparent 60%)`,
        }}
      />

      <div className="flex flex-col flex-1 p-5 min-h-0 relative">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-3">
          {review?.user_profile?.[0] && review?.user_profile?.[0].trim() !== '' ? (
            <Image
              src={review.user_profile[0]}
              alt={review?.user_name || ''}
              width={36}
              height={36}
              className="w-9 h-9 rounded-none object-cover flex-shrink-0"
            />
          ) : (
            <div
              className={`w-9 h-9 rounded-none flex items-center justify-center text-xs flex-shrink-0 font-bold`}
              style={{
                background: `${accent}18`,
                border: `1.5px solid ${accent}30`,
                color: accent,
              }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p
              className="text-sm truncate font-bold"
            >
              {review?.user_name || "unknown user"}
            </p>
            <p
              className="text-xs truncate"
              style={{
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {review?.subtitle || ""}
            </p>
          </div>
          <Image
            src={review?.platform_logo?.[0] || ""}
            alt={review?.name || ""}
            className="rounded-none object-contain w-auto h-6 opacity-90"
            width={24}
            height={24}
          />
        </div>

        {/* Review body */}
        <p
          className="text-[13px] leading-[1.75] flex-1 overflow-hidden"
          style={{
            color: "rgba(0,0,0,0.72)",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
        >
          {review.description}
        </p>

        {/* Footer: date + read more */}
        <div className="flex items-center justify-between mt-3" style={{ flexShrink: 0 }}>
          <p
            className="text-xs"
            style={{
              color: "rgba(0,0,0,0.32)",
            }}
          >
            {review.date}
          </p>
          <span
            className={`text-xs flex items-center gap-1 font-semibold ${hovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              color: accent,
              transform: hovered ? "translateX(0)" : "translateX(6px)",
              transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Read more
            <IoIosArrowForward />
          </span>
        </div>
      </div>
    </Link>
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
        {cards.map((review, index) => (
          <ReviewCard key={`a-${index}`} review={review} />
        ))}
        {/* Set B (duplicate for seamless loop) */}
        {cards.map((review, index) => (
          <ReviewCard key={`b-${index}`} review={review} />
        ))}
      </div>

      {/* Top fade */}
      <div className="reviews-marquee-fade reviews-marquee-fade-top absolute top-0 left-0 right-0 pointer-events-none" />
      {/* Bottom fade */}
      <div className="reviews-marquee-fade reviews-marquee-fade-bottom absolute bottom-0 left-0 right-0 pointer-events-none" />
    </div>
  );
}

export default function ReviewsGrid({ ref, reviewData }) {
  // Split reviews into two columns
  const col1 = reviewData.filter((_, i) => i % 2 === 0);
  const col2 = reviewData.filter((_, i) => i % 2 === 1);

  return (
    <section
      className="w-full py-10 md:py-14 relative bg-white"
    >
      {/* Top horizontal rail — below lg only */}
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none block lg:hidden"
        style={{
          height: 2,
          borderRadius: 1,
          background: "var(--rail-color)",
          zIndex: 1,
        }}
      />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px]">
        {/* Desktop: columns left + header right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — 2-column vertical marquee */}
          <div
            className="flex gap-4 flex-shrink-0 w-full lg:w-[56%] relative"
          >
            <div className="w-full sm:w-1/2 overflow-hidden">
              <MarqueeColumn cards={col1} durationPerCard={7} />
            </div>
            <div className="hidden sm:block sm:w-1/2">
              <MarqueeColumn cards={col2} durationPerCard={8} reverse />
            </div>
          </div>

          {/* Right — Header content, sticky on desktop */}
          <div className="flex-1 flex flex-col justify-center lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
            <div style={{ animation: "reviewsFadeUp 420ms ease both" }}>
              <h2
                className="heading2"
              >
                Trusted by teams{" "}
                <span className="gray-heading">
                  who ship faster
                </span>
              </h2>
              <p
                className="mt-5 sub-heading2 max-w-[420px]"
              >
                Real feedback from teams automating with viaSocket — across
                LinkedIn, G2, Capterra, and X.
              </p>

              <div className="flex items-center gap-4 mt-8">
                {SOURCES.map((src) => (
                  <Link key={src.name} href={src.url} target="_blank" rel="nofollow noopener noreferrer">
                    <Image
                      src={src.image}
                      alt={src.name}
                      className="object-contain w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
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
