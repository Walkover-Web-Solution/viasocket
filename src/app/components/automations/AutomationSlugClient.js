'use client';

import { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { handleRedirect } from '@/utils/handleRedirection';
import ReactMarkdown from 'react-markdown';
import style from '@/components/templateCard/template.module.scss';
import SharePopup from '@/components/templateCard/sharePopup';
import TemplateIcons from '@/components/templateCard/templateIcons';
import FlowRenderer from '@/components/flowComp/flowRenderer';
import CategoryTemplates from '@/components/categoryTemplates/categoryTemplates';
import Link from 'next/link';
import ZoomableFlowContainer from '@/components/flowComp/zoomableFlowContainer';
import TemplateCard from '@/components/templateCard/templateCard';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

export default function AutomationSlugClient({ pageData }) {
    const [scale, setScale] = useState(1);
    const contentRef = useRef(null);
    const flowContainerRef = useRef(null);
    const [flowRendererHeight, setFlowRendererHeight] = useState('600px');

    const triggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyVisible, setIsStickyVisible] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);

    const { footerData, metaData, template, relatedTemplates, isCategory, categoryName, navbarData } = pageData;

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
    }, [pageData]);

    const handleShareTemplate = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleCloseStickyBar = () => {
        setIsStickyVisible(false);
    };

    if (isCategory) {
        return (
            <div className="container cont lg:gap-20 md:gap-16 gap-12">
                <CategoryTemplates categoryName={categoryName} templates={relatedTemplates} />
            </div>
        );
    }

    if (!template) {
        return (
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
            </div>
        );
    }

    return (
        <div className="container cont lg:gap-20 md:gap-16 gap-12 pt-20 relative">
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
                            <div className="flex items-center gap-4">
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
                                <button className='btn btn-outline' onClick={handleShareTemplate}>
                                    Share Template
                                </button>
                            </div>
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
                        <ZoomableFlowContainer
                            setScale={setScale}
                            contentRef={contentRef}
                            flowContainerRef={flowContainerRef}
                            setFlowRendererHeight={setFlowRendererHeight}
                            positionX="right-2"
                            positionY="top-2"
                        />

                        <FlowRenderer
                            flowJson={template?.flowJson || 'https://placehold.co/600x400'}
                            scale={scale * 100}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`fixed bottom-[80px] sm:bottom-[10px] left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out container ${isSticky && isStickyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                style={{ zIndex: 100 }}
            >
                <div className="container border custom-border bg-[#faf9f6] gap-2 flex flex-col items-center justify-between pt-2 sm:pt-6 md:px-12 relative">
                    <button
                        onClick={handleCloseStickyBar}
                        className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        aria-label="Close sticky bar"
                    >
                        <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                    <h2 className="h3">{template?.title}</h2>
                    <div className="flex items-center gap-4">
                        <button
                            className="btn btn-accent my-4"
                            onClick={(e) =>
                                handleRedirect(e, `https://flow.viasocket.com/template/${template?.id}?`)
                            }
                        >
                            Install Template
                        </button>
                        <button className='btn btn-outline' onClick={handleShareTemplate}>
                            Share Template
                        </button>
                    </div>
                </div>
            </div>

            {openPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
                    <div className="bg-white p-0 max-w-md w-full mx-4">
                        <SharePopup title={template?.title} onClose={handleClosePopup} />
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 cont">
                {template?.instructions && (
                    <div className="w-full md:w-2/5 cont gap-4">
                        <div className="w-full border custom-border p-4 h-[400px] lg:h-full cont gap-2 bg-white">
                            <h3 className="h3">Instructions</h3>
                            <textarea
                                readOnly
                                className="w-full h-full focus:outline-none resize-none"
                                value={template?.instructions}
                            />
                        </div>
                    </div>
                )}

                {template?.content && (
                    <div className={`w-full ${template?.instructions ? 'md:w-3/5' : ''}`}>
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

            {template?.longDescription && (
                <div className="cont gap-4 bg-white p-6 border custom-border">
                    <h2 className="h2">Description</h2>
                    <div className={style.markdown}>
                        <ReactMarkdown>{template.longDescription}</ReactMarkdown>
                    </div>
                </div>
            )}

            {relatedTemplates?.length > 0 && (
                <div className="cont gap-4">
                    <div className="h2">Related Templates</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                        {relatedTemplates.map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                </div>
            )}

            <div className="cont">
                <div className="cont bg-[url('/assets/bg-img/shapes-bg.svg')] bg-cover bg-center bg-[#faf9f6] items-center justify-center p-6 md:p-12 h-[600px] overflow-hidden border mt-12">
                    <div className="border flex flex-col justify-center items-center p-6 md:p-12 gap-4 bg-white lg:min-w-[900px] text-center h-[400px]">
                        <h2 className="h2">Can't find the right template?</h2>
                        <h2 className="h2 mb-4">Start with AI</h2>
                        <DashboardButton utm_src={`/automations/${template?.title}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
