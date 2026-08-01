'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { getApps } from '@/utils/axiosCalls';

const CategoryAppsDisplay = ({ categoryName, currentTemplate }) => {
    const [categoryApps, setCategoryApps] = useState([]);

    // Mapping of template categories to integration category names (same as used in integration page)
    const categoryNameMap = {
        'HR': 'HR Talent and Recruitment',
        'Finance': 'Accounting',
        'Marketing': 'Social Media Accounts',
        'Support': 'Customer Support',
        'Project Management': 'Project Management',
    };

    // Fetch apps from the specific category when category name changes
    useEffect(() => {
        const fetchCategoryApps = async () => {
            if (categoryName && categoryNameMap[categoryName]) {
                const mappedCategoryName = categoryNameMap[categoryName];
                try {
                    const apps = await getApps({ 
                        categoryData: [{ name: mappedCategoryName }], 
                        limit: 4 
                    }, 'https://viasocket.com');
                    setCategoryApps(apps || []);
                } catch (error) {
                    console.error('Error fetching category apps:', error);
                    setCategoryApps([]);
                }
            } else {
                setCategoryApps([]);
            }
        };

        fetchCategoryApps();
    }, [categoryName]);

    // Get icons for display - use category apps if available, otherwise fall back to flowJson icons
    const { visibleIcons, extraCount } = useMemo(() => {
        if (categoryApps.length > 0) {
            const icons = categoryApps.map((app) => app?.iconurl).filter(Boolean);
            return {
                visibleIcons: icons.slice(0, 4),
                extraCount: Math.max(0, icons.length - 4),
            };
        }

        // Fall back to flowJson icons if no category apps
        const flowJson = currentTemplate?.metadata?.flowJson || currentTemplate?.flowJson;
        const triggerIcon = flowJson?.trigger?.iconUrl;
        const stepKeys = flowJson?.order?.root || [];
        const stepIcons = stepKeys.map((step) => flowJson?.blocks?.[step]?.iconUrl).filter(Boolean);
        const icons = triggerIcon ? [triggerIcon, ...stepIcons] : stepIcons;
        const uniqueIcons = [...new Set(icons)];
        return {
            visibleIcons: uniqueIcons.slice(0, 4),
            extraCount: Math.max(0, uniqueIcons.length - 4),
        };
    }, [currentTemplate, categoryApps]);

    return (
        <div className="p-3 border-t flex items-center gap-2 bg-[#EFF2FF]">
            <p className="text-sm text-gray-500 font-semibold">ALSO WORKS WITH</p>
            <div className="flex items-center">
                {visibleIcons.map((iconUrl, index) => (
                    <div
                        key={`app-icon-${index}`}
                        className={`w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden ${index > 0 ? '-ml-2' : ''}`}
                    >
                        <Image
                            src={iconUrl}
                            alt="App icon"
                            width={22}
                            height={22}
                            className="object-contain p-1"
                        />
                    </div>
                ))}
                {extraCount > 0 && <span className="text-sm text-gray-500 ml-3">+{extraCount} more</span>}
            </div>
        </div>
    );
};

export default CategoryAppsDisplay;
