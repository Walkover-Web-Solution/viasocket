'use client'

import { useCallback, useState } from 'react';
import HeroSection from './HeroSection';
import SearchAndResults from './SearchAndResults';

export default function HeroContainer({ appCount, initialApps, templateData, hasToken }) {
  const [hasActiveSearch, setHasActiveSearch] = useState(false);

  // Handle search state changes from SearchAndResults component
  const handleSearchStateChange = useCallback((isActive) => {
    setHasActiveSearch(isActive);
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
          onSearchStateChange={handleSearchStateChange}
          hasToken={hasToken}
        />
      </div>
    </div>
  );
}
