import { Shield, Globe, Lock, Eye, Server, AlertTriangle } from "lucide-react";

const socBadge = "assets/img/aicpa-soc-badge.webp";
const isoBadge = "assets/img/iso-certified.webp";

const trustItems = [
  {
    title: "SOC 2 (Type II)",
    description:
      "Your workflow's data is handled with the highest level of security, privacy, and confidentiality.",
    icon: Shield,
  },
  {
    title: "ISO Certified",
    description:
      "We consistently meet international standards to deliver reliable and secure solutions for your business.",
    icon: Globe,
  },
  {
    title: "GDPR & CCPA Compliance",
    description:
      "Your data remains private and entirely under your control, at all times.",
    icon: Lock,
  },
  {
    title: "End-to-End Observability",
    description:
      "Gain full visibility into your data's journey with detailed audit logs, real-time analytics, and proactive alerts.",
    icon: Eye,
  },
  {
    title: "99.99% Uptime & Enterprise SLA",
    description:
      "Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.",
    icon: Server,
  },
  {
    title: "Error Handling & Recovery",
    description:
      "Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your workflows running smoothly.",
    icon: AlertTriangle,
  },
];

export default function SecuritySectionNew() {
  return (
    <section
      className="w-full py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(167.77deg, #e8f5ec 8.5%, #eef7f1 50%, #f2faf5 91.5%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] relative z-10">
        <div
          className="px-8 py-12 md:px-12 rounded-none"
          style={{
            background: "#2d6b42",
            border: "none",
            boxShadow: "0 8px 40px rgba(34,80,52,0.2)",
            animation: "securityFadeUp 420ms ease both",
          }}
        >
          {/* Header row — title left, badges right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <div className="max-w-[640px]">
              <h2
                className="text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.8px] lg:tracking-[-1.2px] mb-3"
                style={{ color: "#ffffff", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                viaSocket is the Trusted Choice for Secure Automation
              </h2>
              <p
                className="text-[15px] leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Your data is safe with us—compliant, secure, and built with
                privacy in mind at every step, so you can run workflows with
                confidence.
              </p>
            </div>

            {/* Certification badges */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <img
                src={socBadge}
                alt="AICPA SOC"
                className="object-contain"
                style={{ width: 64, height: 64 }}
              />
              <img
                src={isoBadge}
                alt="ISO 27001:2022 Certified"
                className="object-contain"
                style={{ width: 64, height: 64 }}
              />
            </div>
          </div>

          {/* 3×2 grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] overflow-hidden"
            style={{
              background: "#ffffff",
              border: "2px solid #ffffff",
            }}
          >
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-7"
                  style={{
                    background: "#3a8a54",
                    border: "none",
                    borderRadius: "0px",
                    animation: `securityFadeUp 360ms ease ${i * 0.06}s both`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "#ffffff" }}
                      />
                    </div>
                    <h3
                      className="text-[16px]"
                      style={{ color: "#ffffff", fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-[14px] leading-[1.7]"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes securityFadeUp {
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