import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdArrowBackIos } from 'react-icons/md';
import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';

export default function ErrorComp({ navData, footerData, utm }) {
    const router = useRouter();

    return (
        <>
            <div className="container flex flex-col gap-4 justify-center min-h-screen">
                <h1 className="h1">
                    404: Return to homepage.
                </h1>
                <div className="flex gap-4">
                    <button className="btn btn-accent btn-md" onClick={() => router.back()}>
                        <MdArrowBackIos />
                        Back
                    </button>
                    <Link href="/">
                        <button className="btn btn-md btn-primary btn-outline">Go to home</button>
                    </Link>
                </div>
            </div>

        </>
    );
}
