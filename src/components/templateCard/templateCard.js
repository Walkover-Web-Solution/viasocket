import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import TemplateCardIcons from './templateCardIcons';

const TemplateCard = ({ template, preventClick, isFeatured }) => {
    const bgcolor = template?.flowJson?.trigger?.brandcolor || '#ffffff';
    const isLightBg = bgcolor.toLowerCase().startsWith('#fff');
    return (
        <Link
            key={template?.id}
            href={`/automations/${template?.title?.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}/${template?.id}`}
            className="group shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col relative"
            style={{ backgroundColor: bgcolor || 'white' }}
            onClick={(e) => { if (preventClick?.current) e.preventDefault(); }}
        >
            {isFeatured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                </div>
            )}
            <div className={`p-4 md:p-6 flex flex-col gap-4 h-[290px] ${isLightBg ? 'text-black' : 'text-white'}`}>
                <TemplateCardIcons template={template} />

                <div className="flex-1 flex items-center">
                    <h4 className={`line-clamp-3 font-[Inter,sans-serif] text-3xl font-[720] leading-[38px] tracking-[-0.5px] m-0`}>{template?.title}</h4>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs ${isLightBg ? 'text-[#00000099]' : 'text-white/60'}`}>{template?.userName}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${isLightBg ? 'text-[#000000cc]' : 'text-white/70'}`}>
                        Preview template
                        <ArrowRight size={13} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default TemplateCard;
