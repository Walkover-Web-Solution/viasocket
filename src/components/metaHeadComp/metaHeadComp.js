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
            updateMetaTag('og:title', title, true);
            updateMetaTag('og:description', description, true);
            updateMetaTag('keywords', keywords);

            // Update og:image
            let ogImageTag = document.querySelector('meta[property="og:image"]');
            if (ogImageTag) {
                ogImageTag.content = 'https://files.msg91.com/342616/wnitwkyk';
            } else {
                ogImageTag = document.createElement('meta');
                ogImageTag.property = 'og:image';
                ogImageTag.content = 'https://files.msg91.com/342616/wnitwkyk';
                document.head.appendChild(ogImageTag);
            }
        }
    }, [metaData, plugin, pathSlugs]);

    return null; // This component doesn't render anything visible
}
