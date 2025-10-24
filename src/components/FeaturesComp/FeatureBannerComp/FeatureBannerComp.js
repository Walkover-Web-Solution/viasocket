import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function FeatureBannerComp({ featureData, footerData, pageInfo }) {
    return (
        <>
            <Navbar footerData={footerData} utm={pageInfo?.url} />

            <div className="container">
                <div className="h-fit ">
                    <div className="py-20 cont gap-16 h-full flex justify-center ">
                        <div className="cont gap-4">
                            <div className="cont gap-1">
                                <h1 className="h1 ">
                                    {featureData?.name || 'Explore Hundreds of Features, Available on Every Plan'}
                                </h1>
                                <p className="sub__h1">
                                    {featureData?.description ||
                                        'Get unrestricted access to all features, no matter your choice of plan.'}
                                </p>
                            </div>
                            {!featureData?.image && (
                                <Link className="w-fit" href={`/signup?utm_source=${pageInfo?.url}`}>
                                    <button className="btn btn-accent">Start for free</button>
                                </Link>
                            )}
                        </div>
                        {(featureData?.image || featureData?.bgimage) && (
                            <div
                                className={`lg:p-20 p-4 flex flex-col items-center relative ${
                                    featureData?.bgimage 
                                        ? 'bg-[#ede8de]' 
                                        : 'bg-white border custom-border'
                                }`}
                                style={{
                                    backgroundImage: featureData?.bgimage ? `url("${featureData.bgimage}")` : undefined,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    minHeight: featureData?.bgimage ? '500px' : 'auto',
                                }}
                            >
                                {featureData?.image && (
                                    <Image
                                        className={`max-w-[2000px] w-full ${!featureData?.bgimage ? 'border custom-border' : ''}`}
                                        src={featureData?.image[0] || 'https://placehold.co/40x40'}
                                        alt={featureData?.name}
                                        width={1080}
                                        height={1080}
                                    />
                                )}
                                {!featureData?.image && featureData?.bgimage && (
                                    <div className="w-full h-64 flex items-center justify-center">
                                        <p className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded">
                                            {featureData?.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
