import getTemplates from '@/utils/getTemplates';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const IndexTemplateComp = ({ categories }) => {
    const [selected, setSelected] = useState({ name: 'Social Media', scriptid: 'scriqePfVQxF' });
    const [templates, setTemplates] = useState([]);
    const [currentTemplate, setCurrentTemplate] = useState({
        'id': 'scriqePfVQxF',
        'title': 'Auto-Respond to Instagram Comments with DM and notify team in Slack',
        'metadata': {
            'description':
                'Automatically reply to Instagram comments with a DM link when DM is mentioned, and notify your team in Slack for other messages.',
            'templateUrl': 'https://static.viasocket.com/templates/p/YPLQYPK3fR.png',
        },
    });

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
            const found = templates?.find((template) => template?.id === selected?.scriptid);
            setCurrentTemplate(found);
            console.log(found);
        }
    }, [selected, templates]);

    return (
        <div className="container cont gap-8 border custom-border p-4 md:p-12 bg-white">
            <div className="cont gap-1">
                <h2 className="h2">Start your automation with ready-to-use workflow templates</h2>
                <p className="sub__h1">
                    Browse templates by category to quickly set up powerful automations without any hassle. Just pick,
                    customize, and watch your workflows run themselves
                </p>
            </div>

            <div className="hidden md:flex flex-col gap-4 w-full">
                <div className="w-full flex flex-col md:flex-row">
                    {categories?.map((cat, i) => (
                        <button
                            key={cat?.name}
                            className={`flex-1 px-4 py-2 h6 font-medium transition-all duration-150 ${
                                selected?.name === cat?.name
                                    ? 'bg-accent text-white border-accent border'
                                    : 'bg-white text-gray-600 custom-border border'
                            } ${i !== categories.length - 1 ? 'border-r-0' : ''}`}
                            onClick={() => setSelected(cat)}
                        >
                            {cat?.name}
                        </button>
                    ))}
                </div>

                <div className="cont gap-4">
                    <div className="cont gap-1">
                        <h1 className="h3">{currentTemplate?.title}</h1>
                        <h2 className="h6 leading-none">{currentTemplate?.metadata?.description}</h2>
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

            <div className="md:hidden flex gap-4">
                <div className="cont">
                    {categories?.map((cat, i) => (
                        <button
                            key={cat?.name}
                            className={`flex-1 p-1 h6 font-medium transition-all duration-150 ${
                                selected?.name === cat?.name
                                    ? 'bg-accent text-white border-accent border sm:text-nowrap'
                                    : 'bg-white text-gray-600 custom-border border sm:text-nowrap'
                            } ${i !== categories.length - 1 ? 'border-b-0' : ''}`}
                            onClick={() => setSelected(cat)}
                        >
                            {cat?.name}
                        </button>
                    ))}
                </div>

                <div className="cont gap-2">
                    <div className="cont gap-1">
                        <h1 className="h3">{currentTemplate?.title}</h1>
                        <h2 className="h6 leading-none">{currentTemplate?.metadata?.description}</h2>
                    </div>
                    <div className="w-full h-[40vh] relative">
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

            <Link href="/templates" className="w-fit self-end">
                <button className="btn btn-accent">See All Templates</button>
            </Link>
        </div>
    );
};

export default IndexTemplateComp;
