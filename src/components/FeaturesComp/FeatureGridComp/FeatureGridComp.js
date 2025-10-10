import Image from 'next/image';
import Link from 'next/link';
import style from './FeatureGridComp.module.scss';

export default function FeatureGridComp({ features, pageInfo }) {
    function handleGridLayout(blockIndex) {
        let gridClass;
        switch (blockIndex % 5) {
            case 0:
                gridClass = 'row-span-4';
                break;
            case 1:
                gridClass = 'row-span-5 lg:row-span-6';
                break;
            case 2:
                gridClass = 'row-span-4';
                break;
            case 3:
                gridClass = 'row-span-5 lg:row-span-6';
                break;
            case 4:
                gridClass = 'row-span-4';
                break;
            default:
                gridClass = '';
                break;
        }
        return (
            `bg-white lg:p-10 p-4 pb-16 border custom-border border-t-0 border-l-0 flex flex-col text-center items-center h-full hover-bg-black-text-white justify-center transition-all duration-300 group ${style.featurecard} ` +
            gridClass
        );
    }

    const filteredFeatures = features.filter((feature) => feature.hidden !== true);

    if (features && features.length > 0) {
        return (
            <div className="container">
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 auto-row-[110px] border custom-border border-b-0 border-r-0">
                    {filteredFeatures?.map((feature, index) => {
                        if (feature?.hidden != true) {
                            return (
                                <Link
                                    href={`/features/${feature?.slug}`}
                                    key={index}
                                    className={handleGridLayout(index)}
                                >                                    
                                    <Image
                                        className="block group-hover:hidden"
                                        src={feature?.iconimages[0] || 'https://placehold.co/40x40'}
                                        width={36}
                                        height={36}
                                        alt={feature.name}
                                    />
                                    <Image
                                        className="hidden group-hover:block"
                                        src={feature?.iconimages[1] || 'https://placehold.co/40x40'}
                                        width={36}
                                        height={36}
                                        alt={feature.name}
                                    />
                                    <div className="flex flex-col gap-2 mt-8">
                                        <h2 className="text-lg font-semibold">{feature?.name}</h2>
                                        <p>{feature?.description}</p>
                                    </div>
                                    
                                    <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#ffffff"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-move-right-icon lucide-move-right"
                                        >
                                            <path d="M18 8L22 12L18 16" />
                                            <path d="M2 12H22" />
                                        </svg>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}
