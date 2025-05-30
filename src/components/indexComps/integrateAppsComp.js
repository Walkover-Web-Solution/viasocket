import { useEffect, useState, useRef } from 'react';
import getApps from '@/utils/getApps';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../uiComponents/buttons';

export default function IntegrateAppsComp() {
    const [apps, setApps] = useState([]);
    const [displayedApps, setDisplayedApps] = useState([]);
    const containerRef = useRef(null);
    const isAutoScrolling = useRef(false);

    // Fetch apps on mount
    useEffect(() => {
        (async () => {
            try {
                const appsData = await getApps();
                setApps(appsData);
                // Duplicate for infinite effect
                const limitedApps = appsData.slice(0, 40);
                setDisplayedApps([...limitedApps, ...limitedApps, ...limitedApps]);
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        })();
    }, []);

    // Infinite scroll when near right edge
    const handleInfiniteScroll = () => {
        if (!containerRef.current || apps.length === 0) return;
        const { scrollWidth, scrollLeft, offsetWidth } = containerRef.current;
        if (scrollWidth - (scrollLeft + offsetWidth) < 100) {
            setDisplayedApps((prev) => [...prev, ...apps.slice(0, 40)]);
        }
    };

    // Auto-scroll effect
    useEffect(() => {
        if (!containerRef.current || displayedApps.length === 0) return;
        let animationId;
        const scrollSpeed = 10;

        function smoothAutoScroll() {
            if (!containerRef.current || isAutoScrolling.current) return;
            const container = containerRef.current;
            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0;
            }

            handleInfiniteScroll();
            animationId = requestAnimationFrame(smoothAutoScroll);
        }
        animationId = requestAnimationFrame(smoothAutoScroll);
        return () => cancelAnimationFrame(animationId);
    }, [displayedApps]);

    if (!displayedApps?.length) return null;

    return (
        <div className="cont cont__gap py-12 border custom-border bg-[#FAF9F6]">
            <div className="container flex">
                <div className="cont gap-1">
                    <h2 className="h2">
                        Connect with <span className="text-accent">1,500+ Apps</span> Effortlessly
                    </h2>
                    <p className="text-lg text-gray-400">
                        viaSocket automates your workflows by bridging the tools you use - seamlessly, reliably, and at
                        scale
                    </p>
                    <LinkButton
                        customClasses={'btn btn-accent mt-8'}
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations`}
                        content={'See All'}
                    />
                </div>
            </div>
            <div className="relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none" />
                <div
                    ref={containerRef}
                    className="flex overflow-x-hidden py-4 w-full scroll-smooth"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    <div className="flex gap-8 min-w-max">
                        {displayedApps.map((app, idx) => (
                            <Link
                                key={`${app?.appslugname}-${idx}`}
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                                className="flex items-center gap-2 px-2 hover:scale-110 transition-transform"
                            >
                                <div className="w-8 h-8 bg-white flex items-center justify-center border custom-border">
                                    <img
                                        src={app?.iconurl || 'https://placehold.co/40x40'}
                                        className="h-4 w-4"
                                        alt={app?.name}
                                    />
                                </div>
                                <p className="text-lg text-center whitespace-nowrap">{app?.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
