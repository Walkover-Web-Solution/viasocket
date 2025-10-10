import { handleRedirect } from '@/utils/handleRedirection';
import Image from 'next/image';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

export default function CombinationCardComp({ trigger, action, description, link, showTopBorder }) {
    return (
        <button
            onClick={(e) => handleRedirect(e, link)}
            className={`border custom-border border-l-0 px-12 pt-8 bg-white pb-2 cont gap-4 hover-bg-black transition-all cursor-pointer group relative ${showTopBorder ? 'border-t' : 'border-t-0'}`}
        >
            <div className="cont w-full">
                <div className="flex gap-8"></div>
                <div className="flex items-center">
                    <div className="p-2 cont items-center bg-white w-[60px] h-[60px] relative">
                        <Image className="object-contain p-1.5" alt="trigger icon" src={trigger?.iconurl} fill />
                    </div>
                    <div className="w-16 border-t-2 custom-border bg-white" />
                    <div className="p-2 cont items-center bg-white w-[60px] h-[60px] relative">
                        <Image className="object-contain p-1.5" alt="action icon" src={action?.iconurl} fill />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-start h-full text-start">
                <p className="h3">{description}</p>
            </div>

            <div className="hover:text-white font-semibold flex gap-1 justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
                Try it <FiArrowUpRight size={20} />
            </div>
        </button>
    );
}
