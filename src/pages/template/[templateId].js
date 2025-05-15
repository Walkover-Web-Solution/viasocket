// pages/template/[templateId].js
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getTemplates from '@/utils/getTemplates';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const TemplateDetailPage = ({ navData, footerData, templateData, metaData }) => {
    const router = useRouter();
    const { templateId } = router.query;

    const [template, setTemplate] = useState();

    useEffect(() => {
        if (templateId) {
            const foundTemplate = templateData.find((t) => t.id === templateId);
            setTemplate(foundTemplate);
        }
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/template'} />
            </div>
            <div className="container border-2 transparent-border-black mt-20 bg-white">
                <div className="cont justify-between gap-1 w-2/3 py-20 px-12">
                    <h1 className="h1">{template?.title}</h1>
                    <h2 className="sub__h2">{template?.metadata?.description}</h2>
                </div>
                <div className="w-1/3"></div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const templateData = await getTemplates();
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/templates'`);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            templateData: templateData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
        },
    };
}

export default TemplateDetailPage;
