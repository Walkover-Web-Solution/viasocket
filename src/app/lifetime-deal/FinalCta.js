import Image from 'next/image';

export default function FinalCta() {
    return (
        <section
            className="relative overflow-hidden bg-[#f6f3ee] py-[72px] pb-[88px] md:py-[100px] md:pb-[120px] bg-[radial-gradient(ellipse_45%_55%_at_0%_100%,rgba(148,22,8,0.12)_0%,transparent_70%)]"
            id="get-started"
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 560"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <radialGradient id="fg1" cx="260" cy="560" r="650" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                        <stop offset="60%" stopColor="#fff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="fg2" cx="1180" cy="0" r="700" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                        <stop offset="60%" stopColor="#fff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                    <mask id="fm1">
                        <rect width="1440" height="560" fill="url(#fg1)" />
                    </mask>
                    <mask id="fm2">
                        <rect width="1440" height="560" fill="url(#fg2)" />
                    </mask>
                </defs>

                <circle
                    cx="260"
                    cy="680"
                    r="580"
                    fill="none"
                    stroke="rgba(148,22,8,0.16)"
                    strokeWidth="1"
                    mask="url(#fm1)"
                />
                <circle
                    cx="260"
                    cy="680"
                    r="420"
                    fill="none"
                    stroke="rgba(148,22,8,0.10)"
                    strokeWidth="0.8"
                    mask="url(#fm1)"
                />

                <circle
                    cx="1180"
                    cy="-70"
                    r="620"
                    fill="none"
                    stroke="rgba(10,10,10,0.11)"
                    strokeWidth="1"
                    mask="url(#fm2)"
                />
                <circle
                    cx="1180"
                    cy="-70"
                    r="450"
                    fill="none"
                    stroke="rgba(10,10,10,0.07)"
                    strokeWidth="0.8"
                    mask="url(#fm2)"
                />
            </svg>

            <div className="container mx-auto px-6 relative z-[1]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <h2 className="text-[34px] md:text-[42px] lg:text-[56px] font-medium leading-[1.06] tracking-[-0.9px] md:tracking-[-1.5px] text-[#0a0a0a] mb-[22px]">
                            Ready to automate
                            <br />
                            <span className="text-[#a8200d]">smarter,</span> not harder?
                        </h2>
                        <p className="text-[17px] text-[#6b6b6b] leading-[1.65] tracking-[-0.15px] max-w-[480px] mb-9">
                            Start with viaSocket today and scale your workflows with AI-powered automation.
                        </p>

                        <a
                            href="#pricing"
                            role="button"
                            className="btn btn-accent"
                        >
                            Start Your Lifetime Access
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-[17px] h-[17px] stroke-white fill-none [stroke-width:2.2] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-[220ms] group-hover:translate-x-[3px]"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="13 6 19 12 13 18" />
                            </svg>
                        </a>
                    </div>

                    <div className="bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.07),0_32px_80px_rgba(0,0,0,0.04)] p-9 fcta-float">
                            <div className="flex items-center gap-4 mb-[22px]">
                                <Image
                                    src="https://images.contactout.com/profiles/1d4c2fa861915fecc3f5002b63cd33f9"
                                    alt="Pushpendra Agrawal"
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 object-cover border-2 border-black/[0.06]"
                                />
                                <div>
                                    <p className="text-[17px] font-bold text-[#0a0a0a] tracking-[-0.2px] mb-[3px]">
                                        Pushpendra Agrawal
                                    </p>
                                    <p className="text-[13px] text-[#6b6b6b] tracking-[-0.1px] m-0">
                                        Founder &amp; CEO, viaSocket
                                    </p>
                                </div>
                            </div>

                            <div className="h-px bg-black/[0.08] mb-6" aria-hidden="true"></div>

                            <span
                                className="block font-serif text-[40px] leading-[0.75] text-[#a8200d] opacity-75 mb-[-6px]"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>

                            <div className="flex flex-col gap-3.5 mb-7 [&_p]:text-[14.5px] [&_p]:text-[#333] [&_p]:leading-[1.72] [&_p]:tracking-[-0.1px] [&_p]:m-0">
                                <p>
                                    We built viaSocket to solve the exact automation challenges we faced while scaling
                                    our own businesses.
                                </p>
                                <p>
                                    Our goal is simple: give teams a powerful, flexible automation platform that removes
                                    repetitive work and helps them move faster.
                                </p>
                                <p>
                                    Every integration, workflow, and feature is designed with one thing in mind —
                                    helping businesses automate without complexity.
                                </p>
                                <p>Thank you for being part of the journey.</p>
                            </div>

                            <div
                                className="font-['Brush_Script_MT','Segoe_Script',cursive] text-[30px] text-[#0a0a0a] tracking-[0.5px] leading-none"
                                aria-label="Pushpendra's signature"
                            >
                                Pushpendra
                            </div>
                        </div>
                    </div>
                </div>

        </section>
    );
}
