"use client";
import Link from "next/link";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiDiscordLogoFill } from "react-icons/pi";
import YouTubeIcon from "../../../components/footer/YouTubeIcon";
import createURL from "@/utils/createURL";
import { RequestIntegrationPopupOpener } from "@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexClientComp";

/* ── Grid constants ──────────────────────────────────────────── */
const LINE_COLOR = "rgba(81,81,81,0.12)";
const DOT_COLOR = "#414141";
const DOT_OPACITY = 0.5;

/*
 * Figma grid positions on 1920px frame:
 * - Vertical rails: 140px (7.29%) & 1780px (92.71%) — full height
 * - Inner verticals: 521px (27.14%), 945px (49.22%), 1365px (71.09%) — 532px tall
 * - Horizontal lines: y=45 & y=597 — full width
 * - Dots at: x = 136, 516, 940, 1360, 1776 (as % = 7.08, 26.88, 48.96, 70.83, 92.5)
 *            y = 40 (top row) & 592 (bottom row)
 */
const verticalLines = [
  { x: "7.29%", full: true },
  { x: "27.14%", full: false },
  { x: "49.22%", full: false },
  { x: "71.09%", full: false },
  { x: "92.71%", full: true },
];

const dotXPositions = ["7.08%", "26.88%", "48.96%", "70.83%", "92.5%"];

