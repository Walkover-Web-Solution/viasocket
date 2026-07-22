'use client';

import CustomLoginOptimized from '../customLogin/CustomLoginOptimized';

export default function HeroSectionC() {
    return (
        <section className="container flex items-center justify-start gap-20 py-12 lg:py-20">
            <div className="flex flex-col gap-6 items-start justify-center">
                <h1 className="h1 text-start">
                    Automate Anything. <br /> <span className="text-accent">Free Forever.</span>
                </h1>

                <p className="text-xl text-start font-medium text-gray-500">
                    viaSocket's AI builds the automation for you. <br /> 10,000 tasks and 500 AI credits included every
                    month.
                </p>
            </div>

            <div className="w-px h-60 bg-gray-300 mx-20"></div>

            <div className="relative">
                <CustomLoginOptimized redirect_to="" />
            </div>
        </section>
    );
}
