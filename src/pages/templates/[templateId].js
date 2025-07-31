// pages/template/[templateId].js
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS } from '@/const/fields';
import { getTemplates } from '@/utils/axiosCalls';
import { getFooterData } from '@/utils/getData';
import { getMetaData } from '@/utils/getMetaData';
import { handleRedirect } from '@/utils/handleRedirection';
import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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

            <div className="container cont lg:gap-20 md:gap-16 gap-12">
                <div className="cont gap-4 pt-20">
                    <div className="flex flex-col">
                        <h1 className="h1">{template?.title}</h1>
                        <div className="flex gap-8 bg-white border custom-border p-8">
                            <div className="w-1/3 cont justify-between">
                                <div className="cont gap-4">
                                    <h2 className="h2">{template?.description}</h2>
                                    <div className="flex gap-4 items-center">
                                        {(() => {
                                            const triggerIcon = template?.triggerIcon;
                                            const triggerType = template?.triggerType;
                                            const appIcons = Array.isArray(template?.appsIcons)
                                                ? template.appsIcons
                                                : [];

                                            const shownIcons = new Set();
                                            const elements = [];

                                            // Trigger Icon
                                            if (triggerIcon && !shownIcons.has(triggerIcon)) {
                                                shownIcons.add(triggerIcon);
                                                elements.push(
                                                    <Image
                                                        key="trigger-icon"
                                                        src={triggerIcon}
                                                        alt="trigger icon"
                                                        width={32}
                                                        height={32}
                                                    />
                                                );
                                            } else if (!triggerIcon) {
                                                if (triggerType === 'webhook') {
                                                    elements.push(<Webhook size={32} />);
                                                } else if (triggerType === 'cron') {
                                                    elements.push(<Timer size={32} />);
                                                }
                                            }

                                            // App Icons (deduplicated)
                                            for (let i = 0; i < appIcons.length; i++) {
                                                const icon = appIcons[i];
                                                if (icon && !shownIcons.has(icon)) {
                                                    shownIcons.add(icon);
                                                    elements.push(
                                                        <Image
                                                            key={`app-icon-${i}`}
                                                            src={icon}
                                                            alt={`app icon`}
                                                            width={32}
                                                            height={32}
                                                        />
                                                    );
                                                }
                                            }

                                            return elements;
                                        })()}
                                    </div>
                                    <button
                                        className="btn btn-accent"
                                        onClick={(e) =>
                                            handleRedirect(e, `https://flow.viasocket.com/template/${template?.id}?`)
                                        }
                                    >
                                        Install
                                    </button>
                                </div>
                                <div className="cont gap-2">
                                    <h3 className="h3">Created by</h3>
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-gray-200 p-1 flex items-center justify-center text-sm">
                                            {template?.userName &&
                                                template?.userName
                                                    .split(' ')
                                                    .map((name, index) => <span key={index}>{name[0]}</span>)}
                                        </div>
                                        <h3 className="sub">{template?.userName}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/3 relative h-[500px]">
                                <Image src={template?.templateUrl} layout="fill" alt="Template Image" />
                            </div>
                        </div>
                    </div>
                </div>
                {template?.content && (
                    <div className="bg-[#FAF9F6] border custom-border p-8">
                        <ReactMarkdown>{template?.content}</ReactMarkdown>
                    </div>
                )}
                <div className="pb-4">
                    <Footer footerData={footerData} />
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
