import EmbedBreadcrumbs from '../EmbedBreadcrumbs';
import './HeroAurora.scss';
import Link from 'next/link';
import { ArrowRight, Gift } from 'lucide-react';
import WorkflowIllustration from './WorkflowIllustration';

export default function HeroAurora({ appCount }) {
    return (
        <>
            <section className="container relative max-md:px-6 max-sm:px-4">
                <EmbedBreadcrumbs currentPage="App Integrations" />
                <div
                    className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden border"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 70% at 88% 75%, #0d6e52 0%, #0a5040 18%, #063826 42%, #032820 70%, #021810 100%)',
                    }}
                >
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[620px] h-[620px] bg-[#0a4836] -left-[8%] -top-[10%] opacity-25 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[540px] h-[540px] bg-[#0e7a5c] -right-[6%] top-[35%] opacity-30 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[520px] h-[520px] bg-[#063826] left-[40%] -bottom-[18%] opacity-18 max-md:blur-[60px]" />
                    <div className="aurora-grid-bg" />

                    <div className="relative z-[2] w-full grid grid-cols-1 items-center md:grid-cols-[3fr_2fr] gap-8 sm:gap-10 md:gap-12 p-6 sm:p-8 md:p-12 lg:p-20">
                        <div className="flex flex-col items-start text-left max-lg:items-center max-lg:text-center">
                            <Link
                                href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                                className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 mb-4 text-xs md:text-sm border border-white/20 shadow-sm hover:bg-white hover:shadow-md transition-all max-w-full"
                            >
                                <Gift size={14} className="text-accent shrink-0" />
                                <span className="font-medium text-accent tracking-wide whitespace-nowrap">LIMITED-TIME OFFER</span>
                                <span className="text-gray-700 font-medium">
                                    Get 6 months for the price of 1
                                </span>
                                <ArrowRight size={14} strokeWidth={2.2} className="shrink-0" />
                            </Link>
                            <h1 className="h1 !text-white !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">Integrate {appCount + 300}+ apps with your product</h1>

                            <p className="text-base sm:text-lg md:text-xl text-white/[0.72] max-w-[480px] mb-6 md:mb-8 leading-[1.55] font-normal max-lg:mx-auto">
                                Give users the ability to connect the tools they use with your product and automate it.
                            </p>
                            <div className="flex gap-3 sm:gap-4 md:gap-6 items-center justify-center md:justify-start w-full">
                                <Link
                                    href="https://viasocket.com/signup?utm_source=/embed/app-integration"
                                    className="btn btn-outline"
                                >
                                    Get Started
                                    <ArrowRight size={14} strokeWidth={2.2} />
                                </Link>
                                <Link
                                    href="https://cal.id/team/viasocket/sales-team"
                                    className="text-white/80 hover:text-white underline"
                                    target="_blank"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>

                        <WorkflowIllustration />
                    </div>
                </div>
            </section>
        </>
    );
}
