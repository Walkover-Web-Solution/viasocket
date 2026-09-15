'use client';

import { useCallback, useState } from 'react';
import HeroSection from './HeroSection';
import SearchAndResults from './SearchAndResults';

function HeroVariant({ appCount, initialApps, hasToken }) {
    return <HeroSection appCount={appCount} apps={initialApps} hasToken={hasToken} />;
}

export default function HeroContainer({ appCount, initialApps, templateData, hasToken }) {
    const [hasActiveSearch, setHasActiveSearch] = useState(false);

    const handleSearchStateChange = useCallback((isActive) => {
        setHasActiveSearch(isActive);
    }, []);

    const containerClasses = 'min-h-0 global-top-space';
    const bgClass = 'dotted-background';

    return (
        <div className={`${containerClasses} ${bgClass} px-4 mx-auto relative`}>
            <div className="text-center">
                <HeroVariant
                    appCount={appCount}
                    initialApps={initialApps}
                    hasToken={hasToken}
                />

                {/* <ShowAppsIndexOptimized isHomePage apps={initialApps} appCount={appCount} /> */}

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


