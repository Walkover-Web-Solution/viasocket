import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTemplates } from '@/utils/axiosCalls';
import { RiSearchLine } from 'react-icons/ri';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { FaBullhorn, FaUserGroup } from 'react-icons/fa6';
import { MdManageAccounts, MdHeadset } from 'react-icons/md';

const IndexTemplateComp = ({ categories }) => {
    const [selected, setSelected] = useState({
        name: 'Finance',
        scriptid: '72077fe9954a5122c1301f4a0dce567ebd54e5d5e6c0e4ff05cfd884361c7e52',
    });
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    // Fetch templates once
    useEffect(() => {
        const fetchTemplates = async () => {
            setIsLoading(true);
            try {
                const data = await getTemplates();
                setTemplates(data || []);
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    // Create a map of templates { [id]: template }
    const templateMap = useMemo(() => {
        const map = {};
        templates.forEach((template) => {
            map[template.id] = template;
        });
        return map;
    }, [templates]);

    // Set default template if available
    useEffect(() => {
        if (!currentTemplate && templateMap[selected?.scriptid]) {
            setCurrentTemplate(templateMap[selected?.scriptid]);
        }
    }, [templateMap, selected, currentTemplate]);

    const handleSelectCategory = (cat) => {
        setSelected(cat);
        setCurrentTemplate(templateMap[cat?.scriptid]);
    };

    const getTemplateLink = () => {
        const template = templateMap[selected?.scriptid];
        return template
            ? `/templates/${template?.title
                  ?.trim()
                  .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
                  .replace(/\s+/g, '-') // replace spaces with '-'
                  .toLowerCase()}/${template?.id}`
            : '#';
    };

    return (
        <div className="cont gap-4 container mt-12 relative">
            <div className="cont gap-1">
                <h2 className="h2">Get started with ready-made templates</h2>
            </div>

            <div className="cont gap-4 border custom-border bg-[#F2F2F2]">
                    <div className="hidden md:flex flex-col gap-8 w-full">
                        <div className="w-full flex flex-col md:flex-row">
                            {categories?.slice(0, 5)?.map((cat, i) => (
                                <button
                                    key={cat?.name}
                                    className={`flex-1 flex flex-col px-4 py-3 h6 font-medium text-start min-h-[60px] ${
                                        selected?.name === cat?.name
                                            ? `text-black ${i === 0 ? 'border-l-0' : 'border-l custom-border'}`
                                            : `bg-white text-gray-600 border custom-border border-r-0 border-t-0 ${i === 0 ? 'border-l-0' : ''}`
                                    }`}
                                    onClick={() => handleSelectCategory(cat)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center">
                                            {cat?.name === 'HR' ? (
                                                <FaUserGroup size={24} />
                                            ) : cat?.name === 'Marketing' ? (
                                                <FaBullhorn size={24} />
                                            ) : cat?.name === 'Support' ? (
                                                <MdHeadset size={24} />
                                            ) : cat?.name === 'Finance' ? (
                                                <HiCurrencyRupee size={24} />
                                            ) : cat?.name === 'Project Management' ? (
                                                <MdManageAccounts size={24} />
                                            ) : (
                                                <RiSearchLine size={24} />
                                            )}
                                        </span>
                                        <span className="block">{cat?.name}</span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="block text-sm">
                                            {cat?.name === 'HR'
                                                ? 'On-board new employees'
                                                : cat?.name === 'Marketing'
                                                  ? 'Boost social media engagement'
                                                  : cat?.name === 'Support'
                                                    ? 'Efficiently manage support tickets'
                                                    : cat?.name === 'Finance'
                                                      ? 'Quick and simple expense approval'
                                                      : cat?.name === 'Project Management'
                                                        ? 'Instant bug alerts on slack'
                                                        : 'Discover powerful automation workflows'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="cont p-4 px-32">
                            {isLoading || !currentTemplate ? (
                                <div className="space-y-4">
                                    <div className="skeleton">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="skeleton">
                                        <div className="h-[70vh] bg-gray-200 rounded-lg"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="cont gap-1">
                                        <h1 className="h3">{currentTemplate?.title}</h1>
                                        <h2 className="h6 leading-none">
                                            {currentTemplate?.metadata?.description || currentTemplate?.description}
                                        </h2>
                                    </div>
                                    <div className="w-full h-[70vh] relative">
                                        <Image
                                            src={
                                                currentTemplate?.metadata?.templateUrl ||
                                                currentTemplate?.templateUrl ||
                                                'https://placehold.co/600x400'
                                            }
                                            alt={currentTemplate?.title}
                                            className="w-full h-full object-contain"
                                            fill
                                            loading="eager"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex gap-4 border-b custom-border">
                        <div className="cont justify-center">
                            {categories?.map((cat, i) => (
                                <button
                                    key={cat?.name}
                                    className={`flex-1 p-1 h6 font-medium transition-all duration-150 ${
                                        selected?.name === cat?.name
                                            ? `border-y custom-border sm:text-nowrap border-b-0`
                                            : 'bg-white text-gray-600 custom-border border border-l-0 sm:text-nowrap border-b-0'
                                    } ${i === 0 ? 'border-t-0' : ''}`}
                                    onClick={() => handleSelectCategory(cat)}
                                >
                                    {cat?.name}
                                </button>
                            ))}
                        </div>

                        <div className="cont p-4">
                            <div className="cont gap-1">
                                <h1 className="h3">{currentTemplate?.title}</h1>
                                <h2 className="h6 leading-none">
                                    {currentTemplate?.metadata?.description || currentTemplate?.description}
                                </h2>
                            </div>
                            <div className="w-full h-[40vh] relative">
                                <Image
                                    src={
                                        currentTemplate?.metadata?.templateUrl ||
                                        currentTemplate?.templateUrl ||
                                        'https://placehold.co/600x400'
                                    }
                                    alt={currentTemplate?.title}
                                    className="w-full h-full object-contain"
                                    fill
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end m-4 flex-wrap gap-2">
                        <Link href={getTemplateLink()} className="btn btn-accent">
                            Use this template
                        </Link>

                        <Link href="/templates" className="btn btn-outline">
                            See All Templates
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default IndexTemplateComp;
