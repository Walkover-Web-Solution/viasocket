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
            const apps = categoryApps
                .map((app) => ({ iconUrl: app?.iconurl, name: app?.name }))
                .filter((app) => app.iconUrl);
            return {
                visibleIcons: apps.slice(0, 4),
                extraCount: Math.max(0, apps.length - 4),
            };
        }

        // Fall back to flowJson icons if no category apps
        const flowJson = currentTemplate?.metadata?.flowJson || currentTemplate?.flowJson;
        const trigger = flowJson?.trigger;
        const stepKeys = flowJson?.order?.root || [];
        const steps = stepKeys.map((step) => flowJson?.blocks?.[step]);
        const items = trigger ? [trigger, ...steps] : steps;
        const mappedItems = items
            .map((item) => ({ iconUrl: item?.iconUrl, name: item?.name }))
            .filter((item) => item.iconUrl);
        const uniqueItems = mappedItems.filter(
            (item, index, self) => self.findIndex((t) => t.iconUrl === item.iconUrl) === index
        );
        return {
            visibleIcons: uniqueItems.slice(0, 4),
            extraCount: Math.max(0, uniqueItems.length - 4),
        };
    }, [currentTemplate, categoryApps]);

    return (
        <div className="p-3 border-t flex items-center gap-2 bg-[#EFF2FF]">
            <p className="text-sm text-gray-500 font-semibold">ALSO WORKS WITH</p>
            <div className="flex items-center">
                {visibleIcons.map(({ iconUrl, name }, index) => (
                    <div
                        key={`app-icon-${index}`}
                        className={`relative group w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center ${index > 0 ? '-ml-2' : ''}`}
                    >
                        <Image
                            src={iconUrl}
                            alt={name || 'App icon'}
                            width={22}
                            height={22}
                            className="object-contain p-1"
                        />
                        <div
                            role="tooltip"
                            className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 inline-block whitespace-nowrap px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
                        >
                            {name || 'App icon'}
                        </div>
                    </div>
                ))}
                {extraCount > 0 && <span className="text-sm text-gray-500 ml-3">+{extraCount} more</span>}
            </div>
        </div>
    );
};

export default CategoryAppsDisplay;
