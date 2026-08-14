'use client';

import { useCallback, useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import HeroSectionB from './HeroSectionB';
import HomeSectionC from './HomeSectionC';
import SearchAndResults from './SearchAndResults';
import { setVariantCookie } from '@/utils/handleUtmSource';

// Hero variants keyed off the `variant` cookie assigned server-side (middleware).
function HeroVariant({ variant, appCount, initialApps, hasToken }) {
    switch (variant) {
        case 'B':
            return <HeroSectionB appCount={appCount} hasToken={hasToken} />;
        case 'C':
            return <HomeSectionC initialApps={initialApps} />;
        default:
            return <HeroSection appCount={appCount} apps={initialApps} hasToken={hasToken} />;
    }
}

export default function HeroContainer({ appCount, initialApps, templateData, hasToken, variant }) {
    const [hasActiveSearch, setHasActiveSearch] = useState(false);

    useEffect(() => {
        setVariantCookie(variant);
    }, [variant]);

    // Handle search state changes from SearchAndResults component
    const handleSearchStateChange = useCallback((isActive) => {
        setHasActiveSearch(isActive);
    }, []);

    const containerClasses = 'min-h-0 global-top-space';
    const bgClass = 'dotted-background';

    return (
        <div className={`${containerClasses} ${bgClass} px-4 mx-auto relative`}>
            <div className="text-center">
                <HeroVariant
                    variant={variant}
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


