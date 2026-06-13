import Link from 'next/link';
import AnimatedAppIcons from '@/app/components/home/AnimatedAppIcons';

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
            <Link
                href="/signup?utm_source=/embed"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#F5C4B0] px-2 py-1.5 w-fit hover:shadow-sm transition-shadow"
                style={{ background: 'linear-gradient(90deg, #FDECE9 0%, #FFF8F6 60%, #ffffff 100%)' }}
            >
                <span className="w-7 h-7 rounded-full bg-[#FDECE9] flex items-center justify-center text-base shrink-0">
                    🎁
                </span>
                <span className="text-xs font-bold text-accent uppercase tracking-wide">Limited-Time Offer</span>
                <span className="text-xs font-bold text-gray-700">Get 6 months for the price of 1</span>
                <span className="text-gray-400 text-sm pr-1">›</span>
            </Link>

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

            <div className="flex items-center gap-4 mt-8 mb-8">
                <Link href="/signup?utm_source=/embed" className="btn btn-accent">
                    Get Started
                </Link>
                <Link href="https://cal.id/team/viasocket/embed" className="btn btn-outline" target="_blank">
                    Contact Sales
                </Link>
            </div>
        </div>
    );
}
