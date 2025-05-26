import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdArrowBackIos } from 'react-icons/md';

export default function ErrorComp() {
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
                        <button className="btn btn-md btn-primary btn-outline custom-border">Go to home</button>
                    </Link>
                </div>
            </div>

        </>
    );
}
