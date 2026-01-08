import React from 'react';
import TemplateCard from '@/components/templateCard/templateCard';
import VideoGrid from '@/components/videoGrid/videoGrid';
import BlogGrid from '@/components/blogGrid/blogGrid';
import ReactMarkdown from 'react-markdown';

export default function ResultSectionOptimized({
    // Template props
    showTemplates,
    loadingTemplates,
    hasTemplateResults,
    filteredTemplates = [],
    selectedApps = [],
    selectedDepartments = [],
    selectedIndustries = [],

    // AI Response props
    showAiResponse,
    loadingAiResponse,
    aiResponse,

    // Video props
    showVideos,
    loadingVideos,
    videos = [],

    // Blog props
    showBlogs,
    loadingBlogs,
    blogs = []
}) {
    return (
        <div className="bg-[#faf9f6] result-section text-left">
            {/* Template Results Section */}
            {showTemplates && (loadingTemplates || hasTemplateResults) && (
                <div className="container mx-auto px-4 py-12 relative z-index-1">
                    {(loadingTemplates || hasTemplateResults) && (
                        <h2 className="h2 mb-8 text-left">
                            Top{' '}
                            {selectedApps.map((app, index) => (
                                <span key={app.appslugname}>
                                    {index > 0 && ', '}
                                    <span>{app.name}</span>
                                </span>
                            ))}{' '}
                            ready to use templates {selectedDepartments.length > 0 && 'for '}
                            {selectedDepartments.map((department, index) => (
                                <span key={department}>
                                    {index > 0 && ', '}
                                    <span>{department}</span>
                                </span>
                            ))}{' '}
                            {selectedIndustries.length > 0 && 'in '}
                            {selectedIndustries.map((industry, index) => (
                                <span key={industry}>
                                    {index > 0 && ', '}
                                    <span>{industry}</span>
                                </span>
                            ))}
                        </h2>
                    )}

                    {loadingTemplates ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    ) : hasTemplateResults ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {filteredTemplates.slice(0, 6).map((template, index) => (
                                <TemplateCard key={template.id} index={index} template={template} />
                            ))}
                        </div>
                    ) : null}
                </div>
            )}

            {/* AI Response Section */}
            {showAiResponse && (
                <div className="container mx-auto px-4 py-12 relative z-index-1">
                    <h2 className="h2 mb-8 text-left">Top ideas curated for your business</h2>

                    <div className="w-full">
                        {loadingAiResponse ? (
                            <div className="bg-white border custom-border p-8">
                                <div className="space-y-4">Creating ideas for you...</div>
                            </div>
                        ) : aiResponse ? (
                            <div className="bg-white border custom-border p-8 ai-agent-response">
                                <ReactMarkdown>{aiResponse}</ReactMarkdown>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {/* AI Ideas Note Section - Show when incomplete selections */}
            {(selectedApps.length > 0 || selectedIndustries.length > 0 || selectedDepartments.length > 0) &&
                !showAiResponse && (
                    <div className="container mx-auto px-4 py-12 relative z-index-1">
                        <h2 className="h2 mb-8 text-left">Top ideas curated for your business</h2>

                        <div className="w-full">
                            <div className="border custom-border p-8 bg-white">
                                <div className="flex items-start gap-3">
                                    <div className="cont">
                                        <div className="ai-agent-note">
                                            {selectedApps.length > 0 &&
                                                selectedIndustries.length === 0 &&
                                                selectedDepartments.length === 0 && (
                                                    <p>
                                                        Give more details about your business, department you want
                                                        to automate and your industry to receive more personalized
                                                        automation ideas.
                                                    </p>
                                                )}
                                            {(selectedIndustries.length > 0 || selectedDepartments.length > 0) &&
                                                selectedApps.length === 0 && (
                                                    <p>
                                                        {selectedIndustries.length > 0 &&
                                                            selectedDepartments.length === 0 && (
                                                                <>
                                                                    Give more details about your business, apps you
                                                                    use and your department to receive more
                                                                    personalized automation ideas.
                                                                </>
                                                            )}
                                                        {selectedDepartments.length > 0 &&
                                                            selectedIndustries.length === 0 && (
                                                                <>
                                                                    Give more details about your business, apps you
                                                                    use and your industry to receive more
                                                                    personalized automation ideas.
                                                                </>
                                                            )}
                                                        {selectedIndustries.length > 0 &&
                                                            selectedDepartments.length > 0 && (
                                                                <>
                                                                    Give more details about your business and apps
                                                                    you use to receive more personalized automation
                                                                    ideas.
                                                                </>
                                                            )}
                                                    </p>
                                                )}
                                            {selectedApps.length === 1 &&
                                                (selectedIndustries.length > 0 ||
                                                    selectedDepartments.length > 0) && (
                                                    <p>
                                                        Great start! Select one more <strong>app</strong> to unlock
                                                        AI-powered automation ideas.
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* Video Results Section */}
            {showVideos && (loadingVideos || videos.length > 0) && (
                <div className="mx-auto px-4 py-12 relative z-index-1">
                    {(loadingVideos || videos.length > 0) && (
                        <div className='container'><h2 className="h2 mb-8 text-left">Quick step-by-step tutorials </h2></div>
                    )}

                    {loadingVideos ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[300px] rounded-none"></div>
                            ))}
                        </div>
                    ) : videos.length > 0 ? (
                        <VideoGrid videoData={videos} showHeading={false} />
                    ) : null}
                </div>
            )}

            {/* Blog Results Section */}
            {showBlogs && (loadingBlogs || blogs.length > 0) && (
                <div className="container mx-auto px-4 py-12 relative z-index-1">
                    {(loadingBlogs || blogs.length > 0) && (
                        <h2 className="h2 mb-8 text-left">Automation insights & tips </h2>
                    )}

                    {loadingBlogs ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[400px] rounded-none"></div>
                            ))}
                        </div>
                    ) : blogs.length > 0 ? (
                        <BlogGrid posts={blogs} showHeading={false} />
                    ) : null}
                </div>
            )}
        </div>
    );
}
