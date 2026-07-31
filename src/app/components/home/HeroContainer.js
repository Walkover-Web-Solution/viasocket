'use client';

import { useCallback, useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import HeroSectionB from './HeroSectionB';
import ShowAppsIndexOptimized from './ShowAppsIndexOptimized';
import SearchAndResults from './SearchAndResults';
import { setVariantCookie } from '@/utils/handleUtmSource';

// A/B hero variants keyed off the `variant` cookie assigned server-side (middleware).
function HeroVariant({ variant, appCount, hasToken }) {
    switch (variant) {
        case 'B':
            return <HeroSectionB appCount={appCount} hasToken={hasToken} />;
        default:
            return <HeroSection appCount={appCount} hasToken={hasToken} />;
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

    const containerClasses = 'min-h-0 pt-24';
    const bgClass = 'dotted-background';

    return (
        <div className={`${containerClasses} ${bgClass} px-4 mx-auto relative global-top-space`}>
            <div className="text-center">
                <HeroVariant variant={variant} appCount={appCount} hasToken={hasToken} />

                <ShowAppsIndexOptimized isHomePage apps={initialApps} appCount={appCount} />

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


