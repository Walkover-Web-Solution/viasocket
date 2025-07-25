// pages/template/[templateId].js
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS } from '@/const/fields';
import { getTemplates } from '@/utils/axiosCalls';
import { getFooterData } from '@/utils/getData';
import { getMetaData } from '@/utils/getMetaData';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const runtime = 'experimental-edge';

const TemplateDetailPage = ({ footerData, templateData, metaData }) => {
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
            <Navbar footerData={footerData} utm={'/template'} />

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

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const templateData = await getTemplates(pageUrl);
    const metaData = await getMetaData('/templates', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            templateData: templateData || [],
            metaData: metaData || {},
        },
    };
}

export default TemplateDetailPage;
