import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import styles from './featureGrid.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import GetMdIcons from '@/utils/getMdIcons';

export function FeaturesGrid({ features, page }) {
    return (
        <>
            <div className="grid gap-12 container">
                <div className="cont max-w-[1100px]">
                    <h2 className="h1">Advanced Features for Effortless Automation</h2>
                    <h3 className="sub__h1">
                        Empower your team—big or small—with intuitive automation tools. Build workflows that save time
                        and eliminate repetitive tasks, all without needing any coding expertise.
                    </h3>
                </div>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black  overflow-hidden index_feature_grid`}
                >
                    {features
                        .sort((a, b) => a.priority - b.priority)
                        .map((feature, index) => {
                            const MdIcon = GetMdIcons(feature?.iconname || 'MdCropOriginal');

                            if (feature.block_type === 'R2C2') {
                                return (
                                    <Link
                                        key={index}
                                        href={feature?.link ? feature?.link : '#'}
                                        target="_blank"
                                        className={`block_border col-span-2 row-span-2 justify-between gap-4 w-full h-full flex flex-col md:aspect-square overflow-hidde hover:bg-[#f8f8f8]  `}
                                        aria-label="feature"
                                    >
                                        <div className="flex flex-col gap-2 p-6 sm:p-12 md:p-12 lg:p-6 xl:p-12">
                                            <div className="text-6xl  flex flex-col gap-3">{MdIcon && <MdIcon />}</div>
                                            <div className="flex flex-col gap-2 justify-end">
                                                <h3 className="uppercase tracking-wider font-bold">{feature.name}</h3>
                                                <p>{feature?.description}</p>
                                            </div>
                                        </div>

                                        <div className={`${styles.r2c2_img_cont} flex h-full justify-center items-end`}>
                                            {feature?.image ? (
                                                <Image
                                                    src={feature.image[0] || 'https://placehold.co/40x40'}
                                                    alt="feature 1"
                                                    className={`${styles.r2c2_img} p-2 md:p-6 lg:p-12`}
                                                    height={1080}
                                                    width={1080}
                                                />
                                            ) : (
                                                <Image
                                                    src="https://placehold.co/1600x1400"
                                                    alt="Placeholder"
                                                    className={`${styles.r2c2_img} `}
                                                    height={1080}
                                                    width={1080}
                                                />
                                            )}
                                        </div>
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link
                                        href={feature?.link ? feature?.link : '#'}
                                        key={index}
                                        target="_blank"
                                        aria-label="feature"
                                        className={`col-span-2 block_border md:col-span-1 hover:text-white hover:bg-[#252525] transition-all duration-150 row-span-1 min-h-[200px] p-6 sm:p-12 md:p-12 lg:p-6 xl:p-12   justify-between gap-2  flex flex-col  md:aspect-square w-full h-full hover:shadow-lg`}
                                    >
                                        <div className="text-6xl flex flex-col gap-3">{MdIcon && <MdIcon />}</div>
                                        <div className="flex flex-col gap-2 justify-end  ">
                                            <h3 className="uppercase tracking-wider font-bold">{feature.name}</h3>
                                            <p>{feature?.description}</p>
                                        </div>
                                    </Link>
                                );
                            }
                        })}
                </div>
            </div>
        </>
    );
}
