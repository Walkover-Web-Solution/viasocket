import { useState, useEffect, useMemo } from 'react';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { getTemplates } from '@/utils/axiosCalls';
import Link from 'next/link';
import TemplateCard from '@/components/templateCard/templateCard';

export default function TemplateContainer({ selectedApps }) {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const appSlugs = useMemo(() =>
        selectedApps?.map(app => app.appslugname || app.slugname).filter(Boolean) || []
        , [selectedApps]);

    const {
        filteredTemplates,
        handleFilterChange
    } = useTemplateFilters(templates);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templateData = await getTemplates();
                const validTemplates = templateData.filter(
                    t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
                );
                setTemplates(validTemplates);
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    useEffect(() => {
        if (appSlugs.length > 0) {
            handleFilterChange({ selectedApps: appSlugs, requireAllApps: true });
        }
    }, [appSlugs.join(','), handleFilterChange]);

    if (loading) {
        return (
            <div className="bg-gray-50 py-8 md:py-12">
                <div className="container">
                    <div className="text-center mb-6 md:mb-8">
                        <div className="h-6 md:h-8 bg-gray-200 w-48 md:w-64 mx-auto mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-100 w-32 md:w-48 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white shadow-sm p-4 md:p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 mb-3"></div>
                                <div className="h-4 bg-gray-100 mb-4"></div>
                                <div className="h-32 bg-gray-100"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedApps || filteredTemplates.length === 0) return null;

    const displayedTemplates = filteredTemplates.slice(0, 3);

    return (
        <div>
            <div className="cont md:flex-row mb-6 md:mb-8 gap-2 justify-between">
                <p className="h3">
                    Explore more automations built by businesses and experts
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