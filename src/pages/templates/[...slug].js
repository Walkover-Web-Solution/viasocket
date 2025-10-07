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
import TemplateIcons from '@/components/templateCard/templateIcons';
import FlowRenderer from '@/components/flowComp/flowRenderer';
import CategoryTemplates from '@/components/categoryTemplates/categoryTemplates';
import Link from 'next/link';

export const runtime = 'experimental-edge';

const TemplateDetailPage = ({ footerData, metaData, template, relatedTemplates, isCategory, categoryName }) => {
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
            {isCategory ? (
                <div className='container cont lg:gap-20 md:gap-16 gap-12'>
                    <CategoryTemplates 
                        categoryName={categoryName} 
                        templates={relatedTemplates} 
                    />
                    <div className="pb-4">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            ) : !template ? (
                <div className="container cont lg:gap-20 md:gap-16 gap-12">
                    <div className="cont gap-4 pt-20 text-center">
                        <h1 className="h1">Template Not Found</h1>
                        <p className="text-gray-600">The template you're looking for doesn't exist or has been removed.</p>
                        <a href="/templates" className="btn btn-accent">Browse All Templates</a>
                    </div>
                    <div className="pb-4">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            ) : (
            <div className="container cont lg:gap-20 md:gap-16 gap-12">
                <div className="cont gap-4 pt-20">
                    <div className="flex flex-col gap-4 bg-[#f2f2f2] border custom-border shadow-lg p-8">
                        <h1 className="h1">{template?.title}</h1>
                        <div className="flex flex-col md:flex-row md:gap-4 gap-0">
                            <div className="w-full md:w-2/5 cont justify-between">
                                <div className="cont gap-4">
                                    <h2 className="h3">{template?.description}</h2>
                                    <TemplateIcons template={template} />
                                    {template?.category?.length > 0 && (
                                        <div className="cont gap-2">
                                            <h2 className="h3">Categories</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {template?.category?.map((cat, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={`/templates/${encodeURIComponent(
                                                            cat.toLowerCase().replace(/\s+/g, '-')
                                                        )}`}
                                                        className="cursor-pointer px-2 py-1 border custom-border hover:bg-gray-100"
                                                    >
                                                        {cat}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="btn btn-accent my-4"
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
                                className={`md:w-3/5 w-full h-[500px] overflow-hidden flex justify-center items-center relative border custom-border ${style.templateImageBg}`}
                            >
                                <FlowRenderer 
                                    flowJson={template?.flowJson || 
                                    'https://placehold.co/600x400'}
                                    scale={'100'}
                                />
                                <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/5 cont gap-4">
                        <SharePopup title={template?.title} />
                        {template?.instructions && (
                            <div className="w-full border custom-border p-4 h-full cont gap-2 bg-white">
                                <h3 className="h3">Instructions</h3>
                                <textarea
                                    readOnly
                                    className="w-full h-full focus:outline-none resize-none"
                                    value={template?.instructions}
                                />
                            </div>
                        )}
                    </div>
                    {template?.content && (
                        <div className=" w-full md:w-3/5 flex justify-center">
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
            )}
        </>
    );
};

export async function getServerSideProps(context) {
    const { req, query } = context;
    const [firstSlug, secondSlug] = query.slug || [];
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const templateData = await getTemplates(pageUrl);
    // Check if this is a category page (single slug) or template page (two slugs)
    const isCategory = firstSlug && !secondSlug;
    
    if (isCategory) {
        // Handle category filtering
        const categoryName = firstSlug.replace(/-/g, ' ');
        const categoryTemplates = templateData.filter((template) =>
            Array.isArray(template.category) &&
            template.category.some((cat) => 
                cat.toLowerCase().replace(/\s+/g, '-') === firstSlug ||
                cat.toLowerCase() === categoryName.toLowerCase()
            )
        );
        const metaData = {
            title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Templates - viaSocket`,
            description: `Discover ${categoryName} automation templates on viaSocket. Streamline your workflows with pre-built integrations.`,
            keywords: `${categoryName}, automation, integration, workflow, templates`,
            image: '/assets/img/viasocket-og-image.png',
            url: pageUrl,
        };
        return {
            props: {
                footerData: footerData || [],
                metaData: metaData,
                template: null,
                relatedTemplates: categoryTemplates || [],
                isCategory: true,
                categoryName: categoryName,
            },
        };
    } else {
        // Handle individual template page
        const selectedTemplate = templateData.find((t) => String(t.id) === String(secondSlug));
        
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
            title: selectedTemplate?.title || 'viaSocket Template',
            description: selectedTemplate?.description || 'Discover powerful automation templates on viaSocket',
            keywords: selectedTemplate?.tags?.join(', ') || 'automation, integration, workflow',
            image: selectedTemplate?.templateUrl || '/assets/img/viasocket-og-image.png',
            url: pageUrl,
        };
        return {
            props: {
                footerData: footerData || [],
                metaData: metaData,
                template: selectedTemplate || null,
                relatedTemplates: relatedTemplates || [],
                isCategory: false,
                categoryName: null,
            },
        };
    }
}
export default TemplateDetailPage;
