import getTemplates from '@/utils/getTemplates';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const categories = [
    { name: 'Marketing', scriptId: 'scri9BolgRJb' },
    { name: 'Sales', scriptId: 'scriqePfVQxF' },
    { name: 'Human Intervention', scriptId: 'scridwCWC07t' },
    { name: 'Support', scriptId: 'scriQ4VgKtQT' },
    { name: 'Automation', scriptId: 'scriFymkmpzr' },
    { name: 'Finance', scriptId: 'scriJyrMACmT' },
    { name: 'Operations', scriptId: 'scri0ScmHVYN' },
];

const IndexTemplateComp = () => {
    const [selected, setSelected] = useState(categories[0]);
    const [templates, setTemplates] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    useEffect(() => {
        getTemplates()
            .then((data) => {
                setTemplates(data || []);
            })
            .catch((error) => {
                console.error('Error fetching templates:', error);
            });
    }, []);

    useEffect(() => {
        if (templates.length > 0) {
            const found = templates.find((template) => template.id === selected.scriptId);
            setCurrentTemplate(found);
            console.log('currentTemplate', found);
        }
    }, [selected, templates]);

    return (
        <div className="container cont gap-8 border custom-border p-12 bg-white">
            <h2 className="h2">Templates</h2>

            <div className="cont w-full">
                <div className="w-full flex">
                    {categories.map((cat, i) => (
                        <button
                            key={cat.name}
                            className={`flex-1 px-4 py-2 text-base font-medium transition-all duration-150 ${
                                selected.name === cat.name
                                    ? 'bg-accent text-white border-accent border'
                                    : 'bg-white text-gray-600 custom-border border'
                            } ${i !== categories.length - 1 ? 'border-r-0' : ''}`}
                            onClick={() => setSelected(cat)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
                <div className="w-full h-[70vh] relative">
                    <Image
                        src={currentTemplate?.metadata?.templateUrl}
                        alt={currentTemplate?.title}
                        className="w-full h-full object-contain"
                        objectFit="contain"
                        layout="fill"
                    />
                </div>
            </div>
        </div>
    );
};

export default IndexTemplateComp;
