'use client';

import AlphabetComp from '@/components/aZComp/alphabetComp/alphabetComp';

export default function FindAppsClient({ data }) {
    const { apps, alphabet, appDetails, step } = data;

    return (
        <div className="container py-20 gap-8 h-screen">
            {step == 0 && (
                <>
                    <div className="flex flex-col gap-8 items-center">
                        <div className="flex flex-col gap-8 items-center">
                            <h1 className="text-center lg:text-2xl md:text-xl text-lg font-semibold pb-4">
                                Browse apps by name - {alphabet?.toUpperCase() || '-'}
                            </h1>

                            <AlphabetComp alphabet={alphabet} appDetails={appDetails} step={step} />
                        </div>

                        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                            {apps?.map((app) => (
                                <a
                                    key={app?.rowid}
                                    href={app?.appslugname ? `/find-apps/${alphabet}/${app?.appslugname}` : `/noplugin`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                    aria-label="app"
                                >
                                    <p className="text-base py-1 ">{app.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {step == 1 && (
                <>
                    <div className="w-full  flex flex-col gap-8 items-center border custom-border bg-white p-12">
                        <div className="flex flex-col gap-8 items-center">
                            <h2 className="h2 text-center">Browse apps by name - {alphabet?.toUpperCase() || '-'}</h2>

                            <AlphabetComp alphabet={alphabet} appDetails={appDetails} step={step} />
                        </div>

                        <div className="w-full  grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-center items-center py-4">
                            {apps?.map((app) => (
                                <a
                                    key={app?.rowid}
                                    href={app?.appslugname ? `/integrations/${app?.appslugname}` : `/noplugin`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                    aria-label="app"
                                >
                                    <p className=" hover:text-blue-600 text-base py-1 ">{app.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
