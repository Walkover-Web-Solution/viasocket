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
        <div className="bg-[#faf9f6] result-section">
            {/* Template Results Section */}
            {showTemplates && (loadingTemplates || hasTemplateResults) && (
                <div className="container mx-auto px-4 py-12 relative">
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

                    {loadingTemplates && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loadingTemplates && hasTemplateResults && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.slice(0, 9).map((template, index) => (
                                <TemplateCard
                                    key={template.id || index}
                                    template={template}
                                    showInstallButton={true}
                                />
                            ))}
                        </div>
                    )}

                    {!loadingTemplates && !hasTemplateResults && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No templates found for your selection. Try different apps or categories.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* AI Response Section */}
            {showAiResponse && (
                <div className="container mx-auto px-4 py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="h2 mb-8 text-left">AI Recommendations</h2>
                    
                    {loadingAiResponse && (
                        <div className="animate-pulse">
                            <div className="bg-gray-200 h-4 rounded mb-4"></div>
                            <div className="bg-gray-200 h-4 rounded mb-4 w-5/6"></div>
                            <div className="bg-gray-200 h-4 rounded mb-4 w-4/6"></div>
                            <div className="bg-gray-200 h-4 rounded w-3/6"></div>
                        </div>
                    )}
                    
                    {!loadingAiResponse && aiResponse && (
                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}
                </div>
            )}

            {/* Video Results Section */}
            {showVideos && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="h2 mb-8 text-left">
                        Related Videos {selectedApps.length > 0 && 'for '}
                        {selectedApps.map((app, index) => (
                            <span key={app.appslugname}>
                                {index > 0 && ', '}
                                <span>{app.name}</span>
                            </span>
                        ))}
                    </h2>
                    
                    {loadingVideos && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loadingVideos && videos.length > 0 && (
                        <VideoGrid videos={videos} />
                    )}
                    
                    {!loadingVideos && videos.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No videos found for your selection.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Blog Results Section */}
            {showBlogs && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="h2 mb-8 text-left">
                        Related Articles {selectedApps.length > 0 && 'about '}
                        {selectedApps.map((app, index) => (
                            <span key={app.appslugname}>
                                {index > 0 && ', '}
                                <span>{app.name}</span>
                            </span>
                        ))}
                    </h2>
                    
                    {loadingBlogs && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loadingBlogs && blogs.length > 0 && (
                        <BlogGrid blogs={blogs} />
                    )}
                    
                    {!loadingBlogs && blogs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No articles found for your selection.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
