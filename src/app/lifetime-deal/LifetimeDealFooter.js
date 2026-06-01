import Image from 'next/image';
import { Linkedin, Youtube, Github } from 'lucide-react';

export default function LifetimeDealFooter({ appCount }) {
    const socialLinks = [
        {
            name: 'X',
            href: 'https://x.com/viasocket',
            icon: (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/viasocket',
            icon: <Linkedin className="w-4 h-4" aria-hidden="true" />,
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@viasocket',
            icon: <Youtube className="w-4 h-4" aria-hidden="true" />,
        },
        {
            name: 'GitHub',
            href: 'https://github.com/walkover101',
            icon: <Github className="w-4 h-4" aria-hidden="true" />,
        },
    ];

    return (
        <footer className="bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Left section — brand */}
                    <div className="lg:col-span-6">
                        <div className="mb-6">
                            <Image
                                src="https://viasocket.com/assets/brand/logo.svg"
                                alt="viaSocket"
                                width={118}
                                height={35}
                                className="h-7 w-auto block brightness-0 invert"
                                unoptimized
                            />
                        </div>
                        <p className="text-[15px] text-white/70 leading-[1.7] max-w-[340px] mb-6">
                            Automate smarter with AI-powered workflows and {appCount + 300}+ app integrations.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/50">
                            <span>{appCount + 300}+ integrations</span>
                            <span className="text-[#a8200d]">•</span>
                            <span>AI workflows</span>
                            <span className="text-[#a8200d]">•</span>
                            <span>Lifetime access</span>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="lg:col-span-6">
                        <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-5">
                            Follow Us
                        </h3>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.08]">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/40">
                        <span>© 2026 viaSocket. All rights reserved.</span>
                        <span>Made for teams who automate at scale.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
