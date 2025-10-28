import { useState, useEffect, useMemo } from 'react';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { getTemplates } from '@/utils/axiosCalls';
import FlowRenderer from '@/components/flowComp/flowRenderer';
import Link from 'next/link';
import Image from 'next/image';
import { Timer, Webhook } from 'lucide-react';
import { FiExternalLink } from 'react-icons/fi';

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
            handleFilterChange({ selectedApps: appSlugs });
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
                    <Link
                        key={template.rowid || index}
                        href={`/automations/${template?.title?.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${template?.id}`}
                        className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
                    >
                        <div className="p-4 md:p-6 h-32 md:h-36 flex flex-col">
                            <h4 className="h4 font-semibold text-xl">
                                {template.title}
                            </h4>

                            <div className="flex items-center gap-2 mt-auto">
                                {(() => {
                                    const triggerIcon = template?.triggerIcon;
                                    const triggerType = template?.triggerType;
                                    const appIcons = Array.isArray(template?.appsIcons) ? template.appsIcons : [];
                                    const shownIcons = new Set();
                                    const elements = [];

                                    if (triggerIcon && !shownIcons.has(triggerIcon)) {
                                        shownIcons.add(triggerIcon);
                                        elements.push(
                                            <div key="trigger" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                                <Image src={triggerIcon} alt="trigger" width={16} height={16} className="w-3 h-3 md:w-5 md:h-5" />
                                            </div>
                                        );
                                    } else if (!triggerIcon) {
                                        if (triggerType === 'webhook') {
                                            elements.push(
                                                <div key="webhook" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                                    <Webhook size={12} className="md:w-4 md:h-4" />
                                                </div>
                                            );
                                        } else if (triggerType === 'cron') {
                                            elements.push(
                                                <div key="cron" className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                                    <Timer size={12} className="md:w-4 md:h-4" />
                                                </div>
                                            );
                                        }
                                    }

                                    appIcons.slice(0, 3).forEach((icon, i) => {
                                        if (icon && !shownIcons.has(icon)) {
                                            shownIcons.add(icon);
                                            elements.push(
                                                <div key={`app-${i}`} className="w-6 h-6 md:w-8 md:h-8 bg-gray-50 flex items-center justify-center border">
                                                    <Image src={icon} alt="app" width={16} height={16} className="w-3 h-3 md:w-5 md:h-5" />
                                                </div>
                                            );
                                        }
                                    });

                                    return elements;
                                })()}
                            </div>
                        </div>

                        <div className="max-h-[400px] bg-white border-t border-gray-100 p-2 md:p-4 flex items-center justify-center overflow-hidden flex-1">
                            <div className="max-h-[360px] max-w-full overflow-hidden">
                                <FlowRenderer
                                    flowJson={template?.metadata?.flowJson || template?.flowJson}
                                    scale={60}
                                />
                            </div>
                        </div>

                        <div className="p-4 md:p-6 pt-3 md:pt-4 border-t border-gray-100 bg-white">
                            <div className="flex items-center justify-center">
                                <div className="btn btn-primary flex items-center gap-2 text-sm">
                                    <span>View Template</span>
                                    <FiExternalLink className="text-base" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* <div className="flex justify-end mt-6">
                <button
                    onClick={() => setVisibleTemplaets(visibleTemplaets + 3)}
                    className="btn btn-outline custom-border flex items-center gap-2"
                >
                    Load More <MdKeyboardArrowDown fontSize={20} />
                </button>
            </div> */}
        </div>
    );
}