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
                    className="relative min-h-[520px] flex items-center justify-center overflow-hidden border"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 70% at 88% 75%, #0d6e52 0%, #0a5040 18%, #063826 42%, #032820 70%, #021810 100%)',
                    }}
                >
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[620px] h-[620px] bg-[#0a4836] -left-[8%] -top-[10%] opacity-25 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[540px] h-[540px] bg-[#0e7a5c] -right-[6%] top-[35%] opacity-30 max-md:blur-[60px]" />
                    <div className="absolute rounded-full blur-[100px] pointer-events-none w-[520px] h-[520px] bg-[#063826] left-[40%] -bottom-[18%] opacity-18 max-md:blur-[60px]" />
                    <div className="aurora-grid-bg" />

                    <div className="relative z-[2] w-full grid grid-cols-1 items-center md:grid-cols-[3fr_2fr] gap-12 p-12 lg:p-20">
                        <div className="flex flex-col items-start text-left max-lg:items-center max-lg:text-center">
                            <Link
                                href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                                className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 mb-4 text-sm border border-white/20 shadow-sm hover:bg-white hover:shadow-md transition-all"
                            >
                                <Gift size={16} className="text-accent" />
                                <span className="font-medium text-accent tracking-wide">LIMITED-TIME OFFER</span>
                                <span className="text-gray-700 font-medium text-sm">
                                    Get 6 months for the price of 1
                                </span>
                                <ArrowRight size={14} strokeWidth={2.2} />
                            </Link>
                            <h1 className="h1 !text-white">Integrate {appCount + 300}+ apps with your product</h1>

                            <p className="text-xl text-white/[0.72] max-w-[480px] mb-8 leading-[1.55] font-normal max-lg:mx-auto">
                                Give users the ability to connect the tools they use with your product and automate it.
                            </p>
                            <div className="flex gap-6 items-center">
                                <Link
                                    href="https://viasocket.com/signup?utm_source=/embed/app-integration"
                                    className="btn btn-outline"
                                >
                                    Get Started
                                    <ArrowRight size={14} strokeWidth={2.2} />
                                </Link>
                                <Link
                                    href="https://cal.id/team/viasocket/sales-team"
                                    className="text-white/80 hover:text-white underline text-lg"
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
