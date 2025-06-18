import BlogGrid from '@/components/blogGrid/blogGrid';
import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureContentComp from '@/components/FeaturesComp/FeatureContentComp/FeatureContentComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { ALLFEATURES_FIELDS, FOOTER_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getAllFeatures, getFeatureData, getFooterData } from '@/utils/getData';
import { getMetaData } from '@/utils/getMetaData';
import GetPageInfo from '@/utils/getPageInfo';

export default function Features({ features, featureData, footerData, metaData, pathArray, pageInfo, blogData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={pathArray?.join('/')} pathArray={pathArray} />
            <div className="cont ">
                <FeatureBannerComp featureData={featureData} footerData={footerData} pageInfo={pageInfo} />
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
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const pageInfo = GetPageInfo(context);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const metaData = await getMetaData(pageInfo?.url, pageUrl);
    let feature = null;
    let features = [];
    let featureData = [];
    if (context?.params?.feature?.length > 0) {
        feature = context?.params?.feature[0];
    }

    if (!feature) {
        features = await getAllFeatures(ALLFEATURES_FIELDS, '', pageUrl);
    } else {
        featureData = await getFeatureData([], `filter=slug='${feature}'`, pageUrl);
    }
    const blogTags = 'feature';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    return {
        props: {
            footerData: footerData || [],
            features: features || [],
            featureData: (featureData?.length > 0 && featureData[0]) || {},
            metaData: metaData || {},
            pageInfo: pageInfo || {},
            blogData: blogData || [],
        },
    };
}
