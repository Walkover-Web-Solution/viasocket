'use client';

import { useEffect } from 'react';

export default function MetaHeadComp({ metaData, page, plugin, pathSlugs }) {
    useEffect(() => {
        if (metaData) {
            let title, description;

            title = metaData?.title;
            description = metaData?.description;

            if (metaData?.dynamic && plugin?.length > 0 && plugin[0]) {
                title = title?.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? plugin[0]?.name : plugin[1]?.name;
                });
                description = description?.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? plugin[0]?.name : plugin[1]?.name;
                });
            } else if (pathSlugs && pathSlugs[0]) {
                title = title?.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? pathSlugs[0] : pathSlugs[1];
                });
                description = description?.replace(/\[AppOne\]|\[AppTwo\]/g, function (match) {
                    return match === '[AppOne]' ? pathSlugs[0] : pathSlugs[1];
                });
            }

            const keywords = metaData?.keywords && typeof metaData.keywords === 'string' ? metaData.keywords : '';

            // Update document title
            if (title) {
                document.title = title;
            }

            // Update meta tags
            const updateMetaTag = (name, content, property = false) => {
                if (content) {
                    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
                    let metaTag = document.querySelector(selector);
                    if (metaTag) {
                        metaTag.content = content;
                    } else {
                        metaTag = document.createElement('meta');
                        if (property) {
                            metaTag.property = name;
                        } else {
                            metaTag.name = name;
                        }
                        metaTag.content = content;
                        document.head.appendChild(metaTag);
                    }
                }
            };

            updateMetaTag('description', description);
            updateMetaTag('keywords', keywords);
            updateMetaTag('og:title', title, true);
            updateMetaTag('og:description', description, true);
            updateMetaTag('og:site_name', 'viaSocket', true);
            updateMetaTag('og:image', 'https://files.msg91.com/342616/wnitwkyk', true);
            updateMetaTag('twitter:card', 'summary_large_image', false);
            updateMetaTag('twitter:title', title, false);
            updateMetaTag('twitter:description', description, false);
            updateMetaTag('twitter:image', 'https://files.msg91.com/342616/wnitwkyk', false);
        }
    }, [metaData, plugin, pathSlugs]);

    return null; // This component doesn't render anything visible
}
