import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
            <div className="container mx-auto px-8 py-3 flex items-center justify-between gap-4">
                <Link href="/" className="inline-flex" aria-label="viaSocket home">
                    <Image
                        src="https://viasocket.com/assets/brand/logo.svg"
                        alt="viaSocket"
                        width={118}
                        height={35}
                        className="h-7 w-auto block"
                        unoptimized
                    />
                </Link>
            </div>
        </header>
    );
}
