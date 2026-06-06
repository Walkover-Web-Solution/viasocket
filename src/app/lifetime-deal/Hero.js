'use client';
import HeroContent from './HeroContent';
import PricingCard from './PricingCard';
import AnnouncementBar from './AnnouncementBar';

export default function Hero() {
    return (
        <>
            <AnnouncementBar />
            <section id="hero" className="relative overflow-hidden min-h-screen flex flex-col pt-2">
                {/* grid bg */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_20%,transparent_90%)]"
                />

                {/* glow */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_40%_35%_at_50%_30%,rgba(168,32,13,0.10),transparent_70%)]"
                />

                <div className="relative z-10 container mx-auto px-8 flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] py-20 lg:py-2 gap-16 items-center">
                    <HeroContent />
                    <PricingCard />
                </div>
            </section>
        </>
    );
}
