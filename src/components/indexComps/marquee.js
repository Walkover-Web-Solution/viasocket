import { getApps } from '@/utils/axiosCalls';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = () => {
    const [displayedApps, setDisplayedApps] = useState([]);
    const containerRef = useRef(null);

    // Fetch apps on mount
    useEffect(() => {
        (async () => {
            try {
                const appsData = await getApps();
                // Duplicate for infinite effect
                const limitedApps = appsData.slice(0, 40);
                setDisplayedApps([...limitedApps, ...limitedApps, ...limitedApps]);
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        })();
    }, []);
    return (
        <Marquee speed={50} gradient={false} pauseOnHover={true}>
            <div ref={containerRef} className="flex items-center gap-8">
                {displayedApps.map((app, idx) => (
                    <Link
                        key={`${app?.appslugname}-${idx}`}
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                        className="flex items-center justify-center gap-2 p-4 hover:scale-110 transition-transform marquee-moving-apps"
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
        </Marquee>
    );
};

export default MarqueeComponent;
