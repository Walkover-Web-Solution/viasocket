import Footer from '@/components/footer/footer';
import Link from 'next/link';

export default function FeaturesFooterComp({ footerData, featureData, pageInfo }) {
    return (
        <div className="container py-4">
            <div className="cont bg-white justify-center border custom-border border-b-0 p-12">
                <div className="cont gap-6 justify-center ">
                    <h2 className="h2">{featureData || 'See All These Features in Action'}</h2>
                    <Link href={`/signup?utm_source=${pageInfo?.url}`} className="w-fit">
                        <button className="btn btn-accent">Start Exploring Now</button>
                    </Link>
                </div>
            </div>

            <Footer footerData={footerData} />
        </div>
    );
}
