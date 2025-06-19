import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LinkButton } from '../uiComponents/buttons';
import { getApps } from '@/utils/axiosCalls';

export default function IntegrateAppsComp() {
    const [displayedApps, setDisplayedApps] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const appsData = await getApps();
                const limitedApps = appsData.slice(0, 40);
                setDisplayedApps([...limitedApps, ...limitedApps, ...limitedApps]);
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        })();
    }, []);

    if (!displayedApps?.length) return null;

    return (
        <div className="cont cont__gap py-12 border custom-border border-r-0 border-l-0 bg-[#FAF9F6]">
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

                <marquee className="marquee flex" direction="left" behavior="smooth">
                    <div className="flex gap-8 min-w-max min-h-12">
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
                </marquee>
            </div>
    );
}
