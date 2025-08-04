// pages/template/[templateId].js
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS } from '@/const/fields';
import { getTemplates } from '@/utils/axiosCalls';
import { getFooterData } from '@/utils/getData';
import { handleRedirect } from '@/utils/handleRedirection';
import { Timer, Webhook } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import style from '@/components/templateCard/template.module.scss';

export const runtime = 'experimental-edge';

const TemplateDetailPage = ({ footerData, metaData, template, relatedTemplates }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="container cont lg:gap-20 md:gap-16 gap-12">
                <div className="cont gap-4 pt-20">
                    <div className="flex flex-col gap-4">
                        <h1 className="h1">{template?.title}</h1>
                        <div className="flex flex-col md:flex-row md:gap-4 gap-0 border custom-border shadow-lg bg-[#f2f2f2]">
                            <div className="w-full md:w-2/5 cont justify-between p-8 border-r-0 border-b md:border-b-0 md:border-r custom-border">
                                <div className="cont gap-4">
                                    <h2 className="h3">{template?.description}</h2>
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
                                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                                        <Image
                                                            key="trigger-icon"
                                                            src={triggerIcon}
                                                            alt="trigger icon"
                                                            width={36}
                                                            height={36}
                                                            className="h-5 w-fit"
                                                        />
                                                    </div>
                                                );
                                            } else if (!triggerIcon) {
                                                if (triggerType === 'webhook') {
                                                    elements.push(
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                                            <Webhook size={24} />
                                                        </div>
                                                    );
                                                } else if (triggerType === 'cron') {
                                                    elements.push(
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                                            <Timer size={24} />
                                                        </div>
                                                    );
                                                }
                                            }

                                            // App Icons (deduplicated)
                                            for (let i = 0; i < appIcons.length; i++) {
                                                const icon = appIcons[i];
                                                if (icon && !shownIcons.has(icon)) {
                                                    shownIcons.add(icon);
                                                    elements.push(
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white">
                                                            <Image
                                                                key={`app-icon-${i}`}
                                                                src={icon}
                                                                alt={`app icon`}
                                                                width={36}
                                                                height={36}
                                                                className="h-5 w-fit"
                                                            />
                                                        </div>
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
                            <div className="md:w-3/5 w-full h-[500px] overflow-hidden flex justify-center items-start relative">
                                <img src={template?.templateUrl} alt="Template Image" className="block" />
                                <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
                {template?.content && (
                    <div className="flex justify-center">
                        <div className={`bg-[#FAF9F6] border custom-border p-8 max-w-[1000px] ${style.markdownImage}`}>
                            <ReactMarkdown>{template?.content}</ReactMarkdown>
                        </div>
                    </div>
                )}
                {relatedTemplates?.length > 0 && (
                    <div className="cont gap-4">
                        <div className="h2">Related Templates</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {relatedTemplates.map((template) => (
                                <TemplateCard key={template.id} template={template} />
                            ))}
                        </div>
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
    const { req, query } = context;
    const { templateId } = query;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const templateData = await getTemplates(pageUrl);

    const selectedTemplate = templateData.find((t) => t.id === templateId);

    const selectedCategories = Array.isArray(selectedTemplate?.category) ? selectedTemplate.category : [];

    const relatedTemplates = templateData
        .filter(
            (template) =>
                template.id !== selectedTemplate?.id &&
                Array.isArray(template.category) &&
                template.category.some((cat) => selectedCategories.includes(cat))
        )
        .slice(0, 3);

    const metaData = {
        title: selectedTemplate?.title,
        description: selectedTemplate?.description,
        keywords: selectedTemplate?.tags?.join(', '),
    };
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
            template: selectedTemplate || null,
            relatedTemplates: relatedTemplates || [],
        },
    };
}

export default TemplateDetailPage;
