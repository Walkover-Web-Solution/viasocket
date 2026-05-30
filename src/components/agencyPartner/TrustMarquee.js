'use client';

import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';
import React from 'react';

export default function TrustMarquee() {
    return (
        <div className="flex flex-col items-center w-full mt-5">
            <h3 className="text-gray-400 text-sm uppercase font-medium">Trusted by 50+ automation agencies worldwide</h3>

            <ShowAppsIndexOptimized isTrustMarquee={true} />
        </div>
    );
}
