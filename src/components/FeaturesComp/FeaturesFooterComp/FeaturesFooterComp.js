import Footer from '@/components/footer/footer';
import Link from 'next/link';

export default function FeaturesFooterComp({ footerData, featureData, pageInfo }) {
    return (
        <div className="container py-4">
            <div className="cont py-32 items-center justify-center text-center border border-black border-b-0 ">
                <div className="cont cont__w gap-6 items-center justify-center text-center ">
                    <h2 className="h1">{featureData || 'See All These Features in Action'}</h2>
                    <Link href={`/signup?utm_source=${pageInfo?.url}`}>
                        <button className="btn btn-accent btn-lg">Start Exploring Now</button>
                    </Link>
                </div>
            </div>
            <Footer footerData={footerData} />
        </div>
    );
}
