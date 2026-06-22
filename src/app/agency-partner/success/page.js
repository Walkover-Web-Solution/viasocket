import Link from 'next/link';

export const metadata = {
    title: 'Payment Successful | viaSocket',
};

export default function PaymentSuccessfulPage() {
    return (
        <div className="min-h-dvh bg-[#FAF9F6] flex flex-col items-center justify-center py-12 px-6 font-sans">
                <div className="w-full max-w-[520px] bg-white border-[0.5px] border-black/[0.08] rounded-[20px] py-14 px-[52px] text-center">
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/[0.08] border-[1.5px] border-[#22c55e]/[0.25] flex items-center justify-center mx-auto mb-8">
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#16a34a"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>

                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#A8200D] mb-3">
                        Payment Successful
                    </p>

                    <h1 className="text-[clamp(24px,4vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111111] mb-4">
                        You&apos;ve unlocked the Agency Partnership Plan.
                    </h1>

                    <p className="text-[15px] leading-[1.7] text-black/50 max-w-[380px] mx-auto mb-10">
                        Check your inbox. You&apos;ll receive an email with the next steps to activate your agency
                        account and get started.
                    </p>

                    <div className="w-full h-px bg-black/[0.06] mb-8" />

                    <p className="text-sm text-black/45 mb-2.5">Meanwhile, explore what&apos;s waiting for you.</p>

                    <Link
                        href="https://viasocket.com"
                        className="text-[14px] text-black underline hover:text-[#A8200D] transition-colors"
                    >
                        Explore viaSocket →
                    </Link>
                </div>

                <p className="mt-8 text-[13px] text-black/30 text-center">
                    Questions? Reach us at{' '}
                    <Link href="mailto:support@viasocket.com" className="text-black/50 underline">
                        support@viasocket.com
                    </Link>
                </p>
            </div>
    );
}
