'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import Link from 'next/link';
import TemplateCard from '@/components/templateCard/templateCard';

export default function TemplateContainer({ selectedApps, templateToShow, requireAllApps, department_name }) {
    const appSlugs = useMemo(
        () => selectedApps?.map((app) => app.appslugname || app.slugname || app.slug).filter(Boolean) || [],
        [selectedApps]
    );

    const { filteredTemplates, handleFilterChange } = useTemplateFilters(templateToShow);

    useEffect(() => {
        if (appSlugs.length > 0) {
            handleFilterChange({ selectedApps: appSlugs, requireAllApps: requireAllApps });
        }
    }, [appSlugs.join(','), handleFilterChange]);

    if (!selectedApps || filteredTemplates.length === 0) return null;

    const displayedTemplates = filteredTemplates.slice(0, 3);

    return (
        <div>
            <div className="cont md:flex-row mb-6 md:mb-8 gap-2 justify-between">
                <p className="h3">
                    {department_name
                        ? `Ready to use automation templates for ${department_name}`
                        : 'Explore more automations built by businesses and experts'}
                </p>
                <button className="btn btn-outline">
                    <Link href="/automations">Explore all templates</Link>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                {displayedTemplates.map((template, index) => (
                    <TemplateCard template={template} index={index} />
                ))}
            </div>
        </div>
    );
}
