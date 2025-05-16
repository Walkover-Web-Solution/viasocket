import { handleRedirect } from '@/utils/handleRedirection';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const TemplateCard = ({ template }) => {
    return (
        <div
            // href={`https://flow.viasocket.com/template/${template?.id}`}
            onClick={(e) => handleRedirect(e, `https://flow.viasocket.com/template/${template?.id}?`)}
            className="group cont justify-between bg-white border transparent-border-black cursor-pointer hover:bg-gray-100 group relative"
            // style={backgroundColor}
        >
            <div className="flex flex-col gap-1 px-8 py-4">
                <h1 className="h3">{template?.title}</h1>
                <h2 className="h6 leading-none">{template?.metadata?.description}</h2>
            </div>

            <div className="h-[400px] w-full relative overflow-x-hidden overflow-y-hidden">
                <Image
                    src={template?.metadata?.templateUrl || 'https://placehold.co/600x400'}
                    layout="fill"
                    className="object-top"
                    style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                />
            </div>
            <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 text-xl" />
        </div>
    );
};

export default TemplateCard;
