'use client';

import Image from 'next/image';
import React from 'react';
// Tailwind-only component — no custom CSS needed

const steps = [
  {
    img: 'https://stuff.thingsofbrand.com/viasocket.com/images/img4_image-122.png',
    alt: 'Apply',
    title: '1. Apply & Set Up Your Agency',
    description:
      'Tell us about your agency, services, and the clients you work with.',
  },
  {
    img: 'https://stuff.thingsofbrand.com/viasocket.com/images/img1_image-123.png',
    alt: 'Connect',
    title: '2. Connect Your Client Stack',
    description:
      'Choose the tools your clients rely on. Build automations faster.',
  },
  {
    img: 'https://stuff.thingsofbrand.com/viasocket.com/images/img7_image-124.png',
    alt: 'Launch',
    title: '3. Launch & Scale Client Automations',
    description:
      'Unlimited workspaces, premium features, and partner pricing from day one.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#fafafa] py-24 pb-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute rounded-full border border-[rgba(168,32,13,0.07)] w-[520px] h-[520px] -top-24 -left-24" />
        <div className="absolute rounded-full border border-[rgba(168,32,13,0.05)] w-[340px] h-[340px] -top-10 -left-10" />
        <div className="absolute rounded-full border border-[rgba(168,32,13,0.07)] w-[640px] h-[640px] -bottom-32 -right-32" />
        <div className="absolute rounded-full border border-[rgba(168,32,13,0.05)] w-[400px] h-[400px] -bottom-12 -right-12" />
      </div>

      <div className="w-full container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.1em] uppercase text-[#a8200d] mb-3">How It Works</span>
          <h2 className="h2 mb-4">How the Partner Program Works</h2>
          <p className="text-lg leading-[1.65] text-black/55 max-w-[560px] mx-auto">
            Get started in minutes and manage every client automation from a
            single partner account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center gap-[14px]">
              <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.alt}
                  width={500}
                  height={375}
                  className="w-full h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.currentTarget.parentElement.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-['Inter_Tight',sans-serif] text-[19px] font-bold leading-[1.3]">{step.title}</h3>
              <p className="text-[15px] leading-[1.65] text-black/65 max-w-[300px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
