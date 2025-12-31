'use client';

import BlogGrid from '@/app/components/blog/BlogGrid';
import FeatureBannerComp from '@/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp';
import FeatureContentComp from '@/components/FeaturesComp/FeatureContentComp/FeatureContentComp';
import FeatureGridComp from '@/components/FeaturesComp/FeatureGridComp/FeatureGridComp';
import FeaturesFooterComp from '@/components/FeaturesComp/FeaturesFooterComp/FeaturesFooterComp';

export default function FeaturesClient({ data }) {
    const { features, featureData, footerData, pageInfo, blogData, navbarData } = data;

    return (
        <div className="cont global-top-space ">
            <FeatureBannerComp featureData={featureData} pageInfo={pageInfo} navbarData={navbarData} />
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
    );
}
