import BlogGrid from '@/components/blogGrid/blogGrid';
import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureContentComp from '@/components/FeaturesComp/FeatureContentComp/FeatureContentComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { ALLFEATURES_FIELDS, FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import {
    getAllFeatures,
    getDefaultBlogData,
    getFeatureData,
    getFooterData,
    getMetaData,
    getNavData,
} from '@/utils/getData';
import GetPageInfo from '@/utils/getPageInfo';
import { useEffect, useState } from 'react';

export default function Features({
    features,
    featureData,
    navData,
    footerData,
    metaData,
    pathArray,
    pageInfo,
    blogData,
}) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={pathArray?.join('/')} pathArray={pathArray} />
            <div className="cont ">
                <FeatureBannerComp featureData={featureData} navData={navData} pageInfo={pageInfo} />
                <FeatureGridComp features={features} pageInfo={pageInfo} />
                <FeatureContentComp featureData={featureData?.faqs} pageInfo={pageInfo} />
                <div className="container cont cont__py">
                    <BlogGrid posts={blogData} />
                </div>
                <FeaturesFooterComp
                    featureData={featureData?.cta_content}
                    footerData={footerData}
                    pageInfo={pageInfo}
                />
            </div>
        </>
    );
}

export const runtime = 'experimental-edge';

export async function getServerSideProps(context) {
    const pageInfo = GetPageInfo(context);
    const navData = await getNavData(FOOTER_FIELDS);
    const footerData = await getFooterData(NAVIGATION_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='${pageInfo?.url}'`);
    let feature = null;
    let features = [];
    let featureData = [];
    if (context?.params?.feature?.length > 0) {
        feature = context?.params?.feature[0];
    }

    if (!feature) {
        features = await getAllFeatures(ALLFEATURES_FIELDS);
    } else {
        featureData = await getFeatureData([], `filter=slug='${feature}'`);
    }
    const blogTags = 'feature';
    const blogData = await getBlogData(blogTags);

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            features: features || [],
            featureData: (featureData?.length > 0 && featureData[0]) || {},
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            pageInfo: pageInfo || {},
            blogData: blogData || [],
        },
    };
}
