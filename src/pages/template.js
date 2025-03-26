import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFooterData, getNavData } from '@/utils/getData';
import { MdKeyboardArrowDown } from 'react-icons/md';
import getTemplates from '@/utils/getTemplates';

export const runtime = 'experimental-edge';

const validTemplates = [
    'scriegTyJDVP',
    'scriCigs4Nec',
    'scriLkXFCiT8',
    'scrigT3BMudV',
    'scri18TO2dzy',
    'scriY9PYKUJA',
    'scri1jQYWdCH',
    'scriHyYJTU6Q',
    'scriklTHv7Ww',
    'scriFqFSpmdo',
    'scrirRkcLV9Z',
    'scriOlocCYZL',
    'scrixtgO9oc0',
    'scriegTyJDVP',
    'scriO3u6AJug',
    'scrimBQIOdxN',
];

const Template = ({ navData, footerData, templateData }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [filteredTemplates, setFilteredTemplates] = useState([]);

    useEffect(() => {
        const filtered = templateData.filter((template) => validTemplates.includes(template.id));
        setFilteredTemplates(filtered);
    }, [templateData]);

    console.log(filteredTemplates);
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <>
            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="w-full cont md:gap-36 sm:gap-24 gap-12 overflow-x-hidden">
                <div className="container flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center text-center gap-2 p-20 pb-0 max-w-[900px]">
                        <h1 className="h1">Workflow Templates</h1>
                        <h2 className="h1 text-accent !font-bold">Click. Build. Succeed.</h2>
                        <h2 className="sub__h1">
                            Take a look at our collection of real-world workflows that help you automate repetitive
                            tasks and boost your growth with viaSocket.
                        </h2>
                    </div>
                </div>
                <div className="cont gap-8 items-center">
                    {filteredTemplates.slice(0, visibleCount).map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}

                    {visibleCount < filteredTemplates.length && (
                        <div className="flex max-w-[1200px] w-full justify-end">
                            <button
                                onClick={handleLoadMore}
                                className="btn btn-outline border-2 border-gray-400 w-full"
                            >
                                Load More <MdKeyboardArrowDown size={24} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="pb-4">
                    <div className="container">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template;

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    let templateData = await getTemplates();

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            templateData: templateData || [],
        },
    };
}
