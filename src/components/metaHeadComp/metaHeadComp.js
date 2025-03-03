import Head from 'next/head';
export default function MetaHeadComp({ metaData, page, plugin, pathSlugs }) {
    if (metaData) {
        let title, description;

        title = metaData?.title;
        description = metaData?.description;

        if (metaData?.dynamic && plugin.length > 0 && plugin[0]) {
            title = title.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                return match === '[AppOne]' ? plugin[0]?.name : plugin[1]?.name;
            });
            description = description.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                return match === '[AppOne]' ? plugin[0]?.name : plugin[1]?.name;
            });
        } else if (pathSlugs && pathSlugs[0]) {
            title = title.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                return match === '[AppOne]' ? pathSlugs[0] : pathSlugs[1];
            });
            description = description.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                return match === '[AppOne]' ? pathSlugs[0] : pathSlugs[1];
            });
        }

        const keywords = metaData?.keywords && typeof metaData.keywords === 'string' ? metaData.keywords : '';

        return (
            <>
                <Head>
                    <title>{title && title}</title>
                    <meta name="description" content={description && description} />
                    <meta property="og:title" content={title && title} />
                    <meta property="og:description" content={description && description} />
                    <meta property="og:image" content="https://files.msg91.com/342616/wnitwkyk" />
                    {keywords && <meta name="keywords" content={keywords} />}
                </Head>
            </>
        );
    }
}
