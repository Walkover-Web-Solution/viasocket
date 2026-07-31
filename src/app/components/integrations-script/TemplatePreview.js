'use client';

import { ArrowRight, Zap, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTemplates } from '@/utils/axiosCalls';
import TemplateCardIcons from '@/components/templateCard/templateCardIcons';

export default function TemplatePreview({ templateIds = [] }) {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (templateIds.length === 0) {
            setTemplates([]);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchTemplates = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all templates and filter by IDs
                const allTemplates = await getTemplates('/integrations-script');
                const idsSet = new Set(templateIds);
                const filteredTemplates = allTemplates.filter(template => 
                    template?.id && idsSet.has(template.id)
                );
                setTemplates(filteredTemplates);
            } catch (err) {
                setError(err.message);
                setTemplates([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [templateIds]);

    if (templateIds.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-[#8a8a8a]">
                <div className="text-center">
                    <Zap className="h-12 w-12 mx-auto mb-3 text-[#c4c4c4]" />
                    <p className="text-[14px]">Add template IDs to see previews</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-[#e74c3c]">
                <p className="text-[14px]">Error loading templates: {error}</p>
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-[#8a8a8a]">
                <p className="text-[14px]">No templates found for the provided IDs</p>
            </div>
        );
    }

    return (
        <div aria-hidden="true">
            <div className="flex items-center justify-between pb-[14px]">
                <div className="flex items-center gap-[11px]">
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#4b5563]">
                        <Zap className="h-4 w-4 text-white" strokeWidth={2.4} />
                    </span>
                    <div className="flex flex-col gap-1">
                        <div className="text-base font-semibold leading-[1.1]">
                            Your templates
                        </div>
                        <div className="text-xs text-[#5a5a5a]">
                            Powered by viaSocket · <span>{templates.length} templates</span>
                        </div>
                    </div>
                </div>
                <span className="flex items-center gap-[6px] rounded-full border border-[#cfe6d5] bg-[#eaf6ee] px-[10px] py-[4px] text-[10px] font-bold tracking-[0.6px] text-[#2f8a4a]">
                    <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#2f8a4a]" />
                    LIVE
                </span>
            </div>

            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="group flex min-h-[220px] flex-col justify-between rounded-[6px] border border-[#ece9df] bg-white p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(26,26,26,0.2)]"
                    >
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <TemplateCardIcons template={template} rounded={true} maxIcons={2} overlap={false} />
                            </div>
                            <div className="mb-2 line-clamp-2 text-base font-semibold">
                                {template.name || template.title || 'Template'}
                            </div>
                            <div className="text-sm line-clamp-3 leading-[1.5]">
                                {template.description || template.summary || 'Workflow template'}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <a
                                href={`https://flow.viasocket.com/template/${template.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.6px] text-[#1a1a1a] hover:text-accent transition-colors"
                            >
                                Try it
                                <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
