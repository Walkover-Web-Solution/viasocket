'use client';

import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';
import React from 'react';

export default function TrustMarquee({ appCount }) {
    return (
        <div className="flex flex-col items-center w-full mt-5">
            <h3 className="text-gray-400 text-sm uppercase font-medium">Connect {appCount + 300}+ apps your clients use</h3>

            <ShowAppsIndexOptimized isTrustMarquee={true} />
        </div>
    );
}
