import Footer from '@/components/footer/footer';
import Head from 'next/head';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import { getTemplates } from '@/utils/axiosCalls';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { handleRedirect } from '@/utils/handleRedirection';
import ReactMarkdown from 'react-markdown';
import style from '@/components/templateCard/template.module.scss';
import SharePopup from '@/components/templateCard/sharePopup';
import TemplateIcons from '@/components/templateCard/templateIcons';
import FlowRenderer from '@/components/flowComp/flowRenderer';
import CategoryTemplates from '@/components/categoryTemplates/categoryTemplates';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { MdCenterFocusStrong } from 'react-icons/md';

export const runtime = 'experimental-edge';

const TemplateDetailPage = ({ footerData, metaData, template, relatedTemplates, isCategory, categoryName, navbarData }) => {
    const [scale, setScale] = useState(1);
    const contentRef = useRef(null);
    const flowContainerRef = useRef(null);
    const [flowRendererHeight, setFlowRendererHeight] = useState('600px');

    useEffect(() => {
        if (contentRef.current) {
            setFlowRendererHeight(`${contentRef.current.offsetHeight}px`);
        }

        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.05 : 0.05;
            setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 3));
        };

        const flowContainer = flowContainerRef.current;
        flowContainer?.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            flowContainer?.removeEventListener('wheel', handleWheel);
        };
    }, [template, flowRendererHeight]);

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.1));
    const resetZoom = () => setScale(1);

    const triggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When trigger component is NOT visible, activate sticky
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (triggerRef.current) observer.observe(triggerRef.current);
        return () => observer.disconnect();
    }, []);


    return (
        <div className="dotted-background global-top-space">
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
            <Navbar navbarData={navbarData} utm={'/automations'} />
            {isCategory ? (
                <div className="container cont lg:gap-20 md:gap-16 gap-12">
                    <CategoryTemplates categoryName={categoryName} templates={relatedTemplates} />
                    <div className="pb-4">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            ) : !template ? (
                <div className="container cont lg:gap-20 md:gap-16 gap-12">
                    <div className="cont gap-4 pt-20 text-center">
                        <h1 className="h1">Template Not Found</h1>
                        <p className="text-gray-600">
                            The template you're looking for doesn't exist or has been removed.
                        </p>
                        <a href="/automations" className="btn btn-accent">
                            Browse All Templates
                        </a>
                    </div>
                    <div className="pb-4">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            ) : (
                <div className="container cont lg:gap-20 md:gap-16 gap-12 pt-20">
                    <div ref={triggerRef} className="flex flex-col gap-4 border custom-border">
                        <div className="dotted-background flex flex-col lg:flex-row lg:gap-1">
                            <div ref={contentRef} className="w-full lg:w-[55%] bg-[#faf9f6] flex flex-col  justify-between gap-6 p-6">
                                <div className="cont gap-4">
                                    <h1 className="h1">{template?.title}</h1>
                                    <h2 className="h3">{template?.description}</h2>
                                    <h2 className="h3">Apps used</h2>
                                    <TemplateIcons template={template} />
                                    {template?.category?.length > 0 && (
                                        <div className="cont gap-2 mt-4">
                                            <h2 className="h3">Categories</h2>
                                            <div className="flex flex-wrap gap-3">
                                                {template?.category?.map((cat, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={`/automations/${encodeURIComponent(
                                                            cat.toLowerCase().replace(/\s+/g, '-')
                                                        )}`}
                                                        className="cursor-pointer px-2 py-1 bg-white text-sm border"
                                                    >
                                                        {cat}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className=" flex items-center gap-12 justify-between">
                                    <button
                                        className="btn btn-accent"
                                        onClick={(e) =>
                                            handleRedirect(
                                                e,
                                                `https://flow.viasocket.com/template/${template?.id}?`
                                            )
                                        }
                                    >
                                        Install Template
                                    </button>
                                    <div className="flex gap-1 flex-col">
                                        <h3 className="text-sm">Created by {template?.userName}</h3>
                                        <h3 className="text-xs ml-auto">Installed by {template?.usedCount} users</h3>
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={flowContainerRef}
                                className="lg:w-1/2 ml-auto w-full overflow-hidden flex justify-center items-start border-t lg:border-t-0 lg:border-l custom-border p-6 relative dotted-background"
                                style={{ height: flowRendererHeight }}
                            >
                                <div className="absolute top-2 right-2 flex z-10">
                                    <button onClick={zoomIn} className="px-2 py-1 text-xl">
                                        <FiPlus />
                                    </button>
                                    <button onClick={zoomOut} className="px-2 py-1 text-xl">
                                        <FiMinus />
                                    </button>
                                    <button onClick={resetZoom} className="px-2 py-1 text-xl">
                                        <MdCenterFocusStrong />
                                    </button>
                                </div>

                                <FlowRenderer
                                    flowJson={template?.flowJson || 'https://placehold.co/600x400'}
                                    scale={scale * 100}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`fixed lg:top-[86px] top-[53px] left-1/2 transform -translate-x-1/2  bt-0 transition-all duration-300   m-autotransition-all duration-500 ease-in-out container
              ${isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                        style={{ zIndex: 50 }}
                    >
                        <div className="container border custom-border bg-[#faf9f6] md:gap-24 gap-4 flex flex-col md:flex-row items-center justify-between p-4 md:px-12 md:py-0">
                            <h2 className="h3">{template?.title}</h2>
                            <button
                                className="btn btn-accent md:my-4"
                                onClick={(e) =>
                                    handleRedirect(e, `https://flow.viasocket.com/template/${template?.id}?`)
                                }
                            >
                                Install Template
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-2/5 cont gap-4">
                            <SharePopup title={template?.title} />
                            {template?.instructions && (
                                <div className="w-full border custom-border p-4 h-[400px] lg:h-full cont gap-2 bg-white">
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
                                <div className={`bg-white border custom-border p-8 ${style.markdownImage}`}>
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => (
                                                <h1 {...props} className="text-3xl font-bold mb-4 text-black-900" />
                                            ),
                                            h2: ({ node, ...props }) => (
                                                <h2
                                                    {...props}
                                                    className="text-2xl font-bold mb-3 mt-6 text-black-900"
                                                />
                                            ),
                                            h3: ({ node, ...props }) => (
                                                <h3
                                                    {...props}
                                                    className="text-lg font-semibold mb-2 mt-5 text-black-900"
                                                />
                                            ),
                                            p: ({ node, ...props }) => (
                                                <p {...props} className="text-black-700 leading-7 mb-4" />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong {...props} className="font-bold text-black-900" />
                                            ),
                                            em: ({ node, ...props }) => (
                                                <em {...props} className="italic text-black-800" />
                                            ),
                                            ul: ({ node, ordered, ...props }) => (
                                                <ul {...props} className="list-disc pl-6 space-y-2 mb-4" />
                                            ),
                                            ol: ({ node, ordered, ...props }) => (
                                                <ol {...props} className="list-decimal pl-6 space-y-2 mb-4" />
                                            ),
                                            li: ({ node, checked, ...props }) => (
                                                <li {...props} className="text-black-700 leading-7" />
                                            ),
                                            a: ({ node, ...props }) => (
                                                <a
                                                    {...props}
                                                    className="text-accent hover:border-b-2 border-b-accent"
                                                    target={props.href?.startsWith('http') ? '_blank' : undefined}
                                                    rel={
                                                        props.href?.startsWith('http')
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                />
                                            ),
                                            hr: ({ node, ...props }) => (
                                                <hr {...props} className="my-3 border-t border-black-200" />
                                            ),
                                            blockquote: ({ node, ...props }) => (
                                                <blockquote
                                                    {...props}
                                                    className="border-l-4 border-black-300 pl-4 italic text-black-700 bg-gray-50 py-2 my-4"
                                                />
                                            ),
                                            code: ({ node, inline, ...props }) => (
                                                <code
                                                    {...props}
                                                    className="w-full overflow-auto rounded  text-black text-sm"
                                                />
                                            ),
                                            pre: ({ node, ...props }) => (
                                                <pre
                                                    {...props}
                                                    className="block w-full overflow-auto bg-[#0b1020] text-black-100 text-sm p-0 my-4"
                                                />
                                            ),
                                        }}
                                    >
                                        {template?.content}
                                    </ReactMarkdown>
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

                    <div className="container">
                        <div className="cont bg-[url('/assets/bg-img/shapes-bg.svg')] bg-cover bg-center bg-[#faf9f6] items-center justify-center p-6 md:p-12 h-[600px] overflow-hidden border mt-12">
                            <div className="border flex flex-col justify-center items-center p-6 md:p-12 gap-4 bg-white lg:min-w-[900px] text-center h-[400px]">
                                <h2 className="h2">Can't find the right template?</h2>
                                <h2 className="h2">Start with AI</h2>
                                <button className="btn btn-accent mt-4" aria-label="sign up" onClick={(e) => handleRedirect(e, '/signup?', router)}>Get Started free</button>
                            </div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { req, query } = context;
    const [firstSlug, secondSlug] = query.slug || [];
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);
    const templates = await getTemplates(pageUrl);
    const templateData = (templates).filter(
        t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
    )
    // Check if this is a category page (single slug) or template page (two slugs)
    const isCategory = firstSlug && !secondSlug;

    if (isCategory) {
        // Handle category filtering
        const categoryName = firstSlug.replace(/-/g, ' ');
        const categoryTemplates = templateData.filter(
            (template) =>
                Array.isArray(template.category) &&
                template.category.some(
                    (cat) =>
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
                navbarData: navbarData || [],
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
                navbarData: navbarData || [],
            },
        };
    }
}
export default TemplateDetailPage;