/* ── Footer component ────────────────────────────────────────── */
export default function FooterNew({ footerData = [] }) {
  const filteredData = footerData?.filter((item) => !item?.hidden);
  const groupedData = filteredData?.reduce((acc, obj) => {
    const groupName = obj?.group_name;
    if (!groupName) return acc;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(obj);
    return acc;
  }, {});

  const groupedEntries = Object.entries(groupedData || {});
  const columnCount = 4;
  const baseSize = Math.floor(groupedEntries.length / columnCount);
  const remainder = groupedEntries.length % columnCount;
  let start = 0;
  const footerColumns = Array.from({ length: columnCount }, (_, i) => {
    const size = baseSize + (i < remainder ? 1 : 0);
    const chunk = groupedEntries.slice(start, start + size);
    start += size;
    return chunk;
  });

  const bgStyle = {
    backgroundImage: [
      "radial-gradient(ellipse at 20% 50%, rgba(42,42,30,1) 0%, rgba(26,26,20,1) 50%)",
      "radial-gradient(ellipse at 80% 20%, rgba(30,34,40,1) 0%, rgba(26,26,20,1) 50%)",
      "linear-gradient(90deg, #1a1a14 0%, #1a1a14 100%)",
    ].join(", "),
  };

  return (
    <footer className="w-full relative overflow-hidden" style={bgStyle}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, right: -79, top: -5, background: "rgba(59,130,246,0.2)", filter: "blur(150px)" }} />
        <div className="absolute rounded-full" style={{ width: 450, height: 450, left: -76, top: 347, background: "rgba(29,78,216,0.15)", filter: "blur(140px)" }} />
        <div className="absolute rounded-full" style={{ width: 550, height: 550, left: "43.5%", top: 594, background: "rgba(37,99,235,0.18)", filter: "blur(160px)" }} />
        <div className="absolute rounded-full" style={{ width: 350, height: 350, left: "39.5%", top: 594, background: "rgba(96,165,250,0.12)", filter: "blur(130px)" }} />
      </div>

      {/* ── Decorative grid (lg+ only) ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true" style={{ zIndex: 5 }}>
        <div className="relative h-full max-w-[1920px] mx-auto">

          {/* Vertical lines */}
          {verticalLines.map((line, i) => (
            <div
              key={`vl-${i}`}
              className="absolute"
              style={{
                left: line.x,
                top: line.full ? 0 : 45,
                bottom: line.full ? 0 : "auto",
                height: line.full ? undefined : 672,
                width: 2,
                background: LINE_COLOR,
              }}
            />
          ))}

          {/* Top horizontal at y=45 */}
          <div className="absolute" style={{ top: 45, left: -3, right: -3, height: 2, background: LINE_COLOR }} />
          {/* Bottom horizontal at y=717 */}
          <div className="absolute" style={{ top: 717, left: -3, right: -3, height: 2, background: LINE_COLOR }} />

          {/* Intersection dots — top row (y=40) */}
          {dotXPositions.map((x, i) => (
            <svg key={`dot-t-${i}`} className="absolute" style={{ left: x, top: 40, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill={DOT_COLOR} fillOpacity={DOT_OPACITY} />
            </svg>
          ))}
          {/* Intersection dots — bottom row (y=712) */}
          {dotXPositions.map((x, i) => (
            <svg key={`dot-b-${i}`} className="absolute" style={{ left: x, top: 712, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill={DOT_COLOR} fillOpacity={DOT_OPACITY} />
            </svg>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-[1920px] mx-auto relative z-10">

        {/* ── Link columns ─────────────────────────────────── */}
        <div className="px-6 md:px-12 pt-[70px] pb-12 lg:pt-[114px] lg:pb-[64px] lg:px-[7.29%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-0 lg:gap-y-0">
            {footerColumns.map((columnGroups, ci) => (
              <div key={ci} className="flex flex-col gap-8 lg:pl-12">
                {columnGroups.map(([groupName, items]) => (
                  <div key={groupName}>
                    {groupName && (
                      <h4
                        className="text-[11px] tracking-[1.65px] uppercase mb-4 whitespace-pre-wrap"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          lineHeight: "16.5px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {groupName}
                      </h4>
                    )}
                    <ul className="space-y-[6px]">
                      {items.map((item, index) => (
                        <li key={`${groupName}-${index}-${item?.name}`}>
                          <Link
                            target="_blank"
                            href={createURL(item?.link)}
                            className="text-[14px] transition-colors duration-200 block text-white hover:text-[rgba(255,255,255,0.6)]"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              lineHeight: "21px",
                            }}
                            aria-label={item?.name}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                      {groupName === "Support" && (
                        <li>
                          <RequestIntegrationPopupOpener title="Request an Integration" showType="footer" />
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Large wordmark ─────────────────────────────────── */}
        <div className="w-full flex justify-center select-none overflow-hidden lg:mt-[20px]">
          <p
            className="text-white whitespace-nowrap"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(80px, 14.8vw, 283.793px)",
              lineHeight: "0.85",
              letterSpacing: "-0.025em",
            }}
          >
            viaSocket
          </p>
        </div>

        {/* ── Divider — rail to rail ─────────────────────────── */}
        <div
          className="mx-6 md:mx-12 lg:mx-[7.29%] mt-8 lg:mt-12"
          style={{ height: 1, borderTop: "1px solid rgba(255,255,255,0.15)" }}
        />

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <div className="px-6 md:px-12 lg:px-[9.84%] py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left — copyright */}
          <div className="flex flex-col gap-0.5">
            <p
              className="text-[12px]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: "20.4px", color: "rgba(255,255,255,0.5)" }}
            >
              © 2026 viaSocket |{" "}
              <Link href="/privacy" className="underline decoration-solid hover:opacity-80 transition-opacity">
                Privacy
              </Link>
              <span>, </span>
              <Link href="/terms" className="underline decoration-solid hover:opacity-80 transition-opacity">
                Terms
              </Link>
              <span> and </span>
              <Link href="/data-retention-deletion" className="underline decoration-solid hover:opacity-80 transition-opacity">
                Data Retention &amp; Deletion Policy
              </Link>
            </p>
            <p
              className="text-[12px]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: "20.4px", color: "rgba(255,255,255,0.5)" }}
            >
              Walkover Web Solutions Pvt Ltd. | All rights reserved.
            </p>
          </div>

          {/* Center — crafted by */}
          <div className="flex flex-col items-center gap-0">
            <p
              className="text-[12px] text-center"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}
            >
              Crafted by Eshaan Sharma
            </p>
            <Link
              href="/privacy"
              className="text-[12px] text-center underline decoration-solid hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right — social icons */}
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/viasocket/" target="_blank" className="hover:opacity-80 transition-opacity" aria-label="instagram">
              <FaInstagramSquare size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            </Link>
            <Link href="https://www.linkedin.com/company/viasocket-walkover/" target="_blank" className="hover:opacity-80 transition-opacity" aria-label="linkedin">
              <FaLinkedin size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            </Link>
            <Link href="https://x.com/viasocket" target="_blank" className="hover:opacity-80 transition-opacity" aria-label="twitter">
              <FaSquareXTwitter size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            </Link>
            <Link href="https://www.youtube.com/@viasocket" target="_blank" className="hover:opacity-80 transition-opacity" aria-label="youtube">
              <YouTubeIcon width={20} height={20} fill="rgba(255,255,255,0.6)" />
            </Link>
            <Link href="https://discord.com/invite/wqsSsMAkkz" target="_blank" className="hover:opacity-80 transition-opacity" aria-label="discord">
              <PiDiscordLogoFill size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
