'use client'

import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import SearchAndResults from './SearchAndResults';
import CTAButtons from './CTAButtons';

export default function HeroContainer({ appCount, initialApps, templateData }) {
  const [hasActiveSearch, setHasActiveSearch] = useState(false);

  useEffect(() => {
    // Listen for search state changes
    const checkSearchState = () => {
      if (typeof window !== 'undefined' && window.__SEARCH_STATE__) {
        setHasActiveSearch(window.__SEARCH_STATE__.hasActiveSearch);
      }
    };

    // Check initially and set up interval to check for changes
    checkSearchState();
    const interval = setInterval(checkSearchState, 100);

    return () => clearInterval(interval);
  }, []);

  const containerClasses = hasActiveSearch 
    ? 'min-h-0 pt-12' 
    : 'min-h-[calc(100vh-150px)] flex flex-col justify-center';

  return (
    <div className={`${containerClasses} px-4 mx-auto relative global-top-space`}>
      <div className="text-center container">
        <HeroSection appCount={appCount} />
        
        <SearchAndResults 
          initialApps={initialApps} 
          templateData={templateData} 
        />
        
        <CTAButtons />
      </div>
    </div>
  );
}
