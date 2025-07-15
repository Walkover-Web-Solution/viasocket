import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../uiComponents/buttons';
import { getApps } from '@/utils/axiosCalls';

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

    return (
        <div className="cont cont__gap py-12 border custom-border border-r-0 border-l-0 bg-[#FAF9F6]">
            <div className="container flex">
                <div className="cont gap-1">
                    <h2 className="h2">
                        <span className="text-accent">1,500+ Apps</span> and APIs to Integrate Anything
                    </h2>
                    <p className="text-lg text-gray-400">
                        With 1,500+ pre-built apps, easily integrate and customize your workflows. If your app isn't
                        listed, integrate it using our flexible API
                    </p>
                    <LinkButton
                        customClasses={'btn btn-accent mt-8'}
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations`}
                        content={'Browse all apps'}
                    />
                </div>
            </div>
            <div className="relative w-full overflow-hidden group">
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none" />
                <div
                    ref={containerRef}
                    className="flex overflow-hidden py-4 w-full scroll-smooth marquee-moving-tags w-100"
                >
                    <div className="flex gap-8 min-w-max">
                        {displayedApps.map((app, idx) => (
                            <Link
                                key={`${app?.appslugname}-${idx}`}
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                                className="flex items-center justify-center gap-2 px-2 hover:scale-110 transition-transform marquee-moving-apps"
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
                        {displayedApps.map((app, idx) => (
                            <Link
                                key={`${app?.appslugname}-${idx}-duplicate`}
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                                className="flex items-center justify-center gap-2 px-2 hover:scale-110 transition-transform marquee-moving-apps"
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
