import Image from 'next/image';
import Link from 'next/link';
import { MdFace } from 'react-icons/md';
import style from './FeatureGridComp.module.scss';

export default function FeatureGridComp({ features, pageInfo }) {
    function handleGridLayout(blockIndex) {
        let gridClass;
        switch (blockIndex % 5) {
            case 0:
                gridClass = 'row-span-4';
                break;
            case 1:
                gridClass = 'row-span-5';
                break;
            case 2:
                gridClass = 'row-span-4';
                break;
            case 3:
                gridClass = 'row-span-5';
                break;
            case 4:
                gridClass = 'row-span-5';
                break;
            default:
                gridClass = '';
                break;
        }
        return (
            'lg:p-10 p-4 border !border-gray-300 border-t-0 border-l-0 flex flex-col text-center items-center gap-8 h-full justify-center  hover:bg-black hover:text-white featurecard ' +
            gridClass +
            ' ' +
            'feature_block'
        );
    }

    const filteredFeatures = features.filter((feature) => feature.hidden !== true);

    if (features && features.length > 0) {
        return (
            <div className="container">
                <div className=" features_grid grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 border !border-gray-300 border-b-0 border-r-0">
                    {filteredFeatures?.map((feature, index) => {
                        if (feature?.hidden != true) {
                            return (
                                <Link
                                    href={`/features/${feature?.slug}`}
                                    key={index}
                                    className={handleGridLayout(index)}
                                >
                                    <Image
                                        className="icon__dark"
                                        src={feature?.iconimages[0] || 'https://placehold.co/40x40'}
                                        width={36}
                                        height={36}
                                        alt={feature.name}
                                    />
                                    <Image
                                        className="icon__light"
                                        src={feature?.iconimages[1] || 'https://placehold.co/40x40'}
                                        width={36}
                                        height={36}
                                        alt={feature.name}
                                    />

                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-lg font-semibold">{feature?.name}</h2>
                                        <p>{feature?.description}</p>
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
