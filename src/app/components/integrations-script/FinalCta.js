import Link from 'next/link';

export default function FinalCta() {
    return (
        <div className="bg-[#0d0d0d] py-20 md:py-24">
            <div className="container">
                <div className="mx-auto max-w-[720px] text-center">
                    <h2 className="h2 text-white">Let your site sell your integrations for you</h2>
                    <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.6] text-[#a8a8a8] md:text-[16px]">
                        One script tag turns &quot;does it integrate?&quot; into a one-click automation your users
                        actually set up.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link href="#setup" className="btn btn-accent">
                            Get the script
                        </Link>
                        <Link
                            href="https://viasocket.com/help/viasocket-embed/Discover-the-Power-of-Automation-with-viasocket-Integration-Script"
                            className="btn btn-outline"
                            target="_blank"
                        >
                            Browse the directory
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
