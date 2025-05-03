import { useEffect, useState } from 'react';
import getApps from '@/utils/getApps';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '../uiComponents/buttons';

export default function IntegrateAppsComp() {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const appsData = await getApps();
                setApps(appsData);
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        };

        fetchApps();
    }, []);
    if (apps?.length > 0) {
        return (
            <>
                <div className="cont cont__gap border border-black p-12 ">
                    <h2 className="h1 text-center">
                        Integrate <span className="text-accent italic">5000+</span> Apps
                    </h2>
                    <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 ">
                        {apps?.slice(0, 40).map((app, index) => {
                            return (
                                <>
                                    <Link
                                        key={index}
                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations/${app?.appslugname}`}
                                        className="flex flex-row md:flex-col gap-1 md:py-6 py-2 px-2 items-center hover:bg-black hover:text-white"
                                    >
                                        <div className="bg-white p-1">
                                            <Image
                                                src={app?.iconurl || 'https://placehold.co/40x40'}
                                                width={28}
                                                height={28}
                                                alt={app?.name}
                                            />
                                        </div>
                                        <p className="text-sm">{app?.name}</p>
                                    </Link>
                                </>
                            );
                        })}
                    </div>
                    <div className="flex justify-center w-full">
                        <LinkButton
                            customClasses={'btn btn-accent'}
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations`}
                            content={'See All'}
                        />
                    </div>
                </div>
            </>
        );
    }
}
