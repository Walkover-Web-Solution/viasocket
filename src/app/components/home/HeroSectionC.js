'use client';

import CustomLoginOptimized from '../customLogin/CustomLoginOptimized';

export default function HeroSectionC() {
    return (
        <section className="bg-transparent container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full text-center lg:text-left">
                {/* Left - marketing copy */}
                <div className="flex-1 max-w-3xl lg:flex-[2]">
                    <h1 className="h1 mb-6">
                        <span className="text-accent">Free forever</span> with 10,000 tasks and 500 AI credits a month.
                    </h1>

                    <p className="sub__h1 text-gray-600">
                        Your work never stops. As your business grows, simply pay for as much as you use.
                    </p>
                </div>

                {/* Right - real MSG91 auth widget (same one the /signup page uses) */}
                <div className="w-full max-w-md flex justify-center shrink-0 bg-white p-6 pt-8 rounded-lg">
                    <CustomLoginOptimized redirect_to="" />
                </div>
            </div>
        </section>
    );
}
