import { useEffect, useState } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../uiComponents/buttons';
import { getApps } from '@/utils/axiosCalls';
import Marquee from "react-fast-marquee";

export default function IntegrateAppsComp() {
    const [apps, setApps] = useState([]);
    // const [displayedApps, setDisplayedApps] = useState([]);

    // Fetch apps on mount
    useEffect(() => {
        (async () => {
            try {
                const appsData = await getApps();
                setApps([...appsData]);
                // Duplicate for infinite effect
                // const limitedApps = appsData.slice(0, 40);
                // setDisplayedApps([...appsData]);
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
                        Connect <span className="text-accent">your apps</span> and automate workflows in just a few
                        clicks
                    </h2>
                    <p className="text-lg text-gray-400">
                        Connect your favorite apps and watch them work like a dream team. No coding, no headaches, just
                        smooth integrations that actually make sense.
                    </p>
                    <LinkButton
                        customClasses={'btn btn-accent mt-8'}
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations`}
                        content={'Browse all apps'}
                    />
                </div>
            </div>

            <Marquee
                speed={100}
                autoFill
                gradient
                gradientColor={[250, 249, 246]}
                gradientWidth={96}
                pauseOnHover={true}
            >
                <div className="inline-flex gap-8 py-4">
                    {apps.map((app, idx) => (
                        <Link
                            key={`${app?.appslugname}-${idx}`}
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                            className="flex items-center justify-center gap-2 px-2 hover:scale-110 transition-transform marquee-moving-apps my-element"
                           
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
        </div>
    );
}
