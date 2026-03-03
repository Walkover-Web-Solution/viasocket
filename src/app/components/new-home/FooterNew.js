"use client";
import Link from "next/link";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiDiscordLogoFill } from "react-icons/pi";
import YouTubeIcon from "../../../components/footer/YouTubeIcon";

const columns = [
  {
    lgPl: "lg:pl-[116px]",
    groups: [
      { heading: "Support", links: ["Book a Demo", "Contact Support Team", "Request a Feature", "Knowledge Base", "Community"] },
      { heading: "", links: ["Blog", "Download Mobile App", "Request an Integration"] },
      { heading: "", links: ["viaSocket Embed", "MCP Marketplace"] },
    ],
  },
  {
    lgPl: "lg:pl-[115px]",
    groups: [
      { heading: "Company", links: ["About", "We are Hiring", "Culture We Foster", "Client Stories", "Roadmap"] },
      { heading: "Compare", links: ["viaSocket vs Zapier", "viaSocket vs Make", "viaSocket vs Pabbly"] },
    ],
  },
  {
    lgPl: "lg:pl-[80px]",
    groups: [
      { heading: "MCP", links: ["MCP Marketplace", "MCP for AI Agents", "MCP for SaaS Players"] },
      { heading: "Pricing Plans", links: ["Pricing", "Startups plan", "Discount for Developing Nations", "Free Access Program"] },
    ],
  },
  {
    lgPl: "lg:pl-[103px]",
    groups: [
      { heading: "For SaaS", links: ["List Your App", "Build Your Own Product", "Whitelabel MCP Server", "Become a Billing Partner", "Embed"] },
      { heading: "AI & Automation", links: ["Apps Integrations", "Features", "Automations", "Discover Top Apps", "Workflow Automation Guide"] },
    ],
  },
];

/* ── Grid constants ──────────────────────────────────────────── */
const LINE_COLOR = "rgba(81,81,81,0.12)";
const DOT_COLOR = "#414141";
const DOT_OPACITY = 0.5;

/*
 * Figma grid positions on 1920px frame:
 * - Vertical rails: 140px (7.29%) & 1780px (92.71%) — full height
 * - Inner verticals: 521px (27.14%), 945px (49.22%), 1365px (71.09%) — 532px tall
 * - Horizontal lines: y=45 & y=577 — full width
 * - Dots at: x = 136, 516, 940, 1360, 1776 (as % = 7.08, 26.88, 48.96, 70.83, 92.5)
 *            y = 40 (top row) & 572 (bottom row)
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
export default function FooterNew() {
  const bgStyle = {
    backgroundImage: [
      "radial-gradient(ellipse at 20% 50%, rgba(42,42,30,1) 0%, rgba(26,26,20,1) 50%)",
      "radial-gradient(ellipse at 80% 20%, rgba(30,34,40,1) 0%, rgba(26,26,20,1) 50%)",
      "linear-gradient(90deg, #1a1a14 0%, #1a1a14 100%)",
    ].join(", "),
  };

  return (
    <footer className="w-full relative overflow-hidden" style={bgStyle}>

      {/* ── Atmospheric glows (Figma Container4–7) ──────────── */}
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
                height: line.full ? undefined : 532,
                width: 2,
                background: LINE_COLOR,
              }}
            />
          ))}

          {/* Top horizontal at y=45 */}
          <div className="absolute" style={{ top: 45, left: -3, right: -3, height: 2, background: LINE_COLOR }} />
          {/* Bottom horizontal at y=577 */}
          <div className="absolute" style={{ top: 577, left: -3, right: -3, height: 2, background: LINE_COLOR }} />

          {/* Intersection dots — top row (y=40) */}
          {dotXPositions.map((x, i) => (
            <svg key={`dot-t-${i}`} className="absolute" style={{ left: x, top: 40, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill={DOT_COLOR} fillOpacity={DOT_OPACITY} />
            </svg>
          ))}
          {/* Intersection dots — bottom row (y=572) */}
          {dotXPositions.map((x, i) => (
            <svg key={`dot-b-${i}`} className="absolute" style={{ left: x, top: 572, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill={DOT_COLOR} fillOpacity={DOT_OPACITY} />
            </svg>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-[1920px] mx-auto relative z-10">

        {/* ── Link columns ─────────────────────────────────── */}
        <div className="px-6 md:px-12 pt-[70px] pb-12 lg:pt-[114px] lg:pb-[100px] lg:px-[7.29%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-0 lg:gap-y-0">
            {columns.map((col, ci) => (
              <div key={ci} className={`flex flex-col gap-8 ${col.lgPl}`}>
                {col.groups.map((group, gi) => (
                  <div key={gi}>
                    {group.heading && (
                      <h4
                        className="text-[11px] tracking-[1.65px] uppercase mb-4 whitespace-pre-wrap"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          lineHeight: "16.5px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {group.heading}
                      </h4>
                    )}
                    <ul className="space-y-[6px]">
                      {group.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-[14px] transition-colors duration-200 block text-white"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              lineHeight: "21px",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Large wordmark ─────────────────────────────────── */}
        <div className="w-full flex justify-center select-none overflow-hidden lg:mt-[57px]">
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
              <a href="#" className="underline decoration-solid hover:opacity-80 transition-opacity">
                Privacy, Terms and Data Retention &amp; Deletion Policy
              </a>
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
            <a
              href="#"
              className="text-[12px] text-center underline decoration-solid hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}
            >
              Privacy Policy
            </a>
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
