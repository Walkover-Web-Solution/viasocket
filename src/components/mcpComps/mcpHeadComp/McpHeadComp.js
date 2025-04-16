import Head from 'next/head';
import React from 'react';

const McpHeadComp = ({ metaData, page, appName }) => {
    if (metaData) {
        let title = metaData?.title || '';
        let description = metaData?.description || '';

        if (appName) {
            title = title.replace(/\[app_name\]/g, appName);
            description = description.replace(/\[app_name\]/g, appName);
        }

        const keywords = metaData?.keywords && typeof metaData.keywords === 'string' ? metaData.keywords : '';

        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    {keywords && <meta name="keywords" content={keywords} />}
                </Head>
            </>
        );
    }
    return null;
};

export default McpHeadComp;
