'use client';

import { useState } from 'react';
import Image from 'next/image';

const EmbedImageSelector = ({ embedData }) => {
    const [selectedImage, setSelectedImage] = useState(embedData[0]?.image?.[0]);

    return (
        <div className="container w-full min-h-fit lg:h-dvh">
            <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
                <div className="block w-full h-full  max-h-[600px] aspect-square min-h-[400px] bg-[#FFF5F5] md:p-6 p-2 border">
                    <div className="flex relative justify-center items-center h-full w-full overflow-hidden">
                        <Image
                            src={selectedImage || 'https://placehold.co/40x40'}
                            fill
                            alt="Connector Image"
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    {embedData.map((item, index) => (
                        <div
                            key={index}
                            className={`px-4 py-8 group w-full ${selectedImage === item?.image[0] ? 'bg-gray-100 text-black' : 'hover-bg-grey-100-text-black'}`}
                            onMouseEnter={() => setSelectedImage(item?.image[0])}
                        >
                            <div
                                className={`text-lg cursor-pointer ${selectedImage === item?.image[0] ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`text-xl font-bold sm:whitespace-nowrap ${selectedImage === item?.image[0] ? 'text-black' : 'text-black group-hover:text-black'}`}
                                    >
                                        {item?.name}
                                    </div>
                                </div>
                                {item?.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmbedImageSelector;
