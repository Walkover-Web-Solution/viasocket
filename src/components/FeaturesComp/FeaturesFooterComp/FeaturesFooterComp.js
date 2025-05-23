import Footer from '@/components/footer/footer';
import Link from 'next/link';

export default function FeaturesFooterComp({ footerData, featureData, pageInfo }) {
    return (
        <div className="container py-4 bg-white">
            <div className="cont py-32 justify-center border transparent-border-black border-b-0 px-12">
                <div className="cont gap-6 justify-center ">
                    <h2 className="h2">{featureData || 'See All These Features in Action'}</h2>
                    <Link href={`/signup?utm_source=${pageInfo?.url}`}>
                        <button className="btn btn-accent btn-lg">Start Exploring Now</button>
                    </Link>
                </div>
            </div>

            <Footer footerData={footerData} />
        </div>
    );
}
