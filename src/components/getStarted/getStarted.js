import Image from 'next/image';
import Link from 'next/link';

export default function GetStarted() {
    return (
        <div className="bg-white border border-custom-border p-12 flex gap-8 justify-between items-center flex-wrap">
            <div className="flex flex-col gap-4 flex-1 min-w-[260px]">
                <div className="flex flex-col gap-2">
                    <h2 className="h2">Need help building your workflow?</h2>
                    <p className="sub__h1">
                        Get instant answers from our AI assistant or connect with a support specialist anytime.
                    </p>
                </div>
                <div className="flex lg:gap-4 gap-2 flex-wrap items-center">
                    <Link href="https://viasocket.com/help" target="_blank">
                        <button className="btn btn-accent">
                            Browse help centre
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </button>
                    </Link>
                    <Link href="https://cal.id/forms/55f3930f-0e5e-4204-b3d5-f4858dcf202f" target="_blank">
                        <button className="btn btn-outline">Book a demo</button>
                    </Link>
                </div>
            </div>

            <div className="border border-custom-border bg-white w-64 flex-shrink-0 overflow-hidden hidden md:block">
                <div className="border-b border-custom-border px-4 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 flex-shrink-0 border rounded flex items-center justify-center">
                        <Image src="/assets/brand/socketIcon.svg" alt="viaSocket" width={20} height={20} />
                    </div>
                    <span className="text-sm font-semibold text-black">viaSocket Support</span>
                </div>

                <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full border border-custom-border p-1 flex-shrink-0 flex items-center justify-center">
                            <Image src="/assets/brand/socketIcon.svg" alt="viaSocket" width={16} height={16} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-semibold">viaSocket</p>
                            <p className="text-xs text-gray-700">What can I help you with?</p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <span className="bg-accent text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
                            How can I set trigger?
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
