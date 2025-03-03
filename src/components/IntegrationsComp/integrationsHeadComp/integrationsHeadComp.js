import Head from 'next/head';

export default function IntegrationsHeadComp({ pageInfo, metaData, integrationsInfo, plugins, type }) {
    const keywords = metaData?.keywords && typeof metaData.keywords === 'string' ? metaData.keywords : '';

    if (type === 'appTwo') {
        const title = `Integrate ${plugins[0]?.name} with ${plugins[1]?.name} for automation | viaSocket`;
        const description = `viaSocket enables seamless integration between ${plugins[0]?.name} and ${plugins[1]?.name}, empowering you to automate tasks, and achieve more in less time. Get started now!`;
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    {keywords && <meta name="keywords" content={keywords} />}
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />
                </Head>
            </>
        );
    } else if (type === 'appOne') {
        const title = `Integrate ${plugins[0]?.name} with thousands of apps | viaSocket`;
        const description = `Connect ${plugins[0]?.name} with thousands of apps effortlessly using viaSocket. Streamline your workflow and enhance productivity. Try it now!`;
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    {keywords && <meta name="keywords" content={keywords} />}
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />

                    {integrationsInfo?.page && integrationsInfo?.page > 1 && (
                        <>
                            <link
                                rel="prev"
                                href={`https://viasocket.com/${integrationsInfo?.appone}/page/${integrationsInfo?.page - 1}`}
                            />
                            <link
                                rel="next"
                                href={`https://viasocket.com/${integrationsInfo?.appone}/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                    {integrationsInfo?.page && integrationsInfo?.page == 1 && (
                        <>
                            <link rel="prev" href={`https://viasocket.com/${integrationsInfo?.appone}`} />
                            <link
                                rel="next"
                                href={`https://viasocket.com/${integrationsInfo?.appone}/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                </Head>
            </>
        );
    } else {
        if (integrationsInfo?.category) {
            return (
                <Head>
                    <title>{`${metaData?.title && metaData?.title} ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}</title>
                    <meta
                        name="description"
                        content={`${metaData?.description && metaData?.description} ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta
                        property="og:title"
                        content={`${metaData?.title && metaData?.title} ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta
                        property="og:description"
                        content={`${metaData?.description && metaData?.description} ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />
                    {keywords && <meta name="keywords" content={keywords} />}
                    {integrationsInfo?.page && integrationsInfo?.page > 1 && (
                        <>
                            <link
                                rel="prev"
                                href={`https://viasocket.com/integrations/category/${integrationsInfo?.category}/page/${integrationsInfo?.page - 1}`}
                            />
                            <link
                                rel="next"
                                href={`https://viasocket.com/integrations/category/${integrationsInfo?.category}/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                    {integrationsInfo?.page && integrationsInfo?.page == 1 && (
                        <>
                            <link
                                rel="prev"
                                href={`https://viasocket.com/integrations/category/${integrationsInfo?.category}`}
                            />
                            <link
                                rel="next"
                                href={`https://viasocket.com/integrations/category/${integrationsInfo?.category}/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                    {!integrationsInfo?.page && (
                        <>
                            <link
                                rel="next"
                                href={`https://viasocket.com/integrations/category/${integrationsInfo?.category}/page/1`}
                            />
                        </>
                    )}
                </Head>
            );
        } else {
            return (
                <Head>
                    <title>{`Explore thousands of apps for Integrations | viaSocket ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}</title>
                    <meta
                        name="description"
                        content={`Browse through thousands of apps to simplify your workflow. Find the right solution for your business with viaSocket's wide range of integrations. ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta
                        property="og:title"
                        content={`Explore thousands of apps for Integrations | viaSocket ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta
                        property="og:description"
                        content={`Browse through thousands of apps to simplify your workflow. Find the right solution for your business with viaSocket's wide range of integrations. ${integrationsInfo?.page ? '| Page ' + integrationsInfo?.page : ''}`}
                    />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    {keywords && <meta name="keywords" content={keywords} />}
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />
                    {integrationsInfo?.page && integrationsInfo?.page > 1 && (
                        <>
                            <link
                                rel="prev"
                                href={`https://viasocket.com/integrations/page/${integrationsInfo?.page - 1}`}
                            />
                            <link
                                rel="next"
                                href={`https://viasocket.com/integrations/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                    {integrationsInfo?.page && integrationsInfo?.page == 1 && (
                        <>
                            <link rel="prev" href={`https://viasocket.com/integrations`} />
                            <link
                                rel="next"
                                href={`https://viasocket.com/integrations/page/${Number(integrationsInfo?.page) + 1}`}
                            />
                        </>
                    )}
                    {!integrationsInfo?.page && (
                        <>
                            <link rel="next" href={`https://viasocket.com/integrations/page/1`} />
                        </>
                    )}
                </Head>
            );
        }
    }
}
