import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import SuccessContent from './SuccessContent';
import LifetimeDealFooter from '../LifetimeDealFooter';
import { getLifetimeDealPageData } from '../../lib/lifetime-deal-data';

export default async function SuccessPage() {
    const { appCount } = await getLifetimeDealPageData();
    return (
        <>
            <div className="relative flex flex-col justify-center min-h-dvh overflow-hidden isolate bg-[#fafafa] font-inter-tight text-[#0a0a0a] text-base leading-normal antialiased">
                {/* Soft accent wash + faint grid background */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 70% 50% at 50% -6%, rgba(168,32,13,0.045) 0%, transparent 60%),
                            linear-gradient(to right, rgba(10,10,10,0.045) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(10,10,10,0.045) 1px, transparent 1px)
                        `,
                        backgroundSize: 'auto, 48px 48px, 48px 48px',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 0%, transparent 70%)',
                        maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 0%, transparent 70%)',
                    }}
                />

                {/* Top-left logo */}
                <div className="relative z-10 max-w-[720px] w-full mx-auto pt-8 px-6 max-[600px]:pt-[22px] max-[600px]:px-5">
                    <Link
                        href="/"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex"
                        aria-label="viaSocket home"
                    >
                        <Image
                            src="https://viasocket.com/assets/brand/logo.svg"
                            alt="viaSocket"
                            width={118}
                            height={35}
                            className="h-7 w-auto block"
                            unoptimized
                        />
                    </Link>
                </div>

                <SuccessContent />
            </div>
            {/* Event snippet for Purchase - Life Time Deal conversion page */}
            <Script
                id="gtag-conversion"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        gtag('event', 'conversion', {
                            'send_to': 'AW-16852796533/rnD8CJHc2bMcEPWIheQ-',
                            'value': 1.0,
                            'currency': 'USD',
                            'transaction_id': ''
                        });
                    `,
                }}
            />
            <LifetimeDealFooter appCount={appCount} containerClassName="max-w-[720px] mx-auto w-full" />
        </>
    );
}
