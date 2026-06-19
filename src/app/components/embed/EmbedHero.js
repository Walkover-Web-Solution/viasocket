import Link from 'next/link';
import AnimatedAppIcons from '@/app/components/home/AnimatedAppIcons';
import LimitedTimeOffer from '@/app/components/embed/LimitedTimeOffer';
import HeroCtaButtons from '@/app/components/embed/HeroCtaButtons';

export default function EmbedHero({ appCount }) {
    const totalApps = +appCount + 300;

    return (
        <div className="relative flex flex-col items-start text-left gap-4 py-8 overflow-hidden">
            {/* Subtle dot grid fading in from the right */}
            <div
                aria-hidden="true"
                className="dotted-background absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)',
                    backgroundColor: 'transparent',
                }}
            />
            <LimitedTimeOffer href="/signup?utm_source=/embed" />

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight flex flex-col gap-2">
                <span>Give your users</span>
                <span className="flex items-center gap-4 flex-wrap">
                    <span className="text-accent">{totalApps}+</span> integrations <AnimatedAppIcons />
                </span>
            </h1>

            <div className="flex flex-col gap-1 text-2xl text-[#4b5563] mt-2">
                <span>Embed a complete integration and automation layer into your product.</span>
                <span>Users can connect apps and build workflows without leaving your platform.</span>
            </div>

            <HeroCtaButtons signupHref="/signup?utm_source=/embed" salesHref="https://cal.id/team/viasocket/embed" className="flex items-center gap-4 mt-8 mb-8" signupClassName="btn btn-accent" salesClassName="btn btn-outline" />
        </div>
    );
}
