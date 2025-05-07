import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function CombinationCardComp({ trigger, action, description, link }) {
    return (
        <Link
            href={link}
            className="border border-black border-t-0 border-l-0 px-12 pt-8 pb-2 cont gap-4 bg-white cursor-pointer hover:bg-black hover:text-white hover:border-white group"
        >
            <div className="cont w-full">
                <div className="flex gap-8"></div>
                <div className="flex items-center">
                    <div className="border border-black p-2 cont items-center group-hover:border-white">
                        <Image src={trigger?.iconurl} width={40} height={40} />
                    </div>
                    <div className="w-16 border-t-2 border-black group-hover:border-white" />
                    <div className="border border-black p-2 cont items-center group-hover:border-white">
                        <Image src={action?.iconurl} width={40} height={40} />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-start h-full">
                <p className="h3">{description}</p>
            </div>

            <div className="text-white font-semibold flex gap-1 justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
                Try it <FiArrowUpRight size={20} />
            </div>
        </Link>
    );
}
