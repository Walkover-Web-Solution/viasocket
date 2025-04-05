import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

export default function CombinationCardComp({ trigger, action, description, link }) {
    return (
        <Link
            href={link}
            className="combo_card border-2 border-t-0 border-l-0 cont  border-gray-400  hover:bg-black hover:text-white  "
            rel="nofollow"
        >
            <div className="combocard_div px-4 py-6 flex sm:flex-row flex-col sm:items-center gap-2 border-b bg-white sm:justify-center">
                <span className="opacity-70">when</span>
                <Image
                    src={trigger?.iconurl || 'https://placehold.co/40x40'}
                    width={36}
                    height={36}
                    className="w-fit h-8 sm:block hidden"
                    alt={trigger?.name}
                />
                <span>{trigger?.name}</span>
            </div>
            <div className="px-4 md:px-12 py-6 flex flex-col gap-4 combocard_div bg-gray-50 h-full">
                <div className="flex sm:items-center flex-col sm:flex-row gap-2 ">
                    <MdArrowForward className="text-2xl opacity-80" />
                    <div className="sm:flex hidden items-center justify-center bg-white border h-6 w-6">
                        <Image
                            src={action?.iconurl || 'https://placehold.co/40x40'}
                            width={36}
                            height={36}
                            className="w-fit h-4"
                            alt={action?.name}
                        />
                    </div>
                    <span>{action?.name}</span>
                </div>
                <p className="text-sm opacity-80">{description}</p>
            </div>
        </Link>
    );
}
