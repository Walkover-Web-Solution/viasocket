import Image from 'next/image';

export default function SecuritySection({ securityGridData }) {
  return (
    <div className="container">
      <div className="border custom-border p-6 md:p-12 border-b-0 bg-[#376F5B] cont gap-8 text-white">
        <div className="flex lg:flex-row flex-col justify-between gap-4 lg:gap-20 mr-8">
          <div className="cont gap-1">
            <h2 className="h2">viaSocket is the Trusted Choice for Secure Automation</h2>
            <h3 className="sub__h1">
              Your data is safe with us—compliant, secure, and built with privacy in mind at every step,
              so you can run workflows with confidence.
            </h3>
          </div>
          <div className="flex gap-4">
            <Image src="assets/img/aicpa-soc-badge.webp" alt="aicpa soc badge" width={100} height={100} />
            <Image src="assets/img/iso-certified.webp" alt="iso certified badge" width={100} height={100} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-white border-t-0 border-r-0">
          {securityGridData.map((item, index) => (
            <div key={index} className="cont gap-1 py-12 px-8 border border-white border-b-0 border-l-0 ">
              <h4 className="h3">{item.title}</h4>
              <p className="sub__h2 text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
