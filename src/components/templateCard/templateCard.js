import Image from 'next/image';
import Link from 'next/link';

const TemplateCard = ({ template }) => {
    return (
        <Link
            href={`https://flow.viasocket.com/template/${template?.id}`}
            className="group cont justify-between bg-white border transparent-border-black cursor-pointer hover:shadow-xl"
            // style={backgroundColor}
        >
            <div className="flex flex-col gap-1 px-8 py-4">
                <h1 className="h3">{template?.title}</h1>
                <h2 className="h6 leading-none">{template?.metadata?.description}</h2>
            </div>

            <div className="h-[400px] w-full relative overflow-x-hidden overflow-y-hidden">
                <Image
                    src={template?.metadata?.templateUrl}
                    layout="fill"
                    className="object-top"
                    style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                />
            </div>
        </Link>
    );
};

export default TemplateCard;
