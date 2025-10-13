import { handleRedirect } from '@/utils/handleRedirection';
import Image from 'next/image';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

export default function CombinationCardComp({ trigger, action, description, link, showTopBorder }) {
    return (
        <button
            onClick={(e) => handleRedirect(e, link)}
            className={`border custom-border border-l-0 p-4 bg-white flex gap-4 items-center transition-all cursor-pointer group relative ${showTopBorder ? 'border-t' : 'border-t-0'}`}
        >
            <div className="flex items-center">
                <div className="p-2 cont items-center bg-white w-[40px] border h-[40px] relative">
                    <Image className="object-contain p-1.5" alt="trigger icon" src={trigger?.iconurl} fill />
                </div>
                <div className="w-8 border-t-2" />
                <div className="p-2 cont items-center bg-white w-[40px] border h-[40px] relative">
                    <Image className="object-contain p-1.5" alt="action icon" src={action?.iconurl} fill />
                </div>
            </div>
            <p className="text-start">{description}</p>

            <FiExternalLink className="ml-auto invisible group-hover:visible" />
        </button>
    );
}
