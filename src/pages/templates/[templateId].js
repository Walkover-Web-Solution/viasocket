import Footer from '@/components/footer/footer';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS } from '@/const/fields';
import { getTemplates } from '@/utils/axiosCalls';
import { getFooterData } from '@/utils/getData';
import { handleRedirect } from '@/utils/handleRedirection';
import ReactMarkdown from 'react-markdown';
import style from '@/components/templateCard/template.module.scss';
import SharePopup from '@/components/templateCard/sharePopup';
import TemplateDetails from '@/components/templateCard/templateDetails';
import TemplateIcons from '@/components/templateCard/templateIcons';

export const runtime = 'experimental-edge';

const TemplateDetailPage = ({ footerData, metaData, template, relatedTemplates }) => {
    return (
        <>
            <Head>
                <title>{metaData?.title}</title>
                <meta name="description" content={metaData?.description} />
                <meta name="keywords" content={metaData?.keywords} />

                {/* Open Graph / Facebook / LinkedIn */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={metaData?.url} />
                <meta property="og:title" content={metaData?.title} />
                <meta property="og:description" content={metaData?.description} />
                <meta property="og:image" content={metaData?.image} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={metaData?.url} />
                <meta name="twitter:title" content={metaData?.title} />
                <meta name="twitter:description" content={metaData?.description} />
                <meta name="twitter:image" content={metaData?.image} />
            </Head>
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="container cont lg:gap-20 md:gap-16 gap-12">
                <div className="cont gap-4 pt-20">
                    <div className="flex flex-col gap-4 bg-[#f2f2f2] border custom-border shadow-lg p-8">
                        <h1 className="h1">{template?.title}</h1>
                        <div className="flex flex-col md:flex-row md:gap-4 gap-0">
                            <div className="w-full md:w-2/5 cont justify-between">
                                <div className="cont gap-4">
                                    <h2 className="h3">{template?.description}</h2>
                                    <TemplateIcons template={template} />
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
                                        <h3 className="sub font-semibold">
                                            {template?.userName}
                                            <span className="!font-normal"> at </span>
                                            {template?.updatedAt
                                                ? new Date(template.updatedAt).toLocaleDateString('en-GB', {
                                                      day: '2-digit',
                                                      month: 'short',
                                                      year: 'numeric',
                                                      timeZone: 'UTC',
                                                  })
                                                : ''}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`md:w-3/5 w-full h-[500px] overflow-hidden flex justify-center items-start relative border custom-border ${style.templateImageBg}`}
                            >
                                <img src={template?.templateUrl} alt={template?.title} className="block" />
                                <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-2/5 cont gap-4">
                        <SharePopup title={template?.title} />
                        {template?.instructions && (
                            <div className="w-full border custom-border p-4 h-64 cont gap-2 bg-white">
                                <h3 className="h3">Instructions</h3>
                                <textarea
                                    readOnly
                                    className="w-full h-full focus:outline-none resize-none"
                                    value={template?.instructions}
                                />
                            </div>
                        )}
                        <div className="w-full border custom-border p-4 h-fit bg-white">
                            <TemplateDetails template={template} />
                        </div>
                    </div>
                    {template?.content && (
                        <div className=" w-3/5 flex justify-center">
                            <div className={`bg-[#FDF0BD] border custom-border p-8 ${style.markdownImage}`}>
                                <ReactMarkdown>{template?.content}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
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

    const selectedTemplate = templateData.find(
        (t) => t.title?.trim().replace(/\s+/g, '-').toLowerCase() === templateId
    );

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
        image: selectedTemplate?.templateUrl,
        url: pageUrl,
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
