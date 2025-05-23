// pages/template/[templateId].js
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getTemplates from '@/utils/getTemplates';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const runtime = 'experimental-edge';

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
            <div className="sticky top-0 z-[100] border-b custom-border">
                <Navbar navData={navData} utm={'/template'} />
            </div>
            <div className="container my-40 cont justify-between items-center">
                <div className="flex w-full gap-12">
                    <div className="w-[60%] cont gap-1">
                        <h1 className="h1">{template?.title}</h1>
                        <h2 className="sub__h2">{template?.metadata?.description}</h2>
                    </div>
                    <div className="w-[40%]">
                        <div className="relative h-[500px] bg-white">
                            {template?.metadata?.templateUrl && (
                                <Image
                                    src={template?.metadata?.templateUrl}
                                    alt={template?.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </div>
                        <div></div>
                    </div>
                </div>
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
