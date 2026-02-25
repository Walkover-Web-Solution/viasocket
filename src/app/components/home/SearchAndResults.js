'use client'

import { useState, useCallback, useEffect } from 'react';
import SearchInputHomeOptimized from './SearchInputHomeOptimized';
import ResultSectionOptimized from './ResultSectionOptimized';
import BuildOptionsCTAOptimized from './BuildOptionsCTAOptimized';
import CTAButtons from './CTAButtons';

export default function SearchAndResults({ initialApps, templateData, onSearchStateChange, hasToken }) {
  const [templates, setTemplates] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showBlogs, setShowBlogs] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [loadingAiResponse, setLoadingAiResponse] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [hasTemplateResults, setHasTemplateResults] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Callback handlers for SearchInputHome
  const handleTemplatesChange = useCallback((data) => {
    setTemplates(data.templates || []);
    setFilteredTemplates(data.filteredTemplates || []);
    setShowTemplates(data.showTemplates || false);
    setHasTemplateResults(data.hasResults || false);
  }, []);

  const handleVideosChange = useCallback((data) => {
    setVideos(data.videos || []);
    setShowVideos(data.showVideos || false);
  }, []);

  const handleBlogsChange = useCallback((data) => {
    setBlogs(data.blogs || []);
    setShowBlogs(data.showBlogs || false);
  }, []);

  const handleAiResponseChange = useCallback((data) => {
    setAiResponse(data.aiResponse || '');
    setShowAiResponse(data.showAiResponse || false);
  }, []);

  const handleLoadingChange = useCallback((loadingStates) => {
    if (loadingStates.templates !== undefined) setLoadingTemplates(loadingStates.templates);
    if (loadingStates.videos !== undefined) setLoadingVideos(loadingStates.videos);
    if (loadingStates.blogs !== undefined) setLoadingBlogs(loadingStates.blogs);
    if (loadingStates.aiResponse !== undefined) setLoadingAiResponse(loadingStates.aiResponse);
  }, []);

  const handleSelectionChange = useCallback((data) => {
    setSelectedApps(data.selectedApps || []);
    setSelectedIndustries(data.selectedIndustries || []);
    setSelectedDepartments(data.selectedDepartments || []);
  }, []);

  const hasActiveSearch = showTemplates || showVideos || showBlogs || showAiResponse;

  // Notify parent component when search state changes
  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange(hasActiveSearch);
    }
  }, [hasActiveSearch, onSearchStateChange]);
  return (
    <>
      <SearchInputHomeOptimized
        onTemplatesChange={handleTemplatesChange}
        onVideosChange={handleVideosChange}
        onBlogsChange={handleBlogsChange}
        onAiResponseChange={handleAiResponseChange}
        onLoadingChange={handleLoadingChange}
        onSelectionChange={handleSelectionChange}
        initialApps={initialApps}
        templates={templateData}
      />

      <BuildOptionsCTAOptimized />

       <CTAButtons hasToken={hasToken} />

      <ResultSectionOptimized
        // Template props
        showTemplates={showTemplates}
        loadingTemplates={loadingTemplates}
        hasTemplateResults={hasTemplateResults}
        filteredTemplates={filteredTemplates}
        selectedApps={selectedApps}
        selectedDepartments={selectedDepartments}
        selectedIndustries={selectedIndustries}
        // AI Response props
        showAiResponse={showAiResponse}
        loadingAiResponse={loadingAiResponse}
        aiResponse={aiResponse}
        // Video props
        showVideos={showVideos}
        loadingVideos={loadingVideos}
        videos={videos}
        // Blog props
        showBlogs={showBlogs}
        loadingBlogs={loadingBlogs}
        blogs={blogs}
      />
    </>
  );
}
