"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LinkButton } from "../../../components/uiComponents/buttons";

export default function FAQs({ faqData = [], isHomepage = false }) {
  const [openId, setOpenId] = useState(1);

  const railColor = "var(--rail-color)";

  if (!faqData.length) return null;

  return (
    <section className="w-full py-20 md:py-28 relative overflow-visible bg-white">
      {/* Decorative grid rails */}
      {isHomepage && (
        <>
          <div className="absolute left-0 right-0 pointer-events-none hidden lg:block" aria-hidden="true" style={{ maxWidth: 1920, margin: "0 auto", top: 0, bottom: -400, zIndex: 0 }}>
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: 115,
                width: 2,
                borderRadius: 1,
                background: `linear-gradient(to bottom, transparent 0%, ${railColor} 24px, ${railColor} calc(100% - 400px), transparent 100%)`,
              }}
            />
            <div
              className="absolute top-0 bottom-0"
              style={{
                right: 115,
                width: 2,
                borderRadius: 1,
                background: `linear-gradient(to bottom, transparent 0%, ${railColor} 24px, ${railColor} calc(100% - 400px), transparent 100%)`,
              }}
            />
          </div>

          {/* Top gradient blend */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: 120,
              background: "linear-gradient(to bottom, #ffffff, transparent)",
              zIndex: 0,
            }}
          />

          {/* Top horizontal line */}
          <div className="absolute left-0 right-0 pointer-events-none" aria-hidden="true" style={{ maxWidth: 1920, margin: "0 auto", zIndex: 3, top: 60 }}>
            <div
              className="absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                borderRadius: 1,
                background: `linear-gradient(to right, transparent 0%, ${railColor} 12%, ${railColor} 88%, transparent 100%)`,
              }}
            />
          </div>
          {/* Top intersection dots */}
          <div className="absolute left-0 right-0 pointer-events-none hidden lg:block" aria-hidden="true" style={{ maxWidth: 1920, margin: "0 auto", zIndex: 3, top: 60 }}>
            <svg className="absolute" style={{ left: 116, top: 0, width: 10, height: 10, transform: "translate(-50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
            <svg className="absolute" style={{ right: 116, top: 0, width: 10, height: 10, transform: "translate(50%, -50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
          </div>

          {/* Bottom gradient blend */}
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            style={{
              height: 120,
              background: "linear-gradient(to bottom, transparent, #e8f5ec)",
              zIndex: 0,
            }}
          />

          {/* Bottom horizontal line */}
          <div className="absolute left-0 right-0 pointer-events-none" aria-hidden="true" style={{ maxWidth: 1920, margin: "0 auto", zIndex: 3, bottom: 60 }}>
            <div
              className="absolute"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                borderRadius: 1,
                background: `linear-gradient(to right, transparent 0%, ${railColor} 12%, ${railColor} 88%, transparent 100%)`,
              }}
            />
          </div>
          {/* Bottom intersection dots */}
          <div className="absolute left-0 right-0 pointer-events-none hidden lg:block" aria-hidden="true" style={{ maxWidth: 1920, margin: "0 auto", zIndex: 3, bottom: 60 }}>
            <svg className="absolute" style={{ left: 116, bottom: 0, width: 10, height: 10, transform: "translate(-50%, 50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
            <svg className="absolute" style={{ right: 116, bottom: 0, width: 10, height: 10, transform: "translate(50%, 50%)" }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#e5e7eb" />
            </svg>
          </div>
        </>
      )}

      <div className="relative max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] z-[2]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div
            className="lg:w-[380px] flex-shrink-0 lg:sticky lg:top-32 lg:self-start"
            style={{ animation: "faqFadeUp 420ms ease both" }}
          >
            <h2
              className="heading2 mb-4"
            >
              Everything you
              <br />
              need to know
            </h2>

            <p
              className="sub-heading2 mb-8"
            >
              Frequently asked ques about viaSocket — pricing, security, integrations, and getting started.
            </p>

            <Link
              href="/support"
              className="primary-button"
              target="_blank"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Talk to our team
              </span>
            </Link>
          </div>

          {/* Right column: Accordion */}
          <div className="flex-1 min-w-0">
            {faqData.map((faq, index) => {
              const isOpen = openId === index;

              return (
                <div
                  key={`faq-toggle-${index}`}
                  className="border-b"
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    animation: `faqFadeUp 360ms ease ${index * 0.03}s both`,
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : index)}
                    className="w-full py-5 md:py-6 flex items-start justify-between text-left transition-colors duration-200 group gap-4"
                  >
                    {/* Number */}
                    <span
                      className="text-[13px] mt-0.5 flex-shrink-0 w-6 tabular-nums"
                      style={{
                        color: isOpen ? "#2563EB" : "rgba(0,0,0,0.35)",
                        fontWeight: 600,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* que */}
                    <span
                      className={`flex-1 text-[15px] md:text-[16px] transition-colors duration-200 font-semibold ${isOpen ? "text-[var(--black-color)] font-bold" : "text-[rgba(0,0,0,0.8)] font-semibold"}`}
                    >
                      {faq?.que || faq?.question}
                    </span>

                    {/* Chevron */}
                    <div
                      className="flex-shrink-0 mt-0.5"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <ChevronDown
                        className="w-4 h-4"
                        style={{
                          color: isOpen ? "#2563EB" : "rgba(0,0,0,0.18)",
                        }}
                      />
                    </div>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0">
                      <div className="pl-10 pr-10 pb-6">
                        <p
                          className="text-[14px] leading-[1.8]"
                          style={{
                            color: "rgba(0,0,0,0.7)",
                            fontWeight: 500,
                          }}
                        >
                          {faq?.ans || faq?.answer}
                        </p>
                        {faq?.link && (
                          <div className="mt-3">
                            <LinkButton content="Learn More" href={faq?.link} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes faqFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
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