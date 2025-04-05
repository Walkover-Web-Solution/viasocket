import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineArrowForward } from 'react-icons/md';

export default function TemplateSection(data) {
    return (
        <>
            <div className="grid gap-10 container">
                <h2 className="text-3xl font-semibold">
                    Looking for inspiration?
                    <br />
                    Start with these resources.
                </h2>
                <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
                    {data?.data.map((template, index) => {
                        return (
                            <div className="max-w-[341px] flex flex-col" key={index}>
                                <div className="w-full h-auto aspect-square">
                                    <Image
                                        className="w-full h-full"
                                        src={template?.img || 'https://placehold.co/40x40'}
                                        width={1080}
                                        height={1080}
                                        alt="cardImg"
                                    />
                                </div>
                                <div className="p-2 flex flex-col h-[100px]">
                                    <h3 className="font-medium text-xl">{template?.name}</h3>
                                    <Link href="/" className="flex items-center gap-1 mt-auto " aria-label="Explore">
                                        Explore <MdOutlineArrowForward />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Link href="/" className="mx-auto" aria-label="Explore">
                    <button className="btn btn-accent text-xl text-white" aria-label="Explore">
                        Explore more templates
                    </button>
                </Link>
            </div>
        </>
    );
}
