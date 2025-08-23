import Link from 'next/link';

export default function IndexBannerComp({ redirect_to, signupFeatures }) {
    return (
        <div className="container min-h-fit pt-12">
            <div className="flex flex-col h-full cont__gap">
                <div className="w-full flex flex-col items-center justify-center md:items-start gap-12">
                    <div className="flex gap-12 flex-col items-center">
                        <div className="flex flex-col gap-4">
                            <h1 className="h1 text-black text-start ">
                                Build<span className="text-accent"> Intelligent</span> & Powerful automations
                            </h1>
                            <div className="cont gap-2 w-full">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Link href="/signup?utm_source=/">
                                        <button className="btn btn-accent">Start for free</button>
                                    </Link>
                                    <a
                                        href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                        className="btn btn-outline"
                                    >
                                        Free call with automation experts
                                    </a>
                                </div>
                                <div className="flex gap-6 flex-wrap">
                                    {signupFeatures.map((point, index) => (
                                        <div key={index} className="flex gap-2 h6 items-center">
                                            <div className="h-3 w-3 bg-accent" />
                                            <p className="text-nowrap">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
