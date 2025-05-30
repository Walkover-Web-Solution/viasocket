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
                                    <button className="btn btn-accent">Start Free Trial</button>
                                </Link>
                            )}
                        </div>
                        {featureData?.image && (
                            <div className=" lg:p-20 p-4 bg-neutral flex flex-col items-center border custom-border">
                                <Image
                                    className="max-w-[2000px] border custom-border w-full"
                                    src={featureData?.image[0] || 'https://placehold.co/40x40'}
                                    alt={featureData?.name}
                                    width={1080}
                                    height={1080}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
