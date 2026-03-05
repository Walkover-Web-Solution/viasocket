import Image from "next/image";

const socBadge = "assets/img/aicpa-soc-badge.webp";
const isoBadge = "assets/img/iso-certified.webp";

export default function SecuritySectionNew({ securityGridData = [] }) {
  return (
    <section
      className="w-full py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(167.77deg, #e8f5ec 8.5%, #eef7f1 50%, #f2faf5 91.5%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[180px] relative z-10">
        <div
          className="px-8 py-12 md:px-12 rounded-none bg-[#2d6b42]"
          style={{
            boxShadow: "0 8px 40px rgba(34,80,52,0.2)",
            animation: "securityFadeUp 420ms ease both",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <div className="max-w-[700px]">
              <h2
                className="mb-3 text-white h2"
              >
                viaSocket is the Trusted Choice for Secure Automation
              </h2>
              <p
                className="text-sm light-white leading-[1.7]"
              >
                Your data is safe with us—compliant, secure, and built with
                privacy in mind at every step, so you can run workflows with
                confidence.
              </p>
            </div>

            {/* Certification badges */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Image
                src={socBadge}
                alt="AICPA SOC"
                className="object-contain"
                width={64}
                height={64}
              />
              <Image
                src={isoBadge}
                alt="ISO 27001:2022 Certified"
                className="object-contain"
                width={64}
                height={64}
              />
            </div>
          </div>

          {/* 3×2 grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] overflow-hidden bg-white border-2 border-white"
          >
            { securityGridData.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item?.title}
                  className="p-7 bg-[#3a8a54]"
                  style={{
                    animation: `securityFadeUp 360ms ease ${i * 0.06}s both`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-[#ffffff26]"
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-md text-white font-semibold">
                      {item?.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.7] light-white">
                    {item?.description}
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