import AlphabetComp from '@/components/aZComp/alphabetComp/alphabetComp';
import AZMetaHeadComp from '@/components/aZComp/aZMetaHeadComp/aZMetaHeadComp';
import { sendErrorMessage } from '@/utils/SendErrorMessage';
import Head from 'next/head';

export const runtime = 'experimental-edge';

const SelectedAlphabetPage = ({ apps, alphabet, appDetails, step, alphabet2 }) => {
    return (
        <div className="container py-20 gap-8 ">
            {step == 0 && (
                <>
                    <AZMetaHeadComp alphabet={alphabet} />
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
                    <Head>
                        <title>Apps starting with {alphabet?.toUpperCase()}</title>
                        <meta
                            name="description"
                            content={`Browse and discover a wide range of apps that start with the letter ${alphabet?.toUpperCase()}. Find the perfect app for your needs today!`}
                        />
                        <meta property="og:title" content={`Apps starting with ${alphabet?.toUpperCase()}`} />
                        <meta
                            property="og:description"
                            content={`Browse and discover a wide range of apps that start with the letter ${alphabet?.toUpperCase()}. Find the perfect app for your needs today!`}
                        />
                    </Head>
                    <div className="w-full  flex flex-col gap-8 items-center">
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
};

export default SelectedAlphabetPage;

// Fetch data from API
export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const { slug } = context.query;
    const step = slug?.length;
    switch (slug?.length) {
        case 1: {
            let data = null;
            try {
                const response = await fetch(`https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[0]}`);
                data = await response.json();
            } catch (error) {
                sendErrorMessage({ error, pageUrl });
            }
            return {
                props: {
                    apps: data?.data?.rows || [],
                    appDetails: null,
                    alphabet: slug[0] || '',
                    step: step,
                    alphabet2: null,
                },
            };
        }
        default: {
            return {
                props: {
                    apps: [],
                    appDetails: [],
                    alphabet: '',
                    step: 0,
                    alphabet2: '',
                },
            };
        }
    }
}
