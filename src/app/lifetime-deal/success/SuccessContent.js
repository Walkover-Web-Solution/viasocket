import Link from 'next/link';

export default function SuccessContent() {
    return (
        <main className="relative z-10 max-w-[720px] mx-auto py-8 px-6 pb-16 max-[600px]:py-[22px] max-[600px]:px-5 max-[600px]:pb-[52px]">
            {/* 1. Confirmation header */}
            <div
                className="w-[52px] h-[52px] rounded-full bg-green-50 border border-green-200/70 flex items-center justify-center mb-3.5 max-[600px]:w-12 max-[600px]:h-12 max-[600px]:mb-3"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-green-600 fill-none stroke-[3]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <h1 className="text-[30px] font-medium leading-[1.12] tracking-[-0.9px] mb-6 text-[#0a0a0a] max-[600px]:text-[25px] max-[600px]:tracking-[-0.6px] max-[600px]:mb-5">
                Payment successful. Welcome to viaSocket Lifetime.
            </h1>

            {/* 2. Code delivery - dominant element */}
            <section
                className="flex items-start gap-3.5 bg-white border border-[rgba(168,32,13,0.22)] rounded-[20px] p-4 px-5 mb-5.5 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_18px_44px_-18px_rgba(168,32,13,0.18)] max-[560px]:flex-col max-[560px]:gap-3 max-[560px]:p-[18px]"
                aria-labelledby="sxDeliverTitle"
            >
                <span
                    className="flex-shrink-0 w-10 h-10 rounded-[11px] bg-accent/10 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-accent fill-none stroke-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <polyline points="3 7 12 13 21 7" />
                    </svg>
                </span>
                <div>
                    <h2
                        className="text-[16.5px] font-bold tracking-[-0.3px] text-[#0a0a0a] mb-1"
                        id="sxDeliverTitle"
                    >
                        Your redemption code is on its way
                    </h2>
                    <p className="text-[13.5px] leading-[1.5] text-[#2a2a2a] tracking-[-0.05px]">
                        We&rsquo;ve sent your lifetime redemption code to the email and phone number you used at
                        checkout. It usually arrives within a couple of minutes. If you don&rsquo;t see the
                        email, please check your spam folder.
                    </p>
                </div>
            </section>

            {/* 3. Activation steps */}
            <h2 className="text-lg font-bold tracking-[-0.4px] mt-4 mb-2 text-[#0a0a0a]">
                How to activate your lifetime access
            </h2>
            <ol className="flex flex-col gap-2.5 mb-5">
                {[
                    'Open the email or text from viaSocket and copy your redemption code',
                    'Go to viasocket.com and create your account (or log in if you already have one)',
                    'Complete the quick workspace setup',
                    'When prompted for billing, paste your redemption code',
                    'Choose your plan and add your payment details to activate it.',
                    'Your lifetime plan is now active on your workspace.'
                ].map((step, i) => (
                    <li
                        key={i}
                        className="flex items-center gap-3 text-[14.5px] leading-[1.45] text-[#2a2a2a] tracking-[-0.1px]"
                    >
                        <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-accent/10 text-accent text-[13px] font-bold flex items-center justify-center">
                            {i + 1}
                        </span>
                        <span>{step}</span>
                    </li>
                ))}
            </ol>
            <div className="mb-12">
                <Link
                    id="sxSignupCta"
                    href="/signup"
                    rel="nofollow noopener noreferrer"
                    className="btn btn-accent"
                >
                    Go to viaSocket
                    <span
                        className="text-base leading-none transition-transform duration-200 group-hover:translate-x-[3px]"
                        aria-hidden="true"
                    >
                        &rarr;
                    </span>
                </Link>
            </div>

            {/* 4. Reassurance blocks (below the fold) */}
            <div className="flex flex-col gap-3.5 mb-2">
                <div className="flex items-start gap-4 bg-white border border-[#d4d4d4] rounded-[18px] p-5 px-6 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_18px_44px_-20px_rgba(10,10,10,0.14)]">
                    <span className="text-2xl leading-none flex-shrink-0 mt-px" aria-hidden="true">
                        &#128274;
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-[15.5px] leading-[1.55] text-[#0a0a0a] tracking-[-0.1px] font-medium">
                            Keep your code safe once it arrives. It&rsquo;s tied to your lifetime subscription
                            and can only be redeemed once. Treat it like a license key.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-white border border-[#d4d4d4] rounded-[18px] p-5 px-6 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_18px_44px_-20px_rgba(10,10,10,0.14)]">
                    <span className="text-2xl leading-none flex-shrink-0 mt-px" aria-hidden="true">
                        &#128172;
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-[15.5px] leading-[1.55] text-[#0a0a0a] tracking-[-0.1px] font-medium">
                            Didn&rsquo;t get your code, or stuck while redeeming? We&rsquo;ll help you sort it
                            out fast.
                        </p>
                        <div className="flex flex-wrap gap-2.5 mt-4">
                            <a
                                href="mailto:support@viasocket.com"
                                className="btn btn-outline"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[15px] h-[15px] stroke-current fill-none stroke-2"
                                    aria-hidden="true"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <polyline points="3 7 12 13 21 7" />
                                </svg>
                                Email support
                            </a>
                            <a
                                href="https://viasocket.com/support"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sx-support-link btn btn-outline"
                            >
                                Visit support page
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[15px] h-[15px] stroke-current fill-none stroke-2"
                                    aria-hidden="true"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="9 7 17 7 17 15" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
